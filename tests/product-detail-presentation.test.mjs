import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import test from 'node:test';
import { URL } from 'node:url';
import { getProductDetailPresentation } from '../src/shared/features/product/productDetailPresentation.ts';

const product = Object.freeze({
  name: 'Clifton 11 GTX',
  styleCode: 'HOKADFG34S',
  runningType: '데일리 러닝',
  width: 'Regular',
  cushioning: 'Plush',
  stability: 'Neutral',
});

test('Clifton preview keeps its verified specifications and local editorial assets', () => {
  const presentation = getProductDetailPresentation(product);
  assert.deepEqual(
    presentation.specifications.map(({ value }) => value),
    ['312g', '43/38mm (5mm)'],
  );
  assert.equal(presentation.scales.length, 3);
  assert.equal(presentation.notice.length, 8);
  assert.equal(presentation.notice.find(({ label }) => label === '제조국').value, 'CHINA');
  assert.equal(presentation.features.length, 3);
  for (const feature of presentation.features) {
    assert.ok(statSync(new URL(`../public${feature.image}`, import.meta.url)).size > 0);
  }
});

test('another product cannot inherit Clifton measurements, scales, or imagery', () => {
  const other = { ...product, name: 'Other shoe', styleCode: 'OTHER', width: 'Wide' };
  const presentation = getProductDetailPresentation(other);
  assert.deepEqual(presentation.specifications, [
    { label: '용도', value: other.runningType },
    { label: '발볼', value: 'Wide' },
  ]);
  assert.deepEqual(presentation.scales, []);
  assert.deepEqual(presentation.features, []);
  assert.equal(presentation.notice.find(({ label }) => label === '소재').value, '상품별 표기 참조');
  assert.deepEqual(
    presentation.attributes.map(({ value }) => value),
    ['Plush', 'Neutral'],
  );
});

test('missing style codes preserve the notice fallback without assuming Clifton content', () => {
  const presentation = getProductDetailPresentation({ ...product, styleCode: undefined });
  assert.equal(presentation.notice[1].value, '상품별 표기 참조');
  assert.deepEqual(presentation.features, []);
  assert.equal(product.styleCode, 'HOKADFG34S');
});
