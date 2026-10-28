import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { URL, fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = fileURLToPath(new URL('../', import.meta.url));

// Load the real TSX controls and generated Panda runtime without a browser or mocks.
registerHooks({
  resolve(specifier, context, nextResolve) {
    const base = specifier.startsWith('@/')
      ? path.join(root, 'src', specifier.slice(2))
      : specifier.startsWith('styled-system/')
        ? path.join(root, specifier, 'index.mjs')
        : specifier.startsWith('.') && context.parentURL?.includes('/src/')
          ? fileURLToPath(new URL(specifier, context.parentURL))
          : null;
    if (base) {
      const file = [base, `${base}.tsx`, `${base}.ts`].find((candidate) => existsSync(candidate));
      if (file) return nextResolve(pathToFileURL(file).href, context);
    }
    if (
      ['next/image', 'next/link', 'next/navigation'].includes(specifier) &&
      context.parentURL?.includes('/src/')
    )
      return nextResolve(
        pathToFileURL(path.join(root, 'node_modules', `${specifier}.js`)).href,
        context,
      );
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    // Server markup assertions do not evaluate stylesheets; color is covered by stories.
    if (url.endsWith('.css')) return { format: 'module', shortCircuit: true, source: '' };
    if (url.startsWith(pathToFileURL(path.join(root, 'src')).href) && /\.tsx?$/.test(url)) {
      return {
        format: 'module',
        shortCircuit: true,
        source: ts.transpileModule(readFileSync(fileURLToPath(url), 'utf8'), {
          fileName: fileURLToPath(url),
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            jsx: ts.JsxEmit.ReactJSX,
            target: ts.ScriptTarget.ES2022,
          },
        }).outputText,
      };
    }
    return nextLoad(url, context);
  },
});

const h = React.createElement;

const { FormField } = await import('../src/components/common/atoms/FormField.tsx');

const fixtures = [
  ['TextInput', 'atoms/TextInput', {}],
  ['TextInput', 'atoms/TextInput', { type: 'password' }],
  ['TextInput', 'atoms/TextInput', { multiline: true }],
  ['Select', 'atoms/Select', { children: h('option', null, '선택') }],
  ['Dropdown', 'atoms/Dropdown', { ariaLabel: '선택', options: [{ value: 'a', label: 'A' }] }],
  ['Checkbox', 'atoms/Checkbox', { label: '동의', checked: false }],
  [
    'Checkbox',
    'atoms/Checkbox',
    {
      ariaLabel: '동의 목록',
      options: [{ value: 'a', label: 'A' }],
      value: [],
      onValueChange() {},
    },
  ],
  [
    'Radio',
    'atoms/Radio',
    { ariaLabel: '선택', options: [{ value: 'a', label: 'A' }], value: '', onValueChange() {} },
  ],
  ['RatingStars', 'atoms/RatingStars', { ariaLabel: '별점', value: 0, onValueChange() {} }],
  [
    'RangeInput',
    '../catalog/ProductListingPage',
    { 'aria-label': '범위', value: 10, onValueChange() {} },
  ],
  ['NumberStepper', 'atoms/NumberStepper', { value: 1, onChange() {} }],
  [
    'Checkbox',
    'atoms/Checkbox',
    { variant: 'consent', checked: false, label: '동의', onCheckedChange() {} },
  ],
  [
    'SizeSelector',
    'molecules/SizeSelector/SizeSelector',
    {
      mode: 'single',
      ariaLabel: '사이즈',
      value: '',
      options: [{ value: '250' }],
      onValueChange() {},
    },
  ],
  [
    'SizeSelector',
    'molecules/SizeSelector/SizeSelector',
    {
      mode: 'multiple',
      ariaLabel: '사이즈',
      value: [],
      options: [{ value: '250' }],
      onValueChange() {},
    },
  ],
];

