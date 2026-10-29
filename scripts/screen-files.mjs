import console from 'node:console';
import { existsSync, readFileSync, readdirSync, watch, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { clearTimeout, setTimeout } from 'node:timers';
import { fileURLToPath } from 'node:url';

import { format, resolveConfig } from 'prettier';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const output = 'src/app/screen-index/sourceGraph.generated.json';

const codeFile = /\.[cm]?[jt]sx?$/;

export function buildSourceGraph(projectRoot) {
  const configPath = path.join(projectRoot, 'tsconfig.json');
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error)
    throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, projectRoot);
  const resolutionCache = ts.createModuleResolutionCache(
    projectRoot,
    (file) => file,
    parsed.options,
  );
  const graph = {};
  const bindingFiles = [];
  const relative = (file) => path.relative(projectRoot, file).split(path.sep).join('/');
  const eligible = (file) =>
    codeFile.test(file) &&
    !file.endsWith('.d.ts') &&
    !file.startsWith('src/stories/') &&
    !file.startsWith('src/app/screen-index/');

  function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) =>
      a.name.localeCompare(b.name, 'en'),
    )) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        scan(absolute);
        continue;
      }
      const file = relative(absolute);
      if (!eligible(file)) continue;
      const content = readFileSync(absolute, 'utf8');
      // 공통 UI·재사용 요청 훅·프리뷰·목 데이터는 서비스 연결 대상이 아니다.
      if (
        /\[\s*개발팀 바인딩\s*\]/.test(content) &&
        !file.startsWith('src/components/common/') &&
        !file.startsWith('src/hooks/') &&
        !file.startsWith('src/mocks/') &&
        !/Preview/.test(file)
      )
        bindingFiles.push(file);
      const source = ts.createSourceFile(absolute, content, ts.ScriptTarget.Latest, true);
      const imports = new Set();
      function visit(node) {
        let specifier;
        if (ts.isImportDeclaration(node)) {
          const clause = node.importClause;
          if (clause?.isTypeOnly) return;
          if (
            clause &&
            !clause.name &&
            clause.namedBindings &&
            ts.isNamedImports(clause.namedBindings) &&
            clause.namedBindings.elements.length &&
            clause.namedBindings.elements.every((item) => item.isTypeOnly)
          )
            return;
          specifier = node.moduleSpecifier;
        } else if (ts.isExportDeclaration(node)) {
          if (node.isTypeOnly) return;
          if (
            node.exportClause &&
            ts.isNamedExports(node.exportClause) &&
            node.exportClause.elements.length &&
            node.exportClause.elements.every((item) => item.isTypeOnly)
          )
            return;
          specifier = node.moduleSpecifier;
        } else if (
          ts.isCallExpression(node) &&
          (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
            (ts.isIdentifier(node.expression) && node.expression.text === 'require'))
        ) {
          specifier = node.arguments[0];
        }
        if (specifier && ts.isStringLiteral(specifier)) {
          const resolved = ts.resolveModuleName(
            specifier.text,
            absolute,
            parsed.options,
            ts.sys,
            resolutionCache,
          ).resolvedModule;
          if (resolved) {
            const dependency = relative(resolved.resolvedFileName);
            if (dependency.startsWith('src/') && eligible(dependency)) imports.add(dependency);
          }
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
      graph[file] = [...imports].sort();
    }
  }

  scan(path.join(projectRoot, 'src'));
  return { imports: graph, bindingFiles };
}

async function generate() {
  const target = path.join(root, output);
  const content = await format(JSON.stringify(buildSourceGraph(root)), {
    ...(await resolveConfig(target)),
    filepath: target,
  });
  if (existsSync(target) && readFileSync(target, 'utf8') === content) return;
  writeFileSync(target, content);
  console.log('[screen-files] IA source graph updated');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generate();
  if (process.argv.includes('--watch')) {
    let timer;
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        try {
          await generate();
        } catch (error) {
          console.error('[screen-files] Generation failed:', error);
        }
      }, 200);
    };
    watch(path.join(root, 'src'), { recursive: true }, (_event, filename) => {
      if (filename && (codeFile.test(filename) || !path.extname(filename))) schedule();
    });
    watch(path.join(root, 'tsconfig.json'), schedule);
    console.log('[screen-files] Watching source imports');
  }
}
