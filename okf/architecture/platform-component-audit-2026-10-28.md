---
type: Audit
title: 'Desktop·Mobile 파일 전수조사와 단일 부모 통합'
description: '플랫폼 이름을 포함한 소스 전체의 역할·참조·통합 결과와 보존 조건을 기록한다.'
tags: [components, reuse, responsive, audit]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-28T04:40:52+00:00'
source_revision: 83493af67d9a9e285fd0e7ecbda618271ddbb1c1
working_tree_sources:
  - src/components/features/catalog/product-listing/ProductListingContent.tsx
  - src/components/features/catalog/product-listing/ProductListingLayout.tsx
  - src/components/features/catalog/product-listing/ProductSortDropdown.tsx
  - src/components/features/catalog/product-listing/productSortOptions.ts
  - src/components/features/product/ProductDetailGallery.tsx
  - src/components/common/organisms/Layout/SiteHeader/SiteHeaderContainer.tsx
  - src/components/common/organisms/Layout/SiteFooter/FooterNavigation.tsx
  - src/app/running/run-club/[sessionId]/page.tsx
sources:
  - id: catalog-before
    resource: https://github.com/nalpari/hoka-fo-pub/blob/83493af67d9a9e285fd0e7ecbda618271ddbb1c1/src/components/features/catalog/product-listing/ProductListingContent.tsx
    title: '상품 목록 플랫폼 배치의 변경 전 구현'
  - id: gallery-before
    resource: https://github.com/nalpari/hoka-fo-pub/blob/83493af67d9a9e285fd0e7ecbda618271ddbb1c1/src/components/features/product/ProductDetailGallery.tsx
    title: '상품 갤러리 플랫폼 분기의 변경 전 구현'
---

# Desktop·Mobile 파일 전수조사와 단일 부모 통합

## 조사 범위와 결과

2026-10-28 작업 시작 시 `src` 전체에서 파일명에 Desktop 또는 Mobile을 포함하는 소스를 대소문자 구분 없이 조사했다. 운영 TSX 12개와 Storybook 45개, 총 57개다. 모든 운영 파일의 내용과 호출부를 읽고 TypeScript 모듈 해석으로 운영 부모 수를 확인했다. Storybook은 각 파일의 내용·공유 시나리오 import·예시 데이터·뷰포트 및 상호작용 구성을 확인했다. 이미지 리소스·생성물·외부 패키지는 소스 조사에 포함하지 않았다. Web·MO 등 다른 이름은 비교할 상대 구현과 공용 데이터 확인에만 사용했다.

처음 요청한 필터 컨테이너 2개는 부모에 직접 통합하고, 정렬은 ProductSortDropdown으로 변경했다. 후속 사용자 지시에 따라 나머지 9개도 유일한 운영 부모 파일에 통합했다. 수정 후 운영 코드에는 Desktop/Mobile 이름의 파일이 0개이며 Storybook 45개는 유지한다. 다른 이름의 운영 단일 부모 TSX 후보 358개는 조사 범위 확인을 위한 수치이며 이번 통합에서 제외한다. 이 수치는 재귀 통합 후 잔여 수를 의미하지 않는다.

## 운영 파일 12개 전수 결과

첫 번째 열은 변경 전 `src/components/` 기준 경로다. 삭제 후에도 조사 출처로 보존한다. 부모에 옮긴 구성요소는 외부 export를 제거하고 역할 중심 이름의 모듈 최상위 로컬 함수로 유지한다. 렌더 함수 안에 컴포넌트를 새로 정의하지 않는다.

