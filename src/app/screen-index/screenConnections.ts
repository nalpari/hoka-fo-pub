import {
  getProductListingIaKey,
  getProductListingRoute,
} from '@/app/screen-index/productListingIaRoute';
import type { ScreenDefinition } from '@/data/screenRegistry';

export type ScreenConnection = {
  route?: string;
  sourceFiles: string[];
  stories: Partial<Record<'web' | 'mobile', { id: string; file: string }>>;
};

const connections: Record<number, ScreenConnection> = {
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
    sourceFiles: ['src/app/mypage/orders/page.tsx', 'src/components/orders/OrdersRoute.tsx'],
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
  '158': {
    route: '/running/run-club',
    sourceFiles: [
      'src/app/running/run-club/page.tsx',
      'src/components/run-club/RunClubPage.tsx',
      'src/components/common/atoms/Badge.tsx',
    ],
    stories: {
      web: {
        id: 'pages-탐색-0-러닝세션-목록-web--list',
        file: 'src/stories/features/run-club/RunClub.stories.tsx',
      },
      mobile: {
        id: 'pages-탐색-0-러닝세션-목록-mobile--list',
        file: 'src/stories/features/run-club/RunClub.mobile.stories.tsx',
      },
    },
  },
  '170': {
    route: '/cart',
    sourceFiles: ['src/app/cart/page.tsx'],
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
    sourceFiles: ['src/app/checkout/page.tsx'],
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
    sourceFiles: ['src/app/mypage/page.tsx'],
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
    sourceFiles: ['src/app/mypage/orders/page.tsx', 'src/components/orders/OrdersRoute.tsx'],
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
    sourceFiles: ['src/app/mypage/returns/page.tsx', 'src/components/orders/OrdersRoute.tsx'],
    stories: {},
  },
  '182': {
    route: '/mypage/wishlist',
    sourceFiles: [
      'src/app/mypage/wishlist/page.tsx',
      'src/components/mypage/MyPageProductHistory.tsx',
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
    sourceFiles: [
      'src/app/mypage/recent/page.tsx',
      'src/components/mypage/MyPageProductHistory.tsx',
    ],
    stories: {
      mobile: {
        id: 'pages-마이페이지-2-오늘-본-상품-mobile--recent',
        file: 'src/stories/features/mypage/MyPage.Recent.Mobile.stories.tsx',
      },
    },
  },
  '184': {
    route: '/mypage/restock-alerts',
    sourceFiles: [
      'src/app/mypage/restock-alerts/page.tsx',
      'src/components/mypage/MyPageProductHistory.tsx',
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
    sourceFiles: ['src/app/support/faq/page.tsx'],
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
    route: '/support/inquiries',
    sourceFiles: [
      'src/app/support/inquiries/page.tsx',
      'src/components/support/InquiryCautions.tsx',
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
    sourceFiles: [
      'src/app/support/inquiries/new/page.tsx',
      'src/components/support/InquiryCautions.tsx',
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
    sourceFiles: ['src/app/mypage/reviews/page.tsx', 'src/components/mypage/MyPageFrame.tsx'],
    stories: {
      mobile: {
        id: 'pages-마이페이지-4-상품리뷰-mobile--reviews',
        file: 'src/stories/features/mypage/MyPage.Reviews.Mobile.stories.tsx',
      },
    },
  },
  '195': {
    route: '/mypage/rewards',
    sourceFiles: ['src/app/mypage/rewards/page.tsx', 'src/components/mypage/MyPageFrame.tsx'],
    stories: {
      mobile: {
        id: 'pages-마이페이지-5-회원등급-mobile--rewards',
        file: 'src/stories/features/mypage/MyPage.Rewards.Mobile.stories.tsx',
      },
    },
  },
  '196': {
    route: '/mypage/coupons',
    sourceFiles: ['src/app/mypage/coupons/page.tsx', 'src/components/mypage/MyPageFrame.tsx'],
    stories: {
      mobile: {
        id: 'pages-마이페이지-6-쿠폰-mobile--coupons',
        file: 'src/stories/features/mypage/MyPage.Coupons.Mobile.stories.tsx',
      },
    },
  },
  '198': {
    route: '/mypage/event-entries',
    sourceFiles: [
      'src/app/mypage/event-entries/page.tsx',
      'src/components/run-club/RunClubPage.tsx',
    ],
    stories: {},
  },
  '201': {
    route: '/mypage/profile',
    sourceFiles: ['src/app/mypage/profile/page.tsx', 'src/components/mypage/MyPageFrame.tsx'],
    stories: {
      mobile: {
        id: 'pages-마이페이지-7-회원정보확인-및-수정-mobile--profile',
        file: 'src/stories/features/mypage/MyPage.Profile.Mobile.stories.tsx',
      },
    },
  },
  '203': {
    route: '/mypage/addresses',
    sourceFiles: ['src/app/mypage/addresses/page.tsx', 'src/components/mypage/MyPageFrame.tsx'],
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
    sourceFiles: ['src/app/support/faq/page.tsx'],
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
    sourceFiles: ['src/app/support/notices/page.tsx'],
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
    route: '/support/inquiries',
    sourceFiles: [
      'src/app/support/inquiries/page.tsx',
      'src/components/support/InquiryCautions.tsx',
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
    sourceFiles: [
      'src/app/support/inquiries/new/page.tsx',
      'src/components/support/InquiryCautions.tsx',
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
    sourceFiles: [
      'src/app/support/care/page.tsx',
      'src/components/care-guide/CareInstructions.tsx',
    ],
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
    sourceFiles: ['src/app/login/page.tsx'],
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
    sourceFiles: [
      'src/app/login/find-account/page.tsx',
      'src/components/find-account/IdConfirmationMessage.tsx',
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
    sourceFiles: [
      'src/app/login/find-account/id-confirmation-modal/page.tsx',
      'src/components/find-account/IdConfirmationMessage.tsx',
    ],
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
    sourceFiles: ['src/app/login/find-account/password-reset/page.tsx'],
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
    sourceFiles: ['src/app/signup/page.tsx'],
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
    sourceFiles: [
      'src/app/signup/verify/phone/page.tsx',
      'src/components/phone-verification/PhoneVerificationContent.tsx',
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
    sourceFiles: ['src/app/signup/terms/page.tsx'],
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
    sourceFiles: ['src/app/signup/information/page.tsx'],
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
    sourceFiles: ['src/app/search/page.tsx', 'src/components/catalog/ProductListingPage.tsx'],
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
    sourceFiles: ['src/app/not-found.tsx', 'src/components/not-found/NotFoundPage.tsx'],
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
    sourceFiles: ['src/app/maintenance/page.tsx', 'src/components/not-found/SystemStatusPage.tsx'],
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
    sourceFiles: [
      'src/app/service-unavailable/page.tsx',
      'src/components/not-found/SystemStatusPage.tsx',
    ],
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
    sourceFiles: ['src/app/login/find-account/password-reset/page.tsx'],
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
    sourceFiles: [
      'src/app/login/account-locked/verification/page.tsx',
      'src/components/phone-verification/PhoneVerificationContent.tsx',
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
    sourceFiles: ['src/app/signup/information/page.tsx'],
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
    route: '/running/run-club',
    sourceFiles: [
      'src/app/running/run-club/page.tsx',
      'src/components/run-club/RunClubPage.tsx',
      'src/components/common/atoms/Badge.tsx',
    ],
    stories: {
      web: {
        id: 'pages-탐색-0-러닝세션-목록-web--list',
        file: 'src/stories/features/run-club/RunClub.stories.tsx',
      },
      mobile: {
        id: 'pages-탐색-0-러닝세션-목록-mobile--list',
        file: 'src/stories/features/run-club/RunClub.mobile.stories.tsx',
      },
    },
  },
  '259': {
    route: '/running/run-club/yeouido-night',
    sourceFiles: [
      'src/app/running/run-club/[sessionId]/page.tsx',
      'src/components/run-club/RunClubPage.tsx',
      'src/components/not-found/NotFoundPage.tsx',
      'src/components/common/atoms/Badge.tsx',
    ],
    stories: {
      web: {
        id: 'pages-탐색-1-러닝세션-상세-web--open',
        file: 'src/stories/features/run-club/RunClubDetail.stories.tsx',
      },
      mobile: {
        id: 'pages-탐색-1-러닝세션-상세-mobile--open',
        file: 'src/stories/features/run-club/RunClubDetail.mobile.stories.tsx',
      },
    },
  },
  '260': {
    route: '/support/size-guide',
    sourceFiles: [
      'src/app/support/size-guide/page.tsx',
      'src/app/support/size-guide/_components/SizeGuidePanel.tsx',
    ],
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
    sourceFiles: ['src/app/products/page.tsx', 'src/components/catalog/ProductListingPage.tsx'],
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
    sourceFiles: ['src/app/products/[id]/page.tsx'],
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

export function getScreenConnection(screen: ScreenDefinition): ScreenConnection {
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

export function getScreenStoryHref(screen: ScreenDefinition, platform: 'web' | 'mobile') {
  const story = getScreenConnection(screen).stories[platform];
  if (!story) return undefined;
  const params = new URLSearchParams({ path: '/story/' + story.id });
  if (screen.screenCode === 'eland_hca_01' && screen.depths[0] !== '공통')
    params.set('args', 'listing:' + getProductListingIaKey(screen.iaNumber));
  return '/?' + params.toString();
}
