---
type: Architecture
title: '라우팅과 플랫폼'
description: 'App Router 경로, 페이지 경계와 PC·모바일 선택을 설명한다.'
tags: [nextjs, routing, platform]
status: draft
updated: '2026-11-27T12:58:24+09:00'
generated:
  by: codex/gpt-6
  at: '2026-11-03T06:11:12Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/app/screen-review/page.tsx
  - public/images/products/hoka-run-hat/vgl-1.webp
  - public/images/products/hoka-run-hat/vgl-2.webp
  - public/images/products/hoka-run-hat/vgl-3.webp
  - public/images/products/hoka-run-hat/vgl-4.webp
  - src/app/products/[id]/productDetailCare.ts
  - src/app/cart/_components/CartOrderActions.tsx
  - src/app/signup/information/_components/RegistrationContent.tsx
  - src/app/signup/information/_components/RegistrationStatePreview.tsx
  - src/app/signup/information/preview-marketing-consent/page.tsx
  - src/app/checkout/preview-coupon-change/page.tsx
  - src/app/checkout/_components/CheckoutStatePreview.tsx
  - src/app/checkout/_components/CheckoutDiscountSummary.tsx
  - src/app/screen-index/screenConnections.ts
  - src/app/signup/verify/_components/IdentityVerificationContent.tsx
  - src/app/mypage/orders/orderPreviews.ts
  - src/app/signup/_components/SignupContent.tsx
  - src/app/mypage/mypage.data.ts
  - src/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent.tsx
  - src/app/cart/_components/CartProductSection.tsx
  - src/app/products/[id]/_components/ProductDetailContent.tsx
  - src/app/products/[id]/productDetailPreviews.ts
  - src/app/support/member-benefits/_components/MemberBenefitsContent.tsx
  - src/components/membership/rewards-data.ts
  - src/components/membership/MembershipRewards.tsx
  - src/context/ShopPreviewContext.ts
  - src/app/support/after-sales/_components/AfterSalesContent.tsx
  - src/app/support/care/care.data.ts
  - src/context/ShopShell.tsx
  - src/app/collection/page.tsx
  - src/app/collection/_components/SpecialExhibitionContent.tsx
  - src/app/collection/_components/specialExhibition.data.ts
  - src/components/common/atoms/EmptyState.recipe.tsx
  - src/components/common/molecules/ContentHeader.tsx
  - src/app/checkout/_components/CheckoutSummary.tsx
  - src/components/common/atoms/DataList.recipe.tsx
  - src/components/common/atoms/Button.tsx
  - src/app/mypage/reviews/_components/ReviewsContent.tsx

  - src/app/cart/_components/CartEmptyState.tsx
  - src/app/cart/preview-options-apparel-changed/page.tsx
  - src/app/checkout/preview-coupons/page.tsx
  - src/app/checkout/_components/CheckoutCouponDialog.tsx
  - src/app/mypage/orders/[preview]/page.tsx
  - src/app/mypage/orders/_components/OrderTrackingDialog.tsx
  - src/app/cart/preview-options-apparel/page.tsx
  - src/app/launch-calendar/clifton-11-gtx/preview-notification/page.tsx
  - src/components/common/layouts/ModalDialog.recipe.tsx
  - src/components/common/layouts/ModalDialog.tsx
  - src/app/launch-calendar/clifton-11-gtx/preview-phone-required/page.tsx
  - src/app/mypage/coupons/preview-complete/page.tsx
  - src/app/launch-calendar/_components/LaunchCalendarContent.tsx
  - src/app/launch-calendar/_components/LaunchCalendarDetail.tsx
  - src/app/launch-calendar/launchCalendar.data.ts
  - src/app/launch-calendar/clifton-11-gtx/preview-notified/page.tsx
  - src/app/products/[id]/_components/ProductDetailContent.tsx
  - src/app/publishing-guide/_components/ModalGuide.tsx
  - src/app/products/pdp-preview/[state]/page.tsx
  - src/app/products/[id]/productDetailPreviews.ts
  - src/app/checkout/preview-address-change/page.tsx
  - src/components/common/layouts/SidebarNavigationLayout.tsx
  - src/components/running-session/RunningSessionPage.tsx
  - src/components/catalog/ProductListingPage.tsx
  - src/components/common/atoms/EmptyState.tsx
  - src/app/support/inquiries/new/_components/InquiryFormStatePreview.tsx
  - src/app/support/inquiries/new/_components/InquiryFormLayout.tsx
  - src/app/publishing-guide/_components/CarouselGuide.tsx
  - src/components/common/molecules/CarouselSection.tsx
  - src/app/screen-index/page.tsx
  - src/app/screen-index/screenChangeHistory.ts
  - src/app/screen-index/screenChangeHistory.generated.json
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
  - src/app/mypage/_components/MyPageProductHistory.tsx
  - src/app/mypage/reviews/_components/MyPageReviewsContent.tsx
  - src/app/support/inquiries/new/order-products/_components/InquiryOrderLookup.tsx
  - src/app/publishing-guide/_components/ColorGuide.tsx
  - src/app/publishing-guide/_components/IconGuide.tsx
  - src/app/mypage/orders/_components/OrderClaimRequest.tsx
  - src/app/mypage/orders/_components/OrdersPage.tsx
  - src/app/mypage/orders/_components/OrdersContent.tsx
  - src/app/mypage/_components/MyPageFrame.tsx
  - src/app/publishing-guide/page.tsx
  - src/app/publishing-guide/_components/ProductCardGuide.tsx
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
  - public/images/mypage/coupon.svg
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
  - src/context/MyPageDataContext.ts
  - src/stories/features/mypage/MyPage.Rewards.Web.stories.tsx
  - src/app/mypage/_components/MyPageContent.tsx
  - src/app/mypage/_components/MyPageFrame.tsx
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
  - id: mypage-membership-barcode-design
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql
    title: 모바일 마이페이지 요약과 멤버십 바코드
  - id: orders-design-review
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql
    title: 장바구니·주문·취소·반품 최신 화면 시안
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
  - id: pdp-104663
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2780-104663
    title: 'PDP 신발'
  - id: pdp-93347
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2780-93347
    title: 'PDP 의류'
  - id: pdp-103439
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2780-103439
    title: 'Sale Price'
  - id: pdp-100884
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2780-100884
    title: '품절'
  - id: pdp-98879
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2780-98879
    title: 'Option Selection'
  - id: pdp-97663
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2780-97663
    title: 'No Size Selected Error'
  - id: pdp-94996
    resource: https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2780-94996
    title: '장바구니 추가 완료'
---

## 기획전 목록 원복 (2026-11-16)

`/collection`은 IA 166 기획전 목록의 직접 진입 경로다. route-private `SpecialExhibitionContent`가 대표 이미지 준비 영역, `Winter Trail Collection` 제목, 스크롤 고정 카테고리 앵커와 상품 그리드를 소유하고, `page.tsx`는 그 화면만 연결한다. PC는 1532px 콘텐츠 폭·4열·16px 열 간격·96px 카테고리 간격, 모바일은 2열·8px 열 간격·가로 스크롤 탭을 사용한다.

IA 166의 원본/보정 비고는 `[ 11/16 기획 원복 ] 기획전 목록 페이지 복원`으로 통일했고, screen-index의 기본 보기와 파일 그래프를 `/collection`에 연결했다. IA 167 상세는 이번 목록 복원 범위에 포함하지 않아 기존 미수급 상태와 연결 없음이 유지된다. 대표 이미지는 제공 시안에서 이미지가 아닌 준비 영역으로 표시되어 실제 이미지·기획전 카테고리·상품 조회는 연결하지 않았다. Figma 근거는 사용자 제공 [HOKA Design 파일](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)이다.

검증: 로컬 `/collection`에서 PC와 375px 모바일의 대표 영역·그리드·탭, 모바일 아우터 레이어 앵커 이동과 가로 넘침 없음을 확인했다. `/screen-index` 기획전 필터에서 원복 비고와 `/collection` 보기 링크도 확인했다. 실제 상품 조회·기획전 상세·대표 이미지 업로드는 미연결이다.

# 라우팅과 플랫폼

## 장바구니·주문하기·주문내역 상품 구분선 (2026-11-26)

`/cart`, `/checkout`, `/mypage/orders`와 주문 상세의 상품 목록 구분선은 `black.20`(`#E9EAEB`)을 사용한다. 장바구니의 시작선과 상품 행은 이미 이 색을 사용한다. 주문하기의 시작선은 PC 2px·모바일 1px, 주문내역 목록의 시작선은 PC 2px·모바일 미표시다. 주문내역 카드와 상세의 상품 영역 구분선은 PC·모바일의 기존 두께와 표시 조건을 따른다. 공통 DataList의 헤더 표시 설정과 결제 금액 요약선은 기존 규격을 따른다.

구현 근거는 `CartProductSection.tsx`, `CheckoutSummary.tsx`, `OrdersList.tsx`, `OrdersProducts.tsx`, `OrderDetails.tsx`에 있다. 브라우저에서 PC 1440px의 구분선 색상과 두께를 확인했다. 390px에서는 모바일 클래스의 CSS 계산값을 확인했으며 자동 모바일 전환이 확인되지 않은 화면에는 확인용 클래스를 적용했다. Panda CSS 생성, 대상 ESLint·Prettier와 전체 TypeScript 검사를 통과했다.

## 회원등급 안내 문구 (2026-11-19)

`src/app/mypage/rewards/rewards-data.ts`의 ELITE 혜택은 “스페셜 래플 응모 기회 제공”으로 표시한다. PC·모바일은 `RewardsContent.tsx`의 `RewardBenefits`에서 같은 `tiers` 데이터를 사용한다. 괄호 안의 임시 문구만 제거했으며 라우팅·스타일·다른 혜택은 변경하지 않았다. 소스 검색과 공통 렌더링 경로를 확인했으며 브라우저 시각 검증은 수행하지 않았다.

## 공통 Back to Top의 라우팅 영향 검토 (2026-11-16)

`ShopShell`이 모든 일반 경로에 `BackToTop` atom을 렌더링하지만 URL, page export, query/hash 상태와 preview 경로는 추가하거나 변경하지 않는다. `/screen-index`의 기존 셸 제외와 `/wh`의 기존 셸 우회도 유지한다. 출처: `src/context/ShopShell.tsx`, `src/components/common/atoms/BackToTop.tsx` 작업 트리, Codex, 2026-11-16.

## PDP 장바구니 추가 완료 팝업 제외 (2026-11-16)

기획 제외 결정에 따라 `/products/pdp-preview/cart-added`와 `/products/pdp-preview/cart-added-scroll` 상태 URL을 제거했다. `productDetailPreviews`가 screen-index의 상품 상세 상태 링크를 생성하므로 두 링크도 함께 사라진다. 일반 `/products/[id]`와 옵션 선택 preview URL은 유지하며, 장바구니 CTA의 실제 요청·장바구니 갱신은 여전히 상품 상세 통합 소유자 범위 밖이다. 출처: `src/app/products/[id]/_components/ProductDetailContent.tsx`, `src/app/products/[id]/productDetailPreviews.ts` 작업 트리, Codex, 2026-11-16.

## 런칭 캘린더 새 시안 (2026-11-11)

기존 Feed·Upcoming·상품 상세 URL을 재사용해 PC 수정과 새 모바일 시안을 반영했다. 목록의 현재 items prop은 플랫폼에 관계없이 그대로 표시하며, 기본 시안 데이터만 PC/MO 조합을 구분한다. 상세는 발매 사양을 DescriptionList로 모으고 모바일 공유·알림 CTA를 고정한다. 완료 표시 전용 `/launch-calendar/clifton-11-gtx/preview-notified`는 기존 상세의 notificationStatus 옵션을 재사용하고 IA159 previewRoutes·sourceFiles에 연결한다. 실제 신청/공유 요청은 실행하지 않는다. 새 기획전 이미지는 미제공 슬롯으로 구분한다. [규격과 실제 검증](launch-calendar.md)을 참고한다.

출처: `src/app/launch-calendar/`·`screenConnections.ts`·`screenProgress.ts` 작업 트리와 [Launch Calendar PC/MO 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design). 공통 플랫폼·헤더·푸터 소스 및 다른 상품 상세 계약에는 변경이 없다. PC/MO 디자인 수급은 IA159~161에만 기록하고 In Stock의 기존 미확정 상태를 보존한다.

## 상품상세 PC 공유·좋아요 위치 (2026-11-11)

상품상세의 PC 리뷰 행에서 공유하기와 좋아요를 제거하고, 기존 `Wishlist`를 장바구니·구매하기 오른쪽으로 옮겼다. 구매 버튼 소유자의 inline 배치에만 좋아요 슬롯을 허용한다. 좋아요는 48×48px, 흰 배경, 검정 1px 테두리와 반경 52px, 18px 하트이며 버튼 간격은 8px다. 일반 신발·의류·전체 품절 화면이 같은 배치를 사용한다. 모바일 리뷰 행의 공유·좋아요와 하단 구매 CTA 배치는 유지한다.

`/products/shoe-1`, `/products/pdp-preview/apparel`, `/products/pdp-preview/sold-out`에서 PC 공유 버튼 부재·좋아요 위치·크기와 로컬 선택 상태를 확인했다. 모바일 375px에서 기존 공유·좋아요 각 한 개의 표시를 확인했다. 기존 상태 소유자와 공통 Wishlist를 재사용하고 상품별 서비스 연결 책임은 현재 통합 소유자에 둔다. 변경 파일 ESLint, 전체 타입 검사, Panda 생성과 Next.js 빌드를 통과했다. [상품상세 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design).