| 변경 전 파일                                                      | 최종 소유 파일                                  | 처리와 보존 조건                                                            |
| ----------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| `features/catalog/product-listing/DesktopProductFilter.tsx`       | `ProductListingContent.tsx`                     | 고정 영역과 스크롤 속성을 부모 JSX에 통합                                   |
| `features/catalog/product-listing/MobileProductFilter.tsx`        | `ProductListingContent.tsx`                     | BottomSheet·적용 버튼을 부모 JSX에 통합                                     |
| `features/catalog/product-listing/DesktopProductSort.tsx`         | `ProductSortDropdown.tsx`                       | 역할 중심 이름으로 변경; 열림·닫힘·키보드 상태 유지                         |
| `features/catalog/product-listing/MobileCategoryTabs.tsx`         | `ProductListingLayout.tsx`                      | 중간 부모와 함께 이동; ProductActivityTabs 로컬 구성요소                    |
| `features/catalog/product-listing/MobileProductNavigation.tsx`    | `ProductListingLayout.tsx`                      | ProductActivityNavigation 로컬 구성요소; useScrollPin·기준점·고정 위치 보존 |
| `features/catalog/product-listing/MobileProductFilterTrigger.tsx` | `ProductListingLayout.tsx`                      | ProductFilterTrigger 로컬 구성요소; 목록·검색의 호출 위치와 표현 props 보존 |
| `features/product/ProductDetailDesktopGallery.tsx`                | `ProductDetailGallery.tsx`                      | ProductImageGrid 로컬 구성요소; 2열·간격·이미지 클릭 인덱스 보존            |
| `features/product/ProductDetailMobileGallery.tsx`                 | `ProductDetailGallery.tsx`                      | ProductImageCarousel 로컬 구성요소; 스와이프·순환·페이지 표시 보존          |
| `features/run-club/RunClubMobileActionBar.tsx`                    | `src/app/running/run-club/[sessionId]/page.tsx` | RunClubFixedActionBar 로컬 구성요소; 상태별 버튼·하단 안전 영역 보존        |
| `common/organisms/Layout/SiteFooter/FooterNavigationMobile.tsx`   | `FooterNavigation.tsx`                          | FooterAccordionNavigation 로컬 구성요소; 복수 펼침·공통 링크 데이터 보존    |
| `common/organisms/Layout/SiteHeader/DesktopNavigation.tsx`        | `SiteHeaderContainer.tsx`                       | HeaderMegaMenuNavigation 로컬 구성요소; 호버·포커스·Tab·역방향 이동 보존    |
| `common/organisms/Layout/SiteHeader/HeaderMobileMenuButton.tsx`   | `SiteHeaderContainer.tsx`                       | HeaderMenuButton 로컬 구성요소; 플랫폼 조건·메뉴 콜백 보존                  |

## 중복과 표시 차이의 판정

- 필터 본문은 ProductListingFilterPanel, 필터링·정렬 계산은 ProductListingPage 및 filterProducts/sortProducts를 공유한다. ProductListingContent에 표시 컨테이너를 합치되 PC의 즉시 반영, 모바일의 초안·적용·닫기 시 미반영과 다시 열기 시 현재 조건 재복사를 보존한다. 플랫폼은 기존 usePlatform 기준이며 화면 폭만으로 대체하지 않는다.
- 정렬의 네 선택지와 순서는 productSortOptions에서 한 번 정의해 드롭다운과 모바일 Radio가 공유한다. 문자열 값·URL sort·기본값은 유지한다. 드롭다운의 마우스 선택 후 닫기, 키보드 선택 중 열림 유지, 영역 밖 포커스 이동 후 닫기를 보존한다.
- 갤러리는 그리드와 캐러셀이라는 서로 다른 상호작용을 가진다. ProductDetailImage와 이미지 배열은 공유한다. 파일은 합치되 표시 분기와 독립적인 구성 책임은 로컬 함수로 보존한다.
- 푸터는 footerGroups·FooterNavigationLinks를 이미 공유하며, 모바일 아코디언과 PC 열 배치의 책임이 다르다. 모바일 구성은 부모 내부로 옮기고 범위 밖 FooterNavigationWeb은 유지한다.
- 헤더의 주요 메뉴는 megaMenus와 상위 메뉴 상태를 공유한다. 주요 메뉴의 키보드·포커스 이동과 모바일 전체 메뉴 버튼의 열기 동작은 서로 다른 계약이다. 데이터나 이벤트 로직을 복제하지 않고 같은 부모 안의 로컬 구성요소로 둔다.
- 런클럽은 RunClubApplyButton이 상태별 라벨·활성 조건을 공유한다. 하단 바는 위치·안전 영역만 소유하며, 실제 버튼 콜백과 상태 수명은 바꾸지 않는다.

파일 수가 개발 공수에 비례한다는 근거는 확인하지 않았다. 이 변경은 소비처 탐색과 파일 이동 비용을 줄이는 구조 정리이며, PC/Mobile의 표시·접근성 회귀 확인은 계속 필요하다.

## 유지한 Storybook 파일 45개

플랫폼별 예시·뷰포트·play 검증 파일이며 별도 운영 기능 구현으로 보지 않는다. 대다수는 공용 scenarios를 가져오며 주문·회원정보·문의에는 추가 상호작용 시나리오가 있다. 운영 컴포넌트의 단일 부모 통합과 별개로 유지한다.

