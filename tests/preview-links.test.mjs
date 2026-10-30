import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath, URL } from 'node:url';
import vm from 'node:vm';

import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));

const modules = new Map();

// These three registry modules are pure data; resolve the same aliases as the application.
function load(relative) {
  const file = path.resolve(root, relative);
  if (modules.has(file)) return modules.get(file).exports;
  const module = { exports: {} };
  modules.set(file, module);
  if (file.endsWith('.json')) {
    module.exports = JSON.parse(readFileSync(file, 'utf8'));
    return module.exports;
  }
  const source = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const require = (specifier) => {
    let resolved = specifier.startsWith('@/')
      ? path.join(root, 'src', specifier.slice(2))
      : path.resolve(path.dirname(file), specifier);
    if (!path.extname(resolved)) resolved += '.ts';
    return load(resolved);
  };
  vm.runInThisContext(`(function(require, module, exports) {${source}\n})`, {
    filename: file,
  })(require, module, module.exports);
  return module.exports;
}

const { screens } = load('src/data/screenRegistry.ts');

const { getScreenConnection, isScreenDeleted } = load('src/app/screen-index/screenConnections.ts');

test('Featured owns Running Session while UTMB remains a menu-only source IA', () => {
  const featured = screens.find((screen) => screen.iaNumber === 155);
  const utmb = screens.find((screen) => screen.iaNumber === 158);
  assert.equal(getScreenConnection(featured).route, '/running/running-session');
  assert.deepEqual(utmb.depths.slice(0, 3), ['EXPLORE', 'Partnerships', 'UTMB']);
  assert.equal(getScreenConnection(utmb).route, undefined);
  assert.deepEqual(getScreenConnection(utmb).sourceFiles, []);
  assert.deepEqual(getScreenConnection(utmb).stories, {});
  for (const number of [155, 258, 259]) {
    assert.deepEqual(screens.find((screen) => screen.iaNumber === number).depths.slice(0, 3), [
      'EXPLORE',
      'Featured',
      'Running Session',
    ]);
  }
  assert.ok(!screens.some((screen) => screen.depths[1] === 'Running Session'));
  const featuredIndex = screens.findIndex((screen) => screen.iaNumber === 155);
  assert.equal(screens[featuredIndex + 1].iaNumber, 258);
  assert.equal(screens[featuredIndex + 2].iaNumber, 259);
});

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}

test('every fixed preview page is reachable from an active IA row and its source graph', () => {
  const previews = files(path.join(root, 'src/app')).filter((file) =>
    /\/preview-[^/]+\/page\.tsx$/.test(file.replaceAll('\\', '/')),
  );
  assert.ok(previews.length > 2);
  for (const file of previews) {
    const relative = path.relative(path.join(root, 'src/app'), file).replaceAll('\\', '/');
    const href = '/' + relative.replace(/\/page\.tsx$/, '');
    const owners = screens.filter((screen) => {
      if (isScreenDeleted(screen)) return false;
      const connection = getScreenConnection(screen);
      return (
        connection.route === href ||
        connection.previewRoutes?.some((item) => item.href.split('#')[0] === href)
      );
    });
    assert.ok(owners.length, `No active screen-index link for ${href}`);
    assert.ok(
      owners.some((screen) =>
        getScreenConnection(screen).sourceFiles.includes('src/app/' + relative),
      ),
      `Missing graph entry for ${href}`,
    );
  }
});

test('preview links are unique per IA row and resolve to implemented static or dynamic pages', () => {
  const pages = files(path.join(root, 'src/app'))
    .filter((file) => file.endsWith(`${path.sep}page.tsx`))
    .map((file) =>
      ('/' + path.relative(path.join(root, 'src/app'), file).replaceAll('\\', '/')).replace(
        /\/page\.tsx$/,
        '',
      ),
    );
  for (const screen of screens.filter((screen) => !isScreenDeleted(screen))) {
    const previews = getScreenConnection(screen).previewRoutes ?? [];
    assert.equal(new Set(previews.map((item) => item.href)).size, previews.length);
    for (const { href, label } of previews) {
      assert.ok(label.trim());
      const pathname = href.split(/[?#]/)[0];
      assert.ok(
        pages.some((route) =>
          new RegExp('^' + route.replace(/\[[^\]]+\]/g, '[^/]+') + '$').test(pathname),
        ),
        `Broken preview URL ${href} in IA ${screen.iaNumber}`,
      );
    }
  }
});

test('session history is connected to its active IA without reviving the deleted event row', () => {
  const history = screens.find((screen) => screen.iaNumber === 200);
  const deleted = screens.find((screen) => screen.iaNumber === 198);
  assert.equal(isScreenDeleted(history), false);
  assert.equal(getScreenConnection(history).route, '/mypage/event-entries');
  assert.equal(isScreenDeleted(deleted), true);
  assert.equal(getScreenConnection(deleted).route, undefined);
});
