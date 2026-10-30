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
  '/cart/preview-empty',
  '/checkout',
  '/checkout/preview-complete',
  '/checkout/preview-empty',
  '/checkout/preview-error',
  '/collection/[id]',
  '/locales',
  '/login',
  '/login/account-locked',
  '/login/account-locked/complete',
  '/login/account-locked/verification',
  '/login/account-locked/verification/preview-agreement-error',
  '/login/account-locked/verification/preview-code-entry',
  '/login/account-locked/verification/preview-error',
  '/login/account-locked/verification/preview-expired',
  '/login/find-account',
  '/login/find-account/id-confirmation-modal',
  '/login/find-account/password-reset',
  '/login/find-account/password-reset/preview-complete',
  '/login/find-account/password-reset/preview-error',
  '/login/find-account/preview-code-entry',
  '/login/find-account/preview-error',
  '/login/find-account/preview-expired',
  '/login/preview-error',
  '/maintenance',
  '/mypage',
  '/mypage/addresses',
  '/mypage/addresses/preview-edit',
  '/mypage/addresses/preview-empty',
  '/mypage/addresses/preview-error',
  '/mypage/addresses/preview-new',
  '/mypage/coupons',
  '/mypage/coupons/preview-complete',
  '/mypage/coupons/preview-detail',
  '/mypage/coupons/preview-error',
  '/mypage/event-entries',
  '/mypage/event-entries/preview-empty',
  '/mypage/member-activity',
  '/mypage/orders',
  '/mypage/orders/preview-cancel-detail',
  '/mypage/orders/preview-detail',
  '/mypage/orders/preview-empty',
  '/mypage/orders/preview-return-detail',
  '/mypage/payment-methods',
  '/mypage/preview-no-orders',
  '/mypage/profile',
  '/mypage/profile/preview-code-entry',
  '/mypage/profile/preview-edit',
  '/mypage/profile/preview-error',
  '/mypage/profile/preview-expired',
  '/mypage/profile/preview-password-complete',
  '/mypage/recent',
  '/mypage/recent/preview-empty',
  '/mypage/referral',
  '/mypage/refund-account',
  '/mypage/restock-alerts',
  '/mypage/restock-alerts/preview-empty',
  '/mypage/returns',
  '/mypage/returns/preview-empty',
  '/mypage/reviews',
  '/mypage/reviews/preview-edit',
  '/mypage/reviews/preview-empty',
  '/mypage/reviews/preview-error',
  '/mypage/reviews/preview-new',
  '/mypage/reviews/preview-written-empty',
  '/mypage/rewards',
  '/mypage/wishlist',
  '/mypage/wishlist/preview-empty',
  '/preview-not-found',
  '/products',
  '/products/[id]',
  '/products/preview-empty-inquiries',
  '/products/preview-no-results',
  '/publishing-guide',
  '/running/run-club',
  '/running/run-club/[sessionId]',
  '/running/run-club/preview-empty',
  '/screen-index',
  '/search',
  '/search/preview-no-results',
  '/service-unavailable',
  '/signup',
  '/signup/complete',
  '/signup/information',
  '/signup/information/preview-error',
  '/signup/information/preview-marketing-consent',
  '/signup/terms',
  '/signup/terms/preview-error',
  '/signup/verify',
  '/signup/verify/phone',
  '/signup/verify/phone/preview-agreement-error',
  '/signup/verify/phone/preview-already-registered',
  '/signup/verify/phone/preview-code-entry',
  '/signup/verify/phone/preview-error',
  '/signup/verify/phone/preview-expired',
  '/support',
  '/support/after-sales',
  '/support/care',
  '/support/faq',
  '/support/faq/preview-no-results',
  '/support/inquiries',
  '/support/inquiries/new',
  '/support/inquiries/new/order-products',
  '/support/inquiries/new/order-products/preview-empty',
  '/support/inquiries/new/preview-attachment-count',
  '/support/inquiries/new/preview-attachment-size',
  '/support/inquiries/new/preview-attachment-type',
  '/support/inquiries/new/preview-error',
  '/support/inquiries/new/preview-order-required',
  '/support/inquiries/preview-answered',
  '/support/inquiries/preview-unanswered',
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
