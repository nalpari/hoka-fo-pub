import {
  getProductListingIaKey,
  getProductListingRoute,
} from '@/app/screen-index/productListingIaRoute';
import type { ScreenDefinition } from '@/data/screenRegistry';

import sourceGraph from './sourceGraph.generated.json';

export type ScreenConnection = {
  route?: string;
  routeLabel?: string;
  defaultStateLabel?: string;
  previewRoutes?: { label: string; href: string }[];
  sourceFiles: string[];
  stories: Partial<Record<'web' | 'mobile', { id: string; file: string }>>;
};

const connections: Record<number, ScreenConnection> = {
  '202': {
    route: '/mypage/profile/preview-edit',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/profile/preview-error' }],
    sourceFiles: [
      'src/app/mypage/profile/preview-edit/page.tsx',
      'src/app/mypage/profile/preview-error/page.tsx',
    ],
    stories: {},
  },
  '197': {
    route: '/mypage/coupons/preview-detail',
    sourceFiles: ['src/app/mypage/coupons/preview-detail/page.tsx'],
    stories: {},
  },
  '257': {
    route: '/signup/verify/phone/preview-already-registered',
    sourceFiles: ['src/app/signup/verify/phone/preview-already-registered/page.tsx'],
    stories: {},
  },
  '205': {
    route: '/mypage/addresses/preview-edit',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/addresses/preview-error' }],
    sourceFiles: [
      'src/app/mypage/addresses/preview-edit/page.tsx',
      'src/app/mypage/addresses/preview-error/page.tsx',
    ],
    stories: {},
  },
  '204': {
    route: '/mypage/addresses/preview-new',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/addresses/preview-error' }],
    sourceFiles: [
      'src/app/mypage/addresses/preview-new/page.tsx',
      'src/app/mypage/addresses/preview-error/page.tsx',
    ],
    stories: {},
  },
  '193': {
    route: '/mypage/reviews/preview-edit',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/reviews/preview-error' }],
    sourceFiles: [
      'src/app/mypage/reviews/preview-edit/page.tsx',
      'src/app/mypage/reviews/preview-error/page.tsx',
    ],
    stories: {},
  },
  '192': {
    route: '/mypage/reviews/preview-new',
    previewRoutes: [{ label: '입력 오류', href: '/mypage/reviews/preview-error' }],
    sourceFiles: [
      'src/app/mypage/reviews/preview-new/page.tsx',
      'src/app/mypage/reviews/preview-error/page.tsx',
    ],
    stories: {},
  },
  '181': {
    route: '/mypage/orders/preview-cancel-detail',
    routeLabel: '취소 상세',
    previewRoutes: [{ label: '반품 상세', href: '/mypage/orders/preview-return-detail' }],
    sourceFiles: [
      'src/app/mypage/orders/preview-cancel-detail/page.tsx',
      'src/app/mypage/orders/preview-return-detail/page.tsx',
    ],
    stories: {},
  },
  '174': {
    sourceFiles: ['src/app/checkout/page.tsx'],
    stories: {
      web: {
        id: 'pages-주문-0-주문서-web--coupon-selection',
        file: 'src/stories/features/checkout/CheckoutPage.stories.tsx',
      },
      mobile: {
        id: 'pages-주문-0-주문서-mobile--coupon-selection',
        file: 'src/stories/features/checkout/CheckoutPage.mobile.stories.tsx',
      },
    },
  },
  '179': {
    route: '/mypage/orders/preview-detail',
    sourceFiles: [
      'src/app/mypage/orders/page.tsx',
      'src/app/mypage/orders/preview-detail/page.tsx',
    ],
    stories: {
      mobile: {
        id: 'pages-장바구니-1-주문하기-주문내역-mobile--detail',
        file: 'src/stories/features/orders/OrdersPage.mobile.stories.tsx',
      },
    },
  },
  '245': {
    sourceFiles: ['src/context/ShopShell.tsx'],
    stories: {
      mobile: {
        id: 'organisms-navigation-menudrawer--default',
        file: 'src/stories/components/common/organisms/Navigation/MenuDrawer/MenuDrawer.stories.tsx',
      },
    },
  },
  '246': {
    sourceFiles: ['src/context/ShopShell.tsx'],
    stories: {
      web: {
        id: 'organisms-search-searchoverlay--default',
        file: 'src/stories/components/common/organisms/Search/SearchOverlay.stories.tsx',
      },
      mobile: {
        id: 'organisms-search-searchoverlay--mobile',
        file: 'src/stories/components/common/organisms/Search/SearchOverlay.stories.tsx',
      },
    },
  },
  '1': {
    route: '/',
    sourceFiles: ['src/app/page.tsx'],
    stories: {
      web: {
        id: 'pages-메인-0-메인-web--width-1600',
        file: 'src/stories/features/home/HomePage.stories.tsx',
      },
      mobile: {
        id: 'pages-메인-0-메인-mobile--width-375',
        file: 'src/stories/features/home/HomePage.mobile.stories.tsx',
      },
    },
  },

  '155': {
    sourceFiles: ['src/app/running/running-session/page.tsx'],
    stories: {
      web: {
        id: 'pages-탐색-0-러닝세션-목록-web--list',
        file: 'src/stories/features/running-session/RunningSession.stories.tsx',
      },
      mobile: {
        id: 'pages-탐색-0-러닝세션-목록-mobile--list',
        file: 'src/stories/features/running-session/RunningSession.mobile.stories.tsx',
      },
    },
  },
  '170': {
    route: '/cart',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/cart/preview-empty' }],
    sourceFiles: ['src/app/cart/page.tsx', 'src/app/cart/preview-empty/page.tsx'],
    stories: {
      web: {
        id: 'pages-장바구니-0-장바구니-목록-web--default',
        file: 'src/stories/features/cart/CartPage.stories.tsx',
      },
      mobile: {
        id: 'pages-장바구니-0-장바구니-목록-mobile--default',
        file: 'src/stories/features/cart/CartPage.mobile.stories.tsx',
      },
    },
  },
  '171': {
    route: '/checkout',
    previewRoutes: [
      { label: '상품 없음', href: '/checkout/preview-empty' },
      { label: '입력·동의 오류', href: '/checkout/preview-error' },
      { label: '주문 완료', href: '/checkout/preview-complete' },
    ],
    sourceFiles: [
      'src/app/checkout/page.tsx',
      'src/app/checkout/preview-empty/page.tsx',
      'src/app/checkout/preview-error/page.tsx',
      'src/app/checkout/preview-complete/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-주문-0-주문서-web--default',
        file: 'src/stories/features/checkout/CheckoutPage.stories.tsx',
      },
      mobile: {
        id: 'pages-주문-0-주문서-mobile--default',
        file: 'src/stories/features/checkout/CheckoutPage.mobile.stories.tsx',
      },
    },
  },
  '177': {
    route: '/mypage',
    defaultStateLabel: '주문 내역 있음',
    previewRoutes: [{ label: '주문 내역 없음', href: '/mypage/preview-no-orders' }],
    sourceFiles: ['src/app/mypage/page.tsx', 'src/app/mypage/preview-no-orders/page.tsx'],
    stories: {
      web: {
        id: 'pages-마이페이지-0-마이페이지-메인-web--width-1600',
        file: 'src/stories/features/mypage/MyPage.web.stories.tsx',
      },
      mobile: {
        id: 'pages-마이페이지-0-마이페이지-메인-mobile--width-375',
        file: 'src/stories/features/mypage/MyPage.stories.tsx',
      },
    },
  },
  '178': {
    route: '/mypage/orders',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/mypage/orders/preview-empty' }],
    sourceFiles: [
      'src/app/mypage/orders/page.tsx',
      'src/app/mypage/orders/preview-empty/page.tsx',
      'src/app/mypage/orders/preview-detail/page.tsx',
      'src/app/mypage/orders/preview-cancel-detail/page.tsx',
      'src/app/mypage/orders/preview-return-detail/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-장바구니-1-주문하기-주문내역-web--default',
        file: 'src/stories/features/orders/OrdersPage.stories.tsx',
      },
      mobile: {
        id: 'pages-장바구니-1-주문하기-주문내역-mobile--default',
        file: 'src/stories/features/orders/OrdersPage.mobile.stories.tsx',
      },
    },
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
    stories: {},
  },
  '182': {
    route: '/mypage/wishlist',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/mypage/wishlist/preview-empty' }],
    sourceFiles: [
      'src/app/mypage/wishlist/page.tsx',
      'src/app/mypage/wishlist/preview-empty/page.tsx',
    ],
    stories: {
      mobile: {
        id: 'pages-마이페이지-1-관심상품-mobile--wishlist',
        file: 'src/stories/features/mypage/MyPage.Wishlist.Mobile.stories.tsx',
      },
    },
  },
  '183': {
    route: '/mypage/recent',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/mypage/recent/preview-empty' }],
    sourceFiles: ['src/app/mypage/recent/page.tsx', 'src/app/mypage/recent/preview-empty/page.tsx'],
    stories: {
      mobile: {
        id: 'pages-마이페이지-2-오늘-본-상품-mobile--recent',
        file: 'src/stories/features/mypage/MyPage.Recent.Mobile.stories.tsx',
      },
    },
  },
  '184': {
    route: '/mypage/restock-alerts',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/mypage/restock-alerts/preview-empty' }],
    sourceFiles: [
      'src/app/mypage/restock-alerts/page.tsx',
      'src/app/mypage/restock-alerts/preview-empty/page.tsx',
    ],
    stories: {
      mobile: {
        id: 'pages-마이페이지-3-재입고-알림-상품-mobile--restock-alerts',
        file: 'src/stories/features/mypage/MyPage.RestockAlerts.Mobile.stories.tsx',
      },
    },
  },
  '185': {
    route: '/support/faq',
    defaultStateLabel: '검색 결과 있음',
    previewRoutes: [{ label: '검색 결과 없음', href: '/support/faq/preview-no-results' }],
    sourceFiles: [
      'src/app/support/faq/page.tsx',
      'src/app/support/faq/preview-no-results/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-고객센터-1-faqs-web--default',
        file: 'src/stories/features/support/SupportPages.Faq.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-1-faqs-mobile--default',
        file: 'src/stories/features/support/SupportPages.Faq.Mobile.stories.tsx',
      },
    },
  },
  '187': {
    route: '/support/inquiries/preview-list',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '없음', href: '/support/inquiries' }],
    sourceFiles: [
      'src/app/support/inquiries/page.tsx',
      'src/app/support/inquiries/preview-list/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-고객센터-3-1-1문의-web--default',
        file: 'src/stories/features/support/SupportPages.Inquiries.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-3-1-1문의-mobile--default',
        file: 'src/stories/features/support/SupportPages.Inquiries.Mobile.stories.tsx',
      },
    },
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
    stories: {
      web: {
        id: 'pages-고객센터-3-1-1문의-web--new',
        file: 'src/stories/features/support/SupportPages.Inquiries.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-3-1-1문의-mobile--new',
        file: 'src/stories/features/support/SupportPages.Inquiries.Mobile.stories.tsx',
      },
    },
  },
  '191': {
    route: '/mypage/reviews',
    previewRoutes: [
      { label: '작성 가능한 리뷰 목록', href: '/mypage/reviews/preview-ready' },
      { label: '작성 가능 없음', href: '/mypage/reviews/preview-empty' },
      { label: '작성한 리뷰 목록', href: '/mypage/reviews/preview-written' },
      { label: '작성 리뷰 없음', href: '/mypage/reviews/preview-written-empty' },
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
    stories: {
      web: {
        id: 'pages-마이페이지-4-상품리뷰-web--ready-list',
        file: 'src/stories/features/mypage/MyPage.Reviews.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-마이페이지-4-상품리뷰-mobile--reviews',
        file: 'src/stories/features/mypage/MyPage.Reviews.Mobile.stories.tsx',
      },
    },
  },
  '195': {
    route: '/mypage/rewards',
    sourceFiles: ['src/app/mypage/rewards/page.tsx'],
    stories: {
      mobile: {
        id: 'pages-마이페이지-5-회원등급-mobile--rewards',
        file: 'src/stories/features/mypage/MyPage.Rewards.Mobile.stories.tsx',
      },
    },
  },
  '196': {
    route: '/mypage/coupons',
    previewRoutes: [
      { label: '빈 목록', href: '/mypage/coupons/preview-empty' },
      { label: '등록 오류', href: '/mypage/coupons/preview-error' },
      { label: '등록 완료', href: '/mypage/coupons/preview-complete' },
    ],
    sourceFiles: [
      'src/app/mypage/coupons/page.tsx',
      'src/app/mypage/coupons/preview-empty/page.tsx',
      'src/app/mypage/coupons/preview-error/page.tsx',
      'src/app/mypage/coupons/preview-complete/page.tsx',
      'src/app/mypage/coupons/preview-detail/page.tsx',
    ],
    stories: {
      mobile: {
        id: 'pages-마이페이지-6-쿠폰-mobile--coupons',
        file: 'src/stories/features/mypage/MyPage.Coupons.Mobile.stories.tsx',
      },
    },
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
    stories: {},
  },
  '201': {
    route: '/mypage/profile',
    previewRoutes: [
      { label: '인증번호 입력', href: '/mypage/profile/preview-code-entry' },
      { label: '인증 만료', href: '/mypage/profile/preview-expired' },
      { label: '비밀번호 변경 완료', href: '/mypage/profile/preview-password-complete' },
    ],
    sourceFiles: [
      'src/app/mypage/profile/page.tsx',
      'src/app/mypage/profile/preview-edit/page.tsx',
      'src/app/mypage/profile/preview-error/page.tsx',
      'src/app/mypage/profile/preview-code-entry/page.tsx',
      'src/app/mypage/profile/preview-expired/page.tsx',
      'src/app/mypage/profile/preview-password-complete/page.tsx',
    ],
    stories: {
      mobile: {
        id: 'pages-마이페이지-7-회원정보확인-및-수정-mobile--profile',
        file: 'src/stories/features/mypage/MyPage.Profile.Mobile.stories.tsx',
      },
    },
  },
  '203': {
    route: '/mypage/addresses',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/mypage/addresses/preview-empty' }],
    sourceFiles: [
      'src/app/mypage/addresses/page.tsx',
      'src/app/mypage/addresses/preview-empty/page.tsx',
      'src/app/mypage/addresses/preview-new/page.tsx',
      'src/app/mypage/addresses/preview-edit/page.tsx',
      'src/app/mypage/addresses/preview-error/page.tsx',
    ],
    stories: {
      mobile: {
        id: 'pages-마이페이지-8-배송지-관리-mobile--addresses',
        file: 'src/stories/features/mypage/MyPage.Addresses.Mobile.stories.tsx',
      },
    },
  },
  '206': {
    route: '/support',
    sourceFiles: ['src/app/support/page.tsx'],
    stories: {
      web: {
        id: 'pages-고객센터-0-고객센터-메인-web--default',
        file: 'src/stories/features/support/SupportPages.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-0-고객센터-메인-mobile--default',
        file: 'src/stories/features/support/SupportPages.CustomerCenter.Mobile.stories.tsx',
      },
    },
  },
  '207': {
    route: '/support/faq',
    defaultStateLabel: '검색 결과 있음',
    previewRoutes: [{ label: '검색 결과 없음', href: '/support/faq/preview-no-results' }],
    sourceFiles: [
      'src/app/support/faq/page.tsx',
      'src/app/support/faq/preview-no-results/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-고객센터-1-faqs-web--default',
        file: 'src/stories/features/support/SupportPages.Faq.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-1-faqs-mobile--default',
        file: 'src/stories/features/support/SupportPages.Faq.Mobile.stories.tsx',
      },
    },
  },
  '208': {
    route: '/support/notices',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '빈 목록', href: '/support/notices/preview-empty' }],
    sourceFiles: [
      'src/app/support/notices/page.tsx',
      'src/app/support/notices/preview-empty/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-고객센터-2-공지사항-web--default',
        file: 'src/stories/features/support/SupportPages.Notices.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-2-공지사항-mobile--default',
        file: 'src/stories/features/support/SupportPages.Notices.Mobile.stories.tsx',
      },
    },
  },
  '209': {
    route: '/support/notices/1',
    sourceFiles: ['src/app/support/notices/[id]/page.tsx'],
    stories: {
      web: {
        id: 'pages-고객센터-2-공지사항-web--detail',
        file: 'src/stories/features/support/SupportPages.Notices.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-2-공지사항-mobile--detail',
        file: 'src/stories/features/support/SupportPages.Notices.Mobile.stories.tsx',
      },
    },
  },
  '210': {
    route: '/support/inquiries/preview-list',
    defaultStateLabel: '목록 있음',
    previewRoutes: [{ label: '없음', href: '/support/inquiries' }],
    sourceFiles: [
      'src/app/support/inquiries/page.tsx',
      'src/app/support/inquiries/preview-list/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-고객센터-3-1-1문의-web--default',
        file: 'src/stories/features/support/SupportPages.Inquiries.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-3-1-1문의-mobile--default',
        file: 'src/stories/features/support/SupportPages.Inquiries.Mobile.stories.tsx',
      },
    },
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
    stories: {
      web: {
        id: 'pages-고객센터-3-1-1문의-web--new',
        file: 'src/stories/features/support/SupportPages.Inquiries.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-3-1-1문의-mobile--new',
        file: 'src/stories/features/support/SupportPages.Inquiries.Mobile.stories.tsx',
      },
    },
  },
  '212': {
    route: '/support/store',
    sourceFiles: ['src/app/support/store/page.tsx'],
    stories: {
      web: {
        id: 'pages-고객센터-4-매장-찾기-web--default',
        file: 'src/stories/features/support/SupportPages.StoreFinder.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-4-매장-찾기-mobile--default',
        file: 'src/stories/features/support/SupportPages.StoreFinder.Mobile.stories.tsx',
      },
    },
  },
  '213': {
    route: '/support/member-benefits',
    sourceFiles: ['src/app/support/member-benefits/page.tsx'],
    stories: {
      web: {
        id: 'pages-고객센터-5-온라인-회원-등급-안내-web--default',
        file: 'src/stories/features/support/SupportPages.MemberBenefits.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-5-온라인-회원-등급-안내-mobile--default',
        file: 'src/stories/features/support/SupportPages.MemberBenefits.Mobile.stories.tsx',
      },
    },
  },
  '216': {
    route: '/support/after-sales',
    sourceFiles: ['src/app/support/after-sales/page.tsx'],
    stories: {
      web: {
        id: 'pages-고객센터-7-배송-및-반품안내-web--default',
        file: 'src/stories/features/support/SupportPages.ShippingReturns.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-7-배송-및-반품안내-mobile--default',
        file: 'src/stories/features/support/SupportPages.ShippingReturns.Mobile.stories.tsx',
      },
    },
  },
  '217': {
    route: '/support/care',
    sourceFiles: ['src/app/support/care/page.tsx'],
    stories: {
      web: {
        id: 'pages-고객센터-8-세탁-및-손질-방법-안내-web--default',
        file: 'src/stories/features/support/SupportPages.CareGuide.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-8-세탁-및-손질-방법-안내-mobile--default',
        file: 'src/stories/features/support/SupportPages.CareGuide.Mobile.stories.tsx',
      },
    },
  },
  '218': {
    route: '/support/terms?tab=privacy',
    sourceFiles: ['src/app/support/terms/page.tsx'],
    stories: {},
  },
  '219': {
    route: '/support/terms',
    sourceFiles: ['src/app/support/terms/page.tsx'],
    stories: {
      web: {
        id: 'pages-고객센터-9-약관-web--default',
        file: 'src/stories/features/support/SupportPages.Terms.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-9-약관-mobile--default',
        file: 'src/stories/features/support/SupportPages.Terms.Mobile.stories.tsx',
      },
    },
  },
  '223': {
    route: '/login',
    previewRoutes: [{ label: '에러 메시지', href: '/login/preview-error' }],
    sourceFiles: ['src/app/login/page.tsx', 'src/app/login/preview-error/page.tsx'],
    stories: {
      web: {
        id: 'pages-로그인-0-로그인-web--default',
        file: 'src/stories/features/login/LoginPage.stories.tsx',
      },
      mobile: {
        id: 'pages-로그인-0-로그인-mobile--default',
        file: 'src/stories/features/login/LoginPage.mobile.stories.tsx',
      },
    },
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
    stories: {
      web: {
        id: 'pages-로그인-1-아이디·비밀번호-찾기-web--default',
        file: 'src/stories/features/find-account/FindAccountPage.stories.tsx',
      },
      mobile: {
        id: 'pages-로그인-1-아이디·비밀번호-찾기-mobile--default',
        file: 'src/stories/features/find-account/FindAccountPage.mobile.stories.tsx',
      },
    },
  },
  '226': {
    route: '/login/find-account/id-confirmation-modal',
    sourceFiles: ['src/app/login/find-account/id-confirmation-modal/page.tsx'],
    stories: {
      web: {
        id: 'pages-로그인-2-아이디확인-web--default',
        file: 'src/stories/features/find-account/IdConfirmationModal.stories.tsx',
      },
      mobile: {
        id: 'pages-로그인-2-아이디확인-mobile--default',
        file: 'src/stories/features/find-account/IdConfirmationModal.mobile.stories.tsx',
      },
    },
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
    stories: {
      web: {
        id: 'pages-로그인-3-비밀번호-재설정-web--default',
        file: 'src/stories/features/find-account/PasswordResetPage.stories.tsx',
      },
      mobile: {
        id: 'pages-로그인-3-비밀번호-재설정-mobile--default',
        file: 'src/stories/features/find-account/PasswordResetPage.mobile.stories.tsx',
      },
    },
  },
  '233': {
    route: '/signup',
    previewRoutes: [{ label: '인증방법 선택', href: '/signup/verify' }],
    sourceFiles: ['src/app/signup/page.tsx', 'src/app/signup/verify/page.tsx'],
    stories: {
      web: {
        id: 'pages-회원가입-0-회원가입-안내-web--default',
        file: 'src/stories/features/signup/SignupPage.stories.tsx',
      },
      mobile: {
        id: 'pages-회원가입-0-회원가입-안내-mobile--default',
        file: 'src/stories/features/signup/SignupPage.mobile.stories.tsx',
      },
    },
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
    stories: {
      web: {
        id: 'pages-회원가입-2-휴대폰-인증-web--default',
        file: 'src/stories/features/phone-verification/PhoneVerificationPage.stories.tsx',
      },
      mobile: {
        id: 'pages-회원가입-2-휴대폰-인증-mobile--default',
        file: 'src/stories/features/phone-verification/PhoneVerificationPage.mobile.stories.tsx',
      },
    },
  },
  '236': {
    route: '/signup/terms',
    previewRoutes: [{ label: '필수 동의 오류', href: '/signup/terms/preview-error' }],
    sourceFiles: ['src/app/signup/terms/page.tsx', 'src/app/signup/terms/preview-error/page.tsx'],
    stories: {
      web: {
        id: 'pages-회원가입-3-약관동의-web--default',
        file: 'src/stories/features/signup-terms/SignupTermsPage.stories.tsx',
      },
      mobile: {
        id: 'pages-회원가입-3-약관동의-mobile--default',
        file: 'src/stories/features/signup-terms/SignupTermsPage.mobile.stories.tsx',
      },
    },
  },
  '237': {
    route: '/signup/information',
    previewRoutes: [{ label: '입력 오류', href: '/signup/information/preview-error' }],
    sourceFiles: [
      'src/app/signup/information/page.tsx',
      'src/app/signup/information/preview-error/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-회원가입-4-회원-정보-입력-web--default',
        file: 'src/stories/features/signup-registration/RegistrationPage.stories.tsx',
      },
      mobile: {
        id: 'pages-회원가입-4-회원-정보-입력-mobile--default',
        file: 'src/stories/features/signup-registration/RegistrationPage.mobile.stories.tsx',
      },
    },
  },
  '238': {
    route: '/signup/complete',
    sourceFiles: ['src/app/signup/complete/page.tsx'],
    stories: {},
  },
  '247': {
    route: '/search',
    defaultStateLabel: '검색 결과 있음',
    previewRoutes: [{ label: '검색 결과 없음', href: '/search/preview-no-results' }],
    sourceFiles: ['src/app/search/page.tsx', 'src/app/search/preview-no-results/page.tsx'],
    stories: {
      web: {
        id: 'pages-공통-0-검색결과-web--search-results',
        file: 'src/stories/features/catalog/SearchResults.WEB.stories.tsx',
      },
      mobile: {
        id: 'pages-공통-0-검색결과-mobile--search-results',
        file: 'src/stories/features/catalog/SearchResults.Mobile.stories.tsx',
      },
    },
  },
  '248': {
    route: '/preview-not-found',
    sourceFiles: ['src/app/not-found.tsx', 'src/app/preview-not-found/page.tsx'],
    stories: {
      web: {
        id: 'pages-공통-1-404에러페이지-web--default',
        file: 'src/stories/features/not-found/NotFoundPage.stories.tsx',
      },
      mobile: {
        id: 'pages-공통-1-404에러페이지-mobile--default',
        file: 'src/stories/features/not-found/NotFoundPage.mobile.stories.tsx',
      },
    },
  },
  '249': {
    route: '/maintenance',
    sourceFiles: ['src/app/maintenance/page.tsx'],
    stories: {
      web: {
        id: 'pages-공통-2-시스템점검페이지-web--maintenance',
        file: 'src/stories/features/not-found/SystemStatusPage.stories.tsx',
      },
      mobile: {
        id: 'pages-공통-2-시스템점검페이지-mobile--maintenance',
        file: 'src/stories/features/not-found/SystemStatusPage.mobile.stories.tsx',
      },
    },
  },
  '250': {
    route: '/service-unavailable',
    sourceFiles: ['src/app/service-unavailable/page.tsx'],
    stories: {
      web: {
        id: 'pages-공통-3-기타에러페이지-web--unavailable',
        file: 'src/stories/features/not-found/UnavailablePage.WEB.stories.tsx',
      },
      mobile: {
        id: 'pages-공통-3-기타에러페이지-mobile--unavailable',
        file: 'src/stories/features/not-found/UnavailablePage.Mobile.stories.tsx',
      },
    },
  },
  '251': {
    route: '/login/account-locked',
    sourceFiles: ['src/app/login/account-locked/page.tsx'],
    stories: {
      web: {
        id: 'pages-로그인-5-계정-잠금-안내-web--default',
        file: 'src/stories/features/account-locked/AccountLockedPage.stories.tsx',
      },
      mobile: {
        id: 'pages-로그인-5-계정-잠금-안내-mobile--default',
        file: 'src/stories/features/account-locked/AccountLockedPage.mobile.stories.tsx',
      },
    },
  },
  '252': {
    route: '/login/find-account/password-reset/preview-complete',
    sourceFiles: [
      'src/app/login/find-account/password-reset/page.tsx',
      'src/app/login/find-account/password-reset/preview-complete/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-로그인-4-비밀번호-재설정-완료-web--default',
        file: 'src/stories/features/find-account/PasswordResetCompleteModal.stories.tsx',
      },
      mobile: {
        id: 'pages-로그인-4-비밀번호-재설정-완료-mobile--default',
        file: 'src/stories/features/find-account/PasswordResetCompleteModal.mobile.stories.tsx',
      },
    },
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
    ],
    sourceFiles: [
      'src/app/login/account-locked/verification/page.tsx',
      'src/app/login/account-locked/verification/preview-error/page.tsx',
      'src/app/login/account-locked/verification/preview-code-entry/page.tsx',
      'src/app/login/account-locked/verification/preview-expired/page.tsx',
      'src/app/login/account-locked/verification/preview-agreement-error/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-로그인-6-계정-잠금-해제-인증-web--default',
        file: 'src/stories/features/login/AccountUnlockVerification.stories.tsx',
      },
      mobile: {
        id: 'pages-로그인-6-계정-잠금-해제-인증-mobile--default',
        file: 'src/stories/features/login/AccountUnlockVerification.mobile.stories.tsx',
      },
    },
  },
  '254': {
    route: '/login/account-locked/complete',
    sourceFiles: ['src/app/login/account-locked/complete/page.tsx'],
    stories: {
      web: {
        id: 'pages-로그인-7-계정-잠금-해제-완료-web--default',
        file: 'src/stories/features/account-locked/AccountUnlockCompletePage.stories.tsx',
      },
      mobile: {
        id: 'pages-로그인-7-계정-잠금-해제-완료-mobile--default',
        file: 'src/stories/features/account-locked/AccountUnlockCompletePage.mobile.stories.tsx',
      },
    },
  },
  '255': {
    route: '/signup/information?step=additional',
    sourceFiles: ['src/app/signup/information/page.tsx'],
    stories: {
      web: {
        id: 'pages-회원가입-4-회원-정보-입력-web--additional',
        file: 'src/stories/features/signup-registration/RegistrationPage.stories.tsx',
      },
      mobile: {
        id: 'pages-회원가입-4-회원-정보-입력-mobile--additional',
        file: 'src/stories/features/signup-registration/RegistrationPage.mobile.stories.tsx',
      },
    },
  },
  '256': {
    route: '/signup/information/preview-marketing-consent',
    sourceFiles: [
      'src/app/signup/information/page.tsx',
      'src/app/signup/information/preview-marketing-consent/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-회원가입-5-마케팅-정보-수신동의-안내-web--default',
        file: 'src/stories/features/signup-registration/MarketingConsentSummaryModal.stories.tsx',
      },
      mobile: {
        id: 'pages-회원가입-5-마케팅-정보-수신동의-안내-mobile--default',
        file: 'src/stories/features/signup-registration/MarketingConsentSummaryModal.mobile.stories.tsx',
      },
    },
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
    stories: {
      web: {
        id: 'pages-탐색-0-러닝세션-목록-web--list',
        file: 'src/stories/features/running-session/RunningSession.stories.tsx',
      },
      mobile: {
        id: 'pages-탐색-0-러닝세션-목록-mobile--list',
        file: 'src/stories/features/running-session/RunningSession.mobile.stories.tsx',
      },
    },
  },
  '259': {
    previewRoutes: [
      { label: '신청 가능', href: '/running/running-session/yeouido-night' },
      { label: '모집 마감', href: '/running/running-session/bukhansan-trail' },
      { label: '신청 예정', href: '/running/running-session/inwangsan-trail' },
    ],
    sourceFiles: ['src/app/running/running-session/[sessionId]/page.tsx'],
    stories: {
      web: {
        id: 'pages-탐색-1-러닝세션-상세-web--open',
        file: 'src/stories/features/running-session/RunningSessionDetail.stories.tsx',
      },
      mobile: {
        id: 'pages-탐색-1-러닝세션-상세-mobile--open',
        file: 'src/stories/features/running-session/RunningSessionDetail.mobile.stories.tsx',
      },
    },
  },
  '260': {
    route: '/support/size-guide',
    sourceFiles: ['src/app/support/size-guide/page.tsx'],
    stories: {
      web: {
        id: 'pages-고객센터-6-사이즈-가이드-web--default',
        file: 'src/stories/features/support/SupportPages.SizeGuide.Web.stories.tsx',
      },
      mobile: {
        id: 'pages-고객센터-6-사이즈-가이드-mobile--default',
        file: 'src/stories/features/support/SupportPages.SizeGuide.Mobile.stories.tsx',
      },
    },
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
    stories: {
      web: {
        id: 'pages-상품-0-상품목록-web--width-1600',
        file: 'src/stories/features/catalog/ProductListingPage.stories.tsx',
      },
      mobile: {
        id: 'pages-상품-0-상품목록-mobile--width-375',
        file: 'src/stories/features/catalog/ProductListingPage.mobile.stories.tsx',
      },
    },
  },
  detail: {
    defaultStateLabel: '상품문의 있음',
    previewRoutes: [
      {
        label: '상품문의 없음',
        href: '/products/preview-empty-inquiries#product-inquiries',
      },
    ],
    sourceFiles: [
      'src/app/products/[id]/page.tsx',
      'src/app/products/preview-empty-inquiries/page.tsx',
    ],
    stories: {
      web: {
        id: 'pages-상품-1-상품상세-web--width-1600',
        file: 'src/stories/features/product/ProductDetailPage.stories.tsx',
      },
      mobile: {
        id: 'pages-상품-1-상품상세-mobile--width-375',
        file: 'src/stories/features/product/ProductDetailPage.mobile.stories.tsx',
      },
    },
  },
};

