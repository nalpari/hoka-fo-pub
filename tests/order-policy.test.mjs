import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getClaimAmount,
  getRemainingLines,
  submitOrderClaim,
  filterOrders,
  getPeriodStart,
  getClaimKind,
} from '../src/shared/features/orders/order-policy.ts';

const order = {
  id: 'order-1',
  date: '2026-10-10',
  status: 'paid',
  expectedDate: '10월 20일',
  items: [
    { key: 'a', name: '클리프톤', price: 230000, quantity: 3 },
    { key: 'b', name: '스피드고트', price: 240000, quantity: 1 },
  ],
  claims: [],
};

test('partial claims reserve only selected units and reject a second excessive claim', () => {
  const result = submitOrderClaim(order, 'cancel', { a: 2 }, 'damage', '', '2026-10-23');
  assert.equal(result.ok, true);
  assert.equal(getRemainingLines(result.order)[0].quantity, 1);
  assert.equal(
    submitOrderClaim(result.order, 'cancel', { a: 2 }, 'damage', '', '2026-10-23').ok,
    false,
  );
  assert.equal(order.claims.length, 0);
});

test('rejects missing selection, reason, unknown keys, fractional and invalid quantities', () => {
  for (const quantities of [{}, { missing: 1 }, { a: 4 }, { a: 1.5 }, { a: -1 }, { a: NaN }]) {
    assert.equal(
      submitOrderClaim(order, 'cancel', quantities, 'damage', '', '2026-10-23').ok,
      false,
    );
  }
  assert.equal(submitOrderClaim(order, 'cancel', { a: 1 }, '', '', '2026-10-23').ok, false);
});

test('allows actions only for the displayed eligible order statuses', () => {
  assert.equal(getClaimKind('paid'), 'cancel');
  assert.equal(getClaimKind('delivered'), 'return');
  for (const status of ['preparing', 'shipping', 'purchased', 'cancelled', 'returned'])
    assert.equal(getClaimKind(status), null);
  assert.equal(submitOrderClaim(order, 'return', { a: 1 }, 'damage', '', '2026-10-23').ok, false);
});

test('deducts one capped fee for customer reasons and none for faulty items', () => {
  assert.deepEqual(getClaimAmount(order.items, { a: 2, b: 1 }, 'mind'), {
    amount: 700000,
    fee: 5000,
    refund: 695000,
  });
  assert.equal(getClaimAmount(order.items, { a: 1 }, 'damage').fee, 0);
  assert.equal(getClaimAmount([{ key: 'a', price: 1000 }], { a: 1 }, 'size').refund, 0);
  assert.deepEqual(getClaimAmount(order.items, {}, 'mind'), { amount: 0, fee: 0, refund: 0 });
});

test('filters inclusive dates and product names without mutating the source', () => {
  assert.equal(
    filterOrders([order], { start: '2026-10-10', end: '2026-10-10', query: ' 클리프톤 ' }).length,
    1,
  );
  assert.equal(filterOrders([order], { start: '2026-10-11', end: '', query: '' }).length, 0);
  assert.equal(filterOrders([order], { start: '', end: '', query: 'missing' }).length, 0);
});

test('month periods clamp the day across short months and year boundaries', () => {
  assert.equal(getPeriodStart(1, '2026-03-31'), '2026-02-28');
  assert.equal(getPeriodStart(1, '2024-03-31'), '2024-02-29');
  assert.equal(getPeriodStart(3, '2026-01-31'), '2025-10-31');
});
