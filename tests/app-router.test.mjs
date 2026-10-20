import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { URL } from 'node:url';

const manifest = JSON.parse(
  readFileSync(new URL('../.next/server/app-paths-manifest.json', import.meta.url), 'utf8'),
);

const expectedRoutes = [
  '/',
  '/cart',
  '/checkout',
  '/collection/[id]',
  '/locales',
  '/login',
  '/login/account-locked',
  '/login/account-locked/complete',
  '/login/account-locked/verification',
  '/login/find-account',
  '/login/find-account/id-confirmation-modal',
  '/login/find-account/password-reset',
  '/mypage',
  '/mypage/addresses',
  '/mypage/coupons',
  '/mypage/event-entries',
  '/mypage/member-activity',
  '/mypage/orders',
  '/mypage/payment-methods',
  '/mypage/profile',
  '/mypage/recent',
  '/mypage/referral',
  '/mypage/refund-account',
  '/mypage/restock-alerts',
  '/mypage/returns',
  '/mypage/reviews',
  '/mypage/rewards',
  '/mypage/wishlist',
  '/products',
  '/products/[id]',
  '/running/run-club',
  '/running/run-club/[sessionId]',
  '/search',
  '/signup',
  '/signup/complete',
  '/signup/information',
  '/signup/terms',
  '/signup/verify',
  '/signup/verify/phone',
  '/support',
  '/support/after-sales',
  '/support/care',
  '/support/faq',
  '/support/inquiries',
  '/support/inquiries/new',
  '/support/member-benefits',
  '/support/mileage',
  '/support/notices',
  '/support/notices/[id]',
  '/support/size-guide',
  '/support/store',
  '/support/terms',
];

test('all existing URLs are compiled as App Router pages', () => {
  const actual = Object.keys(manifest)
    .filter((route) => route.endsWith('/page') && !route.startsWith('/_'))
    .map((route) => route.slice(0, -5) || '/')
    .sort();
  assert.deepEqual(actual, expectedRoutes);
});

test('Next and React versions are pinned without React Router', () => {
  const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
  for (const [name, version] of Object.entries({
    next: '16.3.5',
    react: '19.2.8',
    'react-dom': '19.2.8',
  })) {
    assert.equal(manifest.dependencies[name], version);
    assert.equal(lock.packages[`node_modules/${name}`].version, version);
  }
  assert.equal(manifest.dependencies['react-router-dom'], undefined);
  assert.equal(lock.packages['node_modules/react-router-dom'], undefined);
});
