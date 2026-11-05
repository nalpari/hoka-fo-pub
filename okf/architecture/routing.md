---
type: Architecture
title: '라우팅과 플랫폼'
description: 'App Router 경로, 페이지 경계와 PC·모바일 선택을 설명한다.'
tags: [nextjs, routing, platform]
status: draft
updated: '2026-11-05T01:11:42.851Z'
generated:
  by: codex/gpt-6
  at: '2026-11-03T06:11:12Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/app/screen-index/page.tsx
  - src/app/screen-index/screenChangeHistory.ts
  - src/app/screen-index/screenChangeHistory.generated.json
  - src/app/screen-index/sourceGraph.generated.json
  - src/app/support/inquiries/new/_components/InquiryFormContent.tsx
  - src/app/checkout/_components/CheckoutPayment.tsx
  - src/app/publishing-guide/_components/FormGuide.tsx
  - src/app/mypage/event-entries/_components/RunningSessionEntriesContent.tsx
  - src/app/screen-index/screenDevelopers.ts
  - src/app/wh/file-summary/route.ts
  - src/app/wh/_components/FileSummary.tsx
  - src/app/wh/loading.tsx
  - src/app/wh/_components/WorkHistoryLoading.tsx
  - src/app/wh/page.tsx
  - src/app/wh/_components/WorkHistory.tsx
  - src/app/checkout/_components/CheckoutDiscountSummary.tsx
  - src/app/screen-index/screenProgress.ts
  - src/components/common/molecules/OrderProductSummary.tsx
  - src/components/common/organisms/OrderRecommendations.tsx
  - src/components/mypage/MyPageProductHistory.tsx
  - src/app/mypage/reviews/_components/MyPageReviewsContent.tsx
  - src/app/support/inquiries/new/order-products/_components/InquiryOrderLookup.tsx
  - src/app/publishing-guide/_components/ColorGuide.tsx
  - src/app/publishing-guide/_components/IconGuide.tsx
  - src/app/mypage/orders/_components/OrderClaimRequest.tsx
  - src/app/mypage/orders/_components/OrdersPage.tsx
  - src/app/mypage/orders/_components/OrdersContent.tsx
  - src/components/mypage/MyPageFrame.tsx
  - src/app/publishing-guide/page.tsx
  - src/app/publishing-guide/_components/ProductCardGuide.tsx
  - src/components/orders/OrderHistoryProduct.tsx
  - src/app/mypage/orders/_components/OrdersList.tsx
  - src/components/common/molecules/ProductCard/ProductCard.tsx
  - src/components/common/molecules/ProductOptionList.tsx
  - src/types/component-contracts/components-common-molecules-ProductCard-ProductCard.d.ts
  - src/app/launch-calendar/in-stock/page.tsx
  - src/app/launch-calendar/upcoming/page.tsx
  - src/app/launch-calendar/clifton-11-gtx/page.tsx
  - src/app/launch-calendar/_components/LaunchCalendarContent.tsx
  - src/app/launch-calendar/_components/LaunchCalendarDetail.tsx
  - src/app/launch-calendar/launchCalendar.data.ts
  - src/stories/features/launch-calendar/LaunchCalendar.Web.stories.tsx
  - src/stories/features/launch-calendar/LaunchCalendar.Mobile.stories.tsx
  - src/app/mypage/orders/_components/OrderDetails.tsx
  - src/app/mypage/orders/_components/OrdersProducts.tsx
  - src/app/mypage/orders/_components/OrdersStatus.tsx
  - src/app/mypage/orders/_components/OrdersList.tsx
  - src/stories/features/orders/OrdersStatus.stories.tsx
  - src/components/common/molecules/SupportTabs.tsx
  - src/components/common/molecules/HelpTips.tsx
  - src/app/checkout/_components/CheckoutForm.tsx
  - src/app/checkout/_components/CheckoutStatePreview.tsx
  - src/components/common/molecules/PreviousTermsPicker.tsx
  - src/app/signup/terms/_components/SignupTermsStatePreview.tsx
  - src/components/phone-verification/phone-verification.types.ts
  - src/components/phone-verification/PhoneVerificationContent.tsx
  - src/app/checkout/preview-shipping/page.tsx
  - src/app/checkout/preview-delivery-request/page.tsx
  - src/app/mypage/preview-logout/page.tsx
  - src/app/mypage/coupons/preview-employee/page.tsx
  - src/app/mypage/addresses/preview-delete/page.tsx
  - src/app/login/preview-help/page.tsx
  - src/app/signup/terms/preview-detail/page.tsx
  - src/app/login/account-locked/verification/preview-carriers/page.tsx
  - src/app/login/account-locked/verification/preview-required-terms/page.tsx
  - src/app/login/account-locked/verification/preview-optional-terms/page.tsx
  - src/app/login/account-locked/verification/preview-previous-terms/page.tsx
  - src/stories/components/common/molecules/SupportTabs/SupportTabs.stories.tsx
  - src/app/cart/preview-limit/page.tsx
  - src/app/cart/_components/CartModalPreview.tsx
  - id: design-state-link-audit
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-29748
    title: '사용자 지정 계정 잠금 해제 디자인과 본문의 나머지 9개 영역 링크'
  - src/app/checkout/_components/CheckoutShipping.tsx
  - src/app/mypage/profile/profilePreviews.ts
  - src/components/phone-verification/PhoneVerificationStatePreview.tsx
  - src/app/support/inquiries/inquiryPreviews.ts
  - src/app/support/inquiries/[preview]/page.tsx
  - src/app/support/inquiries/new/[preview]/page.tsx
  - src/app/support/inquiries/new/order-products/preview-custom/page.tsx
  - src/app/products/[id]/_components/ProductDetailContent.tsx
  - src/app/_components/HomeContent.tsx
  - src/app/support/size-guide/_components/SizeGuidePanel.tsx
  - src/app/support/faq/faq.data.ts
  - src/app/support/inquiries/_components/InquiryListContent.tsx
  - src/app/support/inquiries/_components/InquiryListLayout.tsx
  - src/app/support/inquiries/_components/InquiryListPreview.tsx
  - src/app/support/inquiries/new/_components/InquiryFormContent.tsx
  - src/components/support/InquiryCautions.tsx
  - src/app/support/care/page.tsx
  - src/app/support/care/_components/CareContent.tsx
  - src/app/support/notices/_components/NoticesContent.tsx
  - src/app/support/notices/_components/NoticesList.tsx
  - src/app/support/notices/[id]/page.tsx
  - src/app/support/faq/_components/FaqContent.tsx
  - src/stories/features/support/SupportPages.CustomerCenter.Mobile.stories.tsx
  - src/stories/features/support/SupportPages.stories.tsx
  - src/app/support/_components/SupportContacts.tsx
  - src/app/products/[id]/_components/ProductDetailContent.tsx
  - src/app/products/preview-restock/page.tsx
  - src/components/common/molecules/ProductOptionSelectors/ProductSizeSelector.tsx
  - src/components/common/molecules/SizeSelector/SizeSelector.tsx
  - src/app/mypage/coupons/_components/CouponManagement.tsx
  - src/stories/features/mypage/MyPage.Coupons.Web.stories.tsx
  - src/stories/features/mypage/MyPage.Coupons.Mobile.stories.tsx
  - src/stories/features/binding/RemainingBinding.stories.tsx
  - public/images/mypage/coupon.svg
  - src/app/mypage/profile/_components/ProfileContent.tsx
  - src/app/mypage/profile/_components/ProfileStatePreview.tsx
  - src/components/common/organisms/Address/AddressFields.tsx
  - src/stories/features/mypage/MyPage.Profile.Mobile.stories.tsx
  - src/stories/features/mypage/MyPage.Profile.Binding.stories.tsx
  - src/app/mypage/addresses/_components/AddressManagement.tsx
  - src/app/mypage/addresses/_components/AddressStatePreview.tsx
  - src/app/mypage/event-entries/_components/RunningSessionEntriesContent.tsx
  - src/app/mypage/rewards/_components/RewardsContent.tsx
  - src/app/mypage/rewards/rewards-data.ts
  - src/context/MyPageDataContext.ts
  - src/stories/features/mypage/MyPage.Rewards.Web.stories.tsx
  - src/app/mypage/_components/MyPageContent.tsx
  - src/components/mypage/MyPageFrame.tsx
  - src/app/login/find-account/page.tsx
  - src/app/login/find-account/_components/FindAccountStatePreview.tsx
  - src/app/support/store/_components/StoreContent.tsx
  - src/app/publishing-guide/page.tsx
  - src/app/mypage/event-entries/preview-cancel/page.tsx
  - src/app/mypage/reviews/preview-ready/page.tsx
  - src/app/mypage/reviews/preview-written/page.tsx
  - src/app/mypage/reviews/_components/ReviewStatePreview.tsx
  - src/app/mypage/event-entries/_components/RunClubEntriesContent.tsx
  - src/app/mypage/event-entries/eventEntries.data.ts
  - src/components/common/layouts/AccountPageLayout.tsx
  - src/app/login/find-account/_components/FindAccountContent.tsx
  - src/app/signup/terms/_components/SignupTermsContent.tsx
  - src/app/login/find-account/password-reset/_components/PasswordResetContent.tsx
  - src/app/login/account-locked/complete/page.tsx
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
  - src/stories/features/orders/OrdersPage.stories.tsx
  - src/stories/features/orders/OrdersPage.mobile.stories.tsx
  - src/stories/features/orders/ReturnsPage.stories.tsx
  - src/stories/features/orders/ReturnsPage.mobile.stories.tsx
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
  - src/app/mypage/orders/_components/OrdersPage.tsx
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
  - id: coupons-figma-20261030
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1716-80655
    title: 쿠폰 일반·임직원 PC/MO 시안
  - id: figma-orders-lookup-20261102
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2059-162098
    title: 'Figma 주문/배송조회 PC·모바일 목록과 상세'
  - id: figma-order-claim-application-20261102
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2203-76650
    title: 'Figma 주문 취소·환불 신청 PC 모달과 모바일 시트'
  - id: figma-claim-history-20261102
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2134-82959
    title: 'Figma 취소/반품내역 PC 표·모바일 목록·빈 상태'
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

## 수동 main 변경 보고와 IA 이력 (2026-11-04)

수동 스킬은 지정 시작 커밋을 포함하기 위해 첫 부모 B부터 fetch 직후 고정한 origin/main T까지 최종 diff를 비교한다. 이번 범위는 72ae26eb 포함, B=5db7492d, T=bf29bd25이며 2026-11-04 17:16:17+09:00에 수집했다. 원본260파일에서 Markdown28·퍼블리싱 가이드10·IA 자체6·nalpari 작성자8파일을 제외해208파일을 보고한다. ShopShell의 혼합 변경 중 해당 작성자의 추가 영역1개도 제외했다. 담당자는 기존 IA 매핑만 읽고 WBS/Drive는 조회하지 않는다.

`screenChangeHistory.generated.json`은 reportId·B/T·수집 시각, 유효 파일/영역, 내부 기여 근거·소유자와 제외 집계를 보존한다. `screenChangeHistory.ts`는 공통/STATE 소유권·필터 복원과 IA 담당자 기반 표 행 묶음을 계산한다. 상품 공통 코드는 기존 상품 요약 행으로 통합하며 query/hash 상태별 담당자도 구분한다. 각 화면별 보고서 버튼은 제거하고 상단 날짜·보고서 개발담당자 Select와 [퍼블 변경사항 보고서] 버튼으로만 모달을 연다. 표는 개발담당자·변경사항·변경 파일 * Before·변경라인 * After의4열이며 같은 담당자/설명은 rowspan으로 합친다. 이름변경은 B 이전 경로와 T 이후 경로를 분리하고 일반 수정은 파일과 B/T 줄을 표시한다. collapse 목록과 기여 커밋·작성자 표시는 사용하지 않는다. 기존 수동 비고·담당자·7열 IA 표·상태 링크는 보존한다.

기존 담당자 필터는 native Select를 사용한다. 전체 보고서 버튼 옆 날짜 Select에는 저장된 날짜만 최신순으로 제공하며 전체 버튼은 선택 날짜의 보고서를 표시한다. 날짜와 보고서 담당자를 선택하면 해당 항목만 표시하며 파일 수와 rowspan을 다시 계산한다. 공동 담당은 개별 이름으로 매칭하고 미지정도 선택한다. 이 선택은 IA 목록 담당자 필터와 독립적이다. 전역 layout/ShopShell 간접 영향을 각 영역의 수정으로 연결하지 않는다. 모달은 IA 검색·담당자 필터를 보존한다. 제목은26-11-04 퍼블 변경사항 보고서 형식이다. report=2026-11-04 URL은 전체 개발자, developer=김진영 추가는 해당 담당자를 표시한다. useSearchParams와 router.push/replace로 직접 진입·새로고침·뒤로/앞으로를 지원하며 닫을 때 보고서 query만 지우고 다른 query/hash는 보존한다. screen-index/page.tsx에는 Suspense 경계를 두었다. 열림과 실제 클릭한 트리거로의 닫기/Escape 포커스 복원은 IA 부모가 소유한다. PC는 넓은 모달, 모바일은 fullscreen과 표 내부 스크롤을 사용한다. 보고 UI는 외부 API를 요청하거나 담당자를 변경하지 않는다.

보고서는 `reports/main-changes/inclusive-5db7492d7013d077712245026ece97b1f39a130d-bf29bd25aef39d027b0e69d605ea9e1e15fbfe52.md`에 같은 rowspan 표로 저장한다. B/T별 import 그래프와 에셋 문자열 참조는 외부 스냅샷에서 분석했다. layout/ShopShell 연결은 런타임 확정이 아닌 정적 영향 후보다. sourceGraph.generated.json은 이번 분석으로 덮어쓰지 않았다. 성공 상태는 Git 공통 디렉터리 codex/main-change-report에 검증 후 저장한다.

