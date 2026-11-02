import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { URL } from 'node:url';

const manifest = JSON.parse(
  readFileSync(new URL('../.next/server/app-paths-manifest.json', import.meta.url), 'utf8'),
);

// Compare source entrypoints with production build output, including new preview routes.
const expectedRoutes = readdirSync(new URL('../src/app/', import.meta.url), { recursive: true })
  .filter((path) => /(^|[\\/])page\.tsx$/.test(path))
  .map(
    (path) =>
      '/' +
      path
        .replaceAll('\\', '/')
        .replace(/(^|\/)page\.tsx$/, '')
        .split('/')
        .filter((part) => part && !part.startsWith('('))
        .join('/'),
  )
  .sort();

test('all existing URLs are compiled as App Router pages', () => {
  const actual = Object.keys(manifest)
    .filter((route) => route.endsWith('/page') && !route.startsWith('/_'))
    .map((route) => route.slice(0, -5) || '/')
    .sort();
  assert.deepEqual(actual, expectedRoutes);
});

test('Next and React versions are pinned without React Router', () => {
  const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
  for (const [name, version] of Object.entries({
    next: '16.3.5',
    react: '19.2.8',
    'react-dom': '19.2.8',
  })) {
    assert.equal(manifest.dependencies[name], version);
    assert.equal(lock.packages[`node_modules/${name}`].version, version);
  }
  assert.equal(manifest.dependencies['react-router-dom'], undefined);
  assert.equal(lock.packages['node_modules/react-router-dom'], undefined);
});
