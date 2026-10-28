---
type: Reference
title: 전체 단일 부모 컴포넌트 통합
description: 운영 참조에 따른 재귀 통합과 도메인 폴더 승격의 이동 목록 및 예외를 기록한다.
tags: [react, architecture, components, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-28T05:25:50+00:00'
source_revision: 247e0b473e2eeee3cfca8b205defbb4bf900eac6
working_tree_sources:
  - src/app/
  - src/components/
  - src/context/ShopShell.tsx
  - src/context/RoutePreview.tsx
  - src/types/component-contracts/
  - src/stories/route-previews/
  - tsconfig.json
  - scripts/okf-sync.mjs
  - tests/form-controls.test.mjs
  - .codex/skills/component-reusability/
---

# 전체 단일 부모 컴포넌트 통합

## 기준과 결과

2026-10-28 작업 트리에서 TypeScript 모듈 해석과 alias 심벌을 사용해 운영 부모를 조사했다. 원래 TSX 대상은 515개다. 단순 import 후보 365개를 재수출·타입·테스트 소비처 기준으로 보정한 최초 단일 부모는 361개다. 같은 모듈의 여러 렌더는 부모 하나이며 Storybook·테스트·type-test·타입 전용 사용은 운영 부모 수에서 제외한다. 재수출은 실제 구현 심벌의 소비처까지 추적한다. 조사 범위에는 런타임 dynamic import가 없었다.

연쇄 통합으로 **389개 TSX 파일을 삭제하고 50개 부모 모듈에 구현을 합쳤다**. 컴포넌트 함수와 스타일은 부모 모듈 최상위에 유지한다. 조사 후 남은 원래 대상은 126개로, 실제 다중 부모 94개, 경계 예외 2개, 운영 부모 없음 30개다. 새 미리보기 어댑터와 컨텍스트·타입 선언은 별도 인프라이며 운영 컴포넌트 후보 수에 넣지 않는다.

`src/components/features/{도메인}`의 남은 파일 **55개**를 `src/components/{도메인}`으로 승격했다. `common`은 그대로 공통 UI 계층이다. `@features/*` 호환 별칭도 `src/components/*`를 가리킨다. Storybook의 `src/stories/features`는 기존 탐색 제목과 스토리 범주를 유지하며 새 운영 경로를 import한다.

사이즈 가이드의 단일 라우트 client 패널은 최종적으로 `src/app/support/size-guide/_components/SizeGuidePanel.tsx`로 옮겨 서버 페이지 옆에서 경계를 유지한다. 도메인 승격 목록의 해당 파일도 이 최종 경로로 표시한다.

## 경계 예외

| 유지 파일                                                   | 운영 부모                             | 사유                                                                                                                                |
| ----------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/screen-index/_components/IaStructurePage.tsx`      | `src/app/screen-index/page.tsx`       | 서버 페이지에서 client 경계를 유지한다. IA는 metadata, 사이즈 가이드는 서버 진입점을 유지하며 client 전환을 상위로 전파하지 않는다. |
| `src/app/support/size-guide/_components/SizeGuidePanel.tsx` | `src/app/support/size-guide/page.tsx` | 서버 페이지에서 client 경계를 유지한다. IA는 metadata, 사이즈 가이드는 서버 진입점을 유지하며 client 전환을 상위로 전파하지 않는다. |

## 타입과 Storybook

일반 부모의 외부 스토리 소비 심벌만 필요한 named export로 유지했다. 페이지에는 Next 지원 export만 남겼으며 임의 props를 추가하지 않았다. 페이지로 이동한 구성의 기존 스토리는 `src/stories/route-previews`의 어댑터 13개를 통해 실제 페이지를 사용한다. `RoutePreviewProvider`가 기존 props·콜백을 전달하면 페이지가 모듈 최상위의 로컬 구성을 선택한다. 주입이 없는 운영 경로는 기존 화면과 상태 소유자가 그대로 렌더링된다. 부모 모듈은 Storybook 코드를 import하지 않는다.

외부 타입 참조와 미리보기 컴포넌트 props는 `src/types/component-contracts`의 선언 전용 모듈 21개에서 제공한다. 런타임 구현은 포함하지 않고 `import type`으로만 사용하며, 외부 타입 사용이 페이지나 부모를 거슬러 import하는 순환을 피한다. 구현 props를 변경할 때 이 선언 계약과 기존 스토리 타입 검사도 함께 갱신해야 한다.

## 이동·삭제 목록

각 행의 원래 TSX는 삭제했으며 최종 부모에 한 번만 구현을 보존한다. 최초 부모와 최종 부모를 구분해 연쇄 통합을 기록한다. 원래 경로에는 승격 전 `features` 경로도 포함된다.

| 삭제한 원래 파일                                                                          | 통합 시 부모                                                                              | 최종 부모                                                                       |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `src/components/common/atoms/Collapsible/Collapsible.tsx`                                 | `src/components/common/molecules/Disclosure/Disclosure.tsx`                               | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/atoms/Fieldset/Fieldset.tsx`                                       | `src/components/common/molecules/CatalogFilterSection/CatalogFilterSection.tsx`           | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/atoms/NotificationIcon/NotificationCount.tsx`                      | `src/components/common/atoms/NotificationIcon/NotificationIcon.tsx`                       | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/atoms/NotificationIcon/NotificationIcon.tsx`                       | `src/context/ShopShell.tsx`                                                               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/atoms/ProductGender/ProductGender.tsx`                             | `src/components/common/molecules/ProductDetails/ProductDetailsIdentity.tsx`               | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/atoms/RangeInput/RangeInput.tsx`                                   | `src/components/common/molecules/PriceRange/PriceRange.tsx`                               | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/atoms/RatingStars/RatingStarsControl.tsx`                          | `src/components/common/atoms/RatingStars/RatingStars.tsx`                                 | `src/components/common/atoms/RatingStars/RatingStars.tsx`                       |
| `src/components/common/atoms/ShareButton/ShareButton.tsx`                                 | `src/components/features/product/ProductDetailHeaderActions.tsx`                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/common/atoms/SocialIcon/SocialIcon.tsx`                                   | `src/components/common/organisms/Layout/SiteFooter/FooterSocialLinks.tsx`                 | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/atoms/Tag/Tag.tsx`                                                 | `src/components/common/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelHeader.tsx` | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/layouts/AppLayout/AppLayout.tsx`                                   | `src/context/ShopShell.tsx`                                                               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/layouts/BottomSheet/BottomSheetContent.tsx`                        | `src/components/common/layouts/BottomSheet/BottomSheet.tsx`                               | `src/components/common/layouts/BottomSheet/BottomSheet.tsx`                     |
| `src/components/common/layouts/BottomSheet/BottomSheetFooter.tsx`                         | `src/components/common/layouts/BottomSheet/BottomSheet.tsx`                               | `src/components/common/layouts/BottomSheet/BottomSheet.tsx`                     |
| `src/components/common/layouts/BottomSheet/BottomSheetHeader.tsx`                         | `src/components/common/layouts/BottomSheet/BottomSheet.tsx`                               | `src/components/common/layouts/BottomSheet/BottomSheet.tsx`                     |
| `src/components/common/layouts/BottomSheet/BottomSheetTitle.tsx`                          | `src/components/common/layouts/BottomSheet/BottomSheetHeader.tsx`                         | `src/components/common/layouts/BottomSheet/BottomSheet.tsx`                     |
| `src/components/common/layouts/ContentLayout/ContentHeader.tsx`                           | `src/components/common/layouts/ContentLayout/ContentLayout.tsx`                           | `src/components/common/layouts/ContentLayout/ContentLayout.tsx`                 |
| `src/components/common/layouts/PageFrame/PageFrame.tsx`                                   | `src/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`             | `src/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`   |
| `src/components/common/molecules/Carousel/CarouselScrollbar.tsx`                          | `src/components/common/molecules/Carousel/CarouselViewport.tsx`                           | `src/components/common/molecules/Carousel/CarouselViewport.tsx`                 |
| `src/components/common/molecules/CatalogFilterGroup/CatalogFilterGroup.tsx`               | `src/components/features/catalog/ProductListingFilterPanel.tsx`                           | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/molecules/CatalogFilterSection/CatalogFilterSection.tsx`           | `src/components/features/catalog/ProductListingPage.tsx`                                  | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/molecules/CatalogFilterSection/CatalogFilterTrigger.tsx`           | `src/components/common/molecules/CatalogFilterSection/CatalogFilterSection.tsx`           | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/molecules/ColorFilter/ColorFilter.tsx`                             | `src/components/features/catalog/ProductListingFilterPanel.tsx`                           | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/molecules/DataRows/DataRows.tsx`                                   | `src/components/common/organisms/Account/AccountDataList.tsx`                             | `src/components/common/organisms/Account/AccountDataList.tsx`                   |
| `src/components/common/molecules/Disclosure/Disclosure.tsx`                               | `src/components/features/catalog/product-listing/ProductSortDropdown.tsx`                 | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/molecules/Faq/FaqCategoryNav.tsx`                                  | `src/components/common/molecules/Faq/FaqControls.tsx`                                     | `src/app/support/faq/page.tsx`                                                  |
| `src/components/common/molecules/Faq/FaqControls.tsx`                                     | `src/app/support/faq/page.tsx`                                                            | `src/app/support/faq/page.tsx`                                                  |
| `src/components/common/molecules/Faq/FaqSearch.tsx`                                       | `src/components/common/molecules/Faq/FaqControls.tsx`                                     | `src/app/support/faq/page.tsx`                                                  |
| `src/components/common/molecules/FilterPillGroup/FilterPillGroup.tsx`                     | `src/components/features/catalog/ProductListingFilterPanel.tsx`                           | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/molecules/HomeCarouselSection/HomeCarouselRail.tsx`                | `src/components/common/molecules/HomeCarouselSection/HomeCarouselSection.tsx`             | `src/components/common/molecules/HomeCarouselSection/HomeCarouselSection.tsx`   |
| `src/components/common/molecules/MainSection/MainSectionHeader.tsx`                       | `src/components/common/molecules/MainSection/MainSection.tsx`                             | `src/components/common/molecules/MainSection/MainSection.tsx`                   |
| `src/components/common/molecules/MetricGrid/MetricGrid.tsx`                               | `src/components/common/organisms/Account/AccountMetricPanel.tsx`                          | `src/app/mypage/referral/page.tsx`                                              |
| `src/components/common/molecules/ModalDialog/ModalDialogFooter.tsx`                       | `src/components/common/molecules/ModalDialog/ModalDialog.tsx`                             | `src/components/common/molecules/ModalDialog/ModalDialog.tsx`                   |
| `src/components/common/molecules/ModalDialog/ModalDialogHeader.tsx`                       | `src/components/common/molecules/ModalDialog/ModalDialog.tsx`                             | `src/components/common/molecules/ModalDialog/ModalDialog.tsx`                   |
| `src/components/common/molecules/OrderProductSummary/OrderProductSummaryContent.tsx`      | `src/components/common/molecules/OrderProductSummary/OrderProductSummary.tsx`             | `src/components/common/molecules/OrderProductSummary/OrderProductSummary.tsx`   |
| `src/components/common/molecules/OrderProductSummary/OrderProductSummaryImage.tsx`        | `src/components/common/molecules/OrderProductSummary/OrderProductSummary.tsx`             | `src/components/common/molecules/OrderProductSummary/OrderProductSummary.tsx`   |
| `src/components/common/molecules/OrderStatusTracker/OrderStatusLink.tsx`                  | `src/components/common/molecules/OrderStatusTracker/OrderStatusTracker.tsx`               | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/common/molecules/OrderStatusTracker/OrderStatusTracker.tsx`               | `src/components/features/orders/OrdersListContent.tsx`                                    | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/common/molecules/PriceRange/PriceRange.tsx`                               | `src/components/features/catalog/ProductListingFilterPanel.tsx`                           | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/molecules/PriceRange/PriceRangeValue.tsx`                          | `src/components/common/molecules/PriceRange/PriceRange.tsx`                               | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/molecules/ProductActivity/ProductActivity.tsx`                     | `src/components/common/molecules/ProductDetails/ProductDetailsOptions.tsx`                | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductCard/ProductCardFooter.tsx`                       | `src/components/common/molecules/ProductCard/ProductCard.tsx`                             | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductCard/ProductCardHeader.tsx`                       | `src/components/common/molecules/ProductCard/ProductCard.tsx`                             | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductCard/ProductCardPreview.tsx`                      | `src/components/common/molecules/ProductCard/ProductCard.tsx`                             | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductDetails/ProductDetails.tsx`                       | `src/components/common/molecules/ProductCard/ProductCard.tsx`                             | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductDetails/ProductDetailsIdentity.tsx`               | `src/components/common/molecules/ProductDetails/ProductDetails.tsx`                       | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductDetails/ProductDetailsOptions.tsx`                | `src/components/common/molecules/ProductDetails/ProductDetails.tsx`                       | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductName/ProductName.tsx`                             | `src/components/common/molecules/ProductDetails/ProductDetailsIdentity.tsx`               | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductPrice/ProductPrice.tsx`                           | `src/components/common/molecules/ProductDetails/ProductDetailsIdentity.tsx`               | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductSpec/ProductSpec.tsx`                             | `src/components/common/molecules/ProductCard/ProductCardFooter.tsx`                       | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/ProductVariantSummary/ProductVariantSummary.tsx`         | `src/components/common/molecules/ProductDetails/ProductDetailsOptions.tsx`                | `src/components/common/molecules/ProductCard/ProductCard.tsx`                   |
| `src/components/common/molecules/PromotionCard/PromotionCard.tsx`                         | `src/components/features/catalog/ProductListingResults.tsx`                               | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/molecules/Signup/SignupProgress.tsx`                               | `src/components/features/signup/SignupLayout.tsx`                                         | `src/app/signup/page.tsx`                                                       |
| `src/components/common/organisms/Account/AccountMetricPanel.tsx`                          | `src/app/mypage/referral/page.tsx`                                                        | `src/app/mypage/referral/page.tsx`                                              |
| `src/components/common/organisms/Account/AlreadyRegisteredModal.tsx`                      | `src/app/signup/verify/phone/page.tsx`                                                    | `src/app/signup/verify/phone/page.tsx`                                          |
| `src/components/common/organisms/Account/LogoutDialog.tsx`                                | `src/app/mypage/page.tsx`                                                                 | `src/app/mypage/page.tsx`                                                       |
| `src/components/common/organisms/Account/MarketingConsentSummaryModal.tsx`                | `src/components/features/signup-registration/MarketingConsentSummaryModal.tsx`            | `src/app/signup/information/page.tsx`                                           |
| `src/components/common/organisms/Address/AddressField.tsx`                                | `src/components/common/organisms/Address/AddressFields.tsx`                               | `src/components/common/organisms/Address/AddressFields.tsx`                     |
| `src/components/common/organisms/Address/AddressSearchModal.tsx`                          | `src/components/common/organisms/Address/AddressFields.tsx`                               | `src/components/common/organisms/Address/AddressFields.tsx`                     |
| `src/components/common/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanel.tsx`       | `src/components/features/catalog/ProductListingFilterPanel.tsx`                           | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelBody.tsx`   | `src/components/common/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanel.tsx`       | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelHeader.tsx` | `src/components/common/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanel.tsx`       | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/organisms/Catalog/CatalogResults/CatalogResults.tsx`               | `src/components/features/catalog/ProductListingResults.tsx`                               | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/common/organisms/Faq/FaqAnswer.tsx`                                       | `src/components/common/organisms/Faq/FaqList.tsx`                                         | `src/app/support/faq/page.tsx`                                                  |
| `src/components/common/organisms/Faq/FaqEmptyState.tsx`                                   | `src/components/common/organisms/Faq/FaqList.tsx`                                         | `src/app/support/faq/page.tsx`                                                  |
| `src/components/common/organisms/Faq/FaqList.tsx`                                         | `src/app/support/faq/page.tsx`                                                            | `src/app/support/faq/page.tsx`                                                  |
| `src/components/common/organisms/Faq/FaqQuestion.tsx`                                     | `src/components/common/organisms/Faq/FaqList.tsx`                                         | `src/app/support/faq/page.tsx`                                                  |
| `src/components/common/organisms/Hero/Hero.tsx`                                           | `src/components/features/home/HomeHeroSection.tsx`                                        | `src/app/page.tsx`                                                              |
| `src/components/common/organisms/Hero/HeroCopy.tsx`                                       | `src/components/common/organisms/Hero/Hero.tsx`                                           | `src/app/page.tsx`                                                              |
| `src/components/common/organisms/Hero/HeroPagination.tsx`                                 | `src/components/common/organisms/Hero/Hero.tsx`                                           | `src/app/page.tsx`                                                              |
| `src/components/common/organisms/Hero/HeroSlide.tsx`                                      | `src/components/common/organisms/Hero/Hero.tsx`                                           | `src/app/page.tsx`                                                              |
| `src/components/common/organisms/InquiryBoard/InquiryBoard.tsx`                           | `src/components/features/product/ProductDetailInquiryContent.tsx`                         | `src/app/products/[id]/page.tsx`                                                |
| `src/components/common/organisms/InquiryBoard/InquiryBoardContent.tsx`                    | `src/components/common/organisms/InquiryBoard/InquiryBoard.tsx`                           | `src/app/products/[id]/page.tsx`                                                |
| `src/components/common/organisms/InquiryBoard/InquiryBoardHeader.tsx`                     | `src/components/common/organisms/InquiryBoard/InquiryBoard.tsx`                           | `src/app/products/[id]/page.tsx`                                                |
| `src/components/common/organisms/Layout/SiteFooter/FooterBrand.tsx`                       | `src/components/common/organisms/Layout/SiteFooter/FooterContent.tsx`                     | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/FooterBrandLogo.tsx`                   | `src/components/common/organisms/Layout/SiteFooter/FooterBrandSocial.tsx`                 | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/FooterBrandSocial.tsx`                 | `src/components/common/organisms/Layout/SiteFooter/FooterBrand.tsx`                       | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/FooterContent.tsx`                     | `src/components/common/organisms/Layout/SiteFooter/SiteFooter.tsx`                        | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/FooterLegalLinks.tsx`                  | `src/components/common/organisms/Layout/SiteFooter/FooterContent.tsx`                     | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/FooterLocaleSelectors.tsx`             | `src/components/common/organisms/Layout/SiteFooter/FooterBrand.tsx`                       | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/FooterNavigation.tsx`                  | `src/components/common/organisms/Layout/SiteFooter/FooterContent.tsx`                     | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/FooterNavigationLinks.tsx`             | `src/context/ShopShell.tsx`                                                               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/FooterNavigationWeb.tsx`               | `src/components/common/organisms/Layout/SiteFooter/FooterNavigation.tsx`                  | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/FooterSocialLinks.tsx`                 | `src/components/common/organisms/Layout/SiteFooter/FooterBrandSocial.tsx`                 | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteFooter/SiteFooter.tsx`                        | `src/components/common/layouts/AppLayout/AppLayout.tsx`                                   | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderAccount.tsx`                     | `src/components/common/organisms/Layout/SiteHeader/HeaderTools.tsx`                       | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderAuthLink.tsx`                    | `src/context/ShopShell.tsx`                                                               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderCartLink.tsx`                    | `src/components/common/organisms/Layout/SiteHeader/HeaderTools.tsx`                       | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderIconLink.tsx`                    | `src/context/ShopShell.tsx`                                                               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderLogo.tsx`                        | `src/components/common/organisms/Layout/SiteHeader/SiteHeaderContainer.tsx`               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderPromotionBanner.tsx`             | `src/components/common/organisms/Layout/SiteHeader/SiteHeader.tsx`                        | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderPromotionCarousel.tsx`           | `src/components/common/organisms/Layout/SiteHeader/HeaderPromotionBanner.tsx`             | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderPromotionContent.tsx`            | `src/components/common/organisms/Layout/SiteHeader/HeaderPromotionCarousel.tsx`           | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderSearch.tsx`                      | `src/components/common/organisms/Layout/SiteHeader/HeaderTools.tsx`                       | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/HeaderTools.tsx`                       | `src/components/common/organisms/Layout/SiteHeader/SiteHeaderContainer.tsx`               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/MegaMenuAD.tsx`                        | `src/context/ShopShell.tsx`                                                               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/MegaMenuContent.tsx`                   | `src/components/common/organisms/Layout/SiteHeader/MegaMenuPanel.tsx`                     | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/MegaMenuList.tsx`                      | `src/components/common/organisms/Layout/SiteHeader/MegaMenuContent.tsx`                   | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/MegaMenuPanel.tsx`                     | `src/components/common/organisms/Layout/SiteHeader/SiteHeader.tsx`                        | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/SiteHeader.tsx`                        | `src/components/common/layouts/AppLayout/AppLayout.tsx`                                   | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/SiteHeaderContainer.tsx`               | `src/components/common/organisms/Layout/SiteHeader/SiteHeader.tsx`                        | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/SiteHeaderContent.tsx`                 | `src/components/common/organisms/Layout/SiteHeader/SiteHeaderContainer.tsx`               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/SiteHeaderFrame.tsx`                   | `src/components/common/organisms/Layout/SiteHeader/SiteHeader.tsx`                        | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Layout/SiteHeader/SiteHeaderInner.tsx`                   | `src/components/common/organisms/Layout/SiteHeader/SiteHeaderContent.tsx`                 | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/MyPage/CouponCard.tsx`                                   | `src/components/common/organisms/MyPage/CouponHistorySection.tsx`                         | `src/app/mypage/coupons/page.tsx`                                               |
| `src/components/common/organisms/MyPage/CouponDetailsDialog.tsx`                          | `src/components/common/organisms/MyPage/CouponManager.tsx`                                | `src/app/mypage/coupons/page.tsx`                                               |
| `src/components/common/organisms/MyPage/CouponHistorySection.tsx`                         | `src/components/common/organisms/MyPage/CouponManager.tsx`                                | `src/app/mypage/coupons/page.tsx`                                               |
| `src/components/common/organisms/MyPage/CouponManager.tsx`                                | `src/app/mypage/coupons/page.tsx`                                                         | `src/app/mypage/coupons/page.tsx`                                               |
| `src/components/common/organisms/MyPage/CouponRegistrationDialog.tsx`                     | `src/components/common/organisms/MyPage/CouponManager.tsx`                                | `src/app/mypage/coupons/page.tsx`                                               |
| `src/components/common/organisms/MyPage/CouponRegistrationSection.tsx`                    | `src/components/common/organisms/MyPage/CouponManager.tsx`                                | `src/app/mypage/coupons/page.tsx`                                               |
| `src/components/common/organisms/MyPage/EmployeeCoupons.tsx`                              | `src/components/common/organisms/MyPage/CouponManager.tsx`                                | `src/app/mypage/coupons/page.tsx`                                               |
| `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawer.tsx`                    | `src/components/common/layouts/AppLayout/AppLayout.tsx`                                   | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerBackButton.tsx`          | `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerNavigation.tsx`          | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerBase.tsx`                | `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerNavigation.tsx`          | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerFrame.tsx`               | `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawer.tsx`                    | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerGroups.tsx`              | `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerNavigation.tsx`          | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerHeader.tsx`              | `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawer.tsx`                    | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerNavigation.tsx`          | `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawer.tsx`                    | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerShoppingLinks.tsx`       | `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerBase.tsx`                | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawerUtilityLinks.tsx`        | `src/components/common/organisms/Navigation/MenuDrawer/MenuDrawer.tsx`                    | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/OrderRecommendations/OrderRecommendationItem.tsx`        | `src/components/common/organisms/OrderRecommendations/OrderRecommendations.tsx`           | `src/components/common/organisms/OrderRecommendations/OrderRecommendations.tsx` |
| `src/components/common/organisms/Search/PopularSearches.tsx`                              | `src/components/common/organisms/Search/SearchSuggestions.tsx`                            | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Search/RecentSearchItem.tsx`                             | `src/components/common/organisms/Search/RecentSearches.tsx`                               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Search/RecentSearches.tsx`                               | `src/components/common/organisms/Search/SearchSuggestions.tsx`                            | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Search/RecommendedSearches.tsx`                          | `src/components/common/organisms/Search/SearchSuggestions.tsx`                            | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Search/SearchDialog.tsx`                                 | `src/components/common/organisms/Search/SearchOverlay.tsx`                                | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Search/SearchForm.tsx`                                   | `src/components/common/organisms/Search/SearchOverlay.tsx`                                | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Search/SearchKeywordButton.tsx`                          | `src/context/ShopShell.tsx`                                                               | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Search/SearchOverlay.tsx`                                | `src/components/common/organisms/Layout/SiteHeader/SiteHeader.tsx`                        | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Search/SearchSuggestions.tsx`                            | `src/components/common/organisms/Search/SearchOverlay.tsx`                                | `src/context/ShopShell.tsx`                                                     |
| `src/components/common/organisms/Signup/SignupBenefit.tsx`                                | `src/components/common/organisms/Signup/SignupMethodStep.tsx`                             | `src/app/signup/page.tsx`                                                       |
| `src/components/common/organisms/Signup/SignupMethodButton.tsx`                           | `src/components/common/organisms/Signup/SignupMethodStep.tsx`                             | `src/app/signup/page.tsx`                                                       |
| `src/components/common/organisms/Signup/SignupMethodStep.tsx`                             | `src/app/signup/page.tsx`                                                                 | `src/app/signup/page.tsx`                                                       |
| `src/components/common/organisms/StoreFinder/StoreMapPreview.tsx`                         | `src/components/common/organisms/StoreFinder/StoreResults.tsx`                            | `src/app/support/store/page.tsx`                                                |
| `src/components/common/organisms/StoreFinder/StoreResults.tsx`                            | `src/app/support/store/page.tsx`                                                          | `src/app/support/store/page.tsx`                                                |
| `src/components/common/organisms/Terms/TermsDialog.tsx`                                   | `src/components/features/signup-terms/SignupTermsDetail.tsx`                              | `src/app/signup/terms/page.tsx`                                                 |
| `src/components/features/account-locked/AccountLockedContent.tsx`                         | `src/app/login/account-locked/page.tsx`                                                   | `src/app/login/account-locked/page.tsx`                                         |
| `src/components/features/cart/CartContent.tsx`                                            | `src/app/cart/page.tsx`                                                                   | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartDialogs.tsx`                                            | `src/app/cart/page.tsx`                                                                   | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartEmptyState.tsx`                                         | `src/components/features/cart/CartContent.tsx`                                            | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartItemRow.tsx`                                            | `src/components/features/cart/CartProductList.tsx`                                        | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartLimitDialog.tsx`                                        | `src/components/features/cart/CartDialogs.tsx`                                            | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartOptionQuantity.tsx`                                     | `src/components/features/cart/CartOptionsContent.tsx`                                     | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartOptionsContent.tsx`                                     | `src/components/features/cart/CartOptionsDialog.tsx`                                      | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartOptionsDialog.tsx`                                      | `src/components/features/cart/CartDialogs.tsx`                                            | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartOrderActions.tsx`                                       | `src/components/features/cart/CartContent.tsx`                                            | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartProductList.tsx`                                        | `src/components/features/cart/CartProductSection.tsx`                                     | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartProductSection.tsx`                                     | `src/components/features/cart/CartContent.tsx`                                            | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartSelectionBar.tsx`                                       | `src/components/features/cart/CartProductSection.tsx`                                     | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartSupportContact.tsx`                                     | `src/components/features/cart/CartSupportInfo.tsx`                                        | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartSupportHours.tsx`                                       | `src/components/features/cart/CartSupportInfo.tsx`                                        | `src/app/cart/page.tsx`                                                         |
| `src/components/features/cart/CartSupportInfo.tsx`                                        | `src/components/features/cart/CartContent.tsx`                                            | `src/app/cart/page.tsx`                                                         |
| `src/components/features/catalog/ProductListingFilterPanel.tsx`                           | `src/components/features/catalog/ProductListingPage.tsx`                                  | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/features/catalog/ProductListingResults.tsx`                               | `src/components/features/catalog/product-listing/ProductListingContent.tsx`               | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/features/catalog/product-listing/ProductListTitle.tsx`                    | `src/components/features/catalog/product-listing/ProductListingLayout.tsx`                | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/features/catalog/product-listing/ProductListingContent.tsx`               | `src/components/features/catalog/product-listing/ProductListingLayout.tsx`                | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/features/catalog/product-listing/ProductListingLayout.tsx`                | `src/components/features/catalog/ProductListingPage.tsx`                                  | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/features/catalog/product-listing/ProductSortDropdown.tsx`                 | `src/components/features/catalog/product-listing/ProductListingLayout.tsx`                | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/features/catalog/product-listing/SearchListingLayout.tsx`                 | `src/components/features/catalog/product-listing/ProductListingLayout.tsx`                | `src/components/catalog/ProductListingPage.tsx`                                 |
| `src/components/features/checkout/CheckoutAddressFields.tsx`                              | `src/components/features/checkout/CheckoutShippingForm.tsx`                               | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutAgreement.tsx`                                  | `src/components/features/checkout/CheckoutContent.tsx`                                    | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutComplete.tsx`                                   | `src/components/features/checkout/CheckoutForm.tsx`                                       | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutCompleteHeader.tsx`                             | `src/components/features/checkout/CheckoutComplete.tsx`                                   | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutContent.tsx`                                    | `src/components/features/checkout/CheckoutForm.tsx`                                       | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutDeliveryMessageField.tsx`                       | `src/components/features/checkout/CheckoutDeliveryRequest.tsx`                            | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutDeliveryRequest.tsx`                            | `src/components/features/checkout/CheckoutShipping.tsx`                                   | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutDeliveryRequestSelect.tsx`                      | `src/components/features/checkout/CheckoutDeliveryRequest.tsx`                            | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutDiscountSummary.tsx`                            | `src/components/features/checkout/CheckoutSummary.tsx`                                    | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutForm.tsx`                                       | `src/app/checkout/page.tsx`                                                               | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutLayout.tsx`                                     | `src/app/checkout/page.tsx`                                                               | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutPayment.tsx`                                    | `src/components/features/checkout/CheckoutContent.tsx`                                    | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutPaymentMark.tsx`                                | `src/components/features/checkout/CheckoutPaymentMethods.tsx`                             | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutPaymentMethodNotice.tsx`                        | `src/components/features/checkout/CheckoutPayment.tsx`                                    | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutPaymentMethods.tsx`                             | `src/components/features/checkout/CheckoutPayment.tsx`                                    | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutPaymentNotice.tsx`                              | `src/components/features/checkout/CheckoutContent.tsx`                                    | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutProductList.tsx`                                | `src/components/features/checkout/CheckoutSummary.tsx`                                    | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutRecipientFields.tsx`                            | `src/components/features/checkout/CheckoutShippingForm.tsx`                               | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutSavedAddress.tsx`                               | `src/components/features/checkout/CheckoutShipping.tsx`                                   | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutShipping.tsx`                                   | `src/components/features/checkout/CheckoutContent.tsx`                                    | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutShippingForm.tsx`                               | `src/components/features/checkout/CheckoutShipping.tsx`                                   | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/checkout/CheckoutSummary.tsx`                                    | `src/components/features/checkout/CheckoutContent.tsx`                                    | `src/app/checkout/page.tsx`                                                     |
| `src/components/features/find-account/FindAccountCodeFields.tsx`                          | `src/components/features/find-account/FindAccountContent.tsx`                             | `src/app/login/find-account/page.tsx`                                           |
| `src/components/features/find-account/FindAccountContent.tsx`                             | `src/app/login/find-account/page.tsx`                                                     | `src/app/login/find-account/page.tsx`                                           |
| `src/components/features/find-account/FindAccountIdentityFields.tsx`                      | `src/components/features/find-account/FindAccountContent.tsx`                             | `src/app/login/find-account/page.tsx`                                           |
| `src/components/features/find-account/IdConfirmationModal.tsx`                            | `src/app/login/find-account/page.tsx`                                                     | `src/app/login/find-account/page.tsx`                                           |
| `src/components/features/find-account/PasswordResetCompleteModal.tsx`                     | `src/app/login/find-account/password-reset/page.tsx`                                      | `src/app/login/find-account/password-reset/page.tsx`                            |
| `src/components/features/find-account/PasswordResetContent.tsx`                           | `src/app/login/find-account/password-reset/page.tsx`                                      | `src/app/login/find-account/password-reset/page.tsx`                            |
| `src/components/features/find-account/PasswordResetField.tsx`                             | `src/components/features/find-account/PasswordResetContent.tsx`                           | `src/app/login/find-account/password-reset/page.tsx`                            |
| `src/components/features/home/HomeBestSellerSection.tsx`                                  | `src/app/page.tsx`                                                                        | `src/app/page.tsx`                                                              |
| `src/components/features/home/HomeCategorySection.tsx`                                    | `src/app/page.tsx`                                                                        | `src/app/page.tsx`                                                              |
| `src/components/features/home/HomeExploreSection.tsx`                                     | `src/app/page.tsx`                                                                        | `src/app/page.tsx`                                                              |
| `src/components/features/home/HomeHeroSection.tsx`                                        | `src/app/page.tsx`                                                                        | `src/app/page.tsx`                                                              |
| `src/components/features/home/HomeLayout.tsx`                                             | `src/app/page.tsx`                                                                        | `src/app/page.tsx`                                                              |
| `src/components/features/home/HomeShoeFinderSection.tsx`                                  | `src/app/page.tsx`                                                                        | `src/app/page.tsx`                                                              |
| `src/components/features/identity-verification/IdentityVerificationContent.tsx`           | `src/app/signup/verify/page.tsx`                                                          | `src/app/signup/verify/page.tsx`                                                |
| `src/components/features/identity-verification/VerificationMethodCard.tsx`                | `src/components/features/identity-verification/IdentityVerificationContent.tsx`           | `src/app/signup/verify/page.tsx`                                                |
| `src/components/features/locales/LocaleCountryList.tsx`                                   | `src/components/features/locales/LocaleRegionSection.tsx`                                 | `src/app/locales/page.tsx`                                                      |
| `src/components/features/locales/LocaleRegionHeading.tsx`                                 | `src/components/features/locales/LocaleRegionSection.tsx`                                 | `src/app/locales/page.tsx`                                                      |
| `src/components/features/locales/LocaleRegionSection.tsx`                                 | `src/app/locales/page.tsx`                                                                | `src/app/locales/page.tsx`                                                      |
| `src/components/features/locales/LocalesHeading.tsx`                                      | `src/components/features/locales/LocalesLayout.tsx`                                       | `src/app/locales/page.tsx`                                                      |
| `src/components/features/locales/LocalesLayout.tsx`                                       | `src/app/locales/page.tsx`                                                                | `src/app/locales/page.tsx`                                                      |
| `src/components/features/login/LoginActions.tsx`                                          | `src/components/features/login/LoginForm.tsx`                                             | `src/app/login/page.tsx`                                                        |
| `src/components/features/login/LoginContent.tsx`                                          | `src/app/login/page.tsx`                                                                  | `src/app/login/page.tsx`                                                        |
| `src/components/features/login/LoginForm.tsx`                                             | `src/components/features/login/LoginContent.tsx`                                          | `src/app/login/page.tsx`                                                        |
| `src/components/features/login/LoginLayout.tsx`                                           | `src/components/features/login/LoginContent.tsx`                                          | `src/app/login/page.tsx`                                                        |
| `src/components/features/login/LoginMembership.tsx`                                       | `src/components/features/login/LoginContent.tsx`                                          | `src/app/login/page.tsx`                                                        |
| `src/components/features/login/RememberIdHelp.tsx`                                        | `src/components/features/login/LoginForm.tsx`                                             | `src/app/login/page.tsx`                                                        |
| `src/components/features/mypage/AddressEditor.tsx`                                        | `src/app/mypage/addresses/page.tsx`                                                       | `src/app/mypage/addresses/page.tsx`                                             |
| `src/components/features/mypage/AddressList.tsx`                                          | `src/app/mypage/addresses/page.tsx`                                                       | `src/app/mypage/addresses/page.tsx`                                             |
| `src/components/features/mypage/MyPageAddressDeleteDialog.tsx`                            | `src/app/mypage/addresses/page.tsx`                                                       | `src/app/mypage/addresses/page.tsx`                                             |
| `src/components/features/mypage/MyPageBenefitItem.tsx`                                    | `src/components/features/mypage/MyPageBenefits.tsx`                                       | `src/app/mypage/page.tsx`                                                       |
| `src/components/features/mypage/MyPageBenefits.tsx`                                       | `src/components/features/mypage/MyPageOverviewProfile.tsx`                                | `src/app/mypage/page.tsx`                                                       |
| `src/components/features/mypage/MyPageBreadcrumbs.tsx`                                    | `src/components/features/mypage/MyPageFrame.tsx`                                          | `src/components/mypage/MyPageFrame.tsx`                                         |
| `src/components/features/mypage/MyPageMembership.tsx`                                     | `src/components/features/mypage/MyPageOverviewProfile.tsx`                                | `src/app/mypage/page.tsx`                                                       |
| `src/components/features/mypage/MyPageMenuItem.tsx`                                       | `src/components/features/mypage/MyPageMenuSection.tsx`                                    | `src/app/mypage/page.tsx`                                                       |
| `src/components/features/mypage/MyPageMenuSection.tsx`                                    | `src/app/mypage/page.tsx`                                                                 | `src/app/mypage/page.tsx`                                                       |
| `src/components/features/mypage/MyPageOrderTile.tsx`                                      | `src/components/features/mypage/MyPageRecentOrders.tsx`                                   | `src/app/mypage/page.tsx`                                                       |
| `src/components/features/mypage/MyPageOverviewProfile.tsx`                                | `src/app/mypage/page.tsx`                                                                 | `src/app/mypage/page.tsx`                                                       |
| `src/components/features/mypage/MyPageProductHistoryGrid.tsx`                             | `src/components/features/mypage/MyPageProductHistory.tsx`                                 | `src/components/mypage/MyPageProductHistory.tsx`                                |
| `src/components/features/mypage/MyPageProductHistoryHeading.tsx`                          | `src/components/features/mypage/MyPageProductHistory.tsx`                                 | `src/components/mypage/MyPageProductHistory.tsx`                                |
| `src/components/features/mypage/MyPageProductHistoryNote.tsx`                             | `src/components/features/mypage/MyPageProductHistory.tsx`                                 | `src/components/mypage/MyPageProductHistory.tsx`                                |
| `src/components/features/mypage/MyPageRecentOrders.tsx`                                   | `src/app/mypage/page.tsx`                                                                 | `src/app/mypage/page.tsx`                                                       |
| `src/components/features/mypage/MyPageRestockCancelDialog.tsx`                            | `src/components/features/mypage/MyPageProductHistory.tsx`                                 | `src/components/mypage/MyPageProductHistory.tsx`                                |
| `src/components/features/mypage/MyPageRestockList.tsx`                                    | `src/components/features/mypage/MyPageProductHistory.tsx`                                 | `src/components/mypage/MyPageProductHistory.tsx`                                |
| `src/components/features/mypage/MyPageReviewDialog.tsx`                                   | `src/app/mypage/reviews/page.tsx`                                                         | `src/app/mypage/reviews/page.tsx`                                               |
| `src/components/features/mypage/MyPageWithdrawalCompleteDialog.tsx`                       | `src/app/mypage/profile/page.tsx`                                                         | `src/app/mypage/profile/page.tsx`                                               |
| `src/components/features/mypage/MyPageWithdrawalDialog.tsx`                               | `src/app/mypage/profile/page.tsx`                                                         | `src/app/mypage/profile/page.tsx`                                               |
| `src/components/features/mypage/ProfileEditDialogs.tsx`                                   | `src/app/mypage/profile/page.tsx`                                                         | `src/app/mypage/profile/page.tsx`                                               |
| `src/components/features/mypage/ProfileEditForm.tsx`                                      | `src/app/mypage/profile/page.tsx`                                                         | `src/app/mypage/profile/page.tsx`                                               |
| `src/components/features/mypage/ProfileField.tsx`                                         | `src/app/mypage/profile/page.tsx`                                                         | `src/app/mypage/profile/page.tsx`                                               |
| `src/components/features/mypage/ProfilePasswordDialog.tsx`                                | `src/app/mypage/profile/page.tsx`                                                         | `src/app/mypage/profile/page.tsx`                                               |
| `src/components/features/mypage/ProfilePhoneVerification.tsx`                             | `src/components/features/mypage/ProfileEditForm.tsx`                                      | `src/app/mypage/profile/page.tsx`                                               |
| `src/components/features/mypage/ProfileReadView.tsx`                                      | `src/app/mypage/profile/page.tsx`                                                         | `src/app/mypage/profile/page.tsx`                                               |
| `src/components/features/mypage/reviews/MyPageReviewCount.tsx`                            | `src/components/features/mypage/reviews/MyPageReviewToolbar.tsx`                          | `src/app/mypage/reviews/page.tsx`                                               |
| `src/components/features/mypage/reviews/MyPageReviewItem.tsx`                             | `src/components/features/mypage/reviews/MyPageReviewList.tsx`                             | `src/app/mypage/reviews/page.tsx`                                               |
| `src/components/features/mypage/reviews/MyPageReviewList.tsx`                             | `src/components/features/mypage/reviews/MyPageReviewsContent.tsx`                         | `src/app/mypage/reviews/page.tsx`                                               |
| `src/components/features/mypage/reviews/MyPageReviewLoadMore.tsx`                         | `src/components/features/mypage/reviews/MyPageReviewsContent.tsx`                         | `src/app/mypage/reviews/page.tsx`                                               |
| `src/components/features/mypage/reviews/MyPageReviewSort.tsx`                             | `src/components/features/mypage/reviews/MyPageReviewToolbar.tsx`                          | `src/app/mypage/reviews/page.tsx`                                               |
| `src/components/features/mypage/reviews/MyPageReviewTabs.tsx`                             | `src/components/features/mypage/reviews/MyPageReviewsContent.tsx`                         | `src/app/mypage/reviews/page.tsx`                                               |
| `src/components/features/mypage/reviews/MyPageReviewToolbar.tsx`                          | `src/components/features/mypage/reviews/MyPageReviewsContent.tsx`                         | `src/app/mypage/reviews/page.tsx`                                               |
| `src/components/features/mypage/reviews/MyPageReviewsContent.tsx`                         | `src/app/mypage/reviews/page.tsx`                                                         | `src/app/mypage/reviews/page.tsx`                                               |
| `src/components/features/notices/NoticeHeading.tsx`                                       | `src/components/features/notices/NoticesList.tsx`                                         | `src/app/support/notices/page.tsx`                                              |
| `src/components/features/notices/NoticesList.tsx`                                         | `src/app/support/notices/page.tsx`                                                        | `src/app/support/notices/page.tsx`                                              |
| `src/components/features/orders/ClaimAmountBreakdown.tsx`                                 | `src/components/features/orders/ClaimAmountSummary.tsx`                                   | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/ClaimAmountSummary.tsx`                                   | `src/components/features/orders/OrderClaimSheet.tsx`                                      | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/ClaimInstructions.tsx`                                    | `src/components/features/orders/OrderClaimSheet.tsx`                                      | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/ClaimProductChoice.tsx`                                   | `src/components/features/orders/ClaimProductSelection.tsx`                                | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/ClaimProductQuantity.tsx`                                 | `src/components/features/orders/ClaimProductSelection.tsx`                                | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/ClaimProductSelection.tsx`                                | `src/components/features/orders/OrderClaimSheet.tsx`                                      | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/ClaimReasonFields.tsx`                                    | `src/components/features/orders/OrderClaimSheet.tsx`                                      | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderCard.tsx`                                            | `src/components/features/orders/OrdersListContent.tsx`                                    | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderCardHeader.tsx`                                      | `src/components/features/orders/OrdersRoute.tsx`                                          | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderClaimDetail.tsx`                                     | `src/components/features/orders/OrdersContent.tsx`                                        | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderClaimGroup.tsx`                                      | `src/components/features/orders/OrdersRoute.tsx`                                          | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderClaimSheet.tsx`                                      | `src/components/features/orders/OrdersPage.tsx`                                           | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderClaimStatus.tsx`                                     | `src/components/features/orders/OrderClaimDetail.tsx`                                     | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderDeliveryStatus.tsx`                                  | `src/components/features/orders/OrderCard.tsx`                                            | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderDetail.tsx`                                          | `src/components/features/orders/OrdersContent.tsx`                                        | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderHistoryProduct.tsx`                                  | `src/components/features/orders/OrdersRoute.tsx`                                          | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderInformationSection.tsx`                              | `src/components/features/orders/OrdersRoute.tsx`                                          | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderItemActions.tsx`                                     | `src/components/features/orders/OrderCard.tsx`                                            | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderTrackingDialog.tsx`                                  | `src/components/features/orders/OrdersPage.tsx`                                           | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrderTrackingHistory.tsx`                                 | `src/components/features/orders/OrderTrackingDialog.tsx`                                  | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrdersContent.tsx`                                        | `src/components/features/orders/OrdersPage.tsx`                                           | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrdersDateRange.tsx`                                      | `src/components/features/orders/OrdersFilters.tsx`                                        | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrdersFilters.tsx`                                        | `src/components/features/orders/OrdersListContent.tsx`                                    | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrdersLayout.tsx`                                         | `src/components/features/orders/OrdersContent.tsx`                                        | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrdersListContent.tsx`                                    | `src/components/features/orders/OrdersContent.tsx`                                        | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/orders/OrdersPage.tsx`                                           | `src/components/features/orders/OrdersRoute.tsx`                                          | `src/components/orders/OrdersRoute.tsx`                                         |
| `src/components/features/phone-verification/PhoneInformationFields.tsx`                   | `src/components/features/phone-verification/PhoneVerificationForm.tsx`                    | `src/components/phone-verification/PhoneVerificationContent.tsx`                |
| `src/components/features/phone-verification/PhoneVerificationAgreements.tsx`              | `src/components/features/phone-verification/PhoneVerificationContent.tsx`                 | `src/components/phone-verification/PhoneVerificationContent.tsx`                |
| `src/components/features/phone-verification/PhoneVerificationDetailDialog.tsx`            | `src/components/features/phone-verification/PhoneVerificationDialogs.tsx`                 | `src/components/phone-verification/PhoneVerificationContent.tsx`                |
| `src/components/features/phone-verification/PhoneVerificationDialogs.tsx`                 | `src/components/features/phone-verification/PhoneVerificationContent.tsx`                 | `src/components/phone-verification/PhoneVerificationContent.tsx`                |
| `src/components/features/phone-verification/PhoneVerificationForm.tsx`                    | `src/components/features/phone-verification/PhoneVerificationContent.tsx`                 | `src/components/phone-verification/PhoneVerificationContent.tsx`                |
| `src/components/features/phone-verification/VerificationCodeFields.tsx`                   | `src/components/features/phone-verification/PhoneVerificationForm.tsx`                    | `src/components/phone-verification/PhoneVerificationContent.tsx`                |
| `src/components/features/product/ProductAfterSalesContacts.tsx`                           | `src/components/features/product/ProductDetailAfterSalesContent.tsx`                      | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductAfterSalesProcess.tsx`                            | `src/components/features/product/ProductDetailAfterSalesContent.tsx`                      | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductAfterSalesQuestions.tsx`                          | `src/components/features/product/ProductDetailAfterSalesContent.tsx`                      | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductColorSelector.tsx`                                | `src/components/features/product/ProductVariantSelectors.tsx`                             | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailAfterSalesContent.tsx`                      | `src/components/features/product/ProductDetailSupport.tsx`                                | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailBody.tsx`                                   | `src/components/features/product/ProductDetailLayout.tsx`                                 | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailContent.tsx`                                | `src/components/features/product/ProductDetailPanel.tsx`                                  | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailDeliveryContent.tsx`                        | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailDeliverySection.tsx`                        | `src/components/features/product/ProductDetailDeliveryContent.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailDeliverySupport.tsx`                        | `src/components/features/product/ProductDetailDeliveryContent.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailEditorial.tsx`                              | `src/components/features/product/ProductDetailSections.tsx`                               | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailFooter.tsx`                                 | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailGallery.tsx`                                | `src/components/features/product/ProductDetailMedia.tsx`                                  | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailGrid.tsx`                                   | `src/components/features/product/ProductDetailBody.tsx`                                   | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailHeader.tsx`                                 | `src/components/features/product/ProductDetailPanel.tsx`                                  | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailHeaderActions.tsx`                          | `src/components/features/product/ProductDetailHeader.tsx`                                 | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailHeaderMeta.tsx`                             | `src/components/features/product/ProductDetailHeader.tsx`                                 | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailHeaderTitle.tsx`                            | `src/components/features/product/ProductDetailHeader.tsx`                                 | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailImage.tsx`                                  | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailImageViewer.tsx`                            | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailInquiryContent.tsx`                         | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailLayout.tsx`                                 | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailMedia.tsx`                                  | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailNavigation.tsx`                             | `src/components/features/product/ProductDetailScrollSpy.tsx`                              | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailNoticeTable.tsx`                            | `src/components/features/product/ProductDetailSupportSections.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailPanel.tsx`                                  | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailPlaceholder.tsx`                            | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailRecommend.tsx`                              | `src/components/features/product/ProductDetailRecommendations.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailRecommendations.tsx`                        | `src/components/features/product/ProductDetailFooter.tsx`                                 | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailReturnGuide.tsx`                            | `src/components/features/product/ProductDetailDeliveryContent.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailReturnPrecautions.tsx`                      | `src/components/features/product/ProductDetailDeliveryContent.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailReviews.tsx`                                | `src/components/features/product/ProductDetailSections.tsx`                               | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailScrollSpy.tsx`                              | `src/components/features/product/ProductDetailSections.tsx`                               | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailSections.tsx`                               | `src/components/features/product/ProductDetailMedia.tsx`                                  | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailShippingGuide.tsx`                          | `src/components/features/product/ProductDetailDeliveryContent.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailSpecificationList.tsx`                      | `src/components/features/product/ProductTechSpecs.tsx`                                    | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailSupport.tsx`                                | `src/components/features/product/ProductDetailSupportRegion.tsx`                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailSupportRegion.tsx`                          | `src/components/features/product/ProductDetailPanel.tsx`                                  | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailSupportSections.tsx`                        | `src/components/features/product/ProductDetailSections.tsx`                               | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductDetailViewerGallery.tsx`                          | `src/components/features/product/ProductDetailImageViewer.tsx`                            | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductInformation.tsx`                                  | `src/components/features/product/ProductDetailContent.tsx`                                | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductInquiryLink.tsx`                                  | `src/components/features/product/ProductDetailInquiryContent.tsx`                         | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductPurchaseActions.tsx`                              | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductSelectedOptions.tsx`                              | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductSizeSelector.tsx`                                 | `src/components/features/product/ProductVariantSelectors.tsx`                             | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductSpecificationHelp.tsx`                            | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductSupportContact.tsx`                               | `src/components/features/product/ProductDetailDeliverySupport.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductSupportLink.tsx`                                  | `src/components/features/product/ProductDetailDeliverySupport.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductSupportTextLink.tsx`                              | `src/components/features/product/ProductDetailDeliveryContent.tsx`                        | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductTechSpecs.tsx`                                    | `src/components/features/product/ProductDetailSections.tsx`                               | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductTechnicalScale.tsx`                               | `src/components/features/product/ProductTechSpecs.tsx`                                    | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductTechnicalScaleBar.tsx`                            | `src/components/features/product/ProductTechnicalScale.tsx`                               | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/product/ProductVariantSelectors.tsx`                             | `src/app/products/[id]/page.tsx`                                                          | `src/app/products/[id]/page.tsx`                                                |
| `src/components/features/run-club/RunClubApplicationNotice.tsx`                           | `src/app/running/run-club/[sessionId]/page.tsx`                                           | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubApplyButton.tsx`                                 | `src/app/running/run-club/[sessionId]/page.tsx`                                           | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubDetailLayout.tsx`                                | `src/app/running/run-club/[sessionId]/page.tsx`                                           | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubEmptyState.tsx`                                  | `src/components/features/run-club/RunClubResults.tsx`                                     | `src/components/run-club/RunClubPage.tsx`                                       |
| `src/components/features/run-club/RunClubFacts.tsx`                                       | `src/app/running/run-club/[sessionId]/page.tsx`                                           | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubFilters.tsx`                                     | `src/components/features/run-club/RunClubHeader.tsx`                                      | `src/components/run-club/RunClubPage.tsx`                                       |
| `src/components/features/run-club/RunClubHeader.tsx`                                      | `src/components/features/run-club/RunClubPage.tsx`                                        | `src/components/run-club/RunClubPage.tsx`                                       |
| `src/components/features/run-club/RunClubHistoryLink.tsx`                                 | `src/components/features/run-club/RunClubPage.tsx`                                        | `src/components/run-club/RunClubPage.tsx`                                       |
| `src/components/features/run-club/RunClubLayout.tsx`                                      | `src/components/features/run-club/RunClubPage.tsx`                                        | `src/components/run-club/RunClubPage.tsx`                                       |
| `src/components/features/run-club/RunClubRecommendations.tsx`                             | `src/app/running/run-club/[sessionId]/page.tsx`                                           | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubResults.tsx`                                     | `src/components/features/run-club/RunClubPage.tsx`                                        | `src/components/run-club/RunClubPage.tsx`                                       |
| `src/components/features/run-club/RunClubSessionCard.tsx`                                 | `src/components/features/run-club/RunClubResults.tsx`                                     | `src/components/run-club/RunClubPage.tsx`                                       |
| `src/components/features/run-club/RunClubSessionCardContent.tsx`                          | `src/components/features/run-club/RunClubSessionCard.tsx`                                 | `src/components/run-club/RunClubPage.tsx`                                       |
| `src/components/features/run-club/RunClubSessionCardImage.tsx`                            | `src/components/features/run-club/RunClubSessionCard.tsx`                                 | `src/components/run-club/RunClubPage.tsx`                                       |
| `src/components/features/run-club/RunClubSessionGuide.tsx`                                | `src/app/running/run-club/[sessionId]/page.tsx`                                           | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubSessionGuideContent.tsx`                         | `src/components/features/run-club/RunClubSessionGuide.tsx`                                | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubSessionHero.tsx`                                 | `src/app/running/run-club/[sessionId]/page.tsx`                                           | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubSessionImage.tsx`                                | `src/app/running/run-club/[sessionId]/page.tsx`                                           | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubSessionNotes.tsx`                                | `src/app/running/run-club/[sessionId]/page.tsx`                                           | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/run-club/RunClubSessionPoster.tsx`                               | `src/components/features/run-club/RunClubSessionGuide.tsx`                                | `src/app/running/run-club/[sessionId]/page.tsx`                                 |
| `src/components/features/signup-registration/MarketingConsentSummaryModal.tsx`            | `src/app/signup/information/page.tsx`                                                     | `src/app/signup/information/page.tsx`                                           |
| `src/components/features/signup-registration/RegistrationAdditionalFields.tsx`            | `src/components/features/signup-registration/RegistrationContent.tsx`                     | `src/app/signup/information/page.tsx`                                           |
| `src/components/features/signup-registration/RegistrationAddressFields.tsx`               | `src/components/features/signup-registration/RegistrationContent.tsx`                     | `src/app/signup/information/page.tsx`                                           |
| `src/components/features/signup-registration/RegistrationContent.tsx`                     | `src/app/signup/information/page.tsx`                                                     | `src/app/signup/information/page.tsx`                                           |
| `src/components/features/signup-registration/RegistrationEmailFields.tsx`                 | `src/components/features/signup-registration/RegistrationContent.tsx`                     | `src/app/signup/information/page.tsx`                                           |
| `src/components/features/signup-registration/RegistrationField.tsx`                       | `src/app/signup/information/page.tsx`                                                     | `src/app/signup/information/page.tsx`                                           |
| `src/components/features/signup-registration/RegistrationIdFields.tsx`                    | `src/components/features/signup-registration/RegistrationContent.tsx`                     | `src/app/signup/information/page.tsx`                                           |
| `src/components/features/signup-registration/RegistrationPersonalFields.tsx`              | `src/components/features/signup-registration/RegistrationContent.tsx`                     | `src/app/signup/information/page.tsx`                                           |
| `src/components/features/signup-registration/RegistrationPreferenceRow.tsx`               | `src/components/features/signup-registration/RegistrationAdditionalFields.tsx`            | `src/app/signup/information/page.tsx`                                           |
| `src/components/features/signup-terms/PreviousTermsPicker.tsx`                            | `src/components/features/signup-terms/SignupTermsContent.tsx`                             | `src/app/signup/terms/page.tsx`                                                 |
| `src/components/features/signup-terms/SignupTermsAgreementList.tsx`                       | `src/app/signup/terms/page.tsx`                                                           | `src/app/signup/terms/page.tsx`                                                 |
| `src/components/features/signup-terms/SignupTermsContent.tsx`                             | `src/app/signup/terms/page.tsx`                                                           | `src/app/signup/terms/page.tsx`                                                 |
| `src/components/features/signup-terms/SignupTermsDetail.tsx`                              | `src/components/features/signup-terms/SignupTermsContent.tsx`                             | `src/app/signup/terms/page.tsx`                                                 |
| `src/components/features/signup/SignupLayout.tsx`                                         | `src/app/signup/page.tsx`                                                                 | `src/app/signup/page.tsx`                                                       |
| `src/components/features/size-guide/SizeGuideChart.tsx`                                   | `src/components/features/size-guide/SizeGuidePanel.tsx`                                   | `src/app/support/size-guide/_components/SizeGuidePanel.tsx`                     |
| `src/components/features/size-guide/SizeGuideChoiceGroup.tsx`                             | `src/components/features/size-guide/SizeGuidePanel.tsx`                                   | `src/app/support/size-guide/_components/SizeGuidePanel.tsx`                     |
| `src/components/features/size-guide/SizeGuideMeasurementImage.tsx`                        | `src/components/features/size-guide/SizeGuideMeasurements.tsx`                            | `src/app/support/size-guide/_components/SizeGuidePanel.tsx`                     |
| `src/components/features/size-guide/SizeGuideMeasurementInstructions.tsx`                 | `src/components/features/size-guide/SizeGuideMeasurements.tsx`                            | `src/app/support/size-guide/_components/SizeGuidePanel.tsx`                     |
| `src/components/features/size-guide/SizeGuideMeasurementMethod.tsx`                       | `src/components/features/size-guide/SizeGuideMeasurementInstructions.tsx`                 | `src/app/support/size-guide/_components/SizeGuidePanel.tsx`                     |
| `src/components/features/size-guide/SizeGuideMeasurements.tsx`                            | `src/components/features/size-guide/SizeGuidePanel.tsx`                                   | `src/app/support/size-guide/_components/SizeGuidePanel.tsx`                     |
| `src/components/features/support/InquiryAnswer.tsx`                                       | `src/components/features/support/InquiryListItem.tsx`                                     | `src/app/support/inquiries/page.tsx`                                            |
| `src/components/features/support/InquiryAttachmentHelp.tsx`                               | `src/components/features/support/InquiryAttachments.tsx`                                  | `src/app/support/inquiries/new/page.tsx`                                        |
| `src/components/features/support/InquiryAttachmentList.tsx`                               | `src/components/features/support/InquiryAttachments.tsx`                                  | `src/app/support/inquiries/new/page.tsx`                                        |
| `src/components/features/support/InquiryAttachmentPreview.tsx`                            | `src/components/features/support/InquiryReadAttachments.tsx`                              | `src/app/support/inquiries/page.tsx`                                            |
| `src/components/features/support/InquiryAttachments.tsx`                                  | `src/app/support/inquiries/new/page.tsx`                                                  | `src/app/support/inquiries/new/page.tsx`                                        |
| `src/components/features/support/InquiryCategoryFields.tsx`                               | `src/app/support/inquiries/new/page.tsx`                                                  | `src/app/support/inquiries/new/page.tsx`                                        |
| `src/components/features/support/InquiryCustomerInfo.tsx`                                 | `src/app/support/inquiries/new/page.tsx`                                                  | `src/app/support/inquiries/new/page.tsx`                                        |
| `src/components/features/support/InquiryEmptyState.tsx`                                   | `src/app/support/inquiries/page.tsx`                                                      | `src/app/support/inquiries/page.tsx`                                            |
| `src/components/features/support/InquiryFormActions.tsx`                                  | `src/app/support/inquiries/new/page.tsx`                                                  | `src/app/support/inquiries/new/page.tsx`                                        |
| `src/components/features/support/InquiryListItem.tsx`                                     | `src/app/support/inquiries/page.tsx`                                                      | `src/app/support/inquiries/page.tsx`                                            |
| `src/components/features/support/InquiryMessageFields.tsx`                                | `src/app/support/inquiries/new/page.tsx`                                                  | `src/app/support/inquiries/new/page.tsx`                                        |
| `src/components/features/support/InquiryOrderProducts.tsx`                                | `src/app/support/inquiries/new/page.tsx`                                                  | `src/app/support/inquiries/new/page.tsx`                                        |
| `src/components/features/support/InquiryQuestion.tsx`                                     | `src/components/features/support/InquiryListItem.tsx`                                     | `src/app/support/inquiries/page.tsx`                                            |
| `src/components/features/support/InquiryReadAttachments.tsx`                              | `src/components/features/support/InquiryListItem.tsx`                                     | `src/app/support/inquiries/page.tsx`                                            |
| `src/components/features/support/ProductReturnsPanel.tsx`                                 | `src/app/support/after-sales/page.tsx`                                                    | `src/app/support/after-sales/page.tsx`                                          |
| `src/components/features/support/ReturnCautionsPanel.tsx`                                 | `src/app/support/after-sales/page.tsx`                                                    | `src/app/support/after-sales/page.tsx`                                          |
| `src/components/features/support/ShippingGuidePanel.tsx`                                  | `src/app/support/after-sales/page.tsx`                                                    | `src/app/support/after-sales/page.tsx`                                          |
| `src/components/features/support/ShippingReturnsGuide.tsx`                                | `src/app/support/after-sales/page.tsx`                                                    | `src/app/support/after-sales/page.tsx`                                          |
| `src/components/features/support/SupportContactCard.tsx`                                  | `src/components/features/support/SupportContacts.tsx`                                     | `src/app/support/page.tsx`                                                      |
| `src/components/features/support/SupportContacts.tsx`                                     | `src/app/support/page.tsx`                                                                | `src/app/support/page.tsx`                                                      |
| `src/components/features/terms/TermsDateSelect.tsx`                                       | `src/components/features/terms/TermsDocument.tsx`                                         | `src/app/support/terms/page.tsx`                                                |
| `src/components/features/terms/TermsDocument.tsx`                                         | `src/app/support/terms/page.tsx`                                                          | `src/app/support/terms/page.tsx`                                                |

## 도메인 폴더 승격 목록

| 이전 경로                                                                   | 현재 경로                                                          |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `src/components/features/care-guide/care.data.ts`                           | `src/components/care-guide/care.data.ts`                           |
| `src/components/features/care-guide/CareInstructions.tsx`                   | `src/components/care-guide/CareInstructions.tsx`                   |
| `src/components/features/cart/cart-item.ts`                                 | `src/components/cart/cart-item.ts`                                 |
| `src/components/features/catalog/productListingFilterValues.ts`             | `src/components/catalog/productListingFilterValues.ts`             |
| `src/components/features/catalog/productListingIaRoute.ts`                  | `src/components/catalog/productListingIaRoute.ts`                  |
| `src/components/features/catalog/ProductListingPage.tsx`                    | `src/components/catalog/ProductListingPage.tsx`                    |
| `src/components/features/catalog/product-listing/filterProducts.ts`         | `src/components/catalog/product-listing/filterProducts.ts`         |
| `src/components/features/catalog/product-listing/productFilterPolicy.ts`    | `src/components/catalog/product-listing/productFilterPolicy.ts`    |
| `src/components/features/catalog/product-listing/productListingMetadata.ts` | `src/components/catalog/product-listing/productListingMetadata.ts` |
| `src/components/features/catalog/product-listing/productSortOptions.ts`     | `src/components/catalog/product-listing/productSortOptions.ts`     |
| `src/components/features/checkout/checkout-coupons.ts`                      | `src/components/checkout/checkout-coupons.ts`                      |
| `src/components/features/checkout/checkout-summary.ts`                      | `src/components/checkout/checkout-summary.ts`                      |
| `src/components/features/faq/faq.data.ts`                                   | `src/components/faq/faq.data.ts`                                   |
| `src/components/features/find-account/IdConfirmationMessage.tsx`            | `src/components/find-account/IdConfirmationMessage.tsx`            |
| `src/components/features/find-account/passwordValidation.ts`                | `src/components/find-account/passwordValidation.ts`                |
| `src/components/features/find-account/phoneNumber.ts`                       | `src/components/find-account/phoneNumber.ts`                       |
| `src/components/features/home/homeCarouselPreview.ts`                       | `src/components/home/homeCarouselPreview.ts`                       |
| `src/components/features/home/homeContent.ts`                               | `src/components/home/homeContent.ts`                               |
| `src/components/features/locales/locales.data.ts`                           | `src/components/locales/locales.data.ts`                           |
| `src/components/features/mypage/mypage-address.types.ts`                    | `src/components/mypage/mypage-address.types.ts`                    |
| `src/components/features/mypage/mypage-home-data.ts`                        | `src/components/mypage/mypage-home-data.ts`                        |
| `src/components/features/mypage/mypage-profile.types.ts`                    | `src/components/mypage/mypage-profile.types.ts`                    |
| `src/components/features/mypage/mypage.data.ts`                             | `src/components/mypage/mypage.data.ts`                             |
| `src/components/features/mypage/MyPageFrame.tsx`                            | `src/components/mypage/MyPageFrame.tsx`                            |
| `src/components/features/mypage/MyPageProductHistory.tsx`                   | `src/components/mypage/MyPageProductHistory.tsx`                   |
| `src/components/features/mypage/reviews/reviews.types.ts`                   | `src/components/mypage/reviews/reviews.types.ts`                   |
| `src/components/features/not-found/NotFoundPage.tsx`                        | `src/components/not-found/NotFoundPage.tsx`                        |
| `src/components/features/not-found/SystemStatusPage.tsx`                    | `src/components/not-found/SystemStatusPage.tsx`                    |
| `src/components/features/notices/notices.data.ts`                           | `src/components/notices/notices.data.ts`                           |
| `src/components/features/orders/order-policy.ts`                            | `src/components/orders/order-policy.ts`                            |
| `src/components/features/orders/orders.data.ts`                             | `src/components/orders/orders.data.ts`                             |
| `src/components/features/orders/orders.types.ts`                            | `src/components/orders/orders.types.ts`                            |
| `src/components/features/orders/OrdersRoute.tsx`                            | `src/components/orders/OrdersRoute.tsx`                            |
| `src/components/features/phone-verification/phone-verification.types.ts`    | `src/components/phone-verification/phone-verification.types.ts`    |
| `src/components/features/phone-verification/PhoneVerificationContent.tsx`   | `src/components/phone-verification/PhoneVerificationContent.tsx`   |
| `src/components/features/phone-verification/usePhoneVerification.ts`        | `src/components/phone-verification/usePhoneVerification.ts`        |
| `src/components/features/product/productDetailPresentation.ts`              | `src/components/product/productDetailPresentation.ts`              |
| `src/components/features/product/productInquiries.ts`                       | `src/components/product/productInquiries.ts`                       |
| `src/components/features/product/productSizeOptions.ts`                     | `src/components/product/productSizeOptions.ts`                     |
| `src/components/features/run-club/runClub.data.ts`                          | `src/components/run-club/runClub.data.ts`                          |
| `src/components/features/run-club/RunClubBadge.tsx`                         | `src/components/run-club/RunClubBadge.tsx`                         |
| `src/components/features/run-club/RunClubPage.tsx`                          | `src/components/run-club/RunClubPage.tsx`                          |
| `src/components/features/run-club/RunClubSessionContext.ts`                 | `src/components/run-club/RunClubSessionContext.ts`                 |
| `src/components/features/screen-index/DesignGuideColor.tsx`                 | `src/components/screen-index/DesignGuideColor.tsx`                 |
| `src/components/features/screen-index/DesignGuideTypography.tsx`            | `src/components/screen-index/DesignGuideTypography.tsx`            |
| `src/components/features/screen-index/storybookLinks.ts`                    | `src/components/screen-index/storybookLinks.ts`                    |
| `src/components/features/signup-registration/registration.types.ts`         | `src/components/signup-registration/registration.types.ts`         |
| `src/components/features/size-guide/size-guide.data.ts`                     | `src/components/size-guide/size-guide.data.ts`                     |
| `src/components/features/size-guide/SizeGuidePanel.tsx`                     | `src/app/support/size-guide/_components/SizeGuidePanel.tsx`        |
| `src/components/features/store-finder/store.data.ts`                        | `src/components/store-finder/store.data.ts`                        |
| `src/components/features/support/InquiryCautions.tsx`                       | `src/components/support/InquiryCautions.tsx`                       |
| `src/components/features/support/inquiryOrders.data.ts`                     | `src/components/support/inquiryOrders.data.ts`                     |
| `src/components/features/support/inquiryOrderSelection.storage.ts`          | `src/components/support/inquiryOrderSelection.storage.ts`          |
| `src/components/features/support/InquiryPreviewContext.ts`                  | `src/components/support/InquiryPreviewContext.ts`                  |
| `src/components/features/support/support.navigation.ts`                     | `src/components/support/support.navigation.ts`                     |

## 공유 유지 대상

타입 전용 소비처를 제외하고 둘 이상의 실제 운영 부모가 사용하는 파일이다.

| 현재 파일                                                                           | 운영 부모 수 |
| ----------------------------------------------------------------------------------- | ------------ |
| `src/components/common/atoms/Accordion/Accordion.tsx`                               | 4            |
| `src/components/common/atoms/Badge/Badge.tsx`                                       | 4            |
| `src/components/common/atoms/Badge/PromotionBadge.tsx`                              | 2            |
| `src/components/common/atoms/Button/Button.tsx`                                     | 47           |
| `src/components/common/atoms/Card/Card.tsx`                                         | 2            |
| `src/components/common/atoms/Checkbox/Checkbox.tsx`                                 | 9            |
| `src/components/common/atoms/DataTable/DataTable.tsx`                               | 2            |
| `src/components/common/atoms/DescriptionList/DescriptionList.tsx`                   | 3            |
| `src/components/common/atoms/Divider/Divider.tsx`                                   | 8            |
| `src/components/common/atoms/Dropdown/Dropdown.tsx`                                 | 4            |
| `src/components/common/atoms/EmptyState/EmptyState.tsx`                             | 8            |
| `src/components/common/atoms/FilterTabs/FilterTabs.tsx`                             | 5            |
| `src/components/common/atoms/FormField/FormField.tsx`                               | 14           |
| `src/components/common/atoms/Icon/Icon.tsx`                                         | 39           |
| `src/components/common/atoms/IconButton/IconButton.tsx`                             | 10           |
| `src/components/common/atoms/LoadMoreButton/LoadMoreButton.tsx`                     | 3            |
| `src/components/common/atoms/NumberStepper/NumberStepper.tsx`                       | 3            |
| `src/components/common/atoms/Radio/Radio.tsx`                                       | 8            |
| `src/components/common/atoms/RatingStars/RatingStars.tsx`                           | 3            |
| `src/components/common/atoms/SectionHeader/SectionHeader.tsx`                       | 4            |
| `src/components/common/atoms/SegmentedControl/SegmentedControl.tsx`                 | 4            |
| `src/components/common/atoms/Select/Select.tsx`                                     | 3            |
| `src/components/common/atoms/StatusMessage/StatusMessage.tsx`                       | 9            |
| `src/components/common/atoms/TextInput/TextInput.tsx`                               | 7            |
| `src/components/common/atoms/Typography/Typography.tsx`                             | 101          |
| `src/components/common/atoms/Wishlist/Wishlist.tsx`                                 | 3            |
| `src/components/common/layouts/AccountFormLayout/AccountFormLayout.tsx`             | 3            |
| `src/components/common/layouts/AccountPageLayout/AccountPageLayout.tsx`             | 8            |
| `src/components/common/layouts/BottomSheet/BottomSheet.tsx`                         | 2            |
| `src/components/common/layouts/ContentLayout/ContentLayout.tsx`                     | 6            |
| `src/components/common/layouts/ContentSection/ContentSection.tsx`                   | 38           |
| `src/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`       | 14           |
| `src/components/common/layouts/OrderPageLayout/OrderPageLayout.tsx`                 | 2            |
| `src/components/common/layouts/SidebarColumns/SidebarColumns.tsx`                   | 2            |
| `src/components/common/layouts/SidebarNavigationLayout/SidebarNavigationLayout.tsx` | 6            |
| `src/components/common/molecules/AccountFormHeader/AccountFormHeader.tsx`           | 5            |
| `src/components/common/molecules/AmountRow/AmountRow.tsx`                           | 4            |
| `src/components/common/molecules/Breadcrumb/Breadcrumb.tsx`                         | 4            |
| `src/components/common/molecules/Carousel/Carousel.tsx`                             | 6            |
| `src/components/common/molecules/Carousel/CarouselControls.tsx`                     | 3            |
| `src/components/common/molecules/Carousel/CarouselPagination.tsx`                   | 5            |
| `src/components/common/molecules/Carousel/CarouselViewport.tsx`                     | 7            |
| `src/components/common/molecules/ConfirmDialog/ConfirmDialog.tsx`                   | 9            |
| `src/components/common/molecules/ContentHeader/ContentHeader.tsx`                   | 27           |
| `src/components/common/molecules/FormActionGroup/FormActionGroup.tsx`               | 3            |
| `src/components/common/molecules/FormFields/BirthDateField.tsx`                     | 2            |
| `src/components/common/molecules/FormFields/CharacterCount.tsx`                     | 3            |
| `src/components/common/molecules/FormFields/NameField.tsx`                          | 4            |
| `src/components/common/molecules/FormFields/PasswordField.tsx`                      | 4            |
| `src/components/common/molecules/FormFields/PhoneNumberField.tsx`                   | 5            |
| `src/components/common/molecules/FormFields/PreferenceField.tsx`                    | 2            |
| `src/components/common/molecules/FormFields/TextFormField.tsx`                      | 15           |
| `src/components/common/molecules/FormFields/TextareaField.tsx`                      | 4            |
| `src/components/common/molecules/FormFields/VerificationCodeField.tsx`              | 3            |
| `src/components/common/molecules/FormFields/VerificationCountdown.tsx`              | 3            |
| `src/components/common/molecules/HomeCarouselSection/HomeCarouselSection.tsx`       | 3            |
| `src/components/common/molecules/MainContentCard/MainContentCard.tsx`               | 2            |
| `src/components/common/molecules/MainSection/MainSection.tsx`                       | 2            |
| `src/components/common/molecules/ModalDialog/ModalDialog.tsx`                       | 6            |
| `src/components/common/molecules/OrderActionBar/OrderActionBar.tsx`                 | 2            |
| `src/components/common/molecules/OrderProductSummary/OrderProductSummary.tsx`       | 3            |
| `src/components/common/molecules/PageActionButton/PageActionButton.tsx`             | 4            |
| `src/components/common/molecules/ProductCard/ProductCard.tsx`                       | 5            |
| `src/components/common/molecules/ProductOptionList/ProductOptionList.tsx`           | 2            |
| `src/components/common/molecules/ProductOptionSelectors/ProductColorSelector.tsx`   | 2            |
| `src/components/common/molecules/ProductOptionSelectors/ProductOptionSection.tsx`   | 2            |
| `src/components/common/molecules/ProductOptionSelectors/ProductSizeSelector.tsx`    | 2            |
| `src/components/common/molecules/ProductOptionSelectors/ProductWidthSelector.tsx`   | 2            |
| `src/components/common/molecules/ProductThumbnail/ProductThumbnail.tsx`             | 4            |
| `src/components/common/molecules/SearchField/SearchField.tsx`                       | 3            |
| `src/components/common/molecules/SingleActionDialog/SingleActionDialog.tsx`         | 15           |
| `src/components/common/molecules/SizeSelector/SizeSelector.tsx`                     | 2            |
| `src/components/common/molecules/SocialAuthButton/SocialAuthButton.tsx`             | 2            |
| `src/components/common/molecules/StepIndicator/StepIndicator.tsx`                   | 2            |
| `src/components/common/molecules/SupportTabs/SupportTabs.tsx`                       | 5            |
| `src/components/common/molecules/Terms/Terms.tsx`                                   | 2            |
| `src/components/common/organisms/Account/AccountDataList.tsx`                       | 3            |
| `src/components/common/organisms/Address/AddressFields.tsx`                         | 4            |
| `src/components/common/organisms/EmailAddressFields/EmailAddressFields.tsx`         | 2            |
| `src/components/common/organisms/Navigation/SideNavigation/SideNavigation.tsx`      | 2            |
| `src/components/common/organisms/OrderRecommendations/OrderRecommendations.tsx`     | 2            |
| `src/components/common/organisms/Search/SearchHeader.tsx`                           | 2            |
| `src/components/care-guide/CareInstructions.tsx`                                    | 2            |
| `src/components/catalog/ProductListingPage.tsx`                                     | 2            |
| `src/components/find-account/IdConfirmationMessage.tsx`                             | 2            |
| `src/components/mypage/MyPageFrame.tsx`                                             | 6            |
| `src/components/mypage/MyPageProductHistory.tsx`                                    | 3            |
| `src/components/not-found/NotFoundPage.tsx`                                         | 3            |
| `src/components/not-found/SystemStatusPage.tsx`                                     | 4            |
| `src/components/orders/OrdersRoute.tsx`                                             | 2            |
| `src/components/phone-verification/PhoneVerificationContent.tsx`                    | 2            |
| `src/components/run-club/RunClubBadge.tsx`                                          | 2            |
| `src/components/run-club/RunClubPage.tsx`                                           | 2            |
| `src/components/support/InquiryCautions.tsx`                                        | 2            |

## 운영 부모 없는 기존 파일

아래 30개는 기존 Storybook·디자인 가이드·타입 검사 등의 별도 용도를 포함한다. 이번 통합으로 임의 삭제하지 않았다.

- `src/components/common/atoms/ActionButton/ActionButton.tsx`
- `src/components/common/atoms/Badge/BadgeLaunchStatus.tsx`
- `src/components/common/atoms/Button/Button.type-test.tsx`
- `src/components/common/atoms/Button/ButtonDocs.tsx`
- `src/components/common/atoms/EmailSignupField/EmailSignupField.tsx`
- `src/components/common/atoms/IconBrand/IconBrand.tsx`
- `src/components/common/atoms/IconButton/IconButtonDocs.tsx`
- `src/components/common/atoms/Link/Link.tsx`
- `src/components/common/atoms/Navigation/Navigation.tsx`
- `src/components/common/atoms/Pagination/Pagination.tsx`
- `src/components/common/atoms/PaymentLogo/PaymentLogo.tsx`
- `src/components/common/atoms/ProgressBar/ProgressBar.tsx`
- `src/components/common/atoms/SortIcon/SortIcon.tsx`
- `src/components/common/atoms/ToggleButton/ToggleButton.tsx`
- `src/components/common/molecules/Account/AccountSectionHeader.tsx`
- `src/components/common/molecules/CompareBar/CompareBar.tsx`
- `src/components/common/molecules/ContactCard/ContactCard.tsx`
- `src/components/common/molecules/FormFields/EmailField.tsx`
- `src/components/common/molecules/MyPage/PersonalizationCard.tsx`
- `src/components/common/molecules/PageHeader/PageHeader.tsx`
- `src/components/common/molecules/PageSection/PageSection.tsx`
- `src/components/common/molecules/SectionHeading/SectionHeading.tsx`
- `src/components/common/molecules/StatePanel/StatePanel.tsx`
- `src/components/common/organisms/Member/MemberHero.tsx`
- `src/components/common/organisms/MyPage/QuickLinkGrid.tsx`
- `src/components/common/organisms/Product/ProductGallery/ProductGallery.tsx`
- `src/components/common/organisms/Search/SearchCategorySelect.tsx`
- `src/components/common/organisms/Search/SearchCollectionLinks.tsx`
- `src/components/screen-index/DesignGuideColor.tsx`
- `src/components/screen-index/DesignGuideTypography.tsx`

## 검증

검증 결과는 최종 작업 트리에서 완료한 항목만 아래에 기록한다.

- 구조 비교: 이동한 함수 본문 409개와 최상위 초기화 표현식 211개를 TypeScript AST로 비교했다. 이름 변경과 Prettier의 JSX 공백 표기를 정규화한 뒤 불일치 0건이었다. 별도 검토에서 JSX·스타일 값 변경을 발견하지 않았다.
- TypeScript 검사와 선언 전용 계약 21개에 대한 별도 semantic diagnostics가 0건이었다. 런타임 import 그래프의 순환은 전후 모두 0개이며 지원되지 않는 page export가 없었다. global.scss의 TypeScript 비해석은 기존과 동일한 스타일 import다.
- 변경 파일 ESLint·Prettier, Panda 생성, Next production build, Storybook build를 통과했다. 도메인 폴더 승격 후 기존 전체 테스트 62개가 통과했다. Storybook 인덱스는 기존 780개 항목을 유지한다.
- PC 브라우저: 상품 즉시 필터·정렬, 장바구니 선택·삭제·옵션/수량 저장, 주문 필수 동의와 완료, 로그인, FAQ 펼침·검색, 런클럽 신청 안내, 상품 이미지 뷰어, 주문 날짜·상품명 필터를 확인했다.
- 모바일 브라우저: 검색 필터 초안·취소·적용과 검색어 유지, 상품 이미지 선택, 헤더 메뉴 열기/닫기, 장바구니 옵션 변경, 주문 완료, 로그인, 회원정보 수신 동의 저장/취소, FAQ 펼침, 런클럽 신청 안내, 푸터 키보드 펼침을 확인했다.
- Storybook: 실제 페이지의 로그인 오류 구성, PC·모바일 색상 선택 스토리의 선택 상태, 범위 입력 스토리의 키보드 증가(25 → 26), 모바일 주문 배송조회 시나리오의 단계·송장·추적 표를 확인했다. 확인한 프레임에 표시된 Storybook 렌더 오류가 없었다. 전체 스토리 play 함수와 모든 라우트의 브라우저 전수 실행은 하지 않았다.
- component-reusability 스킬 validator와 OKF YAML을 확인했다. `npm run okf:check`는 staged 변경 전용이므로 이 작업의 무스테이징 상태 검사만으로 문서 충족을 주장하지 않는다. 별도로 `pendingDocs(false)`로 전체 작업 트리의 관련 문서 누락이 없음을 확인했다. 커밋·푸시는 수행하지 않았다.