출처: screenChangeHistory.ts·screenChangeHistory.generated.json·_components/IaStructurePage.tsx·보고서 작업 트리와 B/T Git 스냅샷. 실제 검증은 [검증 기록](../development/verification.md#main-변경-보고와-ia-이력-검증-2026-11-04)을 따른다. 기록: codex/gpt-6, 2026-11-04.

## 이전 약관 확인 시트 시안 반영 (2026-11-04)

기존 `/login/account-locked/verification/preview-previous-terms`와 회원가입 약관 상세의 공통 PreviousTermsPicker에 모바일 확인형 시트를 적용했다. 새 URL은 추가하지 않았다. 선택 시트의 간격을 공유하는 Dropdown의 즉시 선택과 문의 연속 선택은 유지한다. 의존 그래프에는 PreviousTermsPicker의 Button import 연결이 갱신되었다. 출처: `src/components/common/molecules/PreviousTermsPicker.tsx`, `src/app/screen-index/sourceGraph.generated.json`. [시안 기준·계약·검증](ui.md#이전-약관-확인-시트-시안-적용-2026-11-04).

## 결제 수단 아이콘 이름 복구 (2026-11-04)

`/checkout` 결제 수단의 미등록 `radio-checked`/`radio-unchecked` 이름을 현재 등록된 `hoka-radio-checked`/`hoka-radio-unchecked`로 교체해 Icon의 asset.mode 오류를 복구했다. PC1440px·모바일375px에서 결제 수단 6개와 상태 아이콘이 표시되고 오류 화면이 없는 것을 확인했다. 결제 선택·요청 계약은 변경하지 않았다. 출처: `src/app/checkout/_components/CheckoutPayment.tsx`, `src/components/common/atoms/Icon.assets.ts`.

## 문의 유형 모바일 연속 선택 (2026-11-04)

`/support/inquiries/new`는 모바일에서 문의 유형 선택 직후 같은 선택 시트 안에서 상세 유형을 선택한다. PC와 상세 필드 직접 선택은 기존 개별 Dropdown을 유지하며 라우트·쿼리·제출 소유권은 바꾸지 않았다. 출처: `src/app/support/inquiries/new/_components/InquiryFormContent.tsx`, `src/components/common/atoms/Dropdown.tsx`. [선택 계약과 검증](ui.md#모바일-문의-유형-연속-선택-2026-11-04).

## 폼 Dropdown 모바일 시트 (2026-11-04)

`/publishing-guide?tab=form`의 일반·아이콘·이미지 Dropdown 예시는 모바일에서 공통 Radio 선택 BottomSheet를 사용한다고 안내한다. 공통 Dropdown 변경으로 실제 사용처도 같은 모바일 표시를 사용하며 새 경로나 쿼리를 추가하지 않았다. PC·모바일 라우트와 기존 필드 값 소유권은 유지한다. 출처: `src/app/publishing-guide/_components/FormGuide.tsx`, `src/components/common/atoms/Dropdown.tsx`. 검증 범위는 [UI 기록](ui.md#기본-dropdown-모바일-선택-시트와-결제-아이콘-복구-2026-11-04)에 기록한다.

## 선택 UI 공통화 (2026-11-04)

`/login/account-locked/verification/preview-previous-terms`는 기존 진입점을 유지하면서 인증 약관 전문 위에 중첩된 PreviousTermsPicker를 표시한다. 모바일은 중앙 선택 휠, PC는 기존 라디오/확인 목록이며 새 preview URL은 추가하지 않았다. 화면 의존 그래프는 정식 명령으로 갱신한다. 출처: PhoneVerificationContent.tsx·PreviousTermsPicker.tsx 작업 트리(2026-11-04).

상품리뷰의 정렬도 기존 MyPageReviewToolbar에서 공통 Dropdown을 직접 사용한다. recent/oldest 값·sort/onSortChange와 작성 가능/작성한 리뷰 탭·URL은 기존 소유자에 유지한다. MyPageReviewSort는 기본값 전달용 단일 부모 래퍼여서 제거했다. 출처: `src/app/mypage/reviews/_components/MyPageReviewsContent.tsx` 작업 트리(2026-11-04).

고객센터 `/support/terms` 및 `?tab=privacy`의 시행일 선택은 기존 TermsDocument 로컬 날짜 상태를 공통 Dropdown에 연결했다. tab 쿼리와 탭 상태·문서 placeholder는 유지하며 새 라우트는 없다. PC 날짜 선택과 모바일 공통 시트의 해당 선택값 표시를 확인했다. 출처: `src/app/support/terms/_components/TermsDocument.tsx` 작업 트리(2026-11-04).

후속 검토에서 신청내역 정렬에 `Dropdown.popupAlign="start"`를 지정해 콘텐츠 왼쪽 선과 옵션 박스의 시작점을 맞췄다. 정렬 상태·콜백·라우트는 유지한다. 출처: `src/app/mypage/event-entries/_components/RunningSessionEntriesContent.tsx` 작업 트리(2026-11-04).

모바일 상품 정렬은 `/products`에서도 기존 필터 안에 표시하며 검색 전용 표시 조건을 제거했다. draft/apply와 sort 쿼리 소유자는 유지한다. 일반 sort Dropdown의 모바일 전환은 공통 BottomSheet를 사용하고 새 라우트를 추가하지 않는다. 출처: ProductListingPage.tsx·Dropdown.tsx·BottomSheet.tsx 작업 트리(2026-11-04).

상품 목록 정렬은 공통 Dropdown의 sort variant를 사용하며 기존 `useSearchParams`/router 소유권과 `sort` 쿼리를 유지한다. 러닝세션 신청내역의 sort 상태와 IA의 상품 분류·개발담당자 필터 상태도 기존 소유자에서 공통 Dropdown에 연결한다. 신규 라우트나 상태 URL은 추가하지 않았다. `npm run screen-files`로 의존 그래프를 재생성했다. 퍼블리싱 가이드에는 sort 예시를 추가했다. 소스: `src/components/catalog/ProductListingPage.tsx`, `src/app/mypage/event-entries/_components/RunningSessionEntriesContent.tsx`, `src/app/screen-index/_components/IaStructurePage.tsx`, `src/app/publishing-guide/_components/FormGuide.tsx`, `src/app/screen-index/sourceGraph.generated.json` 작업 트리. PC의 정렬 쿼리 변경·IA 필터 선택과 62개 기존 검사 및 production build 통과를 확인했다. 상세 디자인과 모바일 검증 한계는 [공통 선택 UI](ui.md#공통-선택-ui와-정렬-variant-2026-11-04)에 기록한다. Codex, 2026-11-04T04:59:34Z.

## STATE 공통 파일 상위 정리 (2026-11-04)

실제 화면이 없는 분류 행도 파일 소유자가 될 수 있다. `getSiblingScreenSourceFiles`는 현재 표시된 직접 하위 화면 둘 이상이 공유하는 비page 파일을 바로 위 분류 경로에 모은다. 주문배송 조회의 목록·상세가 공유하는 OrdersPage.tsx 등 11개 파일은 D3 주문배송 조회에 표시하며 D4와 STATE에서는 반복하지 않는다. 취소/반품은 해당 D3에서 따로 정리하고 두 D3가 같은 파일을 쓴다는 이유로 D2 구매내역까지 올리지 않는다. 하나의 자식만 필터 결과에 남으면 공통 묶음을 만들지 않고 그 자식 화면에 파일을 유지한다. 진입 page·고유 파일·담당자·상태 연결은 그대로다.

추가 사용자 지시로 화면 계층 사이에서도 상위 화면이 이미 표시하는 파일을 하위 화면과 STATE에 중복하지 않는다. `getAncestorScreenSourceFiles`는 현재 검색·담당자 필터 결과에 존재하는 실제 상위 IA의 표시 파일만 상속한다. 회원 정보 입력 D3의 RegistrationStatePreview.tsx·RegistrationContent.tsx는 D3에만 표시하고 부가정보 D4·마케팅 수신내역 D5에서는 제거한다. 기본·상태 URL과 고유 파일은 유지한다. 필터로 D3가 제외되면 현재 남은 하위 화면에 공통 파일을 다시 표시해 확인 경로를 잃지 않는다. 같은 계층의 형제 화면은 상위 소유자로 취급하지 않는다.

후속 사용자 요청으로 같은 화면의 서로 다른 상태 URL 두 개 이상이 사용하는 공통 인계 파일을 상위 화면의 작업 파일 행에 한 번만 표시한다. `getSharedStateSourceFiles`는 기존 URL별 import 그래프 결과를 집계하며 동일 URL을 여러 IA가 공유해도 중복 횟수로 세지 않는다. 동적 route를 포함한 page 진입 파일은 상위로 이동하지 않는다. `_components/`는 기존 상위 비고 위치를 유지하고, 한 상태에서만 쓰는 나머지 파일은 해당 STATE 행에 남긴다.

상품 상세의 productDetailPresentation.ts·productInquiries.ts·care.data.ts는 상위 작업 파일 행으로 모였으며 기본·입고 알림·문의 없음·옵션 안내 행에는 각 진입 파일이 남는다. 상품 목록의 기존 공용 파일 비고 배치와 상품 공통 D1의 수동 비고 묶음은 유지한다. 다른 화면의 STATE에도 같은 공통 파일 기준을 적용한다. 아래 이전 단계의 공용 파일 반복 표시는 이 후속 기준으로 대체된다. 기존 getScreenConnection/getRouteSourceFiles의 전체 연결 결과·URL·담당자·상태 값은 바꾸지 않는다.

출처: src/app/screen-index/screenConnections.ts, _components/IaStructurePage.tsx와 tests/preview-links.test.mjs 작업 트리. 기록: codex/gpt-6, 2026-11-04T03:56:26Z.

2026-11-04 에러·빈 상태 가이드 반영은 기존 `/preview-not-found`, `/service-unavailable`, `/maintenance`, `/mypage/recent/preview-empty`, `/mypage/preview-no-orders` 표시만 수정한다. 신규 route·IA 연결이나 플랫폼 판정 변경은 없다. 마이페이지 route-private 소유자는 `src/app/mypage/_components/MyPageContent.tsx`를 유지한다. 적용값과 실제 확인은 [에러·빈 상태 가이드](error-empty-guide.md)를 참고한다.

## 기본 STATE와 담당자 필터 (2026-11-04)

후속 사용자 지시로 실제 페이지 링크를 모든 화면의 하위 `STATE 기본 | 상태 | 보기` 행으로 이동했다. 기존 기본 URL의 query/hash는 유지하고 이미 같은 URL인 상태는 중복하지 않는다. 상품 공통 템플릿은 카테고리마다 기본 행을 늘리지 않고 현재 대표 상품 URL과 검색 진입점을 각각 유지한다. 독립 기본 URL이 없는 화면은 기존 상태 URL만 표시한다.

기존 WBS 작업 기간 자리는 개발담당자로 대체했다. 별도로 추가했던 우측 담당자 열과 작업 기간 전용 데이터·그룹 보조 행을 제거해 7열·1300px 최소 폭으로 정리했다. 담당자 링크는 이름 길이에 맞는 폭이며 원본 WBS 행 링크를 유지한다. 담당자 필터는 전체·개별 이름·미지정을 제공하고 공동 담당은 이름별로 선택할 수 있다. 검색과 AND 조건으로 적용하며 전체 초기화는 담당자 선택과 검색어를 해제한다. 화면 체계 NAV 전환은 선택한 담당자를 유지한다. 후속 사용자 지시로 상태 필터와 전체 접기/펼치기 버튼·전용 상태를 제거하고 개별 계층의 접기/펼치기는 유지한다.

`getScreenComponentFiles`는 화면·상태가 사용하는 `_components/` 파일을 import 그래프로 확인해 상위 화면 비고에 모은다. 상태 행에서는 이 파일을 반복하지 않는다. 사용자 한정 지시에 따라 **상품 목록만** 공용 구현·데이터 파일도 상위 비고에 모으고 상태 행에는 page 진입 파일만 표시한다. 상품 상세 및 다른 화면은 `_components/`만 상위로 이동하며 그 밖의 인계 파일은 기존 작업 파일·상태 행에 유지한다. 이 배치가 아래 최초 8열 설명을 대체한다.

상품 공통 화면에 한정해 상품 목록·상세의 수동 비고 묶음 두 개만 D1 공통 행의 기존 `확정 IA 기준 화면 영역` 칸으로 이동했다. ProductNotes는 각각의 제목·건수와 원래 비고 내용·연결 분류 경로를 유지한다. 목록·상세의 구현 파일은 해당 화면 행에 남고, 다른 영역의 수동 비고 위치는 변경하지 않는다.

출처: src/app/screen-index/_components/IaStructurePage.tsx, screenConnections.ts, screenDevelopers.ts와 tests/preview-links.test.mjs 작업 트리. 기록: codex/gpt-6, 2026-11-04T02:19:52Z.

## IA 상태별 작업 파일과 개발담당자 (2026-11-04)

IA 표에 고정 개발담당자 열을 추가했다. `screenDevelopers.ts`는 [WBS Schedule](https://docs.google.com/spreadsheets/d/1BAxtSHBSp8DguH0gv2EbnEpqHZhZEez66eyTSmAcG6w/edit?gid=1070650770)의 FO 개발(5.3.2)·X열 파트·Y열 담당을 2026-11-04에 확인한 표시 데이터다. 내부 IA 번호와 상품 템플릿 코드로 연결하며 커밋 작성자와 구분한다. 담당 공란인 마이페이지 메인·확인되지 않은 화면은 미지정, 삭제 화면은 `-`로 표시한다. 검색은 성인환, 상품 목록은 박혜리, 상품 상세는 박기홍이며 주문서의 배송지 수동입력 상태는 김진영이다. 담당자 링크는 확인한 WBS 행을 열고, 이름·업무 영역으로 IA를 검색할 수 있다. 실시간 Sheets 조회는 구현하지 않는다.

`getScreenConnection`의 전체 파일 계약은 유지한다. 새 `getRouteSourceFiles`는 URL pathname에 대응하는 실제 page 진입점부터 기존 import 그래프의 인계 파일을 탐색한다. 정적 경로를 동적 경로보다 우선하며 query/hash 상태는 같은 진입 파일을 공유한다. 기본 화면에는 기본 경로 파일만 표시하고 각 STATE 행에는 해당 상태의 진입·공용 파일을 개별 표시한다. 상품 요약은 상품과 검색의 서로 다른 상태 URL도 합쳐 누락 없이 표시하며 상태 담당자는 해당 URL 소유 화면으로 한정한다. 표는 개발담당자 열을 포함해 8열이며 상태별 파일 셀을 병합하지 않는다.

출처: 위 세 screen-index 작업 트리 파일과 WBS Schedule B267:Y351 직접 조회. 실제 검사와 한계는 [변경 검증](../development/verification.md#ia-개발담당자와-상태별-파일-검증-2026-11-04)을 따른다. 기록: codex/gpt-6, 2026-11-04T01:55:40Z.

`/wh`는 공통 쇼핑 셸 없이 GitHub main의 한국 시간 기준 선택 기간(오늘, 어제부터 오늘, 3일 전부터 오늘, 7일 전부터 오늘)의 커밋과 변경 파일을 조회하고 OpenRouter로 커밋 메시지를 요약한다. 서버 환경 변수 `GITHUB_TOKEN`과 `OPENROUTER_API_KEY`가 필요하며 GitHub 공개 저장소는 토큰 없이 조회할 수 있다.

`/wh`는 한국 시간으로 7일 전부터 오늘까지의 커밋과 파일을 한 번 조회한다. 최초에는 오늘이 선택되고 날짜 버튼은 서버 재요청 없이 해당 날짜부터 오늘까지의 결과와 기간 전체의 요약을 표시한다. 오늘 버튼은 오늘 결과만 표시한다. 새로고침 버튼은 선택을 유지하며 원격 데이터를 다시 조회한다. 최초 조회와 새로고침 중에는 `/wh` 전용 도트 매트릭스 로딩을 표시한다. GitHub 요청 한도 초과 시 초기화 시각과 서버 토큰 설정 안내를 표시한다. `Merge commit` 및 `Merge pull request`로 시작하는 병합 커밋은 파일과 요약을 포함한 조회 결과에서 제외한다.

`/wh`는 독립 개발자 도구 화면으로 저장소와 브랜치, 날짜별 변경 파일 및 커밋을 구분해 표시한다. 파일 경로와 짧은 커밋 해시는 고정폭 글꼴을 사용하며 좁은 화면에서는 목록을 한 열로 배치한다. 커밋마다 색상과 번호를 표시하고 각 파일에 해당 커밋의 색상과 번호를 모두 연결한다. 파일의 번호를 누르면 해당 커밋으로 이동한다. 커밋의 색상 배지를 선택하면 변경 파일 목록과 개수가 해당 커밋으로 필터링되며 커밋 제목의 필터 초기화로 전체 목록을 복원한다. 날짜 변경과 새로고침도 필터를 초기화한다. 각 파일의 변경 내용 요약을 펼치면 서버가 선택 기간 및 선택된 커밋의 GitHub diff를 조회해 OpenRouter로 요약한다. diff가 없거나 일부 생략된 경우 안내하며 실패 시 재시도할 수 있다. 파일 diff가 OpenRouter에 전송된다. 출처: `src/app/wh/_components/WorkHistory.tsx` 작업 트리.

## 상품상세 사이즈 추천 1차 제외 (2026-11-03)

`ProductSizeSelector`의 “사이즈 추천: 정사이즈” description을 1차 제외 요청에 따라 주석 처리했다. 사이즈 선택·사이즈 가이드와 기존 URL 및 서버/클라이언트 경계는 유지한다. 출처: 작업 트리 `src/app/products/[id]/_components/ProductDetailContent.tsx`. 기록: codex/gpt-6, 2026-11-03 (Asia/Seoul). 코드 diff를 확인했으며 브라우저 검증은 수행하지 않았다.

## 주문 관련 3개 화면의 URL 유지 (2026-11-02)

최신 주문 시안으로 `/mypage/orders`의 주문/배송조회 표시와 `/mypage/returns`의 취소/반품내역·신청 표시를 갱신했다. 두 App Router 진입점과 preview 경로는 유지했다. Storybook에서는 주문을 장바구니와 별도인 `PAGES/주문` 아래로 정리하고 주문 조회 WEB·Mobile, 취소/반품내역 WEB·Mobile을 화면 연결 인덱스에 등록했다. 생성된 화면 연결 그래프에서는 제거한 SearchField 의존성만 반영했다. UI 차이와 확인 범위는 [컴포넌트와 스타일](ui.md#주문-조회취소환불-신청내역-figma-적용-2026-11-02)에 기록했다. 출처: 위의 3개 Figma 노드와 `src/app/mypage/orders/_components/OrdersPage.tsx`, 주문 Storybook 파일, `src/app/screen-index/screenConnections.ts`, `src/app/screen-index/sourceGraph.generated.json` 작업 트리.

## 장바구니 기본 화면의 고정 상태 (2026-11-02)

후속 시안 `1976:61436`·`1985:76300`·`1985:77485`·`1985:77511`에 따라 `/cart/preview-options`와 `/cart/preview-limit`을 추가했다. 두 URL은 같은 장바구니 배경 위에서 각각 옵션 변경·구매 수량 제한 모달을 열어 고정 상태를 직접 확인한다. 닫기는 로컬 UI 상태이고 주문·재고 판정·옵션 저장은 연결하지 않는다. IA 170 미리보기 링크와 화면 그래프에 연결한다.

`/cart`는 기존 App Router 경로와 page export를 유지한다. Figma `1992:85202`(MO 기본), `1938:45809`(MO 선택), `1797:47269`(PC)의 장바구니 상태를 검토했다. 페이지의 제목 개수는 고정 표시 행 4개에서 가져오며, 기본 행은 선택 0개·품절 1개다. 선택·수량·관심상품·옵션 팝업은 화면 확인용 로컬 UI 상태이고 주문·삭제·저장 이동이나 요청은 연결하지 않는다. 새 URL은 추가하지 않았다. 작업 트리 출처: `src/app/cart/page.tsx`, `src/app/cart/cart-preview.ts`, `src/app/cart/_components/CartProductSection.tsx`, `src/app/cart/_components/CartDialogs.tsx`.

## 러닝세션 신청내역 Figma 실측 보정 (2026-10-30)

기본 /mypage/event-entries와 preview-empty·preview-cancel은 기존 RunningSessionEntriesContent를 공유한다. URL·App Router 경계·IA 200·공통 MyPageFrame·GNB·footer는 유지하며 route-private 목록과 모달 스타일 및 표시 fixture만 보정했다. PC 본문 844px, 이미지 96px, 취소 링크는 상세 정보 우측 하단이며 MO에서는 다음 행 우측이다. [디자인 값과 검증](ui.md#러닝세션-신청내역-figma-실측-보정-2026-10-30)을 참고한다.

출처: [Figma 신청내역 섹션](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1934-97644)의 PC `1934:98031`·MO `1934:97645`·모달 `1934:97736`, 위 두 작업 트리 파일과 `public/images/mypage/event-entries/`. 작성: Codex, 2026-10-30T08:21:19.889Z; 조사 기준 HEAD `44faf1e5aa491c2506db28d0741e3f27f782ad58`. 기존 개념의 source_revision은 이전 출처로 보존한다.

## 화면 연결 그래프 최신화 (2026-10-30)

`npm run screen-files`로 `src/app/screen-index/sourceGraph.generated.json`을 현재 소스에 맞춰 재생성했다. 로그인·계정 잠금·아이디 찾기·비밀번호 재설정의 실제 import와 퍼블리싱 가이드의 HelpTips 연결을 반영하고 제거된 의존성을 정리했다. 라우트 구현과 URL은 변경하지 않았다. 작업 트리 출처는 위 생성 파일이며, `tests/screen-files.test.mjs` 1개를 통과했다.

## 마이페이지 메인 디자인 적용 (2026-10-30)

기존 `/mypage`·`/mypage/preview-no-orders`는 같은 `_components/MyPageContent.tsx`를 계속 사용한다. [Figma 메인 섹션](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1413-131325)의 PC/MO 기본·주문 없음 표현을 반영했고 route 진입점·IA 연결·표시 데이터 및 외부 context 계약은 유지한다. `MyPageFrame`의 `centered` 레이아웃만 모바일 breadcrumb 하단을 8px로 지정하며 기존 `sidebar`의 32px은 유지한다. 메인의 불필요한 PC 상단 24px을 제거하고 모바일 상단 24px은 유지한다.

두 URL PC/MO 직접 진입·hydration 후 표현, 모바일 캐러셀·로그아웃 모달 닫기/포커스 복귀와 쿠폰 화면의 breadcrumb 간격을 확인했다. 1024px까지 모바일, 1025~1199px의 1200px 캔버스, 1200px 이상 가로 overflow 없음도 확인했다. 공통 플랫폼 판별은 수정하지 않았다. Next 빌드·타입 검사를 통과했다. 상세와 미실행 검사는 [디자인 반영](ui.md#마이페이지-메인-디자인-반영-2026-10-30)에 기록했다.

작업 트리 출처: `src/app/mypage/_components/MyPageContent.tsx`, `src/components/mypage/MyPageFrame.tsx`. 기록 시점: 2026-10-30T16:46:00+09:00.

## 매장 목록 제목 매핑 검토 (2026-10-30)

`src/app/support/store/_components/StoreContent.tsx`의 매장명 타이포를 16px H10으로 지정했다. `/support/store` 경로·page export·서버/클라이언트 경계와 정보 목록 계약은 유지한다. [표현 규격](ui.md#매장-목록-제목-16px-유지-2026-10-30)을 참고한다.

## 퍼블리싱 가이드 import 정렬 검토 (2026-10-30)

`src/app/publishing-guide/page.tsx`의 atoms/molecules import 그룹과 type binding 순서만 정리했다. 경로·metadata·page export·탭 내용·서버/클라이언트 경계에는 영향이 없다. 전체 `npm run lint`가 통과했다. [UI 기록](ui.md#퍼블리싱-가이드-import-정렬-2026-10-30)을 참고한다.

## 타이포 사용처 이름 변경 검토 (2026-10-30)

상품 상세·결제·회원정보·고객센터의 기존 16px H9 사용처를 H10으로 옮기고 퍼블리싱 가이드의 제목 예시를 H10까지 확장했다. 변경한 라우트의 경로·page exports·서버/클라이언트 경계·preview URL과 상태 소유권은 유지한다. 작업 트리 출처는 `src/app/products/[id]/_components/ProductDetailContent.tsx`, `src/app/checkout/_components/CheckoutPayment.tsx`, `CheckoutShipping.tsx`, `CheckoutSummary.tsx`, `src/app/mypage/profile/_components/ProfileContent.tsx`, `src/app/support/after-sales/_components/AfterSalesContent.tsx`, `src/app/support/inquiries/_components/InquiryListContent.tsx`, `src/app/support/store/_components/StoreContent.tsx`, `src/app/publishing-guide/_components/TypographyGuide.tsx`다. [표현 계약](ui.md#영문-폰트-연결과-타이포plp-필터-규격-2026-10-30)을 참고한다.

## 러닝세션 신청 취소 모달 직접 URL (2026-10-30)

`/mypage/event-entries/preview-cancel`은 기존 `RunClubEntriesContent`의 `preview="cancel"` 옵션으로 고정 목록과 열린 신청 취소 모달을 표시한다. 연결된 Provider와 무관하게 fixture를 사용하고 실제 조회·취소 요청은 실행하지 않는다. 확인·취소·닫기·Escape로 창을 닫을 수 있으며 새로고침하면 다시 열린다. 기본 목록과 기존 Empty URL은 유지한다.

검증: 브라우저에서 PC/MO 직접 진입과 열린 모달, Escape 닫기·새로고침 재노출·확인 후 기존 3건 상태 유지·취소 버튼 닫기를 확인했다. screen-index의 ‘신청 취소 모달’ STATE 행, URL/상태명 검색과 보기 링크 새 창 진입을 확인했다. 변경 파일 ESLint/Prettier·타입 검사·그래프 생성을 통과했다. 실제 취소 API·전체 production/Storybook build는 실행하지 않았다.

screen-index IA 200의 previewRoutes에 ‘신청 취소 모달’을 추가하고 sourceFiles에 진입점을 연결했다. 상태가 두 개가 되어 기본 목록은 원본 행의 페이지 링크, Empty와 취소 모달은 STATE 행으로 표시되는 기존 규칙을 사용한다. sourceGraph는 `npm run screen-files`로 생성한다. 출처: 위 preview 진입점과 `src/app/mypage/event-entries/_components/RunClubEntriesContent.tsx`, `src/app/screen-index/screenConnections.ts` 작업 트리. 작성: 2026-10-30 (Asia/Seoul).

## 상품리뷰 디자인의 직접 상태 URL (2026-10-30)

IA 191 상품리뷰의 STATE에 디자인 세 화면을 연결했다. `/mypage/reviews/preview-ready`는 작성 가능한 리뷰 목록, 기존 `/mypage/reviews/preview-empty`는 작성 가능한 리뷰 목록 없음, `/mypage/reviews/preview-written`은 내가 작성한 리뷰다. `/mypage/reviews/preview-written-empty`의 상태명은 내가 작성한 리뷰 목록 없음이다. 사용자 브라우저 코멘트의 세 상태명을 적용했으며 URL 자체는 유지한다. 새 route는 기존 `ReviewStatePreview`의 준비된 상태를 사용하고 클릭 순서·로그인·저장소에 의존하지 않는다. 기존 기본 route와 작성/수정/오류/작성 목록 없음 URL은 보존한다. `screenConnections.ts`의 previewRoutes/sourceFiles를 갱신하고 생성 그래프는 `npm run screen-files`로 반영한다. [표시 구조와 fixture 계약](ui.md#상품리뷰-디자인-목록과-state-2026-10-30)을 참고한다.

2026-10-30 후속: `/mypage/reviews`·`/preview-written`·`/preview-empty`의 PC/MO Figma 표현을 기존 소유자에서 갱신했다. page 진입점·공통 프레임·플랫폼 판별·실제 조회/저장 계약은 변경하지 않는다. 브라우저에서 세 URL과 IA 상태명 검색·정확한 보기 URL, 명시적 WEB/Mobile 스토리 및 모달 닫기/포커스 복귀를 확인했다. 작업 트리 출처는 리뷰 `_components`·fixture, `screenConnections.ts`, 리뷰 stories이며 기록 시점은 2026-10-30T17:12:00+09:00이다.

## 러닝세션 신청내역 시안 반영 (2026-10-30)

`/mypage/event-entries`와 기존 `/preview-empty`는 route-private `RunClubEntriesContent`를 공유한다. PC는 상단 breadcrumb와 190px 사이드바·98px 간격·844px 본문, 모바일은 사이드바를 숨긴 단일 본문이다. 사용자 확정에 따라 이 외곽 배치를 `MyPageFrame`으로 통합했고 마이페이지 메뉴도 최종 디자인으로 정리했다. `/mypage` 메인만 사이드바를 생략하며 breadcrumb 위치는 동일하다. GNB·footer는 유지한다. [최종 공통 프레임](ui.md#마이페이지-최종-공통-프레임-2026-10-30)을 참고한다. 목록은 제목/배지와 96px 정사각 이미지/장소/거리/신청일/진행일시를 분리하며 신청 가능한 항목에만 오른쪽 취소 링크를 표시한다. 정렬은 최신순/과거순, 건수는 오른쪽, 더보기는 PC 160px·모바일 전체 폭이다.

`eventEntries.data.ts`의 3개 항목·총 62건·1/10은 시안용 표시 fixture이며 실제 페이지 수를 계산한 값이 아니다. 이미지는 저장소의 런클럽 에셋을 재사용하므로 첨부 시안의 일부 사진과 다르다. 미연결 더보기는 비활성이며 취소 확인은 창만 닫는다. 실제 API는 추가하지 않았고 운영 목록·정렬·더보기·취소는 [기존 컨텍스트의 연결 계약](state.md#러닝세션-신청내역의-표시와-정렬-계약-2026-10-30)을 사용한다. 기존 미리보기의 취소 상태 변경 시뮬레이션을 제거했다.

검증: 기본 PC/MO와 Empty 직접 진입, 정렬 선택·탭 필터·취소 모달·Escape/포커스 복귀를 브라우저로 확인했다. 1024px 이하 mobile, 1025~1199px의 1200px canvas, 1200px 이상 document 가로 넘침 없음을 확인했다. 임시 Provider로 비fixture ID·late data·서버 결과 보존·취소 실패/재시도/pending/성공·추가 목록·조회 실패/재시도를 확인한 뒤 임시 소스를 제거했다. 최종 모바일 breadcrumb의 줄바꿈 방지와 날짜 body5 조정은 이 스크린샷 확인 이후 반영했다. 실제 서비스 API·전체 Storybook/production build는 검증하지 않았다.

출처: `src/app/mypage/event-entries/_components/RunClubEntriesContent.tsx`, `eventEntries.data.ts`, `src/context/RunClubDataContext.ts` 작업 트리와 사용자 첨부 디자인·기획서. 작성: Codex, 2026-10-30 (Asia/Seoul).

## 계정 프레임 본문 배치 정리의 라우팅 영향 (2026-10-30)

비밀번호 재설정·본인인증의 중복 `contentCss` flex 선언을 정리했다. 계정 잠금 해제 완료·회원가입 완료는 제거된 `pageCss` 대신 각 page에서 기존 외곽 간격과 500px 중앙 본문을 직접 배치한다. URL·페이지 export·입력 및 이동 흐름은 변경하지 않았다. [UI 기준](ui.md#계정-프레임의-중복-본문-flex-제거-2026-10-30)을 따른다.

## 계정 프레임 모바일 최소 높이 옵션 제거 (2026-10-30)

`fillMobileViewport` 옵션과 로그인/가입/계정 찾기 화면의 호출을 제거했다. 계정 프레임의 모바일 하단 여백은 공통 64px로 둔다. 경로와 페이지 export는 바꾸지 않았다. [UI 기준](ui.md#계정-프레임-모바일-여백과-직접-jsx-스타일-2026-10-30)을 따른다.

## 회원가입 완료 화면 버튼 배치 (2026-10-30)

`/signup/complete`의 안내와 후속 버튼을 기존 경로 안에서 Panda JSX 레이아웃 props로 배치한다. `ButtonLink` 주변의 불필요한 `HStack`을 제거하고 버튼 위 간격은 `Box`가 소유한다. 경로와 내비게이션은 변경하지 않았다. [UI 기준](ui.md#계정-프레임-모바일-여백과-직접-jsx-스타일-2026-10-30)을 따른다.

## 회원가입 약관 필수·선택 표기 (2026-10-30)

약관 목록과 상세 제목은 필수 `[필수]`, 선택 `(선택)`으로 구분하고, 자세히 보기 버튼의 접근성 이름도 같은 표기로 맞췄다. URL·약관 선택과 이동 동작은 변경하지 않았다. [UI 기준](ui.md#계정-프레임-모바일-여백과-직접-jsx-스타일-2026-10-30)을 따른다.

## 계정 찾기 페이지 진입점 정리 (2026-10-30)

`/login/find-account/page.tsx`는 고정 상태 미리보기 선택과 기본 화면 렌더링을 유지한다. 기본 화면 상태 소유자의 이름을 `RouteContent`에서 `FindAccountRouteContent`로 구체화하고 서비스 바인딩 설명을 해당 소유자 위로 옮겼다. 경로, 클라이언트 경계, 미리보기 계약, 입력·인증 상태와 이동은 변경하지 않았다. 작업 트리 출처: `src/app/login/find-account/page.tsx`, `_components/FindAccountContent.tsx`, `_components/FindAccountStatePreview.tsx`. [UI 구성](ui.md#계정-찾기-화면-구성-정리-2026-10-30)을 따른다.

## 로그인 버튼 간격의 라우팅 영향 (2026-10-30)

`/login`과 `/login/preview-error`가 공유하는 `LoginContent`의 버튼 묶음 배치만 변경했다. URL·페이지 export·제출 동작은 그대로다. [UI 기준](ui.md#로그인-버튼-묶음-간격-2026-10-30)을 따른다.

## Fieldset 초기화의 라우팅 영향 (2026-10-30)

로그인·가입·계정 찾기·장바구니·결제·문의·마이페이지 라우트의 fieldset 지역 초기화만 공통 스타일로 옮겼다. 경로·페이지 export·폼 제출 및 disabled 상태에는 변경이 없다. [UI 기준](ui.md#fieldset-공통-초기화-2026-10-30)을 따른다.

## 계정 화면 공통 하단 여백 (2026-10-30)

로그인·계정 찾기·비밀번호 재설정·계정 잠금 해제 완료·회원가입 단계와 완료 화면의 데스크톱 하단 여백을 `AccountPageLayout` 기본값 124px로 통일했다. 라우트와 화면 전환은 변경하지 않았다. 모바일 값과 화면별 별도 배치는 유지한다. [공통 레이아웃 기준](ui.md#계정-화면-공통-하단-여백-2026-10-30)을 따른다.

## 장바구니·로그인 확인 URL 분리 (2026-10-30)

기존 `/cart`와 `/login`은 서비스 흐름을 제거한 퍼블리싱 기본 화면이다. `/cart/preview-empty`는 빈 장바구니, `/login/preview-error`는 두 필드의 고정 오류를 직접 표시한다. 오류 화면은 기본 로그인과 `LoginContent` 마크업을 공유하고 입력 후에도 오류가 유지된다. 빈 장바구니는 기존 `CartEmptyState`와 공용 제목을 사용한다. IA 170·223의 `previewRoutes`를 화면 목록의 실제 페이지 링크 옆에 노출하며 검색에도 반영한다. 원본 IA 번호와 진행 상태는 변경하지 않는다.

장바구니 page는 고정 데이터와 레이아웃을 조합하고 선택·수량·모달 UI 상태는 기존 `_components`에 둔다. 로그인 전용 RoutePreview 주입과 사용되지 않는 타입 선언·스토리 어댑터는 제거했다. 서비스 API를 추가하지 않았다.

## 페이지 전용 컴포넌트 분리 재적용 (2026-10-30)

사용자 요청으로 어제의 페이지 배치 패턴을 다시 적용했다. 30개 라우트의 `page.tsx`에는 페이지 컴포넌트를 유지하고 보조 UI 41개 모듈은 같은 라우트의 `_components/`에 둔다. 기존 순수 데이터·계산 모듈과 이미 적합한 페이지는 유지한다. URL, 서버/클라이언트 경계, 상태 소유권과 RoutePreview 계약은 바꾸지 않는다. 새 폼 가이드를 보존하며 IA import 그래프를 재생성했다. [범위와 이번 검증](https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/page-private-components-2026-10-30.md)을 참고한다.

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

Desktop/Mobile 전수조사와 사용자 지정 단일 부모 범위에 따라 RunClubMobileActionBar를 기존 런클럽 상세 page.tsx의 로컬 RunClubFixedActionBar로 이동했다. 공개 페이지 export와 세션 조회·상태·신청 모달·기존 URL을 유지한다. 작업 트리 출처: `src/app/running/run-club/[sessionId]/page.tsx`. [전수조사 보고서](https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/platform-component-audit-2026-10-28.md)를 참고한다.

플랫폼 파일 통합 검증 (2026-10-28): 타입·ESLint/Prettier·Panda·Next/Storybook 빌드와 기존 테스트 62개를 통과했다. 브라우저에서 PC 정렬·즉시 필터와 모바일 초안·닫기·적용·검색어 유지 및 이동된 메뉴·푸터·갤러리·런클럽의 주요 동작을 확인했다. [전수조사 보고서](https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/platform-component-audit-2026-10-28.md#검증)에 실제 확인 항목과 범위를 기록했다.

## 단일 부모 통합과 도메인 폴더 승격 (2026-10-28)

깊이에 관계없이 단일 라우트 구성과 하위 단일 부모 TSX를 실제 page.tsx의 최상위 로컬 함수로 통합했다. 페이지는 Next 지원 export와 기존 route props만 제공한다. IA private client와 서버 사이즈 가이드의 client 패널은 최소 경계로 유지한다. 실제 페이지의 로컬 Storybook 구성은 선택적 RoutePreview 컨텍스트로만 입력을 주입하며 기본 운영 렌더는 기존 상태 소유자를 사용한다. [단일 부모 통합 기록](https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/single-parent-consolidation-2026-10-28.md) 참고.

검증: 폴더 승격 후 타입·Panda·Next/Storybook 빌드와 기존 테스트 62개를 통과했다. 이동 함수 409개·초기화 표현식 211개의 구조 비교, PC·모바일 주요 동작 및 스토리 확인 범위는 [통합 검증 기록](https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/single-parent-consolidation-2026-10-28.md#검증)에 명시했다.

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

루트 layout은 서버 문서와 Suspense/ShopShell만 구성하며 UA headers 판별과 src/lib/device.ts를 제거했다. 서버/최초 hydration은 web, 이후 1024px 이하 mobile·초과 web으로 전환한다. URL·metadata와 서버/클라이언트 경계는 유지한다. [현재 계약과 검증](https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/responsive-platform-2026-10-28.md)을 참고한다. 작업 트리 출처: src/app/layout.tsx, src/context/platform.tsx, src/context/ShopShell.tsx.

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

장바구니·주문서·홈·로케일·가입 정보·마이페이지·상품 상세·고객센터·IA 화면의 보조 TS 파일을 실제 라우트와 같은 폴더로 옮겼다. 공지 데이터와 문의 주문 선택 모듈은 공통 상위 라우트가 소유한다. 일반 TS 파일은 page/route 파일을 추가하지 않으므로 URL을 생성하지 않는다. IA와 카탈로그 스토리가 공유하는 IA 경로 변환기는 app/screen-index에서 관리한다. [이동 목록과 검증](https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/ts-module-ownership-2026-10-28.md).

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

`/publishing-guide`는 기존 SupportTabs의 guide 변형으로 상단 컴포넌트 분류 탭(버튼·폼·모달·뱃지)을 전환한다. 버튼 탭은 크기 기준·속성 안내를 첫 섹션으로 두고, Primary 예시 옆에서 시작하는 오른쪽 세로 바로가기 목록과 예시 영역의 2열 레이아웃을 사용한다. 크기 안내에는 Tall/Short 치수, CTA1/CTA2 및 Link 폰트 크기, density·size·auto 우선순위와 auto 플랫폼 기본값, FilterTrigger·HeaderSearch·아이콘 전용 버튼 예외, 라벨 Typography 연동과 Black/White colorway를 정리한다. 바로가기는 압축된 간격으로 크기 기준·Primary·Secondary와 추가 유형 전부를 실제 variant명으로 표시하고 각 설명은 한국어로 작성한다. 데스크톱 타임라인은 고정 사이트 헤더 높이와 24px 간격 아래에서 sticky로 유지하고, 모바일에서는 예시 아래에 정적 배치한다. Primary·Secondary 및 추가 버튼 유형의 각 샘플은 기본·비활성화 미리보기와 상태별 사용 코드·복사 버튼을 함께 제공한다. 상태 라벨은 한 줄로 유지하고 코드와 복사 액션은 코드 칸 안에서 나란히 배치해 좁은 화면에서도 코드가 잘리지 않게 한다. 코드 복사는 공용 `faCopy` 아이콘을 32px `variant="icon"` 버튼으로 표시하고 각 버튼에 한국어 접근성 이름과 툴팁을 제공한다. Link 유형도 비활성화 상태를 포함하도록 Button의 link variant로 표시한다. 기본 화면은 흰색 배경과 기존 black/white 색상 체계를 사용하며 테마 선택 UI는 두지 않는다. 섹션 앵커는 사이트 헤더 높이와 여유 공간을 scroll margin으로 확보해 제목이 가려지지 않게 한다. 예시는 Brand·Link·Plain·Chip·Icon·Filter Trigger·Header Search와 Social·Load More 옵션을 포함한다. Form 탭은 제공된 Forms·Dropdown Menu Figma 범위에 따라 Input Fields·Dropdown Selection·Checkbox·Radio·Dropdown Menu만 표시한다. Input Fields는 Default·Focus·Typing·Error 상태와 기본·Password·Phone Number·Number·Open Text Area 타입을 비교하며, Dropdown Selection은 기본·선택·오류·비활성화, Checkbox·Radio는 기본·선택·비활성화 상태를 나눠 보여준다. Dropdown Menu는 텍스트·아이콘·이미지 목록 타입을 제공한다. 각 케이스의 예제 코드는 복사 가능하고, 메뉴와 입력 값은 화면 내에서 미리보기 조작이 가능하다. 기존 주소·이메일·검색·세그먼트·액션·수량 보조·글자 수·인증 카운트다운 샘플은 Form 가이드에서 제외한다. 예제는 JSX 구문 색상 렌더러·복사 아이콘·상단 알림을 사용하며, PC에서는 오른쪽 sticky 타임라인을, 모바일에서는 한 열 카드와 바로가기를 사용한다. 모달·뱃지 탭은 예시 준비 중 안내를 표시한다. 페이지 하단 `#top` 링크는 메인 영역으로 이동한다. 라우트·metadata·정적 페이지 헤더와 하단은 `page.tsx` Server Component가 소유하고, 상태와 상호작용은 `FormGuide`·`ButtonGuide`·`TypographyGuide` Client Component가 소유한다. 공통 운영 폼 API는 수정하지 않았다. 출처는 위 `working_tree_sources`의 publishing-guide 파일이다.

## 첨부 디자인·소스 대조 (2026-10-29)

회원가입·로그인·고객센터·마이페이지·장바구니·주문의 첨부 이미지를 소스와 대조했다. `storybookLinks.ts`의 `screenReviewNotes`와 플랫폼별 확인 상태를 IA 표시·검색에 연결한다. 외부 override가 확인값보다 우선하며, 변경하지 않은 기존 퍼블리싱 상태를 새 검수 완료로 간주하지 않는다. 주문 PC 디자인 수정예정, 장바구니 MO 완료 등 사용자 직접 확인을 유지한다. [상세 근거와 제한](https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/design-source-comparison-2026-10-29.md)을 참고한다.

## 첨부 시안의 라우트 구현 반영 (2026-10-29)

주문·장바구니 PC 배치, 신청내역 전용 라우트 본문과 계정 잠금 이동·홈 링크를 반영했다. 기존 라우트와 App Router 소유권은 유지하며 전용 신청내역을 page.tsx에 직접 구성했다. [구현 범위·출처·검증](https://github.com/nalpari/hoka-fo-pub/blob/5db7492d7013d077712245026ece97b1f39a130d/okf/architecture/design-implementation-2026-10-29.md).

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

## 회원등급 시안 적용 (2026-10-30)

`/mypage/rewards` 경로와 client page 경계를 유지하고 `_components/RewardsContent.tsx`가 배지·진행바·혜택 UI, `rewards-data.ts`가 고정 표시 데이터를 소유한다. PC Storybook을 추가해 IA 195의 WEB 연결을 등록했다. 공통 MyPageFrame·플랫폼 판별·탐색 계약은 변경하지 않았다. [시안 값과 검증](ui.md#회원등급-시안-적용-2026-10-30)을 참고한다.

## 재입고 PC·모바일 디자인 연결 (2026-10-30)

`/mypage/restock-alerts`와 `/mypage/restock-alerts/preview-empty`는 기존 공용 `MyPageProductHistory`를 유지한다. Figma `2025:152235`의 PC/MO 목록·빈 상태를 재입고 분기에 반영했고 IA 184에 WEB Storybook `pages-마이페이지-3-재입고-알림-상품-web--restock-alerts`를 추가했다. 직접 URL·previewRoutes·Mobile story 연결은 유지한다. 출처는 `src/app/screen-index/screenConnections.ts`, `src/app/screen-index/sourceGraph.generated.json`의 작업 트리다.

## 배송지 관리 시안과 고정 경로 (2026-10-30)

`/mypage/addresses`·`/mypage/addresses/preview-empty`·`/mypage/addresses/preview-new`·`/mypage/addresses/preview-edit`는 기존 page 진입점·App Router 경계를 유지하며 공유 AddressList/AddressEditor의 PC/MO 표현을 갱신했다. 기존 preview-error도 동일 편집기를 계속 사용한다. 추가 라우트와 IA 번호는 만들지 않았고 기존 screenConnections의 기본/상태 연결을 보존했다. 수정 preview는 독립 editPreviewAddress fixture를 사용하며 breadcrumb을 실제 추가/수정 상태에 맞췄다. 서비스 저장이나 완료 탐색을 새로 추가하지 않았다.

[실측 디자인과 검증](ui.md#배송지-관리-figma-적용-2026-10-30)을 참고한다. 작성: codex/gpt-6, 2026-10-30T08:31:03Z. 출처: 위 작업 트리 컴포넌트와 기존 네 경로의 page.tsx.

배송지 네 경로의 PC/MO 직접 진입, Next production build와 app-router/preview-links 검사 7개를 확인했다. IA 203의 목록/빈 목록과 IA 204·205의 추가/수정 연결은 기존대로 유지한다.

## 회원정보 조회·수정 Figma 적용 (2026-10-30)

`/mypage/profile`과 `/mypage/profile/preview-edit`는 기존 진입점을 유지한다. 공통 ProfileEditForm이 수정 화면 제목·기본정보·폼을 소유하므로 직접 preview에서도 전체 맥락이 보인다. 새 URL·page export·플랫폼 판단·MyPageFrame은 추가/변경하지 않았다. 기존 인증번호·만료·비밀번호 완료 preview는 기존 컴포넌트를 계속 사용한다. 디자인 [1813:89280](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1813-89280)과 관련 작업 트리 TSX가 출처이며 PC/모바일 실제 두 경로와 Next.js build를 확인했다.

## 쿠폰 시안과 기존 상태 URL (2026-10-30)

[쿠폰 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1716-80655)을 /mypage/coupons와 기존 preview-empty·preview-error·preview-complete·preview-detail에 공유 적용했다. 새 라우트는 추가하지 않았다. IA 196의 기본·빈 목록·등록 오류·등록 완료 링크와 IA 197의 상세 URL을 유지하며, IA 196에 PC Storybook pages-마이페이지-6-쿠폰-web--coupons 연결을 추가했다. 기존 Mobile ID를 유지하고 두 플랫폼에 임직원 스토리를 추가했다. sourceGraph.generated.json은 정식 screen-files로 재생성했다.

현재 구현은 src/app/mypage/coupons/_components/CouponManagement.tsx, 기존 상태 page.tsx, src/stories/features/mypage/MyPage.Coupons.{Web,Mobile}.stories.tsx 및 screenConnections.ts 작업 트리다. 화면 진입점과 외부 데이터 연결 소유권은 유지한다. [화면 규격·검증](ui.md#쿠폰-figma-적용-2026-10-30)을 함께 참조한다.

## 퍼블리싱 가이드 import 정리 (2026-10-30)

src/app/publishing-guide/_components/HelpTipsGuide.tsx의 import 그룹·named binding 순서만 정리했다. /publishing-guide의 경로와 page 진입점·컴포넌트 동작은 유지한다. 관련 소스 ESLint·Prettier 검사를 통과했다.

## 화면 연결 그래프 재생성 (2026-10-30)

npm run screen-files로 sourceGraph.generated.json을 현재 소스에 맞춰 재생성했다. 주소 관리의 platform 참조와 EmptyState 제거, 회원정보의 Divider 제거 및 ProfileContent 진입 파일을 반영했다. 경로·상태 URL은 변경하지 않았다. 출처는 scripts/screen-files.mjs와 src/app/screen-index/sourceGraph.generated.json 및 두 화면의 현재 import다. 기존 tests/screen-files.test.mjs 1개를 통과했다.

## 주문서 기본 경로의 표시 전용 동작 (2026-11-02)

`/checkout`은 기존 URL과 선택 상품 쿼리 `selected`를 유지하며 장바구니 표시 데이터를 주문서 화면에 배치한다. 결제 제출 요청·검증·완료 상태 전환과 장바구니 항목 삭제 흐름을 경로에서 제거했다. 고정 empty/error/complete preview URL은 각각 시안 상태를 직접 보여주는 기존 화면으로 유지하며 기본 주문서와 제출 흐름을 공유하지 않는다.

## 장바구니 페이지 마크업 경량화 (2026-11-02)

`/cart`와 기존 empty·limit·options preview URL은 유지한다. 기본 페이지는 상품 행 fixture를 전달하고 요약 금액은 `cart-preview.ts`의 고정 표시값으로 렌더링한다. 합계 props와 계산 흐름은 두지 않는다. 선택·수량·관심상품·옵션 dialog는 화면 확인용 로컬 상태이며 주문·삭제·저장 요청은 연결하지 않는다. 출처: `src/app/cart/page.tsx`, `src/app/cart/_components/CartProductSection.tsx`, `CartOrderActions.tsx`, `cart-preview.ts`.

상단 삭제 버튼의 반응형 크기를 조정했으며 URL·page 진입점·preview 연결에는 영향이 없다. 검토 범위: `src/app/cart/_components/CartProductSection.tsx`.

## 디자인 상태 링크 지침 검토 (2026-11-02)

`src/app/screen-index/screenConnections.ts`와 `src/app/screen-index/page.tsx`의 기존 route·previewRoutes·진입점 구조를 검토했다. 이번 작업은 저장소 외부의 상태 링크 작업 지침 작성이며 앱 라우트·상태 URL·IA 연결을 추가하거나 수정하지 않았다. 기존 라우팅 설명에 영향은 없다.

출처: 사용자 확정 작업 범위와 위에 명시한 현재 저장소 파일. 검토 기준 HEAD: `14adcf0032c01a50ced619fb565e46a1d262f925`. 검토·기록 시점: 2026-11-02T09:21:14Z. 기존 출처·신뢰 상태는 유지하며 전체 작업 트리 재검증을 의미하지 않는다.

## 디자인 상태별 IA 링크 조사 (2026-11-02)

사용자가 지정한 10개 디자인 영역의 제품 상태와 현재 작업 트리의 IA 연결·초기 표시를 대조했다. 같은 상태의 PC/MO는 하나로 세고 가이드·SNS 로고·비어 있는 프레임·스크롤/viewport 중복은 별도 상태에서 제외했다. **확인된 직접 링크 누락은 14개이며, 기존 URL의 초기 표시 불일치는 별도로 1개다.** 이는 제품 상태에 진입하는 링크 기준이며 전체 화면의 시각적 일치 판정은 아니다.

| IA  | 누락된 직접 상태                                                  | 디자인 근거(PC / MO)                                                                                                                                                                                                                                                                                                                                                                                                                               | 현재 확인 방식·부족한 점                                                                                                                                                        |
| --- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 216 | 반품 안내 · 상품 반품안내 (2개)                                   | [1973:15433 / 1973:15598](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15433); [1973:15513 / 1973:15391](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15513)                                                                                                                                                                                                                     | `/support/after-sales`는 배송 안내로만 시작한다. 다른 두 탭은 클릭해야 하며 초기 선택 URL을 읽지 않는다.                                                                        |
| 217 | 의류/용품 (1개)                                                   | [1973:15740 / 2089:59120](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15740)                                                                                                                                                                                                                                                                                                                                     | `/support/care`는 신발로 시작한다. 의류/용품은 탭 클릭만 가능하다.                                                                                                              |
| 171 | 배송지 수동입력 · 배송 요청사항 직접입력 (2개)                    | [2268:71186 / 1992:84531](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2268-71186); [2268:71887 / 1985:77723](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2268-71887)                                                                                                                                                                                                                     | `/checkout`는 저장 배송지와 요청사항 미선택으로 시작한다. `/checkout/preview-error`는 오류를 동반하므로 정상 수동입력 상태를 대신하지 못한다.                                   |
| 177 | 로그아웃 확인 팝업 (1개)                                          | [1487:38008 / 1413:131451](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1487-38008)                                                                                                                                                                                                                                                                                                                                    | 기존 LogoutDialog는 있으나 기본 URL에서 닫혀 있고 IA에는 열린 상태 URL이 없다.                                                                                                  |
| 196 | 임직원 쿠폰 (1개)                                                 | [1813:88657 / 1716:80770](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1813-88657)                                                                                                                                                                                                                                                                                                                                     | 표현 컴포넌트와 employee 옵션은 있지만 `/mypage/coupons` 기본 진입은 일반 회원이며 임직원 URL이 없다.                                                                           |
| 203 | 배송지 삭제 확인 팝업 (1개)                                       | [1978:60399](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1978-60399)                                                                                                                                                                                                                                                                                                                                                  | 삭제 확인 컴포넌트는 있으나 IA에는 목록·빈 목록·추가·수정·오류만 연결되어 있다.                                                                                                 |
| 223 | 아이디 저장 도움말 열림 (1개)                                     | [957:29137 / 957:28912](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-29137)                                                                                                                                                                                                                                                                                                                                        | `/login`의 HelpToggletip을 눌러야 열리며 초기 열림 URL이 없다.                                                                                                                  |
| 253 | 알뜰폰 사업자 · 필수 약관 · 선택 약관 · 이전 약관 선택 팝업 (4개) | [957:30325 / 957:29872](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-30325); [957:30407 / 957:30114](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-30407); [957:30430 / 957:30138](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-30430); [957:30452 / 957:30161](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-30452) | 인증 초기 fixture의 detail은 null이다. 현재 이전 약관 조작은 “이전 약관이 없습니다.” 안내이며 디자인의 시행일 선택 팝업과 다르다. 선택 약관의 구분도 별도 구현 대조가 필요하다. |
| 236 | 필수 약관 상세 팝업 (1개)                                         | [957:36946 / 957:36893](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-36946)                                                                                                                                                                                                                                                                                                                                        | `/signup/terms`의 detail은 null로 시작한다. 약관 상세는 클릭 가능하지만 열린 상태 URL이 없다.                                                                                   |

초기 표시 불일치 1개: IA 253의 `/login/account-locked/verification/preview-expired`는 만료 안내를 인라인으로만 표시하고 dialog는 열지 않는다. [입력시간 초과 팝업 957:30397](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-30397)은 열린 모달이므로 같은 상태를 재현하지 못한다. `PhoneVerificationContent`의 expired prop과 별도로 `PhoneVerificationStatePreview`가 만료 상태에서 이 prop을 전달하지 않는 현재 구성을 확인했다.

대조한 디자인 범위: [배송·반품](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15355), [세탁·손질](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15638), [장바구니·주문](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=962-5160), [마이페이지](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=389-9339), [회원가입](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=127-1333), [로그인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-28876), [아이디·비밀번호 찾기](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-29175), [아이디 확인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-29425), [비밀번호 재설정](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-29538), [계정 잠금 해제](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=957-29748).

장바구니 옵션/수량 제한, 주문·배송·취소/반품 목록/상세·신청, 리뷰·관심상품·최근 본 상품·재입고 알림, 회원정보, 러닝세션 취소, 아이디 확인·잠금 안내, 비밀번호 변경 완료, 가입 본인인증·부가정보·마케팅 수신내역·가입 완료는 기존 연결을 확인해 위 누락 수에서 제외했다. 기존 preview 페이지의 IA 연결·경로 검사 5개는 통과했다. 이 검사는 디자인에만 있고 아직 URL이 없는 상태를 자동으로 찾아내지는 않는다.

앱 코드·IA·상태 URL은 수정하지 않았다. 조사 결과는 현재 미커밋 작업 트리를 포함한 관측이며 후속 변경 시 재확인이 필요하다. 출처: 사용자 지정 디자인 노드, `src/app/screen-index/screenConnections.ts`, `src/app/screen-index/_components/IaStructurePage.tsx`, 표에 대응하는 route/preview와 표시 컴포넌트, `tests/preview-links.test.mjs`. 검토 HEAD: `14adcf0032c01a50ced619fb565e46a1d262f925`. 조사·기록: codex/gpt-6, 2026-11-02T09:31:43Z.

## 전체 화면 퍼블리싱 인계 (2026-11-02)

기본 URL과 preview URL은 기존 라우트 표현을 공유한다. PC/MO는 같은 URL의 자동 플랫폼으로 확인하며 로그인·저장값·이전 방문을 요구하지 않는다. 회원정보 8개, 주문 5개, 리워드 2개, 상품 옵션 안내 1개, 러닝 신청 안내 2개를 직접 열 수 있도록 기존 IA에 추가했다. 동적 preview slug는 명시 목록만 허용하고 나머지는 notFound로 처리한다. 원본 route·IA 번호·stories는 유지했다. 내부 도구 /screen-index·/publishing-guide와 기존 alias /support/mileage는 고객용 IA 신규 행으로 만들지 않는다.

[전체 화면 인계표](../development/markup-handoff.md)는 기본/상태 URL, IA, 기존 표현 근거와 실제 검사 범위를 연결한다.

출처: 현재 작업 트리의 위 구현과 대응 stories. 기준 HEAD: `eee69f7b80ddde079e0b634997df7f047f8e1809`; 검토·기록: codex/gpt-6, 2026-11-02T09:44:32.550Z. 기존 출처와 draft 신뢰 상태는 유지한다.

### 인계 상태 18개 직접 연결 완료

회원정보 확인창 8개, 주문 신청·확인창 5개, 리워드 loading/error 2개, 상품 옵션 필수 안내 1개, 러닝 신청 안내 2개를 원본 IA의 `previewRoutes`와 `sourceFiles`에 등록했다. 프로필·주문의 동적 preview는 명시된 slug만 허용하며 기본·기존 전용 경로를 보존한다. PC/MO 링크를 나누지 않는다. [인계표](../development/markup-handoff.md)에 각 확인 URL·IA·근거와 PC/MO 검증을 기록했다. 전체 222개 URL·444개 직접 진입 확인에 포함된다.

출처: `src/app/mypage/profile/profilePreviews.ts`, `src/app/mypage/orders/orderPreviews.ts`, 해당 preview 진입점과 `screenConnections.ts`. 표현 소유자는 `d0f4581f`에서 정리했고 소스 그래프는 정식 생성 명령으로 다시 생성했다. 기록: codex/gpt-6, 2026-11-02.

## 디자인 상태 직접 링크 구현 (2026-11-02)

앞선 조사에서 확인한 14개 직접 링크 누락과 잠금 해제 만료 팝업의 초기 표시 불일치를 해소했다. PC/MO 동일 상태는 아래 하나의 반응형 URL을 공유한다. IA 원본 행·번호·기본 route·Storybook 연결은 유지한다.

| IA  | 상태                   | 직접 URL                                                    |
| --- | ---------------------- | ----------------------------------------------------------- |
| 171 | 배송지 수동입력        | `/checkout/preview-shipping`                                |
| 171 | 배송 요청사항 직접입력 | `/checkout/preview-delivery-request`                        |
| 177 | 로그아웃 확인          | `/mypage/preview-logout`                                    |
| 196 | 임직원 쿠폰            | `/mypage/coupons/preview-employee`                          |
| 203 | 배송지 삭제 확인       | `/mypage/addresses/preview-delete`                          |
| 216 | 반품 안내              | `/support/after-sales?tab=product-returns`                  |
| 216 | 상품 반품안내          | `/support/after-sales?tab=return-cautions`                  |
| 217 | 의류/용품              | `/support/care?tab=apparel`                                 |
| 223 | 아이디 저장 도움말     | `/login/preview-help`                                       |
| 236 | 필수 약관 상세         | `/signup/terms/preview-detail`                              |
| 253 | 알뜰폰 사업자          | `/login/account-locked/verification/preview-carriers`       |
| 253 | 필수 약관              | `/login/account-locked/verification/preview-required-terms` |
| 253 | 선택 약관              | `/login/account-locked/verification/preview-optional-terms` |
| 253 | 이전 약관 선택         | `/login/account-locked/verification/preview-previous-terms` |

기존 `/login/account-locked/verification/preview-expired`는 처음부터 열린 만료 팝업을 표시한다. 제목은 “계정잠금해제”, 본문은 “입력시간이 만료되었습니다”와 인증번호 재요청 안내다. PC 568px·MO 343px(375px viewport)로 표시하며 확인·Escape·닫기는 팝업만 닫는다. 가입 휴대폰 인증의 기존 만료 preview는 변경하지 않는다.

배송/세탁 안내는 기존 `SupportTabs`의 `syncQuery` 모드가 `useSearchParams`와 `useRouter`로 `tab`을 읽고 갱신한다. 빈 값·없는 값·알 수 없는 값은 기존 기본 탭을 표시하며 URL을 임의 정규화하지 않는다. 다른 query를 보존하고 탭 변경을 history에 기록한다. Suspense는 해당 모드 내부에 둬 기존 Storybook/controlled 소비자는 router에 의존하지 않는다. `sourceFiles`에 11개 새 route 진입점을 추가했고 그래프는 정식 생성 명령으로 갱신했다.

출처: 사용자 확정 14개 상태와 앞선 디자인 조사 노드, 현재 변경 소스·고정 fixture. 작업 기준 HEAD: `eee69f7b80ddde079e0b634997df7f047f8e1809`. 기록: codex/gpt-6, 2026-11-02T09:59:35Z.

## 상품상세 옵션 입고 알림 상태 URL (2026-11-03)

[디자인 노드 3773:5339](https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP?node-id=3773-5339)의 옵션 입고 알림은 `/products/preview-restock`으로 직접 확인한다. 기존 `RouteContent`의 `preview="restock"`을 사용하며 PC/MO는 같은 URL을 공유한다. 새 page는 라우트 진입만 담당하고 UI는 기존 `[id]/_components/ProductDetailContent.tsx`가 소유한다.

`screenConnections.ts`의 상품상세 공통 연결(`eland_hca_02`)에 `옵션 입고 알림` 상태와 진입 파일을 추가했다. 기본 `/products/shoe-1`·상품문의 없음 상태·기존 WEB/Mobile Storybook 연결은 유지한다. `npm run screen-files`로 그래프를 생성했고 변경 전 그래프와 비교해 추가된 import가 preview 진입 하나뿐임을 확인했다. IA의 상태명/URL 검색 및 실제 링크 클릭으로 대상 URL의 300 초기 선택 화면을 확인했다. 인증·저장값·선행 조작 없이 열리며 알림 신청 요청은 하지 않는다.

## 상품상세 인계 병합 정리 (2026-11-03)

출처: `src/app/products/[id]/_components/ProductDetailContent.tsx`. 전체 화면 인계와 옵션 입고알림 변경이 병합되며 제거된 구매 콜백·router·setError 참조가 남아 발생한 타입 오류를 정리했다. 구매 CTA의 요청 콜백과 submit 경로는 제거하고 품절/입고알림 표시와 옵션·수량·관심 토글·이미지 열람만 로컬 UI로 유지한다. 금액은 준비된 표시값이며 수량에 따른 합계를 계산하지 않는다.

기존 `/products/shoe-1`, `/products/preview-restock`, `/products/preview-empty-inquiries`, `/products/preview-options-required`를 재사용한다. `RouteContent.preview`에 기존 `selection-required` 타입을 복원했고 옵션을 선택해도 해당 고정 안내는 유지된다. 새 상태 URL·IA 행·provider는 추가하지 않았다. page 진입점과 `_components` 소유권, 이미지 뷰어의 기존 동적 경계·닫기·포커스 복원은 유지했다.

검증: Next 프로덕션 빌드(타입 포함)·Panda·Storybook 빌드·상태 링크 검사 6개·변경 파일 lint/format 통과. PC 1600/MO 375에서 네 URL 직접 접근, 옵션 선택 후 필수 안내 유지와 CTA 복원을 확인했다. 개발 서버의 EPERM 오류는 개발 캐시 보관 후 재시작으로 해소했다.

## 주문·반품 페이지 구성 검토 (2026-11-03)

`/mypage/orders`와 `/mypage/returns` 경로 및 페이지 진입 구조는 변경하지 않았다. 주문 현황 표시를 한 `Grid`의 PC·모바일 반응형 값으로 정리하고 한 번만 쓰이는 주문 상태 조각을 부모 JSX에 합쳤다. 라우팅 지식에 영향이 없는 것을 주문·반품 route와 해당 `_components` 범위에서 검토했다. 기간 입력 달력 아이콘과 날짜·조회 글자 크기 변경도 동일 컴포넌트의 표시 스타일만 바꾸며 URL, 날짜 값, 조회 콜백에는 영향이 없다. 모바일 주문 카드의 `주문 취소` 버튼도 표시 전용이며 새 경로나 취소 완료 이동을 연결하지 않았다.

## 주문 route 전용 화면 모듈 (2026-11-03)

`/mypage/orders`와 `/mypage/returns` 진입점, 주문 preview 및 주문 Storybook은 `src/app/mypage/orders/_components/OrdersPage.tsx`를 직접 사용한다. 페이지 전용 화면 컴포넌트는 같은 `_components` 아래 역할별로 나누고 기존 URL과 `src/components/orders`의 데이터·정책 모듈은 유지한다.

### 주문 상세 모바일 breadcrumb 표시 (2026-11-03)

`/mypage/orders/preview-detail`과 목록에서 상세로 들어온 화면은 기존 URL·`OrdersPage` 상태 소유권을 사용한다. `OrdersContent`가 상세 보기일 때 `MyPageFrame.hideMobileBreadcrumbs`를 설정해 모바일에서만 경로 표시를 숨긴다. PC breadcrumb와 다른 마이페이지 화면의 경로 표시에는 영향이 없다. 출처: `src/app/mypage/orders/_components/OrdersContent.tsx`, `src/components/mypage/MyPageFrame.tsx` 작업 트리.

취소·반품 상세는 기존 `/mypage/orders/preview-cancel-detail`, `/mypage/orders/preview-return-detail` URL과 `OrdersPage` 상태 소유권을 유지한다. `OrdersContent`는 claim 보기에도 모바일 breadcrumb를 숨기고 제목 위 24px 여백을 제공한다. 두 고정 URL의 PC·모바일 렌더링과 1024/1025/1199/1200px 전환을 확인했다. 출처: `OrderDetails.tsx`, `OrdersContent.tsx` 작업 트리와 Ego 브라우저 검증.

취소·반품 상세 주문일자/주문번호의 플랫폼별 타이포 수정은 `OrderClaimDetail` 내부 표시 변경이며 기존 preview URL과 상태 소유권은 유지한다(2026-11-03).

### 배송조회 PC 팝업 크기 (2026-11-03)

Figma `2121:63862`의 팝업 `2121:64323` 기준으로 `OrderTrackingDialog` PC 창을 420px에서 568px(`ModalDialog.size=md`)로 수정하고 높이 804px, 헤더 56px를 지정했다. 기존 최대 높이 `100dvh - 48px`와 본문 스크롤, 모바일 Drawer는 유지한다. `/mypage/orders/preview-tracking` URL과 닫기 동작 소유권은 그대로다. 출처: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2121-63862 및 `src/app/mypage/orders/_components/OrderTrackingDialog.tsx` 작업 트리. 이번 범위는 창 크기이며 내부 텍스트·표 스타일은 별도다.

### 주문 취소 신청 진입 연결 (2026-11-03)

주문 목록의 결제완료 그룹 `주문 취소` 버튼은 `OrderCardActions.onCancel(order)`를 통해 `OrdersPage`가 소유한 `cancelId`를 설정한다. 선택한 주문을 `OrderCancelRequest`에 전달하며 닫으면 원래 목록을 유지한다. `/mypage/orders/preview-cancel-request`는 기존 클레임 상세가 아닌 동일 신청 팝업을 바로 연다. 반품 신청 경로와 상세 화면은 이번 변경 범위 밖이다. screen-index IA 178의 기존 신청 링크를 유지하고 source graph를 재생성했다.

Figma PC `2203:77591`, 모바일 `2203:76651`을 기준으로 568px PC 모달·모바일 하단 팝업에 상품 체크, 수량, 사유, 상세내용, 고정 금액을 배치했다. 입력은 로컬 초안이며 실제 취소 요청·금액 계산·완료 이동은 미연결이다. 데이터는 전달된 `order.items`를 사용한다. 출처: `OrdersPage.tsx`, `OrdersProducts.tsx`, `OrderClaimRequest.tsx`, `orders/[preview]/page.tsx` 작업 트리 및 사용자 Figma 섹션 `2203:76650`.

주문 취소 신청의 사유 선택은 공통 `Dropdown`을 사용한다. `label="사유"`, `required`, `value={reason}`, `onValueChange={setReason}`으로 제목·필수 표시·선택 상태를 연결하고 중복 FormField와 native Select를 제거했다. 신청 진입 URL은 유지한다. 출처: `OrderClaimRequest.tsx`, `common/atoms/Dropdown.tsx` (2026-11-03).

공통 Dropdown의 `layer="modal"`은 포털 z-index를 120으로 지정해 ModalDialog(100) 위에서 옵션을 클릭할 수 있게 한다. 기본 layer는 기존 10을 유지한다. 취소 사유에만 modal 옵션을 적용했다.

### 환불 신청 연결 (2026-11-03)

OrderClaimRequest의 kind 옵션으로 취소와 반품 신청을 공유한다. 배송완료 주문의 환불 신청 버튼은 onReturn(order)를 통해 선택한 주문의 팝업을 열고, /mypage/orders/preview-return-request는 같은 화면을 직접 연다. 반품은 수량 조절 없이 상품 체크와 사유·상세내용을 입력하며 회수 안내·환불예정금액을 표시한다. 실제 환불 요청·계산은 미연결이다. 출처: OrderClaimRequest.tsx, OrdersPage.tsx, OrdersProducts.tsx 및 Figma 2203:90945, 2203:76721. IA 178의 기존 주소는 유지하고 source graph를 재생성했다.

반품 신청의 반품비 값 색상 조건 수정은 OrderClaimRequest의 표시 변경이며 기존 신청 URL과 진입 동작은 유지한다(2026-11-03).

신청 예정금액의 숫자/원 단위 타이포 분리는 표시 변경이며 기존 취소·반품 신청 URL은 유지한다(2026-11-03).

## 취소·반품 목록 시안 정렬 (2026-11-03)

Figma 섹션 `2134:82959`의 PC `2134:84176`, 모바일 `2158:69893`과 빈 목록 `2134:85212`, `2134:83029`를 대조했다. OrdersList는 96px 이미지, PC 20px 표 제목·16px 본문·주문번호 별도 행, 모바일 14px 본문·24px 카드 간격을 사용한다. 모바일 완료 상태는 우측 아래 회색(#777) 환불완료 텍스트, PC는 취소완료/환불완료 일반 텍스트다. 옵션은 보조색, 주문번호는 3차색으로 구분한다. 빈 목록은 PC 상하120px·16px, 모바일 상하96px·14px다.

기간 필터의 PC 순서는 1년/6개월/3개월/1개월/직접설정, 모바일은 역순 기간 뒤 직접설정이며 기본 날짜는 2026.01.01~2026.08.30이다. 일반 주문 목록의 필터 기본값은 유지한다. `/mypage/returns`와 `/mypage/returns/preview-empty` 주소 및 기존 두 건의 주문 fixture, 상세 선택 연결을 유지한다. 출처: OrdersList.tsx, OrdersStatus.tsx, OrdersContent.tsx, OrdersPage.tsx 작업 트리.

검증: 로컬 1920px/375px 렌더링, 모바일 가로 넘침 없음·96px 이미지·14px #777 상태, 반품 상세 진입과 빈 목록 문구를 확인했다. Panda 생성 성공. 전체 tsc는 기존 `.next/types`의 삭제 라우트 참조 오류로 실패했고 소스 오류는 없었다. ESLint는 설치된 eslint-plugin-perfectionist를 찾지 못해 실행 실패했다.

## 취소·반품 상세 표시 데이터 경계 정리 (2026-11-03)

OrderClaimDetail은 order 대신 준비된 ClaimDetailDisplay를 받는다. 기존 선택적 previewDisplay 우선 적용을 제거하고 OrderClaim.detailDisplay에 PC·모바일 표시값과 완성된 items를 명시했다. OrdersContent가 현재 플랫폼의 display를 전달한다. 상세 컴포넌트는 옵션·수량·금액을 덮어쓰거나 상태·사유·날짜를 추론하지 않으며, Typography 포맷과 배치·onList만 유지한다. 실제 조회·표시 모델 구성과 갱신은 연결 소유자 책임이다. 기존 직접 URL과 상세 선택은 유지한다.

출처: src/components/orders/orders.types.ts, orders.data.ts, src/app/mypage/orders/_components/OrderDetails.tsx, OrdersContent.tsx 및 정식 명령으로 재생성한 sourceGraph.generated.json 작업 트리. 검증: 이전 커밋에서 렌더링하던 값과 새 fixture의 취소/반품 × PC/MO 네 조합을 비교해 완전 일치 확인; Panda 생성 성공. tsc는 기존 .next/types 오류로 실패했으나 src 오류는 없었다. 이번 구조 변경에서 브라우저 시각 검증은 재실행하지 않았다.

## 주문 상세 마크업 책임 정리 (2026-11-03)

OrderDetail도 OrderDetailDisplay를 직접 받는다. activeItems·claimGroups·history·받는사람·결제수단·각 금액과 상태 문구는 orders.data.ts의 명시적 고정 fixture이며 원본 주문으로부터 런타임에 생성하지 않는다. 컴포넌트의 filter/some, 모바일 slice, PC Array.from 복제, 옵션/수량/금액 덮어쓰기와 금액 fallback을 제거했다. DetailProduct는 받은 상품만 표시하며 미제공 금액을 0원으로 가정하지 않는다. 플랫폼은 배치와 fixture 선택에만 사용한다. 개발팀은 실제 데이터의 분류·상태 결정·금액 계산과 조회 갱신을 연결한다.

OrdersContent는 현재 선택한 주문의 준비된 display와 화면 확인용 콜백을 전달한다. claimId로 해당 상세를 선택하는 기존 로컬 탐색과 배송조회·목록·리뷰 주소·삭제 확인 URL을 유지한다. 이 변경에 API·요청·저장·완료 처리는 추가하지 않았다. 작업 트리 출처: OrderDetails.tsx, OrdersContent.tsx, orders.types.ts, orders.data.ts, sourceGraph.generated.json.

검증: 변경 전 4개 주문의 PC/MO 표시값 8조합과 새 고정 fixture의 완전 일치를 비교했다. 런타임 소스에 filter/slice/Array.from/flatMap/detailPreview/상태 lookup이 남지 않음을 확인했다. Panda 생성 성공. 전체 tsc는 기존 .next/types 오류로 실패했으며 src 오류는 없었다.

추가 브라우저 확인: /mypage/orders/preview-detail의 PC 1920px·모바일 375px 본문과 표시 금액, 모바일 가로 넘침 없음, 반품상세보기 클릭 후 반품 상세 진입을 확인했다.

## 취소·반품 목록 표시 데이터 분리 (2026-11-03)

ClaimHistoryList는 준비된 ClaimHistoryItem[]을 items로 받아 단순 반복한다. getClaimLines 기반 상품 추출·수량 대체, 주문/클레임 중첩 순회와 상태 판단을 제거했다. ClaimHistoryProduct도 claim 대신 상태 문자열을 받는다. PC/MO 상태 문구, 날짜·주문번호·상품은 previewClaimHistory 고정 fixture에 명시한다. 빈 화면은 items.length로 표시하며 색상·타이포·간격은 유지한다.

OrdersPage의 claimHistoryItems는 현재 전달된 props를 표시한다. 외부 initialOrders 사용 시 준비된 목록 행도 함께 전달해야 하며 생략하면 빈 목록이다. 기본 데모만 previewClaimHistory를 사용한다. onHistoryDetail은 orderId/claimId 선택과 상세 화면 열기만 담당한다. 실제 상품 분류·수량/상태 결정·조회는 구현하지 않는다. 출처: OrdersList.tsx, OrdersContent.tsx, OrdersPage.tsx, orders.types.ts, orders.data.ts, sourceGraph.generated.json 작업 트리.

검증: 두 행의 PC/MO 상품·수량·날짜·상태가 기존 표시와 동일함을 비교했다. 목록 소스의 getClaimLines/flatMap/some/claim.state/kind 제거 확인, Panda 생성 성공. 로컬 PC/MO 목록 본문을 확인했다.

추가 검증: 모바일 목록 행 클릭 후 반품 상세 진입, /mypage/returns/preview-empty 빈 안내 확인. Prettier·OKF·diff 검사 통과. 전체 tsc는 기존 .next/types 오류로 미통과이며 src 오류는 없었다.

2026-11-03: OrdersListContent의 현황·기간 필터·주문/클레임 목록 호출부에 섹션 제목 JSX 주석을 추가했다. 표시·라우팅 변경은 없다. 출처: OrdersList.tsx.

2026-11-03 상품 행 재사용: OrdersList의 ClaimHistoryProduct를 제거하고 기존 OrderHistoryProduct의 onClick 옵션으로 상세 진입을 연결했다. 클릭 모드와 cartAction은 타입에서 함께 사용할 수 없으며 기본 호출부는 기존 div·장바구니 표시를 유지한다. OrderProductSummary의 선택적 amountLanguage=en으로 클릭 카드의 기존 숫자 폰트를 보존하고 기본 금액 표시는 유지한다. 출처: OrdersList.tsx, OrdersProducts.tsx, OrderProductSummary.tsx, sourceGraph.generated.json. 모바일 브라우저에서 96px 카드·가로 넘침 없음·중첩 버튼 없음·반품 상세 진입 확인.

2026-11-03: OrderClaimRequest의 예정금액 숫자는 web/mo heading7과 semibold를 명시한다. 현재 PC 28px·모바일 16px이며 PC 크기 변경은 이번 커밋에 포함하지 않는다. 경로·동작 변경 없음. 출처: OrderClaimRequest.tsx 작업 트리.

## 9개 디자인 영역의 IA 상태 링크 재조사 (2026-11-03)

사용자가 지정한 회원가입 `127:1333`, 로그인 `1:18`, 마이페이지 `389:9339`, 고객센터 `1983:50391`, 주문 `962:5160`, 오류 `577:10864`와 별도 Main/PLP/PDP 파일의 `206:340`, `2327:3687`, Launch Calendar `3696:9496`을 조사했다. 제품 소스·IA·상태 URL은 수정하지 않았다. 같은 상태의 PC/MO와 실제 내용이 같은 프레임은 합쳤다. 사용자 후속 지시로 사이즈 가이드는 데이터에 따른 중복 화면으로 보고 조사 결과의 누락 집계·추가 작업 대상에서 제외했다. 현재 읽은 디자인에서 확정한 직접 상태 링크 누락은 FAQ 답변 펼침 1개다. 읽지 못한 영역까지 포함한 전체 누락 수가 아니다. 아래 사이즈 가이드 6개 행은 조사 근거만 남기며 모두 범위 제외다.

| IA              | 화면·상태      | 디자인 노드(PC / MO)                                      | 현재 URL과 부족한 점                                                                                                                                                                                                          |
| --------------- | -------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 260 (범위 제외) | 신발 남성 inch | MO `2108:66543`                                           | `/support/size-guide`는 신발 남성 cm로 시작하며 단위를 URL에서 읽지 않는다.                                                                                                                                                   |
| 260 (범위 제외) | 신발 여성 cm   | PC `2169:39985` / MO `2227:58041`                         | 같은 기본 URL에서 성별을 직접 선택해야 한다.                                                                                                                                                                                  |
| 260 (범위 제외) | 신발 공용 cm   | PC `2169:40507` / MO `2227:59371`                         | 같은 기본 URL에서 성별을 직접 선택해야 한다.                                                                                                                                                                                  |
| 260 (범위 제외) | 상의 남성 표   | MO `2149:32804`, `2149:32979`                             | 기본 품목이 신발이며 상의 선택 상태의 IA URL이 없다. 두 프레임의 표 값은 같아 이름만으로 cm/inch 두 상태로 세지 않았다.                                                                                                       |
| 260 (범위 제외) | 하의 남성 표   | MO `2149:35768`, `2149:35943`                             | 기본 품목이 신발이며 하의 선택 상태의 IA URL이 없다. 두 프레임의 표 값은 같아 이름만으로 cm/inch 두 상태로 세지 않았다.                                                                                                       |
| 260 (범위 제외) | 상의 여성 표   | MO `2149:37063`, `2149:37249`, `2149:37897`, `2149:38083` | 섹션은 러닝 베스트·양말이지만 실제 이미지의 선택 탭·측정 설명·표는 상의 여성이다. 중복을 하나로 세며 별도 러닝 베스트/양말 상태로 확정하지 않는다.                                                                            |
| 207 (alias 185) | FAQ 답변 펼침  | MO `1973:16070`                                           | `/support/faq`의 펼침은 URL 상태가 아니다. 소스의 기본값은 PC 첫 질문, MO 닫힘이며 디자인의 질문은 “회원 혜택은 무엇인가요?”다. 초기 PC 첫 질문은 “회원 가입은 어떻게 하나요?”여서 이 시안의 고정 열림 URL을 대신하지 않는다. |

사이즈 가이드의 `SupportTabs`는 `defaultValue="shoes"`이고 `syncQuery`를 사용하지 않는다. `SizeGuidePanel`의 성별은 `category.genders[0]`, 단위는 `cm`인 로컬 상태다. 품목·성별·단위 상호작용은 이미 있으나 해당 상태를 고정해서 여는 계약이 없다. 신규 URL을 이번 조사에서 발명하거나 연결하지 않았다. 사용자 확정에 따라 이 데이터 변형에 대한 고정 상태 URL 추가는 필요 작업으로 간주하지 않는다.

적용 여부 미확정 1개: 로그인 페이지의 `123:903` 영역에 있는 [장시간 미입력 로그아웃 안내 `45:1394`](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=45-1394)는 대응 URL·제품 구현이 없다. 제목 “로그아웃 되었습니다.”와 본문의 “1분 뒤 로그아웃” 안내가 함께 있다. 현재 IA 177의 `/mypage/preview-logout`은 로그아웃 확인창으로 다른 상태다. 최신 `957:*` 로그인 시안과 별도 영역에 남아 있어 적용 대상 여부를 확정하지 않았다. 삭제 표시된 IA 232를 되살리지 않는다.

회원가입의 가입 여부·인증·약관·회원정보·부가정보·수신내역·완료, 최신 로그인·계정 잠금 해제의 도움말/사업자/약관/이전 약관/만료 팝업, 마이페이지의 표시 상태, 주문/장바구니 상태, 고객센터 배송/반품·세탁 탭·약관·문의 상태와 오류 3종에는 현재 IA 연결이 있다. 기존 연결의 존재와 픽셀 일치·전체 UI 동작 검증은 구분한다. 디자인 가이드·삼각형 주석·OS 파일선택 참고·viewport 중복은 제품 상태 수에서 제외했다.

미확정 범위: 별도 파일 [Main/PLP/PDP `206:340`](https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP?node-id=206-340), [`2327:3687`](https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP?node-id=2327-3687)은 이번 원본 읽기가 429 제한으로 실패했고 Figma 웹도 로그인 화면이어서 제품 노드를 확인하지 못했다. 재시도 안내에 따라 반복 호출하지 않았다. [Launch Calendar `3696:9496`](https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP?node-id=3696-9496)는 2026-11-03 10:14 KST의 이전 구조 자료에 Feed `3696:9681`, Upcoming `3696:10052`, In Stock `3696:9892`, Detail `3696:9503` 네 프레임이 있다. 현재 다른 작업의 미커밋 IA 159–162와 `/launch-calendar`, `/launch-calendar/upcoming`, `/launch-calendar/in-stock`, `/launch-calendar/clifton-11-gtx`에 각각 대응한다. 최신 세부 상태 재검수는 완료하지 않았으며 그 작업의 구현 완료 판정을 대신하지 않는다.

검증: 이번 구조화 읽기와 사이즈/FAQ 제품 이미지, IA·라우트 소스를 대조했다. localhost의 IA 검색 260에서 기본 사이즈 가이드 링크만 있고 STATE 행이 없음을 확인하고 실제 링크를 눌렀다. FAQ 모바일 관측은 hydration 완료를 기다리지 않아 초기 PC 표시가 섞였으므로 모바일 실행 검증으로 인정하지 않는다. FAQ의 직접 열림 미지원은 위 소스 계약을 근거로 판정했다. `node --test tests/preview-links.test.mjs` 6개가 통과했다. 전체 PC/MO 직접 진입·새로고침·resize·모달 회귀 검증과 빌드는 수행하지 않았다.

출처: 사용자 지정 Figma 9개 링크, `src/app/screen-index/screenConnections.ts`, `src/app/screen-index/_components/IaStructurePage.tsx`, `src/app/support/size-guide/page.tsx`, `src/app/support/size-guide/_components/SizeGuidePanel.tsx`, `src/app/support/faq/_components/FaqContent.tsx`, `src/app/support/faq/faq.data.ts`, 기존 route/preview와 `tests/preview-links.test.mjs`. 기준 HEAD: `c69358e5221beb6df59a17886835b44505b7a4dc`. IA·런칭 캘린더의 기존 미커밋 변경은 다른 작업의 출처로 구분했다. 조사·기록: codex/gpt-6, 2026-11-03T10:40:00+09:00. 기존 출처·generated 기록·draft 신뢰 상태는 보존한다.

## 런칭 캘린더 시안과 직접 화면 URL (2026-11-03)

[런칭 캘린더](launch-calendar.md)는 `/launch-calendar` Feed, `/launch-calendar/upcoming`, `/launch-calendar/in-stock`, `/launch-calendar/clifton-11-gtx` 상세를 추가한다. IA159~162의 기존 행과 번호에 route·WEB/Mobile Storybook을 연결하고 IA159에 상세 previewRoutes를 추가했다. 과거 목업 제거 기록의 `/launch-calendar` 미구현 설명은 이번 정식 시안 적용으로 대체된다. 삭제된 키즈 IA163~165는 유지한다. 기본/직접 진입·새로고침으로 표시 fixture가 열리며 로그인·저장·실제 신청 요청에 의존하지 않는다. PC 수급과 사용자 지정 RUN Club 방식 MO 대응은 별도 상태로 기록한다.

## FAQ 펼침·장시간 미입력 안내의 IA 상태 URL (2026-11-03)

사용자가 앞선 조사의 FAQ와 장시간 미입력 안내 두 항목을 명시적으로 구현 요청해 연결했다. 사이즈 가이드는 계속 제외하며 나머지 미조사 디자인의 판정은 변경하지 않는다.

| IA              | 상태                        | 직접 URL                         | 디자인 근거                                                                                          |
| --------------- | --------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 207 / alias 185 | 답변 펼침                   | `/support/faq/preview-expanded`  | [MO 1973:16070](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-16070) |
| 223             | 장시간 미입력 로그아웃 안내 | `/login/preview-session-timeout` | [45:1394](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=45-1394)          |

FAQ의 기본·빈 결과 URL과 stories는 보존했다. 기존 `RouteContent`의 `previewExpanded`와 `expandedFaqPreviewEntries` fixture로 디자인의 “회원 혜택은 무엇인가요?” 제목과 가입 안내 본문을 첫 항목에서 펼친다. fixture 항목 ID는 `preview-member-benefits`이며 기본 목록을 바꾸지 않는다. 펼침/접기·검색·분류는 기존 로컬 소유자를 사용한다. PC/MO는 같은 URL로 직접 진입하고 새로고침·resize 뒤 초기 펼침을 확인할 수 있다. 기본 FAQ는 기존 PC 첫 질문 펼침·MO 닫힘을 유지한다.

안내는 기존 로그인 `LoginContent.showSessionTimeout`과 `ModalDialog`를 재사용해 즉시 열린다. 문구의 “1분 뒤 로그아웃”은 디자인 표시이며 타이머·세션 만료 판정·로그아웃·새로고침 요청을 실행하지 않는다. 확인·Escape는 팝업만 닫고 URL을 유지한다. 직접 진입에는 트리거가 없어 `ModalDialog.finalFocus`의 선택적 전달 옵션으로 로그인 아이디 입력에 포커스를 복원한다. 이 옵션을 주지 않는 기존 모달의 동작은 그대로다. 이 시안의 PC 전용 프레임은 없어 같은 반응형 안내를 사용하며 PC 시안 일치로 주장하지 않는다.

두 preview 진입 파일을 `screenConnections.ts`의 기존 `previewRoutes`·`sourceFiles`에 추가했고 `npm run screen-files`로 그래프를 생성했다. 새 IA 번호·행·공용 구조도 UI는 만들지 않았다. 개발팀 연결 경계는 해당 FAQ·로그인 소유자의 `[ 개발팀 바인딩 ]` 주석에 기록했다.

검증: PC 1600px/MO 375px의 FAQ 초기 펼침·직접 진입·새로고침·마우스 접기·Enter 다시 펼침·같은 URL resize를 확인했다. 팝업 초기 열림·확인 버튼 초기 포커스·PC/MO resize 유지·직접 진입·새로고침·확인/escape 닫기·아이디 입력 포커스 복원을 확인했다. 기존 로그인 기본/오류/도움말과 FAQ 기본/빈 결과를 확인했다. IA 상태명·URL 검색과 두 실제 링크 클릭을 확인했다. 모바일 375px에서는 일반 스크롤바를 제외한 팝업 328px, PC에서는 343px이며 PC 1600px에서 가로 overflow가 없었다. 완전한 시각 일치·명시적 Storybook 플랫폼 실행·다른 모달 전체 회귀는 수행하지 않았다.

변경 파일 ESLint/Prettier, TypeScript, Panda, Next 프로덕션 빌드, Storybook 빌드와 preview-links/source-graph 기존 검사 7개가 통과했다. 출처: 위 Figma 노드·사용자 선택 두 항목, `src/app/support/faq/preview-expanded/page.tsx`, `src/app/support/faq/_components/FaqContent.tsx`, `src/app/support/faq/faq.data.ts`, `src/app/login/preview-session-timeout/page.tsx`, `src/app/login/_components/LoginContent.tsx`, `src/components/common/layouts/ModalDialog.tsx`, `src/app/screen-index/screenConnections.ts`, 생성 그래프와 해당 검사. 작업 시작 HEAD는 `c69358e5221beb6df59a17886835b44505b7a4dc`이며 동시 작업이 커밋된 뒤 검토 HEAD는 `889cf058339d51f9d36103e24e0732ab37fc14ae`다. 기존 런칭 캘린더 변경은 이 작업으로 간주하지 않는다. 기록: codex/gpt-6, 2026-11-03T10:49:20+09:00. 기존 provenance와 draft 상태는 유지한다.

## 런칭 캘린더 모바일 탭 정정 (2026-11-03)

런칭 목록의 기존 세 URL과 IA 연결을 유지하고 모바일 header만 RUN Club 시안 `2921:5026`의 둥근32px 탭·28px 제목으로 수정했다. 사각44px 탭의 최초 설명은 [정정 규격](launch-calendar.md#모바일-탭-시안-정정-2026-11-03)으로 대체한다. 출처: `src/app/launch-calendar/_components/LaunchCalendarContent.tsx`.

## Storybook 제거 (2026-11-03)

ScreenConnection.stories, getScreenStoryHref와 IA의 Storybook 환경 분기를 제거했다. 실제 route·previewRoutes·sourceFiles와 IA 번호는 보존한다. 각 page의 Storybook 전용 RoutePreview 주입 및 routePreviewComponents registry를 제거해 기본 화면을 직접 렌더하며 고정 상태 URL은 유지한다.

출처: 사용자 요청과 위 파일의 현재 작업 트리. 기록: codex/gpt-6, 2026-11-03T04:36:24.907Z. 기존 generated·source_revision·draft 상태와 과거 출처는 보존한다.

상품 목록과 러닝 세션 page의 컴포넌트 기본 export를 props 없는 Page 진입점으로 변경했다. 컴포넌트의 data/sessions props와 기본 fixture는 유지하며 존재하지 않는 이전 Context 주석은 실제 표시 데이터 경계로 정정했다.

## 쿠폰 1차 개발 범위 조정 (2026-11-03)

사용자 요청에 따라 `src/app/mypage/coupons/_components/CouponManagement.tsx`의 쿠폰 등록 입력·안내·등록 상태·완료 팝업과 전체/상품할인/배송할인 탭을 `1차 개발 범위 제외` 주석으로 보관하고 렌더링에서 제외했다. 목록은 분류 필터 없이 준비된 쿠폰 전체를 대상으로 기존 5개 단위 더보기와 상세 열람을 유지한다. 임직원 쿠폰과 빈 목록은 유지하며 실제 등록 요청·완료 전환은 구현하지 않는다. 기존 쿠폰 Figma 적용 기록 중 등록/분류 UI의 노출 설명은 이 결정으로 대체한다.

기본 URL은 `/mypage/coupons`다. 기존 등록 오류·완료 preview 파일과 호출 타입은 복원 및 참조 호환을 위해 남기지만 등록 UI/팝업을 표시하지 않는다. `src/app/screen-index/screenConnections.ts` IA196의 등록 오류·완료 링크도 주석 처리하며 빈 목록·임직원 연결은 유지한다. 출처는 이번 사용자 요청과 위 두 소스이며 기존 draft·provenance는 유지한다.

검증: PC1600px·MO375px에서 기본/빈 목록/임직원/등록 오류/등록 완료/상세 URL의 등록 영역·분류 탭 미노출과 가로 넘침 없음을 확인했다. 상세 열기·Escape 닫기와 더보기 5→10개 표시를 확인했다. TypeScript·변경 ESLint/Prettier·Panda·preview-links 6개 검사가 통과했다. 전체 Next 빌드는 이번 변경에서 재실행하지 않았다.

## 상품 카드 호버 변경의 라우팅 영향 검토 (2026-11-03)

ProductCard의 큰 미리보기 링크를 제거하고 기존 카드 이미지의 /products/{product.id} 상세 링크를 유지했다. /products·/search의 목록 소유권, URL 필터와 페이지 진입점은 변경하지 않았다. 이번 변경은 고정 상태 URL을 추가하지 않는다. 출처: ProductCard.tsx의 작업 트리 변경.

## 퍼블리싱 가이드 아이콘 탭 (2026-11-03)

`/publishing-guide`에 아이콘 탭을 추가했다. `IconGuide.tsx`는 현재 서비스 화면·공통 컴포넌트·화면 목록·기존 가이드에서 사용하는 아이콘을 92개 예시로 정리한다. SVG 42개, 폼 상태 10개, Font Awesome 35개, 캐러셀 방향 2개, 화면 전용 inline SVG 3개이며 크기·색상 사용법 3개는 별도다. 로고·국기·상품 이미지·배경 장식과 미사용 에셋은 제외한다.

기존 GuideTimeline, renderGuideCode, GuideCopyToast를 재사용하며 각 카드에 미리보기·사용처·코드 복사를 제공한다. PC는 3열 카드와 우측 목차, 모바일은 1열 카드와 기존 가이드 방식의 하단 목차다. 원본 SVG와 mask/Font Awesome의 색상 적용 차이, 기본 16px와 size 지정, alt·버튼 aria-label 기준을 안내한다. 공통 Icon과 서비스 화면은 변경하지 않았다. 목록은 이번 조사 시점의 고정 예시이므로 아이콘 사용처 변경 시 함께 갱신한다.

작업 트리 출처는 `src/app/publishing-guide/page.tsx`, `_components/IconGuide.tsx`와 재생성한 `src/app/screen-index/sourceGraph.generated.json`이다. 아이콘 에셋 경로 전수 존재 확인과 Panda 생성을 통과했다. 전체 typecheck는 기존 `.next/types`의 삭제 라우트 참조 오류로 실패했으며 새 소스 오류는 보고되지 않았다. ESLint는 설치된 eslint-plugin-perfectionist가 없어 실행되지 않았다.

브라우저 검증: PC 1668px와 모바일 375px에서 아이콘 탭·카드 표시 및 가로 넘침 없음을 확인했다. 95개 카드(목록 92 + 사용법 3), 이미지 로딩 실패 0개, 코드 복사 성공 안내, 폼 섹션 목차 이동을 확인했다. 모바일 카드는 343px 한 열로 표시된다.

## 퍼블리싱 가이드 컬러 탭 (2026-11-03)

`/publishing-guide`의 컬러 탭은 [Figma Colors 196:9352](https://www.figma.com/design/0dCBZJvU7aacxImQTV843M/HOKA-design-system-v1.0?node-id=196-9352)의 고유 컬러 13개를 Base·Core Colors·Secondary·Accent로 표시한다. 표기 HEX를 `panda.config.ts` 및 `src/styles/global.scss`의 별칭과 대조했으며 모두 일치한다. 미리보기는 `token.var`로 프로젝트 토큰을 참조한다. HEX·Panda 토큰·CSS 변수 표현식·Box 사용 코드를 각각 복사하고 공통 GuideCopyToast로 결과를 알린다. 기존 GuideTimeline·renderGuideCode를 재사용한다.

Figma Red-80의 색상 칸은 Accent에서 #B7B7B7, Sementic에서 #CECECE지만 표기 HEX와 프로젝트 값은 #E10F00이다. 가이드는 표기 HEX를 사용하고 불일치를 안내한다. Sementic에 반복된 Red-100/Red-80은 중복 컬러를 만들지 않고 설명하며, 기존 error → red.100 토큰을 별도로 복사할 수 있다. 디자인의 페이지 장식이나 로고를 재현하는 작업이 아닌 기존 퍼블리싱 가이드의 컬러 참조 탭 추가다. 전역 토큰값은 변경하지 않았다.

출처: Figma get_design_context의 196:9352와 Citrus 세부 노드 196:9467, `panda.config.ts`, `src/styles/global.scss`, 작업 트리 `src/app/publishing-guide/_components/ColorGuide.tsx`, `page.tsx` 및 재생성한 화면 소스 그래프. Panda 생성 통과. 전체 typecheck는 기존 `.next/types` 삭제 라우트 참조 오류로 실패했고 새 소스 오류는 없었다. ESLint는 설치된 perfectionist 패키지가 없어 실행되지 않았다.

브라우저에서 PC 1668px·모바일 375px 가로 넘침 없음, 13개 미리보기의 실제 RGB와 표기 HEX 일치, HEX·Panda 토큰·CSS 변수·사용 코드 네 가지의 복사 성공 안내를 확인했다.

## 주문 목록 미사용 import 정리 (2026-11-03)

OrdersList.tsx의 미사용 OrderHistoryProduct import를 제거해 ESLint no-unused-vars 오류를 해소했다. 현재 목록·상품 행·라우트와 데이터/콜백 계약에는 영향이 없다. 변경 파일의 ESLint·Prettier로 확인하며 UI 동작 변경이 없어 브라우저·빌드는 재실행하지 않는다. 출처: src/app/mypage/orders/_components/OrdersList.tsx 작업 트리. 기록: codex/gpt-6, 2026-11-03.

## 최종 홈 상품 타일의 라우팅 영향 검토 (2026-11-03)

HomeContent의 이미지 비율 강제 override를 제거하고 공통 ProductThumbnail.showcase에 최종 PC/MO 비율을 연결했다. 기존 홈 섹션·카테고리 탭·슬라이드 소유권과 상품 상세 링크, Next page export와 client 경계, URL·라우트 목록은 유지했다. 새 상태 URL이나 API 계약은 추가하지 않았다. 홈·상품 상세 추천·관심상품 PC/MO와 Next 빌드 145개 정적 페이지 생성을 확인했다. 출처: src/app/_components/HomeContent.tsx와 공통 ProductCard/ProductThumbnail 작업 트리. 기록: codex/gpt-6, 2026-11-03T06:00:55Z.

## 상품 타일 퍼블리싱 가이드 연결 (2026-11-03)

기존 /publishing-guide에 모달 다음 상품 타일 탭을 추가했다. 같은 SupportTabs.syncQuery로 tab=product-tiles 직접 진입·새로고침·이력 복귀를 지원하며 무효/부재 값의 기본 타이포그래피 탭과 기존 폼 탭을 유지한다. 별도 상품 preview page는 만들지 않는다. 가이드 UI와 로컬 상태·스타일은 해당 route의 _components/ProductCardGuide.tsx, page는 기존 Metadata와 탭 구성·진입 마크업을 소유한다. GuideTimeline은 같은 tab query 안의 section anchor로 이동한다.

주문 내역의 OrderHistoryProduct는 공용 도메인 모듈로 옮겨 주문 목록/상세와 가이드가 같은 구현을 사용한다. OrdersProducts/OrderDetails의 화면·상태·URL 계약과 요청 소유권은 변경하지 않았다. sourceGraph.generated.json은 정식 screen-files/build 명령으로 새 import를 반영했다. Form 탭 전환·상품 타일 query 뒤로 가기·10개 섹션·주문 3개 URL PC/MO와 Next 빌드를 확인했다. 출처: 위 가이드 page/private 모듈과 OrdersProducts.tsx·OrderDetails.tsx·OrderHistoryProduct.tsx 작업 트리. 기록: codex/gpt-6, 2026-11-03T06:44:42Z.

## 미사용 주문 액션 정리 (2026-11-03)

`src/app/mypage/orders/_components/OrdersProducts.tsx`의 미사용 `OrderItemActions`와 전용 타입을 제거했다. 실제 호출되는 `OrderCard`의 배송조회·리뷰 링크와 경로는 유지한다. 전체 ESLint 검사를 통과했다. 출처는 해당 파일 작업 트리이며 브라우저 시각 재검증은 수행하지 않았다.

2026-11-03 가이드 인계: 상품 타일 탭·공용 OrderHistoryProduct import와 생성 그래프를 함께 반영한다. 주문 상품 행의 기존 history·상세 진입·표시 옵션 계약과 가이드 query 연결은 유지한다. 전체 ESLint·typecheck 최종 재검사 통과.

## 주문 화면 import 서식 정리 (2026-11-03)

OrdersContent·OrdersPage·OrdersStatus와 주문 preview page 네 곳의 import 그룹·정렬만 정리했다. 경로·상태·표시 동작은 변경하지 않았다. 최종 작업 트리의 전체 ESLint와 typecheck가 통과했다. 출처: 해당 주문 라우트 파일 작업 트리.

## 상품 타일 재사용 화면과 가이드 추가 예시 (2026-11-03)

기존 장바구니/주문완료 추천·PC 장바구니 행·마이페이지 주문 요약/리뷰/재입고·취소/반품 신청·문의 주문상품 조회에 공통 ProductCard/OrderProductSummary/OrderHistoryProduct를 연결했다. /products/[id]의 배지·메타·h1·가격은 ProductIdentity detail을 사용한다. 라우트 진입점·URL·준비된 데이터/ID·선택/액션 owner는 유지하며 API나 새 상태 URL을 추가하지 않았다. 관련 import graph는 정식 screen-files/build 명령으로 생성했다.

/publishing-guide?tab=product-tiles에는 #tile-details-only(상품 상세 정보만)와 #tile-full-details(전체 데이터) 예시를 추가했다. 전체 데이터는 소개 다음 첫 예시와 GuideTimeline 첫 항목이다. 기존 query/Suspense/tab 이력 구조와 PC/MO 예시 context는 유지한다. 모바일 문의 조회의 기존 full-screen dialog, 리뷰 작성 열기, 취소/반품 신청 열림·resize와 기본 URL의 표시를 실행 화면에서 확인했다. Next 빌드 145개 정적 페이지·타입 검사를 통과했다. 상세 구현/검증은 ui.md의 관련 절을 따른다.

출처: 위 working_tree_sources에 기록한 화면·가이드·공통 컴포넌트와 생성 그래프 작업 트리, 사용자 요청. 기록: codex/gpt-6, 2026-11-03.

## 런칭 캘린더 디자인 미확정 상태 반영 (2026-11-03)

사용자 재확인으로 런칭 캘린더의 활성 IA 159~162(메인·Feed·Coming·In-stock)를 PC 디자인 수정예정(revision-planned), MO 디자인 미수급(missing), PC/MO 퍼블리싱 수정(revision)으로 변경했다. 앞서 PC 프레임 존재와 RUN Club 패턴 적용을 근거로 표시한 수급/완료 기록보다 이번 사용자 확정값을 우선한다. 기존 화면·상태 URL·파일 연결은 유지하며 삭제된 키즈 IA 163~165의 삭제 표시를 복구하지 않는다. getScreenProgress의 네 항목 반환값과 기존 상태 테스트 10개, 변경 파일 ESLint·서식을 확인했다. 브라우저 시각 검증은 재실행하지 않았다. 출처: 사용자 브라우저 댓글, src/app/screen-index/screenProgress.ts 작업 트리. 기록: codex/gpt-6, 2026-11-03.

## 주문서 마일리지 안내 문구 제거 (2026-11-03)

CheckoutDiscountSummary의 실 결제금액 최대 30% 사용 안내와 5,000점 이상/100점 단위 사용 안내 두 문구를 제거했다. 쿠폰 안내 두 문구와 선택 UI, 준비된 주문 금액·쿠폰할인·배송비·총 결제금액 표시는 유지한다. URL·상태·요청/계산 계약 변경은 없다. 변경 파일 ESLint·Prettier와 diff 검사를 수행했으며 문구 삭제이므로 브라우저/전체 빌드는 재실행하지 않았다. 출처: 사용자 제공 작업 트리의 src/app/checkout/_components/CheckoutDiscountSummary.tsx 변경과 커밋·푸시 요청. 기록: codex/gpt-6, 2026-11-03.

## 아이콘 가이드 SVG 이름 대응 (2026-11-04)

IconGuide의 Font Awesome 영역 35개 카드는 다운로드한 Figma SVG 미리보기와 사용 코드를 제공한다. 기존 코드 이름(예: faUser), Font Awesome 정식 이름·variant(user / Regular), SVG 파일명(user-regular.svg)을 함께 표시하고 파일 다운로드 링크를 제공한다. 서비스 화면의 기존 Font Awesome 호출부는 아직 유지한다. 출처: `src/app/publishing-guide/_components/IconGuide.tsx`, `public/images/icon/svg/README.md` 및 해당 SVG 파일. 기존 아이콘 탭과 목차 ID는 유지한다. Panda 생성 통과; 전체 타입 검사는 기존 .next/types의 삭제 라우트 참조 오류로 미통과이며 새 소스 오류는 없었다.

브라우저에서 35개 이름 대응 카드와 다운로드 링크, SVG 이미지 로딩, 코드 복사 성공 안내를 확인했다. PC·375px 모바일 가로 넘침 없음과 SVG 파일 다운로드를 확인했다.

## 기존 SVG의 Font Awesome 이름 안내 (2026-11-04)

IconGuide의 기존 SVG 42개와 폼 상태 10개에 origin 표시를 추가했다. 26개는 Figma FontAwesome Icons의 Regular/Solid export와 로컬 SVG path 또는 크기 정규화한 도형 대조로 이름·스타일을 기록했다. 예: gift/party-horn/medal/clock-nine/ruler-horizontal Regular, filter.svg는 sliders Regular, sort-down Solid. 별점 반 개는 star-half-stroke의 두 variant 도형이 같아 스타일 구분을 보류한다. SVG 레이어명으로 확인한 check·bell·bag-shopping과 그 외 후보는 variant 미확인을 표시한다. 인증 그림·브랜드 로고·폼 조합·말풍선 화살표에 Font Awesome 이름을 임의로 부여하지 않는다.

Figma 파일 0dCBZJvU7aacxImQTV843M의 Icons 262:7807 / FontAwesome Icons 296:9192에서 기존 메타데이터 및 이번에 받은 60개 후보 variant 원본을 대조했다. 조회 도중 Figma 도구 호출 한도에 도달해 추가 원본 확인이 필요한 항목은 가이드에 명시했다. 원본 에셋·코드 사용법·서비스 화면은 변경하지 않았다. 출처: IconGuide.tsx와 public/images/icon, header, launch-calendar의 기존 SVG.

검증: Panda 생성·OKF·diff 검사 통과. 브라우저 PC·375px 모바일에서 추가 이름 표시 및 가로 넘침 없음을 확인했다.

2026-11-04: IconGuide의 멤버십 카드만 darkPreview 옵션으로 미리보기 배경을 black.60으로 표시한다. 밝은 원본 SVG와 배경의 대비를 확보하며 원본 아이콘 색상·서비스 화면은 유지한다. 출처: src/app/publishing-guide/_components/IconGuide.tsx.

## 아이콘 미리보기 명도 대비 (2026-11-04)

IconGuide의 previewBackground 옵션으로 멤버십·네이버·알림 신청됨·발매 알림·발매 시간·말풍선 화살표·checkbox/radio 비활성 두 상태씩, 총 10개 배경을 지정한다. 원본 도형 색과 기본 #F3F3F3 배경을 대조했으며 어두운 미리보기는 파란 발매 시간을 포함해 모두 #4D4D4D로 통일한다. 흰색·#F7F7F9·#B3B3B3의 대비는 진회색에서 각각 8.45·7.90·4.03:1이다. 파랑 #009DFF는 진회색에서 2.93:1이며 사용자 요청에 따라 다른 어두운 카드와 배경을 통일했다. 원본 SVG·mask 색·서비스 UI는 유지한다. 배경은 표시 fixture에서 지정하며 런타임 SVG 분석이나 색상 자동 판정은 추가하지 않는다. 출처: IconGuide.tsx, 기존 SVG fill/stroke, panda.config.ts의 surface.subtle·black 토큰.

## 아이콘 호출 방식 통합 (2026-11-04)

서비스 화면과 publishing-guide, screen-index의 아이콘은 공통 Icon name API로 통일했다. 라우트·URL 상태·콜백 소유권은 바꾸지 않는다. OrdersStatus의 date 입력은 원래 네이티브 입력과 표시 문자열을 유지하며 달력 도형만 공통 Icon으로 표시한다. 출처: src/app/publishing-guide/_components/IconGuide.tsx, src/app/mypage/orders/_components/OrdersStatus.tsx, src/app/screen-index/_components/IaStructurePage.tsx 및 아이콘 호출부 작업 트리.

## 아이콘 디렉터리 평탄화 (2026-11-04)

아이콘 name에서 분류 폴더 접두사를 제거하고 가이드 다운로드를 /images/icon/{filename}으로 옮겼다. 라우트·화면 상태·이벤트는 변경하지 않는다. 출처: src/app/publishing-guide/_components/IconGuide.tsx 및 src/app 아이콘 호출부.

## Font Awesome 공식 이름 적용 (2026-11-04)

아이콘의 공식 이름 전환에 맞춰 관련 호출부를 갱신했다. 상태·라우트·이벤트 소유권은 유지한다. 상세 대응표는 public/images/icon/README.md와 UI 문서를 따른다.

## Icon 기본 색상 표기 생략 (2026-11-04)

Icon의 기본값과 같은 color="currentColor"를 실제 호출부와 IconGuide 미리보기·복사 코드에서 제거했다. 내부 기본값과 명시적인 다른 색상은 유지하므로 렌더링은 동일하다. 출처: IconGuide.tsx, ProductDetailContent.tsx, SizeSelector.tsx.

## 아이콘 색상 토큰 사용 (2026-11-04)

Icon 호출부와 가이드 복사 코드의 HEX 색상을 동일 값의 Panda 토큰으로 교체했다: #B3B3B3 → black.40, #F7F7F9 → black.10, #009DFF → blue.100. 색상 값과 상태 전환은 유지한다. 출처: panda.config.ts, IconGuide.tsx, LaunchCalendarContent.tsx, LaunchCalendarDetail.tsx, ShopShell.tsx.

## 기본 mask prop 생략 (2026-11-04)

레지스트리의 기본 mode가 mask인 돋보기·하트·장바구니·바구니·sort-down 호출에서 중복 mask prop을 제거했다. IconGuide/ButtonGuide의 미리보기·복사 코드에도 적용했다. mask={false}인 원본색 예외와 Icon 내부의 기본 모드 판정은 유지한다. 출처: Icon.assets.ts, Wishlist.tsx, Dropdown.tsx, ShopShell.tsx, IconGuide.tsx, ButtonGuide.tsx.

## Icon mask 재정의 옵션 제거 (2026-11-04)

푸터 국가 선택 화살표를 color="black.10"으로 전환하고 마지막 mask={false} 호출을 제거했다. IconProps의 mask와 호출부 재정의 분기를 삭제했다. 단색/원본색 렌더링은 Icon.assets.ts의 mode로만 결정하며 실제 CSS mask 렌더러는 유지한다. 가이드의 개별 mask 지정 안내도 제거했다. 출처: Icon.tsx, ShopShell.tsx, IconGuide.tsx. 이전 기록의 mask 재정의 계약은 이 변경으로 대체한다.

## 가이드 복사 코드 중복 제거 (2026-11-04)

퍼블리싱 가이드 전체의 정적 코드 문자열 123개를 검사했다. IconGuide의 6개 코드 블록에서 중복 import 6개와 동일 JSX 예시 2개를 제거했다. 크기·색상이 다른 예시는 유지하며 각 코드 블록의 동일 import는 한 번만 표시한다. 출처: src/app/publishing-guide/_components/IconGuide.tsx 및 가이드 전체 문자열 검사.

## 아이콘 가이드 색상 안내 문구 (2026-11-04)

IconGuide의 단색 SVG/CSS mask 안내를 “color로 색상 변경 가능”으로 통일하고 사용 예시 제목을 “아이콘 색상 지정”으로 정리했다. 내부 렌더링은 변경하지 않는다. 출처: src/app/publishing-guide/_components/IconGuide.tsx.

## Icon 속성 표기 순서 (2026-11-04)

Icon 사용처와 가이드 복사 코드는 name → size → color 순서로 적고 나머지 속성을 뒤에 둔다. 생략된 기본값은 추가하지 않으며 spread 경계의 덮어쓰기 순서는 보존한다. 표시 값·동작은 변경하지 않는다. 출처: src의 Icon 사용처 및 src/app/publishing-guide/_components/IconGuide.tsx.

## 아이콘 가이드 카드 설명 간소화 (2026-11-04)

아이콘 카드에는 name을 한 번, Font Awesome 이름과 스타일을 한 줄로 표시한다. 중복 등록 이름·파일명·다운로드 링크를 제거하고 asset 메타데이터를 origin에 통합했다. 프리뷰·사용처·코드 복사는 유지한다. 출처: src/app/publishing-guide/_components/IconGuide.tsx.

## 아이콘 분류와 스타일 비교 배치 (2026-11-04)

아이콘 가이드와 공통 데이터에서 생성되는 타임라인을 사용법 → 화살표·방향 → 기본 동작 → 상태·안내 → 사물·기호 → 폼 상태 → 브랜드·커스텀 순으로 변경했다. 각 그룹은 공식 기본 이름순으로 정렬하고 Regular 다음 Solid를 배치한다. 두 스타일은 2열 묶음으로 렌더링해 행이 갈라지지 않으며, PC 3열 그리드에서는 두 칸, 모바일에서는 한 행을 사용한다. 기존 84개 예시·코드·프리뷰는 유지했다. 출처: src/app/publishing-guide/_components/IconGuide.tsx.

2026-11-04: IconGuide 색상 예시의 “색상 토큰 또는 CSS 색상” 안내도 “color로 색상 변경 가능”으로 통일했다. 표시 문구만 변경했다.

## Chevron down Regular 통일 (2026-11-04)

사용자 확인에 따라 chevron-down은 Regular만 사용한다. Figma 296:11741의 18×18 원본을 chevron-down-regular.svg로 저장하고 기존 chevron-down 및 chevron-down-solid 파일·등록을 제거했다. 가이드 Solid 예시를 제거하고 실제 사용처·코드·README를 갱신했다. 이전 13×8 전용 도형의 높이 재정의는 제거해 size로 원본 비율을 유지한다. 다른 이름의 아이콘 스타일은 이번 범위에 포함하지 않는다. 출처: Icon.assets.ts, IconGuide.tsx, ProductListingPage.tsx 및 chevron-down 사용처.

## 아이콘 가이드 폼 상태 표시 순서 (2026-11-04)

IconGuide의 폼 상태는 checkbox와 radio 각각 기본 → 선택 → 비활성 기본 → 비활성 선택 순서로 표시한다. 정적 예시 배열과 제목만 조정하며 실제 폼 동작은 변경하지 않는다. 출처: src/app/publishing-guide/_components/IconGuide.tsx.


## 모달 퍼블리싱 가이드 (2026-11-04)

/publishing-guide?tab=modal은 준비 중 안내 대신 ModalGuide를 표시한다. 기존 ModalDialog의 크기 3종, 액션, 스크롤, 오버레이, 모바일 표시 방식과 BottomSheet 2종을 12개 예시로 제공한다. 열기·닫기와 코드 복사만 로컬로 처리하며 서비스 요청은 없다. 가이드 전체의 화면 구분 문구를 데스크탑/모바일로 통일하고 web/mobile API 값과 아이콘 공식 이름은 유지한다. 출처: src/app/publishing-guide/page.tsx 및 _components/ModalGuide.tsx, IconGuide.tsx, ProductCardGuide.tsx, TypographyGuide.tsx.


## 가이드 모바일 목차와 플로팅 이동 (2026-11-04)

공통 GuideTimeline은 모바일 Grid에서 order -1로 본문 위에 표시하고 데스크탑의 우측 sticky 위치는 유지한다. 가이드 공통 맨 위로 링크는 양쪽 플랫폼 모두 우측 하단 fixed로 표시하며 safe-area와 본문 하단 여백을 확보한다. 모달보다 낮은 z-index 40을 사용한다. 출처: src/app/publishing-guide/_components/GuideTimeline.tsx, src/app/publishing-guide/page.tsx.


모달 가이드 각 카드에는 소스에서 확인한 사용 화면·파일과 옵션 예시 여부를 표시한다. bottomSheet 기본 외형은 실제 화면에서 그대로 사용하지 않으며 OrderClaimRequest·PreviousTermsPicker·InquiryListContent가 전체 너비·상단 20px 모서리로 덮어쓴다. vertical 액션과 light 오버레이는 현재 서비스 사용처가 없는 옵션 예시다. 출처: ModalGuide.tsx 및 각 카드의 사용 파일, 2026-11-04 코드 검색.


2026-11-04 보완: 하단 표시 가이드와 복사 코드에 실제 사용처의 모바일 전체 너비·상단 20px 모서리·흰색 헤더를 반영했다. 기본 직각 외형 대신 공통 커스텀 외형을 보여주며 본문·버튼·세부 여백은 화면별 차이가 있음을 표시한다. 공용 ModalDialog와 실제 화면은 변경하지 않았다.


바텀시트형 모달은 독립 BottomSheet가 아닌 ModalDialog의 반응형 표시 방식이다. 가이드에 데스크탑 중앙 팝업과 모바일 하단 시트가 같은 본문·입력 상태·열기/닫기 소유권을 유지한다는 사용 이유를 명시했다. 출처: ModalGuide.tsx, 2026-11-04.


장바구니 옵션 변경은 ModalDialog의 footerProps.desktopContentOffset으로 데스크탑 버튼을 오른쪽 콘텐츠 열에 맞춘다. 왼쪽 이미지 300px와 열 간격 32px를 전달하며 모바일은 기존 푸터 배치를 따른다. 출처: CartDialogs.tsx, ModalDialog.tsx, ModalGuide.tsx.


장바구니 옵션 변경 및 모달 가이드의 확인 액션은 Figma 1985:76300 기준 데스크탑 180×48px, 버튼 간격 8px, 본문과 40px, 하단 24px를 적용한다. 공통 확인 액션의 buttonProps로 Tall 규격을 전달한다. 출처: CartDialogs.tsx, ModalDialog.tsx, ModalGuide.tsx.


디자인팀 UI 아이콘 27개를 비교해 색상만 다른 14개를 제거하고 13개 SVG로 정리했다. 단색 액션·방향 아이콘은 Icon color로 색상을 지정한다. Echo 배너 화살표는 기본·호버 도형이 달라 각각 유지한다. 출처: public/images/icon/hoka-*.svg, Icon.assets.ts, IconGuide.tsx.


Figma 296:25392의 흰색 방향 버튼은 24px 컨테이너, 반경 56px, 그림자 0 4px 8px 검정 16%와 방향별 16px SVG를 조합해 가이드에 표시한다. 출처: IconGuide.tsx.


흰색 방향 아이콘은 원과 방향 도형을 포함한 24px SVG 4종으로 등록했다. Icon이 이미지에 그림자를 자동 적용해 24px 바깥으로 표시한다. 출처: Icon.tsx, Icon.assets.ts, IconGuide.tsx.


디자인팀 원형 방향 아이콘 이름을 circle로 변경하고 방향·액션·배너 35개 상태를 개별 복사 카드로 표시했다. 단색은 color, 원형 배경을 포함한 조합은 24px SVG로 표시한다. 출처: IconGuide.tsx, Icon.assets.ts.


아이콘 가이드에서 Echo 배너 화살표의 좌우 기본·호버 4종은 현재 사용 화면 없음으로 표시한다. 출처: 사용자 확인, IconGuide.tsx.


폼 상태 8개와 별점·쇼핑백·계정·장바구니 아이콘을 디자인팀 섹션에 배치하고 hoka- 등록 이름·파일명·호출부를 일치시켰다. 기존 SVG 도형을 유지하고 알림 수는 ShopShell의 배지 조합을 사용한다. 출처: IconGuide.tsx, Icon.assets.ts, ShopShell.tsx.


디자인팀 아이콘 섹션에 쇼핑백·계정·장바구니의 파란 알림 배지 조합 3종을 개별 복사 카드로 추가하고 눈 아이콘 2종을 이동했다. 출처: IconGuide.tsx, ShopShell.tsx.


디자인팀 체크박스·라디오 아이콘 8종의 가이드 미리보기와 복사 코드를 원본 16px 크기로 맞췄다. 출처: IconGuide.tsx 및 hoka-checkbox·hoka-radio SVG.


아이콘 가이드에서 확인된 실제 호출 크기로 미리보기·복사 코드를 맞추고 크기 사용법 예시도 실제 chevron-down 규격 13/14/16px로 수정했다. 출처: IconGuide.tsx 및 화면 호출부.


아이콘 가이드의 체크박스·라디오 상태 설명에서 불필요한 Font Awesome 대응 미확인 문구를 제거했다. 출처: IconGuide.tsx.


디자인팀 xmark와 plus는 기존 Regular SVG와 도형을 대조해 hoka-action-xmark-regular·hoka-action-plus-regular로 명명했다. 원형 조합도 같은 접미사를 포함한다. 디자인팀 커스텀 또는 출처 스타일 미확인 도형에는 임의 접미사를 부여하지 않는다. 출처: Icon.assets.ts, IconGuide.tsx, ModalDialog.tsx 및 public/images/icon SVG.


원형 배경이 포함된 디자인팀 아이콘은 이름 끝에 -circle을 붙인다. 방향·스타일·상태는 그 앞에 둔다. 예: hoka-nav-chevron-right-circle, hoka-action-plus-regular-active-circle. 출처: Icon.assets.ts, IconGuide.tsx 및 SVG 파일.


Dropdown과 FormField의 16px 정보 아이콘을 circle-info-regular로 통일했다. Solid 호출부를 확인한 뒤 미사용 SVG와 등록·가이드 항목을 정리했다. 출처: Dropdown.tsx, FormField.tsx, Icon.assets.ts, IconGuide.tsx.


주문 취소·반품 신청의 예정 금액 숫자는 데스크탑 heading10, 모바일 heading7을 사용한다. 출처: OrderClaimRequest.tsx.


닫기·삭제의 기존 Solid xmark 호출 9곳을 디자인팀 hoka-action-xmark-regular로 통일했다. 각 호출의 14·16·18·24px 크기는 유지하고 Solid SVG·등록·가이드 항목을 제거했다. 출처: IconGuide.tsx와 관련 화면 호출부.


주문상품 조회 더하기를 디자인팀 hoka-action-plus-regular로 변경했다. 16px 원본 도형을 중앙에 유지하고 SVG 캔버스를 여백 포함 24px로 맞췄다. 가이드에도 24px를 적용하고 미사용 Solid 더하기 에셋을 제거했다. 출처: InquiryOrderLookup.tsx, IconGuide.tsx, Icon.assets.ts.


선택 태그 삭제에 사용하던 여백 포함 24px xmark Regular SVG를 hoka-action-xmark-regular 원본으로 채택했다. 기존 Regular 호출과 가이드 복사 코드를 같은 이름으로 통일하고 화면별 size 값은 유지한다. 출처: Icon.assets.ts, IconGuide.tsx, public/images/icon/hoka-action-xmark-regular.svg.


Figma Navigational Buttons(296:25392)와 Action Buttons(296:25425)의 기본·원형 예시를 여백 포함 24px로 통일했다. 기본 방향·빼기 SVG는 내부 16px 도형을 중앙에 유지한다. 회색 카드는 제거하고 단색 회색은 color 토큰으로 안내한다. 출처: IconGuide.tsx 및 Icon.assets.ts.


방향 아이콘은 Figma 순서대로 우·좌·상·하 열과 기본·회색·흰 원·흰 원 회색 행으로 배치한다. 24px 기본 SVG와 원형 SVG의 내부 경로·배치를 공유하며 원형 회색은 Icon color로 글리프만 변경한다. 출처: IconGuide.tsx, Icon.tsx, Icon.assets.ts.


디자인팀 빼기와 상하좌우 chevron은 Figma Regular 도형에 대응해 -regular를 명시한다. 원형 이름은 -regular-circle 순서를 사용한다. 24px SVG의 도형과 여백은 유지한다. 출처: Icon.assets.ts, IconGuide.tsx, Figma 296:24896·296:13816·296:11741.

## 보고서 메뉴·화면 식별 (2026-11-05)

보고서에 파일별 메뉴 / 화면 열을 추가한다. 직접 소유 IA 경로와 상품 공통 목록/상세 이름, STATE URL(query/hash 포함)을 표시하며 여러 소유 경로는 모두 보존한다. 소유 화면 없는 공용 파일은 공통 UI·영향 가능 화면, 미연결 설정/에셋은 화면 외 공통으로 구분한다. 담당자/요약 rowspan과 기존 날짜·담당자 URL 동작은 유지하고 공유 Markdown208행 및 스킬 출력 계약도 같은5열로 갱신한다.

출처: src/app/screen-index/screenChangeHistory.ts, src/app/screen-index/_components/IaStructurePage.tsx, tests/main-change-history.test.mjs 및 hoka-main-change-report 스킬 작업 트리. 기록: codex, 2026-11-05T01:11:42.851Z.
