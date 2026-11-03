import {
  getProductListingIaKey,
  getProductListingRoute,
} from '@/app/screen-index/productListingIaRoute';
import { inquiryFormPreviews, inquiryListPreviews } from '@/app/support/inquiries/inquiryPreviews';
import type { ScreenDefinition } from '@/data/screenRegistry';

import sourceGraph from './sourceGraph.generated.json';
export type ScreenConnection = {
  route?: string;
  routeLabel?: string;
  defaultStateLabel?: string;
  previewRoutes?: {
    label: string;
    href: string;
  }[];
  sourceFiles: string[];
};
const connections: Record<number, ScreenConnection> = {
  159: {
    route: '/launch-calendar',
    previewRoutes: [{ label: '발매 예정 상품 상세', href: '/launch-calendar/clifton-11-gtx' }],
    sourceFiles: [
      'src/app/launch-calendar/page.tsx',
      'src/app/launch-calendar/clifton-11-gtx/page.tsx',
    ],
  },
  160: {
    route: '/launch-calendar',
    sourceFiles: ['src/app/launch-calendar/page.tsx'],
  },
  161: {
    route: '/launch-calendar/upcoming',
    sourceFiles: ['src/app/launch-calendar/upcoming/page.tsx'],
  },
  162: {
    route: '/launch-calendar/in-stock',
    sourceFiles: ['src/app/launch-calendar/in-stock/page.tsx'],
  },
  '267': {
    route: '/locales',
    sourceFiles: ['src/app/locales/page.tsx'],
  },
  '202': {
    route: '/mypage/profile/preview-edit',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/profile/preview-error' }],
    sourceFiles: [
      'src/app/mypage/profile/preview-edit/page.tsx',
      'src/app/mypage/profile/preview-error/page.tsx',
    ],
  },
  '197': {
    route: '/mypage/coupons/preview-detail',
    sourceFiles: ['src/app/mypage/coupons/preview-detail/page.tsx'],
  },
  '257': {
    route: '/signup/verify/phone/preview-already-registered',
    sourceFiles: ['src/app/signup/verify/phone/preview-already-registered/page.tsx'],
  },
  '205': {
    route: '/mypage/addresses/preview-edit',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/addresses/preview-error' }],
    sourceFiles: [
      'src/app/mypage/addresses/preview-edit/page.tsx',
      'src/app/mypage/addresses/preview-error/page.tsx',
    ],
  },
  '204': {
    route: '/mypage/addresses/preview-new',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/addresses/preview-error' }],
    sourceFiles: [
      'src/app/mypage/addresses/preview-new/page.tsx',
      'src/app/mypage/addresses/preview-error/page.tsx',
    ],
  },
  '193': {
    route: '/mypage/reviews/preview-edit',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/reviews/preview-error' }],
    sourceFiles: [
      'src/app/mypage/reviews/preview-edit/page.tsx',
      'src/app/mypage/reviews/preview-error/page.tsx',
    ],
  },
  '192': {
    route: '/mypage/reviews/preview-new',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/reviews/preview-error' }],
    sourceFiles: [
      'src/app/mypage/reviews/preview-new/page.tsx',
      'src/app/mypage/reviews/preview-error/page.tsx',
    ],
  },
  '181': {
    route: '/mypage/orders/preview-cancel-detail',
    routeLabel: '취소 상세',
    previewRoutes: [{ label: '반품 상세', href: '/mypage/orders/preview-return-detail' }],
    sourceFiles: [
      'src/app/mypage/orders/preview-cancel-detail/page.tsx',
      'src/app/mypage/orders/preview-return-detail/page.tsx',
    ],
  },
  '174': {
    sourceFiles: ['src/app/checkout/page.tsx'],
  },
  '179': {
    route: '/mypage/orders/preview-detail',
    sourceFiles: [
      'src/app/mypage/orders/page.tsx',
      'src/app/mypage/orders/preview-detail/page.tsx',
    ],
  },
  '245': {
    sourceFiles: ['src/context/ShopShell.tsx'],
  },
  '246': {
    sourceFiles: ['src/context/ShopShell.tsx'],
  },
  '1': {
    route: '/',
    sourceFiles: ['src/app/page.tsx'],
  },
  '155': {
    sourceFiles: ['src/app/running/running-session/page.tsx'],
  },
  '170': {
    route: '/cart',
    defaultStateLabel: '목록 있음',
    previewRoutes: [
      { label: '빈 목록', href: '/cart/preview-empty' },
      { label: '옵션 변경', href: '/cart/preview-options' },
      { label: '수량 제한 안내', href: '/cart/preview-limit' },
    ],
    sourceFiles: [
      'src/app/cart/page.tsx',
      'src/app/cart/preview-empty/page.tsx',
      'src/app/cart/preview-options/page.tsx',
      'src/app/cart/preview-limit/page.tsx',
    ],
  },
  '171': {
    route: '/checkout',
    previewRoutes: [
      { label: '상품 없음', href: '/checkout/preview-empty' },
      { label: '입력·동의 오류', href: '/checkout/preview-error' },
      { label: '주문 완료', href: '/checkout/preview-complete' },
      { label: '배송지 수동입력', href: '/checkout/preview-shipping' },
      { label: '배송 요청사항 직접입력', href: '/checkout/preview-delivery-request' },
    ],
    sourceFiles: [
      'src/app/checkout/page.tsx',
      'src/app/checkout/preview-empty/page.tsx',
      'src/app/checkout/preview-error/page.tsx',
      'src/app/checkout/preview-complete/page.tsx',
      'src/app/checkout/preview-shipping/page.tsx',
      'src/app/checkout/preview-delivery-request/page.tsx',
    ],
  },
  '177': {
    route: '/mypage',
    defaultStateLabel: '주문 내역 있음',
    previewRoutes: [
      { label: '주문 내역 없음', href: '/mypage/preview-no-orders' },
      { label: '로그아웃 확인', href: '/mypage/preview-logout' },
    ],
    sourceFiles: [
      'src/app/mypage/page.tsx',
      'src/app/mypage/preview-no-orders/page.tsx',
      'src/app/mypage/preview-logout/page.tsx',
    ],
  },
  '178': {
    route: '/mypage/orders',
    defaultStateLabel: '목록 있음',
    previewRoutes: [
      { label: '빈 목록', href: '/mypage/orders/preview-empty' },
      { label: '주문 취소 신청', href: '/mypage/orders/preview-cancel-request' },
      { label: '반품 신청', href: '/mypage/orders/preview-return-request' },
      { label: '배송 조회', href: '/mypage/orders/preview-tracking' },
      { label: '구매 확정 확인', href: '/mypage/orders/preview-purchase-confirm' },
      { label: '주문 삭제 확인', href: '/mypage/orders/preview-delete-confirm' },
    ],
    sourceFiles: [
      'src/app/mypage/orders/page.tsx',
      'src/app/mypage/orders/preview-empty/page.tsx',
      'src/app/mypage/orders/preview-detail/page.tsx',
      'src/app/mypage/orders/preview-cancel-detail/page.tsx',
      'src/app/mypage/orders/preview-return-detail/page.tsx',
      'src/app/mypage/orders/[preview]/page.tsx',
    ],
  },
  '180': {
    route: '/mypage/returns',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/mypage/returns/preview-empty' }],
    sourceFiles: [
      'src/app/mypage/returns/page.tsx',
      'src/app/mypage/returns/preview-empty/page.tsx',
      'src/app/mypage/orders/preview-cancel-detail/page.tsx',
      'src/app/mypage/orders/preview-return-detail/page.tsx',
    ],
  },
  '182': {
    route: '/mypage/wishlist',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/mypage/wishlist/preview-empty' }],
    sourceFiles: [
      'src/app/mypage/wishlist/page.tsx',
      'src/app/mypage/wishlist/preview-empty/page.tsx',
    ],
  },
  '183': {
    route: '/mypage/recent',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/mypage/recent/preview-empty' }],
    sourceFiles: ['src/app/mypage/recent/page.tsx', 'src/app/mypage/recent/preview-empty/page.tsx'],
  },
  '184': {
    route: '/mypage/restock-alerts',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/mypage/restock-alerts/preview-empty' }],
    sourceFiles: [
      'src/app/mypage/restock-alerts/page.tsx',
      'src/app/mypage/restock-alerts/preview-empty/page.tsx',
    ],
  },
  '185': {
    route: '/support/faq',
    defaultStateLabel: '검색 결과 있음',
    previewRoutes: [
      { label: '검색 결과 없음', href: '/support/faq/preview-no-results' },
      { label: '답변 펼침', href: '/support/faq/preview-expanded' },
    ],
    sourceFiles: [
      'src/app/support/faq/page.tsx',
      'src/app/support/faq/preview-no-results/page.tsx',
      'src/app/support/faq/preview-expanded/page.tsx',
    ],
  },
  '187': {
    route: '/support/inquiries/preview-list',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '없음', href: '/support/inquiries' }],
    sourceFiles: [
      'src/app/support/inquiries/page.tsx',
      'src/app/support/inquiries/preview-list/page.tsx',
    ],
  },
  '189': {
    route: '/support/inquiries/new',
    previewRoutes: [
      { label: '입력 오류', href: '/support/inquiries/new/preview-error' },
      { label: '주문 선택 안내', href: '/support/inquiries/new/preview-order-required' },
      { label: '첨부 형식 오류', href: '/support/inquiries/new/preview-attachment-type' },
      { label: '첨부 크기 오류', href: '/support/inquiries/new/preview-attachment-size' },
      { label: '첨부 개수 오류', href: '/support/inquiries/new/preview-attachment-count' },
      { label: '주문 상품 조회', href: '/support/inquiries/new/order-products' },
      {
        label: '조회 내역 없음',
        href: '/support/inquiries/new/order-products/preview-empty',
      },
    ],
    sourceFiles: [
      'src/app/support/inquiries/new/page.tsx',
      'src/app/support/inquiries/new/preview-error/page.tsx',
      'src/app/support/inquiries/new/preview-order-required/page.tsx',
      'src/app/support/inquiries/new/preview-attachment-type/page.tsx',
      'src/app/support/inquiries/new/preview-attachment-size/page.tsx',
      'src/app/support/inquiries/new/preview-attachment-count/page.tsx',
      'src/app/support/inquiries/new/order-products/page.tsx',
      'src/app/support/inquiries/new/order-products/preview-empty/page.tsx',
    ],
  },
  '191': {
    route: '/mypage/reviews',
    previewRoutes: [
      { label: '작성 가능한 리뷰 목록', href: '/mypage/reviews/preview-ready' },
      { label: '작성 가능한 리뷰 목록 없음', href: '/mypage/reviews/preview-empty' },
      { label: '내가 작성한 리뷰', href: '/mypage/reviews/preview-written' },
      { label: '내가 작성한 리뷰 목록 없음', href: '/mypage/reviews/preview-written-empty' },
      { label: '작성', href: '/mypage/reviews/preview-new' },
      { label: '수정', href: '/mypage/reviews/preview-edit' },
      { label: '입력 오류', href: '/mypage/reviews/preview-error' },
    ],
    sourceFiles: [
      'src/app/mypage/reviews/page.tsx',
      'src/app/mypage/reviews/preview-ready/page.tsx',
      'src/app/mypage/reviews/preview-written/page.tsx',
      'src/app/mypage/reviews/preview-empty/page.tsx',
      'src/app/mypage/reviews/preview-written-empty/page.tsx',
      'src/app/mypage/reviews/preview-new/page.tsx',
      'src/app/mypage/reviews/preview-edit/page.tsx',
      'src/app/mypage/reviews/preview-error/page.tsx',
    ],
  },
  '195': {
    previewRoutes: [
      { label: '조회 중', href: '/mypage/rewards/preview-loading' },
      { label: '조회 실패', href: '/mypage/rewards/preview-load-error' },
    ],
    route: '/mypage/rewards',
    sourceFiles: [
      'src/app/mypage/rewards/page.tsx',
      'src/app/mypage/rewards/preview-loading/page.tsx',
      'src/app/mypage/rewards/preview-load-error/page.tsx',
    ],
  },
  '196': {
    route: '/mypage/coupons',
    previewRoutes: [
      { label: '빈 목록', href: '/mypage/coupons/preview-empty' },
      { label: '등록 오류', href: '/mypage/coupons/preview-error' },
      { label: '등록 완료', href: '/mypage/coupons/preview-complete' },
      { label: '임직원 쿠폰', href: '/mypage/coupons/preview-employee' },
    ],
    sourceFiles: [
      'src/app/mypage/coupons/page.tsx',
      'src/app/mypage/coupons/preview-empty/page.tsx',
      'src/app/mypage/coupons/preview-error/page.tsx',
      'src/app/mypage/coupons/preview-complete/page.tsx',
      'src/app/mypage/coupons/preview-detail/page.tsx',
      'src/app/mypage/coupons/preview-employee/page.tsx',
    ],
  },
  '200': {
    route: '/mypage/event-entries',
    defaultStateLabel: '목록 있음',
    previewRoutes: [
      { label: '빈 목록', href: '/mypage/event-entries/preview-empty' },
      { label: '신청 취소 모달', href: '/mypage/event-entries/preview-cancel' },
    ],
    sourceFiles: [
      'src/app/mypage/event-entries/page.tsx',
      'src/app/mypage/event-entries/preview-empty/page.tsx',
      'src/app/mypage/event-entries/preview-cancel/page.tsx',
    ],
  },
  '201': {
    route: '/mypage/profile',
    previewRoutes: [
      { label: '인증번호 입력', href: '/mypage/profile/preview-code-entry' },
      { label: '인증 만료', href: '/mypage/profile/preview-expired' },
      { label: '비밀번호 변경 완료', href: '/mypage/profile/preview-password-complete' },
      { label: '저장 확인', href: '/mypage/profile/preview-save' },
      { label: '수정 완료', href: '/mypage/profile/preview-save-complete' },
      { label: '본인인증 안내', href: '/mypage/profile/preview-phone-required' },
      { label: '탈퇴 확인', href: '/mypage/profile/preview-withdraw' },
      { label: '탈퇴 완료', href: '/mypage/profile/preview-withdraw-complete' },
      { label: '수정 취소 확인', href: '/mypage/profile/preview-cancel' },
      { label: '비밀번호 입력', href: '/mypage/profile/preview-password' },
      { label: '비밀번호 변경 확인', href: '/mypage/profile/preview-password-confirm' },
    ],
    sourceFiles: [
      'src/app/mypage/profile/page.tsx',
      'src/app/mypage/profile/preview-edit/page.tsx',
      'src/app/mypage/profile/preview-error/page.tsx',
      'src/app/mypage/profile/preview-code-entry/page.tsx',
      'src/app/mypage/profile/preview-expired/page.tsx',
      'src/app/mypage/profile/preview-password-complete/page.tsx',
      'src/app/mypage/profile/[preview]/page.tsx',
    ],
  },
  '203': {
    route: '/mypage/addresses',
    defaultStateLabel: '목록 있음',
    previewRoutes: [
      { label: '빈 목록', href: '/mypage/addresses/preview-empty' },
      { label: '배송지 삭제 확인', href: '/mypage/addresses/preview-delete' },
    ],
    sourceFiles: [
      'src/app/mypage/addresses/page.tsx',
      'src/app/mypage/addresses/preview-empty/page.tsx',
      'src/app/mypage/addresses/preview-new/page.tsx',
      'src/app/mypage/addresses/preview-edit/page.tsx',
      'src/app/mypage/addresses/preview-error/page.tsx',
      'src/app/mypage/addresses/preview-delete/page.tsx',
    ],
  },
  '206': {
    route: '/support',
    sourceFiles: ['src/app/support/page.tsx'],
  },
  '207': {
    route: '/support/faq',
    defaultStateLabel: '검색 결과 있음',
    previewRoutes: [
      { label: '검색 결과 없음', href: '/support/faq/preview-no-results' },
      { label: '답변 펼침', href: '/support/faq/preview-expanded' },
    ],
    sourceFiles: [
      'src/app/support/faq/page.tsx',
      'src/app/support/faq/preview-no-results/page.tsx',
      'src/app/support/faq/preview-expanded/page.tsx',
    ],
  },
  '208': {
    route: '/support/notices',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/support/notices/preview-empty' }],
    sourceFiles: [
      'src/app/support/notices/page.tsx',
      'src/app/support/notices/preview-empty/page.tsx',
    ],
  },
  '209': {
    route: '/support/notices/1',
    sourceFiles: ['src/app/support/notices/[id]/page.tsx'],
  },
  '210': {
    route: '/support/inquiries/preview-list',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '없음', href: '/support/inquiries' }],
    sourceFiles: [
      'src/app/support/inquiries/page.tsx',
      'src/app/support/inquiries/preview-list/page.tsx',
    ],
  },
  '211': {
    route: '/support/inquiries/new',
    previewRoutes: [
      { label: '입력 오류', href: '/support/inquiries/new/preview-error' },
      { label: '주문 선택 안내', href: '/support/inquiries/new/preview-order-required' },
      { label: '첨부 형식 오류', href: '/support/inquiries/new/preview-attachment-type' },
      { label: '첨부 크기 오류', href: '/support/inquiries/new/preview-attachment-size' },
      { label: '첨부 개수 오류', href: '/support/inquiries/new/preview-attachment-count' },
      { label: '주문 상품 조회', href: '/support/inquiries/new/order-products' },
      {
        label: '조회 내역 없음',
        href: '/support/inquiries/new/order-products/preview-empty',
      },
    ],
    sourceFiles: [
      'src/app/support/inquiries/new/page.tsx',
      'src/app/support/inquiries/new/preview-error/page.tsx',
      'src/app/support/inquiries/new/preview-order-required/page.tsx',
      'src/app/support/inquiries/new/preview-attachment-type/page.tsx',
      'src/app/support/inquiries/new/preview-attachment-size/page.tsx',
      'src/app/support/inquiries/new/preview-attachment-count/page.tsx',
      'src/app/support/inquiries/new/order-products/page.tsx',
      'src/app/support/inquiries/new/order-products/preview-empty/page.tsx',
    ],
  },
  '212': {
    route: '/support/store',
    sourceFiles: ['src/app/support/store/page.tsx'],
  },
  '213': {
    route: '/support/member-benefits',
    sourceFiles: ['src/app/support/member-benefits/page.tsx'],
  },
  '216': {
    previewRoutes: [
      { label: '반품 안내', href: '/support/after-sales?tab=product-returns' },
      { label: '상품 반품안내', href: '/support/after-sales?tab=return-cautions' },
    ],
    route: '/support/after-sales',
    sourceFiles: ['src/app/support/after-sales/page.tsx'],
  },
  '217': {
    previewRoutes: [{ label: '의류/용품', href: '/support/care?tab=apparel' }],
    route: '/support/care',
    sourceFiles: ['src/app/support/care/page.tsx'],
  },
  '218': {
    route: '/support/terms?tab=privacy',
    sourceFiles: ['src/app/support/terms/page.tsx'],
  },
  '219': {
    route: '/support/terms',
    sourceFiles: ['src/app/support/terms/page.tsx'],
  },
  '223': {
    route: '/login',
    previewRoutes: [
      { label: '에러 메시지', href: '/login/preview-error' },
      { label: '아이디 저장 도움말', href: '/login/preview-help' },
      { label: '장시간 미입력 로그아웃 안내', href: '/login/preview-session-timeout' },
    ],
    sourceFiles: [
      'src/app/login/page.tsx',
      'src/app/login/preview-error/page.tsx',
      'src/app/login/preview-help/page.tsx',
      'src/app/login/preview-session-timeout/page.tsx',
    ],
  },
  '224': {
    route: '/login/find-account',
    previewRoutes: [
      { label: '입력 오류', href: '/login/find-account/preview-error' },
      { label: '인증번호 입력', href: '/login/find-account/preview-code-entry' },
      { label: '인증 만료', href: '/login/find-account/preview-expired' },
    ],
    sourceFiles: [
      'src/app/login/find-account/page.tsx',
      'src/app/login/find-account/preview-error/page.tsx',
      'src/app/login/find-account/preview-code-entry/page.tsx',
      'src/app/login/find-account/preview-expired/page.tsx',
    ],
  },
  '226': {
    route: '/login/find-account/id-confirmation-modal',
    sourceFiles: ['src/app/login/find-account/id-confirmation-modal/page.tsx'],
  },
  '229': {
    route: '/login/find-account/password-reset',
    previewRoutes: [
      { label: '입력 오류', href: '/login/find-account/password-reset/preview-error' },
      { label: '변경 완료', href: '/login/find-account/password-reset/preview-complete' },
    ],
    sourceFiles: [
      'src/app/login/find-account/password-reset/page.tsx',
      'src/app/login/find-account/password-reset/preview-error/page.tsx',
      'src/app/login/find-account/password-reset/preview-complete/page.tsx',
    ],
  },
  '233': {
    route: '/signup',
    previewRoutes: [{ label: '인증방법 선택', href: '/signup/verify' }],
    sourceFiles: ['src/app/signup/page.tsx', 'src/app/signup/verify/page.tsx'],
  },
  '234': {
    route: '/signup/verify/phone',
    previewRoutes: [
      { label: '필수 동의 오류', href: '/signup/verify/phone/preview-agreement-error' },
      { label: '입력 오류', href: '/signup/verify/phone/preview-error' },
      { label: '인증번호 입력', href: '/signup/verify/phone/preview-code-entry' },
      { label: '인증 만료', href: '/signup/verify/phone/preview-expired' },
    ],
    sourceFiles: [
      'src/app/signup/verify/phone/page.tsx',
      'src/app/signup/verify/phone/preview-error/page.tsx',
      'src/app/signup/verify/phone/preview-code-entry/page.tsx',
      'src/app/signup/verify/phone/preview-expired/page.tsx',
      'src/app/signup/verify/phone/preview-agreement-error/page.tsx',
    ],
  },
  '236': {
    route: '/signup/terms',
    previewRoutes: [
      { label: '필수 동의 오류', href: '/signup/terms/preview-error' },
      { label: '필수 약관 상세', href: '/signup/terms/preview-detail' },
    ],
    sourceFiles: [
      'src/app/signup/terms/page.tsx',
      'src/app/signup/terms/preview-error/page.tsx',
      'src/app/signup/terms/preview-detail/page.tsx',
    ],
  },
  '237': {
    route: '/signup/information',
    previewRoutes: [{ label: '입력 오류', href: '/signup/information/preview-error' }],
    sourceFiles: [
      'src/app/signup/information/page.tsx',
      'src/app/signup/information/preview-error/page.tsx',
    ],
  },
  '238': {
    route: '/signup/complete',
    sourceFiles: ['src/app/signup/complete/page.tsx'],
  },
  '247': {
    route: '/search',
    defaultStateLabel: '검색 결과 있음',
    previewRoutes: [{ label: '검색 결과 없음', href: '/search/preview-no-results' }],
    sourceFiles: ['src/app/search/page.tsx', 'src/app/search/preview-no-results/page.tsx'],
  },
  '248': {
    route: '/preview-not-found',
    sourceFiles: ['src/app/not-found.tsx', 'src/app/preview-not-found/page.tsx'],
  },
  '249': {
    route: '/maintenance',
    sourceFiles: ['src/app/maintenance/page.tsx'],
  },
  '250': {
    route: '/service-unavailable',
    sourceFiles: ['src/app/service-unavailable/page.tsx'],
  },
  '251': {
    route: '/login/account-locked',
    sourceFiles: ['src/app/login/account-locked/page.tsx'],
  },
  '252': {
    route: '/login/find-account/password-reset/preview-complete',
    sourceFiles: [
      'src/app/login/find-account/password-reset/page.tsx',
      'src/app/login/find-account/password-reset/preview-complete/page.tsx',
    ],
  },
  '253': {
    route: '/login/account-locked/verification',
    previewRoutes: [
      {
        label: '필수 동의 오류',
        href: '/login/account-locked/verification/preview-agreement-error',
      },
      { label: '입력 오류', href: '/login/account-locked/verification/preview-error' },
      { label: '인증번호 입력', href: '/login/account-locked/verification/preview-code-entry' },
      { label: '인증 만료', href: '/login/account-locked/verification/preview-expired' },
      { label: '알뜰폰 사업자', href: '/login/account-locked/verification/preview-carriers' },
      { label: '필수 약관', href: '/login/account-locked/verification/preview-required-terms' },
      { label: '선택 약관', href: '/login/account-locked/verification/preview-optional-terms' },
      {
        label: '이전 약관 선택',
        href: '/login/account-locked/verification/preview-previous-terms',
      },
    ],
    sourceFiles: [
      'src/app/login/account-locked/verification/page.tsx',
      'src/app/login/account-locked/verification/preview-error/page.tsx',
      'src/app/login/account-locked/verification/preview-code-entry/page.tsx',
      'src/app/login/account-locked/verification/preview-expired/page.tsx',
      'src/app/login/account-locked/verification/preview-agreement-error/page.tsx',
      'src/app/login/account-locked/verification/preview-carriers/page.tsx',
      'src/app/login/account-locked/verification/preview-required-terms/page.tsx',
      'src/app/login/account-locked/verification/preview-optional-terms/page.tsx',
      'src/app/login/account-locked/verification/preview-previous-terms/page.tsx',
    ],
  },
  '254': {
    route: '/login/account-locked/complete',
    sourceFiles: ['src/app/login/account-locked/complete/page.tsx'],
  },
  '255': {
    route: '/signup/information?step=additional',
    sourceFiles: ['src/app/signup/information/page.tsx'],
  },
  '256': {
    route: '/signup/information/preview-marketing-consent',
    sourceFiles: [
      'src/app/signup/information/page.tsx',
      'src/app/signup/information/preview-marketing-consent/page.tsx',
    ],
  },
  '258': {
    previewRoutes: [
      { label: '목록 있음', href: '/running/running-session' },
      { label: '빈 목록', href: '/running/running-session/preview-empty' },
    ],
    sourceFiles: [
      'src/app/running/running-session/page.tsx',
      'src/app/running/running-session/preview-empty/page.tsx',
    ],
  },
  '259': {
    previewRoutes: [
      { label: '신청 가능', href: '/running/running-session/yeouido-night' },
      { label: '모집 마감', href: '/running/running-session/bukhansan-trail' },
      { label: '신청 예정', href: '/running/running-session/inwangsan-trail' },
      { label: '신청 안내', href: '/running/running-session/preview-application' },
      { label: '신청 완료 안내', href: '/running/running-session/preview-application-complete' },
    ],
    sourceFiles: [
      'src/app/running/running-session/[sessionId]/page.tsx',
      'src/app/running/running-session/preview-application/page.tsx',
      'src/app/running/running-session/preview-application-complete/page.tsx',
    ],
  },
  '260': {
    route: '/support/size-guide',
    sourceFiles: ['src/app/support/size-guide/page.tsx'],
  },
};
const productConnections: Record<'listing' | 'detail', ScreenConnection> = {
  listing: {
    defaultStateLabel: '조건 결과 있음',
    previewRoutes: [
      { label: '조건 결과 없음', href: '/products/preview-no-results' },
      { label: '품절 표시 예시', href: '/products/preview-sold-out' },
    ],
    sourceFiles: [
      'src/app/products/page.tsx',
      'src/app/products/preview-no-results/page.tsx',
      'src/app/products/preview-sold-out/page.tsx',
    ],
  },
  detail: {
    defaultStateLabel: '상품문의 있음',
    previewRoutes: [
      { label: '옵션 입고 알림', href: '/products/preview-restock' },
      {
        label: '상품문의 없음',
        href: '/products/preview-empty-inquiries#product-inquiries',
      },
      { label: '옵션 미선택 안내', href: '/products/preview-options-required' },
    ],
    sourceFiles: [
      'src/app/products/[id]/page.tsx',
      'src/app/products/preview-empty-inquiries/page.tsx',
      'src/app/products/preview-options-required/page.tsx',
      'src/app/products/preview-restock/page.tsx',
    ],
  },
};
export function isScreenDeleted(screen: ScreenDefinition) {
  return screen.note.replace(/상품\s*삭제/g, '').includes('삭제');
}
function getRegisteredConnection(screen: ScreenDefinition): ScreenConnection {
  if (isScreenDeleted(screen)) return { sourceFiles: [] };
  const connection = connections[screen.iaNumber];
  if (connection) {
    const group =
      connection.route === '/support/inquiries/new'
        ? 'form'
        : connection.route === '/support/inquiries/preview-list'
          ? 'list'
          : undefined;
    if (!group) return connection;
    return {
      ...connection,
      previewRoutes: [
        ...(connection.previewRoutes ?? []),
        ...(group === 'list' ? inquiryListPreviews : inquiryFormPreviews).map(
          ({ label, href }) => ({ label, href }),
        ),
        ...(group === 'form'
          ? [
              {
                label: '조회 기간 직접설정',
                href: '/support/inquiries/new/order-products/preview-custom',
              },
            ]
          : []),
      ],
      sourceFiles: [
        ...connection.sourceFiles,
        ...(group === 'list'
          ? ['src/app/support/inquiries/[preview]/page.tsx']
          : [
              'src/app/support/inquiries/new/[preview]/page.tsx',
              'src/app/support/inquiries/new/order-products/preview-custom/page.tsx',
            ]),
      ],
    };
  }
  if (screen.screenCode === 'eland_hca_01')
    return {
      ...productConnections.listing,
      route: getProductListingRoute(getProductListingIaKey(screen.iaNumber)),
    };
  if (screen.screenCode === 'eland_hca_02')
    return { ...productConnections.detail, route: '/products/shoe-1' };
  return { sourceFiles: [] };
}
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 콘텐츠 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
const resolvedSourceFiles = new Map<string, string[]>();
const bindingFiles = new Set(sourceGraph.bindingFiles);
export function getScreenConnection(screen: ScreenDefinition): ScreenConnection {
  const connection = getRegisteredConnection(screen);
  const key = connection.sourceFiles.join('\n');
  const cached = resolvedSourceFiles.get(key);
  if (cached) return { ...connection, sourceFiles: cached };
  const graph: Record<string, string[]> = sourceGraph.imports;
  const visited = new Set<string>();
  const sourceFiles: string[] = [];
  const pending = [...connection.sourceFiles];
  for (let index = 0; index < pending.length; index++) {
    const file = pending[index];
    if (visited.has(file)) continue;
    visited.add(file);
    if (!Object.hasOwn(graph, file)) continue;
    if (connection.sourceFiles.includes(file) || bindingFiles.has(file)) sourceFiles.push(file);
    // 화면이 소비하는 전역 서비스 소유자까지만 안내하고 헤더·푸터 전체로 확장하지 않는다.
    if (file === 'src/context/ShopShell.tsx' && !connection.sourceFiles.includes(file)) continue;
    pending.push(...graph[file]);
  }
  resolvedSourceFiles.set(key, sourceFiles);
  return { ...connection, sourceFiles };
}