- `src/stories/features/account-locked/AccountLockedPage.mobile.stories.tsx`
- `src/stories/features/account-locked/AccountUnlockCompletePage.mobile.stories.tsx`
- `src/stories/features/cart/CartPage.mobile.stories.tsx`
- `src/stories/features/catalog/ProductListingPage.mobile.stories.tsx`
- `src/stories/features/catalog/SearchResults.Mobile.stories.tsx`
- `src/stories/features/checkout/CheckoutPage.mobile.stories.tsx`
- `src/stories/features/find-account/FindAccountPage.mobile.stories.tsx`
- `src/stories/features/find-account/IdConfirmationModal.mobile.stories.tsx`
- `src/stories/features/find-account/PasswordResetCompleteModal.mobile.stories.tsx`
- `src/stories/features/find-account/PasswordResetPage.mobile.stories.tsx`
- `src/stories/features/home/HomePage.mobile.stories.tsx`
- `src/stories/features/identity-verification/IdentityVerificationPage.mobile.stories.tsx`
- `src/stories/features/locales/LocalesPage.mobile.stories.tsx`
- `src/stories/features/login/AccountUnlockVerification.mobile.stories.tsx`
- `src/stories/features/login/LoginPage.mobile.stories.tsx`
- `src/stories/features/mypage/MyPage.Addresses.Mobile.stories.tsx`
- `src/stories/features/mypage/MyPage.Coupons.Mobile.stories.tsx`
- `src/stories/features/mypage/MyPage.Profile.Mobile.stories.tsx`
- `src/stories/features/mypage/MyPage.Recent.Mobile.stories.tsx`
- `src/stories/features/mypage/MyPage.RestockAlerts.Mobile.stories.tsx`
- `src/stories/features/mypage/MyPage.Reviews.Mobile.stories.tsx`
- `src/stories/features/mypage/MyPage.Rewards.Mobile.stories.tsx`
- `src/stories/features/mypage/MyPage.Wishlist.Mobile.stories.tsx`
- `src/stories/features/not-found/NotFoundPage.mobile.stories.tsx`
- `src/stories/features/not-found/SystemStatusPage.mobile.stories.tsx`
- `src/stories/features/not-found/UnavailablePage.Mobile.stories.tsx`
- `src/stories/features/orders/OrdersPage.mobile.stories.tsx`
- `src/stories/features/phone-verification/PhoneVerificationPage.mobile.stories.tsx`
- `src/stories/features/product/ProductDetailPage.mobile.stories.tsx`
- `src/stories/features/run-club/RunClub.mobile.stories.tsx`
- `src/stories/features/run-club/RunClubDetail.mobile.stories.tsx`
- `src/stories/features/signup-registration/MarketingConsentSummaryModal.mobile.stories.tsx`
- `src/stories/features/signup-registration/RegistrationPage.mobile.stories.tsx`
- `src/stories/features/signup-terms/SignupTermsPage.mobile.stories.tsx`
- `src/stories/features/signup/SignupPage.mobile.stories.tsx`
- `src/stories/features/support/SupportPages.CareGuide.Mobile.stories.tsx`
- `src/stories/features/support/SupportPages.CustomerCenter.Mobile.stories.tsx`
- `src/stories/features/support/SupportPages.Faq.Mobile.stories.tsx`
- `src/stories/features/support/SupportPages.Inquiries.Mobile.stories.tsx`
- `src/stories/features/support/SupportPages.MemberBenefits.Mobile.stories.tsx`
- `src/stories/features/support/SupportPages.Notices.Mobile.stories.tsx`
- `src/stories/features/support/SupportPages.ShippingReturns.Mobile.stories.tsx`
- `src/stories/features/support/SupportPages.SizeGuide.Mobile.stories.tsx`
- `src/stories/features/support/SupportPages.StoreFinder.Mobile.stories.tsx`
- `src/stories/features/support/SupportPages.Terms.Mobile.stories.tsx`

## 검증

- 타입 검사·변경 파일 ESLint/Prettier·Panda 생성·Next production build·Storybook build와 기존 테스트 62개를 통과했다.
- 이름과 공백을 정규화한 AST 비교로 부모에 옮긴 9개 구성요소의 함수 본문이 이전과 동일함을 확인했다. 삭제한 12개 기존 모듈의 import 참조가 남지 않았으며 Storybook 파일 변경은 없다.
- 브라우저에서 PC 필터 선택 즉시 URL 변경, 정렬 마우스 선택 후 닫기·키보드 선택 중 열림 유지·포커스 이탈 후 닫기를 확인했다. 모바일은 초안 선택 중 URL 유지·닫고 재진입 시 미적용 선택 복원·적용 후 URL 반영과 시트 닫기를 확인했다. 모바일 검색 필터 적용 후 검색어도 유지됐다.
- 이동된 구성의 추가 확인으로 모바일 전체 메뉴 열기, 푸터 Company 아코디언의 키보드 펼침, 갤러리 2번 이미지 선택, 런클럽 신청 안내 표시와 PC 이미지 확대 진입/키보드 닫기·헤더 메뉴 포커스 열기를 확인했다.
- 표의 모든 상태·뷰포트에 대한 시각 비교와 Storybook play 함수 전수 실행은 하지 않았다. 표의 보존 조건 전체가 각각 별도 브라우저 테스트를 통과했다는 뜻은 아니다.
