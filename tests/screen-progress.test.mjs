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

const { getScreenProgress, screenReviewNotes } = await import(
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

test('implemented designs keep absent screens pending and preserve explicit platform overrides', () => {
  for (const iaNumber of [251, 254]) {
    const result = getScreenProgress({ iaNumber, screenCode: '' }, {});
    assert.equal(result.pcDesign, 'received');
    assert.equal(result.moDesign, 'received');
    assert.equal(result.pcPublishing, 'ready');
    assert.equal(result.moPublishing, 'ready');
    assert.equal(screenReviewNotes[iaNumber], undefined);
  }
  const ipin = getScreenProgress({ iaNumber: 235, screenCode: 'eland_hjo_03' }, {});
  assert.equal(ipin.pcPublishing, 'pending');
  assert.equal(ipin.moPublishing, 'pending');
  assert.equal(ipin.pcDesign, 'missing');
  const terms = getScreenProgress({ iaNumber: 236, screenCode: 'eland_hjo_04' }, {});
  assert.equal(terms.pcPublishing, 'ready');
  assert.equal(terms.moPublishing, 'ready');
  assert.equal(
    getScreenProgress({ iaNumber: 234, screenCode: '' }, { 234: { moPublishing: 'ready' } })
      .moPublishing,
    'ready',
  );
});

test('password completion design is supplied on both platforms without inferring a new review', () => {
  const result = getScreenProgress({ iaNumber: 252, screenCode: '' }, {});
  assert.equal(result.pcDesign, 'received');
  assert.equal(result.moDesign, 'received');
  assert.equal(result.pcPublishing, 'ready');
  assert.equal(result.moPublishing, 'ready');
});

test('cart comparison preserves user-confirmed mobile completion and PC design revision', () => {
  const result = getScreenProgress({ iaNumber: 170, screenCode: '' }, {});
  assert.equal(result.pcDesign, 'revision-planned');
  assert.equal(result.moDesign, 'received');
  assert.equal(result.pcPublishing, 'revision');
  assert.equal(result.moPublishing, 'ready');
  assert.match(screenReviewNotes[170], /PC 수정/);
});

test('order PC design revision preserves missing MO popups independently of implemented coupons', () => {
  for (const iaNumber of [171, 172, 173, 174, 175, 176]) {
    assert.equal(getScreenProgress({ iaNumber, screenCode: '' }, {}).pcDesign, 'revision-planned');
  }
  const coupon = getScreenProgress({ iaNumber: 174, screenCode: '' }, {});
  assert.equal(coupon.moDesign, 'received');
  assert.equal(coupon.moPublishing, 'ready');
  assert.equal(coupon.pcPublishing, 'ready');
  assert.equal(getScreenProgress({ iaNumber: 175, screenCode: '' }, {}).moDesign, 'missing');
});

test('support and mypage completion follows implemented checks independently of receipt', () => {
  for (const iaNumber of [182, 183, 184, 196, 200, 201, 202, 203, 204, 205, 209, 210, 219]) {
    const result = getScreenProgress({ iaNumber, screenCode: '' }, {});
    assert.equal(result.pcDesign, 'received');
    assert.equal(result.moDesign, 'received');
  }
  const notice = getScreenProgress({ iaNumber: 208, screenCode: '' }, {});
  assert.equal(notice.pcPublishing, 'ready');
  assert.equal(notice.moPublishing, 'revision');
  const history = getScreenProgress({ iaNumber: 200, screenCode: '' }, {});
  assert.equal(history.pcPublishing, 'revision');
  assert.equal(history.moPublishing, 'revision');
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
  assert.equal(getScreenProgress({ iaNumber: 158, screenCode: '' }, {}).pcDesign, 'received');
  assert.equal(getScreenProgress({ iaNumber: 158, screenCode: '' }, {}).moDesign, 'received');
  assert.equal(getScreenProgress({ iaNumber: 200, screenCode: '' }, {}).pcDesign, 'received');
  assert.equal(getScreenProgress({ iaNumber: 200, screenCode: '' }, {}).moDesign, 'received');
});
