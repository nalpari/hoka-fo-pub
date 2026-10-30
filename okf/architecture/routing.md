---
type: Architecture
title: '라우팅과 플랫폼'
description: 'App Router 경로, 페이지 경계와 PC·모바일 선택을 설명한다.'
tags: [nextjs, routing, platform]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-30T06:43:01+00:00'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/app/publishing-guide/page.tsx
  - src/app/mypage/event-entries/preview-cancel/page.tsx
  - src/app/mypage/reviews/preview-ready/page.tsx
  - src/app/mypage/reviews/preview-written/page.tsx
  - src/app/mypage/reviews/_components/ReviewStatePreview.tsx
  - src/app/mypage/event-entries/_components/RunClubEntriesContent.tsx
  - src/app/mypage/event-entries/eventEntries.data.ts
  - src/stories/features/login/LoginPage.scenarios.tsx
  - src/stories/features/cart/CartPage.scenarios.tsx
  - src/app/login/preview-error/page.tsx
  - src/app/login/_components/LoginContent.tsx
  - src/app/cart/preview-empty/page.tsx
  - src/app/cart/_components/CartDialogs.tsx
  - src/app/cart/_components/CartProductSection.tsx
  - src/app/cart/cart-preview.ts
  - src/app/**/_components/*.tsx
  - AGENTS.md
  - .codex/skills/component-reusability/references/single-parent-consolidation.md
  - src/app/examples/styles/classnames/page.tsx
  - src/app/examples/styles/scss-module/page.tsx
  - src/app/examples/styles/scss-module/page.module.scss
  - src/app/publishing-guide/page.tsx
  - src/app/publishing-guide/_components/ButtonGuide.tsx
  - src/app/publishing-guide/_components/TypographyGuide.tsx
  - src/app/publishing-guide/_components/GuideCode.tsx
  - src/app/publishing-guide/_components/GuideCopyToast.tsx
  - src/app/publishing-guide/_components/GuideTimeline.tsx
  - src/app/publishing-guide/_components/FormGuide.tsx
  - src/app/support/inquiries/new/page.tsx
  - src/app/products/[id]/page.tsx
  - src/app/screen-index/storybookLinks.ts
  - src/stories/features/screen-index/IaStructurePage.stories.tsx
  - tests/screen-progress.test.mjs
  - scripts/screen-files.mjs
  - src/app/screen-index/screenConnections.ts
  - src/app/screen-index/_components/IaStructurePage.tsx
  - src/app/screen-index/sourceGraph.generated.json
  - tests/screen-files.test.mjs
  - src/app/support/terms/page.tsx
  - src/app/support/page.tsx
  - src/app/support/notices/page.tsx
  - src/app/support/notices/[id]/page.tsx
  - src/app/support/mileage/page.tsx
  - src/app/support/member-benefits/page.tsx
  - src/app/support/inquiries/page.tsx
  - src/app/support/faq/page.tsx
  - src/app/signup/verify/phone/page.tsx
  - src/app/signup/verify/page.tsx
  - src/app/signup/terms/page.tsx
  - src/app/signup/information/page.tsx
  - src/app/signup/complete/page.tsx
  - src/app/search/page.tsx
  - src/app/running/run-club/page.tsx
  - src/app/running/run-club/[sessionId]/page.tsx
  - src/app/products/page.tsx
  - src/app/mypage/wishlist/page.tsx
  - src/app/mypage/rewards/page.tsx
  - src/app/mypage/reviews/reviewFixtures.ts
  - src/app/mypage/returns/page.tsx
  - src/app/mypage/restock-alerts/page.tsx
  - src/app/mypage/referral/page.tsx
  - src/app/mypage/recent/page.tsx
  - src/app/mypage/profile/page.tsx
  - src/app/mypage/payment-methods/page.tsx
  - src/app/mypage/page.tsx
  - src/app/mypage/orders/page.tsx
  - src/app/mypage/member-activity/page.tsx
  - src/app/login/find-account/password-reset/page.tsx
  - src/app/login/find-account/id-confirmation-modal/page.tsx
  - src/app/login/account-locked/verification/page.tsx
  - src/app/login/account-locked/page.tsx
  - src/app/login/account-locked/complete/page.tsx
  - src/app/collection/[id]/page.tsx
  - src/app/mypage/addresses/page.tsx
  - src/components/common/molecules/ProductDetailImage.tsx
  - src/components/common/organisms/SystemStatusPage.tsx
  - src/components/common/layouts/AccountPageLayout.tsx
  - src/app/cart/cart-item.ts
  - src/app/checkout/checkout-coupons.ts
  - src/app/checkout/checkout-summary.ts
  - src/app/homeContent.ts
  - src/app/homeCarouselPreview.ts
  - src/app/support/faq/faq.data.ts
  - src/app/locales/locales.data.ts
  - src/app/support/notices/notices.data.ts
  - src/app/support/size-guide/size-guide.data.ts
  - src/app/support/store/store.data.ts
  - src/app/signup/information/registration.types.ts
  - src/app/mypage/reviews/reviews.types.ts
  - src/app/mypage/profile/mypage-profile.types.ts
  - src/app/mypage/mypage-home-data.ts
  - src/app/products/[id]/productDetailPresentation.ts
  - src/app/products/[id]/productInquiries.ts
  - src/app/products/[id]/productSizeOptions.ts
  - src/app/support/inquiries/new/inquiryOrders.data.ts
  - src/app/screen-index/storybookLinks.ts
  - src/app/screen-index/productListingIaRoute.ts
  - src/app/mypage/reviews/page.tsx
  - src/app/mypage/coupons/page.tsx
  - src/app/login/page.tsx
  - src/types/component-contracts/app-products-id-page.d.ts
  - .storybook/fonts.scss
  - .storybook/preview.ts
  - src/app/layout.tsx
  - src/styles/global.scss
  - src/app/products/[id]/_components/ProductDetailViewerContent.tsx
  - src/components/product/ProductDetailImage.tsx
  - next.config.ts
  - src/app/page.tsx
  - src/app/products/[id]/page.tsx
  - src/app/screen-index/screenConnections.ts
  - src/app/
  - eslint.config.js
  - .codex/skills/component-reusability/SKILL.md
  - .codex/skills/component-reusability/references/page-ownership.md
  - okf/architecture/storefront-design.md
  - tests/app-router.test.mjs
  - src/components/mypage/stories/MyPageRouteStory.tsx
  - src/components/find-account/IdConfirmationModal.tsx
  - src/app/login/find-account/page.tsx
  - src/app/cart/page.tsx
  - src/app/checkout/page.tsx
  - src/app/explore/[...slug]/page.tsx
  - src/shared/Mockup/explore/ExploreDetailPage.tsx
  - src/app/launch-calendar/page.tsx
  - src/shared/Mockup/launch-calendar/LaunchCalendarPage.tsx
  - src/app/support/store/page.tsx
  - src/app/running/reviews/page.tsx
  - src/app/running/rewards/page.tsx
  - src/app/running/rotation/page.tsx
  - src/app/running/alerts/page.tsx
  - src/app/running/plans/page.tsx
  - src/app/running/shoe-finder/page.tsx
  - src/app/store/experience/page.tsx
  - src/shared/Mockup/running-hub/RunningExperiencePage.tsx
  - src/app/explore/page.tsx
  - src/shared/Mockup/explore/ExploreHubPage.tsx
  - src/app/explore/shoe-finder/page.tsx
  - src/shared/Mockup/shoe-finder/ShoeFinderPage.tsx
  - src/app/mypage/running-profile/page.tsx
  - src/shared/Mockup/running-profile/RunningProfilePage.tsx
  - src/app/mypage/event-entries/page.tsx
  - src/app/support/after-sales/page.tsx
  - src/app/support/care/page.tsx
  - src/app/support/size-guide/page.tsx
  - src/app/support/inquiries/new/order-products/page.tsx
  - src/app/support/inquiries/new/page.tsx
  - src/app/support/inquiries/new/inquiryOrderSelection.storage.ts
  - src/app/support/support.navigation.ts
  - src/data/screenRegistry.ts
  - src/app/screen-index/_components/IaStructurePage.tsx
  - src/shared/Mockup/teamwear/TeamwearPage.tsx
  - src/app/signup/page.tsx
  - src/shared/Mockup/signup/SignupTermsStep.tsx
  - src/shared/Mockup/signup/SignupDetailsStep.tsx
  - src/shared/Mockup/signup/SignupCompleteStep.tsx
  - src/stories/features/Mockup/signup/SignupSteps.stories.tsx
  - src/app/locales/page.tsx
sources:
  - id: src-app-layout-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/layout.tsx
    title: 'src/app/layout.tsx'
  - id: src-shared-lib-device-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/lib/device.ts
    title: 'src/lib/device.ts'
  - id: src-app-products-id-page-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/app/products/[id]/page.tsx
    title: 'src/app/products/[id]/page.tsx'
  - id: src-shared-features-catalog-productlistingpage-tsx
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/features/catalog/ProductListingPage.tsx
    title: 'src/components/features/catalog/ProductListingPage.tsx'
  - id: tests-app-router-test-mjs
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/tests/app-router.test.mjs
    title: 'tests/app-router.test.mjs'
---

# 라우팅과 플랫폼

## 퍼블리싱 가이드 import 정렬 검토 (2026-10-30)

`src/app/publishing-guide/page.tsx`의 atoms/molecules import 그룹과 type binding 순서만 정리했다. 경로·metadata·page export·탭 내용·서버/클라이언트 경계에는 영향이 없다. 전체 `npm run lint`가 통과했다. [UI 기록](ui.md#퍼블리싱-가이드-import-정렬-2026-10-30)을 참고한다.

## 타이포 사용처 이름 변경 검토 (2026-10-30)

상품 상세·결제·회원정보·고객센터의 기존 16px H9 사용처를 H10으로 옮기고 퍼블리싱 가이드의 제목 예시를 H10까지 확장했다. 변경한 라우트의 경로·page exports·서버/클라이언트 경계·preview URL과 상태 소유권은 유지한다. 작업 트리 출처는 `src/app/products/[id]/_components/ProductDetailContent.tsx`, `src/app/checkout/_components/CheckoutPayment.tsx`, `CheckoutShipping.tsx`, `CheckoutSummary.tsx`, `src/app/mypage/profile/_components/ProfileContent.tsx`, `src/app/support/after-sales/_components/AfterSalesContent.tsx`, `src/app/support/inquiries/_components/InquiryListContent.tsx`, `src/app/support/store/_components/StoreContent.tsx`, `src/app/publishing-guide/_components/TypographyGuide.tsx`다. [표현 계약](ui.md#영문-폰트-연결과-타이포plp-필터-규격-2026-10-30)을 참고한다.

## 러닝세션 신청 취소 모달 직접 URL (2026-10-30)

`/mypage/event-entries/preview-cancel`은 기존 `RunClubEntriesContent`의 `preview="cancel"` 옵션으로 고정 목록과 열린 신청 취소 모달을 표시한다. 연결된 Provider와 무관하게 fixture를 사용하고 실제 조회·취소 요청은 실행하지 않는다. 확인·취소·닫기·Escape로 창을 닫을 수 있으며 새로고침하면 다시 열린다. 기본 목록과 기존 Empty URL은 유지한다.

검증: 브라우저에서 PC/MO 직접 진입과 열린 모달, Escape 닫기·새로고침 재노출·확인 후 기존 3건 상태 유지·취소 버튼 닫기를 확인했다. screen-index의 ‘신청 취소 모달’ STATE 행, URL/상태명 검색과 보기 링크 새 창 진입을 확인했다. 변경 파일 ESLint/Prettier·타입 검사·그래프 생성을 통과했다. 실제 취소 API·전체 production/Storybook build는 실행하지 않았다.

screen-index IA 200의 previewRoutes에 ‘신청 취소 모달’을 추가하고 sourceFiles에 진입점을 연결했다. 상태가 두 개가 되어 기본 목록은 원본 행의 페이지 링크, Empty와 취소 모달은 STATE 행으로 표시되는 기존 규칙을 사용한다. sourceGraph는 `npm run screen-files`로 생성한다. 출처: 위 preview 진입점과 `src/app/mypage/event-entries/_components/RunClubEntriesContent.tsx`, `src/app/screen-index/screenConnections.ts` 작업 트리. 작성: 2026-10-30 (Asia/Seoul).

## 상품리뷰 디자인의 직접 상태 URL (2026-10-30)

IA 191 상품리뷰의 STATE에 디자인 세 화면을 연결했다. `/mypage/reviews/preview-ready`는 작성 가능한 리뷰 목록, 기존 `/mypage/reviews/preview-empty`는 작성 가능 없음, `/mypage/reviews/preview-written`은 작성한 리뷰 목록이다. 새 route는 기존 `ReviewStatePreview`의 준비된 상태를 사용하고 클릭 순서·로그인·저장소에 의존하지 않는다. 기존 기본 route와 작성/수정/오류/작성 목록 없음 URL은 보존한다. `screenConnections.ts`의 previewRoutes/sourceFiles를 갱신하고 생성 그래프는 `npm run screen-files`로 반영한다. [표시 구조와 fixture 계약](ui.md#상품리뷰-디자인-목록과-state-2026-10-30)을 참고한다.

## 러닝세션 신청내역 시안 반영 (2026-10-30)

`/mypage/event-entries`와 기존 `/preview-empty`는 route-private `RunClubEntriesContent`를 공유한다. PC는 상단 breadcrumb와 190px 사이드바·98px 간격·844px 본문, 모바일은 사이드바를 숨긴 단일 본문이다. 사용자 확정에 따라 이 외곽 배치를 `MyPageFrame`으로 통합했고 마이페이지 메뉴도 최종 디자인으로 정리했다. `/mypage` 메인만 사이드바를 생략하며 breadcrumb 위치는 동일하다. GNB·footer는 유지한다. [최종 공통 프레임](ui.md#마이페이지-최종-공통-프레임-2026-10-30)을 참고한다. 목록은 제목/배지와 96px 정사각 이미지/장소/거리/신청일/진행일시를 분리하며 신청 가능한 항목에만 오른쪽 취소 링크를 표시한다. 정렬은 최신순/과거순, 건수는 오른쪽, 더보기는 PC 160px·모바일 전체 폭이다.

`eventEntries.data.ts`의 3개 항목·총 62건·1/10은 시안용 표시 fixture이며 실제 페이지 수를 계산한 값이 아니다. 이미지는 저장소의 런클럽 에셋을 재사용하므로 첨부 시안의 일부 사진과 다르다. 미연결 더보기는 비활성이며 취소 확인은 창만 닫는다. 실제 API는 추가하지 않았고 운영 목록·정렬·더보기·취소는 [기존 컨텍스트의 연결 계약](state.md#러닝세션-신청내역의-표시와-정렬-계약-2026-10-30)을 사용한다. 기존 미리보기의 취소 상태 변경 시뮬레이션을 제거했다.

검증: 기본 PC/MO와 Empty 직접 진입, 정렬 선택·탭 필터·취소 모달·Escape/포커스 복귀를 브라우저로 확인했다. 1024px 이하 mobile, 1025~1199px의 1200px canvas, 1200px 이상 document 가로 넘침 없음을 확인했다. 임시 Provider로 비fixture ID·late data·서버 결과 보존·취소 실패/재시도/pending/성공·추가 목록·조회 실패/재시도를 확인한 뒤 임시 소스를 제거했다. 최종 모바일 breadcrumb의 줄바꿈 방지와 날짜 body5 조정은 이 스크린샷 확인 이후 반영했다. 실제 서비스 API·전체 Storybook/production build는 검증하지 않았다.

출처: `src/app/mypage/event-entries/_components/RunClubEntriesContent.tsx`, `eventEntries.data.ts`, `src/context/RunClubDataContext.ts` 작업 트리와 사용자 첨부 디자인·기획서. 작성: Codex, 2026-10-30 (Asia/Seoul).

## 장바구니·로그인 확인 URL 분리 (2026-10-30)

기존 `/cart`와 `/login`은 서비스 흐름을 제거한 퍼블리싱 기본 화면이다. `/cart/preview-empty`는 빈 장바구니, `/login/preview-error`는 두 필드의 고정 오류를 직접 표시한다. 오류 화면은 기본 로그인과 `LoginContent` 마크업을 공유하고 입력 후에도 오류가 유지된다. 빈 장바구니는 기존 `CartEmptyState`와 공용 제목을 사용한다. IA 170·223의 `previewRoutes`를 화면 목록의 실제 페이지 링크 옆에 노출하며 검색에도 반영한다. 원본 IA 번호와 진행 상태는 변경하지 않는다.

장바구니 page는 고정 데이터와 레이아웃을 조합하고 선택·수량·모달 UI 상태는 기존 `_components`에 둔다. 로그인 전용 RoutePreview 주입과 사용되지 않는 타입 선언·스토리 어댑터는 제거했다. 서비스 API를 추가하지 않았다.

## 페이지 전용 컴포넌트 분리 재적용 (2026-10-30)

사용자 요청으로 어제의 페이지 배치 패턴을 다시 적용했다. 30개 라우트의 `page.tsx`에는 페이지 컴포넌트를 유지하고 보조 UI 41개 모듈은 같은 라우트의 `_components/`에 둔다. 기존 순수 데이터·계산 모듈과 이미 적합한 페이지는 유지한다. URL, 서버/클라이언트 경계, 상태 소유권과 RoutePreview 계약은 바꾸지 않는다. 새 폼 가이드를 보존하며 IA import 그래프를 재생성했다. [범위와 이번 검증](page-private-components-2026-10-30.md)을 참고한다.

## 스타일 비교 샘플 삭제 (2026-10-29)

③ 기존 Panda JSX props 방식 유지 결정에 따라 `/examples/styles/classnames`, `/examples/styles/scss-module`, `/examples/styles/jsx-props`의 page.tsx와 비교 전용 page.module.scss를 삭제했다. 생성 그래프에서도 삭제 경로를 제거한다. 아래 예시 추가·생성 기록은 과거 이력이며 현재 라우트가 아니다. 기존 운영 화면과 `/publishing-guide`는 유지한다. [결정과 역사 기록](style-examples.md#최종-결정-기존-방식-유지-및-샘플-삭제-2026-10-29).

## IA 반영·연동 설명 제거 (2026-10-29)

사용자 요청으로 `screenReviewNotes`의 시안 반영·현시안 반영·연동 대기 설명을 제거했다. 비고와 검색에서 함께 빠지며 IA 원본 비고, 날짜별 목록, 디자인/퍼블리싱 상태와 작업 파일은 유지한다. 작업 트리 출처: `src/app/screen-index/storybookLinks.ts`, `tests/screen-progress.test.mjs`.

## IA 생성 그래프 최신화 (2026-10-29)

`npm run screen-files`로 생성 그래프에 기존 JSX props 예시와 퍼블리싱 가이드 페이지·ButtonGuide의 실제 import 관계를 반영했다. 경로 등록·화면 완료 상태·바인딩 계약은 변경하지 않는다. 작업 트리 출처는 src/app/screen-index/sourceGraph.generated.json이며, 재생성 후 tests/screen-files.test.mjs의 생성기 테스트 1개를 통과했다.

## IA 비고의 날짜별 목록 표시 (2026-10-29)

`IaStructurePage.tsx`의 비고/이슈를 `ul`/`li`로 표시한다. 월/일과 괄호 안 6자리 날짜 앞에서 나누고, 날짜 없는 경로 안내는 별도 항목으로 보존한다. 원본·프로젝트 메모 병합으로 생긴 공백·문장 끝 마침표 차이의 중복은 표시에서 제거한다. 원본 데이터와 전체 메모 검색, 라우트·상태·두 행 표 구조에는 영향이 없다. 내용이 없으면 `-`를 유지한다.

작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx. 앱 브라우저 DOM에서 `eland_hmy_31`의 날짜별 3개와 경로 1개 항목, `eland_hmy_18`의 빈 비고 `-`를 확인했다. 타입 검사·변경 파일 ESLint/Prettier·Panda 생성을 통과했다. 스크린샷은 브라우저 최소화로 캡처하지 못했다.

## Figma 수급 확인과 퍼블리싱 수정 상태 (2026-10-29)

사용자 확인으로 아이핀 인증 IA 235(eland_hjo_03)의 PC/MO 퍼블리싱을 대기로 정정했다. `confirmedPublishingProgress`의 확인값이 기존 통합 완료 초기값보다 우선하며 디자인 미수급 상태는 유지한다. 작업 트리 출처: src/app/screen-index/storybookLinks.ts.

사용자 확인으로 자체 회원가입 완료 IA 238의 MO 디자인을 수급으로 갱신했다. PC·퍼블리싱 및 소셜 가입완료 상태는 유지한다. 작업 트리 출처: src/app/screen-index/storybookLinks.ts.

추가 사용자 확인으로 전체메뉴 IA 245는 PC/MO 디자인 수급, 검색 IA 246과 에러 IA 248/249/250은 PC/MO 퍼블리싱 완료를 반영했다. 데이터 갱신만으로 링크·표 구조·외부 override 우선순위는 유지한다. 작업 트리 출처: src/app/screen-index/storybookLinks.ts.

장바구니 IA 170의 MO 퍼블리싱을 사용자 직접 확인에 따라 완료로 갱신했다. `confirmedPublishingProgress`는 플랫폼별 확인값만 보관하고 외부 progressOverrides가 우선한다. 명시적 확인값에는 레거시 이관 툴팁을 표시하지 않는다. PC 퍼블리싱은 기존 값을 유지한다. 작업 트리 출처: src/app/screen-index/storybookLinks.ts, src/app/screen-index/_components/IaStructurePage.tsx.

사용자의 직접 상태 전달로 장바구니 IA 170과 주문 상세 IA 171의 PC 디자인을 수정예정으로 갱신했다. MO 디자인 수급과 PC/MO 퍼블리싱 상태는 유지한다. 작업 트리 출처: src/app/screen-index/storybookLinks.ts. [조사 후 사용자 갱신](ia-design-audit.md#퍼블리싱-비교와-제한)을 참고한다.

IA의 경로·클라이언트 경계는 유지한다. `storybookLinks.ts`의 실제 발견 프레임 목록과 화면 코드별 공통 템플릿이 디자인 수급 기본값을 제공하며 발견하지 못한 것은 미수급이다. 명시적 null override는 -를 유지한다. PC/MO별 퍼블리싱 `revision`(수정)을 추가했으며 기존 통합 초기값과 별개로 전달할 수 있다. 이번에는 Figma 캡처 실패 때문에 실제 퍼블리싱 상태를 재판정하지 않았다. [조사 출처·범위·한계](ia-design-audit.md).

작업 트리 출처: src/app/screen-index/storybookLinks.ts, src/app/screen-index/_components/IaStructurePage.tsx. 기존 디자인 기본값 null 설명은 이번 조사 기본값에 한해 미수급으로 대체한다.

스타일 비교에 `/examples/styles/jsx-props`를 추가했다. 기존 두 예시도 Flex·Grid를 유지하고 className으로 스타일을 연결하며, 세 페이지의 코드 영역은 기본 펼침 상태다. 작업 트리 출처: src/app/examples/styles/classnames/page.tsx, src/app/examples/styles/scss-module/page.tsx, src/app/examples/styles/scss-module/page.module.scss, src/app/examples/styles/jsx-props/page.tsx. [비교 방식](style-examples.md#panda-jsx-유지와-기존-방식-예시-추가-2026-10-29).

## 스타일 방식 비교 페이지 (2026-10-29)

`/examples/styles/classnames`와 `/examples/styles/scss-module`을 추가했다. 각 page.tsx가 정적 비교 화면을 직접 소유하며 공통 쇼핑 셸과 플랫폼 선택을 사용한다. 운영 경로를 변경하지 않고 두 예시 사이의 Next Link와 네이티브 details 코드 펼침을 제공한다. SCSS Module은 사용자가 요청한 예시 파일에 한정한 정책 예외다. 작업 트리 출처와 검증은 [스타일 비교 예시](style-examples.md)를 참고한다.

## 마이페이지 홈 프레임 재사용 (2026-10-28)

/mypage의 RouteContent는 MyPageFrame의 centered 레이아웃으로 main과 Home·마이페이지 breadcrumb를 구성한다. 페이지는 기존 본문과 로그아웃 상태·콜백, RoutePreview의 LogoutDialog 계약을 계속 소유한다. 하위 마이페이지는 기본 sidebar를 사용하고 URL·페이지 export·플랫폼 판별은 바꾸지 않았다. 작업 트리 출처: src/app/mypage/page.tsx, src/components/mypage/MyPageFrame.tsx. [프레임 API와 검증](ui.md#mypageframe-중앙-정렬-레이아웃-2026-10-28)을 참고한다.

## 부모 옵션을 통한 계정·고객센터 구성 (2026-10-28)

고객센터 4개 페이지의 PageActionButton을 CustomerCenterLayout.footerAction으로, 가입 약관·회원 정보·공용 휴대폰 인증의 AccountFormLayout을 AccountPageLayout으로 전환했다. 가입·회원정보의 Terms/PreferenceField 사용은 Checkbox(consent)/Radio(label)로 바꿨다. 페이지 URL·Next export·서버/클라이언트 지시문·상태·검증·라우팅 소유권은 유지한다. 작업 트리 출처는 src/app/support·src/app/signup·src/app/mypage/profile의 해당 페이지와 PhoneVerificationContent다. [공통 API](ui.md#공통-래퍼-4개를-부모-옵션으로-통합-2026-10-28)를 따른다.

## ModalDialog 직접 사용 (2026-10-28)

로그인·계정 찾기·회원가입·마이페이지·장바구니·런클럽·문의 라우트의 ConfirmDialog/SingleActionDialog 사용을 ModalDialog.actions로 전환했다. 기존 확인창의 sm 크기를 명시하고 콜백·취소 이동·폼 id와 submit 연결은 그대로 전달한다. 페이지 URL·기본 export·RoutePreview 계약·서버/클라이언트 지시문·상태 소유권은 유지한다. 공통 API와 검증 범위는 [모달 액션 옵션 통합](ui.md#modaldialog-액션-옵션-통합-2026-10-28)을 따른다. 작업 트리 출처: src/app의 해당 모달 소비처와 src/components/common/molecules/ModalDialog/ModalDialog.tsx.

## 1:1 문의 주문상품 조회 경로 (2026-10-26)

`/support/inquiries/new/order-products`는 문의 작성 중 별도 페이지로 이동해 주문 기간을 조회하고 주문 및 상품을 선택하는 경로다. 페이지 진입점은 `src/app/support/inquiries/new/order-products/page.tsx`이며 `InquiryOrderLookupPage`가 `CustomerCenterLayout`과 반응형 본문을 구성한다. 선택 중인 주문은 같은 탭의 `sessionStorage` 초안으로 전달하고, 취소 또는 선택 완료 후 문의 작성 경로로 돌아간다. App Router 경로 목록 테스트에 신규 URL을 포함한다. 주문 조회는 현재 화면 확인용 fixture다.

출처는 작업 트리의 `src/app/support/inquiries/new/order-products/page.tsx`, `src/components/features/support/InquiryOrderLookupPage.tsx`, `InquiryNewPage.tsx`, `inquiryOrderSelection.storage.ts`, `tests/app-router.test.mjs`와 Figma `1241:93422`, `1241:93577`이다.

## 팀/단체복 제외와 사이즈 가이드 준비 (2026-10-20)

/support/teamwear의 page.tsx를 제거해 운영 URL과 고객센터 메뉴에서 제외했다. 원본 화면은 src/shared/Mockup/teamwear/TeamwearPage.tsx에 보존하며 운영 경로를 추가하지 않았다. /support/size-guide는 SizeGuidePage를 내보내는 새 App Router 페이지다. 고객센터 공통 레이아웃·메뉴·breadcrumb·제목만 구성하고 본문은 null로 둔다. IA 215는 제거하고 신규 IA 260을 디자인 대기로 추가했으며 PC/MO Storybook 링크를 연결했다.

## 계정 찾기 결과의 기존 경로 연결 (2026-10-19)

첨부 로그인·계정 찾기 시안 반영 시 기존 `/login` → `/login/find-account` → `/login/find-account/password-reset` 경로를 검토했다. FindAccountPage의 예시 인증 결과 팝업에서 확인은 `/login`, 비밀번호 재설정은 `/login/find-account/password-reset`으로 이동한다. 새 App Router 파일이나 실제 인증 경계를 추가하지 않았다. PC 결과는 중앙 팝업, 모바일 결과는 기존 IdConfirmationModal의 fullscreen 표현을 사용한다. 작업 트리 출처: `src/components/features/find-account/FindAccountPage.tsx`, `src/components/features/find-account/IdConfirmationModal.tsx`.

## EXPLORE 상세 목업 진입점 (2026-10-19)

src/app/explore/[...slug]/page.tsx는 src/shared/Mockup/explore/ExploreDetailPage를 기본 export로 연결한다. 기존 /explore/[...slug] URL·use client 경계·slug별 화면 및 미등록 slug의 준비 중 화면을 유지한다.

## 런칭 캘린더 목업 진입점 (2026-10-19)

src/app/launch-calendar/page.tsx는 src/shared/Mockup/launch-calendar/LaunchCalendarPage.tsx를 기본 export로 연결한다. /launch-calendar URL과 use client 경계, 메뉴의 런칭 캘린더 링크, 페이지의 상품 상세 이동을 유지한다. 이전 features/launch-calendar 경로의 중간 재수출 파일은 두지 않는다. 작업 트리 출처는 frontmatter에 기록한다.

검증: Prettier 포맷을 정규화해 이동 전후 페이지 내용 보존과 이전 경로 참조 제거를 확인했다. 변경 파일 ESLint/Prettier·전체 타입 검사·Panda 생성·Next production build와 앱 라우트 검사 2개를 통과했다. 브라우저 화면 비교는 재실행하지 않았다.

## 매장 찾기 정식 화면 진입점 (2026-10-19)

src/app/support/store/page.tsx와 고객센터 Storybook은 src/components/features/store-finder/StoreFinderPage를 연결한다. /support/store URL과 use client 경계는 유지하며 페이지·데이터는 정식 organisms/StoreFinder/StoreResults를 참조한다.

디자인이 반영된 매장 찾기는 Mockup 분류에서 제외하고 정식 feature와 organism 위치로 복귀시켰다.

## running-hub 목업 라우트 연결 (2026-10-19)

/running/shoe-finder·rewards·reviews·alerts·rotation·plans 및 /store/experience의 페이지는 src/shared/Mockup/running-hub/RunningExperiencePage를 import한다. 기존 URL과 kind 값, use client 경계는 유지한다. 라우트별 내용은 바꾸지 않았다.

## EXPLORE 허브 목업 진입점 (2026-10-19)

src/app/explore/page.tsx는 src/shared/Mockup/explore/ExploreHubPage.tsx를 기본 export로 연결한다. /explore 주소와 use client 경계, 헤더·홈 등 진입 링크, 페이지 내부 SHOE FINDER·가이드·스토리·모델 링크를 유지한다. 이전 features/explore 경로의 중간 재수출 파일은 남기지 않는다. 작업 트리 출처는 frontmatter에 기록한다.

검증: 이동 전후 페이지 내용이 줄바꿈을 제외하고 일치하며 이전 경로 import가 남지 않았음을 확인했다. 변경 파일 ESLint/Prettier·전체 타입 검사·Panda 생성·Next production build와 앱 라우트 검사 2개를 통과했다. 브라우저 화면 비교는 재실행하지 않았다.

## 콘텐츠 이미지 렌더러 전환의 라우트 영향 (2026-10-29)

장바구니, 결제, 국가 선택, 문의 주문상품 조회 라우트의 이미지를 `next/image`로 전환했다. URL·페이지 export·서버/클라이언트 경계·페이지 상태와 이동 흐름은 변경하지 않았다. 이미지 출처와 표시 영역은 기존 값과 레이아웃을 따른다.

## SHOE FINDER 목업 진입점 (2026-10-19)

src/app/explore/shoe-finder/page.tsx는 src/shared/Mockup/shoe-finder/ShoeFinderPage.tsx를 기본 export로 연결한다. /explore/shoe-finder URL과 헤더·홈·EXPLORE 링크는 유지하며 추천 상품 링크의 activity·cushioning 쿼리 구성도 변경하지 않는다. 이전 features/explore 경로의 중간 재수출 파일은 남기지 않는다. 작업 트리 출처는 frontmatter에 기록한다.

검증: 변경 파일 ESLint/Prettier·전체 타입 검사·Panda 생성·Next production build와 기존 URL 목록의 앱 라우트 검사 2개를 통과했다. 이전 ShoeFinderPage import가 소스에 남지 않았음을 확인했다. 브라우저 화면 비교는 재실행하지 않았다.

## 러닝 프로필 목업 진입점 (2026-10-19)

`src/app/mypage/running-profile/page.tsx`는 `src/shared/Mockup/running-profile/RunningProfilePage.tsx`를 기본 export로 연결한다. 디자인 미확정 목업 구현을 공용 feature/component 영역에서 분리한 것이며 `/mypage/running-profile` URL, dynamic 설정, 마이페이지 메뉴 링크와 클라이언트 상태 경계는 유지한다. MyPageRouteStory도 같은 목업 구현을 직접 import한다. 작업 트리 출처는 frontmatter에 기록한다.

## 진입점과 책임

`/signup`은 가입 방법만 표시한다. 이메일 가입은 `/signup/verify`로 이동하고, 카카오·네이버 가입은 연결되지 않았다는 안내를 표시한다. 이전 카카오 약관 동의·정보 입력·가입 완료 화면은 운영 가입 흐름에서 분리해 `src/shared/Mockup/signup` 및 `Mockup/Signup` Storybook에 보존한다. 별도 앱 URL은 추가하지 않았다.

`src/app/layout.tsx`는 서버에서 `await headers()`로 User-Agent를 읽고 `detectPlatform`으로 플랫폼을 선택한다. 휴대폰과 태블릿은 `mobile`, 그 외는 `web`이다. 이 선택은 화면 너비만으로 결정되지 않는다. 선택한 플랫폼은 `<body>`의 `platform-*` 클래스로도 전달된다.

루트 레이아웃은 공통 `ShopShell`에 페이지를 전달한다. `Suspense`는 화면 로딩 대체 콘텐츠를 제공하고, PC 루트에는 `--layout-web-min-width`가 적용된다.

## 파일 기반 경로

| 파일 또는 경로군                                | URL                   |
| ----------------------------------------------- | --------------------- |
| `src/app/page.tsx`                              | `/`                   |
| `src/app/products/page.tsx`                     | `/products`           |
| `src/app/products/[id]/page.tsx`                | `/products/:id`       |
| `src/app/cart/page.tsx`, `checkout/page.tsx`    | `/cart`, `/checkout`  |
| `src/app/collection/[id]/page.tsx`              | `/collection/:id`     |
| `src/app/explore/[...slug]/page.tsx`            | EXPLORE 하위 경로     |
| `src/app/running/run-club/[sessionId]/page.tsx` | 런클럽 상세           |
| `src/app/login/**`, `signup/**`                 | 회원 관련 화면        |
| `src/app/mypage/**`                             | 마이페이지            |
| `src/app/support/**`                            | 고객지원              |
| `src/app/not-found.tsx`                         | 미등록 URL의 404 화면 |

현재 회귀 테스트는 기존 62개 URL과 `/checkout`을 검증한다. 경로를 의도적으로 추가·변경할 때는 실제 페이지와 테스트의 기대 경로를 함께 갱신한다.

## 탐색과 쿼리

내부 링크는 `next/link`의 `href`, 이벤트 탐색은 `next/navigation`의 `useRouter`를 사용한다. 동적 파라미터는 `useParams`, 쿼리는 읽기 전용 `useSearchParams`로 읽는다.

상품 필터는 현재 쿼리를 복사한 `URLSearchParams`를 수정한 뒤 `router.push(..., { scroll: false })`로 반영한다. 모바일 필터는 임시 선택 상태를 보관하고 적용 버튼을 눌렀을 때 URL에 반영한다. React Router나 전체 앱을 분기하는 라우트 테이블을 다시 도입하지 않는다.

`/login/account-locked`와 `/login/find-account/id-confirmation-modal` 같은 모달 화면은 닫기·확인 때 `router.push`로 로그인 흐름의 다음 화면으로 이동한다.

새 페이지에서 서버·클라이언트 경계를 판단하고, 설치된 `node_modules/next/dist/docs/`의 해당 API 문서를 먼저 읽는다. 새 서버 페이지에 클라이언트 콜백을 직접 넘기지 않는다.

[공통 상태](state.md), [UI 구성](ui.md), [변경 검증](../development/verification.md)을 참고한다.

## 러닝세션 신청내역 연결

마이페이지 MY HOKA의 러닝세션 신청내역은 `/mypage/event-entries`에서 `RunClubPage.tsx`를 직접 표시한다. 기존 `/running/run-club`도 같은 컴포넌트를 표시하며 세션 상세 주소는 `/running/run-club/:sessionId`를 유지한다. 기존 이벤트·대회 신청 임시 화면은 이 경로에서 사용하지 않는다.

## 배송 및 반품안내

`/support/after-sales` URL은 유지하면서 `ShippingReturnsPage`로 연결한다. 이전 A/S 처리현황 화면 대신 고객센터 배송 및 반품안내를 표시한다. 출처는 작업 트리의 `src/app/support/after-sales/page.tsx`와 `src/components/features/support/ShippingReturnsPage.tsx`다.

## 세탁 및 손질 방법 안내

`/support/care`는 `CareGuidePage`를 표시한다. 고객센터 정보 메뉴에서 접근하며, 안내 탭을 페이지 내부 상태로 전환한다. 출처는 작업 트리의 `src/app/support/care/page.tsx`와 `src/components/features/care-guide/CareGuidePage.tsx`다.

## 장바구니 옵션·선택 주문 연결 보완 (2026-10-19)

/cart는 ShopShell.updateOptions를 CartPage에 전달한다. 기존 /checkout?selected 옵션 키 전달을 유지하며, 결제 완료 콜백으로 전달된 항목만 제거하도록 /checkout 라우트를 연결했다. 결제 완료의 주문 내용 확인 링크는 기존 /mypage/orders로 이동한다. 새 URL은 추가하지 않았다. 출처는 작업 트리의 src/app/cart/page.tsx, src/app/checkout/page.tsx와 CheckoutPage.tsx다. Next production build와 브라우저의 선택 상품 주문 이동을 확인했다.

## Mockup 전용 라우트 제거 (2026-10-20)

미확정 Mockup 화면 제거에 따라 다음 앱 라우트 진입점을 삭제했다: `/explore`, `/explore/shoe-finder`, `/explore/[...slug]`, `/launch-calendar`, `/mypage/running-profile`, `/running/alerts`, `/running/plans`, `/running/reviews`, `/running/rewards`, `/running/rotation`, `/running/shoe-finder`, `/store/experience`. 해당 주소는 더 이상 이 화면을 제공하지 않는다. 정식 run-club·상품·고객센터·계정 페이지는 유지한다. MyPageRouteStory의 running-profile 구현 연결도 제거했다. 위쪽의 과거 라우트 목록·Mockup 이동 기록보다 이 변경 기록이 우선한다. Next production build 및 갱신된 앱 라우트 manifest 테스트 2개를 통과했다.

## 시안 기반 에러 진입점 (2026-10-20)

`/maintenance`는 점검 안내, `/service-unavailable`는 일시적인 접속 불가 안내를 표시한다. `src/app/error.tsx`도 동일한 SystemStatusPage의 unavailable 구성을 사용해 App Router 하위 경로의 예외를 안내한다. 루트 layout 자체의 예외를 잡는 global-error까지 추가하지 않았다. 기존 not-found와 상품 상세의 미등록 ID는 NotFoundPage를 통해 같은 에러 표현을 공유한다. 실제 유지보수 모드를 활성화하거나 점검 시간을 가정하지 않는다. 점검 일정은 호출자 데이터이며 현재 라우트는 추후 안내 문구다.

모바일 `/search`는 일반 헤더/푸터 없이 검색 전용 닫기/입력 프레임을 표시한다. 닫기는 `/products`로 이동하고 새 검색은 `/search?q=...`로 연결한다. PC 검색결과는 일반 헤더/푸터를 유지한다. [시안 반영 기록](storefront-design.md)을 참고한다.

## 모바일 공지 상세 연결 (2026-10-20)

모바일 `/support/notices`는 목록 항목에서 기존 `/support/notices/[id]` 경로로 이동한다. PC는 단일 펼침 목록을 유지한다. 목록/상세는 notices.data.ts를 공유하고 NoticeDetailPage가 useParams로 읽은 1부터 시작하는 id에 해당하는 제목·날짜·시연 본문을 표시한다. 기본 스토리와 유효하지 않은 id의 기존 시연 동작은 첫 공지로 대체한다. 새로운 앱 경로·백엔드 조회는 추가하지 않았다. [고객센터 시안 기록](support-design.md)을 참고한다.

## IA 구조도 독립 페이지 (2026-10-28)

`/screen-index`는 `src/app/screen-index/page.tsx`에서 IaStructurePage를 렌더링한다. 검색엔진 색인을 제외하며 AppLayout은 이 경로에서 쇼핑몰 헤더·푸터를 생략한다. 나머지 경로는 유지한다. 작업 트리 출처: `src/app/screen-index/page.tsx`, `src/components/common/layouts/AppLayout/AppLayout.tsx`.

## src 폴더 구조 승격 (2026-10-28)

shared 내부를 src로 승격했다. 공통 UI는 src/components/common, 기능별 UI는 src/components/features, ShopShell과 플랫폼 상태는 src/context에 둔다. icons·lib·styles·types는 src 바로 아래에서 관리한다. app·data·mocks·stories의 역할과 라우트는 유지한다. 별칭과 Storybook 스타일 참조, Panda 생성 경로, OKF 동기화 규칙을 새 경로에 맞췄다. 작업 트리 출처: tsconfig.json, package.json, scripts/okf-sync.mjs, src/context/ShopShell.tsx, src/components/, .storybook/preview.ts.

## 페이지 구현의 라우트 소유권 (2026-10-28)

단일 라우트 전용 화면은 `src/app/{route}/page.tsx`에 구현을 직접 둔다. 기존 feature 화면 파일의 단순 import·재수출과 장바구니·주문서·로그인·마이페이지·상품 상세의 상태 연결 래퍼를 합쳤다. 기존 URL과 동적·검색 파라미터, 내비게이션은 유지한다. 페이지는 framework-supported export와 기본 컴포넌트만 제공하며 스토리용 임의 props를 받지 않는다.

IA 구조도는 서버 metadata와 색인 제외 설정을 유지하고 클라이언트 구현만 `src/app/screen-index/_components/IaStructurePage.tsx`로 옮겼다. 여러 경로가 공유하는 RunClubPage·PhoneVerificationPage·SystemStatusPage, 재사용 모달과 상품 목록/검색이 공유하는 ProductListingPage는 feature에 유지한다. 이 기록은 위의 과거 feature 페이지 진입점 설명 중 이동된 구현 위치를 대체한다.

원격 `origin/pub-psh-1015`의 `25d1c8807c8417ff106dc51e5225eb8e030bebec` 변경은 구 shared 경로를 복원하지 않고 현재 components/common·components/features·context 경로에 반영했다. 주문/반품 경로는 유지한다. 작업 트리 출처: `src/app/`, `src/context/ShopShell.tsx`, component-reusability 스킬과 page-ownership 참조.

마이페이지 2Depth 라우트에도 같은 원칙을 적용한다. MyPageStatusPage의 kind 분기는 제거하고 각 페이지에 해당 화면과 설정을 배치했다. 회원정보·배송지·리뷰·쿠폰·리워드 전용 구현은 각 page.tsx에 두고, 멤버십 활동·환불계좌·결제수단·친구 추천의 제목과 본문 조합도 페이지가 직접 소유한다. 주문/반품과 관심상품/최근 본 상품/재입고 알림의 실제 공용 동작은 feature에 유지한다. 고객센터 회원등급·마일리지도 고정 kind 분기 대신 각 페이지가 레이아웃을 조합한다. Storybook의 경로 선택기는 src/stories로 이동했다.

검증 (2026-10-28): 이동한 37개 구현의 JSX가 공백 정규화 후 이전 구현과 일치함을 확인했다. 기존 자동 테스트 62개, 타입 검사, 변경 파일 ESLint, Panda 생성, Next production build와 Storybook build를 통과했다. 브라우저에서 장바구니 옵션·수량·선택·삭제와 선택 주문 완료/상품 제거, 로그인, 모바일 회원정보 수신 동의 저장·취소, PC 주문 날짜/검색 필터와 배송조회 모달, 모바일 배송조회 시트를 확인했다. Storybook의 WEB/Mobile 주문 완료·로그인, 모바일 옵션 저장과 회원정보 취소 시나리오는 실제 페이지 연결 후 기대 상태를 확인했다. 모든 라우트·모든 스토리의 전수 브라우저 검증은 하지 않았다.

## 3Depth 인증·안내 화면의 페이지 직접 구성 (2026-10-28)

`/signup/verify/phone`과 `/login/account-locked/verification`은 각 page.tsx에서 공용 PhoneVerificationContent를 직접 구성한다. 가입 페이지는 기존 가입 안내 모달을 열고 확인 후 /signup으로 이동한다. 잠금 해제 페이지는 인증 조건 충족 후 /login/account-locked/complete로 이동한다. 전체 화면을 연결하던 PhoneVerificationPage는 삭제했다.

`/login/find-account/id-confirmation-modal`도 page.tsx에서 ConfirmDialog와 공유 안내 본문을 직접 조합한다. 닫기·비밀번호 재설정·확인의 기존 이동과 PC 팝업/모바일 전체 화면을 유지한다. 계정 찾기 화면 내부에서 쓰는 IdConfirmationModal은 재사용하되 본문은 IdConfirmationMessage를 공유한다. 다른 3Depth 이상 전용 화면은 이미 page.tsx에 구현되어 있음을 확인했다.

작업 트리 출처: `src/app/signup/verify/phone/page.tsx`, `src/app/login/account-locked/verification/page.tsx`, `src/app/login/find-account/id-confirmation-modal/page.tsx`, `src/components/features/phone-verification/usePhoneVerification.ts`, `src/components/features/find-account/IdConfirmationMessage.tsx`.

3Depth 변경 검증 (2026-10-28): 타입 검사·변경 파일 ESLint/Prettier·Panda 생성·Next production build·Storybook build, 계정 복구 및 라우트 테스트 6개를 통과했다. 실제 페이지의 필수 약관 피드백·가입 인증 안내·모바일 잠금 해제 완료 이동, 아이디 확인의 PC 확인/닫기와 모바일 비밀번호 재설정 이동을 브라우저에서 확인했다. 추가한 WEB/Mobile 인증 완료 스토리는 가입 안내와 잠금 해제 코드 입력 후 기대 화면 상태를 확인했다. 스킬 validator·OKF 검사와 삭제된 화면 import 제거도 확인했다. 전체 기존 스토리 play 함수의 전수 실행은 하지 않았다.

## 런클럽 단일 부모 하단 바 통합 (2026-10-28)

Desktop/Mobile 전수조사와 사용자 지정 단일 부모 범위에 따라 RunClubMobileActionBar를 기존 런클럽 상세 page.tsx의 로컬 RunClubFixedActionBar로 이동했다. 공개 페이지 export와 세션 조회·상태·신청 모달·기존 URL을 유지한다. 작업 트리 출처: `src/app/running/run-club/[sessionId]/page.tsx`. [전수조사 보고서](platform-component-audit-2026-10-28.md)를 참고한다.

플랫폼 파일 통합 검증 (2026-10-28): 타입·ESLint/Prettier·Panda·Next/Storybook 빌드와 기존 테스트 62개를 통과했다. 브라우저에서 PC 정렬·즉시 필터와 모바일 초안·닫기·적용·검색어 유지 및 이동된 메뉴·푸터·갤러리·런클럽의 주요 동작을 확인했다. [전수조사 보고서](platform-component-audit-2026-10-28.md#검증)에 실제 확인 항목과 범위를 기록했다.

## 단일 부모 통합과 도메인 폴더 승격 (2026-10-28)

깊이에 관계없이 단일 라우트 구성과 하위 단일 부모 TSX를 실제 page.tsx의 최상위 로컬 함수로 통합했다. 페이지는 Next 지원 export와 기존 route props만 제공한다. IA private client와 서버 사이즈 가이드의 client 패널은 최소 경계로 유지한다. 실제 페이지의 로컬 Storybook 구성은 선택적 RoutePreview 컨텍스트로만 입력을 주입하며 기본 운영 렌더는 기존 상태 소유자를 사용한다. [단일 부모 통합 기록](single-parent-consolidation-2026-10-28.md) 참고.

검증: 폴더 승격 후 타입·Panda·Next/Storybook 빌드와 기존 테스트 62개를 통과했다. 이동 함수 409개·초기화 표현식 211개의 구조 비교, PC·모바일 주요 동작 및 스토리 확인 범위는 [통합 검증 기록](single-parent-consolidation-2026-10-28.md#검증)에 명시했다.

## Import 자동 정렬 (2026-10-28)

src/app의 import만 새 그룹 순서로 정렬했다. 라우트의 URL·기본 export·서버/클라이언트 지시문과 metadata 계약은 유지한다. 부수 효과 스타일 import는 위치·상대 순서를 보존하며 그 앞뒤의 바인딩 import가 경계를 넘지 않는다.

## 공용 훅·컨텍스트 import 순서 적용 (2026-10-28)

`src/app`의 공용 훅·컨텍스트 import를 외부 패키지 다음으로 옮겼다. 라우트 경로·페이지 본문·서버/클라이언트 경계·User-Agent 기반 플랫폼 판별은 유지한다. 화면 너비 판별로 전환하지 않았다.

## 얇은 헤더·필드 래퍼 직접 사용 (2026-10-28)

계정 찾기·비밀번호 재설정·로그인·가입·가입 정보·본인인증·마이페이지·결제·문의 페이지의 제목 및 입력 컴포넌트를 ContentHeader·TextFormField 직접 사용으로 바꿨다. 이 라우트 소스와 로컬 RegistrationField의 동적 컴포넌트 선택 제거를 검토했으며 URL·Next 지원 export·metadata·서버/클라이언트 지시문·플랫폼 판별·상태와 라우팅 동작에는 변경이 없다. 작업 트리 출처는 `src/app/`의 해당 페이지이고 삭제 전 소스는 `6f76f7334c7eb4ae0279d4340226998aeb4aebf6`이다. Next 빌드와 기존 라우트 테스트가 통과했으며 7개 화면의 PC/MO 제목·입력 속성 비교 및 계정 찾기·비밀번호 재설정 흐름은 [UI 검증](ui.md#얇은-래퍼-직접-사용-전환-2026-10-28)에 기록했다.

## IA 환경별 연결 (2026-10-28)

/screen-index의 IaStructurePage는 previewEnvironment 기본값 app에서 같은 서버의 실제 URL을 새 탭으로 연다. Storybook 진입점은 storybook 값을 명시적으로 전달한다. 포트·호스트 검사 없이 두 환경을 분리한다. screenConnections의 연결 정보는 기존 내부 IA 키로 관리하며 검색결과 247은 /search, 상품 목록은 기존 IA 필터 쿼리, 상품 상세는 실제 목 상품 /products/shoe-1을 사용한다. 러닝세션 상세는 실제 yeouido-night를 사용한다.

독립 경로가 없는 팝업·레이어·상세 상태는 부모 URL을 정확한 화면처럼 제공하지 않고 독립 경로 없음으로 표시한다. 삭제·제외 화면은 모든 링크를 제거한다. 파일·라우트·스토리 존재는 완료 상태를 바꾸지 않는다. 기존 상태 매핑은 내부 번호를 유지해 보존한다. 이 절은 이전의 모든 미리보기를 실제 페이지로 통일한 설명을 대체한다.

작업 트리 출처: 위 연결 파일과 IA 구현. [UI 계약](ui.md#ia-환경별-연결과-작업-파일-2026-10-28)을 참고한다.

## IA 목록 액션 보완 (2026-10-28)

IA 목록의 원본 IA/출처 열을 화면에서 제거했다. 원본 데이터·내부 번호와 검색은 유지한다. 실제 페이지와 Storybook 링크는 버튼만 표시하고 클릭 시 목적지의 상대 경로(쿼리 포함)를 클립보드에 복사하면서 새 창으로 연다. 링크의 기본 target 동작을 유지해 복사 완료를 기다리는 동안 사용자 활성화가 소실되지 않으며, 복사 불가·실패 시에도 창 열기를 막지 않고 상태 메시지를 표시한다. Storybook 링크도 이전 _top 이동 대신 새 창 열기로 바뀐다.

상단 엑셀 다운로드는 현재 영역·검색·상태 필터에 해당하는 화면을 .xlsx로 내보낸다. 계층 접기는 내보낼 데이터를 줄이지 않는다. 계층 5열·구분·코드·WBS·상태·작업자·실제 경로·작업 파일·WEB/Mobile 스토리 경로·비고를 포함하며 제거한 원본 번호/출처 열은 추가하지 않는다. 삭제 화면의 링크는 기존 정책대로 빈 값이다. 데이터가 없으면 다운로드 버튼을 비활성화한다. 작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx.

## IA 엑셀 기능 제거 (2026-10-28)

사용자 요청으로 IA의 엑셀 다운로드 버튼·생성 핸들러·로딩 상태를 제거했다. 위 내보내기 계약은 더 이상 적용하지 않는다. 원본 출처 열 제거, 실제 페이지·Storybook 링크의 경로 복사와 새 창 열기, 복사 상태 안내·검색·필터는 유지한다. 작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx.

## IA WBS 계획표 갱신 (2026-10-28)

사용자가 대화에 붙여 넣은 퍼블리싱 WBS 표의 앞쪽 계획 시작·종료일과 작업자를 IA에 반영했다. 메인 10/2~5, 로그인 10/6~7, 회원가입 10/8~12, 마이페이지·고객센터 10/15~21, 카테고리·상품 목록·상세 10/7~14, 장바구니·검색 10/22~23, 주문서 10/26~27, 런칭 캘린더 10/28, 기획전 10/29, 이벤트 10/30, About HOKA 11/6~10을 사용한다. 전체메뉴 9/30과 레이아웃 9/21~23은 유지한다.

상품 목록·상세는 조맑은·박서현 공동 작업, 카테고리 상위는 조맑은으로 구분하고, 검색·검색결과는 박서현으로 배정한다. SUPPORT는 고객센터, Company는 About HOKA 일정에 연결한다. 레이아웃 일정은 매핑에 보존하되 존재하지 않는 IA 화면을 추가하지 않는다. 뒤쪽 실적 날짜·수치로 완료 상태를 추론하지 않고 기존 화면 상태와 링크·복사 동작을 유지한다. 작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx. 계획·담당자 매핑 26건과 미배정 EXPLORE를 Node 단언으로 확인했다.

## 화면 폭 기반 플랫폼으로 전환 (2026-10-28)

루트 layout은 서버 문서와 Suspense/ShopShell만 구성하며 UA headers 판별과 src/lib/device.ts를 제거했다. 서버/최초 hydration은 web, 이후 1024px 이하 mobile·초과 web으로 전환한다. URL·metadata와 서버/클라이언트 경계는 유지한다. [현재 계약과 검증](responsive-platform-2026-10-28.md)을 참고한다. 작업 트리 출처: src/app/layout.tsx, src/context/platform.tsx, src/context/ShopShell.tsx.

## Next 이미지 경로와 로딩 (2026-10-28)

홈과 상품 상세 이미지가 next/image를 통해 /_next/image로 제공된다. next.config.ts의 remotePatterns는 HTTPS dms.deckers.com/hoka/image/upload/**로 제한한다. 외부 이미지 원본의 쿼리는 유지한다. 페이지 URL·라우팅·플랫폼 판별 정책은 변경하지 않았다. 홈 첫 슬라이드는 eager/high, 상품 상세 첫 이미지는 eager, 나머지 상세 이미지는 lazy로 요청한다. 출처는 src/app/page.tsx, src/app/products/[id]/page.tsx와 next.config.ts의 작업 트리다.

## 폰트·주문서 URL·갤러리 경계 (2026-10-28)

RootLayout은 next/font/local의 CSS 변수만 HTML 루트에 부여하며 기존 경로와 플랫폼 상태는 유지한다. 주문서의 빈 구독 및 window.location.search 스냅샷을 useSearchParams().get('selected')로 대체했다. 누락 값은 전체 장바구니, 빈 값은 빈 선택으로 구분하고 선택 상품·결제 상태·완료 시 제거 정책은 페이지에 둔다. 정적 빌드의 Suspense는 기존 RootLayout 경계를 사용한다. 브라우저에서 selected 변경 후 즉시 빈 주문서가 표시되고 뒤로 가기로 선택 상품이 복원되는 것을 확인했다. 상품 상세의 확대 갤러리는 route-private 동적 import 경계이며 URL·장바구니·선택 옵션은 부모가 유지한다. 페이지별 운영 메타데이터와 외부 스크립트 연동은 이번 작업에 포함하지 않았다. 작성: codex/gpt-6, 2026-10-28T09:57:37.856Z.

## 버튼 모듈 평탄화의 라우트 영향 검토 (2026-10-28)

운영 페이지의 Button import를 src/components/common/atoms/Button.tsx로 바꾸고 기존 IconButton 호출은 variant="icon"으로 전환했다. 라우트·URL·쿼리·페이지 상태·서버/클라이언트 경계는 변경하지 않았다. 상품 상세의 공유 버튼 타입은 ButtonIconProps에서 children·variant를 제외한 계약으로 유지한다. 변경 검증은 UI 문서의 Button 아이콘 모드 통합 기록을 참고한다.

작성: codex/gpt-6, 2026-10-28T10:35:32.416Z. 출처는 위 working_tree_sources의 이번 작업 트리 변경이며 기존 source_revision의 검증 기록과 구분한다.

## 더보기·소셜 버튼의 부모 표시 옵션 통합 (2026-10-28)

로그인·가입의 SocialAuthButton은 Button.social로, 쿠폰·리뷰의 LoadMoreButton은 Button.loadMore로 전환했다. URL·라우트 소유권·서버/클라이언트 경계·화면 상태와 이벤트 처리 책임은 바뀌지 않는다. 카카오·네이버 미연결 안내, 가입 수단 선택과 쿠폰·리뷰 더보기의 기존 상태 갱신을 유지한다. 공통 표시 API는 [UI 계약](ui.md#더보기소셜-버튼의-부모-표시-옵션-통합-2026-10-28)을 참고한다.

작성: codex/gpt-6, 2026-10-28T10:45:56.487Z. 위 working_tree_sources의 이번 변경을 출처로 기록하며 검증 결과는 후속 기록에 남긴다.

## 도메인 레이아웃 import 변경 (2026-10-28)

로그인·회원가입 라우트는 components/account/AccountPageLayout, 고객센터 라우트는 components/support/CustomerCenterLayout, 장바구니·결제 라우트는 components/orders/OrderPageLayout을 직접 참조한다. 파일 위치와 제목 조합 책임을 정리했으며 경로 URL, 라우트 소유권, 페이지 상태와 서버/클라이언트 지시문은 유지한다. 작업 트리 출처: src/app/login/, src/app/signup/, src/app/support/, src/app/cart/page.tsx, src/app/checkout/page.tsx. 상세는 [도메인 레이아웃 소유권](ui.md#도메인-레이아웃-소유권과-고객센터-제목-조합-2026-10-28)을 참고한다.

## 공통 레이아웃 import 경로 이동 (2026-10-28)

MainSection·OrderActionBar·ModalDialog를 사용하는 라우트의 import를 common/layouts 경로로 변경했다. 경로 URL·페이지 export·상태·폼 연결·서버/클라이언트 경계는 변경하지 않았다. 작업 트리 출처는 해당 src/app 소비처와 src/components/common/layouts/{MainSection,OrderActionBar,ModalDialog}.tsx다. 분류와 스토리 변경은 [UI 기록](ui.md#공통-레이아웃-3개-계층-이동-2026-10-28)을 따른다.

## 보조 TS 모듈의 사용처별 배치 (2026-10-28)

장바구니·주문서·홈·로케일·가입 정보·마이페이지·상품 상세·고객센터·IA 화면의 보조 TS 파일을 실제 라우트와 같은 폴더로 옮겼다. 공지 데이터와 문의 주문 선택 모듈은 공통 상위 라우트가 소유한다. 일반 TS 파일은 page/route 파일을 추가하지 않으므로 URL을 생성하지 않는다. IA와 카탈로그 스토리가 공유하는 IA 경로 변환기는 app/screen-index에서 관리한다. [이동 목록과 검증](ts-module-ownership-2026-10-28.md).

작성: codex/gpt-6, 2026-10-28T10:52:23.370Z. 이번 작업 트리 출처는 위 working_tree_sources이며 고정 source_revision의 과거 이력과 구분한다.

## AccountPageLayout 공통 경로 사용 (2026-10-28)

로그인·가입 라우트가 AccountPageLayout을 @/components/common/layouts/AccountPageLayout에서 가져오도록 변경했다. URL·페이지 export·폼·상태·서버/클라이언트 경계는 유지한다. 작업 트리 출처는 해당 src/app 소비처와 src/components/common/layouts/AccountPageLayout.tsx다. [UI 소유권 기록](ui.md#accountpagelayout-공통-레이아웃-경로-복귀-2026-10-28)을 따른다.

## 공통 시스템 상태 화면 연결 (2026-10-28)

error·maintenance·service-unavailable 라우트가 common/organisms/SystemStatusPage를 사용한다. 404 라우트와 상품·런클럽의 데이터 없음 분기는 NotFoundPage 중계 없이 status="not-found"를 전달한다. URL·문구·상태·클라이언트 경계는 유지하며 IA의 소스 경로를 갱신했다. 작업 트리 출처는 src/app/not-found.tsx·src/app/error.tsx·관련 페이지·screenConnections.ts와 src/components/common/organisms/SystemStatusPage.tsx다. [UI 기록](ui.md#systemstatuspage-공통-organisms-이동과-래퍼-제거-2026-10-28)을 따른다.

## 상품 상세 이미지 공통 경로 (2026-10-28)

상품 상세 페이지와 확대 뷰어의 ProductDetailImage import를 common/molecules로 변경했다. 라우트·클라이언트 경계·이미지 렌더링과 뷰어 동작은 변경하지 않았다. 작업 트리 출처는 src/app/products/[id]/page.tsx·_components/ProductDetailViewerContent.tsx와 src/components/common/molecules/ProductDetailImage.tsx다. [UI 기록](ui.md#productdetailimage-공통-molecule-이동-2026-10-28)을 따른다.

## 런클럽 상세 배지 직접 사용 (2026-10-28)

app/running/run-club/[sessionId]/page.tsx는 RunClubBadge 대신 common/atoms/Badge에 runClubCategory={session.category}를 전달한다. 기존 URL·페이지 소유권·클라이언트 경계·신청 상태·처리 흐름은 유지한다. 작업 트리 출처: src/app/running/run-club/[sessionId]/page.tsx. 기록 시점: 2026-10-28T11:14:23.062Z. 상세 API와 검증은 [런클럽 분류 배지 통합](ui.md#런클럽-분류-배지-통합-2026-10-28)을 참고한다.

IA 구조도의 screenConnections.ts에서 삭제된 RunClubBadge 경로 3곳도 Badge.tsx로 갱신했다.

## 화면 바인딩 계약 보완 (2026-10-29)

기존 URL과 페이지 default export는 유지했다. 서비스 데이터는 일반 Context 모듈과 공용 목록 props를 통해 연결한다. 결제·로그인·배송지·주문 변경은 비동기 성공 이후에만 완료 처리하며 실패 시 현재 화면을 유지한다. 상품 상세·장바구니·결제는 외부 셸의 상품 목록을 사용한다. [연결 계약과 적용 범위](data-binding.md).

작성: codex/gpt-6, 2026-10-29T00:06:17Z. 출처는 위 working_tree_sources의 현재 작업 트리이며 API 연동 완료를 의미하지 않는다.

## 남은 화면 데이터 연결과 인계 주석 (2026-10-29)

기존 라우트/디자인을 유지하며 가입·계정복구·프로필·문의·콘텐츠·쿠폰·상품내역·홈·런클럽·마이페이지 요약·결제수단 등록의 연결 지점을 보완했다. page default export의 임의 props 대신 Client Provider를 사용하며 루트의 AccountFlowProvider가 가입/복구 단계 메모리를 유지한다. support/terms 탭은 URL을 직접 읽어 뒤로/앞으로 이동도 반영한다. 공지 상세는 실제 ID로 조회하고 없는 ID를 첫 공지로 대체하지 않는다.

전체 소스 인계 주석은 라우트 진입점에 적용 Context·요청 결과 처리와 미연동 이벤트를 설명한다. 매장 지도/환불계좌 경로는 수정하지 않았고 새 API 경로도 만들지 않았다. 구체 계약은 [화면 바인딩](data-binding.md#나머지-화면의-연결과-상세-주석-2026-10-29)을 따른다.

작성: codex/gpt-6, 2026-10-29T01:12:53Z. 이번 작업 트리의 출처는 working_tree_sources에 추가했으며 기존 고정 커밋 출처/검증 이력을 보존했다.

## IA 개발 연결 파일 자동 탐색 (2026-10-29)

/screen-index의 경로와 서버/클라이언트 경계는 유지한다. 클라이언트 IA 화면은 파일 시스템을 직접 읽지 않고 scripts/screen-files.mjs가 생성한 sourceGraph.generated.json을 사용한다. IA별 등록된 진입 파일에서 import를 추적해 페이지와 바인딩 주석이 있는 도메인·컨텍스트 연결 파일을 표시하며 공통 UI와 범용 훅은 제외한다. ShopShell은 화면의 전역 연결 소유자로 표시하고 그 내부 전역 UI 데이터로 탐색을 확장하지 않는다. IA 매핑 없는 신규 라우트의 의미는 자동 추론하지 않는다. 앱 페이지·Storybook 미리보기 연결과 완료 상태는 유지한다.

작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx, src/app/screen-index/screenConnections.ts, src/app/screen-index/sourceGraph.generated.json, scripts/screen-files.mjs. 생성된 목록은 개발 연결 지점 안내이며 수정 이력이나 서비스 구현 증명이 아니다. 상세 범위는 [UI 문서](ui.md#ia-작업-파일-자동-갱신과-개발-연결-범위-2026-10-29)를 참고한다.

작업 파일의 화면 표기에서는 공통 src/ 접두사만 생략한다. 접힌 추가 파일에도 동일하게 적용하고 title에는 전체 경로를 남긴다. 원본 sourceFiles·생성 그래프와 전체 경로 검색은 유지한다. 작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx.

IA 목록은 화면명 rowSpan=2와 작업 파일 colSpan=6의 두 행으로 표시한다. 작업 파일은 더보기 없이 전부 표시하고 미등록은 -로 표기한다. 경로·서버/클라이언트 경계·링크 및 자동 탐색 계약은 유지한다. 작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx. [두 행 구성](ui.md#ia-두-행-구성과-작업-파일-전체-표시-2026-10-29)을 참고한다.

작업 파일은 파일별 4px 모서리·테두리·패딩이 있는 배지로 구분한다. 일반 파일은 연회색 바탕, 파일명이 정확히 page.ts/tsx/js/jsx인 진입 파일은 보라색 바탕·테두리·강조 글자로 표시한다. 기존 code 의미·전체 경로 title·src/ 생략과 전체 파일 줄바꿈 표시를 유지한다. 공통 Badge의 계약이나 스타일은 변경하지 않고 이 개발용 경로 표시에 로컬 Panda cva를 사용한다. 작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx. 브라우저에서 상품 상세 진입 파일과 일반 파일의 배경·테두리·글자색 차이를 확인했다.

## IA 상태 표시의 플랫폼 분리 (2026-10-29)

/screen-index와 Storybook은 IaStructurePage의 progressOverrides를 통해 내부 IA 번호별 PC·MO 디자인 수급과 퍼블리싱 값을 독립적으로 표시한다. 디자인 기본값은 null(-), 퍼블리싱 기본값은 기존 통합 상태의 초기 이관값이다. 신규 저장 API·라우트·서비스 호출은 추가하지 않고 현재 props를 직접 읽는다. 표는 10열, 화면명 rowSpan=2와 파일 colSpan=9로 바뀌며 경로·클라이언트 경계·링크와 작업 파일 탐색은 유지한다. 출처는 src/app/screen-index/_components/IaStructurePage.tsx와 storybookLinks.ts의 작업 트리이며 상세 계약·표시 범위는 [플랫폼별 상태](ui.md#ia-플랫폼별-디자인퍼블리싱-상태-2026-10-29)를 참고한다.

IA 헤더와 본문을 사용자 지정 7열·두 행으로 정렬했다. 메뉴/구분 rowSpan=2, 윗줄 화면코드/실제페이지/PC·MO 디자인/비고, 아랫줄 WBS colSpan=2/PC·MO 퍼블리싱/작업파일이다. 화면·대분류 일정을 보존하며 라우트·플랫폼 상태 소유권과 미리보기 링크는 유지한다. 작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx. [두 줄 정렬](ui.md#ia-헤더본문의-두-줄-정렬-2026-10-29)을 참고한다.

사용자 요청으로 IA 구조도 제목 아래의 FO.html 기준·디자인 수급/퍼블리싱 안내 설명(description prop)을 제거했다. 제목·breadcrumb·현황·NAV·상태와 두 줄 표는 유지한다. 작업 트리 출처: src/app/screen-index/_components/IaStructurePage.tsx.

## 퍼블리싱 가이드 기본 버튼 (2026-10-29)

`/publishing-guide`는 기존 SupportTabs의 guide 변형으로 상단 컴포넌트 분류 탭(버튼·폼·모달·뱃지)을 전환한다. 버튼 탭은 크기 기준·속성 안내를 첫 섹션으로 두고, Primary 예시 옆에서 시작하는 오른쪽 세로 바로가기 목록과 예시 영역의 2열 레이아웃을 사용한다. 크기 안내에는 Tall/Short 치수, CTA1/CTA2 및 Link 폰트 크기, density·size·auto 우선순위와 auto 플랫폼 기본값, FilterTrigger·HeaderSearch·아이콘 전용 버튼 예외, 라벨 Typography 연동과 Black/White colorway를 정리한다. 바로가기는 압축된 간격으로 크기 기준·Primary·Secondary와 추가 유형 전부를 실제 variant명으로 표시하고 각 설명은 한국어로 작성한다. 데스크톱 타임라인은 고정 사이트 헤더 높이와 24px 간격 아래에서 sticky로 유지하고, 모바일에서는 예시 아래에 정적 배치한다. Primary·Secondary 및 추가 버튼 유형의 각 샘플은 기본·비활성화 미리보기와 상태별 사용 코드·복사 버튼을 함께 제공한다. 상태 라벨은 한 줄로 유지하고 코드와 복사 액션은 코드 칸 안에서 나란히 배치해 좁은 화면에서도 코드가 잘리지 않게 한다. 코드 복사는 공용 `faCopy` 아이콘을 32px `variant="icon"` 버튼으로 표시하고 각 버튼에 한국어 접근성 이름과 툴팁을 제공한다. Link 유형도 비활성화 상태를 포함하도록 Button의 link variant로 표시한다. 기본 화면은 흰색 배경과 기존 black/white 색상 체계를 사용하며 테마 선택 UI는 두지 않는다. 섹션 앵커는 사이트 헤더 높이와 여유 공간을 scroll margin으로 확보해 제목이 가려지지 않게 한다. 예시는 Brand·Link·Plain·Chip·Icon·Filter Trigger·Header Search와 Social·Load More 옵션을 포함한다. Form 탭은 실제 공통 FormField·TextInput·TextFormField·Select·Dropdown·Checkbox·Radio·SegmentedControl·SearchField·AddressFields·EmailAddressFields·FormActionGroup·NumberStepper·CharacterCount·VerificationCountdown의 미리보기와 사용 코드를 제공한다. 제어형 검색·선택·주소·이메일 예시는 페이지 내부 상태로 동작하며 서버 제출이나 주소 검색 API를 호출하지 않는다. 각 예제는 Button·Typography 가이드와 동일한 JSX 구문 색상 렌더러·복사 아이콘·상단 알림을 사용하며, PC에서는 오른쪽 sticky 타임라인을, 모바일에서는 한 열 카드와 바로가기를 사용한다. 모달·뱃지 탭은 예시 준비 중 안내를 표시한다. 페이지 하단 `#top` 링크는 메인 영역으로 이동한다. 라우트·metadata·정적 페이지 헤더와 하단은 `page.tsx` Server Component가 소유하고, 상태와 상호작용은 `FormGuide`·`ButtonGuide`·`TypographyGuide` Client Component가 소유한다. 공통 운영 폼 API는 수정하지 않았다. 출처는 위 `working_tree_sources`의 publishing-guide 파일이다.

## 첨부 디자인·소스 대조 (2026-10-29)

회원가입·로그인·고객센터·마이페이지·장바구니·주문의 첨부 이미지를 소스와 대조했다. `storybookLinks.ts`의 `screenReviewNotes`와 플랫폼별 확인 상태를 IA 표시·검색에 연결한다. 외부 override가 확인값보다 우선하며, 변경하지 않은 기존 퍼블리싱 상태를 새 검수 완료로 간주하지 않는다. 주문 PC 디자인 수정예정, 장바구니 MO 완료 등 사용자 직접 확인을 유지한다. [상세 근거와 제한](design-source-comparison-2026-10-29.md)을 참고한다.

## 첨부 시안의 라우트 구현 반영 (2026-10-29)

주문·장바구니 PC 배치, 신청내역 전용 라우트 본문과 계정 잠금 이동·홈 링크를 반영했다. 기존 라우트와 App Router 소유권은 유지하며 전용 신청내역을 page.tsx에 직접 구성했다. [구현 범위·출처·검증](design-implementation-2026-10-29.md).

현시안 UI를 적용한 IA의 퍼블리싱 확인값을 완료로 갱신하고 기존 미적용 비고를 반영 내용으로 대체했다. 서비스 연결 대기는 비고로 구분하며 주문/장바구니 PC 디자인 수정예정과 미수급·아이핀 대기는 유지한다. 출처: `src/app/screen-index/storybookLinks.ts`, `tests/screen-progress.test.mjs`.

페이지의 `SupportTabs`에 Typography와 Button 가이드를 각 탭의 콘텐츠로 직접 연결하며 Typography 탭을 왼쪽에 둔다. Typography 탭은 `TypographyVariant`에 정의된 영문·한글 헤딩/본문, CTA, 텍스트 링크를 미리 보여주고 variant별 JSX 코드를 복사한다. 두 가이드는 카드에서 이름·속성 표기, 미리보기, 구문 강조 코드와 복사 버튼을 같은 순서로 표시한다. 공통 `renderGuideCode`가 JSX 태그·속성·문자열·구두점에 각각 Button 가이드와 같은 색상을 적용한다. 복사 결과는 공통 `GuideCopyToast`로 사이트 헤더 아래에 2초간 표시하며 상태 메시지는 접근 가능한 live region으로 제공한다. 각 예시 variant 옆에 실제 정의에서 계산한 글자 크기·행간(Line Height)·굵기(Weight)를 표시하며, PC·모바일 값이 같은 속성은 중복하지 않는다. 미리보기 영역은 스크롤 컨테이너로 제한하지 않고 큰 글자도 줄바꿈되어 잘리지 않게 한다. 별칭 `body`를 호출하던 홈 소개문·ContentLayout·MainContentCard·ProductCard는 `bodyKr3` 웹·`bodyKr4` 모바일 조합으로 옮겼고, 상품명은 기존 웹 가변 크기를 보존하는 화면 전용 Panda 스타일을 사용한다. `body` variant와 전용 CSS 토큰은 제거했다. 미사용 전용 variant인 `pageTitle`·`loginTitle`·`authTitle`·`authCaption`·`authBody`·`authSmall`도 호출부를 표준 variant로 옮기고 정의·가이드·스토리에서 제거한다. 로그인 제목은 `headingKr6` 웹·`headingKr5` 모바일 조합을 사용해 기존 36px/22px 크기를 유지한다. Typography 타이틀과 설명은 가로로 정렬하며, variant 그룹·예시 카드는 버튼 가이드와 같은 surface·border 중심의 시각 체계를 사용하고 카드·코드 배경은 semantic `surface.default`·`surface.subtle` 토큰을 적용한다. 두 가이드는 오른쪽 sticky 타임라인으로 섹션을 탐색하며 공통 `GuideTimeline`을 사용한다. 화면 폭과 자동 플랫폼 선택에 따라 미리보기에 PC·모바일 반응형 차이가 반영된다. 새 Typography variant나 공용 타이포그래피 스타일은 만들지 않는다.

버튼 예시는 상태 카드 상단에 상태명과 복사 버튼을 나란히 배치하고, 아래에 버튼 미리보기와 구문 색상이 적용된 코드를 표시한다. Typography와 Button 코드 복사 동작은 같은 공용 `faCopy` 아이콘 버튼과 상단 알림을 사용한다.

후속 Button 정리에서 `ghost` variant와 텍스트 ghost 예시는 제거했다. 아이콘 전용 액션은 `variant="icon"`, ShopShell 메가 메뉴 텍스트는 `plain`을 사용한다.

Panda 생성·Prettier·diff·OKF 검사를 통과했다. 전체 타입 검사는 기존 생성 라우트 및 DesignGuideTypography 오류로 실패했고, ESLint는 `eslint-plugin-perfectionist` 미설치로 시작하지 못했다. 브라우저 검증은 수행하지 않았다.

Button 가이드의 각 variant 미리보기는 상태·크기에 관계없이 카드 중앙에 정렬한다. Primary·Secondary의 Tall/Short와 모든 보조 variant 샘플에도 높이·글자 크기·좌우 패딩을 `높이 ... · 글자 ... · 좌우 ...` 형식으로 표시한다. FilterTrigger 코드 예시는 미리보기와 동일한 Typography variant를 사용한다.

FilterTrigger compact와 regular의 높이는 모두 40px이다. Compact는 글자 14px·좌우 패딩 14px을, regular는 글자 16px·좌우 패딩 24px을 사용한다.

보조 variant 순서는 Brand·Link·Plain·Chip·Icon·Filter Trigger·Header Search·Social·Load More다. 공통 Icon 예시를 전용 Filter Trigger보다 먼저 배치한다.

## 첨부 디자인 재검수 (2026-10-29)

위 구현 뒤의 재검수에서 남은 PC/MO 배치·컨트롤·공통 메뉴 차이를 확인해 `storybookLinks.ts`의 플랫폼별 확인값과 검토 비고를 정정했다. 본문과 공통 메뉴에 차이가 있으면 수정, 구현된 FAQ·문의·문서·배송지 변경·쿠폰 조회는 완료, 아이핀·온라인 회원등급 미구현은 대기다. 디자인 수급과 PC 디자인 수정예정, 외부 override 우선순위는 보존한다. 경로·화면 연결과 생성 그래프에는 변경이 없다. 최초 완료 판정의 범위와 한계는 [재검수 기록](design-reaudit-2026-10-29.md)이 대체한다.

## 퍼블리싱 고정 상태 URL (2026-10-30)

고정 상태 preview URL 61개와 기존 상태 URL의 직접 연결을 추가했다. 전체 목록·재사용 기준·미확정 IA는 [상태 preview 인계](publishing-state-previews-2026-10-30.md)에 기록했다. 내부 IA 200에 신청내역을 연결하고 198의 삭제 상태는 유지한다. 158은 최종 GNB 전환 주석을 확인해 기존 연결을 보존했다. 화면 목록은 기본 route가 없어도 previewRoutes 링크를 표시한다.

## 문의 혼합 목록 preview (2026-10-30)

대기와 완료를 분리하던 두 상태 route를 제거하고 `/support/inquiries/preview-list`로 통합했다. IA 187·210 모두 단일 목록 링크와 새 진입 소스를 연결한다. 기본 문의 Empty 경로는 유지한다. 배열 표시 계약과 현재 URL 수는 [상태 preview 인계](publishing-state-previews-2026-10-30.md#문의-목록-통합-2026-10-30)에 기록했다.

## Empty와 화면 목록 링크 정리 (2026-10-30)

쿠폰 `/mypage/coupons/preview-empty`와 공지 `/support/notices/preview-empty`를 IA 196·208에 연결했다. 공지의 기본/preview 진입점은 route-private `NoticesContent`를 공유하며 기본 context 계약을 유지한다. IA 234·237·255의 중복 보조 링크와 직접 소스 연결은 전용 IA 257·255·256으로 정리했다. 기획전 상세 IA 167은 사용자 판단상 목업·디자인 미수급으로 `/collection/8386` 연결을 제외했고 실제 route는 보존했다. `npm run screen-files`로 그래프를 갱신했다. [확정 내용과 출처](publishing-state-previews-2026-10-30.md#empty-문구와-ia-연결-정리-2026-10-30)를 참조한다.

## 상품문의 Empty 전체 상세 preview (2026-10-30)

`/products/preview-empty-inquiries`는 문의 부품 단독 표시 대신 기존 상품 상세의 `RouteContent`와 shoe-1 fixture를 재사용한다. screen-index의 ‘상품문의 없음’은 `#product-inquiries`로 PC 본문·모바일 열린 아코디언에 이동한다. fragment 이동은 고정 preview에 한정하며 기본 상품 ID 조회와 `/products/shoe-1` 연결은 유지한다. 상태 수·라우트 수는 바뀌지 않는다. [책임과 출처](publishing-state-previews-2026-10-30.md#상품문의-empty의-전체-상세-맥락-복원-2026-10-30).

## 문의 본문·답변 글자 크기 (2026-10-30)

사용자가 기존 작업 트리 변경의 커밋을 요청하여 `src/app/support/inquiries/_components/InquiryListContent.tsx`의 질문 본문과 답변 Typography variant를 `body4`에서 `body3`으로 조정한 변경을 반영했다. route·데이터·대기/완료 상태·접기/펼치기는 그대로이며 기본 문의 목록과 혼합 목록 preview가 같은 표현을 사용한다. 변경 파일 ESLint와 Prettier 검사를 통과했다. 브라우저 시각 검증은 이번 커밋 작업에서 수행하지 않았다. 출처는 사용자 커밋 요청과 해당 파일의 두 Typography 변경이다.

## IA 상품 공통 화면 요약 (2026-10-30)

`/screen-index`는 `eland_hca_01` 86개와 `eland_hca_02` 71개를 상품 목록·상세 두 항목으로 요약한다. 원본 266개 IA와 번호·연결 함수는 유지한다. 상단 NAV의 MEN/WOMEN/SHOES를 상품 공통 화면 157P로 합치고 공통 분류의 검색결과 1개도 이 영역으로 이동한다. 나머지 NAV는 이동한 화면을 제외한 수를 표시하며 14개 영역이다. 상품 탭의 분류 선택으로 MEN 60개, WOMEN 60개, SHOES 36개, 공통 1개를 좁힌다. 일반 화면의 위치·경로는 유지한다.

원본 화면에 검색·상태·분류 조건을 먼저 적용한 뒤 요약하고 결과의 첫 화면을 대표 링크로 사용한다. 상품 목록 URL과 Storybook listing:ia-N 인수는 기존 연결 함수를 사용한다. 최종 UI에서는 두 공통 항목의 대표 화면 링크만 노출하고, 두 항목 뒤의 버튼 하나로 중복 제거한 분류 트리를 확인한다. 중간 분류마다 한 행을 사용하고 세부 메뉴는 셀 하나에 쉼표로 나열한다. 연결 메뉴는 초기 접힘, 검색 시 펼침, 전체 접기·펼치기와 연동한다. IA 번호는 검색·식별에 유지하되 사용자 피드백에 따라 대표 링크와 연결 표에 노출하지 않는다. 표의 공통 상태·파일과 상세 병합 규칙은 [UI 기록](ui.md#ia-상품-공통-화면과-연결-표-2026-10-30)을 참고한다. 출처: `src/app/screen-index/_components/IaStructurePage.tsx`, `src/stories/features/screen-index/IaStructurePage.stories.tsx`.

## IA 주문·취소반품 링크 정리 (2026-10-30)

사용자 화면 주석에 따라 주문배송 조회 목록(IA 178)과 취소/반품 내역 목록(IA 180)의 취소 상세·반품 상세 preview 링크를 제거했다. 두 목록의 페이지·빈 목록은 유지한다. IA 178의 주문 상세 링크도 후속 요청으로 제거했다. 취소/반품 상세(IA 181)는 기존 취소 상세 route를 유지하고 `ScreenConnection.routeLabel`을 취소 상세로 지정해 일반 페이지 문구를 대신 표시한다. 반품 상세 링크는 유지한다. 생략한 routeLabel은 페이지로 표시하며 Storybook WEB/Mobile 링크 계약과 작업 파일 등록은 변경하지 않는다. 출처는 `src/app/screen-index/screenConnections.ts`와 `src/app/screen-index/_components/IaStructurePage.tsx`다. 이번 수정은 타입 검사·변경 파일 ESLint/Prettier와 기존 preview 링크 검증으로 확인하며 브라우저 재검증은 수행하지 않았다.

배송지 목록(IA 203)의 등록·수정·입력 오류 preview 링크도 사용자 주석에 따라 제거했다. 페이지·빈 목록은 유지하고 등록(IA 204)·수정(IA 205) 행의 페이지와 입력 오류 연결은 유지한다. 작업 파일 등록과 실제 preview 라우트는 삭제하지 않는다.

회원정보 확인 및 수정 상세(IA 201)에서도 수정·입력 오류 preview 링크를 제거했다. 아래 수정 행(IA 202)의 페이지(`/mypage/profile/preview-edit`)·입력 오류 링크를 유지하며 상세 행의 인증번호 입력·인증 만료·비밀번호 변경 완료는 그대로 둔다. sourceFiles·실제 라우트·Storybook 연결은 변경하지 않는다. 변경 파일 ESLint/Prettier와 기존 preview 링크 테스트로 확인하며 브라우저 재검증은 수행하지 않았다.

추가 요청으로 주문배송 조회 목록(IA 178)의 주문 상세 preview 링크도 제거했다. 목록은 페이지·빈 목록만 표시하고 아래 상세 행(IA 179)의 기존 상세 연결을 유지한다. 작업 파일 등록과 실제 상세 라우트는 유지한다. 변경 파일 lint/format 및 기존 preview 링크 테스트로 확인하며 브라우저 재검증은 수행하지 않았다.

쿠폰 목록(IA 196)의 쿠폰 상세 preview 링크도 사용자 요청으로 제거했다. 아래 상세 행(IA 197)의 `/mypage/coupons/preview-detail` 연결과 목록의 페이지·빈 목록·등록 오류·등록 완료 링크는 유지한다. 작업 파일 등록과 실제 상세 라우트는 유지한다. 변경 파일 lint/format 및 기존 preview 링크 테스트로 확인하며 브라우저 재검증은 수행하지 않았다.

## IA 상태 미리보기 하위 행 (2026-10-30)

실제 페이지 환경의 모든 previewRoutes는 개수와 종류에 관계없이 STATE 하위 행으로 표시한다. 부모 화면에는 기본 페이지 링크만 남긴다. 상품 공통 목록·상세도 같은 규칙을 사용한다. 이전의 3개 이상 기준과 isEmpty 플래그는 제거했다. 상태 행은 IA 원본 화면으로 추가하지 않아 전체 화면 수와 상태 데이터·검색 소유권은 유지한다. Storybook 환경은 기존 WEB/Mobile 연결을 유지하며 실제 페이지 경로를 Storybook 호스트에 노출하지 않는다.

1:1 문의 목록 IA 187/210은 대기·완료 항목이 있는 `/support/inquiries/preview-list`를 기본 route로 바꾸고 `/support/inquiries`를 없음 상태로 연결했다. 두 화면의 없음 연결도 공통 규칙에 따라 STATE 하위 행에 표시한다. 실제 문의 페이지·context·fixture·서버 연결과 작업 파일 등록은 변경하지 않았다. 출처는 `src/app/screen-index/screenConnections.ts`, `src/app/screen-index/_components/IaStructurePage.tsx`다.

STATE 행의 링크 텍스트는 사용자 요청으로 보기로 통일했다. 상태명은 첫 열과 aria-label의 상태명 보기로 유지하고 경로·새 창 열기·복사·rowSpan은 변경하지 않는다. 변경 파일 ESLint/Prettier로 확인했으며 이번 문구 변경은 브라우저에서 재검증하지 않았다. 출처: `src/app/screen-index/_components/IaStructurePage.tsx`.

STATE 행의 구분 상태·화면 코드 -·PC/MO 상태 - 셀도 같은 화면의 상태 행 수만큼 각각 rowSpan으로 병합했다. 기존 비고 병합과 7열 정렬을 유지하며 첫 열의 상태명·보기 링크는 행별로 표시한다. 단일 상태는 rowSpan=1이고 병합은 다른 화면·부모의 두 행을 포함하지 않는다. 변경 파일 ESLint/Prettier로 확인하며 이번 병합은 브라우저에서 재검증하지 않았다. 출처: `src/app/screen-index/_components/IaStructurePage.tsx`.

런클럽 상세 IA 259의 기본 페이지 링크 `/running/run-club/yeouido-night`를 첫 STATE 신청 가능으로 이동했다. 모집 마감·신청 예정과 함께 세 상태를 하위 행에 표시하며 부모 상세의 상태 나열 비고는 screenRegistry에서 제거했다. 기본 route 없이 상태 링크만 있는 부모는 실제 페이지 셀에 -를 표시하고 독립 경로 없음으로 오해시키지 않는다. 보기 링크·비고 및 상태 셀 rowSpan·접기와 Storybook WEB/Mobile 연결, 실제 런클럽 페이지·데이터는 유지한다. 출처: `src/app/screen-index/screenConnections.ts`, `src/data/screenRegistry.ts`, `src/app/screen-index/_components/IaStructurePage.tsx`. 변경 파일 lint/format과 기존 preview 링크 테스트로 확인하며 브라우저 재검증은 수행하지 않았다.

런클럽 목록 IA 258의 기존 페이지 링크 `/running/run-club`도 STATE 목록 있음으로 이동했다. 데이터가 있는 목록은 목록 있음, 빈 화면은 빈 목록으로 짝지어 두 하위 행에서 보기 링크를 제공한다. 부모 목록의 실제 페이지 셀은 -이며 상태·비고 rowSpan·접기·경로·작업 파일·Storybook 연결과 실제 목록 구현은 유지한다. 변경 파일 ESLint/Prettier 및 기존 preview 링크 테스트로 확인하며 브라우저 재검증은 수행하지 않았다. 출처: `src/app/screen-index/screenConnections.ts`.

런클럽 목록 IA 258의 빈 상태 레이블은 후속 요청에 따라 빈 목록에서 없음으로 변경했다. STATE 목록 있음·STATE 없음의 두 하위 행과 기존 보기 링크·URL·rowSpan은 유지한다. 출처: `src/app/screen-index/screenConnections.ts`. 문구 변경은 변경 파일 lint/format으로 확인했다.

## 단일 빈 STATE와 기본 화면 짝 표시 (2026-10-30)

사용자 정정에 따라 런클럽 목록의 빈 목록 레이블을 복원했다. 요청의 의미는 빈 상태명 변경이 아니라, 빈 STATE만 한 행 있는 화면의 기본 페이지도 대응하는 STATE로 내려 두 상태를 구분하는 것이다. 기존 단일 빈 미리보기 연결 17곳에 `ScreenConnection.defaultStateLabel`을 명시했다. 목록 있음·검색 결과 있음·주문 내역 있음·조건 결과 있음·상품문의 있음처럼 표시 맥락에 맞게 직접 지정하며 런타임에 URL·레이블 문자열로 빈 상태를 추론하지 않는다.

실제 페이지 환경에서 defaultStateLabel과 기본 route가 있고 previewRoutes가 정확히 하나면 그 route를 첫 STATE로 표시하고 부모의 기본 페이지 링크를 숨긴다. canonical route 자체와 기존 빈 상태명·href·검색·Storybook 연결은 유지한다. 여러 상태가 이미 있거나 단일 상태가 오류 등 비어 있지 않은 경우는 기존 구성을 유지한다. 상품 공통 항목에도 같은 표시 규칙을 적용한다. 런클럽은 이미 명시한 목록 있음/빈 목록 상태 두 행을 유지한다. 상태명·보기 링크는 행별, 구분·코드·진행 상태·비고는 같은 화면 내 rowSpan을 유지한다.

검증: 앱에서 주문배송 조회의 부모 링크 0개와 목록 있음/빈 목록 두 STATE, 상품 목록 부모 링크 0개와 필터 URL을 유지한 조건 결과 있음/없음 두 STATE를 확인했다. 첫 상태 행의 병합은 [1,2,2,1,2,2,2]이고 두 번째 행은 상태명·보기 두 셀만 남는다. 비밀번호 재설정은 기본 링크 1개와 입력 오류/변경 완료 두 상태가 유지됨을 확인했다. 런클럽 목록 있음·빈 목록과 상세 신청 가능·모집 마감·신청 예정도 확인했다. 타입·변경 파일 ESLint/Prettier 및 기존 preview 링크 테스트 3개를 통과했다. 출처: `src/app/screen-index/screenConnections.ts`, `src/app/screen-index/_components/IaStructurePage.tsx`.

## 러닝 세션 명칭과 IA 연결 정정 (2026-10-30)

러닝 세션 목록·상세·Empty의 현재 URL은 `/running/running-session` 아래이며 관련 RunClub 심볼·폴더를 RunningSession으로 변경했다. `/mypage/event-entries`는 유지한다. GNB Featured > Running Session과 IA 155가 목록을 연결한다. IA 158은 원본 Partnerships > UTMB의 메뉴만 유지하며 페이지·스토리·파일 연결 없이 디자인 미수급·퍼블리싱 대기다. IA 258·259는 기존 상태 확인 행으로 유지한다. 이전 run-club URL의 redirect는 추가하지 않는다. 앞선 IA 158 러닝 세션 연결 설명은 이 결정으로 대체하며 원본 계보·과거 검증 기록은 보존한다. 현재 출처는 src/data/megaMenu.ts, src/data/screenRegistry.ts, src/app/screen-index/screenConnections.ts 및 running-session 구현·Context다.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.

## Featured 하위 러닝 세션 계층 정정 (2026-10-30)

사용자 후속 확인에 따라 독립 D2 Running Session 묶음을 제거했다. IA 155·258·259는 모두 EXPLORE > Featured > Running Session에 속하며 기존 목록·상세 번호와 상태 링크는 유지한다. 목록·상세 상태 행은 D4에 배치하고 페이지 연결은 D3 Running Session에서 제공한다. tests/preview-links.test.mjs는 세 IA의 D1~D3 일치와 독립 D2 부재를 검사한다. 출처: src/data/screenRegistry.ts, tests/preview-links.test.mjs.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.

## 매장 찾기 정보 목록 정리 (2026-10-30)

`/support/store`는 지역 탭·길 찾기·지도와 열림 상태를 제거하고 서울·경기 순서의 단일 예시 목록을 표시한다. 매장명·주소·전화번호·제공된 영업시간만 유지하며 데이터는 최종 미확정 fixture다. 인천 탭으로 Empty를 확인한다는 종전 안내는 폐기하고 별도 Empty URL은 만들지 않는다. 기존 매장 IA와 경로를 유지한다. 출처: src/app/support/store/page.tsx, _components/StoreContent.tsx, store.data.ts 및 관련 표시 타입. 최종 디자인 승인은 별도다.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.

## 상품 목록 품절 표시 예시 (2026-10-30)

`/products/preview-sold-out`은 정상·품절이 섞인 고정 목록을 표시한다. ProductCard.soldOut은 기본 false인 표시 옵션이며 Product.listingSoldOut을 목록 소유자가 전달한다. 사이즈 재고나 ID에서 판정하지 않는다. 검정 50% dim과 중앙 흰색 Sold Out은 변경 가능한 예시 디자인이다. 상품명·가격·상세 링크와 기본 카드 사용처는 유지한다. 상품 목록 원본 IA의 공통 preview 링크와 진입 파일을 등록한다. 상세 전체 품절·리뷰 Empty·요청 오류 preview는 추가하지 않는다. 출처: src/components/common/molecules/ProductCard/ProductCard.tsx, src/components/catalog/ProductListingPage.tsx, src/mocks/products.ts, src/app/products/preview-sold-out 및 screenConnections.ts. 최종 디자인 승인은 추후 별도다.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.

## 러닝 세션 하위 행 표시 순서 보완 (2026-10-30)

사용자 브라우저 확인에 따라 목록(258)·상세(259)의 원본 배열 순서도 D3 Featured > Running Session(155) 바로 뒤로 이동했다. 계층 값뿐 아니라 실제 렌더 순서를 맞추며 독립 D2와 D3 앞쪽의 하위 행을 남기지 않는다. UTMB 비고의 러닝 세션 연결 설명 문장은 삭제했다. preview 링크 테스트는 155 바로 다음 행이 258·259인지 함께 검사한다. 출처: src/data/screenRegistry.ts와 tests/preview-links.test.mjs.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.

## 환불계좌와 기획전 목업 제거 (2026-10-30)

환불계좌 기능이 없다는 사용자 확인에 따라 /mypage/refund-account와 Storybook 경로 등록·import 및 문의의 환불계좌 등록 안내를 삭제했다. 원 결제수단 환불 계약은 유지한다. 기획·디자인 미수급인 /collection/[id] 목업과 제목 매핑을 삭제하고 전용 진입 예시·라우트 검사 기대값을 정리했다. IA 167은 삭제하지 않고 디자인 미수급·대기·연결 없음으로 유지한다. 상품 목록 collection 필터는 보존한다. 상품 상세 리뷰 영역은 외부 리뷰 API 연결 대기이며 별도 Empty를 만들지 않는다. 신규 접근·요청 오류 화면은 범위 제외다. 최종 PC/MO 시각 승인은 후속 작업이다. 출처: 삭제한 두 page.tsx, MyPageRoutePreview.tsx, MyPageRouteStory.tsx, InquiryCautions.tsx, tests/app-router.test.mjs와 screenRegistry.ts. UTMB 비고에서 러닝 세션 연결 설명 문장도 사용자 요청대로 제거했다.

출처: 사용자 확정 결정과 현재 작업 트리. 생성 시점은 frontmatter를 따른다.