export function isScreenDeleted(screen: ScreenDefinition) {
  return screen.note.replace(/상품\s*삭제/g, '').includes('삭제');
}

function getRegisteredConnection(screen: ScreenDefinition): ScreenConnection {
  if (isScreenDeleted(screen)) return { sourceFiles: [], stories: {} };
  const connection = connections[screen.iaNumber];
  if (connection) return connection;
  if (screen.screenCode === 'eland_hca_01')
    return {
      ...productConnections.listing,
      route: getProductListingRoute(getProductListingIaKey(screen.iaNumber)),
    };
  if (screen.screenCode === 'eland_hca_02')
    return { ...productConnections.detail, route: '/products/shoe-1' };
  return { sourceFiles: [], stories: {} };
}

// [ 개발팀 바인딩 ] IA 소유자는 화면의 진입 파일만 연결한다. 생성기가 실제 import를
// 추적해 진입점과 바인딩 주석이 있는 도메인/컨텍스트를 표시한다. 서비스 구현·수정 이력이
// 아니며 공통 UI·범용 요청 훅·프리뷰·목 데이터는 수정 대상처럼 나열하지 않는다.
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

export function getScreenStoryHref(screen: ScreenDefinition, platform: 'web' | 'mobile') {
  const story = getScreenConnection(screen).stories[platform];
  if (!story) return undefined;
  const params = new URLSearchParams({ path: '/story/' + story.id });
  if (screen.screenCode === 'eland_hca_01' && screen.depths[0] !== '공통')
    params.set('args', 'listing:' + getProductListingIaKey(screen.iaNumber));
  return '/?' + params.toString();
}
