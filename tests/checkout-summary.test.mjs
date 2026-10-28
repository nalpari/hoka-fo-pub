import assert from 'node:assert/strict';
import test from 'node:test';
import { getCheckoutSummary } from '../src/app/checkout/checkout-summary.ts';

const products = [{ id: 'shoe', name: 'Shoe', price: 150000 }];

const item = { id: 'shoe', color: 'Black', width: 'Regular', size: '250', quantity: 2 };

test('totals quantities without merging different product options', () => {
  const cart = [item, { ...item, color: 'White', size: '260', quantity: 1 }];
  const before = cart.map((item) => ({ ...item }));
  const result = getCheckoutSummary(cart, products);
  assert.equal(result.total, 450000);
  assert.equal(result.rows.length, 2);
  assert.equal(result.rows[0].item, cart[0]);
  assert.equal(result.rows[1].item, cart[1]);
  assert.deepEqual(cart, before);
});

test('unknown products are omitted from both rows and the amount', () => {
  const result = getCheckoutSummary([item, { ...item, id: 'missing' }], products);
  assert.equal(result.rows.length, 1);
  assert.equal(result.total, 300000);
});

test('an empty cart or catalogue yields no rows and zero total', () => {
  assert.deepEqual(getCheckoutSummary([], products), { rows: [], total: 0 });
  assert.deepEqual(getCheckoutSummary([item], []), { rows: [], total: 0 });
});