for (const [index, [name, modulePath, props]] of fixtures.entries()) {
  const { [name]: Control } = await import(`../src/components/common/${modulePath}.tsx`);
  test(`${index}: ${name} inherits field error and description`, () => {
    const html = renderToStaticMarkup(
      h(FormField, { htmlFor: 'audit', error: '필수 입력' }, h(Control, props)),
    );
    assert.match(html, /aria-invalid="true"/);
    assert.match(html, /aria-describedby="[^"]*audit-error/);
    assert.match(html, /role="alert"/);
  });
  test(`${index}: ${name} has no invalid state without an error`, () => {
    const html = renderToStaticMarkup(h(FormField, { htmlFor: 'audit' }, h(Control, props)));
    assert.doesNotMatch(html, /aria-invalid="true"/);
  });
}

const { RatingStars } = await import('../src/components/common/atoms/RatingStars.tsx');

test('RatingStars display retains half stars without interactive controls', () => {
  const html = renderToStaticMarkup(h(RatingStars, { value: 4.5 }));
  assert.match(html, /role="img"/);
  assert.match(html, /aria-label="4.5 out of 5 stars"/);
  assert.match(html, /rating-star-half/);
  assert.doesNotMatch(html, /role="radio/);
});

test('RatingStars selection renders five icon radios with one selected value', () => {
  const html = renderToStaticMarkup(
    h(RatingStars, { ariaLabel: '별점', value: 3, name: 'rating', onValueChange() {} }),
  );
  assert.match(html, /role="radiogroup"/);
  assert.equal((html.match(/role="radio"/g) ?? []).length, 5);
  assert.equal((html.match(/aria-checked="true"/g) ?? []).length, 1);
  assert.equal((html.match(/data-icon="star"/g) ?? []).length, 5);
  assert.doesNotMatch(html, /★/);
});

const { StatusMessage } = await import('../src/components/common/atoms/StatusMessage.tsx');

const { PlatformProvider, usePlatform } = await import('../src/context/platform.tsx');

const { Badge } = await import('../src/components/common/atoms/Badge.tsx');

test('Badge keeps ordinary labels and resolves both launch statuses', () => {
  assert.match(renderToStaticMarkup(h(Badge, null, '배송완료')), /배송완료/);
  assert.match(renderToStaticMarkup(h(Badge, { status: 'COMING' })), /COMING SOON/);
  assert.match(renderToStaticMarkup(h(Badge, { status: 'IN_STOCK' })), /IN STOCK/);
});

test('Badge promotions retain ordered labels, separators, weight and empty rendering', () => {
  const html = renderToStaticMarkup(
    h(Badge, { promotion: ['Best', 'New', 'Exclusive'], weight: 'medium' }),
  );
  assert.match(html, /Best.*New.*Exclusive/);
  assert.equal((html.match(/aria-hidden="true"/g) ?? []).length, 2);
  assert.match(html, /fw_medium/);
  const single = renderToStaticMarkup(h(Badge, { promotion: 'New' }));
  assert.match(single, /New/);
  assert.doesNotMatch(single, /aria-hidden/);
  assert.equal(renderToStaticMarkup(h(Badge, { promotion: [] })), '');
});

function PlatformProbe() {
  return h('output', null, usePlatform());
}

test('automatic platform renders web on the server without browser globals', () => {
  assert.equal(
    renderToStaticMarkup(h(PlatformProvider, null, h(PlatformProbe))),
    '<output>web</output>',
  );
});

for (const platform of ['web', 'mobile']) {
  test(`explicit ${platform} platform remains available during server rendering`, () => {
    assert.equal(
      renderToStaticMarkup(h(PlatformProvider, { platform }, h(PlatformProbe))),
      `<output>${platform}</output>`,
    );
  });
}

for (const tone of ['error', 'success', 'info']) {
  test(`StatusMessage ${tone} retains accessible tone`, () => {
    const html = renderToStaticMarkup(h(StatusMessage, { tone }, '안내'));
    assert.match(html, new RegExp(`data-tone="${tone}"`));
    assert.match(html, new RegExp(`role="${tone === 'error' ? 'alert' : 'status'}"`));
    assert.match(html, new RegExp(`aria-live="${tone === 'error' ? 'assertive' : 'polite'}"`));
    assert.match(html, /class="[^"]+"/);
  });
}
