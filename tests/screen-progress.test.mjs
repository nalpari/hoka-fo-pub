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
  assert.deepEqual(getScreenProgress({ iaNumber: 233, screenCode: 'eland_hjo_01' }, {}), {
    pcDesign: null,
    moDesign: null,
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
      pcDesign: null,
      moDesign: 'received',
      pcPublishing: 'pending',
      moPublishing: 'ready',
    },
  );
  assert.equal(getScreenProgress(screen, {}).pcDesign, null);
});
