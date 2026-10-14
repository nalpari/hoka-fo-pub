import { execFileSync, spawnSync } from 'node:child_process';
import { chmodSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';

const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();

process.chdir(root);

const current = spawnSync('git', ['config', '--get', 'core.hooksPath'], { encoding: 'utf8' });

if (current.status !== 0 && current.status !== 1) {
  process.stderr.write(current.stderr);
  process.exit(current.status ?? 1);
}

if (current.stdout.trim() && resolve(current.stdout.trim()) !== resolve('.githooks')) {
  throw new Error(
    `기존 core.hooksPath를 유지했습니다: ${current.stdout.trim()}. 해당 pre-commit에 node scripts/okf-sync.mjs check를 연결하세요.`,
  );
}

const defaultHook = execFileSync('git', ['rev-parse', '--git-path', 'hooks/pre-commit'], {
  encoding: 'utf8',
}).trim();

if (
  !current.stdout.trim() &&
  existsSync(dirname(defaultHook)) &&
  readdirSync(dirname(defaultHook)).some((name) => !name.endsWith('.sample'))
) {
  throw new Error(
    '기존 Git 훅이 있어 자동 교체하지 않았습니다. 기존 pre-commit에 OKF 검사를 연결하세요.',
  );
}

chmodSync('.githooks/pre-commit', 0o755);
execFileSync('git', ['config', '--local', 'core.hooksPath', '.githooks']);

const claudeSettings = '.claude/settings.json';

if (existsSync(claudeSettings)) {
  const settings = JSON.parse(readFileSync(claudeSettings, 'utf8'));
  const hooks = JSON.parse(readFileSync('.codex/hooks.json', 'utf8')).hooks;
  settings.hooks ??= {};
  for (const name of ['PostToolUse']) {
    settings.hooks[name] ??= [];
    const command = hooks[name][0].hooks[0].command;
    const existing = settings.hooks[name].find(
      (group) => group.hooks?.length === 1 && group.hooks[0].command === command,
    );
    if (existing) Object.assign(existing, hooks[name][0]);
    else if (
      !settings.hooks[name].some((group) => group.hooks?.some((hook) => hook.command === command))
    ) {
      settings.hooks[name].push(hooks[name][0]);
    }
  }
  writeFileSync(claudeSettings, JSON.stringify(settings, null, 2) + '\n');
}

process.stdout.write('OKF Git 훅 설치 완료. Codex 훅은 /hooks에서 검토·신뢰한 뒤 적용됩니다.\n');
