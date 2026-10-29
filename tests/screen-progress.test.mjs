import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { URL } from 'node:url';

import ts from 'typescript';

const source = readFileSync(
  new URL('../src/app/screen-index/storybookLinks.ts', import.meta.url),
  'utf8',
);

const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;

const { getScreenProgress } = await import(
  'data:text/javascript;base64,' + Buffer.from(compiled).toString('base64')
);

test('legacy publishing migration never infers design receipt', () => {
  assert.deepEqual(getScreenProgress({ iaNumber: 230, screenCode: 'eland_hlo_08' }, {}), {
    pcDesign: 'missing',
    moDesign: 'missing',
    pcPublishing: 'ready',
    moPublishing: 'ready',
  });
  assert.equal(
    getScreenProgress({ iaNumber: 80001, screenCode: 'eland_hca_02' }, {}).pcPublishing,
    'working',
  );
  assert.equal(
    getScreenProgress({ iaNumber: 80002, screenCode: 'unregistered' }, {}).moPublishing,
    'pending',
  );
  assert.equal(
    getScreenProgress({ iaNumber: 225, screenCode: 'eland_hlo_03' }, {}).pcPublishing,
    'pending',
  );
});

test('confirmed category templates share design receipt without inferring publishing completion', () => {
  const screen = getScreenProgress({ iaNumber: 4, screenCode: 'eland_hca_02' }, {});
  assert.equal(screen.pcDesign, 'received');
  assert.equal(screen.moDesign, 'received');
  assert.equal(screen.pcPublishing, 'working');
});

test('publishing comparison revision is independent from design revision and the other platform', () => {
  const screen = { iaNumber: 258, screenCode: '' };
  const result = getScreenProgress(screen, { 258: { pcPublishing: 'revision' } });
  assert.equal(result.pcPublishing, 'revision');
  assert.equal(result.moPublishing, 'ready');
  assert.equal(result.pcDesign, 'received');
});

test('PC and MO values remain independent and replacement data takes effect', () => {
  const screen = { iaNumber: 80003, screenCode: 'unregistered' };
  const overrides = {
    80003: {
      pcDesign: 'received',
      moDesign: 'missing',
      pcPublishing: 'ready',
      moPublishing: 'working',
    },
  };
  assert.deepEqual(getScreenProgress(screen, overrides), overrides[80003]);
  assert.deepEqual(
    getScreenProgress(screen, { 80003: { moDesign: 'received', moPublishing: 'ready' } }),
    {
      pcDesign: 'missing',
      moDesign: 'received',
      pcPublishing: 'pending',
      moPublishing: 'ready',
    },
  );
  assert.equal(getScreenProgress(screen, {}).pcDesign, 'missing');
});

test('confirmed Figma run club frames update design only and accept explicit clearing or revision', () => {
  for (const iaNumber of [258, 259]) {
    const screen = { iaNumber, screenCode: '' };
    const current = getScreenProgress(screen, {});
    assert.equal(current.pcDesign, 'received');
    assert.equal(current.moDesign, 'received');
    assert.equal(current.pcPublishing, 'ready');
    assert.equal(current.moPublishing, 'ready');
    const revised = getScreenProgress(screen, {
      [iaNumber]: { pcDesign: 'revision-planned', moDesign: null },
    });
    assert.equal(revised.pcDesign, 'revision-planned');
    assert.equal(revised.moDesign, null);
  }
  assert.equal(getScreenProgress({ iaNumber: 158, screenCode: '' }, {}).pcDesign, 'missing');
  assert.equal(getScreenProgress({ iaNumber: 200, screenCode: '' }, {}).pcDesign, 'missing');
  assert.equal(getScreenProgress({ iaNumber: 200, screenCode: '' }, {}).moDesign, 'received');
});
