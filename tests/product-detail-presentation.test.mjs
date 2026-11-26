import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import test from 'node:test';
import { URL } from 'node:url';
import {
  getProductDetailPresentation,
  getProductMeasurementChart,
  productDetailAnchors,
  productDetailAnchorsWithSize,
} from '../src/app/products/[id]/productDetailPresentation.ts';
import { prepareProductDetailPreview } from '../src/app/products/[id]/productDetailPreviews.ts';

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

test('only apparel and accessories with populated measurements get the size section and anchor', () => {
  const measurementChart = {
    sizes: ['One Size'],
    rows: [{ label: '길이', valuesCm: [16] }],
  };
  for (const productKind of ['apparel', 'accessories']) {
    assert.equal(getProductMeasurementChart({ productKind, measurementChart }), measurementChart);
    assert.equal(getProductMeasurementChart({ productKind }), undefined);
    for (const empty of [
      { ...measurementChart, sizes: [] },
      { ...measurementChart, rows: [] },
    ]) {
      assert.equal(getProductMeasurementChart({ productKind, measurementChart: empty }), undefined);
    }
  }
  assert.equal(
    getProductMeasurementChart({ productKind: 'footwear', measurementChart }),
    undefined,
  );
  assert.equal(getProductMeasurementChart({ measurementChart }), undefined);
  assert.deepEqual(
    productDetailAnchorsWithSize.map(({ id }) => id),
    ['product-details', 'product-size', 'product-reviews', 'product-inquiries'],
  );
  assert.equal(
    productDetailAnchors.some(({ id }) => id === 'product-size'),
    false,
  );
});

test('accessory measurements use the latest ordered columns independently of purchase options', () => {
  const displayProduct = { id: 'accessory-42', productKind: 'accessories', sizes: ['sold-out'] };
  assert.equal(getProductMeasurementChart(displayProduct), undefined);
  for (let sizeCount = 1; sizeCount <= 6; sizeCount++) {
    const measurementChart = {
      sizes: Array.from({ length: sizeCount }, (_, index) => 'Display ' + (index + 1)),
      rows: [
        { label: '길이', valuesCm: Array.from({ length: sizeCount }, (_, index) => index + 10) },
      ],
    };
    assert.equal(
      getProductMeasurementChart({ ...displayProduct, measurementChart }),
      measurementChart,
    );
  }
  assert.equal(getProductMeasurementChart(displayProduct), undefined);
});

test('EveryRun preview uses the six design sizes and complete measurement rows', () => {
  const everyRun = prepareProductDetailPreview(product, 'apparel');
  const chart = getProductMeasurementChart(everyRun);
  assert.deepEqual(chart.sizes, ['XS(080)', 'S(085)', 'M(090)', 'L(095)', 'XL(100)', 'XXL(105)']);
  assert.deepEqual(chart.rows, [
    { label: '어깨너비', valuesCm: [32.5, 34, 35.5, 37, 38.5, 40] },
    { label: '소매길이', valuesCm: [83.5, 86, 88.5, 91, 93.5, 96] },
    { label: '가슴둘레', valuesCm: [115, 120, 125, 130, 135, 140] },
    { label: '전체길이', valuesCm: [66, 67, 69, 71, 73, 75] },
  ]);
  assert.deepEqual(everyRun.soldOut, ['XXL']);
});
