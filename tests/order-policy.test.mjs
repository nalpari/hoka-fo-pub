import assert from 'node:assert/strict';
import test from 'node:test';
import { previewOrders } from '../src/components/orders/orders.data.ts';
import { getClaimLines, orderStatusLabels } from '../src/components/orders/order-policy.ts';

test('prepared order and refund amounts are complete display values',()=>{
 for(const order of previewOrders){
  assert.ok(orderStatusLabels[order.status]);
  for(const amount of Object.values(order.displayAmounts))assert.ok(Number.isFinite(amount)&&amount>=0);
  for(const claim of order.claims){assert.ok(Number.isFinite(claim.displayAmount));assert.ok(Number.isFinite(claim.displayRefund));assert.ok(claim.displayRefund<=claim.displayAmount);}
 }
});

test('claim display lookup preserves prepared orders and uses line identifiers',()=>{
 const before=globalThis.structuredClone(previewOrders);
 for(const order of previewOrders)for(const claim of order.claims){
  const lines=getClaimLines(order,claim);
  assert.equal(lines.length,Object.keys(claim.quantities).length);
  for(const line of lines){assert.ok(order.items.some(item=>item.key===line.key));assert.equal(line.quantity,claim.quantities[line.key]);}
 }
 assert.deepEqual(previewOrders,before);
});
