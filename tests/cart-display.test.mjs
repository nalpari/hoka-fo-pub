import assert from 'node:assert/strict';
import test from 'node:test';
import { getCartImage } from '../src/mocks/cartDisplay.ts';

test('real catalogue images are preserved for colours also used by the demo', () => {
  for (const color of ['브라운', '레드', '화이트', '옐로우골드']) {
    assert.equal(getCartImage({ color }, '/catalogue/real-product.png'), '/catalogue/real-product.png');
  }
});

test('only an explicit fixture override replaces the catalogue image', () => {
  assert.equal(getCartImage({ color: '화이트', imageSrc: '/fixture.png' }, '/catalogue.png'), '/fixture.png');
});
