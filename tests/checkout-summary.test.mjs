import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { fileURLToPath, URL } from 'node:url';

registerHooks({resolve(specifier,context,nextResolve){if(specifier.startsWith('@/')){const url=new URL('../src/'+specifier.slice(2)+'.ts',import.meta.url);if(existsSync(fileURLToPath(url)))return nextResolve(url.href,context);}return nextResolve(specifier,context);}});
const {cartPreviewRows,cartPreviewAmounts}=await import('../src/app/cart/cart-preview.ts');

test('checkout rows carry prepared amounts and retain distinct product options',()=>{
 const keys=new Set();
 for(const row of cartPreviewRows){assert.ok(Number.isFinite(row.amount)&&row.amount>=0);assert.ok(row.product.id);const key=[row.item.id,row.item.color,row.item.width,row.item.size].join('|');assert.ok(!keys.has(key));keys.add(key);}
 for(const amount of Object.values(cartPreviewAmounts))assert.ok(Number.isFinite(amount)&&amount>=0);
});