2026-11-10: 상품 상세의 사이즈 가이드 버튼은 성별 치수표가 있으면 같은 URL에서 팝업을 열고, 없으면 `/support/size-guide`로 이동한다. 상품 상세 URL과 IA 연결은 유지한다. [현재 사이즈 가이드 연결](size-guide.md#상품-상세-사이즈-가이드-팝업-유지-2026-11-10)을 참고한다.

2026-11-10 상품 목록의 신발·의류 썸네일 비율을 `371 / 464`로 복원해 목록에 삽입되는 홍보 카드와 맞췄다. [상품 목록 이미지 비율](ui.md#상품-목록-이미지-비율-복원-2026-11-10)을 참고한다.

## 상품 상세 머지 잔여 변경 반영 (2026-11-10)

머지 후 스테이징된 `ProductDetailContent.tsx`의 사이즈 가이드 팝업, 상품 문의 더 보기 표시와 구매 버튼 라벨을 화면에 반영했다. 현행 `Product` 타입에서 제거된 `lowStockSizes` 참조도 정리했다. `sourceGraph.generated.json`에는 공유 치수 데이터와 SegmentedControl 참조를 반영했다. 상품 상세 URL과 IA 연결은 유지한다. 기존 [상품 상세 사이즈 가이드 기록](#상품-상세-신발-사이즈-가이드-팝업-2026-11-09)을 따른다.

## 상품 상세 화면 연결 그래프 갱신 (2026-11-10)

충돌 파일을 `origin/main` 버전으로 선택한 뒤 `ProductDetailContent.tsx`의 실제 import 관계에 맞춰 `src/app/screen-index/sourceGraph.generated.json`을 다시 생성했다. 상품 상세 URL과 IA 연결은 유지한다.

## 주문 상세 소스 연결 목록 갱신 (2026-11-06)

`src/app/screen-index/sourceGraph.generated.json`의 주문 상세 연결 목록을 현재 import 관계로 갱신해 사용하지 않는 `BottomSheet.tsx`를 제외했다. `OrderDetails.tsx`의 참조와 `npm run screen-files` 재실행 결과를 확인했으며 화면 URL과 라우트 동작에는 영향이 없다.

홈 `/`의 섹션 순서는 히어로 → 카테고리 → Find my HOKA → Explore → Best Seller다. 홈의 `HomeContent.tsx`가 PC와 모바일의 공통 순서를 정한다. 러닝세션의 ‘신청 시작’ 알림은 기존 상세 경로에서 신청 예정 상태일 때 표시하며, 색상은 [러닝세션 디자인](running-session-design.md#신청-시작-알림-색상과-목록-이미지-모서리-2026-11-05)을 따른다.

## 배송지 관리 목록 (2026-11-05)

`/mypage/addresses`는 PC와 모바일에서 `배송지 관리` 제목 오른쪽에 추가 액션을 배치한다. PC는 40px 외곽선 버튼, 모바일은 밑줄 버튼을 사용한다. 목록 끝에서 24px 띄워 공통 Button의 `더보기 (1/10)`를 표시한다. PC는 160×40px, 모바일은 본문 너비 × 40px이다. 빈 상태 URL은 안내문 아래의 추가 버튼을 사용한다.

## 주문서 배송지 팝업 시안 반영 (2026-11-13)

`/checkout/preview-address-change`, `/checkout/preview-address-edit`, `/checkout/preview-address-new`은 기존 IA172·173 연결을 유지한다. 목록은 배송지 관리 제목, 네 행과 고정 더보기 1/10, 하단 추가 액션을 표시한다. 추가·수정은 이름·배송지명·전화·주소를 표시하며 취소는 목록으로 돌아간다. 서비스 요청과 결제 흐름은 연결하지 않는다.

기본 목록의 1/10은 디자인 표시용 값이다. 미리보기의 더보기는 비활성이다. 실제 연동 소유자가 다음 페이지가 있을 때 카운터와 추가 조회 콜백을 전달하고 응답·실패·재시도를 관리한다.

출처는 [PC 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1978-61923), [모바일 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1978-60310) 및 `src/app/mypage/addresses/_components/`의 AddressManagement.tsx·AddressStatePreview.tsx 작업 트리다.

Codex가 2026-11-05에 1339px·375px 브라우저에서 버튼 순서·크기, 추가 폼 열기, 빈 상태 CTA, 더보기의 비활성 상태와 가로 넘침이 없는 것을 확인했다. 변경 파일 ESLint와 TypeScript 검사도 통과했다.

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

작업 트리 출처: `src/app/mypage/_components/MyPageContent.tsx`, `src/app/mypage/_components/MyPageFrame.tsx`. 기록 시점: 2026-10-30T16:46:00+09:00.

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

/mypage의 RouteContent는 MyPageFrame의 centered 레이아웃으로 main과 Home·마이페이지 breadcrumb를 구성한다. 페이지는 기존 본문과 로그아웃 상태·콜백, RoutePreview의 LogoutDialog 계약을 계속 소유한다. 하위 마이페이지는 기본 sidebar를 사용하고 URL·페이지 export·플랫폼 판별은 바꾸지 않았다. 작업 트리 출처: src/app/mypage/page.tsx, src/app/mypage/_components/MyPageFrame.tsx. [프레임 API와 검증](ui.md#mypageframe-중앙-정렬-레이아웃-2026-10-28)을 참고한다.

2026-11-26부터 마이페이지의 `sidebar` 레이아웃은 PC에서 사이드바 제목 22px·700과 기존 본문 `h1` 32px·700을 공통 적용한다. `/mypage`의 `centered` 프로필과 `/mypage/rewards`의 개인 등급 요약은 각 화면의 제목 체계를 유지한다. [스타일 소유권과 검증](ui.md#마이페이지-pc-공통-제목-2026-11-26).

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

`src/app/layout.tsx`는 User-Agent를 읽지 않는다. `<body className="platform-web">`로 시작하고, `src/context/platform.tsx`의 `PlatformProvider`가 화면 폭(`matchMedia('(max-width: 1024px)')`)으로 1024px 이하는 `mobile`, 초과는 `web`을 선택해 `<body>`의 `platform-*` 클래스를 바꾼다. `.app`의 클래스는 `ShopShell`의 `ShopFrame`이 같은 값으로 설정한다. 서버와 최초 hydration은 `web`이며 명시한 preview `platform`은 화면 폭보다 우선한다. 2026-10-28 [화면 폭 기반 플랫폼으로 전환](#화면-폭-기반-플랫폼으로-전환-2026-10-28)에서 UA 판별과 `src/lib/device.ts`를 제거했다.

루트 레이아웃은 공통 `ShopShell`에 페이지를 전달한다. `Suspense`는 화면 로딩 대체 콘텐츠를 제공하고, PC(`.app.platform-web`)에는 `--layout-web-min-width`가 적용된다.

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

`src/app`의 공용 훅·컨텍스트 import를 외부 패키지 다음으로 옮겼다. 라우트 경로·페이지 본문·서버/클라이언트 경계와 당시의 User-Agent 기반 플랫폼 판별은 이 작업에서 바꾸지 않았다. 플랫폼 판별은 같은 날 [화면 폭 기반 플랫폼으로 전환](#화면-폭-기반-플랫폼으로-전환-2026-10-28)에서 화면 폭 기준으로 대체됐다.

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

### 회원정보 조회 제목 (2026-11-26)

`/mypage/profile` 기본 조회 화면의 본문 제목은 ‘회원정보’다. 출처는 사용자 브라우저 코멘트와 `src/app/mypage/profile/_components/ProfileContent.tsx` 작업 트리다.

### 회원정보 조회·수정 콘텐츠 (2026-11-26)

조회·수정 본문 제목은 PC 32px·700, 모바일 22px·700이며 기본정보 항목은 PC 16px·500, 모바일 16px·600이다. 조회 화면의 PC 기본정보는 라벨 너비 86px와 사용자 코멘트에 따른 열 간격 24px을 적용한다. 모바일 조회는 제목 아래 선을 제거하고 첫 항목까지 32px 간격을 둔다. 수정 화면의 PC 두 열 간격은 시안과 같은 58px이다. 마케팅 정보 수신 동의 제목은 조회 PC 22px·700, 수정 PC 22px·900, 모바일 공통 16px·600이다.

조회 화면의 기본정보 행 사이 간격은 사용자 코멘트에 따라 PC 24px이며 모바일도 기존 24px을 사용한다.

수정 및 입력 오류 미리보기의 이메일은 `TextFormField` 하나에서 전체 주소를 입력한다. 기존 도메인 입력과 선택란은 제거했다. 오류 표시는 `fieldErrors.email`에 연결한다. 수정 폼의 저장은 표시 검수용이다. 출처는 사용자 브라우저 코멘트, 회원정보 조회·수정 작업 트리와 [HOKA Design](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)이다.

2026-11-26에 PC 1920px과 모바일 375px에서 조회·수정 제목, 기본정보 라벨과 값, 마케팅 제목, 버튼 글자 크기·굵기, 열 간격, 모바일 조회 제목 아래 32px 여백을 계산값으로 확인했다. 두 화면 폭에서 이메일 입력과 가로 넘침 여부도 확인했다.

### 회원정보 인증번호 불일치 알럿 (2026-11-26)

`/mypage/profile/preview-code-mismatch`로 직접 진입하면 회원정보 수정 화면의 인증번호 입력과 ‘인증번호 불일치’ 알럿을 표시한다. 기존 `ProfilePhoneVerification`과 공통 `ModalDialog`를 사용하며, 확인으로 알럿을 닫는다. IA 201 회원정보 관리의 상태 링크와 모달 유형에 이 경로를 등록했다. 고정 미리보기는 인증·만료·재요청을 실행하지 않는다.

출처는 사용자 요청, [HOKA Design](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), `src/app/mypage/profile`과 `src/app/screen-index/screenConnections.ts` 작업 트리다.

2026-11-26에 PC 1920px·모바일 375px에서 알럿 직접 진입과 확인 후 닫기를 확인했다. 기존 인증 만료와 이메일 입력 오류 미리보기도 열었으며, IA 구조도에서 상태명을 검색하고 ‘보기’ 링크로 새 경로에 진입했다.

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

`/mypage/orders/preview-detail`과 목록에서 상세로 들어온 화면은 기존 URL·`OrdersPage` 상태 소유권을 사용한다. `OrdersContent`가 상세 보기일 때 `MyPageFrame.hideMobileBreadcrumbs`를 설정해 모바일에서만 경로 표시를 숨긴다. PC breadcrumb와 다른 마이페이지 화면의 경로 표시에는 영향이 없다. 출처: `src/app/mypage/orders/_components/OrdersContent.tsx`, `src/app/mypage/_components/MyPageFrame.tsx` 작업 트리.

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

OrderClaimRequest의 kind 옵션으로 취소와 반품 신청을 공유한다. 배송완료 주문의 환불 신청 버튼은 onReturn(order)를 통해 선택한 주문의 팝업을 열고, /mypage/orders/preview-return-request는 같은 화면을 직접 연다. 반품은 취소 신청과 동일한 수량 조절(최소 1, 최대 해당 상품 주문 수량), 상품 체크와 사유·상세내용을 입력하며 회수 안내·환불예정금액을 표시한다. 실제 환불 요청·계산은 미연결이다. 출처: OrderClaimRequest.tsx, OrdersPage.tsx, OrdersProducts.tsx 및 Figma 2203:90945, 2203:76721. IA 178의 기존 주소는 유지하고 source graph를 재생성했다.

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

## 보고서 전체 담당자 URL 대소문자 처리 (2026-11-05)

URL의 developer=ALL을 담당자 이름으로 해석하던 원인을 수정한다. 예약값 all/unassigned는 공백 제거 후 대소문자와 관계없이 정규화하고 실제 담당자 이름은 보존한다. URL 파싱과 전체 결과 필터 연결을 회귀 검사한다. 출처: screenChangeHistory.ts, tests/main-change-history.test.mjs 작업 트리, codex, 2026-11-05T01:25:12.647Z.

## 2026-11-05 — 닫기 아이콘과 가이드 배경

아이콘 가이드 미리보기 배경을 #D4D4D4로 통일했다. 장바구니 상품 삭제와 공통 모달 닫기에 여백 포함 20px 디자인팀 SVG hoka-action-xmark-regular-20을 등록하고 적용했다. 출처: IconGuide.tsx, CartProductSection.tsx, ModalDialog.tsx, Icon.assets.ts.

## 공통 캐러셀과 가이드 (2026-11-05)

홈 전용 이름의 HomeCarouselSection을 공통 `CarouselSection`으로 변경했다. 홈·장바구니 추천·상품 상세·러닝 세션은 같은 제목/오른쪽 컨트롤/레일 구현을 사용한다. `/publishing-guide?tab=carousel`에서 MainContentCard·ProductCard 각 12개 예시 카드, 데스크탑 48px 컨트롤과 모바일 터치 레일, 코드 복사를 제공한다. 기존 화면별 카드 크기와 필터 슬롯은 유지한다.

- 캐러셀 `tabs` 슬롯이 있으면 제목 아래 탭 행 오른쪽에 컨트롤을 배치하며, 없으면 제목 오른쪽을 유지한다. 홈 베스트셀러를 이 옵션으로 연결하고 가이드에 기본/탭 포함 예시를 함께 추가했다. 모바일 컨트롤 숨김과 탭 선택 상태는 유지한다.

- 캐러셀 가이드 기본형·탭 포함형 각각의 예시 바로 아래에 독립 사용 코드와 복사 버튼을 배치했다. 기본형 코드에는 탭 상태와 FilterTabs import를 포함하지 않는다.

- 캐러셀 가이드 기본형을 홈 카테고리의 MainContentCard, 탭 포함형을 베스트셀러 ProductCard showcase로 교체했다. 홈 표시 fixture·카드 스타일·모바일 슬라이드 크기를 사용하며 createHomeCarouselPreviewItems로 각각 12개를 제공한다. 복사 코드에도 각 카드와 fixture를 명시했다. 탭은 선택 UI만 변경하며 상품 목록은 고정이다.

- 카트 추천 영역은 CartContent에서 가이드와 같은 CarouselSection + ProductCard를 직접 조합한다. 카트 전용 OrderRecommendations portrait 분기를 제거했으며, 다른 화면의 compact/checkout과 OrderRecommendationItem은 유지한다. 카트는 공통 products를 직접 사용하며 데스크탑 4열/모바일 150px 카드와 10px 간격은 유지한다.

- 카트 추천은 별도 orderRecommendations 변환 배열 대신 공통 products를 직접 순회하고 ProductCard product로 전달한다. itemCount도 products.length를 사용한다. 주문완료의 기존 추천 데이터 사용은 유지한다.

- NumberStepper 감소 아이콘을 hoka-action-minus-regular로 교체했다. 기존 24px 크기와 수량 조작은 유지하고 아이콘 가이드 사용처를 갱신했다.

- plus-regular/minus-solid/minus-regular를 디자인팀 hoka-action-plus-regular/hoka-action-minus-regular로 통일했다. NumberStepper·InquiryOrderLookup의 기존 교체를 유지하고 ProductListingPage를 변경했다. 사용처가 없어진 SVG 3개·등록·가이드 항목·README 링크를 제거했으며 기존 아이콘 크기는 유지한다.

- InquiryOrderLookup의 주문 목록 펼침 행을 공통 Button variant="plain"으로 교체했다. 기존 행 배치·24px 아이콘·펼침 상태를 유지하고 aria-expanded를 제공한다.

- Figma 296:19866의 18px 기본 xmark Regular 원본을 xmark-regular.svg로 등록했다. hoka-action-xmark-regular-20 SVG/등록을 제거하고 카트 삭제·ModalDialog 닫기를 xmark-regular size={20}으로 교체했다. 가이드에 폰트어썸 기본형 18px 카테고리와 18/20/14px 개별 복사 예시를 추가했다. 기존 24px 디자인팀 액션 아이콘은 별도로 유지한다.

- xmark-regular 가이드에 ProductListingPage 선택 태그 삭제의 모바일 14px/데스크탑 16px 실제 사용처와 조건부 복사 코드·두 크기 미리보기를 반영했다.

- 사용자 후속 지시에 따라 Figma 296:16546/296:24896의 18px 원본 plus-regular/minus-regular를 다시 등록했다. 기본형 가이드에 각각 18px·16px 미리보기와 개별 복사 코드를 추가했으며 화면 사용처는 변경하지 않았다.

- 기본형 plus/minus 16px 가이드에 ProductListingPage의 CatalogFilterTrigger 사용 예정 위치와 접기/펼치기 용도를 명시했다. 현재 실제 호출은 hoka-action 24px이므로 이번 요청에서는 가이드만 갱신했다.

- CatalogFilterTrigger에 plus-regular/minus-regular size={16}을 실제 적용했다. 가이드 적용 예정 표시를 제거하고 디자인팀 액션 아이콘 사용처에서 ProductListingPage를 제외했다. 기존 필터 접기/펼치기 동작은 유지한다.

## 마이페이지 상단 로그아웃과 빈 주문 헤더 보완 (2026-11-05)

Figma [마이페이지 메인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1413-131325)의 PC 기본 1533:43644·주문 없음 1480:36896과 모바일 기본 1413:131326을 기준으로 이름 오른쪽에 로그아웃을 추가했다. PC는 기존 Button secondary/short의 높이 40px, 모바일은 link/md의 밑줄·14px·400 굵기를 사용하며 모바일 하단 48px 버튼은 유지한다. 기존 ContentSection.headerProps.action과 RouteContent의 logoutOpen을 재사용해 페이지·공용 컴포넌트·상태 owner를 추가하지 않았다.

/mypage/preview-no-orders는 PC에서 기존 상품정보·수량·가격·주문상태 헤더를 유지하고 모바일은 기존 빈 상태만 표시한다. 확인 문구의 중복 물음표를 제거해 '로그아웃 하시겠습니까?'로 표시한다. /mypage·/mypage/preview-no-orders·/mypage/preview-logout의 URL과 IA 연결, 상품·관심상품 등 예시 데이터, 기존 빈 상태 Typography는 보존한다. 로그아웃은 확인창 열기/닫기만 수행하며 실제 인증 요청·저장·완료 이동은 미연동이다. 연결 책임은 owner의 [ 개발팀 바인딩 ] 주석에 기록했다.

검증: Codex가 PC 1920px의 상단 버튼 높이 40px, PC 빈 화면의 네 열 헤더와 모바일 375px의 헤더 생략·상단/하단 로그아웃 표시를 DOM과 계산 스타일로 확인했다. 모바일 상단 밑줄·14px·400, PC Escape 닫기와 모바일 닫기·확인 후 포커스 복귀 및 URL 유지, 기본 예시 5개·New·관심상품 6건 유지를 확인했다. 타입·Panda·대상 ESLint/Prettier 및 Next 빌드는 통과했다. 전체 lint는 비대상 tests/wh-file-summary.test.mjs의 URL/Request/Response no-undef 8건으로 실패했다. 브라우저 스크린샷은 캡처 시간 초과로 이미지 비교를 완료하지 못했으며, 명시적 플랫폼·전체 경계 폭 검사는 실행하지 않았다. 출처: src/app/mypage/_components/MyPageContent.tsx 작업 트리. 기록: codex/gpt-6, 2026-11-05T02:07:59.450Z.

## 문의 제목과 마이페이지 빈 화면 시안 보완 (2026-11-05)

/support/inquiries/new의 기본·고정 상태는 기존 InquiryFormLayout에서 제목과 경로를 '1:1 문의'로 통일한다. orderSelected는 제목 분기에만 쓰이던 표시 prop이어서 호출부와 함께 제거했다. 문의 입력·선택 fixture·팝업은 유지하며 URL·IA 번호·previewRoutes는 변경하지 않는다. 불필요해진 platform import를 제거한 의존 그래프는 정식 screen-files 명령으로 재생성했다.

/mypage/reviews/preview-empty, /mypage/addresses/preview-empty, /mypage/wishlist/preview-empty, /mypage/recent/preview-empty, /mypage/restock-alerts/preview-empty는 기존 화면 소유자와 EmptyState.page를 공유해 새 빈 상태 시안을 표시한다. 새 라우트나 provider를 만들지 않으며 콜백·예시 데이터·상태 수명과 미연동 서비스 경계는 보존한다. 스타일·실제 검증 및 한계는 [UI 보완](ui.md#문의-제목과-마이페이지-빈-화면-시안-보완-2026-11-05)에 기록했다. 출처: 위 working_tree_sources의 대상 작업 트리. 기록: codex/gpt-6, 2026-11-05T03:41:02.449Z.

## EmptyState 모바일 내부 여백 통일 (2026-11-05)

공통 EmptyState의 모바일 내부 12px과 기존 화면별 바깥 gutter를 합산하도록 표시만 보완했다. 관심상품·최근 본 상품의 빈 상태에서는 목록용 음수 여백을 제외하며, 마이페이지 주문 요약의 내부 padding=0 예외를 제거한다. 상품/검색 무결과와 러닝세션처럼 화면 전체 폭을 쓰는 경우는 기존 화면 소유자가 바깥 gutter와 내부 12px을 함께 전달한다. 라우트·IA 상태 URL·플랫폼 선택 로직·API/콜백·예시 데이터는 변경하지 않는다. 기존 17개 상태 URL과 정상 목록의 검증 범위는 [UI 기록](ui.md#emptystate-모바일-내부-여백-통일-2026-11-05)에 남겼다. 출처: 위 작업 트리 파일, codex/gpt-6, 2026-11-05T04:19:28.294Z.

## 주문 목록 제목 하단 간격 보정 (2026-11-05)

Figma [2121:9345](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2121-9345)의 Section Header 2121:9346 하단 패딩은 40px이다. OrdersContent의 기존 ContentSection에서 view=list·returns=false인 주문 목록만 PC gap 16px을 40px로 변경한다. 모바일 목록은 16px, 취소/반품은 PC 40px·모바일 24px, 주문 상세는 기존 gap 16px을 보존한다. 제목과 본문 사이 여백을 기존 부모에서 소유하며 추가 래퍼·자식 margin을 만들지 않는다. 라우트·fixture·콜백·서비스 경계는 변경하지 않는다.

검증: Codex가 1440/375px에서 /mypage/orders와 /mypage/orders/preview-empty의 실제 제목 영역 아래 간격을 40/16px로 확인했다. /mypage/returns는 40/24px, /mypage/orders/preview-detail은 기존 section gap 16px과 본문 자체 여백을 포함한 실제 간격 40/24px를 확인했다. Panda 생성·대상 ESLint/Prettier를 수행했고, 한정된 간격 수정으로 전체 타입/빌드는 재실행하지 않았다. hoka-markup-handoff의 ContentSection·부모 간격·반응형·표시 전용 경계를 점검했다. 출처: src/app/mypage/orders/_components/OrdersContent.tsx 작업 트리, codex/gpt-6, 2026-11-05T04:29:53.252Z.

## 마이페이지·고객센터 사이드 메뉴 시안 반영 (2026-11-05)

마이페이지와 고객센터의 바깥 프레임은 같은 --layout-web-content-inline-space(110px)와 최대 1532px을 사용한다. 이전 마이페이지의 64px 차감 때문에 1385px에서 브레드크럼이 32px과 55px로 달랐고, 1031px의 1200px PC 캔버스에서는 사이드바와 본문도 각각 23px 차이가 났다. MyPageFrame을 고객센터와 같은 계산식으로 맞췄다. PC 안쪽 최대 1200px·34px 안쪽 여백·190px/98px 열 배치, 모바일 16px과 메뉴 숨김은 유지한다.

SideNavigation 기존 그룹형은 Figma [마이페이지 2121:9344](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=2121-9344)의 제목 28px/900, 그룹명 20px/400·행간 26px, 항목 16px/400·행간 20.8px을 적용한다. 제목과 메뉴 사이 48px, 그룹 간 24px, 그룹명 행 상하 8px과 하위 그룹까지 10px, 항목 상하 4px과 사이 8px은 부모 Stack 및 행에서 관리한다. 현재 링크 aria-current와 검정 밑줄은 유지한다. 고객센터는 [1973:15195](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1973-15195)의 SUPPORT 28px/900, 메뉴 20px/400·행간 26px·상하 8px·사이 24px을 적용한다. 제목 높이 28px 뒤 46px을 두어 메뉴를 사이드바 시작 기준 74px에 배치한다. 영문은 기존 HOKA·한글은 Pretendard를 재사용한다. 탐색 URL, 현재/비활성 상태 계약, 데이터 및 주문 목록 간격 수정은 별개로 유지한다.

검증: Codex가 주문/배송조회와 온라인 회원등급 안내를 1031/1385/1920/375px에서 열어 두 사이드바·브레드크럼 시작점 일치, 글자 크기·굵기·행간·행 패딩·메뉴 시작점, aria-current, 모바일 숨김을 확인했다. 프레임 수정 단계에서 1024/1025·1199/1200px도 확인해 PC 1200px 캔버스와 1200px 이상 가로 넘침 없음을 검증했다. CDP에서 한글 Pretendard Black/Regular와 영문 커스텀 HOKA 글리프를 확인했다. 영문 face의 내부 family/postScript 이름은 '.'으로 표시되어 기존 hoka CSS 연결과 구분했다. 대상 ESLint/Prettier·Panda·타입·Next 빌드를 통과했다. 새 스크린샷·명시적 플랫폼·열린 overlay resize는 미실행이다. hoka-markup-handoff의 기존 탐색 owner·부모 간격·반응형·Next Link 경계를 점검했다. 출처: 위 두 작업 트리 파일, codex/gpt-6, 2026-11-05T04:45:21.116Z.

## 상품 목록과 배송지 빈 화면 간격 공유 (2026-11-05)

/products/preview-no-results와 /mypage/addresses/preview-empty는 버튼이 있는 EmptyState.page의 공통 간격을 사용한다. 두 기존 상태 URL을 PC와 모바일에서 확인했다. [공통 간격과 검증](ui.md#버튼이-있는-빈-화면의-공통-간격-2026-11-05). 출처: ProductListingPage.tsx, AddressManagement.tsx, EmptyState.tsx 작업 트리. 기록: Codex, 2026-11-05.

## 주문/결제 배송지 변경 모달 (2026-11-05)

IA 171 주문/결제의 배송지 변경 모달은 `/checkout/preview-address-change`에서 열린 상태로 표시된다. 기본 `/checkout`에서는 저장 배송지의 배송지변경 버튼으로 같은 공통 모달을 연다. 기존 배송지 입력 폼을 임시로 사용하며 `/checkout/preview-shipping`의 수동입력과 오류 상태는 인라인으로 표시한다. 디자인은 미수급이다.

PC는 중앙 `ModalDialog`, 모바일은 `ModalDialog`의 fullscreen 표시를 사용한다. 두 플랫폼 모두 `kind: single` 액션을 사용한다. 입력값과 열림 상태는 `CheckoutShipping`이 관리한다. 기존 배송지 사용 버튼은 인라인 수동입력에만 표시한다. 하단에는 연동 전까지 비활성인 저장 버튼을 표시하며, 헤더의 닫기 버튼으로 닫는다. 배송지 입력과 모달 열기·닫기는 로컬 UI다. 주문서 연동 시 입력 데이터와 저장 요청 결과를 연결하고, 성공한 배송지로 주문서의 `savedAddress`를 갱신한다.

출처는 사용자 브라우저 댓글과 `src/app/checkout`의 배송지 및 preview 구현, `src/app/screen-index/screenConnections.ts` 작업 트리다.

검증은 주문서 기본 상태에서 버튼으로 열기, Escape로 닫기와 버튼 포커스 복원, IA 171 검색과 링크 클릭, 미리보기 새로고침, 390px로 전환 후 모달 표시와 닫기, 수동입력 화면의 인라인 표시를 포함한다. 타입 검사, 변경 코드 ESLint·Prettier, IA 링크 테스트 13개를 통과했다. 후속 변경에서 PC 모달에 입력한 값을 유지한 채 390×700px로 전환되는 `BottomSheet`, 화면 하단 배치와 버튼을 통한 닫기 후 배송지변경 버튼 포커스 복원을 확인했다.

최종 표시 검증에서 PC 중앙 모달, 390×700px 모바일 전체 화면, 화면 전환 시 입력값 유지, 단일 저장 버튼 비활성, 닫기 후 포커스 복원을 확인했다.

## 문의 주문 상품 조회와 배송조회 오버레이 (2026-11-05)

1:1 문의 폼에서 주문 상품 조회 또는 상품변경을 누르면 같은 폼 위에서 PC 중앙 모달과 모바일 전체 화면 모달을 연다. 문의 등록 액션은 선택한 주문과 상품을 폼에 반영한다. 조회 URL 및 직접설정·빈 결과 URL은 모달이 열린 상태로 진입하며 IA의 기존 링크를 유지한다.

마이페이지 배송조회는 PC 중앙 모달과 모바일 공통 BottomSheet를 사용한다. 출처는 `src/app/support/inquiries/new`, `src/app/mypage/orders/_components/OrderTrackingDialog.tsx`, `src/app/screen-index/sourceGraph.generated.json` 작업 트리다.

브라우저에서 문의 화면 URL 유지, PC 568px 모달, 상품 선택 반영과 닫기, 모바일 390px 전체 화면 직접 진입, 모바일 배송조회 BottomSheet의 추적 이력과 닫기를 확인했다.

## 모바일 전체 화면 모달의 버튼 배치 (2026-11-05)

모바일 전체 화면 `ModalDialog`는 버튼을 스크롤 본문 끝에 둔다. 장바구니 옵션 변경과 회원가입 약관 상세는 `mobileFixedFooter`를 명시하여 버튼을 본문 스크롤 영역 밖에 둔다. 모달 퍼블리싱 가이드의 장바구니 예시와 복사 코드에도 이 옵션을 반영했다.

브라우저 510×1252px에서 배송지 변경의 저장이 본문 안에 있고 장바구니 옵션 변경과 회원가입 약관 상세의 버튼은 화면 하단에 고정되는 것을 확인했다. PC 배송지 변경에서는 버튼이 모달의 별도 footer에 표시되는 것도 확인했다. 타입 검사, 변경 파일 ESLint, IA 링크 테스트 13개를 통과했다.

## 문의 주문번호 선택 안내 글자 크기 (2026-11-05)

주문번호 선택 안내는 16px 본문을 사용한다. 출처는 문의 폼 작업 트리다.

## 로그인 장시간 미입력 안내 삭제 (2026-11-05)

`/login/preview-session-timeout`과 로그인 화면 전용 모달, IA 223의 상태 링크를 삭제했다. 로그인 기본·입력 오류·아이디 저장 도움말과 마이페이지 로그아웃 확인은 별도 상태다. 출처는 `LoginContent.tsx`, `screenConnections.ts`와 생성 그래프의 작업 트리다.

## 라우트 바인딩 주석의 제거된 Context 이름 정리 (2026-11-05)

`src/app` 아래 22개 파일의 `[ 개발팀 바인딩 ]` 주석에서 2026-11-02 제거된 `MyPageDataContext`·`SupportContentContext`·`HomeContentContext`·`InquiryDataContext`·`ProductListingContext`·`AccountServicesContext`·`AccountFlowProvider` 이름과 존재하지 않는 `onQueryChange`·`onRetry` 연결을 지우고, 통합 소유자가 연결하며 현재 연결 Context·요청은 없다고 고쳤다. 표기는 `[ 개발팀 바인딩 ]`으로 맞췄다. 주석만 바꿨으며 라우트·렌더 결과 영향은 없다. 기준: [데이터 바인딩 현재 연결 경계](data-binding.md#현재-연결-경계-2026-11-05).

- 하트 Regular/Solid를 Figma 296:25330의 18px 원본으로 교체했다. Wishlist 기본 모바일 22px/데스크탑 24px, ProductCard history 14px, listing 모바일 22px로 사용하며 기존 텍스트형 관심상품 14px를 유지한다. 가이드 기존 20px 하트를 제거하고 기본형 카테고리에 18px 원본 두 상태만 표시한다.

- 사용자 시안 확인에 따라 ProductCard listing 하트는 데스크탑 24px/모바일 18px로 명시했다. 기본형 하트 가이드의 모바일 22px 공통 기준을 제거하고 상품 목록 화면 기준만 기록한다. 다른 화면 크기는 이번 교정에서 변경하지 않았다.

- 확정된 하트 크기: 상품 상세 데스크탑 22px/모바일 20px를 Wishlist 호출에 명시하고, 관심상품·최근 본 상품의 history 카드는 양쪽 18px로 수정했다. 장바구니 양쪽 14px와 상품 목록 데스크탑 24px/모바일 18px는 유지하며 가이드에 화면별 값을 기재했다.

- 아이콘 가이드는 사용자 확인 후 기존 세로 카드형 배열을 유지한다. 최근 추가한 기본형 아이콘·화면별 크기·사용처·복사 코드는 보존한다.

- 공유 아이콘 arrow-up-from-bracket-regular를 Figma 296:20401의 18px 원본으로 교체하고 기본형 가이드로 이동했다. 상품 상세 ShareButton 아이콘은 모바일 20px/데스크탑 22px로 적용한다.

- check-solid는 기존 18×18 SVG 원본을 유지하고 StepIndicator 완료 단계 크기를 12px에서 14px로 수정했다. 가이드의 기존 faCheck 항목을 기본형 18px 카테고리로 이동하고 실제 14px 사용처를 명시했다.

- 모바일 배송조회 OrderTrackingDialog의 직접 Drawer·헤더·푸터·배경 스타일을 제거하고 공통 BottomSheet 기본형을 사용한다. 배송 본문과 onClose, 하단 닫기 버튼을 전달하며 데스크탑 ModalDialog 분기는 그대로 유지한다.

- 주문 취소·반품 신청 OrderClaimRequest는 모바일에서 공통 BottomSheet 기본형, 데스크탑에서 기존 ModalDialog를 사용한다. 폼 JSX와 입력 상태는 같은 컴포넌트에서 공유하고 신청 버튼은 목업으로 유지한다. 모바일 전용 ModalDialog 스타일을 제거하고 모달 가이드의 사용처 설명을 갱신했다.

- 최종 방향: 배송조회·주문 취소·반품 신청은 플랫폼별 BottomSheet 분기 없이 ModalDialog mobilePresentation="bottomSheet"로 통일한다. 공통 모바일 옵션은 전체 너비/상단 20px 라운드/최대 높이 화면-44px/헤더 56px/body3 타이틀/xmark-regular 24px를 제공한다. 데스크탑 모달 규격은 보존하고 가이드 예시의 별도 모바일 스타일을 제거했다.

- 바텀시트 디자인 시스템 1306:8008 / 1313:8442 / 1313:8517 / 1313:8543 기준으로 기존 selection을 default로 통합했다. appearance는 default/catalog만 제공하고 Dropdown·PreviousTermsPicker는 기본값을 사용한다. 기본형 헤더 56px(상단20/좌우24), body3, 닫기20px, 상단 라운드20px. scrollable은 화면-44px 확장 및 본문 스크롤/상단 구분선, footer는 선택 슬롯으로 48px 버튼·상단/좌우16·하단32px(+safe-area)를 제공한다. 본문 하단은 비스크롤형에 푸터가 있으면24px, 그 외에는32px이다. 가이드에 기본/스크롤 × 푸터 유무 네 사례와 catalog 예시, 각각의 복사 코드를 제공한다. ModalDialog의 bottomSheet 옵션은 이번 변경 대상이 아니다.

- 사용자 최종 지시에 따라 별도 BottomSheet 구현과 catalog 옵션을 삭제했다. 모든 호출(상품 필터·Dropdown·PreviousTermsPicker)을 ModalDialog mobilePresentation="bottomSheet"로 통합했다. 모바일 표시 방식은 popup/fullscreen/bottomSheet이며 scrollable과 footer 유무를 독립적으로 조합한다. 가이드 네 조합도 데스크탑 중앙 팝업/모바일 하단 표시를 공유하고 FormGuide 설명을 갱신했다. 앞선 BottomSheet 독립 구성 기록은 이 결정으로 대체된다.

- 회원가입 약관 상세 TermsDialog의 고정 footer actions와 scrollFade를 제거했다. 확인 버튼은 공고/시행일 아래 본문 흐름에 배치하고 기존 닫기 동작을 유지한다. 불필요한 하단80px 여백도 제거했다.

- 모달 가이드 버튼·스크롤·배경 그룹에 푸터 없이 콘텐츠 하단에 확인 버튼을 배치하는 약관 상세 예시를 추가했다. actions/footer 없이 본문과 버튼이 함께 스크롤하며 데스크탑160px·모바일 전체 너비 버튼과 개별 복사 코드를 제공한다.

- 약관 상세 콘텐츠 확인 버튼과 가이드/복사 코드를 Figma 2767:138131 데스크탑180×48px, 2767:138085 모바일 콘텐츠 전체 너비×48px로 교정했다. 공통 Button size="tall"을 사용한다.

- 약관 본문 확인 버튼의 외곽만 확대되던 문제를 수정했다. Button fullWidth로 내부 배경 프레임까지 채우고 데스크탑 maxW180px/모바일 maxW none으로 제한한다. 가이드와 복사 코드도 동일하게 교정했다.

- 아이콘 가이드의 디자인팀/액션/폼·배너·쇼핑 세 그룹을 디자인팀 아이콘 한 그룹으로 합쳤다. 본문과 데이터 기반 타임라인을 함께 통합하고 기존 아이콘·상태·복사 코드는 유지한다.

## 11월 5일 변경 보고서 (2026-11-05)

보고서 렌더러의 표시 타입을 명시했다. 생성 JSON의 보고서마다 이름 변경·소유 화면·줄 범위 조합이 달라도 필터 결과를 같은 표에 전달할 수 있다.

출처: screenChangeHistory.ts, screenChangeHistory.generated.json, tests/main-change-history.test.mjs 작업 트리 및 ccd82db0 → 3719352b Git 비교. 기록: codex, 2026-11-05T07:47:55.730Z.

- 아이콘 가이드 hoka-bag-shopping-regular 사용처를 실제 소유 파일 OrderHistoryProduct.tsx로 교정했다. 공통 헤더 ShopShell.tsx 표기는 유지한다.

## PDP 개정 시안과 IA 상태 (2026-11-05)

기존 상품상세 코드 `eland_hca_02`의 기본 링크는 `/products/shoe-1`이다. PC/MO는 동일 URL을 공유한다. 추가 상태는 `/products/pdp-preview/[state]`에서 허용된 상태만 렌더링한다. 아래 표의 짧은 상태명은 해당 경로의 마지막 segment다. 모바일 고정 CTA는 대응 기본/품절 화면에서 확인한다. 가이드·Note 프레임은 제품 상태에서 제외했다.

| 시안 섹션                      | 대응 프레임 PC / MO                    | 확인 URL                                              |
| ------------------------------ | -------------------------------------- | ----------------------------------------------------- |
| 신발[^pdp-104663]              | 105293 / 108394 접힘                   | `/products/shoe-1`                                    |
| 신발                           | 105836 / 107721 펼침                   | `inquiries-expanded`                                  |
| 신발                           | 104664 / 109004 문의 없음              | `/products/preview-empty-inquiries#product-inquiries` |
| 의류[^pdp-93347]               | 94464 / 93348 기본, 93902 고정 CTA     | `apparel`                                             |
| 할인[^pdp-103439]              | 103440 / 104077                        | `sale`                                                |
| 품절[^pdp-100884]              | 100885 / 대응 MO 시안 미제공           | `partial-stock`                                       |
| 품절                           | 101514 / 102823·106489의 품절 CTA      | `/products/preview-restock`                           |
| 품절                           | 102146 / 102823·106489의 품절 CTA      | `sold-out`                                            |
| 선택[^pdp-98879]               | 98880 / 99533                          | `options-selected`                                    |
| 선택                           | PC는 기존 선택 목록 / 100177 최대 높이 | `options-scroll`                                      |
| 사이즈 미선택 오류[^pdp-97663] | 98244 / 97664                          | `/products/preview-options-required`                  |
| 장바구니 추가 완료[^pdp-94996] | 95623 / 96237 한 스타일                | `cart-added`                                          |
| 장바구니 추가 완료             | 94997 / 96942 최대 높이                | `cart-added-scroll`                                   |

브라우저에서 IA 의류 링크가 지정 URL을 새 탭으로 여는지 확인했다. PC 1920px과 모바일 375px 모드에서 13개 URL에 직접 들어가 기본·할인·품절·오류·선택과 완료 상태를 확인했다. 구매·추가·입고알림 요청과 금액 계산은 향후 상품상세 통합 소유자가 연결한다.

[^pdp-104663]: PDP 신발 섹션과 하위 프레임.

[^pdp-93347]: PDP 의류 섹션과 하위 프레임.

[^pdp-103439]: Sale Price 섹션.

[^pdp-100884]: 품절 섹션.

[^pdp-98879]: Option Selection 섹션.

[^pdp-97663]: No Size Selected Error 섹션.

[^pdp-94996]: 장바구니 추가 완료 섹션.

2026-11-06 IA 표에서 PC·MO 디자인 및 퍼블리싱 열을 제거했다. 실제 페이지 열의 제목은 새창으로 표시하고 보기 링크는 새 탭에서 연다. 출처: IaStructurePage.tsx 작업 트리.

IA 표의 화면코드 아래에는 WBS를 표시한다. 구분 바로 다음에 새창 열을 배치하고 개발자 (진척율)는 독립 열로 표시한다. WBS 번호와 개발자는 기존 화면·상태별 매핑을 사용한다. 출처: IaStructurePage.tsx와 screenDevelopers.ts.

IA 개발자 열의 진척율은 Eland_021_일정(WBS)_20261106_v1.0/Schedule.html의 FO 개발 5.3.2 범위 실적(AB열)을 WBS 번호로 연결한다. 내보내기 시점의 실적만 반영하며 화면·STATE 담당자 연결은 기존 매핑을 따른다. 배지는 0% 회색, 진행 중 황색, 100% 녹색으로 구분한다. 출처: wbsActualSnapshot.json 및 IaStructurePage.tsx 작업 트리.

새창 열은 최소 너비 100px로 표시한다. 상위 행의 하위 상태 참조 문구를 제거하고 실제 미리보기는 STATE 행의 보기 링크로 표시한다. 출처: IaStructurePage.tsx 작업 트리.

## 주문 상세 소스 목록 갱신 (2026-11-06)

`src/app/screen-index/sourceGraph.generated.json`을 현재 import 관계로 재생성해 주문 상세의 연결 목록에서 사용하지 않는 `BottomSheet.tsx`를 제외했다. `npm run screen-files`를 다시 실행해 같은 결과를 확인했다. 화면 URL과 라우팅 동작에는 영향이 없다.

IA STATE의 WBS·개발자·진척율이 상위 화면에 표시된 경우 STATE 행에서는 생략한다. 별도 매핑이 있는 상태는 해당 행에 표시한다. 출처: IaStructurePage.tsx 작업 트리.

- 아이콘 가이드에 파일명별 대표 화면/컴포넌트 가이드 링크를 추가했다. 사용 파일 표기는 유지하고 화면 이름을 새 탭 링크로 제공하며 중복 URL은 제거한다. 디자인 시스템 미적용 예시는 링크를 만들지 않는다. Next Link prefetch=false로 가이드의 대량 선행 로드를 방지한다.

- 아이콘 가이드 별점 제목 faStarRegular/faStarSolid를 별점 · 기본/별점 · 채움으로 한글화했다. 등록 이름과 사용 코드는 유지한다.

아이콘 가이드의 `icon-header` 그룹은 모바일 헤더 순서(검색·장바구니·메뉴)로 분리한다. 각 예시의 복사 코드와 ShopShell 대표 화면 링크를 유지하며 주문 내역의 18px 장바구니 담기는 기존 디자인팀 그룹에 남긴다. 출처: `src/app/publishing-guide/_components/IconGuide.tsx`; 2026-11-06.

헤더 장바구니 가이드는 데스크탑·모바일 공통 22px 아이콘과 12px 파란 배지·8px 검정(primary) 숫자를 명시한다. 다른 알림 예시의 배지 위치와 글자 스타일도 공통 NotificationCount 규격에 맞춘다. (2026-11-06)

- 2026-11-06: 헤더 아이콘 그룹의 계정·쇼핑백 알림 예시와 복사 코드는 ShopShell의 NotificationIcon을 사용한다.

- 2026-11-06: 디자인팀 아이콘 그룹에서 서비스 미사용 바구니의 단독·배지 예시를 삭제했다.

- 2026-11-06: 계정 아이콘은 헤더 그룹에서 안내하며 디자인팀 그룹의 faUser 단독 카드는 제거했다.

- 2026-11-06: 디자인팀 아이콘 그룹은 현재 상태 순서(비밀번호 숨김 · 기본 → 비밀번호 보임)의 제목, 18px 및 black.60 예시를 제공한다.

- 2026-11-06: 폰트어썸 원본 18px 카드 제목에 기본형을 명시해 실제 사용 크기 예시와 구분한다.

- 2026-11-06: 헤더 아이콘 그룹의 검색 예시는 데스크탑 검색창 18px과 모바일 검색 버튼 22px로 나눈다.

- 2026-11-06: 닫기 20px 아이콘 카드에서 홈의 헤더 검색 패널을 직접 여는 링크를 제공한다.

- 2026-11-06: 닫기 기본형 18px 카드는 최근 검색어 개별 삭제 예시를 홈의 열린 검색 패널로 연결한다.

- 2026-11-06: 최근 검색어 삭제 카드에 모바일 18px와 데스크탑 14px 예시 및 공통 화면 링크를 표시한다.

- 2026-11-06: 아이콘 가이드에서 SearchField의 Regular 16px는 FAQ로 연결한다.

- 2026-11-06: A/S 처리 절차 전용 아이콘 카드와 해당 화면 링크를 가이드에서 제거했다.

- 2026-11-06: FAQ 검색은 공통 SearchField의 iconPlacement="start"를 사용하여 데스크탑과 모바일 모두 입력문 앞에 돋보기를 배치한다.

- 2026-11-06: 화면 목록의 생성된 소스 그래프에서 FormField의 Icon 의존성을 제거했다.

- 2026-11-06: 아이콘 가이드의 비밀번호 상태 예시와 복사 코드는 hoka- 접두사가 붙은 등록 이름을 사용한다.

- 2026-11-06: sliders-regular 카드에 모바일 상품 목록·검색 결과의 16px 사용 위치와 두 경로를 각각 안내한다.

- 2026-11-06: 아이콘 가이드의 icon-mobile-menu 그룹은 모바일 전체 메뉴 하단의 다섯 아이콘을 실제 순서·16px로 안내한다.

- 2026-11-06: 모바일 전체 메뉴 아이콘 5개의 가이드 미리보기와 복사 코드는 black.10 색상을 사용한다.

- 2026-11-06: 가이드 본문·타임라인은 디자인팀 아이콘 다음에 폰트어썸 기본형을 배치한다. 기본형 그룹에서 Regular 돋보기 18px 원본과 SearchField의 16px 예시를 각각 복사할 수 있다.

- 2026-11-06: 폰트어썸 기본형 그룹에서 필터 기본형 18px와 모바일 필터 버튼 16px를 나란히 안내한다. 모바일 카드에 상품 목록·검색 결과 링크와 표시 조건을 유지한다.

- 2026-11-06: 퍼블리싱 가이드의 코드 복사 아이콘은 본문·타임라인 마지막의 작업용 그룹에 배치하며 모든 복사 버튼과 예시에서 18px로 표시한다.

- 2026-11-06: 아이콘 가이드에서 ban-solid는 IA 화면용 그룹에 표시하며 삭제된 화면 행과 /screen-index 사용처를 안내한다.

- 2026-11-06: 폰트어썸 기본형 그룹에서 임직원 쿠폰의 원형 체크 Regular·Solid를 각각 18px로 안내한다.

- 2026-11-06: 임직원 쿠폰 미리보기의 체크 아이콘은 피그마 1813:88674 순서대로 첫 카드 Solid·둘째 카드 Regular를 사용한다.

- 2026-11-06: 아이콘 가이드 타임라인은 섹션 제목과 짧은 한 줄 요약을 표시하고, 상세 설명은 본문 제목 아래에 표시한다.

2026-11-06 main 변경 보고는 origin/main의 고정 비교 범위와 Schedule 실적을 사용한다. 실적 0% 화면 전용 변경을 제외하고 공용 파일은 보고 대상 IA 번호를 명시해 담당자를 좁힐 수 있다. 출처: screenChangeHistory.ts 및 11월 6일 보고 데이터.

## 마이페이지 이전 주문 없음 주소 IA 연결 (2026-11-25)

마이페이지 IA 177에 이전 주문 없음 주소 `/mypage/preview-no-orders`와 해당 진입 파일을 등록했다. 상태 이름에 이동 대상을 표시하며 링크를 열면 기존 라우트의 리디렉션으로 `/mypage` 기본 화면이 열린다. 실제 주문내역 빈 목록은 IA 178의 `/mypage/orders/preview-empty`에서 확인한다. 출처는 `src/app/screen-index/screenConnections.ts` 변경과 기존 `src/app/mypage/preview-no-orders/page.tsx`의 리디렉션이다.

소스 그래프를 재생성하고 개발 서버 응답의 `/mypage` 리디렉션을 확인했다. ESLint·Prettier·TypeScript 검사에 통과했다. IA 링크·진척도·그래프 테스트는 26개 중 25개가 통과했다. 이전 주문 없음 주소를 검사하는 단계는 통과했고, 같은 전수 검사의 첫 실패가 `/support/inquiries/new/preview-attachment-picker` 진입 파일의 IA 연결 누락으로 이동했다.

## 러닝세션 신청 팝업 IA 연결 (2026-11-25)

러닝세션 상세 IA 259의 상태별 바로가기에서 기존 고정 URL로 PC·모바일 팝업을 확인할 수 있다. 신청 확인은 공통 `selection`을, 완료와 제한 안내는 공통 `alert`를 사용한다. 두 유형의 공통 Bold 제목과 버튼 글꼴로 Figma의 굵기 모드를 반영한다.

| 상태 | 기존 확인 URL |
| --- | --- |
| 러닝세션 신청 확인 팝업 | `/running/running-session/preview-application` |
| 러닝세션 신청 완료 팝업 | `/running/running-session/preview-application-complete` |
| 미성년자 신청 제한 팝업 | `/running/running-session/preview-application-underage` |
| 모집 마감 안내 팝업 | `/running/running-session/preview-application-closed` |

소스는 `src/app/screen-index/screenConnections.ts`와 기존 고정 상태 페이지 및 공통 상세 컴포넌트다. [디자인과 표시 데이터 계약](running-session-design.md#신청-팝업-4종-figma-적용-2026-11-25)을 참고한다.

## 상품 상세 사이즈 가이드 치수표 연결 (2026-11-25)

상품 상세 팝업과 고객센터 사이즈 가이드는 동일한 의류 치수 데이터를 읽는다. 기존 경로와 IA에서 [치수표와 팝업 안내 문구 갱신](size-guide.md#상품-상세-사이즈-가이드-내용-동기화-2026-11-25)을 확인할 수 있다.

## 상품 상세 신발 사이즈 가이드 팝업 (2026-11-09)

신발 사이즈 가이드 버튼은 문구 왼쪽에 자 아이콘을 표시한다.

`/products/shoe-1` 등 성별이 지정된 신발 상세에서 사이즈 가이드 버튼을 누르면 현재 URL에 머물며 공통 모달을 연다. 의류와 성별 미제공 상품은 기존 `/support/size-guide` 링크를 사용한다. 기존 상품 상세 진입점과 IA 연결을 유지하고 생성 소스 그래프에 공유 치수 데이터 의존성을 반영했다. [표와 단위 선택](size-guide.md#상품-상세-신발-사이즈-가이드-팝업-2026-11-09).

출처는 사용자 첨부 PC·모바일 시안과 작업 트리의 변경 소스다. 기준 HEAD는 `781c2adb1fb5bb30c69f78301311728f9a3a8fbc`이며 codex/gpt-6가 2026-11-09T09:35:47+09:00에 기록했다.

사용자가 첨부한 브레드크럼·메뉴 상단 제목 표를 반영했다. 마이페이지의 FAQs와 1:1문의 링크는 기존 고객센터 URL에 `?from=mypage`를 붙인다. FAQs, 문의 목록 및 작성 레이아웃은 현재 URL에서 이 값을 읽어 두 번째 경로 항목을 마이페이지로 표시하며, 문의 목록의 PC·모바일 작성 링크도 같은 값을 전달한다. 값이 없거나 다르면 고객센터 경로를 사용한다. 고정 상태 화면에도 같은 레이아웃을 사용하고 루트 Suspense 경계를 유지한다.

마이페이지 리뷰·배송지·회원정보의 경로는 편집 상태와 관계없이 목록의 항목명을 사용한다. 쿠폰·러닝세션은 마이페이지 아래에 바로 놓인다. 상단 제목은 리뷰 작성/수정, 회원정보 확인/수정, 배송지 추가/수정처럼 화면 상태를 구분한다. 쿠폰 상세 팝업의 제목은 ‘쿠폰 상세보기’이며 회원등급 화면은 페이지 제목과 실제 등급명을 각각 표시한다. 고객센터의 1:1문의, 배송 및 반품 안내, 매장찾기, 세탁 및 손질 방법 안내 제목은 표의 문구를 사용한다. 출처는 이 문서의 해당 작업 트리 파일과 [메뉴 링크](ui.md#마이페이지-고객지원-메뉴-진입-2026-11-09)다.

2026-11-06 16:48 KST 보고는 지정 시작 커밋 9dca5003을 포함해 origin/main e8203fb0까지 비교했다. 제품 패치가 앞선 보고와 일치해 변경 근거를 재사용하고, WBS 실적을 다시 조회했다. 모달의 두 비교 범위와 각 7개 파일, 보고서 테스트 11개를 확인했다. 출처: screenChangeHistory.generated.json 및 공유 보고서 작업 트리.

## 마이페이지·고객센터 브레드크럼과 화면 제목 (2026-11-09)

사용자가 첨부한 브레드크럼·메뉴 상단 제목 표를 반영했다. 마이페이지의 FAQs와 1:1문의 링크는 기존 고객센터 URL에 `?from=mypage`를 붙인다. FAQs, 문의 목록 및 작성 레이아웃은 현재 URL에서 이 값을 읽어 두 번째 경로 항목을 마이페이지로 표시하며, 문의 목록의 PC·모바일 작성 링크도 같은 값을 전달한다. 값이 없거나 다르면 고객센터 경로를 사용한다. 고정 상태 화면에도 같은 레이아웃을 사용하고 루트 Suspense 경계를 유지한다.

마이페이지 리뷰·배송지·회원정보의 경로는 편집 상태와 관계없이 목록의 항목명을 사용한다. 쿠폰·러닝세션은 마이페이지 아래에 바로 놓인다. 상단 제목은 리뷰 작성/수정, 회원정보 확인/수정, 배송지 추가/수정처럼 화면 상태를 구분한다. 쿠폰 상세 팝업의 제목은 ‘쿠폰 상세보기’이며 회원등급 화면은 페이지 제목과 실제 등급명을 각각 표시한다. 고객센터의 1:1문의, 배송 및 반품 안내, 매장찾기, 세탁 및 손질 방법 안내 제목은 표의 문구를 사용한다. 출처는 이 문서의 해당 작업 트리 파일과 [메뉴 링크](ui.md#마이페이지-고객지원-메뉴-진입-2026-11-09)다.

검증: Next 프로덕션 빌드에서 타입 검사와 정적 페이지 155개 생성을 통과했다. Ego에서 고객센터 직접 진입과 PC 1440px·모바일 390px의 마이페이지 FAQs/문의 링크, 문의 작성 링크와 새로고침을 확인했다. 배송지 수정, 회원정보 확인, 쿠폰·회원등급, 리뷰 작성/수정과 쿠폰 상세 팝업, 고객센터의 변경 제목도 확인했다.

## 로그인 헤더 표시 확인 (2026-11-10)

`src/app/layout.tsx`에서 `ShopShell state={{ isLoggedIn: true }}`를 전달해 로그인 헤더 목업을 표시한다. 실제 인증 처리는 추가하지 않으며 경로 구조는 동일하다. 출처: 해당 파일 작업 트리.

## 타이포그래피 가이드 표시 범위 2026-11-10

`/publishing-guide`의 타이포그래피 탭은 `figmaTypographyVariants`의 표준 항목을 미리보기와 복사 예시로 제공한다. 화면 작업 파일 그래프에는 `Typography.tsx`가 참조하는 고객사 정의 모듈을 포함한다. 작업 트리 출처는 `TypographyGuide.tsx`와 `sourceGraph.generated.json`이다.

## 고객사 타이포그래피 적용 화면 2026-11-10

`/products`의 제목과 필터, 상품 상세와 옵션·장바구니 완료 미리보기, `/running/running-session`의 목록과 상세, `/launch-calendar`의 목록과 상세에서 고객사 스타일을 사용한다. 상품 상세 소스 그래프는 선택 합계가 화면 내부로 이동한 뒤 공용 AmountRow 의존성을 제거한다. 화면별 표시 책임은 [UI 기록](ui.md#고객사-화면-타이포그래피-적용-2026-11-10)에 기록한다.

`/products/preview-options-required`에서 상품 상세의 사이즈 미선택 오류 문구를 확인할 수 있다. [오류 타이포그래피](ui.md#상품-상세-사이즈-오류-타이포그래피-2026-11-10).

## 마이페이지 쿠폰과 상세보기 시안 적용 (2026-11-10)

`/mypage/coupons`와 `/mypage/coupons/preview-employee`는 공통 페이지 제목 ‘쿠폰’과 섹션 제목 ‘쿠폰 내역’을 표시한다. 쿠폰 카드는 PC 2열·MO 1열이며 PC 열 16px·행 20px, MO 행 16px로 배치한다. 전용 SVG 배경을 카드의 가용 폭과 높이에 맞춘다. 목록은 5건 단위 더보기를 사용한다. 임직원 영역의 카드 패딩과 간격은 PC 32px·16px, MO 16px·8px이며 첫째는 Solid 체크, 둘째는 Regular 체크다. 두 번째 카드의 예시 문구는 시안의 PC 50%, MO 30%를 각각 사용한다.

`/mypage/coupons/preview-detail`은 신규 회원가입 쿠폰의 상세를 직접 표시한다. 목록에서 상세보기를 열면 선택한 카드의 데이터로 같은 모달을 표시한다. PC는 568px 중앙 모달, MO는 전체 화면이다. 수량·혜택·쿠폰명·사용기간·사용가능처와 상세조건을 표시하며 확인 버튼의 높이는 48px, 너비는 PC 180px·MO 본문 전체다. 수량·발급 표시·상세조건은 미리보기 데이터이며, 쿠폰 조회·발급 서비스는 마이페이지 연동 소유자가 연결한다. 등록·분류 탭의 1차 개발 제외 범위는 유지한다.

PC 1920px·MO 375px에서 일반·임직원 목록, 상세 직접 진입, 확인·Esc 닫기와 버튼 포커스 복귀, 5→10건 확장 및 빈 목록을 확인했다. 상세를 연 채 1200/1199px·1025/1024px에서 폭을 전환하고 높이 420px에서 본문 스크롤과 확인 버튼을 확인했다. 임직원 카드 높이는 PC 90px·MO 56px이며, 일반 카드 가용 폭은 PC 414px·MO 328px이었다. 모바일 목록은 Windows 스크롤바가 차지하는 15px만큼 시안보다 좁다. 범위 ESLint·Prettier와 IA/OKF 테스트 9개를 통과했다. Next 빌드에서 Panda CSS 생성, TypeScript 검사와 정적 페이지 155개 생성을 완료했다.

디자인 출처는 [HOKA Design의 마이페이지 쿠폰 섹션](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)의 일반·임직원 목록과 상세 프레임이다. 구현 출처는 이 문서의 작업 트리 출처에 있는 `CouponManagement.tsx`, IA 소스 그래프와 `public/images/mypage/coupon.svg`다.

쿠폰 화면은 기본 `Typography` 변형을 사용한다. 쿠폰 내역 안내와 모바일 임직원 카드 문구에는 `bodyKr3`와 화면의 1.5 행간을 적용한다. 상세보기 링크, 팝업 제목과 금액의 글자 크기·굵기도 기존 Typography 옵션으로 지정한다. 섹션 제목의 모바일 굵기와 상세 본문의 1.5 행간은 화면 스타일에서 지정한다. PC 1920px·MO 375px에서 내역 안내 16px/24px, 링크 12px/400, 금액 숫자 16px/500, 팝업 제목 PC 16px/400·MO 20px/700을 실측했다.

## 마이페이지 쿠폰 카드 PC·MO 시안

`/mypage/coupons`의 쿠폰 내역 카드 제목 앞에 홈과 같은 티켓 모양을 20px·`blue.100`으로 표시하고 제목과 12px을 띄운다. 오른쪽의 16px 회색 정보 버튼은 쿠폰명과 ‘상세보기’를 접근 가능한 이름으로 제공하며 선택한 카드의 기존 상세창을 연다. 쿠폰명은 PC 22px·900, 모바일 20px·700이다.

PC 시안의 414×195px 카드와 보이는 행 간격 22px을 적용한다. 모바일은 343×170px 전용 배경, 행 간격 16px, 콘텐츠가 줄바꿈되는 폭에서 늘어나는 최소 높이 170px을 사용한다. 기존 카드 목록의 데이터와 상세창 연결을 유지한다.

출처는 사용자 브라우저 댓글, [HOKA Design 쿠폰 목록 PC·MO 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), `src/app/mypage/coupons/_components/CouponManagement.tsx`, `public/images/mypage/coupon-mobile.svg`의 작업 트리다.

Codex가 2026-11-26에 PC 1440px과 모바일 390px에서 카드 크기와 아이콘, 쿠폰명 굵기, Enter로 상세창 열기, Escape 닫기 후 포커스 복귀를 확인했다. 모바일 320px 임직원 미리보기의 쿠폰 내역은 날짜가 두 줄인 카드 높이 약 190px과 하단 여백 18px을 확인했다.

## 마이페이지 쿠폰 제목과 목록 간격

쿠폰 화면의 공통 Heading은 PC의 임직원·보유 쿠폰 섹션 제목에 `h8`(28px·700), 모바일 페이지 제목에 `h7`(22px·700)을 사용한다. 쿠폰이 있을 때 안내문과 총 건수 사이 간격은 PC 12px·모바일 8px이다. 카드 목록과 더보기 사이 간격은 24px이다.

출처는 사용자 검토 주석과 `src/app/mypage/coupons/_components/CouponManagement.tsx` 작업 트리다. Codex가 2026-11-26에 PC 1440px·모바일 390px에서 기본·임직원·빈 화면의 제목과 간격을 검사했으며, 제외 요청에 따라 총 건수 숫자 14px·500과 발급 버튼·더보기 글자 행간 150%를 확인했다.

## 문의등록 상품 조회 전 영역 (2026-11-10)

`/support/inquiries/new/preview-order-lookup`의 상품 정보 추가 영역을 최신 데스크탑·모바일 시안에 맞췄다. 제목 아래 간격은 16/12px, 테두리 박스 좌우 패딩은 16px, 상하 패딩은 32/24px, 안내문과 버튼 간격은 24px이다. 공통 secondary short 버튼은 40px이며 모바일에서 전체 너비로 표시한다. 안내문은 body4·subtle·줄 높이 1.5를 사용한다. 선택 후 카드 및 조회 동작 계약은 변경하지 않았다. 출처: `src/app/support/inquiries/new/_components/InquiryFormContent.tsx` 작업 트리와 Figma [HOKA]Design의 문의등록·주문상품 조회 전 시안. Ego에서 데스크탑 버튼 높이 40px·패딩 32/16px, 모바일 375px에서 박스 343px·버튼 309×40px·패딩 24/16px를 확인했다.

## 항목과 값 가이드 탭 (2026-11-10)

`/publishing-guide?tab=description-list`에서 DescriptionList의 화면 예시와 복사 코드를 제공한다. 출처: `src/app/publishing-guide/page.tsx` 작업 트리.

2026-11-10: 퍼블 가이드의 토스트 의존성을 공통 atoms/Toast로 이동했다. 화면 URL 변경은 없다. 출처: `src/app/publishing-guide/_components/*Guide.tsx`, 화면 의존 그래프 작업 트리.

## 상품 상세 링크 공유 (2026-11-10)

상품 상세 헤더의 공유 버튼은 현재 URL을 클립보드에 복사하고 성공 시 공통 Toast에 “링크가 복사되었습니다.”를 전달한다. 실패는 별도 안내하며 연속 클릭의 오래된 결과는 무시한다. 데스크탑·모바일 공통이며 기존 아이콘 크기는 유지한다. 출처: `src/app/products/[id]/_components/ProductDetailContent.tsx` 작업 트리.

2026-11-11 WBS 참조 문서가 1JyQvEhb53OgXnSBcxypHGI8nxsclZDi059r1SCdFHos로 교체되어 보고 스킬과 IA 담당자 링크의 문서 URL을 갱신했다. 연결 도구로 Schedule gid 1070650770, X~AB 헤더와 FO 개발 85행의 WBS·실적 구조를 확인했다. 기존 담당자 매핑 확인일과 과거 실적 스냅샷의 출처는 해당 수집 시점을 나타낸다. 출처: hoka-main-change-report/SKILL.md, screenDevelopers.ts 작업 트리 및 새 Schedule의 B267:AB351·X3:AB4 조회.

2026-11-11 IA 런칭캘린더 In-stock 목록(eland_hla_04, IA162)은 사용자 지정 삭제 / 제외 항목이다. 기존 삭제 판정에 따라 페이지와 STATE 링크를 표시하지 않는다. 출처: screenRegistry.ts 작업 트리.

## 2026-11-11 main 보고 실행

지정 병합 커밋 781c2adb를 포함하는 첫 부모 d7f8ae16부터 origin/main 7359b590까지의 최종 변경을 보고서 모달에 추가했다. 105개 최종 변경 파일 중 Markdown·가이드·IA 자체·실적 0% 전용 66개를 제외한 39개를 담았다. 새 Schedule의 FO 실적 85개 중 유효 IA 매핑 46개를 저장 스냅샷과 비교해 변경·누락 0건을 확인했다. 미등록 사이즈가이드는 0%로 간주하지 않고 미지정으로 보존했다. 출처: `src/app/screen-index/screenChangeHistory.generated.json` 작업 트리 및 [공유 보고서](../../reports/main-changes/inclusive-d7f8ae16c37cb0175142c9b808bdcba7932fc9ea-7359b590ad2cfce460850ee69095f99135d3b619.md). 보고서 테스트 11개와 로컬 전체/담당자 모달을 확인했다.

## 장바구니·주문 화면 시안 갱신 경로 (2026-11-16)

기본 경로 `/cart`, `/checkout`, `/mypage/orders`와 기존 직접 확인 경로 `/cart/preview-empty`, `/checkout/preview-empty`, `/checkout/preview-complete`, `/checkout/preview-shipping`, `/checkout/preview-delivery-request`, `/mypage/orders/preview-empty`, `/mypage/orders/preview-tracking`를 유지했다. 새 빈 장바구니 표시와 추천 상품은 `/cart/preview-empty`에서 직접 확인하며, 새로고침·주소 직접 입력에도 같은 fixture를 표시한다. screen-index의 기존 IA 연결과 생성 의존 그래프는 이 경로 구성을 반영한다. 서비스 조회·결제·배송 추적 요청은 구현하지 않았다.

## ModalDialog 사용처 전환과 확인 경로 (2026-11-16)

9개 variant 전환은 기존 URL·상태 소유권·이동 콜백을 보존한다. `/publishing-guide?tab=modal`에 유형별 열기 버튼과 복사 코드를 추가했다. 안내·확인은 message/description으로 단순화하고, 회원정보의 입력/확인/완료는 해당 상태에 따라 form/confirm/alert를 지정한다. 사용되지 않는 문의 모달 표시 옵션 상수는 제거했다. IA의 소스 의존 그래프는 기존 생성기가 새 recipe 연결과 제거된 import를 반영한다.

PC1440/MO375에서 `/login/account-locked`, `/login/find-account/password-reset/preview-complete`, `/mypage/preview-logout`, `/checkout/preview-address-change`, `/checkout/preview-address-edit`, `/mypage/orders/preview-tracking`, `/mypage/orders/preview-cancel-request`, `/support/inquiries/preview-attachment`, `/support/inquiries/new/preview-order-required`, `/login/account-locked/verification/preview-required-terms`를 직접 열어 표시와 본문 가로 넘침 없음을 확인했다. `/products/pdp-preview/apparel`에서는 실제 사이즈 가이드의 cm/inch와 PC/MO 배치를 확인했다. 신규 서비스·라우트·성공 이동은 추가하지 않았다. 출처: 관련 작업 트리, Codex.

## 임직원 쿠폰 버튼과 목록 간격 보정 (2026-11-16)

최신 [HOKA Design](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)의 PC·모바일 임직원 쿠폰 시안을 반영했다. 이 절은 앞선 쿠폰 기록의 회색 임직원 카드·체크 아이콘 및 PC 행 간격 20px 설명을 대체한다. 출처는 `src/app/mypage/coupons/_components/CouponManagement.tsx`의 현재 작업 트리다. 기존 라우트와 상세 모달 소유권은 유지한다.

- 임직원 영역은 기존 secondary Button을 직접 사용한다. PC는 180×48px·간격 16px, MO는 같은 너비 2열·높이 42px·간격 8px이다. 라벨은 PC 16px/20.8px·MO 15px/19.5px bold(700), 두 번째 예시 문구는 PC 50%·MO 30%를 유지한다.
- 총 건수와 카드 Grid는 `Stack gap="2"`로 8px를 확보한다. 카드 Grid의 행·열 간격은 PC 16px, MO 1열의 행 간격은 16px다. 총 건수 숫자는 영어 medium(500) 본문을 사용한다.
- 화면 본문 행간을 6px로 덮어쓰던 값을 1.5로 복원했다. 카드 조건·기간은 14px/21px, 상세보기는 CTA 12px/15.6px다. 제목과 혜택 사이 32px/24px, 금액과 설명 사이 12px, 조건과 기간 사이 6px/4px를 유지한다. 제목은 PC 22px/900·MO 20px/700, 금액은 숫자 16px/700·원 16px/600이다.
- 발급 버튼은 미리보기 표시이며 요청·완료 전환은 연결하지 않는다. 기존 상세 열기/닫기와 더보기 소유권, 일반 회원의 임직원 영역 비노출을 유지한다. 실제 쿠폰 조회·발급 연결은 마이페이지 연동 소유자 범위다.

검증: PC 1920px·MO 375px의 스크린샷과 계산 스타일로 위 크기·행간·간격을 확인했다. MO는 Windows 스크롤바를 제외한 카드 가용 폭 328px·높이 170px이며 가로 넘침이 없다. PC 카드는 414×195px다. 모바일 상세 열기·Esc 닫기 및 일반 목록 5개·임직원 영역 비노출을 확인했다. 실제 글리프는 Pretendard Black/SemiBold/Regular와 사용자 정의 HOKA face를 사용했고, HOKA 내부 이름은 점으로 보고되어 로드된 TheFutureHOKA Regular/Bold 자산 및 layout 등록과 연결해 확인했다.

Panda 생성·수정 파일 ESLint/Prettier 검사를 통과했다. 전체 타입 검사는 비대상 `LaunchCalendarDetail.tsx`의 Button `icon` prop 오류로 실패했다. Next/Storybook 빌드는 실행하지 않았다. 최종 마크업 인계 검토에서 기존 route-private 소유권, Panda·Stack 간격, 공통 Button 직접 사용, 표시 fixture와 미연결 발급 경계 및 다른 채팅의 모달 변경 보존을 확인했다.

쿠폰 굵기 후속 보정: 사용자 시각 검토를 우선해 임직원 발급 버튼의 regular 지정은 bold(700)로 변경했고, 총 건수 숫자는 기존 medium(500)으로 복원했다. 디자인 구조 데이터의 regular 관측값과 구분되는 사용자 확정 사항이다. PC 1328px·MO 375px에서 라벨 700·숫자 500, 실제 Pretendard-Bold 글리프와 기존 크기·행간을 확인했다. 공통 Button·Typography 기본값은 변경하지 않았다.

## IA 모달 유형 표시 (2026-11-16)

계정 잠금 안내 모달의 연결 메타데이터에 `modalVariant: 'alert'`를 추가했다. IA 구조도의 부모 유형 칸은 popup만 표시하고, 해당 route와 일치하는 기본 STATE 행의 유형 칸에서 상태 아래에 대괄호 없이 `variant="alert"`를 표시한다. 자식 화면이나 다른 preview URL에는 상속하지 않는다. 타입은 기존 ModalDialogVariant를 재사용하며 메타데이터가 없는 행에는 별도 문구를 만들지 않는다. D3 승격 및 해제·완료 자식 D4 연결은 screenRegistry가 소유하며, URL은 변경하지 않았다. 대상 ESLint와 계층·상태 연결 테스트5개가 통과했다. 출처: screenConnections.ts·IaStructurePage.tsx 작업 트리, 사용자 브라우저 확인과 표시 형식 수정 요청, Codex.

비밀번호 변경완료 모달(내부 IA252)도 `modalVariant: 'alert'`를 명시해 해당 모달의 기본 STATE 유형 칸에 `variant="alert"`를 표시한다. 부모 popup 행에는 표시하지 않는다. 기존 비밀번호 재설정 화면의 변경 완료 preview는 별개 소유권을 유지한다. 출처: screenConnections.ts 작업 트리와 사용자 브라우저 주석(2026-11-16).

## STATE 모달 유형 전수 표시와 검색 (2026-11-16)

앞선 개별 connection.modalVariant는 URL 단위의 typed `stateModalVariants` 목록으로 통합했다. `getScreenStateModalVariants(href)`는 준비된 상태에서 처음 열리는 실제 ModalDialog variant 배열을 반환한다. STATE 행은 상태 아래에 variant 속성을 각각 표시하고 부모 page/popup 행은 유형만 유지한다. 장바구니·배송지·주문·리뷰·쿠폰·회원정보·가입·계정복구·문의·PDP·러닝의 열린 모달 STATE48개를 등록했다. 이전 약관 선택은 부모 terms와 선택창 selection을 함께 표시하며, PDP 옵션 선택2개는 기존 모바일 전용 표시를 그대로 따른다.

닫혀 있는 공통 Dropdown·우편번호·사이즈 가이드 같은 상호작용용 모달은 import만 보고 기본 페이지의 열린 모달이라고 표시하지 않는다. 신규 상태 URL을 만들지 않았다. signup 인증 만료·계정 찾기 만료·계정 잠금 해제 완료·런칭 알림 완료는 실제 모달이 없어 표시하지 않는다. 외부 상태 이름이나 원본 화면의 popup 분류로 variant를 추정하지 않는다.

`getScreenModalSearchText`는 화면의 기본·preview URL에서 사용하는 variant 속성 문자열을 기존 검색 텍스트에 합친다. alert, tracking, variant="alert", variant="image" 검색을 지원하며 기존 화면 단위 검색과 자식 STATE 문맥은 유지한다. 검색 안내에 variant를 추가했다. 브라우저에서48개 URL의 실제 모달과 metadata가 일치하고, IA의207개 STATE 행 중 등록된48개 URL의 variant가 누락 없이 표시되는 것을 확인했다. 위 검색4건도 결과를 반환한다. 출처: 연결·컴포넌트·직접 진입 fixture 작업 트리, Codex의 실제 확인.

## 임직원 쿠폰 등록 팝업 확인 경로 (2026-11-16)

기존 `/mypage/coupons/preview-complete`를 임직원 쿠폰 등록 안내의 열린 상태로 재사용한다. `/mypage/coupons/preview-employee`는 두 발급 버튼에서 같은 팝업을 열 수 있다. 일반 `/mypage/coupons`에는 임직원 영역을 추가하지 않는다. IA196에 임직원 쿠폰 등록 팝업 STATE를 연결하고 `variant="alert"`를 표시했다. 기존 미노출이던 완료 URL을 재사용해 새 URL은 만들지 않았으며 일반 일련번호 등록 입력·등록 오류의 제외는 유지한다. 이 사용자 요청은 이전 등록 완료 팝업 제외 중 임직원 안내 범위만 대체한다.

브라우저에서 해당 IA STATE 행의 label·URL·variant, PC/MO 직접 진입과 닫기·포커스 복귀를 확인했다. 등록된 모달 상태 URL은49개다. 출처: 해당 page·연결·쿠폰 소유자 작업 트리, Codex.

## 런칭캘린더 알림 신청 팝업 (2026-11-16)

기존 `/launch-calendar/clifton-11-gtx`에서 입고 알림 신청 버튼으로 PC 팝업·모바일 바텀시트를 연다. 기존 완료 preview URL은 유지한다. 신규 route는 추가하지 않았으며 구조·디자인·실제 검증 및 미연결 서비스 경계는 [런칭 캘린더](launch-calendar.md#알림-신청-팝업-시안-적용-2026-11-16)에 기록했다. 출처: `src/app/launch-calendar/_components/LaunchCalendarDetail.tsx`, `src/app/launch-calendar/launchCalendar.data.ts`의 이번 작업 트리. 기록: codex/gpt-6, 2026-11-16.

## 런칭 안내 STATE와 모달 점검 (2026-11-16)

IA159에 휴대폰 번호 입력 안내(/launch-calendar/clifton-11-gtx/preview-phone-required)를 추가하고 STATE 아래 variant="alert"와 variant 검색에 연결했다. page는 기존 LaunchCalendarDetail에 명시적 preview만 전달한다. 기존 알림 신청·완료 경로와 서비스 미연결 경계는 유지한다. alert/confirm 고정 STATE25개를 PC/MO에서 확인했으며 런칭 안내도 양쪽에서 별도로 확인했다. 출처: 사용자 첨부 이미지·관련 작업 트리·Codex 실행 확인.

## 아이디 확인 팝업 결과형 전환 (2026-11-16)

/login/find-account/id-confirmation-modal의 STATE 유형을 detail에서 confirm으로 정정했다. 기존 직접 URL·PC 팝업/MO fullscreen을 유지하며 조회 안내·아이디·설명을 공통 result 슬롯에 전달한다. 현재 honggildong은 기존 표시 fixture다. 확인의 로그인 이동, 비밀번호 재설정 이동, 닫기/Escape의 아이디 찾기 이동을 보존하며 실제 조회·인증 API는 추가하지 않았다. 삭제된 IdConfirmationMessage 참조는 소스 그래프에서도 제거했다. 출처: 관련 작업 트리와 사용자 PC/MO 주석.

## Terms 상세 스타일 사용처 (2026-11-16)

본인확인 공통 약관 팝업2종과 가입 약관 상세가 terms 외형·본문 className을 공유한다. 기존 필수·선택·이전 약관 URL, 본문 fixture·버전 선택 상태·콜백을 유지하고 새 라우트나 서비스 요청을 추가하지 않았다. 가입 약관의 확인은 공통 actions로 표현하면서 모바일 본문 마지막 스크롤 배치를 유지한다. 가이드 예시와 복사 코드도 개별 버튼 대신 같은 actions를 사용한다. 외형·문서 수치와 출처는 [Terms 규격](ui.md#terms-모달-상세-규격-2026-11-16)을 따른다.

알뜰폰 사업자 preview-carriers의 실제 공통 모달과 IA STATE 유형을 terms로 일치시켰다. 기존 경로·데이터·콜백은 유지한다.

## 이전 약관 선택 독립 STATE (2026-11-16)

/login/account-locked/verification/preview-previous-terms는 초기 previous picker seed가 있으면 PreviousTermsPicker 하나만 반환한다. IA 보기에서 terms와 selection이 겹쳐 열리던 준비 상태를 selection 단독으로 바꿨다. 확인·닫기/Escape는 선택창을 닫고 약관 본문을 새로 열지 않는다. 필수 약관에서 이전 약관 버튼을 직접 누르는 기존 중첩 흐름은 그대로다. STATE variant 목록과 회귀 기대값도 selection 하나로 맞췄다. 다른 경로와 조회·동의 계약은 변경하지 않았다.

주문 신청·런칭 알림·장바구니 옵션·쿠폰 상세의 shell override를 공통 배치로 흡수했으며 상태·입력/선택 owner와 콜백은 유지한다. 쿠폰 상세 데이터와 서비스 동작은 수정하지 않고 타입·본문 스타일만 보정했다.

## 런칭 알림 신청 STATE 등록 (2026-11-16)

IA159 런칭캘린더에 입고 알림 신청 직접 URL /launch-calendar/clifton-11-gtx/preview-notification을 추가했다. 실제 열린 modal variant는 form으로 표시하며 기존 발매 상세·신청 완료·번호 입력 안내와 구별한다. 기존 UI 소유자에 초기 open seed만 전달하고 소스 그래프와 링크 회귀 기대값을 갱신했다.

## 문의 첨부파일 이미지 모달 (2026-11-16)

기존 `/support/inquiries/preview-attachment`와 문의 첨부파일 버튼은 같은 `InquiryListContent.tsx`의 image 모달을 사용한다. 미리보기·페이지 표시를 공통 이미지 recipe로 연결하고, 모바일 하단 시트의 손잡이·헤더 구분선을 제거했다. 모달 가이드의 image 예시도 다섯 슬라이드와 같은 recipe를 사용하며 확인 푸터는 생성하지 않는다. 라우트·표시 데이터·열기/닫기 소유권은 유지한다. [규격과 검증](ui.md#이미지-모달-시안-적용-2026-11-16)을 참고한다.

## 신발·의류 옵션 변경 확인 경로 (2026-11-16)

/cart/preview-options는 신발, /cart/preview-options-apparel은 의류 고정 시안이다. IA170에 두 STATE를 등록하고 실제 유형을 productOption으로 표시한다. CartModalPreview가 준비된 표시 데이터를 CartDialogs의 optionType과 unavailableColors로 전달한다. 컬러·발볼·사이즈 초안은 기존 소유자에 남기고 서비스 저장은 추가하지 않는다. 모달 가이드의 큰 크기·전체화면 설명도 새 전용 유형과 구별한다.

옵션 STATE의 생성 소스 그래프는 기존 직렬화 형식을 유지하며 신발·의류 소스 연결만 갱신한다.

## 배송조회 모달 시안 갱신 (2026-11-16)

기존 /mypage/orders/preview-tracking과 OrdersPage의 열기/닫기 소유권을 유지한다. tracking 유형의 PC/MO 외형과 OrderTrackingDialog 본문 슬롯을 보정하고 생성 그래프에서 사라진 개별 표·정보 wrapper 의존성을 갱신했다. 송장·송수신인·기사·이력은 기존 퍼블리싱 표시값이며 배송 조회 API를 구현한 것이 아니다.

## 상품리뷰 탭 선택 스타일 (2026-11-16)

상품리뷰 탭의 레이블은 탭 값이 현재 선택값과 같을 때 굵게 표시한다.

상품리뷰 작성 가능 목록은 구매일·상품명 데스크탑 16px, 모바일 13px과 옵션 데스크탑 16px, 모바일 12px을 사용한다. 출처: 상품리뷰 Product 시안 및 작업 트리.

작성한 리뷰 목록도 구매일·상품명 데스크탑 16px, 모바일 13px과 옵션 데스크탑 16px, 모바일 12px을 적용한다. 데스크탑 표 머리글은 20px Bold를 사용한다. 출처: 작성한 리뷰 시안 및 작업 트리.

## 장바구니·주문 영역 시안 재검수 (2026-11-16)

- 기준은 [HOKA 화면 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql)의 장바구니, 주문/결제, 주문/배송조회, 취소·반품 신청과 내역이다. 원본 구조·스타일·이미지를 읽어 PC와 모바일을 각각 대조했다.
- `/cart/preview-options-apparel-changed`는 M을 선택해 변경 버튼이 활성화된 의류 옵션 상태다. 기존 `/cart/preview-options-apparel`은 S 초기 선택과 비활성 상태를 유지한다. 초기 크기는 preview seed이며 저장 결과가 아니다.
- `/checkout/preview-coupons`는 상품별 쿠폰과 장바구니 쿠폰이 열린 상태다. 주문내역의 조회하기 버튼에서도 같은 모달을 연다. IA170·IA171의 STATE와 소스 그래프에 신규 경로를 등록했다.
- 기본·빈 장바구니, 신발/의류 옵션·수량 제한, 기본·직접 입력·배송 요청·오류·빈 주문서·완료·쿠폰·배송지 목록/추가/수정, 주문/반품 목록과 빈 상태, 주문·취소·반품 상세, 취소/반품 신청·배송조회 등 26개 상태를 PC/MO 총52개 화면으로 캡처했다. 기존 직접 URL을 재사용했다.
- 기간 선택은 PC에서 1년→6개월→3개월→1개월→직접설정, 모바일에서는 1개월→3개월→6개월→1년→직접설정이다. 초기 직접설정 날짜는 2026.01.01~2026.08.30이고 모바일 날짜 입력은 직접설정에서만 표시한다. 실제 서버 조회는 실행하지 않는다.
- 검증 세부와 미연결 경계는 [검증 기록](../development/verification.md#주문-영역-pc모바일-재검수-2026-11-16), 구조·수치는 [UI 기록](ui.md#장바구니주문-영역-표시-규격-2026-11-16)을 따른다.

## 상품리뷰 미리보기 분기 정리 (2026-11-17)

리뷰 화면의 내부 상태 분기를 정리했으며 기본 화면과 기존 목록·빈 상태·팝업 미리보기 URL은 변경하지 않았다. 출처: `src/app/mypage/reviews/_components/ReviewsContent.tsx` 및 리뷰 라우트 작업 트리, 2026-11-17.

## 상품 타일 가이드의 리뷰 표시 (2026-11-17)

`/publishing-guide`의 상품 타일 탭의 전체 데이터 예시와 복사 코드가 `/mypage/reviews`의 작성 목록과 별점·본문 표시를 공유한다. 작성 목록은 PC·모바일 모두 `OrderProductSummary`에 표시값을 전달하며 기존 주소에서 확인할 수 있다. 출처: `src/app/publishing-guide/_components/ProductCardGuide.tsx`, `src/app/mypage/reviews/_components/ReviewsContent.tsx` 작업 트리, 2026-11-17.

`/publishing-guide?tab=product-tiles#tile-mypage-written-reviews`에서 작성한 리뷰의 PC·모바일 예시와 코드를 확인할 수 있다. 전체 화면 링크는 기존 `/mypage/reviews/preview-written`으로 연결된다. 출처: `src/app/publishing-guide/_components/ProductCardGuide.tsx` 작업 트리, 2026-11-17.

상품 타일 가이드의 마이페이지 작성 리뷰 예시는 `OrderProductSummary`의 `review` 유형과 구매일·옵션 props를 직접 사용한다. 출처: 상품 타일 가이드 작업 트리, 2026-11-17.

## 주문 상품 요약 직접 사용 (2026-11-17)

주문/배송·취소/반품 목록과 상세는 기존 경로·상태 소유자를 유지하고 `OrderProductSummary`를 직접 사용한다. 클릭 가능한 상품의 `onClick`은 기존 orderId/claimId 상세 열기 콜백으로 연결한다. 상품 타일 가이드도 같은 props를 사용하며 새 라우트나 서비스 동작은 추가하지 않았다. 출처: `src/app/mypage/orders/_components/OrdersList.tsx`, `OrdersProducts.tsx`, `OrderDetails.tsx`, `src/app/publishing-guide/_components/ProductCardGuide.tsx` 작업 트리. UI 계약은 [주문 상품 요약](ui.md#주문-상품-요약-직접-사용-2026-11-17)에 기록한다.

2026-11-17 상품 리뷰 조건부 렌더링 정리: 상품 타일 가이드의 별점·리뷰 예시와 복사 코드에서 제거된 ProductReviewSummary 참조를 정리했다. 기존 상품리뷰·가이드 경로와 화면 상태는 유지한다. 출처: ProductCardGuide.tsx, OrderProductSummary.tsx 작업 트리.

## 리뷰·러닝세션 화면 소스 정리 (2026-11-17)

리뷰 목록의 중복 줄높이 선언은 ContentSection 한 곳에 유지한다. 상품 옵션 문구는 reviewFixtures에서 완성해 ReviewsContent와 ProductCardGuide에 그대로 전달하며, 수정 미리보기와 목록의 수정 버튼은 demoWrittenReview.rating을 같은 초기값으로 사용한다. 파일 내부 부품은 ReviewDialog·ReviewItem으로 명명하고 두 화면의 ContentSection·Dropdown 속성 순서를 맞췄다. 새 컴포넌트나 상태 URL은 추가하지 않았다. 출처: ReviewsContent.tsx, reviewFixtures.ts, RunningSessionEntriesContent.tsx, ProductCardGuide.tsx 작업 트리. 변경 파일 ESLint와 Prettier, Panda 생성을 통과했다. 전체 타입 검사는 기존 .next/types의 삭제된 라우트 참조 오류로 실패했으며 src 오류는 없었다. 이번 정리는 브라우저에서 재검증하지 않았다.

리뷰 화면은 선택된 display에서 items·totalCount·more를 구조 분해해 목록·건수·더보기·팝업 상품명에 직접 사용한다. 러닝세션과 동일한 참조 방식이며 상태 선택과 표시 동작은 유지한다(2026-11-17).

- 2026-11-17: 리뷰와 러닝세션 신청내역의 SegmentedControl은 모바일에서 화면 컨테이너의 좌우 16px 여백을 상쇄해 탭과 하단 라인을 화면 끝까지 표시한다. 각 화면의 탭 루트에만 폭 calc(100% + 32px)·좌우 마진 -16px을 적용하며 PC 및 제목·목록 여백은 유지한다.

- 2026-11-17: 리뷰·러닝세션 더보기는 목록/빈 화면 및 탭과 무관하게 항상 표시한다. 모든 고정 fixture에 more를 제공하며 실제 노출 조건과 추가 조회는 개발 연동 소유자가 연결한다. 공통 plain·lg 버튼과 기존 미연결 콜백의 비활성 표현을 유지한다.

- 2026-11-17: 러닝세션 신청내역은 탭의 고정 데이터를 사용하고 빈 미리보기는 JSX에서만 분기한다. 더보기는 분기 밖에서 표시한다.

- 2026-11-17: 러닝세션 더보기를 목록 분기 안에 두고 showLoadMore 값으로 미리보기 표시를 전환한다.

- 2026-11-17: 러닝세션 신청내역은 빈 미리보기 데이터를 다시 사용하고 items.length로 목록과 빈 화면을 구분한다. 더보기는 목록에 포함한다.

- 2026-11-17: 회원등급 모바일 시안에 맞춰 구매 진행률을 구매금액 카드 위에 표시한다. 모바일 표시 데이터와 진행 바 여백, 금액 배치를 반영했다.

- 2026-11-17: 회원등급의 구매금액과 진행 바 표시 데이터를 웹·모바일 공통으로 통일했다.

- 2026-11-17: 회원등급 구매금액 굵기는 Typography의 heading8·heading7 설정을 사용한다.

- 2026-11-17: 회원등급 혜택 문구는 웹과 모바일에서 동일한 title을 사용하며 RUNNER 무료 반품 쿠폰은 기존 공통 문구인 연 3회 지급으로 표시한다.

- 회원정보 확인은 ProfileContent 안에서 기본정보·수신 동의·안내·수정 버튼을 구성한다. 모바일 제목·구분선·글자·여백과 44px 수정 버튼을 시안에 맞추고 퍼블 가이드의 DescriptionList 예시도 동기화했다.

- 회원정보 수정의 비밀번호 설정 버튼은 공통 ModalDialog를 열며 모바일에서는 바텀시트, PC에서는 폼 모달로 표시한다. 입력과 닫기는 로컬에서 처리하며 비밀번호 입력 오류는 /mypage/profile/preview-password-error 및 화면 목록에서 확인할 수 있다.

- 배송지 빈 목록은 공통 프레임의 남은 공간을 채워 가운데 정렬하며 상단 높이의 고정 계산을 사용하지 않는다.

- 페이지형 EmptyState는 PC 상단 160px, 모바일 남은 영역 가운데 정렬을 공통으로 사용한다. 배송지·리뷰·상품내역의 고정 화면 높이 계산을 제거했다.

- 장바구니 빈 화면의 레이아웃 여백 설정을 정리하고, 배송지 편집 모바일 제목 여백과 마이페이지 회원정보 메뉴명을 갱신했다.

## 모바일 결제 로고 정렬 보정 (2026-11-17)

`/checkout` 및 같은 CheckoutPayment를 사용하는 주문서 STATE의 모바일 로고를 원본의 가운데 정렬된 자산으로 교체했다. 기존 PC용 자산·한 줄6열 배치·선택 콜백은 유지한다. 신규 경로나 서비스 바인딩 변경은 없다. [수치와 검증](ui.md#모바일-결제-수단-중앙-정렬-2026-11-17).

## 쿠폰 상세 글꼴 변경의 라우팅 검토 (2026-11-17)

작업 트리 출처 src/app/mypage/coupons/_components/CouponManagement.tsx의 상세 글꼴·색상과 className 선언 위치를 검토했다. /mypage/coupons/preview-detail 직접 진입, 모달 열림과 닫기 소유권, 쿠폰 데이터·조회 계약 및 기존 import 경로에는 변경이 없다. PC1176·모바일513px 직접 진입과 캡처를 확인했다.

## 비밀번호 설정 안내 간격 보정 (2026-11-17)

ProfileContent의 비밀번호 설정 모달에서 안내문 padding-top8px를 제거하고 공통 FormField의 gap8px를 사용한다. 안내문 Typography의1px 이동도 해당 사용처에서 해제하여 입력 상자와 안내문 실제 간격이8px가 되도록 했다. 입력·확인·닫기와 고정 상태 URL 계약은 유지한다. 작업 트리 출처: src/app/mypage/profile/_components/ProfileContent.tsx. Codex가 /mypage/profile/preview-password의 PC1068×1251·모바일506×1251에서 실제 bounding rect 간격8px·안내문 padding-top0과 캡처를 확인했다.

## 비밀번호 입력 오류 고정 상태 (2026-11-17)

/mypage/profile/preview-password-error를 profilePreviews와 기존 동적 preview 라우트에 추가하고 IA 회원정보 관리 하위에 비밀번호 입력 오류·form 모달로 연결했다. ProfileStatePreview의 passwordState='error'가 기존 ProfilePasswordDialog를 열며 새 화면 래퍼를 만들지 않는다. 생성된 화면 소스 목록을 동기화했다. 작업 트리 출처: src/app/mypage/profile/profilePreviews.ts, src/app/mypage/profile/[preview]/page.tsx, src/app/mypage/profile/_components/ProfileStatePreview.tsx, src/app/mypage/profile/_components/ProfileContent.tsx, src/app/screen-index/screenConnections.ts, src/app/screen-index/sourceGraph.generated.json.

사용자가 제공한 오류 화면 이미지를 기준으로 두 필드 오류를 고정 표시하며 서비스 검증·요청·저장·성공 이동은 구현하지 않는다. Codex가 PC1176×1251·모바일375×812에서 직접 진입·두 오류 문구·aria-invalid=true와 닫기를 확인했다.

## 문의 모바일 첨부 방법 선택 (2026-11-17)

/support/inquiries/new/preview-attachment-picker에서 모바일 파일첨부 시트를 초기 표시한다. 기존 InquiryFormStatePreview와 InquiryAttachments의 previewPicker를 재사용하고 IA 고객센터·마이페이지 문의 연결에 첨부 방법 선택 (모바일)·selection을 추가했다. PC는 동일 URL에서 일반 문의 폼을 표시하며 파일찾기는 기존 파일 입력을 직접 연다. 작업 트리 출처: src/app/support/inquiries/new/preview-attachment-picker/page.tsx, src/app/support/inquiries/new/_components/InquiryFormStatePreview.tsx, src/app/support/inquiries/new/_components/InquiryFormContent.tsx, src/app/screen-index/screenConnections.ts, src/app/screen-index/sourceGraph.generated.json.

## 첨부 방법 선택 문구 굵기 보정 (2026-11-17)

사용자 모바일 검수 규격을 원본의400보다 우선해 사진 보관함·파일 선택 문구를 body3Medium으로 변경했다. Pretendard16px/500/24px·자간-0.02em·검정을 사용한다. 기존 첨부 선택 URL·PC 직접 파일 입력·File 전달·모달 구조는 유지한다. 작업 트리 출처: src/app/support/inquiries/new/_components/InquiryFormContent.tsx. Codex가 모바일623×1251에서 두 문구의 계산 스타일과 캡처를 확인했고 변경 ESLint·타입 검사를 통과했다.

## 주문 상품 조회 orderLookup 연결 (2026-11-17)

/support/inquiries/new/order-products와 preview-empty/preview-custom의 기존 직접 진입 경로는 유지하고 IA 모달 유형만 orderLookup으로 갱신했다. 가이드에 전용 유형과 모바일 전체화면을 추가하고 selection의 사용 설명에서 주문 상품 조회를 분리했다. 모달 타입은11개이며 주문 조회는 기존 선택·기간·다중 상품 선택·onSelect·onClose·finalFocus 소유자를 유지한다. API 조회·요청·저장·완료 흐름은 추가하지 않았다. 작업 트리 출처: src/app/screen-index/screenConnections.ts, src/app/screen-index/sourceGraph.generated.json, src/app/support/inquiries/new/order-products/_components/InquiryOrderLookup.tsx, src/app/publishing-guide/_components/ModalGuide.tsx.

## 주문 조회 상품 수 표시 (2026-11-17)

주문 상품 조회는 상품 수 숫자를 기존 countNumber 슬롯으로 분리한다. 경로·선택 상태·조회 및 제출 계약은 유지하며 PC HOKA 16px/700, 모바일 Pretendard 14px/400을 적용한다. 1764px와 375px에서 계산 스타일을 확인했다.

## 공통 날짜 범위 입력 (2026-11-17)

주문/배송조회의 날짜 입력을 DateRangeSearch로 추출해 주문 상품 조회 직접설정에도 적용했다. Panda 컴포넌트, 130×36px 둥근 입력, 점 구분 날짜 표시·숫자 편집·네이티브 달력을 유지한다. 조회 버튼은 날짜 입력 컴포넌트에서 분리하고 각 화면 소유자가 배치한다. 문의 화면은 오른쪽에 조회 링크를 표시한다. 날짜 초안과 오류는 호출자가 소유하며 날짜 변경 콜백만 전달한다. 실제 요청은 이 공통 컴포넌트가 실행하지 않는다. 주문 화면의 조회 링크는 기존 onDateSearch를 호출하며 문의 미리보기의 조회 링크는 요청을 실행하지 않는다.

1764px·375px 두 화면에서 숫자 입력의 점 구분 표시, 달력 입력 존재, 입력 크기와 문서 가로 넘침 없음을 확인했다.

날짜 입력의 내부 여백은 좌측 12px·우측 36px, 달력은 우측 12px로 보정했다. 기존 72px 글자 공간보다 넓은 HOKA 날짜 문자열이 잘리던 문제를 80px 글자 공간으로 해소한다.

## 주문서 쿠폰 조회와 배송 요청 기본값 (2026-11-25)

주문서의 PC·모바일 쿠폰 할인 버튼은 ‘쿠폰 조회하기’로 표시하며 `/checkout/preview-coupons`에서 팝업을 바로 열 수 있다. 배송비 행 자리에는 임직원 할인한도·사용액·잔여한도 표시 데이터를 배치한다. 배송 요청 드롭다운은 `none`(선택 안함)으로 시작하며 `/checkout/preview-delivery-request`는 `custom`으로 직접입력란을 연다. 출처는 사용자 브라우저 코멘트와 `src/app/checkout/_components/CheckoutDiscountSummary.tsx`, `CheckoutShipping.tsx`, `src/app/checkout/checkout-summary.ts` 작업 트리다. PC 1920px·모바일 375px에서 주문서 기본값, 할인한도 문구와 직접입력 상태를 확인했다.

## 주문서 임직원 할인한도 표시 (2026-11-25)

주문서와 쿠폰 미리보기는 같은 임직원 할인한도 영역을 사용한다. 레이블은 Pretendard Medium 500으로 PC 14px, 모바일 13px이다. 왼쪽 정렬한 안내문과의 간격은 공통 16px이다. 공통 안내문의 할인한도·사용액·잔여한도 숫자에는 The Future HOKA 12px/700, 원 단위에는 Pretendard 12px/700, 본문에는 Pretendard 12px/400을 적용한다. 할인한도 금액 묶음은 좌우 2px, 사용액과 잔여한도 금액 묶음은 왼쪽 2px 여백을 둔다. 남은 행 폭에서 시안의 텍스트 조각과 금액 묶음 단위로 줄바꿈하며, 확인한 PC 주문서 폭에서 ‘사용 하셨습니다.’가 둘째 줄에서 시작한다. PC의 쿠폰 조회 버튼과 임직원 행 사이 간격은 24px이다. 모바일 임직원 행의 상단 안쪽 여백은 8px이다.

금액은 `src/app/checkout/checkout-summary.ts`의 고정 표시값이며 표현은 `src/app/checkout/_components/CheckoutDiscountSummary.tsx`가 담당한다. [HOKA Design](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design).

브라우저에서 PC 1420px·모바일 375px는 본문 두 줄, 320px 쿠폰 미리보기에서 팝업을 닫은 뒤 본문 네 줄로 표시되는 것을 확인했다. 세 폭 모두 임직원 영역의 가로 넘침은 없었다. 320px의 페이지 가로 넘침 3px는 임직원 영역을 숨긴 상태에서도 푸터 사업자정보확인 링크에서 발생했다.

## 보유 쿠폰 조회 드롭다운 (2026-11-25)

주문서의 ‘쿠폰 조회하기’ 버튼과 `/checkout/preview-coupons`는 같은 팝업을 사용한다. 상품별 선택은 로컬 초안이며, PC에서는 팝업 위에 선택 목록이 열리고 모바일에서는 ‘상품 쿠폰’ 바텀시트가 열린다. 작업 트리 출처는 `src/app/checkout/_components/CheckoutCouponDialog.tsx`와 `src/app/checkout/checkout-coupons.ts`다. [드롭다운 표시와 검증](ui.md#보유-쿠폰-조회-드롭다운-2026-11-25).

2026-11-26 브라우저 코멘트에 따라 `CheckoutCouponDialog.tsx`의 금액 요약 라벨을 ‘주문금액’, ‘장바구니’로 표시한다.

## 상품 상세와 주문서 ALERT 직접 확인 (2026-11-26)

[HOKA Design](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)의 ‘퍼블 to 디자인 요청’ ALERT 모음에 있는 일곱 프레임을 상품 상세 공통 IA와 주문하기 IA 171의 STATE에 연결했다.

| 화면 | 상태 | 직접 확인 URL | 유형 |
| --- | --- | --- | --- |
| 상품 상세 | 수량 변경 제한 | `/products/pdp-preview/quantity-limit` | alert |
| 상품 상세 | 상품 미선택 | `/products/pdp-preview/product-not-selected` | confirm |
| 상품 상세 | 상품 주소 복사 완료 | `/products/pdp-preview/link-copied` | alert |
| 상품 상세 | 입고 알림 신청 완료 | `/products/pdp-preview/restock-complete` | alert |
| 상품 상세 | 품절 상품 재입고 알림 신청 확인 | `/products/pdp-preview/restock-confirm` | confirm |
| 상품 상세 | 장바구니 추가 완료 | `/products/pdp-preview/cart-added` | alert |
| 주문하기 | 필수 입력 누락 안내 | `/checkout/preview-required-fields` | alert |

모바일 시안의 343px 프레임과 확인·취소 버튼 구성을 확인했다. PC·모바일 공통 ModalDialog의 기존 반응형 규격과 취소·확인 순서를 적용했다. 수량 제한은 시안의 `#개` 표기를 사용하고, 주문서 안내를 닫으면 기존 필드·동의 오류가 보인다. 상태 URL은 안내를 처음부터 열고 확인·취소는 안내를 닫는다. 실제 요청 검증·복사·신청·장바구니 추가 및 결과 갱신은 각 화면 통합 소유자의 연결 범위다.

출처는 위 디자인과 `productDetailPreviews.ts`, `ProductDetailContent.tsx`, `CheckoutStatePreview.tsx`, `preview-required-fields/page.tsx`, `screenConnections.ts` 작업 트리다. 기록: codex/gpt-6, 2026-11-26 KST.

검증은 프로덕션 빌드의 PC 1440px와 모바일 375px에서 수행했다. 7개 모두 직접 진입 시 안내 하나가 열리고, 확인·취소 또는 Escape로 같은 경로에서 닫히며 새로고침 시 다시 열렸다. 모달 폭은 PC 640px, 모바일 343px이었다. IA의 상태명 검색, 링크와 모달 유형을 확인했다. 변경 파일 ESLint·Prettier, TypeScript, 소스 그래프 생성과 프로덕션 빌드를 통과했다. 관련 테스트 20개 중 19개가 통과했고, 기존 고객센터 첨부 방법 미리보기의 IA 소스 경로 검사가 실패했다.

## 주문서 쿠폰 변경 확인 얼럿 (2026-11-26)

`/checkout/preview-coupon-change`에 직접 진입하면 주문서 위에 상품 쿠폰과 장바구니 쿠폰의 동시 사용 제한을 안내하는 변경 확인 모달이 열린다. 주문하기 IA 171에는 ‘쿠폰 변경 확인 얼럿’ 상태와 `confirm` 유형을 연결한다. ‘변경하기’, ‘취소’, 닫기, Escape 키는 모달을 닫고 ‘쿠폰 조회하기’ 버튼으로 포커스를 돌린다. 새로고침하면 모달이 다시 열린다.

첨부 화면의 문구와 액션 순서를 적용하고 크기와 타이포그래피는 공통 모달 스타일을 사용한다. 쿠폰 충돌 판정과 쿠폰 교체 요청 및 주문 견적 갱신은 실제 주문 연결 소유자의 책임이다. 이 경로는 고정 상태를 표시한다. 출처는 사용자 첨부 화면과 작업 트리의 주문서 상태 페이지, 할인 요약 및 IA 연결 파일이다.

Codex는 브라우저에서 PC 1440px와 모바일 375px의 직접 진입·새로고침·버튼 순서·닫기·포커스 복귀 및 기존 보유 쿠폰 조회 미리보기를 확인했다. IA에서 상태명과 URL로 검색해 새 탭으로 열리는 것도 확인했다. 대상 ESLint·Prettier, 전체 TypeScript와 Panda 생성은 통과했다. IA 회귀 검사 16건 중 15건이 통과했으며 기존 문의 첨부파일 선택 미리보기의 소스 연결 검사는 실패했다. 실제 쿠폰 요청은 검증 범위에 포함되지 않는다.

## 쿠폰 조회와 취소 반품 유형 연결 (2026-11-17)

/checkout/preview-coupons, /mypage/orders/preview-cancel-request, /mypage/orders/preview-return-request의 경로와 직접 진입 상태는 그대로 유지한다. IA 표시와 모달 가이드에 모두 productSelection을 연결했다. 모달 variant는12개다.

## 상품 선택 입력 본문 recipe 연결 (2026-11-17)

보유 쿠폰·주문 취소·환불(반품)의 기존 직접 경로와 productSelection 유형을 유지하고 각 본문을 modalProductSelectionContentRecipe에 연결했다. 쿠폰은 coupon 표시 옵션, 취소·반품은 기본 claim 옵션을 사용하며 라우트·초안 상태·선택·닫기 소유자를 변경하지 않았다. 작업 트리 출처: src/app/checkout/_components/CheckoutCouponDialog.tsx, src/app/mypage/orders/_components/OrderClaimRequest.tsx, src/components/common/layouts/ModalDialog.recipe.tsx, src/app/screen-index/sourceGraph.generated.json.

상품 선택 입력 글꼴 검수에서는 기존 취소·반품·쿠폰 경로와 상태를 유지하고, 신청 화면의 준비된 금액 문자열을 숫자/원 표시로만 분리했다. 요청·계산·제출 연결 변경은 없다.

## FAQ 검색 영역 디자인 보정 (2026-11-17)

사용자 지정 [FAQ 검색 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)의 PC·모바일 검색 노드를 기준으로 FaqContent 내부 검색 필드를 PC520px·모바일 가변 폭과 높이56px로 적용했다. 입력 옆 검색 버튼은 PC48px/MO42px 높이·좌우24px·반경52px, 필드와 간격12px/8px이다. placeholder는 Pretendard16px·400·행간24px·#777777, 버튼은16px/15px·400·행간1.3을 사용한다. 모바일 좌우16px은 기존 고객센터 레이아웃이 소유한다.

기존 SearchField는 as=div로 재사용하고 FAQ 검색 영역 한 곳만 form/role=search를 소유한다. 입력 즉시 적용되는 기존 로컬 검색은 유지하고 검색 버튼·Enter는 기본 페이지 제출만 방지한다. FAQ 라우트·IA·카테고리·펼침·더보기 및 실제 조회 미연결 경계는 변경하지 않는다. 출처: 사용자 지정 디자인의 구조·수치, `src/app/support/faq/_components/FaqContent.tsx` 작업 트리와 Codex 확인(2026-11-17).

FAQ 검색 스타일 후속 정리(2026-11-17): 검색 form·입력 컨테이너·버튼·라벨은 FaqContent 상단 styles의 className으로 연결한다. SearchField 내부 여백과 input 규격은 해당 컨테이너의 제한된 자식 선택자로 소유하며 공통 컴포넌트 API·기본 스타일은 변경하지 않는다. 기존 Flex·Box와 단일 form을 유지한다. PC1571/MO375 재측정에서 입력520×56px/가변폭×56px, padding8px 12px·간격12px/8px·버튼48px/42px·라벨16px/15px·placeholder#777777과 가로 넘침 없음이 유지됐다. 타입·대상 ESLint·Panda 생성이 통과했다. 출처: 해당 파일과 Codex 브라우저 재측정.

## 런칭 캘린더 빈 목록 직접 경로 (2026-11-17)

IA160 Feed에 `/launch-calendar/preview-empty`(런칭 일정 없음), IA161 Upcoming에 `/launch-calendar/upcoming/preview-empty`(출시 예정 상품 없음)을 연결했다. 두 page는 기존 LaunchCalendarContent에 mode와 items=[]를 전달한다. 기본 목록·상품 상세·알림 경로는 유지하고 새 IA 번호나 요청 흐름은 추가하지 않는다. 소스 그래프는 정식 생성기로 갱신했다. 화면별 문구·레이아웃·검증은 [빈 목록 기록](launch-calendar.md#feedupcoming-빈-목록-2026-11-17)을 따른다. 출처: 두 신규 page와 screenConnections.ts·LaunchCalendarContent.tsx 작업 트리, Codex(2026-11-17).

## 환불(반품) 신청 수량 노출 (2026-11-17)

OrderClaimRequest에서 반품일 때 NumberStepper를 숨기던 조건을 제거해 PC·모바일 모두 주문 취소와 같은 수량 입력을 표시한다. 상품별 로컬 초안·최소 1·주문 수량 상한과 기존 스타일을 유지한다. 실제 요청·금액 계산은 미연결이며 경로·플랫폼 소유권은 바뀌지 않는다. 출처: src/app/mypage/orders/_components/OrderClaimRequest.tsx 작업 트리. 대상 ESLint·Prettier 확인을 통과했다. 브라우저 실측은 수행하지 않았다.

## 주문내역 마일리지 안내 삭제 (2026-11-17)

CheckoutDiscountSummary의 마일리지 안내 두 문구 삭제를 검토했다. /checkout 및 기존 preview 경로·URL 상태·플랫폼 선택에는 영향이 없다.

출처: 사용자 첨부 Slack 화면과 src/app/checkout/_components/CheckoutDiscountSummary.tsx 작업 트리. 기록: codex/gpt-6, 2026-11-17T07:42:10.485Z. 기존 generated·source_revision·draft 이력은 보존한다.

## 전화번호 하이픈 표기 규칙 (2026-11-17)

전화번호는 공백 없는 하이픈 표기를 기본으로 하며 디자인의 점·공백 구분보다 우선한다. 번호 자체와 지역번호·대표번호 자리수는 유지한다. 주문서 CheckoutShipping의 연락처 2곳과 orders.data.ts의 주문내역 연락처 9곳을 변경했다. 라우트·상호작용·스타일은 변경하지 않았다. 작업 트리 출처: AGENTS.md, src/app/checkout/_components/CheckoutShipping.tsx, src/components/orders/orders.data.ts. 정규식으로 src를 재검색하여 점 구분 전화번호가 남지 않았음을 확인했다.

## 주문서 피드백 반영 (2026-11-17)

검토 범위는 CheckoutForm·CheckoutShipping·CheckoutCouponDialog와 기존 /checkout, /checkout/preview-coupons, /checkout/preview-delivery-request다. 경로·IA 연결·라우터 상태·플랫폼 판별에는 영향이 없다. 기본 배송 요청 seed만 door로 변경하고 custom 직접 입력 seed는 유지한다.

출처: 사용자 첨부 Slack 대화·화면과 위 working_tree_sources의 checkout 소스. 기록: codex/gpt-6, 2026-11-17T07:38:24Z. 기존 generated·source_revision·draft 및 과거 검증 이력은 보존한다.

## 매장 찾기 지역 탭 제외 (2026-11-17)

`/support/store` 경로와 기존 IA 연결을 유지한다. 사용자 최종 요청에 따라 지역 탭 및 tab 쿼리 연결을 추가하지 않고 준비된 세 매장 목록을 표시한다. page는 라우트 구성, `_components/StoreContent.tsx`는 목록 UI, `store.data.ts`는 표시 fixture를 소유한다. API·지도·길 찾기는 연결하지 않는다. 1920px·375px 직접 진입에서 탭 없는 목록을 확인했다. 상세 규격과 검증 범위는 [목록 시안 보정](ui.md#매장-찾기-목록-시안-보정-2026-11-17)을 따른다.

## 매장 찾기 표기 통일 (2026-11-17)

/support/store의 PC·모바일 제목과 breadcrumb를 `매장 찾기`로 통일해 기존 고객센터 내비게이션과 일치시켰다. 제목 분기에만 쓰던 usePlatform 호출을 제거했으며 경로·목록·반응형 스타일은 유지한다. 작업 트리 출처: src/app/support/store/page.tsx. 기록: codex/gpt-6, 2026-11-17T07:58:26.211800+00:00.

## 매장 목록 Panda 스타일 이름 정리 (2026-11-17)

`src/app/support/store/_components/StoreContent.tsx`의 정적 레이아웃 스타일을 같은 파일 상단 `styles`의 storeList·storeItem·storeDetails·contactDetails·contactRow로 모았다. Stack·HStack·ContentSection과 기존 의미 태그를 유지하며 패턴/기본 gap과의 병합 순서를 보존하도록 css.raw 객체를 css prop에 전달한다. body·phoneLink는 기존 className을 유지한다. 라우트·표시 데이터·전화 링크·영업시간 조건은 변경하지 않았다.

변경 파일 ESLint·Prettier, Panda 생성과 전체 타입 검사를 통과했다. 브라우저에서 375px·1920px 각각 목록 하위 36개 요소의 태그·내용·위치·크기와 display·방향·gap·padding·margin·구분선·font·color를 변경 전후 비교해 동일함을 확인했다.

## 매장 목록 검수 타이포 보정 (2026-11-17)

사용자 브라우저 주석 규격에 따라 StoreContent의 매장명 색상을 #000000으로 명시하고 본문·전화번호·운영시간을 language="ko"로 지정해 숫자도 Pretendard Regular·자간 -0.02em으로 표시한다. body·phoneLink의 색상은 #4D4D4D, 행간은 1.5다. 기존 레이아웃·표시 데이터·전화 링크·영업시간 조건과 경로는 유지한다. 작업 트리 출처: src/app/support/store/_components/StoreContent.tsx.

PC 1305px에서 매장명22px/900/26.4px·자간-0.44px, 본문16px/24px·자간-0.32px와 간격20/12/6px를 확인했다. 모바일375px에서 매장명20px/700/24px·자간-0.4px, 본문14px/21px·자간-0.28px와 간격16/8/4px를 확인했다. 두 플랫폼의 제목색은 검정, 정보색은 rgb(77,77,77)이며 모바일 전화번호 실제 글리프는 Pretendard-Regular다. 변경 파일 ESLint·Prettier, Panda 생성·전체 타입 검사를 통과했다.

## 모바일 검색 결과 공통 레이아웃 (2026-11-17)

스태시 복원 변경의 `ProductListingPage.tsx`와 `ShopShell.tsx`를 검토했다. `/search?q=...` 경로는 유지하며 모바일 검색 결과에도 공통 헤더·푸터와 일반 목록 레이아웃을 표시한다. 검색 결과 전용 닫기·재검색 입력을 제거하고 모바일 필터 버튼은 유지한다. 재검색은 공통 헤더 검색 팝업에서 수행한다.

출처: 위 두 파일의 스테이징된 변경, Codex의 충돌 해결 중 소스 차이 검토(2026-11-17). 이번 충돌 해결에서는 브라우저·빌드 검증을 재실행하지 않았다.

## 모바일 검색 결과 IA 연결 (2026-11-17)

2026-11-26 검색·상품 목록의 색상 칩은 현재 경로와 검색 조건을 유지한다. 상세 이동은 공통 카드의 사진·상품명 링크에서 발생하며, 기존 상세 라우트가 목록 소유자가 전달한 색상별 상품 주소를 받는다. 출처는 `src/components/common/molecules/ProductCard/ProductCard.tsx` 작업 트리다. [카드 링크 규칙](ui.md#목록-카드의-색상별-상품-상세-이동-2026-11-26)

IA247은 기존 `/search`와 `/search/preview-no-results`를 유지하며 모바일도 일반 검색 결과 페이지로 표시한다. 소스 그래프에서 제거된 검색 입력·검색 헤더 의존성을 정식 생성 명령으로 갱신했다. 출처: `src/app/screen-index/sourceGraph.generated.json`, `src/components/catalog/ProductListingPage.tsx`, `src/context/ShopShell.tsx` 작업 트리; Codex, 2026-11-17.

## EmptyState 기본 variant 생략 (2026-11-17)

사용자 요청으로 OrdersList.tsx의 EmptyState에서 variant="standard"를 생략했다. EmptyState의 컴포넌트 기본값과 recipe defaultVariants가 같은 standard를 사용하므로 주문 빈 목록의 제목·부모 선택자·PC/MO 여백·라우트·상태 소유권은 유지한다. 다른 page/content/minimal/plain 호출은 변경하지 않았다. 출처: 사용자 요청과 src/app/mypage/orders/_components/OrdersList.tsx 작업 트리.

검증: 변경 OrdersList.tsx ESLint·Prettier와 npm run typecheck 통과. variant 생략은 기존 standard 파라미터 기본값을 사용하며 스타일 선언 변경이 없어 브라우저·빌드는 다시 실행하지 않았다.

## EmptyState layout 선택 연결 (2026-11-17)

앞선 기본 standard 생략 정리는 사용자의 후속 지시로 취소했다. 주문 목록은 variant="standard"를 명시하고 layout="orders"만 추가한다. 런칭 launch, 리뷰 reviews, 마이페이지 주문 요약 orderSummary, FAQ faq, 문의 inquiries와 상품 문의 productInquiry/inquiryBoard를 기존 EmptyState에 연결했다. 상품내역·배송지·러닝세션·상품/검색 목록의 공유 UI도 같은 layout 계약을 사용한다. 숫자 스타일은 recipe가 소유하며 표시 데이터·상태·URL·콜백·태그/폼 경계와 부모 컴포넌트는 유지한다. 새 route나 상태 URL은 추가하지 않았다. 19개 기존 URL의1440/375px 비교38개 경우에서 측정 결과가 동일했고 가로 넘침이 없었다. 상세 계약·검사와 미검증 분기는 [UI 문서](ui.md#emptystate-화면별-layout-통합-2026-11-17)를 따른다. 출처: 위 작업 트리와 사용자 요청, Codex 검사.

## 빈 장바구니·주문서·취소 내역의 EmptyState 연결 (2026-11-18)

/cart/preview-empty, /checkout/preview-empty, /mypage/returns/preview-empty의 기존 독립 빈 안내를 EmptyState layout=cart/checkout/claimHistory로 변경했다. 장바구니24px 아이콘·관심상품/베스트 상품 두 링크, 주문서 장바구니 복귀 링크, 취소/반품 문구와 PC120px/MO96px 상하 여백을 유지한다. 기존 Stack/HStack/Box와 span/p/section 의미 및 route·상태·서비스 owner는 바뀌지 않는다. Root의 타이포 props를 recipe className으로 이동했으며 as만 호출자에 남겼다. EmptyState가 이미 적용된 다른 route와 inquiryPreview의 스타일 선택도 같은 계약을 사용한다. 일시 타입 비교 route는 검증 후 삭제했고 새 상태 URL/IA는 추가하지 않았다. 기존22개 URL의 PC/MO44개 경우가 변경 전과 일치했다. 상세 원인과 제한은 [UI 문서](ui.md#emptystate-타이포-클래스와-빈-안내-통합-2026-11-18)를 따른다. 출처: 사용자 요청, 해당 작업 트리와 Codex 검사.

## 빈 상태 안내문 태그 통일 (2026-11-18)

EmptyState 기본 제목 태그를 p로 통일하고 호출부의 불필요한 titleProps.as를 제거했다. 기존 URL·콘텐츠·상태·링크·variant 명시는 유지한다. 대표6개 URL의 PC/MO12개 경우에서 P 태그와 기존 측정 스타일 보존을 확인했다. 상세는 [UI 문서](ui.md#emptystate-안내문-p-기본값-2026-11-18). 출처: 사용자 요청, EmptyState와 호출부 작업 트리, Codex 검사.

## 마이페이지 메인 주문 요약 제거 (2026-11-18)

최신 시안에 따라 /mypage의 주문 배송 요약·전용 주문 fixture·previewNoOrders 분기를 제거했다. IA177 기본 상태는 회원 요약 및 메뉴이고 로그아웃 확인 미리보기만 노출한다. 기존 /mypage/preview-no-orders는 설치된 Next.js redirect로 /mypage에 연결해 이전 직접 주소를 보존한다. 실제 주문 조회 /mypage/orders와 다른 화면의 빈 상태 계약은 유지한다. sourceGraph는 정식 생성 명령으로 갱신했다.

출처: [마이페이지 메인 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), src/app/mypage/_components/MyPageContent.tsx, src/app/mypage/mypage-home-data.ts, src/app/mypage/preview-no-orders/page.tsx, src/app/screen-index/screenConnections.ts, src/app/screen-index/sourceGraph.generated.json 작업 트리. Codex, 2026-11-18. 브라우저에서 이전 preview 주소의 /mypage 이동과 PC·모바일 기본 화면 및 로그아웃 확인창 열기·Escape 닫기를 확인했다.

- 머지 충돌 해결 후 회원정보 편집 화면과 모바일 검색 화면의 셸 분기를 복구했다.

## 브랜치 병합 충돌 해결 (2026-11-18)

origin/pub-psh-1015의 ReviewsContent 이동·리뷰 표시 구조와 현재 브랜치의 EmptyState recipe/layout 계약을 함께 유지했다. 새 리뷰 화면에 reviews layout을 연결하고 주소 목록의 동일한 embedded 배치 중복 override를 제거했다. page 유형 모바일 액션의 전체 너비는 보존했다. 출처: 두 브랜치 병합과 해당 컴포넌트 작업 트리. TypeScript와 충돌 대상 ESLint, staged OKF 검사를 통과했다. 브라우저 시각 검증은 수행하지 않았다.

## 빈 장바구니 검수 스타일 반영 (2026-11-18)

/cart/preview-empty의 제목과 빈 안내/추천 상품 사이 간격을 사용자 검수 수치로 보정했다. 기존 /cart의 같은 CartEmptyContent에도 적용되며 링크·route·상태/추천 데이터 소유권은 유지한다. PC1538/MO375에서 제목28/22px·900 및 영역 간격96/72px과 가로 넘침 없음을 확인했다. 출처: CartEmptyContent.tsx·EmptyState.recipe.tsx 작업 트리와 사용자 브라우저 주석. [상세](ui.md#빈-장바구니-제목과-추천-영역-간격-검수-2026-11-18).

## 빈 장바구니 헤더 아래 여백 (2026-11-18)

/cart/preview-empty는 OrderPageLayout.paddingTop에 PC72px/MO40px을 전달한다. 공용 OrderPageLayout의 기본값과 checkout/일반 cart 경로는 변경하지 않았다. cart EmptyState의 안내 그룹/버튼 간격은 recipe에서40/32px로 지정하고 추천 간격96/72px은 유지한다. PC1538/MO375에서 실제 세 간격과 가로 넘침 없음을 확인했다. 출처: page.tsx와 EmptyState.recipe.tsx 작업 트리, 사용자 브라우저 주석. [상세](ui.md#빈-장바구니-상단버튼-간격-검수-2026-11-18).

## 기획에 없는 주문서 빈 화면 제거 (2026-11-18)

사용자 기획 범위 확인에 따라 주문서 상품 없음 전용 경로와 CheckoutEmptyState, preview 상태 분기 및 공통 EmptyState의 checkout 전용 스타일을 제거했다. IA 171의 해당 보조 링크·소스 등록도 제거하고 정식 명령으로 의존 그래프를 갱신했다. 기본 주문서와 다른 주문서 상태 경로는 유지한다. 위의 빈 주문서 통합·검증 기록은 삭제 전 이력이다. 출처: 사용자 검토와 현재 작업 트리.

검증: Next 경로 타입 재생성·TypeScript 검사·EmptyState/IA 그래프 테스트 3개·수정 TSX lint 통과. 소스와 생성 그래프에 삭제 경로 참조가 없음을 확인했다. 브라우저 화면 검증은 이번 삭제 작업에서 수행하지 않았다. 기존 스테이지는 변경하지 않았다.

## 주문 조회 없음 PC 시안 검수 (2026-11-18)

/mypage/orders/preview-empty의 PC 표 헤더와 빈 안내 스타일을 수정했다. 직접 preview·기본 주문·취소/반품 빈 화면을 PC/MO에서 확인했다. 경로·page 진입점·fixture·연결 콜백은 유지하며 새 상태 경로는 추가하지 않았다. 출처: OrdersList.tsx·OrdersStatus.tsx 작업 트리와 사용자 요청. 상세 수치·검증·모바일 행간 후속 지정은 [UI 기록](ui.md#주문-조회-없음-pc-시안-반영-2026-11-18)을 따른다.

## 기간 조회 공용화와 취소 빈 표 헤더 (2026-11-18)

주문/취소 목록과 문의 주문 상품 조회의 기존 경로·page 진입점은 유지한다. OrdersContent는 dateSearch props로 공용 UI 계약을 전달하고 OrdersPage/문의 모달이 초안을 소유한다. OrdersFilters 전달 wrapper를 제거했으며 임시 상호작용 검증 route는 삭제했다. 취소 빈 목록의 PC 표 헤더를 항상 표시하고 수량 컬럼을 본문과 맞췄다. 상세 계약·검증: [공용 기간 UI](ui.md#공용-기간날짜-조회-ui-2026-11-18), [취소 빈 표](ui.md#취소반품-빈-목록-pc-표-헤더-2026-11-18). 출처: OrdersPage/OrdersContent/OrdersList/OrdersStatus·InquiryOrderLookup 작업 트리.

- 회원정보 확인의 공통 표시 순서를 아이디·이름·성별·생년월일·휴대폰·주소·이메일로 맞췄다. 성별 예시는 남성이며 퍼블 가이드에도 반영했다.

- 회원정보 수정 화면의 성별·휴대폰 표시, 비밀번호 버튼 위치와 모바일·PC 간격 및 구분선을 시안에 맞췄다.

- 회원정보 수정의 모바일 회원탈퇴 링크를 왼쪽에 정렬하고 우편번호 찾기 버튼 문구를 변경했다.

- 회원정보 수정 모바일 수신 동의 하단선을 black.20으로 지정하고, 하단 버튼과 탈퇴 안내 간격을 조정했다.

- 회원정보 수정 기본 미리보기의 저장된 휴대폰 번호와 별도의 번호 변경 입력을 표시한다. 일반 수정 화면과 미리보기 모두 입력란 아래 24px 간격에 인증번호 요청 버튼을 둔다. PC는 중앙 180px, 모바일은 전체 너비이며 높이는 40px이다. 실제 발송은 연동 대상이다.

- 회원정보 수정에서 비밀번호 설정 완료 표시를 버튼 아래에 배치하고 완료 미리보기에서 확인할 수 있다. 실제 저장 성공 여부는 연동 상태가 전달한다.

- 관심상품·최근 본 상품·재입고 알림이 공유하는 MyPageProductHistory를 마이페이지 공통 _components로 옮겼다.

- 마이페이지 공통 프레임을 app/mypage/_components로, 메뉴 데이터는 app/mypage로 옮기고 사용처를 연결했다.

## 추가 마이페이지 변경 병합 (2026-11-18)

origin/pub-psh-1015의 추가 커밋 a075b78d·b4b33434를 병합했다. MyPageFrame·MyPageProductHistory·메뉴 데이터의 마이페이지 소유 경로 이동과 회원정보·배송지·상품내역 정리를 반영하고, 현재 브랜치의 메인 주문 요약 제거 및 EmptyState layout 계약을 유지했다. 삭제된 주문 fixture import를 복원하지 않았으며 상품내역 안내는 상대 브랜치의 정리된 current.note를 사용한다. 소스 그래프는 생성기로 갱신했다. 출처: 두 브랜치와 해당 병합 소스. TypeScript 및 충돌 대상 ESLint 통과; 브라우저 시각 검증 미실시.

병합 보완: 이동된 MyPageProductHistory에서 최근 본 상품 PC 빈 안내의 기존 줄바꿈을 보존했다. 상태 경로는 변경하지 않았다. 해당 파일 ESLint 통과.

## 공통 더보기 표시 규칙 (2026-11-18)

사용자 요청으로 콜백 미연결만을 이유로 한 더보기 disabled를 러닝세션 신청내역·리뷰·쿠폰·공지·FAQ·상품문의·주문상품 조회·배송지의 8개 호출부에서 제거했다. 실제 pending/명시적 사용 불가 disabled는 보존한다. Button.loadMore의 별도 숫자 Typography는 weight=inherit를 사용한다. 기존 counter 모드의 inherit와 인라인 부모 상속은 유지한다. 미연결 fixture는 표시만 제공하며 조회를 구현하지 않았다. 강제 규칙은 AGENTS.md에 기록했다. 출처: 사용자 브라우저 검토·현재 Button과 호출부.

## 러닝세션 신청내역 빈 문구 구분 (2026-11-18)

사용자 검토에 따라 취소 탭의 빈 문구를 취소한 러닝세션이 없습니다.로 구분하고 전체·신청완료는 기존 신청한 러닝세션이 없습니다.를 유지한다. 기존 탭 상태 소유자와 고정 fixture를 사용하며 서비스 동작은 추가하지 않는다. 출처: 사용자 브라우저 검토와 RunningSessionEntriesContent.tsx.

실제 브라우저 확인: 취소·신청완료·전체 탭을 전환해 각각 취소/신청 문구를 확인했다. 더보기 disabled=false와 숫자·부모의 계산 굵기600 일치도 확인했다. 변경 파일 lint와 TypeScript 검사를 실행했다.

## 공지사항 빈 안내 plain 전환 (2026-11-18)

사용자 검토에 따라 공지사항 빈 안내를 minimal에서 plain·notices layout으로 전환했다. recipe의 notices가 본문 PC16px/MO14px·normal·subtle 색상과 기존 최소높이180px·상단42px을 소유한다. 공통 heading형 제목22/20px 규칙과 구분되는 본문형 안내다. 목록·pending/error 조건과 기본 EmptyState variant는 유지한다. 출처: 사용자 브라우저 검토, NoticesList.tsx와 EmptyState.recipe.tsx.

## 공지사항 모바일 상단선 제거 (2026-11-18)

사용자 검토에 따라 NoticesList 목록 루트의 모바일 border-top을 0으로 변경했다. PC2px 상단선과 테이블형 빈 안내220/120px 공통 크기는 유지한다. 빈/유상품 목록이 같은 루트를 사용한다. 출처: 사용자 모바일 브라우저 주석과 NoticesList.tsx.

## 쿠폰 빈 목록 건수 숨김 (2026-11-18)

사용자 검토에 따라 CouponManagement에서 visibleCoupons.length가0일 때 총0건 영역을 렌더링하지 않는다.1건 이상인 기존 건수 표시와 빈 안내는 유지한다. 출처: 사용자 브라우저 주석과 해당 작업 트리.

## 목록 머리글 공통 스타일 (2026-11-18)

checkout, mypage orders(상세·취소반품 포함), reviews, restock-alerts, support/notices의 기존 머리글을 공통 Table.recipe className으로 연결한다. 라우트·직접 확인 URL·모바일 표시 조건과 데이터/콜백 소유권은 유지한다. 별도 페이지/래퍼는 추가하지 않는다. 스타일과 조사 범위는 [공통 UI 문서](ui.md#공통-목록-머리글-스타일-2026-11-18)를 따른다.

## 마이페이지 기준 높이 정렬 (2026-11-18)

마이페이지 메뉴 제목의 행간을 한글 기준120%로 통일했다. 언어별 글꼴·크기·굵기는 유지하며 PC 제목 높이33.6px, 모바일26.4px이다.

검증: 로컬 브라우저 PC1440에서 마이페이지·여성 상품 목록 nav 상단162px 일치, 모바일375에서 메뉴 제목5개 동일 높이 확인. 대상 ESLint·TypeScript·Panda 생성·diff 검사 통과. 출처: 사용자 첨부와 위 작업 트리, codex/gpt-6 기록.

- 재입고 알림 목록은 대기·발송 상태를 텍스트로 표시하며 취소 모달을 제공하지 않는다. 기존 목록 및 빈 화면 주소는 유지한다.

- 주문·배송 조회 경로에서 주문 현황과 상품 목록의 간격·구분선·버튼 크기를 PC와 모바일 시안에 맞췄다. 기존 URL과 화면 동작은 유지한다.

- 주문 조회의 남은 작업 트리 변경을 반영했다: 모바일 날짜 영역 패딩, 기간 조회 하단 여백, 주문 현황 가로 여백과 PC 목록 구분선.

- 주문 상세 제목과 본문 간격 및 PC 배송 조회·리뷰 작성 버튼 크기를 조정했다. 주문·취소 상세 경로와 동작은 유지한다.

표/목록 하단선의 플랫폼별 색상은 기존 OrdersProducts·OrdersList·OrderDetails·MyPageProductHistory·ReviewsContent 소유자에서 Table.recipe의 className으로 연결한다. 주문 그룹은 PC검정/MO회색, 취소반품 내역은 PC회색/MO검정이다. 라우트와 서비스/상태 소유권은 유지한다. 검증과 옵션 표는 [공통 UI 문서](ui.md#표목록-하단선의-pc모바일-색상-2026-11-18)를 참고한다.

## DataList 적용 경로 (2026-11-18)

Table.recipe를 DataList.recipe로 이전하고 기존 목록·합계·상세·모달의 경계선을 공통화했다. 경로와 상태·서비스 소유권은 유지하며 새 preview 경로는 추가하지 않았다. 소스 연결 그래프는 npm run screen-files/prebuild로 재생성했다. 머리글 Typography만 기존 span+typography case로 전환하고 본문 Typography는 유지한다. 마이페이지/결제 배송지 목록과 연결 모달도 기존 경로를 재사용한다. 구체적인 기본/상태55개 링크와 실제 검증 범위는 [DataList 적용 화면과 링크](ui.md#datalist-적용-화면과-링크)에 기록한다.

장바구니 상품 목록의 누락된 DataList row 연결을 보완했다(2026-11-18). /cart 및 기존 수량제한·옵션변경 상태가 동일 CartProductSection을 사용하며 URL·상태·콜백 계약은 유지한다. 소스 그래프는 정식 screen-files 명령으로 갱신했다. PC/MO10개 항목의 스타일 전후 일치 검증은 ui.md의 장바구니 누락 보완 항목에 기록한다.

2026-11-18 가로 간격 API 정리: /cart와 /checkout/preview-address-change 및 마이페이지 배송지 목록은 각각 productControls/addressActions case를 사용한다. PC/MO 기존16/8px·24/24px을 보존하고 별도 mobileColumnGap을 제거했다. 경로·상태·콜백 계약은 유지한다.

## 스태시 충돌 해결과 주문 스타일 우선순위 (2026-11-18)

사용자 지시에 따라 주문 조회·상세 스타일은 sallysprism의 8082d6b2·c0a441e9·2d769da4가 반영된 HEAD를 기준으로 유지했다. OrderDetails.tsx·OrdersList.tsx·OrdersProducts.tsx에는 스태시의 DataList 공통화를 적용하지 않았다. 주문 상세의 추가 상단 margin을 복원하지 않고, 주문 그룹 gap16px·PC 세로 padding0·모바일 padding24px 및 모바일 목록 간격16px을 보존한다. 표 헤더의 기존 유상품/빈 목록 타이포 분기도 유지한다. 따라서 위 세 파일은 앞선 DataList 적용 목록의 예외다. 다른 화면의 스태시 변경은 보존했으며 MyPageProductHistory는 재입고 상태 텍스트와 DataList 연결을 함께 유지했다. 소스 그래프는 screen-files로 재생성했다. 출처: 사용자 우선순위 지시, 해당 커밋과 현재 스태시 충돌 양쪽 소스. 브라우저 시각 검증은 수행하지 않았다.

2026-11-18 목록 부모 소유권 정리: /cart, /checkout(배송지 모달 포함), /mypage/restock-alerts, /mypage/reviews, /support/notices의 기존 목록 부모가 DataList list/linkedList를 통해 직접 항목의 간격과divider를 제어한다. DOM·경로·상태·서비스 콜백은 유지한다. 카트 시작선은 전체선택 영역의 하단에서 상품 ul 상단으로 동일1px #E9EAEB를 이동했다. 소스그래프를 정식 명령으로 확인했다.

2026-11-18 DataList top API 정리: CheckoutSummary·MyPageProductHistory·ReviewsContent·NoticesList·공지상세의 mobileTop을 기존 PC/MO 조합에 대응하는 top strongToThin/desktopStrong으로 교체했다. URL·DOM·데이터/서비스 계약은 유지한다. 사용하지 않는 row 슬롯 제거는 호출부 변경을 요구하지 않았다. 스타일 등가 검사와 실제 옵션 표는 ui.md에 기록한다.

2026-11-18 DataList columnGap 기본flush 적용: CheckoutSummary·ReviewsContent의 명시적 flush 호출을 dataListRecipe().list로 줄였다. 이전 명시적 flush와 모든 슬롯 스타일이 같으며 기존 머리글-본문 사이0·경로·상태·서비스 계약은 유지한다.

## 상품리뷰 목록 시작선

상품리뷰의 정렬·건수 아래 시작선은 목록 행과 같은 1px 회색 `#E9EAEB`를 `DataList`의 `top: thinSubtle`로 적용한다. 작성 가능한 리뷰는 목록 `ul`, 내가 작성한 리뷰는 머리글과 `ul`을 묶는 목록 부모가 시작선을 소유한다.

출처는 사용자 브라우저 댓글과 `src/app/mypage/reviews/_components/ReviewsContent.tsx`의 작업 트리다. Codex가 2026-11-26에 `/mypage/reviews`와 `/mypage/reviews/preview-written`의 PC 1440px·모바일 390px에서 시작선과 목록 행의 색상 일치, 시작선 두께 1px, 정렬 영역 하단선 0px을 확인했다.

## 상품리뷰 목록 썸네일

작성 가능한 리뷰와 내가 작성한 리뷰 목록은 `OrderProductSummary`의 `imageSize`에 PC·모바일 모두 96px를 전달한다. 썸네일은 96×96px 영역에서 상품 이미지 비율을 유지한다.

출처는 사용자 브라우저 댓글·후속 요청과 `src/app/mypage/reviews/_components/ReviewsContent.tsx`의 작업 트리다. Codex가 2026-11-26에 `/mypage/reviews`와 `/mypage/reviews/preview-written`의 PC 1440px, 모바일 390px·320px에서 모든 행의 썸네일 크기와 리뷰 버튼 배치를 확인했다. 320px의 페이지 가로 넘침 3px은 기존 64px 크기를 적용한 비교에서도 같은 값이었다.

2026-11-18 동일 부모 DataList root/list 통합: cart·결제·재입고·배송지의 class 배열을 하나의 root 호출로 줄였다. 리뷰 본문은 top unchanged로 기존 바깥 머리글 선 소유권을 유지한다. 기존 슬롯 list만 제거하고 URL·DOM·상태·서비스 계약은 유지한다. 옵션별 검증은 ui.md에 기록한다.

2026-11-18 최신 화면 피드백: /checkout/preview-address-change 목록 모달의 빈 pseudo 여백을 제거하고 배송지 항목별 py24를 적용했다. /checkout/preview-address-edit 및 /checkout/preview-address-new 폼 구분 영역은 유지한다. /mypage/addresses 기본·빈 상태의 제목 PC40/MO32px 여백과 검정선2px을 유지한다. /mypage/orders 및 /mypage/orders/preview-empty의 세 머리글은 DataList H9(20px/700)로 연결한다. 모바일 숨김·본문·기존 경로·상태·서비스 계약은 유지한다. 공통 더보기400은 기존 Button.loadMore 사용처에 적용한다. 실제 검증 범위는 ui.md에 기록했다.

## 주문 취소·반품 상품 선택 목록 스타일 소유권 (2026-11-19)

OrderClaimRequest의 상품 선택 목록은 DataList root가 소유한다. top thinStrong/columnGap unchanged/itemLayout productSelection을 기존 Stack css에 연결하고 직접 HStack에 data-list-item을 표시한다. 목록 gap0과 상·하단1px 검정선, 항목 gap16/py16/상단 정렬과 항목 사이1px #E9EAEB를 유지하며 마지막 항목의 중복선은0이다. itemLayout 기본 unchanged는 배치를 추가하지 않는다. ModalDialog recipe의 미사용 products 슬롯과 claim 상품 배치 선언은 제거했다. 쿠폰 전용 product 슬롯 및 본문 Typography·데이터·선택·수량 콜백은 유지한다.

검증: 취소 신청과 반품 신청 고정 URL(/mypage/orders/preview-cancel-request, /mypage/orders/preview-return-request)에서 PC1225/MO375 목록선·gap·항목 padding·구분선·정렬의 계산값을 확인했다. DataList itemLayout 생략/undefined/unchanged의 기존 raw 기본 스타일과 쿠폰의 유지 슬롯 스타일은 전후 동일하다(Panda py/paddingBlock 동의어 정규화). 대상 ESLint/Prettier, TypeScript, Panda 생성 및 소스 그래프 재생성을 통과했다. 새 경로나 서비스 계약은 추가하지 않았다.

## 배송조회 상품추적 시안 반영 (2026-11-19)

배송조회 PC·모바일 시안을 구조화해 확인하고 상품추적 표를 집배점/구분/처리일자 3열로 맞췄다. 집배점은 기존 destination 표시 데이터, 구분·일시는 기존 이력 fixture를 재사용한다. 모바일 시안의 후속4열 행은 기본3열과 구조가 달라 임의 데이터를 추가하지 않았다. 기본정보·단계·서비스 계약은 유지한다.

DataList itemLayout trackingTable이 기존 table DOM의 시작선2px 검정·머리글 하단1px 검정·본문 하단1px #E9EAEB와 셀 여백을 소유한다. 머리글은 PC14px/400/py16, MO12px/400/py12이며 검정이다. 양옆 padding2px으로 열 사이4px을 구성하고 앞 두 열은 PC144px/MO84px(텍스트140/80px)이다. 날짜는 기존 The Future HOKA를 유지하고 시안의400으로 변경했다. ModalDialog의 table 슬롯과 해당 중복 스타일은 제거했다. 다른 DataList 옵션의 기본값은 유지한다.

검증: PC1920 및 MO375 브라우저 계산값에서 머리글 크기·굵기·여백·열너비·검정선, 본문 회색선과 날짜400을 확인했고 모바일 캡처를 확인했다. 대상 ESLint·Prettier·TypeScript·Panda 생성·소스그래프 재생성 통과. hoka-markup-handoff 기준으로 기존 table/caption/th scope 의미·상태 소유권·본문 데이터와 반응형 경계를 점검했다. 이번 변경 후 전체 production build는 실행하지 않았다. 디자인 출처: [HOKA 화면 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design).

## 취소·반품내역 DataList 재연결 (2026-11-19)

ClaimHistoryList PC 부모 root가 상단2px 검정과 직접 data-list-item의 하단1px var(--color-border-subtle)을 소유한다. semanticSubtle case로 기존 토큰 참조를 보존한다. 머리글은 DataList header/cell headingBold/heading으로 연결하고 기존20px/700·py20·검정 하단1px 및 열너비를 유지한다. 모바일 ul root는 top none/rowBorder strong/columnGap unchanged로 항목 검정 하단1px을 소유한다. 항목의 중복 border와 로컬 머리글 스타일은 제거했다. 본문 Typography·PC pt32/pb32 및 모바일 목록gap24·상세 콜백은 유지한다.

PC1440 일반 목록의 회색 항목선·머리글20px/700과 MO375 검정 항목선을 확인했다. /mypage/returns/preview-empty의 PC 머리글 py20·상단2px/하단1px 검정선 및 빈 상태 유지도 확인했다. TypeScript·대상 ESLint/Prettier·Panda·소스그래프 생성을 수행했다. 기존 EmptyState 높이·선 소유권과 주문 조회 화면 계약은 유지한다.

## 머리글 셀 스타일의 부모 소유권 (2026-11-19)

리뷰·결제·재입고·주문·취소반품·공지 머리글의 개별 span recipe 호출을 제거했다. 기존 부모 root에 headerTypography/cellVariant를 지정하고 직접 머리글은 data-list-header, 셀은 data-list-cell로 표시한다. DataList는 이 표시가 있는 직접 머리글의 직접 셀만 선택하며 본문 typography에 전파하지 않는다. 기존 cell 슬롯 API는 호환성을 위해 유지한다. 공지는 noticeColumns로 title/date의 왼쪽 정렬과 padding16/32px을 부모에서 소유하며 기본 중앙 정렬보다 높은 선택자 우선순위를 둔다. 기존 글자 크기·굵기·transform·간격·경계선은 유지한다.

최신 사용자 요청으로 리뷰 정렬/총건수 아래의 목록 시작선만 제거했다(top none). 머리글 하단1px 검정과 항목 하단1px #E9EAEB는 유지한다. 리뷰 빈 상태의 기존 머리글 미표시와 모바일 머리글 숨김도 유지한다.

검증: 기존 headerTypography6종/cellVariant4종의24개 조합에서 cell raw값 동일성을 확인했다. PC1440 결제·재입고·주문·취소반품·리뷰20px/700/중앙 정렬과 공지16px/600/왼쪽 정렬·셀별 padding을 확인했다. 리뷰 작성완료 빈 상태의 셀0개 및 MO375 머리글 숨김을 확인했다. 리뷰 최종 시작선0px·머리글 하단검정1px·두 항목 회색1px도 확인했다. 대상 ESLint/Prettier·TypeScript·Panda 생성·소스그래프 재생성을 수행했다. 전체 production build는 이번 변경 후 실행하지 않았다.

최신 추가 확정: 리뷰 머리글 자체의 상단에는 DataListBoundary top strong을 기존 header raw 스타일과 합쳐2px 검정선을 적용한다. 정렬 영역/바깥 root의 상단선0은 유지한다. PC1253에서 머리글 상단2px·하단1px 검정과 바깥 root0px을 확인했다. 모바일 머리글 숨김은 유지한다.

## 상품 문의 목록 DataList 연결 (2026-11-19)

ProductDetailContent의 InquiryBoard Accordion 부모 root에 itemLayout inquiryAccordion을 연결했다. 직접 항목 div의1px var(--color-border-default) 구분선과 표시한 data-list-columns의 PC columnGap0/MO12px을 관리한다. 기존 rowGap0/MO12px은 InquirySubject 소유자에서 유지한다. 헤더 하단1px 검정선은 DataListBoundary bottom strong으로 연결하고 중복 itemClassName은 제거했다. 본문 Typography·열너비·minHeight·패딩·공개/비공개·질의 펼침·더보기 계약은 변경하지 않는다. 신규 래퍼/route는 만들지 않았다.

검증: PC1440에서 항목 구분선1px #D8D8D8 및 열간격0을 계산값으로 확인했다. 모바일12px은 원래 반응형 값을 그대로 이전했으며 이번 브라우저 조사에서는 보이는 모바일 문의 배치의 계산값 검증을 완료하지 못했다. TypeScript·대상 ESLint/Prettier·Panda·소스그래프 생성 통과. 전체 build는 이번 변경 후 실행하지 않았다.

## 商品 상세 모바일 제목·건수 확정값 (2026-11-19)

사용자 지정으로 상품 상세 리뷰·상품문의 제목의 모바일 값을 Pretendard normal20px/900/120%/자간-0.02em/#000으로 맞췄다. 건수는 기존 The Future HOKA를 사용하며20px/500/120%/자간0px/#000이다. 같은 파일의 sectionHeadingStyles에서 공통 관리하고 기존 ContentHeader/ContentSection titleProps와 건수 Typography에 적용한다. 상품문의 default 게시판·PC 값·본문·상태 계약은 유지한다.

MO571에서 리뷰/상품문의의 제목20px/900 및 건수20px/500을 확인했으며 최종 로딩 후 검정과24px 행간을 확인했다. 자간0은 Panda 숫자토큰 해석을 피하도록0px로 명시했다. 대상 ESLint/Prettier·TypeScript·Panda·소스그래프 생성 통과. 전체 build는 이번 변경 후 실행하지 않았다.

## ContentHeader 선택형 제목 보조 요소 (2026-11-19)

prefix/suffix/count/countProps를 선택 props로 추가했다. prefix·suffix·count를 모두 생략하거나 undefined로 전달하면 기존 제목 children을 그대로 렌더링한다. count는0도 표시하며 괄호를 공통 생성한다. 보조 요소가 있을 때만 제목 Typography 내부의 Flex as span이 baseline/gap0.25em/wrap으로 prefix·title·count·suffix를 배치한다. 기존 h1~h6·action·description·eyebrow·textGroupProps는 유지한다.

variant 기본값은 컴포넌트 파라미터와 recipe 모두 standard이며 스타일 override를 추가하지 않는다. productSection을 명시하면 기존 상품 상세 모바일 제목20px/900, 숫자 HOKA20px/500/24px/검정 규칙을 적용한다. 페이지의 sectionHeadingStyles는 제거하고 리뷰·상품문의에 count와 productSection을 연결했다. countProps로 기존 PC body1/medium을 유지한다.

TypeScript와 대상 ESLint/Prettier·Panda·소스그래프 생성 통과. MO571의 리뷰 제목20px/900 및 숫자20px/500/행간24px을 확인했다. 옵션 없는 기존 사용처는 분기/기본 스타일을 유지하고 기존 호출자 전체 타입검사를 통과했다. prefix/suffix를 붙인 실제 서비스 화면의 실행 검증은 하지 않았다.

다른 사용처 조사: ContentHeader/ContentSection의 제목 JSX를 소스 AST로 확인했다. 상품 상세 리뷰·문의는 전환했고, 같은 InquiryBoard의 default 제목 합성 분기는 현재 실제 호출이 product뿐이라 별도 사용 화면으로 세지 않는다. 검색 결과 제목은 숫자가 문장 중간에 있어 괄호 count로 바꾸면 문구가 달라진다. 쿠폰·마이페이지 리뷰·상품목록의 총건수는 별도 정렬/요약 영역이므로 제목 count로 임의 이동하지 않는다.

## 선택 옵션 목록 DataList 소유권 (2026-11-19)

ProductSelectedOptions의 ul에 DataList root(top unchanged/columnGap unchanged/itemLayout selectedOptions)를 연결했다. 부모가 직접 li의 회색 하단1px 및 data-list-option의 gap12/py16, 내부 data-list-controls의 columnGap12를 관리한다. 기존 Stack/Flex/ul/li 구조와 내부 rowGap12·타이포·합계2px 검정선·수량 및 삭제 callback·스크롤 소유자는 유지한다. 마지막 항목 회색선도 기존대로 유지한다.

options-selected와 options-scroll 고정 경로에서 PC1440/MO571의 모든 옵션 py16/gap12/columnGap12 및1px #E9EAEB를 계산값으로 확인했다. 수량·삭제 동작과 실제 스크롤 제스처는 이번에 별도로 실행하지 않았다. 대상 ESLint/Prettier·TypeScript·Panda·소스그래프 생성 검사를 수행했다. 전체 build는 이번 변경 후 실행하지 않았다.

## 장바구니 수량 trash 공통 옵션 (2026-11-19)

`src/app/cart/_components/CartProductSection.tsx`는 기존 minimumControl 휴지통 JSX 대신 공통 NumberStepper의 `trash` 옵션을 선택한다. URL·fixture 수량·품절 fieldset·onChange 소유권은 유지한다. 삭제는 종전처럼 미연결 표시이며 API나 완료 이동을 만들지 않는다. PC1440/MO375의 수량1 trash와 수량2 minus·품절 비활성을 확인했고 기본 옵션인 취소 신청 수량1의 minus 비활성도 확인했다. 상세 계약과 아이콘 고정 정책은 [NumberStepper 옵션](ui.md#numberstepper-trash-옵션과-아이콘-고정-정책-2026-11-19)을 따른다.

## 문의 빈 영역·사이즈 오류·FAQ 간격 반영 (2026-11-19)

상품 상세 PC/MO 시안을 확인했다. productInquiry 빈 영역은 PC328px/MO150px 높이의 flex 중앙 정렬이며, 문의와 고시·배송·관리 안내를 기존 product-inquiries Stack에 묶어gap24px로 관리한다. 모바일 문의 제목·문의하기 아래16px 간격의 선과 필터 행 py16px을 적용했다. 제목/필터 체크박스는 하나의 트리를 유지하며 PC 배치를 보존한다. EmptyState의 다른 테이블/공지/heading 확정 규칙은 변경하지 않는다.

사이즈 미선택 오류는 detail appearance에서만 제목·선택그리드 전체를1px #CC0000/반경4px으로 감싼다. PC padding4px/MO6px과 바깥 오류 문구까지gap8px을 적용한다. 기존 옵션 내부 너비는 음수 가로 margin으로 보존한다. 개별 invalid pill outline만 그룹에서 제거하며 FormField invalid/aria-describedby·오류 alert는 유지한다. 모바일 오류 상태의 그리드는4열, 제목-그리드 간격14px이다. 오류 문구는 PC14px/400/150%/#CC0000, MO13px/500/130%/#E10F00으로 맞췄다. 미사용 추천 문구는 추가하지 않는다. 정상 detail·cart branch 및 선택/품절·가이드 callback은 유지한다.

FAQ Accordion root가 DataList top strong과 faqAccordion 유형으로 기존 질문 minHeight74/MO58·py24/MO16·gap16 및 접힘 상태 회색 inset divider를 소유한다. 기존 질문 Typography와 펼친 답변을 유지한다. 시작선 아래 section paddingTop32/MO8을 제거했다. 빈 결과는 기존 EmptyState를 유지한다.

실행 확인: PC1920/MO375에서 문의 높이328/150·flex 중앙 정렬·부모gap24, 사이즈 그룹1px/반경4/padding4·6/개별 outline없음/오류 문구, FAQ section pt0·시작선2px·질문py24·16을 계산값으로 확인했다. 문의 모바일 영역 캡처를 확인했다. TypeScript·대상 ESLint/Prettier·Panda·소스그래프 생성을 수행했다. hoka-markup-handoff 기준으로 소유권·기존 DOM 의미·반응형·FormField 연결과 표시 fixture 경계를 점검했다. 외부 API·신규 상태 URL·데이터 계약은 추가하지 않았다. 디자인 출처: [상품 상세 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design).

## 공지 머리글 열 정렬 (2026-11-19)

제공된 공지 목록 PC 시안의 제목 fill 열/등록일 hug 열 중앙 정렬을 DataList noticeColumns에 반영했다. 제목은flex1/minWidth0/중앙, 등록일은flexShrink0/중앙이며 기존 padding16/32px·글자16px/600·하단선·본문 정렬은 유지한다. 사용자 요청은 정렬 범위이므로 시안의 다른 타이포 차이를 일괄 반영하지 않았다. 모바일 머리글 숨김은 유지한다. PC1920 목록844px에서 제목열739.47px·날짜열104.53px과 두 셀 중앙 정렬을 계산값으로 확인했다. MO375의 기존 머리글 숨김도 확인했다. 타입·Panda·대상 lint/format·소스그래프를 수행했다. 출처: [공지 목록 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design).

## 의존 그래프 추적 해제 (2026-11-19)

자동 생성물 `src/app/screen-index/sourceGraph.generated.json`의 Git 추적만 해제하고 로컬 파일과 IA import 계약은 유지한다. 출처는 Git 인덱스, `.gitignore`, `package.json`, `scripts/screen-files.mjs`다. 파일 부재 상태의 재생성과 이전 내용 일치를 확인했으며 라우트·화면 코드는 변경하지 않았다. 실행 절차는 [로컬 실행](../development/setup.md#자동-생성-의존-그래프-git-추적-해제-2026-11-19)에 기록했다.

## PC 헤더 account 링크 배치 (2026-11-19)

PC 헤더의 상태별 텍스트를 account 아이콘 오른쪽으로 이동했다. 로그인 텍스트는 Next Link의 `/mypage`, 비로그인 링크는 기존 `/login`·`/signup`을 사용한다. 경로·라우트 소유권·인증 상태·플랫폼 전환 규칙은 변경하지 않았다. PC 브라우저에서 마이페이지 href와 MO390px의 추가 텍스트 미표시를 확인했다.

출처: `src/context/ShopShell.tsx` 작업 트리와 localhost 실행 화면; Codex 작성·검토, 2026-11-19.

## 배송·관리 안내 시안 갱신 (2026-11-19)

/support/after-sales와/support/care의 기존5개 tab 쿼리 값과 진입점을 유지한다. 고객센터 전용 최신 관리 데이터는 src/app/support/care/care.data.ts에 두며 상품 상세 데이터는 보존한다. 반품 주의사항 표제·내용 순서와6개 STEP 표시를 갱신했다. PC/MO 직접 진입 및 키보드/클릭의 쿼리 전환을 확인했다. 새 상태 URL이나 서비스 요청은 추가하지 않았다. [디자인과 검증](support-design.md#배송반품과-관리-안내-최신-시안-반영-2026-11-19)을 참고한다.

## 로그아웃 확인의 로컬 헤더 전환 (2026-11-19)

로그아웃 확인 후 현재 `/mypage` 경로를 유지하고 공통 헤더 표시만 로컬로 변경한다. 기존 로그인 `/login`·회원가입 `/signup` 링크 및 확인창 직접 상태 URL은 유지한다. 인증 종료나 홈 이동은 구현하지 않는다.

출처: `src/context/ShopShell.tsx`, `src/context/ShopPreviewContext.ts`, `src/app/mypage/_components/MyPageContent.tsx` 작업 트리; Codex 작성, 2026-11-19.

검증(2026-11-19, Codex): 브라우저 PC에서 확인창 닫기 후 마이페이지 표시 유지, 확인 후 로그인·회원가입 링크(`/login`·`/signup`) 전환과 현재 경로 유지, 새로고침 후 초기 표시 복구를 확인했다. MO390px 확인 후 account 마이페이지 아이콘 제거도 확인했다. 대상 ESLint·Prettier 및 전체 TypeScript 검사 통과.

## 반품 안내 표시 코멘트 반영 (2026-11-19)

AfterSalesContent의 STEP·운영시간500과 모바일 전용 전화 링크를 적용했다. PC전화는 일반 문자열이며 기존tab쿼리·이동 경로·준비 데이터 소유권은 유지한다. 상세 표시와 검증은 [고객센터 디자인](support-design.md#배송반품-탭과-연락처-표시-보정-2026-11-19)을 참고한다.

## 신발 관리 요약 가운데점 표기 (2026-11-19)

사용자 화면 코멘트에 따라 CareContent의 요약10개 항목 앞 하이픈을 HTML &middot; 엔티티로 바꿔 가운데점(·)을 표시한다. 본문 관리 지침의 하이픈·요약 링크·문구·PC3열/MO세로 배치는 유지한다. 작업 트리 출처: src/app/support/care/_components/CareContent.tsx.

PC1398/MO375에서10개 요약 기호가 모두·이고 모든 앵커 대상이 존재함을 실행 확인했다. 대상 ESLint를 통과했고 Prettier를 적용했다. 텍스트 변경이므로 전체 타입·Panda·빌드는 재실행하지 않았다.

## 관리 목록의 CSS 가운데점 (2026-11-19)

사용자 요청에 따라 CareContent 요약 li와 CareInstructions care 본문 li의 ::before가 가운데점(·)을 표시한다. 문자열 앞 하이픈·HTML 엔티티와 care 전용 별도 기호 span은 제거했다. 기존 Flex/Stack/HStack·ul/li 의미와 PC3열/MO세로·본문 들여쓰기는 유지하며 flex gap으로 줄바꿈의 시작선을 맞춘다. marker는 PC16/24px·MO14/21px, text-subtle색·flexShrink0이다. 번호 소제목500과 본문400은 유지하고 상품 상세 default의 기존 기호는 변경하지 않았다. 이전 엔티티 적용 기록보다 이 구현이 우선한다. 출처: 사용자 화면 코멘트 및 [관리 안내 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), 작업 트리 CareContent.tsx·CareInstructions.tsx.

## 온라인 회원등급 안내와 공유 본문 (2026-11-19)

`/support/member-benefits`는 온라인 회원등급 안내 시안 본문을 표시하고 `/mypage/rewards`와 `MembershipRewards`를 공유한다. 각 경로의 프레임·title·breadcrumb·메뉴는 유지한다. 고객센터는 로그인 시 개인 요약까지 표시하고 비로그인 시 등급·공통 혜택만 표시한다. 기존 마이페이지 `/preview-loading`·`/preview-load-error` 상태와 외부 display 계약은 유지한다. IA213의 PC/MO 디자인을 사용자 수급 확인에 따라 received로 등록하고 퍼블리싱 본문·연결을 갱신했다. 개발자 WBS 외부 자료는 변경하지 않았다.

출처: [온라인 회원등급 안내 PC·모바일 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), 현재 사용자 화면 코멘트, 위 working_tree_sources의 작업 트리. Codex 작성·검토, 2026-11-19.

로그인 전후 고정 상태: `/support/member-benefits?preview=logged-out`과 `?preview=logged-in`을 IA213의 별도 STATE 링크로 노출한다. 기본 경로는 셸의 현재 표시 상태를 따르고, 두 preview는 인증 상태를 바꾸지 않은 채 개인 요약 노출만 고정한다. 쿼리는 `useSearchParams`로 읽으며 기존 루트 Suspense 경계를 유지한다.

검증(2026-11-19, Codex): PC1920·MO375에서 두 로그인 경로의 공통 본문이 텍스트·크기·상대 위치·글자/행간/간격 계산값까지 동일함을 확인했다. 로그인 전후 query 4개 조합의 개인 요약 유무·RUNNER 확정 문구·가로 overflow 없음, IA213의 기본 및 로그인 전/후 링크를 확인했다. PC·MO에서 로컬 로그아웃 확인 후 클라이언트 탐색한 기본 고객센터의 개인 요약 숨김과 혜택 유지를 확인했다. 기존 마이페이지 로딩·오류 안내도 확인했다. Pretendard Black 실제 글리프 폰트를 확인했고 영문은 로드된 HOKA 자산을 사용한다(브라우저 내부 폰트명은 점으로 보고됨). 대상 ESLint·Prettier·전체 TypeScript·Panda·소스 그래프·프로덕션 빌드(164개 정적 페이지 생성)를 통과했다. 전체 lint는 실행하지 않았다. 실제 인증/등급 조회 API는 미연결이다.

## 배송·관리 재검수 스타일 보정 (2026-11-19)

AfterSalesContent의플랫폼별줄바꿈·반품처DOM순서·간격/타이포와CareContent의모바일색상을보정했다. 기존5개tab쿼리와로컬표시·링크책임은유지한다. 고객센터LNB는support공통소유자에서행높이를통일한다. [수치와검증](support-design.md#재검수-차이-전체-보정과-고객센터-lnb-높이-통일-2026-11-19)을 참고한다.

## 의존 그래프 추적 해제 (2026-11-19)

자동 생성물 `src/app/screen-index/sourceGraph.generated.json`의 Git 추적만 해제하고 로컬 파일과 IA import 계약은 유지한다. 출처는 Git 인덱스, `.gitignore`, `package.json`, `scripts/screen-files.mjs`다. 파일 부재 상태의 재생성과 이전 내용 일치를 확인했으며 라우트·화면 코드는 변경하지 않았다. 실행 절차는 [로컬 실행](../development/setup.md#자동-생성-의존-그래프-git-추적-해제-2026-11-19)에 기록했다.

- `/publishing-guide?tab=badge`에서 공통 Badge 예시, 웹·모바일 비교 및 사용 코드 복사를 제공한다.

- 주문·결제 화면은 결제 수단을 웹 6열·모바일 3열 카드로 표시하며 선택 상태를 카드 테두리로 구분한다.

- 주문·결제 필수 동의의 두 전문보기 링크는 공통 ButtonLink의 link 스타일과 md 크기를 사용한다.

- 퍼블리싱 가이드의 모달·아이콘 탭에 공통 모달 닫기 아이콘 xmark-large를 표시한다.

- 주문·결제의 배송지변경 링크 버튼은 md 크기를 사용한다.

## 스테이징 굵기 반영 (2026-11-19)

기존 장바구니·결제·가입·마이페이지 경로를 유지하고 스테이징된 라벨 굵기만 반영한다. CartDialogs는 상품명 h3 의미를 유지한 Typography를 사용하며 새 라우트나 URL 상태를 추가하지 않는다.

## 마이페이지 굵기 반영 (2026-11-19)

쿠폰·러닝세션 신청내역·회원정보·회원등급의 스테이징된 굵기 변경은 기존 경로·표시 상태·콜백을 유지한다. 새 URL이나 서비스 동작은 추가하지 않는다.

## 로그인·고객센터 굵기 반영 (2026-11-20)

로그인 계정찾기·고객센터 연락처/FAQ/문의 목록의 기존 경로·검색/탭·서비스 콜백을 유지하고 스테이징된 표시 굵기만 조정한다.

## 반응형 굵기와 탭 고정 정책 반영 (2026-11-20)

문의 작성 정보·주문상품 상태·공지·관리 안내·주문 상세와 검색의 기존 경로·쿼리·콜백을 유지하고 반응형 굵기 옵션을 적용한다. Typography 가이드는 기존 탭에 굵기 예제를 제공한다.

## 상품 카드와 주문 안내 굵기 반영 (2026-11-20)

장바구니·주문 상세·관심상품·추천·고객센터의 기존 경로와 상태 URL을 유지하고 표시 굵기만 조정한다. 데이터·요청·콜백 계약은 변경하지 않는다.

## 로그인·약관 포맷 정리 (2026-11-20)

LoginContent 제목의 들여쓰기와 약관 페이지 tabs 객체 줄바꿈만 정리했다. 렌더링·굵기·경로·상태·서비스 계약은 변경하지 않는다. 출처: 두 소스의 스테이징 diff. 동작 변경이 없어 실행 화면 검증은 수행하지 않았다.

## 화면별 글자 굵기 보정 (2026-11-20)

장바구니 옵션·로그인 혜택·쿠폰 기간·주문 표 머리글·가입 동의·FAQ·문의 첨부·사이즈 가이드의 글자 굵기를 보정했다. 경로, 상태 URL, 데이터와 서비스 연결 계약은 유지한다. 출처는 이번 변경의 `src/app/` 화면 컴포넌트와 TypographyGuide다.

## 상품 상세 사이즈 가이드 재구성 (2026-11-20)

기존 상품 상세와 의류 기본 preview의 사이즈 가이드를 같은 ProductSizeGuideChart에서 재구성했다. 새 경로는 추가하지 않았으며 열기·닫기·트리거 finalFocus와 cm 초기값을 유지한다. 신발은 공유 공용 치수표의220~300mm17행을 발길이·한국(mm)·미국(남)·미국(여)4열로 표시한다. 의류는 기존 상품 성별과 단위별 데이터6/5/6행을 유지하고 측정 방법과 Fit Guide5개 카드를 추가한다. 실제 치수표 승인·갱신은 통합 소유자 책임이며 API 요청은 추가하지 않았다.

출처: 사용자 첨부 신발/의류 팝업 시안과 [디자인 파일](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/). 구조화 조회 제한으로 최신 모드/실측값은 확인하지 못했으며 이미지 관측과 기존 컴포넌트 규격을 사용했다. 작업 트리 출처: src/app/products/[id]/_components/ProductDetailContent.tsx.

## 상품 상세 공유하기 상태 (2026-11-20)

상품 상세 모바일 공유 버튼은 기존 ModalDialog의 selection·bottomSheet를 엽니다. `/products/pdp-preview/share`는 기존 PDP 상태 라우트에서 팝업을 바로 표시하며 새로고침에도 유지합니다. `productDetailPreviews`에 등록한 `공유하기 팝업`을 screenConnections가 읽어 상품 상세 IA의 상태 행과 검색·직접 링크에 반영합니다. 기존 기본 링크와 다른 상태는 보존하며 source graph 재생성 결과는 변경이 없습니다.

출처: `src/app/products/[id]/_components/ProductDetailContent.tsx`, `src/app/products/[id]/productDetailPreviews.ts`, 기존 `src/app/products/pdp-preview/[state]/page.tsx`와 `src/app/screen-index/screenConnections.ts`의 작업 트리. PC/MO 팝업 표시, 직접 URL·새로고침, IA에서 상태명 검색과 링크 노출을 브라우저로 확인했습니다. 기록: codex/gpt-6, 2026-11-20.


## 컬렉션 상품 가로 간격 (2026-11-20)

사용자 지정에 따라 /collection의 카테고리별 상품 Grid column-gap을 PC24px·모바일14px으로 변경했다. 기존4열/2열과 row-gap40px은 유지한다. 작업 트리 출처: src/app/collection/_components/SpecialExhibitionContent.tsx.

검증: 브라우저1344px에서 column-gap24px·4열,375px에서14px·2열 계산 스타일을 확인했다. Panda 생성과 대상 ESLint를 통과했다.


## 컬렉션 카테고리 제목과 대형 PC 열 수 (2026-11-20)

사용자 승인으로 확인된 차이를 적용했다. Typography에 덮이던 모바일 카테고리 제목은 로컬 && 선택자로20px을 적용하고 기존900 굵기를 유지한다. PC1920px 이상은5열, 그 미만 PC는4열, 모바일은2열을 사용한다. 기존 column-gap PC24px/모바일14px과 row-gap40px을 유지한다. Figma 굵기 모드를 확인하지 못해 다른 글자 크기와 굵기는 변경하지 않았다.

브라우저1344·1919px에서4열,1920px에서5열,375px에서2열과 제목20px/900을 확인했다. PC 제목은22px/900이며 가로 간격은 각각24/14px이다. 작업 트리 출처: src/app/collection/_components/SpecialExhibitionContent.tsx.

현재 커밋 대상에는 카테고리 제목과 상품 Grid 사이의 PC Stack gap24px(모바일14px)도 포함한다. 상품 간 column-gap과 별도 값이다.


## 모바일 상품 상세 갤러리 액션과 세로 콘텐츠 (2026-11-20)

사용자 첨부 신발·의류 모바일 시안을 기준으로 공유/관심상품을 갤러리 오른쪽 상단16px 영역으로 옮겼다. 공유 팝업·URL복사 pending/error·닫기/finalFocus는 기존 ProductDetailHeaderActions 한 인스턴스가 소유한다. 모바일은 리뷰 요약 대신 갤러리 액션을 표시하고 PC 헤더의 리뷰 요약과 구매영역 관심상품은 유지한다. 모바일 색상 선택은 갤러리 아래·상품명 위에 한 번 배치한다. ProductVariantSelectors.showColor는 기본true이며 인라인 모바일만false, 옵션 시트는 기존 색상/발볼/사이즈 선택을 유지한다.

모바일 상품 정보 소제목·본문16px, 설명/더보기 간격16px을 사용한다. 의류의 최초 설명 펼침은 플랫폼에 따른 초기 표시값으로 읽고 사용자 토글 후에는 로컬 선택을 유지한다. 신발 정보의 러닝 유형은 PC에 유지하며 모바일에는 신발 유형·추천 활동을 표시한다. 모바일 Tech Specs는1열이다. 아래 기록 당시 특징의 모바일 간격40px·PC3/4열과 의류4개 탭은 후속 [특징 배치와 상세 탭 변경](#상품-상세-특징-배치와-상세-탭-2026-11-20)으로 대체됐다. 이미지 sizes는 모바일 화면폭에서32px을 뺀 값이며 섹션 제목22px/900·특징 제목18px/700과 갤러리2열·기존 표시 데이터는 유지한다.

출처: 사용자 첨부 모바일 상품상세 이미지와 [디자인 파일](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/). 조회 제한으로 최신 구조화 치수/굵기 모드를 확인하지 못했으며 첨부 이미지와 기존 타이포 규격으로 구현했다. 실제 상품 API는 추가하지 않았고 준비된 상품·특징 이미지/문구는 기존 소유자를 유지한다. 작업 트리 출처: src/app/products/[id]/_components/ProductDetailContent.tsx.

검증:375px 신발·의류에서 공유 버튼1개·갤러리 상단 배치·공유 팝업 열기/Escape닫기/트리거 포커스 복귀, 상품정보 본문16px·특징1열과 가로 넘침 없음을 확인했다. 의류는 설명 접힘과4열 탭·특징 제목18px을 확인했다. 관심상품 클릭 후 aria-pressed=true와 신발 구매 옵션 시트의 색상/발볼/사이즈 유지도 확인했다.1440px PC에서는 갤러리2열·신발 특징3열과 모바일 공유 액션 미표시를 확인했다. 최종 모바일 Tech Specs/Why 제목22px/900을 계산 스타일로 확인했다. 마크업 인계 기준으로 기존 소유권과 상태·콜백/포커스·Next Image 경계를 점검했다.

최종 검사: 변경 파일 ESLint·Prettier, 전체 TypeScript, Panda 생성·Next.js 프로덕션 빌드를 통과했다.

## 상품 상세 특징 배치와 상세 탭 (2026-11-20)

`ProductDetailEditorial`은 의류 여부 대신 현재 `features.length`와 `usePlatform()`으로 배치를 결정한다. PC 3개 이하는 3열 Grid·간격16px이며 1~2개도 같은 열 너비를 유지한다. 4개 이상은 메인과 같은 공통 Carousel/CarouselViewport/CarouselControls를 조합하고 본문 폭 안에 3개를 표시한다. 반복 재생하지 않으며 제목 오른쪽 이전·다음 버튼과 자유 드래그를 사용한다. 메인의 CarouselSection 및 공통 기본값은 바꾸지 않았다.

제목→목록은 PC32px/MO16px, 이미지→설명24px, MO 카드 간격48px이다. MO는 모든 특징을 원래 순서의 1열로 표시한다. 1016px 본문에서는 PC 카드328px이며 대형 PC에서는 기존 상세 그리드 비율대로 확장한다. Image sizes는 실제 플랫폼과 기존 PC 캔버스·본문 최대폭·그리드 비율을 반영한다. 표시 데이터·문구·이미지·통합 소유권은 유지하며 새 조회 API는 없다.

사용자 후속 요청에 따라 상세 탭은 Pretendard·미선택400/선택600·자간-0.02em, PC16px/18px 및 MO14px/150%(21px)를 사용한다. 기존 activeId에 따라 미선택 regular400·선택 semibold600을 사용하는 자체 앵커 내비게이션이며 SupportTabs 정책 변경이 아니다. 의류의 미확정 사이즈 탭과 연결 본문은 제거했다. 상품 정보·리뷰·상품 문의의 세 앵커와 스크롤 추적, 구매 옵션의 사이즈 선택·가이드는 유지한다.

출처: 사용자 지정 [상품상세 PC/MO 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), 첨부 이미지와 후속 브라우저 코멘트. PC 의류4열은 사용자가 잘못된 디자인으로 명시하여 적용하지 않았다. 네 프레임의 구조화 데이터를 읽어 PC 본문1016px·카드328px/간격16px·제목 간격32px, MO 제목 간격16px·카드 간격48px을 확인했다. 작업 트리 출처: `src/app/products/[id]/_components/ProductDetailContent.tsx`.

실행 검증:1920px에서 임시 표시 데이터1·2·3개 모두328px Grid,4·5개는 약328px 캐러셀을 확인했다. 4개 버튼·Enter로 이전 이동·드래그,4·5개 마지막 카드의 우측 끝 정렬 및 끝 버튼 비활성을 확인했다. 임시 데이터는 복원했다.375px 신발3개·의류4개의1열/48px 간격, 의류3개 탭과 사이즈 본문 제거, PC16px/600/18px 및 MO14px/600/21px·자간 계산값을 확인했다.1024px은 MO,1025·1199px은1200px PC 캔버스,1200px 이상은 세로 스크롤바로 인한 추가 가로 넘침이 없었다. PC/MO 스크린샷으로 카드 배치와 설명을 확인했다.

변경 파일 ESLint·Prettier, 전체 TypeScript·Panda 생성 및 Next.js 프로덕션 빌드를 통과했다. OKF 작업 트리 매핑 검사에서 누락이 없었다. 전체 lint는 범위 밖 `tests/wh-file-summary.test.mjs`의 URL/Request/Response 전역에 대한 기존 no-undef8건으로 실패했다. 후속 탭 굵기 수정 후1920px PC·375px MO에서 리뷰 앵커를 선택해 미선택400·선택600을 계산 스타일로 확인했고 대상 ESLint와 전체 TypeScript도 통과했다. 명시적 고정 플랫폼 검증은 개발서버 reload/HMR 타임아웃으로 완료하지 못했으며 임시 Provider 변경은 원복했다. 서비스 요청·인증·저장·재시도는 이번 표시 배치 변경의 검증 범위가 아니다.

## 상품정보 표시 데이터와 5줄 더보기 (2026-11-20)

이 절은 앞선 모바일 상품정보16px 및 PC 의류 최초 펼침 기록을 대체하는 현행 규칙이다. ProductInformation은 고정 섹션명 '상품 정보'와 Product.detailTitle/detailDescription을 구분한다. 상품 상세 통합 소유자가 현재 상품의 제목·본문을 전달하며, 미제공 제목은 다른 상품 문구로 대체하거나 빈 heading으로 출력하지 않는다. Clifton과 EveryRun fixture에 제공된 시안의 제목을 각각 명시했다. 두 fixture의 제목 문구는 시안에서 동일하지만 화면 공통 하드코딩이 아니다. 실제 API·조회·재시도는 구현하지 않았고 현재 데이터 교체 및 오류 처리는 통합 소유자의 책임이다.

모든 상품은 처음에 최대5줄로 접는다. 첫 본문 p의 scrollHeight와 계산 line-height×5를 비교하고 반올림 오차1px을 허용해 초과 시에만 더 보기/닫기를 표시한다. ResizeObserver는 본문과 기존 내용 Stack을 관찰하고 window resize 및 document.fonts.ready/loadingdone에서도 재측정한다. cleanup으로 observer·이벤트와 늦은 폰트 완료를 해제한다. 펼침 상태는 현재 본문에 연결하므로 본문이 교체되면 접히며, 기존 본문을 그대로 둔 제목 교체는 로컬 펼침을 유지한다. aria-expanded/aria-controls를 유지하고 더보기 없이 전체를 볼 수 있는 짧은 본문에서는 추가 설명도 바로 표시한다. 긴 본문의 추가 설명은 기존처럼 펼쳤을 때 표시한다.

상품정보의 러닝 유형 행은 PC/MO 모두 제거했다. 신발 유형과 추천 활동, 다른 상품의 컬러/스타일코드/발볼은 유지하며 카탈로그의 runningType 데이터와 다른 화면의 분류·용도는 삭제하지 않았다. MO 섹션명22px/900, 타이틀17px/700, 본문16px/400·행간150%, 타이틀→본문20px, 상하 padding40px/좌우16px이다. PC padding32px 32px 40px과 기존 본문16px/150%를 유지한다.

출처는 사용자 요청과 [상품정보 PC/MO 디자인](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)이다. 구조화 데이터에서 PC 타이틀16px/Bold·본문16px/Regular, MO 타이틀17px/Bold·본문16px/Regular·섹션명22px/Black을 확인했다. 작업 트리 출처는 src/app/products/[id]/_components/ProductDetailContent.tsx, src/app/products/[id]/productDetailPreviews.ts 및 src/mocks/products.ts다.

실행 검증:1920px/375px 의류의 최초 본문 높이120px(24px×5), 펼침144px/192px과 닫기를 확인했다. 임시 표시 데이터의4줄96px·5줄120px에는 버튼이 없고6줄은120px으로 접히며 버튼이 표시되는 것을 PC/MO에서 확인했다. 펼친6줄을4줄로 교체하면 버튼이 사라졌고 임시 본문은 복원했다. 별도 타이틀로 교체했을 때 현재 제목이 즉시 반영되고, 제목을 미제공하면 본문은 유지하면서 빈 제목 heading이 생성되지 않는 것을 확인했다. 임시 타이틀도 복원했다. 신발은2560px 본문96px·1920px120px에서 버튼이 없고375px144px 본문은120px으로 접혀 버튼이 표시돼 resize 재측정을 확인했다. 신발 유형/추천 활동 유지·러닝 유형 미표시와 펼친 후 새로운 특징을 확인했다. MO 실제 계산값은 섹션명22px·타이틀17px·본문16px/24px·padding40px 16px이다. 스크린샷 캡처는 개발서버의 미완료 navigation timeout으로 실패하여 시각 캡처 검증 완료로 기록하지 않는다.

검사: 대상3개 소스 ESLint·Prettier, 전체 TypeScript, Panda 생성 및 OKF 작업 트리 관련 문서 매핑 검사를 통과했다. 커밋/푸시는 수행하지 않았다.


## 상품 상세 일부 발볼 품절 상태 (2026-11-26)

`/products/pdp-preview/width-double-sold-out`과 `/products/pdp-preview/width-triple-sold-out`은 각각 발볼 2개·3개 중 두 번째 Wide가 품절인 고정 화면이다. 기존 `productDetailPreviews` 목록을 통해 두 경로가 상품 상세 공통 IA의 STATE에 연결된다. 소스는 `productDetailPreviews.ts`와 `ProductDetailContent.tsx`의 작업 트리다. [품절 표현과 검증](ui.md#상품-상세-발볼-품절-표시-2026-11-26).

## 발볼 개수별 PDP 상태와 장바구니 일괄 삭제 표시 (2026-11-20)

기존 /products/pdp-preview/[state]에서 width-single·width-double·width-triple을 추가했다. productDetailPreviews의 한국어 상태명을 screenConnections의 기존 map이 IA 상품상세 행에 자동 연결한다. 기존 sourceFiles에 상태 라우트·fixture 파일이 포함되어 있으며 screen-files 재생성 결과 추가 소스 그래프 변경은 없다. 기본 상품 데이터는 유지하고 각 상태 fixture에서 발볼 배열만1/2/3개로 제한한다.1개는 detail 선택기를 숨기며 사이즈는 유지한다.

장바구니 선택 삭제 앞에 품절상품 전체삭제 링크형 버튼을 추가했다. 품절 행이 없으면 명시적으로 사용 불가이며, 기존 삭제 버튼과 마찬가지로 실제 요청·삭제는 미연결이다. 좁은 모바일에서는 도구 모음이 줄바꿈되어 가로 넘침을 막는다.

검증: IA의 발볼1/2/3 링크 및 직접 URL에서 발볼 그룹0/2/3개·사이즈 유지,375px 장바구니의 버튼 순서와 가로 넘침 없음을 확인했다. 작업 트리 출처: src/app/products/[id]/productDetailPreviews.ts, src/app/cart/_components/CartProductSection.tsx.

추가 확인: IA에서 발볼 검색 후 세 링크가 보이며375px의 세 URL도0/2/3개 상태와 가로 넘침 없음을 확인했다. PC 장바구니 버튼 순서도 확인했다. 대상ESLint·전체TypeScript·Panda 생성·screen-files 재생성·Next.js 프로덕션 빌드를 통과했다. 장바구니 스크린샷 캡처는 브라우저 타임아웃으로 확보하지 못했고 DOM·계산 폭으로 확인했다.

## 주문서 쿠폰 중복 사용 안내 (2026-11-20)

2026-11-26에 할인 금액 요약 아래의 상품 쿠폰 사용 수량 및 장바구니 쿠폰과의 중복 사용 안내를 목록에서 제거했다. 최대 할인 쿠폰 자동 적용과 쿠폰 적용 가능 상품에 대한 안내는 계속 표시한다. 출처는 `src/app/checkout/_components/CheckoutDiscountSummary.tsx`의 문구 목록이다.

CheckoutDiscountSummary의 금액 요약 아래 기존 쿠폰 안내 목록에 '* 상품 쿠폰은 상품별로 1장씩만 적용 가능하며, 장바구니 쿠폰과 상품 쿠폰은 함께 사용하실 수 없습니다.' 문구를 추가했다. 기존 Typography web=body4/mo=body4-2·tertiary 톤과 목록 간격을 재사용해 PC/MO에 표시한다. 기존 두 안내와 쿠폰 조회/선택 UI는 유지하며 할인 계산이나 실제 중복 적용 제한을 구현한 변경은 아니다. 출처: 사용자 첨부 주문/결제 이미지와 직접 지정 문구. 작업 트리 출처: src/app/checkout/_components/CheckoutDiscountSummary.tsx.


## 러닝세션 신청 확인과 제한 안내 상태 (2026-11-20)

기본 상세 신청하기는 공통 selection 모달을 열며 신청자 이름·하이픈 전화번호·현재 세션 일시·장소를 표시한다. 기존 preview-application은 신청 확인, preview-application-complete는 완료 안내로 보정했다. /running/running-session 아래 preview-application-underage·preview-application-closed·preview-application-registered를 추가했다. IA259에 각각 미성년자 신청 제한·모집 마감 신청 안내·신청완료 상세로 연결하며 기존 상세 모집 마감/신청 예정 링크는 유지한다. 신청완료 CTA는 PC/MO 비활성이다.

확인 버튼은 의도적으로 저장 미연결이며 클릭해도 완료 전환·요청·닫기를 실행하지 않는다. 취소·닫기·Escape만 로컬 조작한다. applicant 표시 데이터는 현재 props에서 읽고 기본값은 홍길동/010-1234-5678 preview seed다. 실제 회원·세션 ID, 신청 요청과 pending/실패/재시도/성공 후 갱신은 통합 소유자가 연결한다. 연령은 판정하지 않는다. 사용자 보류 결정에 따라 본문18세 이상·설계 팝업19세 미만 제한의 충돌을 원문대로 남겼다.

검증: PC1920/MO375에서 확인·완료·미성년자·마감·신청완료 직접 상태를 확인했다. 모바일 신청완료는 hydration 후 가로 넘침 없이 비활성 CTA1개를 표시한다. 기본 모바일 신청 버튼→확인 팝업, 확인 클릭 후 팝업 유지, Escape 닫기와 트리거 포커스 복귀를 확인했다. 기존 closed/upcoming 비활성과 IA 링크5개·미성년자 상태명 검색을 확인했다. 확인 팝업 PC/MO 스크린샷으로 긴 주소 줄바꿈·본문 스크롤을 확인했다. 대상 ESLint·TypeScript·Panda·screen-files·Next 프로덕션 빌드(171페이지)를 통과했다.

출처: 사용자 첨부 러닝세션 신청 설계서와 [디자인 파일](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/). 작업 트리: src/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent.tsx, 신규 신청 preview page.tsx3개와 기존 확인 경로, src/app/screen-index/screenConnections.ts. Figma 조회 제한으로 원본 구조·폰트 모드는 재조회하지 않았다. 기존 공통 모달 외형을 재사용했다.


## 장바구니 옵션 표시 보정 (2026-11-20)

CartDialogs의 상품명을 PC/MO500으로 보정하고 색상 표시의 접두어·괄호 숫자 코드를 생략한다. 실제 선택 문자열과 로컬 초안·저장 미연결 경계는 유지한다. PC/MO 신발·의류 팝업 계산 스타일 검증과 상세 값은 [UI 기록](ui.md#장바구니-옵션-팝업-타이포-보정-2026-11-20)을 따른다. 작업 트리 출처: src/app/cart/_components/CartDialogs.tsx.

## 공유 팝업 공통 버튼 적용 (2026-11-20)

사용자 첨부 디자인과 후속 브라우저 코멘트에 따라 상품 상세 공유 팝업을 2열·간격8px의 공통 버튼으로 변경했다. 카카오톡은 `Button social={{ provider: 'kakao' }}`, URL 복사는 `Button variant="secondary" iconLeft="link-regular"`를 사용하며 페이지별 버튼 CSS를 제거했다. 기본 높이48px·카카오 배경 #FAE100·secondary 1px 테두리와 공통 라벨·아이콘 순서·상태 스타일을 따른다. 링크 도형은 공통 Icon 자산으로 등록했다. 이전 사각 세로형 버튼 및 이 작업 중 시도한 높이44px·개별 색상 override를 대체한다.

기존 `/products/pdp-preview/share`, IA 연결, 모달·포커스 소유권과 상품 URL 생성은 유지한다. 복사 pending은 공통 `loading`으로 전달해 disabled와 aria-busy를 적용하며 성공·실패 토스트와 재시도 처리를 유지한다. 카카오톡 SDK는 미연결이다. 출처: 사용자 첨부 이미지와 코멘트, [Main / PLP / PDP](https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP), `src/app/products/[id]/_components/ProductDetailContent.tsx`, `src/components/common/atoms/Icon.assets.ts`, `public/images/icon/link-regular.svg` 작업 트리. Figma 원본 수치·굵기 모드는 조회 제한으로 미확인이다.

검증: PC 계산 스타일·모바일390px의 버튼168×48px·overflow 없음·URL 복사 성공 토스트와 스크린샷을 확인했다. 변경 파일 ESLint·타입 검사·Panda 생성은 통과했다. 기록: codex/gpt-6.

## My HOKA 표기 통일 (2026-11-23)

마이페이지 홈 메뉴와 공통 내비게이션의 제목, IA 진행 안내의 표기를 `My HOKA`로 통일했다. 경로와 메뉴 항목은 유지한다.

출처: `src/app/mypage/mypage-home-data.ts`·`src/app/mypage/mypage.data.ts`·`src/app/screen-index/screenProgress.ts`의 작업 트리. Git diff에서 문자열 변경 범위를 확인했으며 브라우저 실행 검증은 수행하지 않았다. 기록: codex/gpt-6, 2026-11-23T04:33:14.831593+00:00.

## 화면 문구 맞춤법과 띄어쓰기 (2026-11-23)

관심 상품 표기를 화면·접근성 라벨·가이드·IA 기록에 맞췄으며 멤버십 안내의 구매 시·이번 달 띄어쓰기를 수정했다. 생성 이력 JSON의 줄바꿈 정리도 사용자 지시에 따라 함께 포함한다. 서비스 계약·라우트·상태 동작은 변경하지 않았다.

출처: `src/app/cart/_components/CartEmptyState.tsx`, `src/app/cart/_components/CartProductSection.tsx`, `src/app/collection/_components/specialExhibition.data.ts`, `src/app/mypage/_components/MyPageContent.tsx`, `src/app/mypage/_components/MyPageProductHistory.tsx`, `src/app/mypage/mypage-home-data.ts`, `src/app/mypage/mypage.data.ts`, `src/app/mypage/page.tsx`, `src/app/mypage/wishlist/page.tsx`, `src/app/products/[id]/_components/ProductDetailContent.tsx`, `src/app/publishing-guide/_components/IconGuide.tsx`, `src/app/publishing-guide/_components/ProductCardGuide.tsx`, `src/app/screen-index/screenChangeHistory.generated.json`, `src/app/screen-index/screenDevelopers.ts`, `src/app/screen-index/screenProgress.ts`의 작업 트리. Git diff로 문구 변경을 검토했다. 브라우저 실행 검증은 수행하지 않았다. 기록: codex/gpt-6, 2026-11-23T04:45:34.967867+00:00.

## FAQ 탭과 상품 공유 UI 병합 기록 (2026-11-23)

- 고객센터 FAQ의 모바일 카테고리 탭은 화면 양끝까지 가로 스크롤하며, 공통 필터 탭의 선택 이동을 사용한다.

- 상품 상세 공유 미리보기는 왼쪽 카카오 아이콘과 18px 링크 아이콘을 표시한다. 퍼블리싱 가이드 아이콘 탭에서 링크 아이콘 예시를 확인할 수 있다.

- 상품 상세에서 선택한 옵션의 삭제 버튼은 공통 `xmark-regular` 아이콘을 18px로 표시한다.

## 로그인과 회원가입 안내 문구 (2026-11-23)

로그인의 가입 안내와 회원가입 방식 선택 제목을 `계정이 없으신가요?`로 변경했다. 로그인 안내 본문은 `회원가입 후 풍성한 멤버십 혜택을 확인해보세요.`로 수정했다.

출처: `src/app/login/_components/LoginContent.tsx`, `src/app/signup/_components/SignupContent.tsx`의 작업 트리. Git diff로 문자열 변경을 확인했으며 브라우저 검증은 수행하지 않았다. 기록: codex/gpt-6, 2026-11-23T05:09:10.640861+00:00.

## 로그인 저장 도움말 문구 (2026-11-26)

`/login`의 아이디 저장 도움말은 `공용으로 사용하는 장치에서는 아이디 저장하기의 사용에 유의해주세요.`라고 안내한다. 고정 미리보기 `/login/preview-help`도 같은 문구를 사용한다.

2026-11-26에 Codex가 `src/app/login/_components/LoginContent.tsx` 작업 트리의 Git diff에서 문구를 확인했다.

## 계정 잠금 해제 완료 제목 (2026-11-26)

`/login/account-locked/complete`의 `계정 잠금 해제 완료` 제목 옆 자물쇠 아이콘을 제거했다. Codex가 2026-11-26에 `src/app/login/account-locked/complete/page.tsx` 작업 트리의 Git diff에서 변경을 확인했다.

## 회원가입 혜택 문구 (2026-11-26)

`/signup`의 가입 방식 선택 화면은 신규가입 혜택을 `10% 쿠폰`, 축하 쿠폰의 지급 계기를 `생일`로 안내한다. Codex가 2026-11-26에 `src/app/signup/_components/SignupContent.tsx` 작업 트리의 표시 데이터를 확인했다.

## 회원가입 마케팅 수신 동의 통합 (2026-11-26)

`/signup/information`의 회원 정보 폼에 이메일·문자 수신 동의를 통합했다. `step=additional` 분기를 제거해 이전 쿼리 URL로 접속해도 통합 폼을 표시한다. IA 255번 부가정보는 `삭제 / 제외`로 표시하고 직접 링크를 제거했다. IA 256번은 회원 정보 입력 바로 아래에서 수신내역 모달의 기존 미리보기 URL을 연다. 출처는 사용자 브라우저 주석 및 회원가입·IA 연결 파일의 작업 트리다. [IA 기준](../project.md#회원가입-부가정보-ia-삭제-2026-11-26).

Codex는 PC 1440px·모바일 390px에서 이메일 입력·동의 선택과 모달 표시를 확인했다. 기존 쿼리 URL, 고정 입력 오류와 IA의 삭제 표시·모달 링크도 확인했다. TypeScript와 변경 파일 ESLint는 통과했다. IA 관련 테스트는 26개 중 25개가 통과했으며, 고객센터 `/support/inquiries/new/preview-attachment-picker`의 소스 연결 검사가 실패했다.

사용자 정정에 따라 이메일 주소와 마케팅 수신 동의 사이의 간격을 PC·모바일 모두 40px로 맞췄다. Codex는 1440px·1025px·1024px·390px에서 간격을 실측하고 TypeScript와 변경 파일 ESLint를 확인했다. 출처는 사용자 브라우저 주석과 `RegistrationContent.tsx` 작업 트리다.

## 회원가입 이메일 주소 단일 입력 (2026-11-26)

`/signup/information`과 `/signup/information/preview-error`는 전체 이메일 주소를 받는 입력 한 칸을 공유한다. 고정 오류 화면은 이메일 형식 오류를 그 입력 아래에 표시한다. 출처는 사용자의 브라우저 주석과 회원가입 정보 입력 화면의 작업 트리다.

Codex는 PC 1440px·모바일 390px에서 두 URL을 직접 열어 도메인 컨트롤 제거, 전체 이메일 주소 입력, 고정 이메일 오류 표시와 다음 버튼의 폼 연결을 확인했다. [이메일 입력 계약](ui.md#회원가입-이메일-입력-계약-2026-11-26).

## 비밀번호 길이 안내 문구 (2026-11-26)

로그인, 비밀번호 재설정, 회원가입 정보 입력의 고정 오류 미리보기에서 비밀번호 안내 길이를 10~20자로 표시한다. 출처는 `LoginContent.tsx`, `PasswordResetStatePreview.tsx`, `RegistrationStatePreview.tsx`의 작업 트리다. [공용 검증과 문구](ui.md#비밀번호-길이-안내-문구-2026-11-26).

## 계정 잠금 안내의 PASS 인증 문구 (2026-11-26)

`/login/account-locked`의 안내 문구를 `PASS 인증화면으로 이동합니다.`로 수정했다. 확인 버튼은 `/login/account-locked/verification`으로 이동한다. 출처는 `src/app/login/account-locked/_components/AccountLockedContent.tsx` 작업 트리와 해당 라우트의 `page.tsx`다.

## 회원가입 완료 안내 문구 (2026-11-26)

`/signup/complete`는 `회원가입이 성공적으로 완료되었습니다!`와 `쇼핑하러 가기 전 로그인을 진행해주세요.`를 표시한다. `쇼핑하러 가기` 버튼은 홈(`/`)으로 이동한다. 출처는 `src/app/signup/complete/page.tsx` 작업 트리다.

## 회원가입 본인인증 안내와 선택 항목 (2026-11-26)

`/signup/verify`는 HOKA Korea 온라인 회원가입 여부를 확인하기 위해 본인 인증이 필요하다고 안내한다. 화면에는 `휴대폰 인증하기`만 표시하며, 이 버튼은 `/signup/verify/phone`으로 이동한다. Codex가 2026-11-26에 `src/app/signup/verify/_components/IdentityVerificationContent.tsx` 작업 트리의 버튼 문구와 연결 경로를 확인했다.

인증 영역은 기존 한 열 너비로 유지하고 아이콘과 버튼을 가로 가운데에 배치한다. 병합 결과는 단일 `ButtonLink`로 이동하며 모바일 버튼의 최소 높이는 44px이다. 병합 전 `49ec13be`에서는 PC 1440px와 모바일 390px에서 가로 정렬과 인증 화면 진입을 확인했다. 출처는 사용자 브라우저 주석과 `IdentityVerificationContent.tsx`다.

## 러닝세션 상세 모바일 추가 영역 (2026-11-23)

`src/app/running/running-session/[sessionId]/_components/RunningSessionSessionContent.tsx`의 상세 레이아웃에서 모바일 보조 이미지와 Essential 숨김을 해제했다. 기존 desktopContent 슬롯의 타입·호출 계약과 라우트·고정 신청 바·fixture 표시 조건은 유지한다. PC/MO 측정 및 남은 디자인 확인 범위는 [러닝세션 디자인](running-session-design.md#모바일-보조-이미지와-essential-추가-2026-11-23)에 기록했다. 출처는 해당 작업 트리와 최신 파일 단위 Figma 링크이며 검토 주체 codex/gpt-6, 2026-11-23 KST다.

## 폼 placeholder 제거 경로 검토 (2026-11-24)

로그인·가입·계정 찾기·주문서·마이페이지·문의·런칭 캘린더·검색·IA와 퍼블리싱 가이드의 기존 URL에서 입력 및 선택 안내 문구를 제거했다. 경로, preview URL, 라우트 소유권과 이동 동작은 변경하지 않았다. 출처: 해당 `src/app` 작업 트리와 `src/components/catalog/ProductListingPage.tsx`. 기록: codex/gpt-6, 2026-11-24.

- 상품 상세의 문의하기 버튼은 기존 1:1 문의 입력 컴포넌트를 재사용하는 상품 문의 모달을 연다. 데스크탑은 중앙 모달, 모바일은 전체 화면을 사용한다. 고객 정보와 파일 첨부 영역은 1:1 문의 화면에서만 사용한다. 상품 유형이 고정되며 비밀글을 선택할 수 있다. 등록 요청은 미연결이다.

## 상품 상세 헤더 타이포와 간격 (2026-11-26)

상품 상세의 `ProductDetailHeader`에서 성별·활동 문구 전달과 모바일 숨김 선택자를 제거했다. 기본 신발, 의류, 할인 미리보기가 공통 `ProductIdentity` 상세 스타일을 사용한다. 모바일 상단·좌우 여백은 패널의 12px·16px를 사용한다. 출처는 사용자 주석과 `ProductDetailContent.tsx` 작업 트리다. [타이포와 간격 실측](ui.md#상품-상세-헤더-타이포와-간격-실측-2026-11-26).

## 상품 상세 상단 리뷰 요약 제거 (2026-11-26)

상품 상세 헤더에서 별점과 리뷰 바로가기를 제거했다. 본문 탐색의 ‘리뷰’ 링크는 기존 `#product-reviews`로 이동한다. 출처는 사용자 브라우저 주석과 `ProductDetailContent.tsx` 작업 트리다. Codex는 `/products/shoe-1`의 PC 1440px와 모바일 390px에서 상단 요약 비노출과 본문 리뷰 이동을 확인했다. 모바일 공유 팝업 열기·닫기, TypeScript와 변경 파일 ESLint도 확인했다.

## 클리프톤 상품 상세 기술 지표 도움말 (2026-11-26)

`/products/[id]`의 클리프톤 fixture(`HOKADFG34S`)에 무게, 힐투토 드롭, 쿠셔닝, 안정성, 반발력 도움말을 적용했다. 무게는 한 쪽과 기준 사이즈를 안내하며, 드롭과 척도는 단계별 설명을 줄바꿈으로 구분한다. Codex는 2026-11-26에 `src/app/products/[id]/productDetailPresentation.ts`의 표시 모델에서 다섯 도움말의 줄 수와 다른 상품의 척도 미표시를 확인했다.

기존 `HelpTooltip`은 화면 너비에 맞게 문장을 줄바꿈하고 안내 항목 사이의 줄바꿈을 유지한다. [HOKA 상품 상세 Tooltip 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design).

2026-11-26 후속 시안에 맞춰 `ProductDetailContent.tsx`의 기술 지표 도움말에 `HelpTooltip variant="description"`과 항목별 표시 폭을 연결했다. `productDetailPresentation.ts`는 안내 문구와 폭을 제공한다. [상세 툴팁 스타일과 검증](ui.md#상품-상세-tech-specs-툴팁-스타일-2026-11-26).

Codex는 `/products/shoe-1`의 PC 1440px에서 마우스를 올리고 모바일 390px에서 탭해 다섯 문구를 확인했다. 항목 간 줄바꿈, 가로 화면 범위 및 Escape 닫기를 확인했다. 상품 상세 표시 데이터 테스트 3개, TypeScript, 변경 파일 ESLint·Prettier 검사를 통과했다.

## 상품 상세 Tech Specs 타이포 보정 (2026-11-24)

ProductDetailContent.tsx의 Tech Specs 타이포를 PC·모바일 시안에 맞췄다. 기술 수치는 PC20px/MO18px, 척도 제목20px/800, 하단 라벨PC16px/MO13px이며 제목과 항목명의 행간·굵기도 보정했다. private 목록의 technical 기본false는 일반 속성 표시를 보존한다. 라우트·상품 표시 데이터·수치·바인딩과 서비스 경계는 유지한다. [디자인 값·출처·실행 검증](ui.md#상품-상세-tech-specs-타이포-보정-2026-11-24)을 따른다. 출처: src/app/products/[id]/_components/ProductDetailContent.tsx 작업 트리. 기록: codex/gpt-6.

## 관심상품 표기 복원 (2026-11-24)

`4b569dc3`에서 띄어 쓴 관심상품 표기를 사용자 요청에 따라 화면·접근성 라벨·가이드·IA 데이터와 생성 이력에서 `관심상품`으로 복원했다. 해당 커밋 이전부터 띄어 쓴 안내 문장과 다른 맞춤법 수정은 유지한다. 라우트·상태·서비스 계약은 바꾸지 않는다.

출처: 해당 커밋과 관련 src 파일의 작업 트리. 문자열별 복원 개수를 원본 커밋과 대조했다. 브라우저 실행 검증은 수행하지 않았다. 기록: codex/gpt-6.

## 상품 문의 팝업 직접 URL과 IA 연결 (2026-11-24)

`/products/pdp-preview/inquiry-form`은 기존 상품 상세 상태 라우트에서 상품 문의 폼을 처음부터 연다. 기존 ProductInquiryAction을 initialOpen 옵션으로 재사용하며 일반 문의하기 버튼은 기존 닫힌 상태와 트리거 포커스 복귀를 유지한다. 직접 preview는 별도 트리거 없이 열리고 닫을 때 기존 PDP 패널을 포커스 대상으로 삼는다. 기존 입력·취소·닫기만 제공하며 등록 요청은 추가하지 않았다.

productDetailPreviews의 `상품 문의하기 팝업` 항목을 기존 상품 상세 공통 IA 연결이 읽는다. 새 IA 번호를 만들지 않고 상품 상세 STATE의 보기 링크와 form variant를 등록했다. 기본 상품 상세와 기존 preview 링크·sourceFiles를 유지했다. screen-files 재생성 후 생성 그래프 변경은 없다.

검증: codex/gpt-6, 2026-11-24 KST. PC1440·MO375에서 직접 진입과 새로고침 시 하나의 상품 문의 팝업 표시 및 닫기를 확인했다. IA 구조도의 상태명 검색에서 해당 링크와 form 표시를 확인했다. 상품 상세·IA 변경 경로 ESLint/Prettier, 전체 TypeScript, source graph 생성을 통과했다. 전체 빌드는 실행하지 않았다. 출처는 사용자 브라우저 코멘트와 작업 트리의 ProductDetailContent.tsx, productDetailPreviews.ts, screenConnections.ts다.

## 주문 배송 조회 ALERT 직접 URL과 IA 연결 (2026-11-24)

`/mypage/orders`의 세 안내는 기존 `[preview]` 진입점에서 `OrdersPage`와 공통 `ModalDialog variant="alert"`로 연다. IA 178 ‘주문/배송 조회’는 `orderPreviews`의 상태명과 URL을 읽어 각 STATE의 보기 링크와 `variant="alert"`를 표시한다.

| 설계 상태 | IA 상태명               | 직접 확인 URL                         |
| --------- | ----------------------- | ------------------------------------- |
| order-01  | 주문 내역 삭제 차단     | `/mypage/orders/preview-delete-blocked` |
| order-02  | 품절 상품 장바구니 담기 | `/mypage/orders/preview-cart-sold-out` |
| order-03  | 장바구니 담기 완료      | `/mypage/orders/preview-cart-added`    |

세 팝업의 헤더는 ‘주문/배송 조회’이며 본문과 확인 버튼은 사용자 지정 문구를 따른다. order-01의 설명에는 지정된 줄바꿈을 적용한다. 설계서 모바일 프레임에서 제목·메시지·설명·닫기·확인 구성을 확인했고, PC·모바일 레이아웃과 타이포그래피는 HOKA 공통 alert 규격을 적용했다. 확인은 팝업을 닫는다. 삭제 가능 여부, 품절 판정, 장바구니 추가 및 결과 갱신은 주문 기능 소유자의 서비스 연결 범위다.

출처는 사용자 지정 문구, [이랜드 화면설계서](https://www.figma.com/design/4cJ1LkWUgme3lklyQ9U8qr/)와 `orderPreviews.ts`, `[preview]/page.tsx`, `OrdersPage.tsx`, `screenConnections.ts`의 작업 트리다. 기록: codex/gpt-6, 2026-11-24 KST.

검증: PC 1440px과 모바일 375px에서 세 팝업의 직접 진입·새로고침·문구·닫기를 확인했다. 모달 너비는 PC 640px, 모바일 343px이었다. IA에서 상태명·URL로 검색할 수 있고, 각 보기 링크를 눌러 해당 팝업이 열리는 것을 확인했다. 기본 주문 조회와 기존 주문 삭제 확인도 점검했다. 타입 검사와 소스 그래프 생성은 통과했고, 관련 테스트 16개 중 15개가 통과했다. 기존 `/mypage/preview-no-orders` 리디렉션에 IA 바로가기가 없다는 검사가 실패했다.

## 재입고 알림 상품 목록 기획 변경 (2026-11-26)

재입고 알림 상품과 주문/배송 조회는 공통 `DataList` 설정으로 머리글을 시각적으로 숨긴다. 재입고 알림의 열 제목과 본문 셀은 표 의미를 유지한다. 주문/배송 조회의 PC 상단 2px 선은 목록 본체에 적용한다. [공통 머리글 기본값과 검증](ui.md#공통-목록-머리글-숨김-2026-11-26).

`/mypage/restock-alerts`의 목록은 품절 상품 상세에서 재입고 알림을 신청하면 문자로 알려주며 신청한 알림을 삭제하면 발송이 취소된다고 안내한다. 출처는 `src/app/mypage/_components/MyPageProductHistory.tsx`의 표시 문구다.

IA 184의 재입고 알림 상품 목록(`/mypage/restock-alerts`)에 수정된 기획을 적용했다.

- PC와 모바일에서 각 상품 행의 상품정보 왼쪽에 개별 선택 체크박스를 배치한다.
- 목록 위 오른쪽에 `삭제` 버튼을 배치한다. 빈 목록에서는 목록 컨트롤을 표시하지 않는다.

첨부된 PC 기획 화면과 사용자 브라우저 코멘트, `src/app/mypage/_components/MyPageProductHistory.tsx`, `src/app/mypage/restock-alerts/page.tsx` 작업 트리가 출처다. 체크는 화면에서만 관리하며, 삭제 요청과 삭제 대상 정책은 재입고 통합 소유자가 연결한다.

Codex는 PC 1255px와 모바일 390px에서 체크박스 두 개의 개별 선택, 목록 위 버튼의 오른쪽 정렬, 가로 넘침 여부를 확인했다. 모바일 빈 목록에는 두 컨트롤이 렌더되지 않았다. TypeScript와 변경 소스 ESLint·Prettier를 통과했다.

## 관심상품 카드 색상 개수 표시 (2026-11-26)

PC와 모바일에서 `/mypage/recent`는 색상 개수 문구를 표시하고, `/mypage/wishlist`는 색상 캐러셀을 표시한다. [카드 설정과 검증](ui.md#관심상품-카드-색상-개수-표시-2026-11-26).

## 최근 본 상품 빈 목록과 IA 상태 (2026-11-26)

IA 183의 기본 페이지 `/mypage/recent`와 고정 상태 `/mypage/recent/preview-empty`는 `MyPageProductHistory`를 공유한다. IA 상태 행에 `최근 본 상품 목록 없음`으로 표시하며 기본 링크, IA 번호, 양쪽 진입 파일 연결을 유지한다. `preview-empty`는 직접 접속 시 빈 목록을 표시한다. [전체삭제 표시와 데이터 연결 범위](ui.md#최근-본-상품-전체삭제와-빈-목록-2026-11-26).

작업 트리 출처는 `src/app/screen-index/screenConnections.ts`, `src/app/mypage/_components/MyPageProductHistory.tsx`다. 기존 preview 진입점은 `src/app/mypage/recent/preview-empty/page.tsx`다.

## 카카오톡 알림톡 수신 항목 표시 (2026-11-26)

`/signup/information?step=additional`, `/signup/information/preview-marketing-consent`, `/mypage/profile`, `/mypage/profile/preview-edit`, `/publishing-guide?tab=description-list`의 기존 경로에서 카카오톡 알림톡 수신 항목을 다시 표시한다. [복원 범위와 소스](ui.md#카카오톡-알림톡-수신-항목-복원-2026-11-26).

## 신규 타이포그래피 퍼블리싱 가이드 (2026-11-25)

`/publishing-guide`의 타이포그래피 탭에 Display·Heading·Body 규격표를 연결한다. Display와 Heading은 각각 Wide·Compact 서브 탭을 제공하고 초기값은 Wide다. Body는 공통 표 하나를 표시한다. 같은 크기의 굵기는 예시 열로 나란히 배치하고 예시 문구에서 해당 경로의 코드를 복사한다. 표의 예시는 명시적인 플랫폼 컨텍스트로 렌더링하며, 한글·영문은 각각 본문 글리프와 폰트 패밀리를 지정한다. [폰트 체계와 이관 기준](ui.md#displayheadingbody-타이포그래피-이관-2026-11-25).

## 메인 홍보 팝업과 IA 연결 (2026-11-25)

`/preview-promotion`은 메인과 같은 HomeContent에서 홍보 레이어 팝업을 처음부터 연다. 새로고침하면 첫 슬라이드에서 다시 시작한다. IA 2번 `Main > Pop-up`의 STATE에 ‘홍보 레이어 팝업’과 직접 URL을 등록했다. IA 1번은 기본 메인 `/`에 연결되며, 운영 노출 데이터가 전달되기 전에는 기본 메인에 팝업을 표시하지 않는다.

출처는 `src/app/preview-promotion/page.tsx`, `src/app/_components/HomeContent.tsx`, `src/app/screen-index/screenConnections.ts`의 작업 트리다. 디자인과 표시 데이터 계약은 [메인 홍보 팝업](home-product-design.md#메인-홍보-팝업-2026-11-25)을 참고한다. 기록: codex/gpt-6, 2026-11-25 KST.

검증에서 기본 메인 진입, IA 상태명·URL 검색, IA 1번의 기존 메인 링크와 IA 2번 보기 링크의 팝업 열기를 확인했다. 소스 그래프 생성과 관련 테스트, 변경 TSX의 ESLint·Prettier, Next.js 빌드를 통과했다. 전체 lint는 기존 `tests/wh-file-summary.test.mjs`의 전역 이름 `no-undef` 오류 8건을 보고했다.

## 회원가입 본인인증

[회원가입 본인인증 안내와 선택 항목](#회원가입-본인인증-안내와-선택-항목-2026-11-26)에서 병합 후 문구와 단일 인증 링크 구성을 확인할 수 있다.

## 회원가입 혜택 안내

/signup의 첫 두 혜택은 신규가입 10% 쿠폰과 생일 축하 쿠폰으로 표시한다.

## 마이페이지 멤버십 바코드

마이페이지 구매내역의 ‘주문/배송조회’와 ‘취소/반품내역’ 메뉴는 PC와 모바일에서 같은 문구를 사용한다. 두 링크는 `src/app/mypage/mypage-home-data.ts`에서 관리한다.

회원 이름 아래의 ‘멤버십 바코드 보기’는 모바일에서만 표시하며 바텀시트를 연다. 확인 또는 닫기를 누르면 버튼으로 포커스가 돌아간다. PC로 전환하면 바코드 버튼과 열린 바텀시트가 제거된다. 바코드는 시안의 샘플 이미지이며 실제 회원별 발급은 연동 대상이다. 모바일에서는 등급명 옆에 등급안내를 배치하고, 메뉴 제목의 구분선 아래에 첫 항목을 바로 배치한다.

출처는 모바일 마이페이지·바코드 시안과 사용자 브라우저 코멘트, `src/app/mypage/_components/MyPageContent.tsx`, `public/images/mypage/membership-barcode.png`다.

## 목록·정보 영역 시작선 색상 (2026-11-26)

주문 취소·반품 신청과 배송 조회, 장바구니·주문서 결제 합계, 주문서 쿠폰 조회, 배송지 목록, 관심상품·최근 본 상품 빈 목록, 공지 상세, FAQ, 1:1 문의의 주문 상품 조회, 상품 상세의 문의·반품·모바일 A/S·옵션 합계, 회원가입의 휴대폰 인증약관·마케팅 수신 동의에 회색 `#E9EAEB` 시작선을 적용했다. [공통 옵션과 스타일 출처](ui.md#목록-영역-회색-시작선-2026-11-26).

## 마이페이지 주문·재입고 목록 구분선 (2026-11-26)

주문 상세의 받는사람 정보·결제 정보·취소·반품 내역, 취소·반품 상세의 상품 목록과 상세 섹션, 취소·반품 목록의 PC 시작선·모바일 행 구분선, 재입고 알림 상품 기본·빈 목록의 시작선을 `#E9EAEB`로 표시한다. 기존 PC·모바일 선 두께와 접근성 구조를 유지한다. 출처는 사용자 응답 주석과 `src/app/mypage/orders/_components/OrderDetails.tsx`, `src/app/mypage/orders/_components/OrdersList.tsx`, `src/app/mypage/_components/MyPageProductHistory.tsx` 작업 트리다.

Chromium PC 1255px에서 상세 화면과 목록의 회색 구분선을 확인했다. 모바일 390px에서 주문·취소·반품 상세, 취소·반품 목록, 재입고 알림 기본·빈 목록의 선 색상과 두께를 확인했다.

## 주문·취소·반품 상세 PC 머리글 숨김 (2026-11-26)

`/mypage/orders/preview-detail`, `/mypage/orders/preview-cancel-detail`, `/mypage/orders/preview-return-detail`의 PC 상품 표에 공통 `DataList` 머리글 숨김을 적용했다. 주문 상세의 취소·반품 내역 표도 포함한다. [표 구조와 검증](ui.md#공통-목록-머리글-숨김-2026-11-26).

## 마이페이지 PC 메뉴 제목과 구분선

`/mypage`의 메뉴 섹션 다섯 곳은 PC에서 제목을 24px·900으로 표시하고 1px 구분선 아래에 첫 메뉴 행을 바로 배치한다. 기존 메뉴 행 높이와 링크 경로를 유지한다. 모바일은 기존 제목 22px·700, 구분선 1px, 목록 간격 0px을 사용한다.

출처는 사용자 브라우저 댓글 1~5와 `src/app/mypage/_components/MyPageContent.tsx`의 작업 트리다. Codex가 2026-11-26에 PC 1440px과 모바일 390px에서 다섯 섹션의 계산 스타일, 구분선과 목록 사이 거리, 링크 경로를 확인했다.

## 마이페이지 등급안내와 상단 로그아웃

`/mypage`는 PC와 모바일에서 RUNNER 오른쪽 16px에 ‘등급안내’를 배치한다. ‘등급안내’는 `/mypage/rewards`로 연결하고, 상단 ‘로그아웃’은 테두리 없는 14px 밑줄 텍스트 버튼으로 기존 확인창을 연다.

출처는 사용자 브라우저 댓글 1~2와 `src/app/mypage/_components/MyPageContent.tsx`의 작업 트리다. Codex가 2026-11-26에 PC 1255px과 모바일 390px에서 등급안내 위치와 경로, 로그아웃 계산 스타일, 확인창 열기와 Escape로 닫은 뒤 포커스 복귀를 확인했다.

## 러닝세션 신청내역 취소 버튼

`RunningSessionEntriesContent`는 취소 가능한 신청에 공통 secondary short 버튼을 표시한다. PC에서는 세션 정보 오른쪽 하단에, 모바일에서는 세션 정보 아래 12px 간격으로 한 줄 전체에 배치한다. 두 화면 모두 버튼 높이는 40px이며 누르면 취소 확인창이 열린다. 출처는 [러닝세션 신청내역 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql)과 신청내역 컴포넌트다.

러닝세션 신청내역의 목록 합계는 PC와 모바일에서 탭별 수량에 ‘개’를 붙여 표시한다.

## 상품리뷰 수정 버튼

마이페이지 ‘작성한 리뷰’의 수정하기 버튼은 PC에서 행 오른쪽의 테두리형으로, 모바일에서 리뷰 아래 12px 간격의 전체 너비 검정 버튼으로 표시한다. 두 버튼의 높이는 40px이며 같은 리뷰 수정 창을 연다. 출처는 [상품리뷰 시안](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql)과 `src/app/mypage/reviews/_components/ReviewsContent.tsx`다.

모바일의 ‘작성 가능한 리뷰’도 상품 정보 아래 12px 간격으로 높이 40px의 검정 리뷰 작성 버튼을 전체 너비로 표시한다.

화면 변경 이력에서 마이페이지 쿠폰과 러닝세션 신청내역의 메뉴 그룹은 `My HOKA`로 표기한다.

## 러닝세션 신청내역 상태 표시와 상세 링크

`/mypage/event-entries`의 종료·신청완료·신청취소 상태는 공통 Typography의 기본 검정색으로 표시한다. 상품리뷰와 같은 `DataList`의 `top: 'thinSubtle'` 옵션이 정렬 영역 아래 목록 상단에 1px 회색 선을 표시한다. 세션 상세 경로는 96px 썸네일 링크에 연결하고 기존 세션 제목을 링크의 접근성 이름으로 사용한다. 신청 취소 버튼은 공통 secondary short 스타일을 사용한다.

출처는 사용자 브라우저 코멘트와 `src/app/mypage/event-entries/_components/RunningSessionEntriesContent.tsx` 작업 트리다. Codex가 2026-11-26에 PC 1296px·모바일 390px에서 세 상태의 검정색과 투명 배경, 목록 상단선 1px #E9EAEB, 제목과 썸네일의 시맨틱, 취소 버튼의 1px 아웃라인을 확인했다. 모바일에서 취소 확인창 열기와 Escape 닫기, 북악산 세션 썸네일을 통한 상세 이동도 확인했다.

목록의 날짜 라벨은 접수일과 세션일시로 표기한다.

마이페이지 홈 프로필의 호칭 ‘님’은 제목 크기(PC 36px, 모바일 34px)를 상속하며 두 화면 모두 Medium(500)으로 표시한다.

회원정보 관리 조회 화면은 PC에서 제목 아래 구분선 없이 기본정보까지 40px, 기본정보 행 사이는 24px, 안내 문구와 수정 버튼 사이는 40px을 둔다. 기본정보와 수신 동의 영역의 하단 구분선은 유지한다.

회원정보 수정 화면도 PC와 모바일 모두 제목 아래 구분선을 표시하지 않는다.

회원정보 수정에서는 휴대폰 번호를 입력하고 요청하면 인증번호 입력란과 고정 남은 시간, 확인 버튼이 나타난다. 6자리 입력 후 확인은 화면 시연이며 서버 인증 상태를 변경하지 않는다. 번호를 바꾸면 새 요청부터 시작한다.

회원정보 수정의 인증번호 입력란 아래 남은 시간은 PC·모바일에서 red80으로 표시한다.

고객센터 공지사항 목록은 PC·모바일 모두 열 제목 없이 연한 1px 상단선과 행 하단선을 표시한다. 공지 제목은 PC 18px·모바일 16px Medium, 날짜는 PC 16px·모바일 14px Regular로 첫 줄 오른쪽에 배치한다. 날짜 열은 내용에 맞게 늘어나며 날짜 전체를 한 줄에 표시한다.


## 상품 상세와 상품 타일 가이드의 프로모션 색상 (2026-11-26)

상품 상세, 최근 본 상품, 퍼블리싱 가이드의 타일 탭은 공통 `ProductIdentity`의 빨강 프로모션 배지를 표시한다. 해당 페이지의 색상 지정 호출과 가이드 예시를 정리했다. 별도 경로나 표시 상태의 URL은 추가하지 않았다. [공통 색상과 출처](ui.md#상품-카드-프로모션-배지-공통-색상-2026-11-26).

## 상품 상세 사이즈 실측표 (2026-11-26)

상품 상세는 의류·용품의 실측표가 제공되면 IMC 다음, 리뷰 앞에 사이즈 섹션을 표시한다. 상세 내비게이션은 상품 정보·사이즈·리뷰·상품 문의 순이며, 사이즈 링크는 고정 내비게이션 아래의 `#product-size`로 이동한다. 신발, 유형 미제공 상품, 빈 실측표는 사이즈 링크와 섹션을 숨긴다. 의류 예시는 `/products/pdp-preview/apparel`에서 확인한다.

PC는 본문 폭에 열을 균등 배치하고 행 높이는 52px이다. 모바일은 행 높이 46px이며 첫 열을 포함해 2–3열의 첫 열은 85.75px, 4–5열은 균등 배분, 6열 이상은 첫 열 고정과 최소 66px 열의 내부 가로 스크롤을 적용한다. 제목은 Pretendard Black PC 24px·모바일 20px, 단위는 우측 '단위: cm'다.

출처는 상품상세 컴포넌트와 표시 모델·미리보기 작업 트리, 사용자 제공 [HOKA 상품 상세 PC·모바일 및 사이즈 실측표 가이드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design)다. [표시 데이터 계약](../project.md#상품-상세-실측표-표시-데이터-2026-11-26)과 [검증](../development/verification.md#상품-상세-사이즈-실측표-검증-2026-11-26)을 참고한다.

## 고객센터 제목과 상단 구분선

FAQ 질문과 공지 상세 게시글 제목은 PC·모바일 모두 18px Medium이며 FAQ 목록 시작선과 공지 상세 제목 위 구분선은 모두 thinSubtle(1px solid black.20)을 사용한다. 출처는 FaqContent.tsx와 공지 상세 page.tsx다.

1:1 문의 목록과 목록 미리보기의 상단 구분선은 PC·모바일 모두 공통 Divider의 subtle(1px, black.20)을 사용한다. 출처는 src/app/support/inquiries/page.tsx와 _components/InquiryListPreview.tsx다.

## 주문 카드의 취소·반품 상품 액션

구매취소·반품요청 상품의 장바구니 담기 버튼은 PC·모바일 모두 표시하지 않는다. 출처는 `src/app/mypage/orders/_components/OrdersProducts.tsx`다.



2026-11-27 사용자 요청에 따라 `/mypage/orders` 주문 카드의 취소 상태는 `취소완료`, 반품 상태는 `환불신청`으로 표시한다. Codex가 `OrdersProducts.tsx` 작업 트리로 PC 1427px과 모바일 375px에서 각 상태 옆의 `취소상세보기`·`반품상세보기` 표시를 확인했다.

## 장바구니 무료배송과 주문 상세 왼쪽 정렬 2026-11-27

`/cart`의 PC 주문내역에서 무료배송 정책에 따라 배송비 행을 주석 처리했다. 고정 배송비는 0원, PC 총 결제 금액은 331,550원이다. 모바일 하단 구매 영역은 기존 240,000원 표시를 유지한다.

`/mypage/orders/preview-detail`의 PC 상품 목록에서 상태 문구와 상품 행의 왼쪽 24px 안쪽 여백을 제거했다. 구매확정·구매취소·반품요청 그룹의 왼쪽 시작선을 상세 제목에 맞춘다.

출처는 사용자 브라우저 코멘트와 `CartOrderActions.tsx`, `cart-preview.ts`, `OrderDetails.tsx` 작업 트리다. Codex가 2026-11-27 KST에 PC 1427px과 모바일 375px에서 장바구니 결제 금액과 배송비 행 숨김, 주문 상세 상태 문구 정렬을 확인했다. PC 상품 이미지 세 개의 왼쪽 정렬도 확인했다.

## 주문 결제 정보와 환불안내의 배송비 표시 2026-11-27

무료배송 정책에 따라 주문 상세 결제 정보와 취소·반품 상세가 공유하는 환불안내에서 배송비 행을 주석 처리했다. 주문 상세 PC 결제예정금액의 설명은 `(상품금액 - 할인금액)`이다. 결제예정금액·환불금액의 표시 데이터와 반품비 행은 유지한다.

출처는 사용자 브라우저 코멘트와 `src/app/mypage/orders/_components/OrderDetails.tsx` 작업 트리다. Codex가 2026-11-27 KST에 PC 1427px과 모바일 375px에서 주문·취소·반품 상세의 배송비 숨김 및 금액 표시를 확인했다. 주문 상세 PC에서 수정한 결제예정금액 설명을 확인했다.

## 상품 상세의 배송·반품과 유형별 관리 방법 2026-11-27

상품 상세의 배송 및 반품 아코디언은 배송 2개 항목, 반품 5개 항목, 반품 주의 사항 4개 항목을 표시한다. CJ 대한통운 출고·수거 및 단순 변심 반품 배송비 5,000원 안내를 포함한다. 상세 안내 링크는 고객센터 `/support/after-sales`로 이동한다.

관리 방법은 현재 상품의 `productKind`로 구분한다. 신발은 착화·관리 5개와 GORE-TEX® 소재 관리 3개, 의류와 용품은 각 5개 항목을 표시한다. 유형이 없는 기존 상품은 신발 안내를 사용한다. PC·모바일은 기존 Typography 토큰으로 관리 제목 15px Bold, 본문 13px Regular를 표시한다.

상품 상세 IA에 `용품 기본`을 추가했다. `/products/pdp-preview/accessories`는 HOKA Run Hat(1164330), Varsity Navy / Gold(VGL) 색상과 용품 관리 문구를 표시한다. 공식 상품 갤러리 사진 4장을 1200×1479 WebP로 저장해 PC 그리드, 모바일 캐러셀 및 색상 썸네일에 연결했다. 원화 가격은 미리보기 고정값이다. [HOKA 미국 상품 페이지](https://www.hoka.com/en/us/all-gender-apparel/hoka-run-hat/1164330.html?dwvar_1164330_color=VGL).

출처는 사용자 브라우저 코멘트, [HOKA 디자인의 배송 및 반품과 관리 방법](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design), `ProductDetailContent.tsx`, `productDetailCare.ts`, `productDetailPreviews.ts` 작업 트리다. Codex가 2026-11-27 KST에 PC 1427px와 모바일 375px에서 세 유형의 관리 안내, 제목·본문 크기, 상품 상세의 배송 및 반품 항목을 확인했다. 모바일에서 고객센터 이동을 확인했고 IA 검색에서 용품 기본과 링크를 확인했다.

Codex는 2026-11-27 KST에 PC 1427px와 모바일 375px에서 HOKA Run Hat 사진 4장의 로딩과 색상 표시를 확인했다. 모바일에서 두 번째 사진으로 전환되는 것을 확인했다.

## 마이페이지 회원등급 표시 옵션 2026-11-27

`/mypage/rewards`의 `RewardsContent.tsx`는 공용 `MembershipRewards`에 `layout="account"`를 전달한다. 기존 기본·조회 중·조회 실패 경로에 같은 표시 옵션을 적용한다. 고객센터 `/support/member-benefits`는 생략 시 적용되는 `standard`를 사용하며 기존 로그인 표시 조건을 따른다. 구매 금액과 쿠폰 지급 조건은 기존 표시 데이터를 읽는다. [시안 수치와 화면 확인](ui.md#마이페이지-회원등급-pc모바일-디자인-2026-11-27).

작업 트리의 `src/app/mypage/rewards/_components/RewardsContent.tsx`를 출처로 기록한다. Chromium에서 마이페이지 조회 중·실패 문구와 고객센터 로그인 전후 미리보기의 개인 요약 표시를 확인했다.

## 장바구니 삭제 버튼과 옵션 문구 2026-11-27

장바구니의 `품절상품 전체삭제` 버튼을 주석 처리하고, 상품 옵션 문구는 발볼·색상·사이즈까지만 표시한다. 수량은 기존 수량 조절기로 표시한다. 출처는 사용자 브라우저 코멘트와 `CartProductSection.tsx`, `cart-preview.ts` 작업 트리다. Codex가 PC 1427px과 모바일 375px에서 버튼 숨김, 상품 5개의 옵션 문구와 수량 조절기 및 `선택 삭제` 표시를 확인했다. 모바일에서 옵션 변경 팝업이 열리는 것도 확인했다.

## 상품준비중 배송 조회 버튼 2026-11-27

`/mypage/orders` 목록은 상품 그룹의 상태가 배송중·배송완료·구매확정일 때 배송 조회 버튼을 표시한다. 주문 상세는 선택 주문의 상태가 상품준비중이면 `OrdersContent`에서 배송 조회 콜백을 생략하며, `OrderDetail`은 해당 콜백이 있는 PC 화면에서 버튼을 표시한다. 출처는 사용자 지시와 `OrdersProducts.tsx`, `OrdersContent.tsx`, `OrderDetails.tsx` 작업 트리다. Codex가 PC 1427px과 모바일 375px에서 상품준비중 목록의 배송 조회 숨김과 주문 취소 표시를 확인했다. PC에서는 목록에서 상품준비중 상세로 들어가 배송 조회가 숨겨지는 것과 구매확정 상세의 버튼 표시를 확인했다.

## 혼합 상품 목록 이미지 비율 2026-11-27

신발·의류 등 상품 종류가 섞일 수 있는 카드 목록은 의류 기준 `371 / 464` 이미지 프레임을 목록 전체에 사용한다. `/mypage/wishlist`와 `/mypage/recent`는 고정 예시·연결 목록에 동일하게 공용 `ProductCard.thumbnailVariant="listing"`을 전달한다. 상품 카테고리와 조회 결과가 바뀌어도 같은 목록 비율을 사용한다. 출처는 사용자 브라우저 코멘트, `AGENTS.md`와 `MyPageProductHistory.tsx` 작업 트리다. Codex가 PC 1427px과 모바일 375px에서 두 목록의 카드 6개씩이 같은 비율과 높이를 사용하는 것을 확인했다.

## 상품 옵션 순서와 반품 상세 표시 2026-11-27

장바구니·상품 상세·주문서·주문 및 취소·반품 상세·신청·문의 주문 조회의 옵션 요약은 색상, 사이즈, 발볼 순서다. PC·모바일의 기존 수량 표시 위치를 따르며, 요약에 수량을 표시할 경우 옵션 뒤에 둔다. [공통 옵션 표시](ui.md#상품-옵션-요약-순서-2026-11-27).

`/mypage/orders/preview-return-detail`의 회수 섹션 제목은 `상품 회수정보`, 고정 진행상태는 `환불완료`, 금액 라벨은 PC·모바일 모두 `총 환불금액`이다. PC 반품 상품 표에는 기존 `상품/옵션정보 · 수량 · 가격 · 진행상태` 헤더를 사용한다. 출처는 사용자 응답 주석과 `OrderDetails.tsx`, `orders.data.ts` 작업 트리다. Codex가 PC 1427px와 모바일 375px에서 장바구니, 주문서, 주문 목록·상세와 취소·반품 상세의 옵션 순서를 확인했다. 같은 두 해상도에서 반품 문구와 취소 상세 상태를 확인했고 PC에서 기존 표 헤더도 확인했다.

## 결제와 환불 화면 문구 2026-11-27

장바구니·주문서와 쿠폰 팝업에는 `총 결제금액`을 사용한다. 주문 상세와 PC 취소 상세에는 `결제금액`을 사용한다. 취소·반품 관련 화면과 퍼블리싱 가이드의 `취소 사유`, `단순 변심`, `환불 수단` 띄어쓰기를 정리하고 환불 소요기간 안내의 별표를 제거했다. 출처는 사용자 포함 지시와 `CartOrderActions.tsx`, `CheckoutCouponDialog.tsx`, `CheckoutDiscountSummary.tsx`, `CheckoutForm.tsx`, `OrderClaimRequest.tsx`, `OrderDetails.tsx`, `descriptionListExamples.tsx` 작업 트리다. 공용 상태 문구는 [주문 취소·반품 표시](ui.md#주문-취소반품-상태-문구-2026-11-27)를 참고한다.

## 주문 취소 신청의 반품비 표시 2026-11-27

`OrderClaimRequest`의 반품비 안내와 금액 요약 행은 반품 신청에만 표시한다. 주문 취소 신청은 상품금액과 취소예정금액의 기존 고정 표시값을 사용한다. 출처는 사용자 브라우저 코멘트와 `src/app/mypage/orders/_components/OrderClaimRequest.tsx` 작업 트리다. Codex가 2026-11-27 KST에 PC 1333px·모바일 375px에서 두 신청 미리보기의 반품비 및 예정금액 표시를 확인했다.

## 최근 본 상품과 관심상품 빈 목록 구분선 2026-11-27

`/mypage/recent/preview-empty`와 `/mypage/wishlist/preview-empty`는 공용 `MyPageProductHistory.tsx`의 빈 목록 제목 아래 구분선을 숨긴다. 같은 컴포넌트의 `/mypage/restock-alerts/preview-empty`는 2px 구분선을 사용한다. 출처는 두 빈 목록의 사용자 브라우저 코멘트와 작업 트리다.

Chromium PC 1476px·모바일 375px에서 세 빈 화면의 구분선과 최근 본 상품 일반 목록 및 전체삭제 버튼의 표시 상태를 확인했다.

## 최근 본 상품과 관심상품 PC 목록 정렬 2026-11-27

`/mypage/recent`와 `/mypage/wishlist`의 PC 상품 카드 목록은 제목의 왼쪽 시작선에 맞춘다. 두 화면은 `MyPageProductHistory.tsx`에서 최대 260px 카드 열 세 개와 16px 열 간격을 공유한다. 최근 본 상품의 PC 일반 목록은 제목 헤더 오른쪽에 32px 여백을 두어 `전체삭제` 버튼을 왼쪽으로 옮긴다. 빈 목록과 모바일은 기존 헤더 배치를 사용한다. 출처는 사용자 브라우저 코멘트와 `src/app/mypage/_components/MyPageProductHistory.tsx` 작업 트리다.

Chromium PC 1476px에서 두 목록의 제목과 첫 카드 좌표가 각각 일치하고, 카드 폭은 기존 260px이며 최근 본 상품의 전체삭제 버튼이 32px 이동한 것을 확인했다. 모바일 375px에서 두 목록의 2열과 기존 시작선을 확인했다.

## IA 구조도와 화면검수용 목록 2026-11-27

개발용 /screen-index와 검수용 /screen-review가 IA 계층, NAV 필터, 검색과 상태 URL을 공유한다. 둘 다 화면 현황부터 표시하고 트리를 기본 펼침으로 시작한다. 새 검색어와 전체 초기화는 접힌 트리를 다시 연다. 화면 상태는 준비된 이름과 URL별 모달 유형 배지로 표시한다.

검수용 표는 메뉴·화면 계층, 구분, 새창의 세 열로 구성한다. 업무 열과 개발담당자 필터·보고서를 렌더링하지 않고 업무 필드는 검수 검색 대상에서도 제외한다. 보고서 쿼리는 개발용 경로에서만 읽는다. 두 경로는 같은 접근 범위를 갖는다.

검수용 화면에서는 상품 목록과 검색 상태를 나누고, 발볼이나 옵션 선택처럼 같은 항목의 예시를 펼치고 접을 수 있게 묶는다. 빈 화면에는 EMPTY를 표시하며 이미 열린 모달 유형도 함께 표시한다. 모든 보기 링크는 기존 상태 URL을 그대로 연다. 출처는 사용자 브라우저 코멘트와 IaStructurePage, ScreenReviewPage 작업 트리다.

Codex는 PC 1424px와 모바일 375px에서 두 목록의 링크 243개, 트리 기본 펼침, 발볼 접기와 검색 재펼침, 숨긴 업무 데이터의 검색 제외, 초기화와 개발용 보고서 열기·닫기를 확인했다. PC 검색 빈 상태와 모바일 최근 본 상품 새창, 1024/1025px 및 1199/1200px 경계, 보고서가 열린 상태의 리사이즈도 확인했다. 기존 미리보기·보고서 검사 26개 중 24개가 통과했고, 상품 상세의 care 공통 파일 및 문의 첨부 선택의 소스 연결 2건은 변경 전 레지스트리에서도 실패했다.

## IA 공통 관리 자료와 문의 첨부 진입점 2026-11-27

상품 상세의 공통 작업 파일은 유형별 관리 문구를 실제로 제공하는 productDetailCare.ts를 표시한다. 고객센터 관리 안내 데이터는 별도 소유다. 모바일 첨부 방법 선택 페이지는 고객센터와 마이페이지 문의 등록의 고정 상태 URL 및 소스 진입점 양쪽에 연결된다. 출처는 productDetailCare.ts와 screenConnections.ts 작업 트리다.

## 상품내역 빈 화면 구분선 제거 2026-11-27

관심상품·최근 본 상품·재입고 알림 상품의 빈 목록에는 제목 아래 구분선을 표시하지 않는다. 최근 본 상품의 빈 화면 하단 안내 앞 선도 제거했으며 일반 최근 본 상품의 PC 하단 안내에는 기존 선을 적용한다. 출처는 사용자 브라우저 코멘트와 MyPageProductHistory.tsx 작업 트리다. Codex는 Chromium PC 1414px 및 모바일 375px에서 세 빈 목록의 경계선과 PC 일반 최근 본 상품 안내의 경계선을 확인했다.

## 고객센터 사이즈 가이드 디자인 2026-11-27

`/support/size-guide`의 서버 페이지가 고객센터 공통 레이아웃과 표시 데이터를 제공하며 라우트 전용 `SizeGuidePanel`이 카테고리·성별·단위 선택을 맡는다. 선택은 현재 경로의 로컬 상태로 관리한다. 제목 행에 플랫폼별 최소 높이를 적용해 카테고리를 전환해도 표의 시작 위치를 유지한다. 기존 IA 260 진입점과 고객센터 메뉴 경로를 유지한다. [화면 구성과 데이터 출처](size-guide.md#고객센터-사이즈-가이드-디자인-반영-2026-11-27).

## 고객센터 메인 전화 링크 2026-11-27

`/support`의 연락처 카드는 기존 플랫폼 상태를 읽어 PC에 전화번호 텍스트를, 모바일에 통화 링크를 표시한다. [표시와 검증](support-design.md#고객센터-메인-전화-링크-2026-11-27).

## 재입고 알림 상품의 행별 삭제 버튼 2026-11-27

/mypage/restock-alerts 목록의 상품 행 오른쪽 위에 장바구니와 같은 20px X 버튼을 배치한다. 개별 선택 체크박스와 목록 위 삭제 버튼은 제거했다. 통합 소유자는 entries의 신청 행 ID로 삭제 요청을 연결한다. 현재 버튼은 표시용이며 빈 목록에는 표시하지 않는다. 출처는 사용자 브라우저 코멘트와 MyPageProductHistory.tsx 작업 트리다. Codex는 PC 1414px·모바일 375px 및 320px에서 위치, 크기, 상태 문구와의 간격, 체크박스와 상단 버튼의 부재를 확인했다. 체크박스가 있던 쪽의 상품정보 셀 시작 여백을 제거했다. PC 1414px·1200px와 모바일 375px에서 두 썸네일이 목록 시작선에 맞고 X 버튼이 오른쪽 끝에 놓이는 것을 확인했다. 빈 목록과 변경 파일의 ESLint·Prettier, TypeScript도 확인했다.

## 최근 본 상품의 전체삭제와 그리드 끝선 2026-11-27

최근 본 상품의 PC 일반 목록은 제목 헤더와 상품 그리드를 하나의 너비로 맞춘다. 상한은 260px 카드 세 열과 16px 열 간격 두 개를 합한 812px이며 좁은 폭에서는 카드와 제목 헤더가 함께 줄어든다. 기존의 고정 32px 헤더 오른쪽 여백을 이 규칙으로 대체한다. 출처는 사용자 브라우저 코멘트와 MyPageProductHistory.tsx 작업 트리다. Codex는 PC 1025px·1199px·1200px·1440px·1920px에서 버튼과 오른쪽 카드 끝선 차이가 0px임을 확인했다. 모바일 375px·1024px의 기존 배치, 빈 목록의 버튼 비활성화, 관심상품 PC 세 열을 함께 확인했다.

## 1:1 문의 선택 상품 변경

선택한 주문 정보 박스 안 하단에 상품 변경 버튼을 배치한다. PC는 우측 정렬, 모바일은 박스 안쪽 전체 너비를 사용한다. 출처는 `InquiryFormContent.tsx`다.

1:1 문의 파일 첨부 헤더의 파일 찾기 버튼은 PC·모바일 공통 Secondary Short를 사용한다. 출처는 `InquiryFormContent.tsx`다.
