import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import process from 'node:process';
import test from 'node:test';
import { fileURLToPath, URL } from 'node:url';
import { hookOutput, missingDocs, requiredDocs } from '../scripts/okf-sync.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'hoka-okf-'));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const globalConfig = join(cwd, 'empty-gitconfig');
  writeFileSync(globalConfig, '');
  const env = { ...process.env, GIT_CONFIG_GLOBAL: globalConfig, GIT_CONFIG_NOSYSTEM: '1' };
  execFileSync('git', ['init', '--quiet', cwd], { env });
  for (const path of [
    'scripts/okf-sync.mjs',
    'scripts/okf.ps1',
    '.githooks/pre-commit',
    '.codex/hooks.json',
  ]) {
    mkdirSync(dirname(join(cwd, path)), { recursive: true });
    copyFileSync(join(root, path), join(cwd, path));
  }
  return { cwd, env };
}

function stage(repo, path) {
  mkdirSync(dirname(join(repo.cwd, path)), { recursive: true });
  writeFileSync(join(repo.cwd, path), 'changed\n');
  execFileSync('git', ['add', '--', path], repo);
}

function check(repo) {
  return spawnSync(process.execPath, [join(root, 'scripts/okf-sync.mjs'), 'check'], {
    ...repo,
    encoding: 'utf8',
  });
}

test('source areas select related concepts and unknown src still requires review', () => {
  assert.deepEqual(requiredDocs(['src/app/products/[id]/page.tsx']), [
    'okf/architecture/routing.md',
    'okf/log.md',
  ]);
  assert.deepEqual(requiredDocs(['src/shared/ShopShell.tsx']), [
    'okf/architecture/state.md',
    'okf/log.md',
  ]);
  assert.deepEqual(requiredDocs(['src/shared/components/atoms/Button/Button.tsx']), [
    'okf/architecture/ui.md',
    'okf/log.md',
  ]);
  assert.deepEqual(requiredDocs(['src/new-file.ts']), ['okf/project.md', 'okf/log.md']);
  assert.deepEqual(requiredDocs(['README.md']), []);
});

test('an unrelated or incomplete document update cannot cover a source change', () => {
  assert.deepEqual(missingDocs(['src/app/page.tsx'], ['okf/project.md', 'okf/log.md']), [
    'okf/architecture/routing.md',
  ]);
  assert.deepEqual(missingDocs(['src/app/page.tsx'], ['okf/architecture/routing.md']), [
    'okf/log.md',
  ]);
});

test('Git check blocks code-only staging and accepts relevant docs with log', (t) => {
  const repo = fixture(t);
  stage(repo, 'src/app/page.tsx');
  assert.equal(check(repo).status, 1);
  stage(repo, 'okf/architecture/routing.md');
  assert.equal(check(repo).status, 1);
  stage(repo, 'okf/log.md');
  assert.equal(check(repo).status, 0);
});

test('unstaged docs do not satisfy the pre-commit check', (t) => {
  const repo = fixture(t);
  stage(repo, 'src/app/page.tsx');
  mkdirSync(join(repo.cwd, 'okf/architecture'), { recursive: true });
  writeFileSync(join(repo.cwd, 'okf/architecture/routing.md'), 'reviewed\n');
  writeFileSync(join(repo.cwd, 'okf/log.md'), 'reviewed\n');
  assert.equal(check(repo).status, 1);
});

test('hook reports untracked edits and ignores non-edit events', (t) => {
  const repo = fixture(t);
  mkdirSync(join(repo.cwd, 'src'), { recursive: true });
  writeFileSync(join(repo.cwd, 'src/new-file.ts'), 'export const value = 1;\n');
  const result = spawnSync(process.execPath, [join(root, 'scripts/okf-sync.mjs'), 'hook'], {
    ...repo,
    encoding: 'utf8',
    input: JSON.stringify({ cwd: repo.cwd, hook_event_name: 'PostToolUse' }),
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(JSON.parse(result.stdout).hookSpecificOutput.additionalContext, /okf\/project.md/);
  assert.deepEqual(
    hookOutput({ hook_event_name: 'Stop', stop_hook_active: true }, ['okf/log.md']),
    {},
  );
  assert.deepEqual(hookOutput({ hook_event_name: 'PostToolUse' }, []), {});
});

test('installer enables Git, preserves Claude hooks, and is idempotent', (t) => {
  const repo = fixture(t);
  mkdirSync(join(repo.cwd, '.claude'), { recursive: true });
  const settings = {
    hooks: { Stop: [{ hooks: [{ type: 'command', command: 'existing-hook' }] }] },
    existing: true,
  };
  writeFileSync(join(repo.cwd, '.claude/settings.json'), JSON.stringify(settings));
  const install = () =>
    spawnSync(process.execPath, [join(root, 'scripts/install-okf-hooks.mjs')], {
      ...repo,
      encoding: 'utf8',
    });
  assert.equal(install().status, 0);
  assert.equal(install().status, 0);
  assert.equal(
    execFileSync('git', ['config', '--get', 'core.hooksPath'], {
      ...repo,
      encoding: 'utf8',
    }).trim(),
    '.githooks',
  );
  const updated = JSON.parse(readFileSync(join(repo.cwd, '.claude/settings.json'), 'utf8'));
  assert.equal(updated.existing, true);
  assert.equal(updated.hooks.Stop.length, 1);
  assert.equal(updated.hooks.PostToolUse.length, 1);
  assert.equal(updated.hooks.Stop[0].hooks[0].command, 'existing-hook');
  stage(repo, 'src/app/page.tsx');
  const commit = spawnSync(
    'git',
    ['-c', 'user.name=OKF Test', '-c', 'user.email=okf@example.invalid', 'commit', '-m', 'test'],
    { ...repo, encoding: 'utf8' },
  );
  assert.equal(commit.status, 1);
  assert.match(commit.stderr, /OKF/);
});

test('PowerShell entry point preserves check failures and works outside the repository', {
  skip: process.platform !== 'win32',
}, (t) => {
  const repo = fixture(t);
  const run = () => spawnSync(
    'powershell.exe',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', join(repo.cwd, 'scripts/okf.ps1'), 'check'],
    { cwd: tmpdir(), env: repo.env, encoding: 'utf8' },
  );
  const clean = run();
  assert.equal(clean.status, 0, clean.stderr);
  stage(repo, 'src/app/page.tsx');
  assert.equal(run().status, 1);
  stage(repo, 'okf/architecture/routing.md');
  stage(repo, 'okf/log.md');
  assert.equal(run().status, 0);
});

test('installer leaves an existing hooksPath or pre-commit intact', (t) => {
  const repo = fixture(t);
  execFileSync('git', ['config', '--local', 'core.hooksPath', 'custom-hooks'], repo);
  const run = () =>
    spawnSync(process.execPath, [join(root, 'scripts/install-okf-hooks.mjs')], repo);
  assert.equal(run().status, 1);
  assert.equal(
    execFileSync('git', ['config', '--get', 'core.hooksPath'], {
      ...repo,
      encoding: 'utf8',
    }).trim(),
    'custom-hooks',
  );
  execFileSync('git', ['config', '--local', '--unset', 'core.hooksPath'], repo);
  writeFileSync(join(repo.cwd, '.git/hooks/pre-commit'), 'existing-hook');
  assert.equal(run().status, 1);
  assert.equal(readFileSync(join(repo.cwd, '.git/hooks/pre-commit'), 'utf8'), 'existing-hook');
});
