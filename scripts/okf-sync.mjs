import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const rules = [
  [['src/app/', 'src/lib/device.ts'], 'okf/architecture/routing.md'],
  [
    [
      'src/context/ShopShell.tsx',
      'src/context/',
      'src/types/cart.ts',
      'src/components/cart/',
      'src/components/login/',
    ],
    'okf/architecture/state.md',
  ],
  [['src/mocks/', 'src/data/'], 'okf/project.md'],
  [
    [
      'src/shared/',
      'src/components/',
      'src/icons/',
      'src/lib/',
      'src/styles/',
      'src/types/',
      'src/stories/',
      'panda.config.ts',
      '.storybook/',
    ],
    'okf/architecture/ui.md',
  ],
  [
    ['package.json', 'package-lock.json', 'tsconfig.json', 'postcss.config.cjs'],
    'okf/development/setup.md',
  ],
  [['tests/', 'eslint.config.js'], 'okf/development/verification.md'],
  [['scripts/', '.githooks/', '.codex/hooks.json'], 'okf/maintenance.md'],
];

export function requiredDocs(paths) {
  const docs = new Set();
  for (const path of paths) {
    const rule = rules.find(([prefixes]) =>
      prefixes.some((prefix) => (prefix.endsWith('/') ? path.startsWith(prefix) : path === prefix)),
    );
    if (rule) docs.add(rule[1]);
    else if (path.startsWith('src/')) docs.add('okf/project.md');
  }
  if (docs.size) docs.add('okf/log.md');
  return [...docs];
}

export function missingDocs(changes, updatedDocs) {
  return requiredDocs(changes).filter((path) => !updatedDocs.includes(path));
}

function gitPaths(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).split('\0').filter(Boolean);
}

export function pendingDocs(stagedOnly) {
  const staged = gitPaths([
    'diff',
    '--cached',
    '--name-only',
    '--no-renames',
    '--diff-filter=ACDMRT',
    '-z',
  ]);
  if (stagedOnly) {
    const updated = gitPaths(['diff', '--cached', '--name-only', '--diff-filter=AM', '-z']);
    return missingDocs(staged, updated);
  }
  const changed = [
    ...staged,
    ...gitPaths(['diff', '--name-only', '--no-renames', '--diff-filter=ACDMRT', '-z']),
    ...gitPaths(['ls-files', '--others', '--exclude-standard', '-z']),
  ];
  const updated = [
    ...gitPaths(['diff', '--cached', '--name-only', '--diff-filter=AM', '-z']),
    ...gitPaths(['diff', '--name-only', '--diff-filter=AM', '-z']),
    ...gitPaths(['ls-files', '--others', '--exclude-standard', '-z']),
  ];
  return missingDocs(changed, updated);
}

export function hookOutput(event, missing) {
  if (!missing.length || event.hook_event_name !== 'PostToolUse') return {};
  const message = `소스 변경에 맞춰 다음 OKF 문서를 검토·갱신하세요: ${missing.join(', ')}. 실제 지식 변경이 없으면 관련 문서에 검토한 범위와 영향 없음을 기록하세요. okf/maintenance.md에 따라 출처·생성 시점·변경 이력을 갱신하고, 문서와 소스를 같은 커밋에 포함하세요.`;
  return {
    hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: message },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv[2] === 'hook') {
    const event = JSON.parse(readFileSync(0, 'utf8'));
    process.chdir(
      execFileSync('git', ['-C', event.cwd, 'rev-parse', '--show-toplevel'], {
        encoding: 'utf8',
      }).trim(),
    );
    process.stdout.write(JSON.stringify(hookOutput(event, pendingDocs(false))));
  } else if (process.argv[2] === 'check') {
    const missing = pendingDocs(true);
    if (missing.length) {
      process.stderr.write(
        `OKF 갱신이 커밋에 누락되었습니다:\n${missing.map((path) => `- ${path}`).join('\n')}\n관련 문서를 갱신하고 소스와 함께 스테이징하세요.\n`,
      );
      process.exitCode = 1;
    }
  } else {
    process.stderr.write('Usage: node scripts/okf-sync.mjs check|hook\n');
    process.exitCode = 1;
  }
}
