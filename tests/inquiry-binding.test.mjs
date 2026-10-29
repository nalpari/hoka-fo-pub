import assert from 'node:assert/strict';
import test from 'node:test';
import { registerHooks } from 'node:module';
import { existsSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
const { EventTarget } = globalThis;

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && context.parentURL?.includes('/src/')) {
      const url = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(fileURLToPath(url))) return nextResolve(url.href, context);
    }
    return nextResolve(specifier, context);
  },
});

const { saveInquiryOrderResult, restoreInquiryOrderSelection, consumeInquiryOrderSelection } =
  await import('../src/app/support/inquiries/new/inquiryOrderSelection.storage.ts');

const storage = new Map();

globalThis.sessionStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
};

globalThis.window = new EventTarget();

const order = { id: 'external-order', products: [{ id: 'external-line' }] };

test('restores non-fixture IDs and retains saved selection through failure and abandoned reads', async () => {
  saveInquiryOrderResult({ order, products: order.products });
  await assert.rejects(
    restoreInquiryOrderSelection('result', async () => {
      throw new Error('offline');
    }),
    /offline/,
  );
  const resolver = async (ids) => {
    assert.deepEqual(ids, { orderId: 'external-order', productIds: ['external-line'] });
    return { order, products: order.products };
  };
  assert.equal((await restoreInquiryOrderSelection('result', resolver)).order.id, 'external-order');
  assert.equal(
    (await restoreInquiryOrderSelection('result', resolver)).products[0].id,
    'external-line',
  );
  consumeInquiryOrderSelection('result');
  assert.equal(await restoreInquiryOrderSelection('result', resolver), undefined);
});

test('ignores an obsolete resolution if another selection arrives during lookup', async () => {
  saveInquiryOrderResult({ order, products: order.products });
  const result = await restoreInquiryOrderSelection('result', async () => {
    saveInquiryOrderResult(null);
    return { order, products: order.products };
  });
  assert.equal(result, undefined);
  assert.equal(
    await restoreInquiryOrderSelection('result', async () => {
      throw new Error('must not fetch');
    }),
    null,
  );
});
