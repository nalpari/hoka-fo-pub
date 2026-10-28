import assert from 'node:assert/strict';
import test from 'node:test';
import { ESLint } from 'eslint';
import ts from 'typescript';

const eslint = new ESLint({
  fix: true,
  overrideConfig: [{ rules: { '@typescript-eslint/no-unused-vars': 'off' } }],
});

function imports(source) {
  return ts
    .createSourceFile('fixture.tsx', source, ts.ScriptTarget.Latest, true)
    .statements.filter(ts.isImportDeclaration);
}

async function sort(source) {
  const [result] = await eslint.lintText(source, { filePath: 'src/import-order.fixture.tsx' });
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
  return result.output ?? source;
}

const paths = (source) => imports(source).map((node) => node.moduleSpecifier.text);

test('imports follow Next, packages, Panda, common layers, internal, and relative groups', async () => {
  const source = `import { Local } from './local';
import { useShop } from '@/context/ShopShell';
import { ContentLayout } from '@/components/common/layouts/ContentLayout/ContentLayout';
import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations/OrderRecommendations';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { Button } from '@/components/common/atoms/Button/Button';
import { css } from 'styled-system/css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
`;
  const output = await sort(source);
  assert.deepEqual(paths(output), paths(source).reverse());
  assert.equal(output.match(/\n\n/g)?.length, 8);
});

test('compatibility aliases use their real common layer and domain groups', async () => {
  const output = await sort(`import { fixture } from '@mocks/fixture';
import { Domain } from '@features/catalog/View';
import { Layout } from '@components/layouts/Layout';
import { Organism } from '@components/organisms/Organism';
import { Molecule } from '@components/molecules/Molecule';
import { Atom } from '@components/atoms/Atom';
import { Button } from '@atoms/Button/Button';
import { nextTheme } from 'next-themes';
import Link from 'next/link';
`);
  assert.deepEqual(paths(output), [
    'next/link',
    'next-themes',
    '@atoms/Button/Button',
    '@components/atoms/Atom',
    '@components/molecules/Molecule',
    '@components/organisms/Organism',
    '@components/layouts/Layout',
    '@features/catalog/View',
    '@mocks/fixture',
  ]);
});

test('type-only and inline type imports stay in their path group and retain their form', async () => {
  const output = await sort(`import type { Zoo, Alpha } from '@/types/example';
import { useState, type ReactNode, type ComponentProps } from 'react';
import type { Metadata } from 'next';
`);
  const nodes = imports(output);
  assert.deepEqual(paths(output), ['next', 'react', '@/types/example']);
  assert.equal(nodes[0].importClause.isTypeOnly, true);
  assert.equal(nodes[2].importClause.isTypeOnly, true);
  assert.equal(nodes[1].importClause.isTypeOnly, false);
  assert.deepEqual(
    nodes[1].importClause.namedBindings.elements.map((node) => [node.name.text, node.isTypeOnly]),
    [
      ['ComponentProps', true],
      ['ReactNode', true],
      ['useState', false],
    ],
  );
});

test('CSS and other side-effect imports remain fixed boundaries between sortable runs', async () => {
  const output = await sort(`import { z } from 'z';
import { navigation } from 'next/navigation';
import './first.css';
import { state } from 'react';
import Link from 'next/link';
import './polyfill';
import { zed } from 'zed';
import { alpha } from 'alpha';
import './last.scss';
`);
  assert.deepEqual(paths(output), [
    'next/navigation',
    'z',
    './first.css',
    'next/link',
    'react',
    './polyfill',
    'alpha',
    'zed',
    './last.scss',
  ]);
});

test('directives, import comments, and export order are preserved', async () => {
  const output = await sort(`'use client';

// Keep this description with the atom.
import { Button } from '@/components/common/atoms/Button/Button';
import { useState } from 'react';

export const z = 1;

export const a = 2;
`);
  assert.ok(output.startsWith("'use client';"));
  assert.match(output, /\/\/ Keep this description with the atom\.\nimport \{ Button \}/);
  assert.ok(output.indexOf('export const z') < output.indexOf('export const a'));
});

test('running the import fixer twice is idempotent', async () => {
  const once = await sort(`import { Zoo, Alpha } from 'react';
import { css } from 'styled-system/css';
import Link from 'next/link';
`);
  const [twice] = await eslint.lintText(once, { filePath: 'src/import-order.fixture.tsx' });
  assert.equal(twice.errorCount, 0);
  assert.equal(twice.output, undefined);
});

test('imports do not cross executable statements or empty runtime imports', async () => {
  const output = await sort(`import { z } from 'z';
import { a } from 'a';
const ready = true;
import { zz } from 'zz';
import { aa } from 'aa';
import {} from './initialize';
import { zzz } from 'zzz';
import { aaa } from 'aaa';
`);
  assert.deepEqual(paths(output), ['a', 'z', 'aa', 'zz', './initialize', 'aaa', 'zzz']);
  assert.ok(output.indexOf('const ready') > output.indexOf("from 'z'"));
  assert.ok(output.indexOf('const ready') < output.indexOf("from 'aa'"));
});

test('Node builtin type imports are external, not a separate global type group', async () => {
  const output = await sort(`import { css } from 'styled-system/css';
import type { ReadStream } from 'node:fs';
import type { Metadata } from 'next';
`);
  assert.deepEqual(paths(output), ['next', 'node:fs', 'styled-system/css']);
});

test('generated build output and temporary workspaces are excluded', async () => {
  for (const file of [
    '.next/server/example.js',
    'storybook-static/example.js',
    'styled-system/jsx/example.ts',
    '.tmp/workspace/example.ts',
    '.tmp-dev-all-config/example.ts',
  ]) {
    assert.equal(await eslint.isPathIgnored(file), true, file);
  }
  assert.equal(await eslint.isPathIgnored('src/import-order.fixture.tsx'), false);
});
