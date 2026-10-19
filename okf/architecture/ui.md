---
type: Architecture
title: '컴포넌트와 스타일'
description: '공통 UI 계층, Panda CSS와 Storybook 작성 규칙을 설명한다.'
tags: [components, panda-css, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-19T03:42:23+00:00'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/shared/components/organisms/Search/SearchForm.tsx
  - src/shared/components/organisms/Search/SearchCategorySelect.tsx
  - src/shared/components/organisms/Search/RecentSearches.tsx
  - .codex/skills/component-reusability/SKILL.md
  - src/shared/components/organisms/Layout/SiteHeader/HeaderLogo.tsx
  - src/shared/components/atoms/Button/Button.tsx
  - src/shared/components/atoms/Button/ButtonDocs.tsx
  - src/shared/components/atoms/DataTable/DataTable.tsx
  - src/shared/components/atoms/Fieldset/Fieldset.tsx
  - src/shared/components/atoms/FormField/FormField.tsx
  - src/shared/components/atoms/IconButton/IconButtonDocs.tsx
  - src/shared/components/atoms/SectionHeader/SectionHeader.tsx
  - src/shared/components/atoms/Tag/Tag.tsx
  - src/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout.tsx
  - src/shared/components/molecules/Breadcrumb/Breadcrumb.tsx
  - src/shared/components/molecules/CatalogFilterSection/CatalogFilterSection.tsx
  - src/shared/components/molecules/CompareBar/CompareBar.tsx
  - src/shared/components/molecules/DataRows/DataRows.tsx
  - src/shared/components/molecules/MetricGrid/MetricGrid.tsx
  - src/shared/components/molecules/MyPage/PersonalizationCard.tsx
  - src/shared/components/molecules/MyPage/ProfileQuestionGroup.tsx
  - src/shared/components/molecules/Product/ProductActionBar.tsx
  - src/shared/components/molecules/ProductOptionList/ProductOptionList.tsx
  - src/shared/components/molecules/Signup/SignupProgress.tsx
  - src/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelBody.tsx
  - src/shared/components/organisms/Hero/Hero.tsx
  - src/shared/components/organisms/Hero/HeroPagination.tsx
  - src/shared/components/organisms/Hero/HeroSlide.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterNavigation.tsx
  - src/shared/components/organisms/Layout/SiteHeader/DesktopNavigation.tsx
  - src/shared/components/organisms/Member/MemberHero.tsx
  - src/shared/components/organisms/MyPage/QuickLinkGrid.tsx
  - src/shared/components/organisms/Product/ProductDetailSections/ProductInformation.tsx
  - src/shared/components/organisms/Product/ProductDetailSections/ProductInquiryNoticeSection.tsx
  - src/shared/components/organisms/Product/ProductDetailSections/ReviewGalleryModal.tsx
  - src/shared/components/organisms/Product/ProductGallery/ProductGallery.tsx
  - src/shared/components/organisms/Search/RecommendedSearches.tsx
  - src/shared/components/organisms/Search/SearchCollectionLinks.tsx
  - src/shared/components/organisms/Search/SearchHeader.tsx
  - src/shared/components/organisms/Search/SearchSuggestions.tsx
  - src/shared/components/organisms/Signup/SignupCompleteStep.tsx
  - src/shared/components/organisms/Signup/SignupTermsStep.tsx
  - src/shared/features/catalog/product-listing/ProductListingContent.tsx
  - src/shared/features/explore/ExploreDetailPage.tsx
  - src/shared/features/explore/ExploreHubPage.tsx
  - src/shared/features/explore/ShoeFinderPage.tsx
  - src/shared/features/launch-calendar/LaunchCalendarPage.tsx
  - src/shared/features/running-hub/RunningExperiencePage.tsx
  - src/shared/features/screen-index/DesignGuideColor.tsx
  - src/shared/features/screen-index/DesignGuidePage.tsx
  - src/shared/features/screen-index/DesignGuideTypography.tsx
  - src/shared/features/store-finder/StoreFinderPage.tsx
  - src/shared/features/terms/TermsPage.tsx
  - src/shared/lib/emailValidation.ts
  - src/shared/lib/passwordValidation.ts
  - src/shared/components/atoms/Checkbox/Checkbox.tsx
  - src/shared/components/atoms/Dropdown/Dropdown.tsx
  - src/shared/components/atoms/EmailSignupField/EmailSignupField.tsx
  - src/shared/components/atoms/NumberStepper/NumberStepper.tsx
  - src/shared/components/atoms/Radio/Radio.tsx
  - src/shared/components/atoms/RangeInput/RangeInput.tsx
  - src/shared/components/atoms/Select/Select.tsx
  - src/shared/components/atoms/TextInput/TextInput.tsx
  - src/shared/components/molecules/SizeSelector/SizeSelector.tsx
  - src/shared/components/molecules/Terms/Terms.tsx
  - src/shared/components/organisms/Signup/SignupDetailsStep.tsx
  - src/shared/features/product/ProductSizeSelector.tsx
  - src/shared/features/signup-registration/RegistrationPage.tsx
  - src/shared/features/signup-terms/SignupTermsPage.tsx
  - src/stories/features/phone-verification/PhoneVerificationPage.stories.tsx
  - src/stories/features/forms/FormStateAudit.stories.tsx
  - src/shared/components/atoms/Typography/Typography.tsx
  - src/shared/components/atoms/StatusMessage/StatusMessage.tsx
  - src/stories/components/atoms/StatusMessage/StatusMessage.stories.tsx
  - src/stories/features/login/LoginPage.stories.tsx
  - src/shared/components/molecules/OrderStatusTracker/OrderStatusTracker.tsx
  - src/shared/features/product/ProductColorSelector.tsx
  - src/stories/features/product/ProductColorSelector.stories.tsx
  - src/shared/components/molecules/ProductCard/ProductCard.tsx
  - src/shared/components/molecules/ProductCard/ProductCardPreview.tsx
  - src/shared/components/molecules/ProductDetails/ProductDetails.tsx
  - src/shared/components/molecules/ProductDetails/ProductDetailsIdentity.tsx
  - src/stories/components/molecules/ProductCard/ProductCard.stories.tsx
  - src/shared/components/molecules/ProductPrice/ProductPrice.tsx
  - src/stories/components/molecules/ProductPrice/ProductPrice.stories.tsx
  - src/shared/components/molecules/SingleActionDialog/SingleActionDialog.tsx
  - src/stories/components/molecules/SingleActionDialog/SingleActionDialog.stories.tsx
  - src/shared/features/phone-verification/PhoneVerificationPage.tsx
  - src/shared/features/signup-registration/MarketingConsentSummaryModal.tsx
  - src/shared/components/molecules/ConfirmDialog/ConfirmDialog.tsx
  - src/shared/components/organisms/Account/AlreadyRegisteredModal.tsx
  - src/shared/components/organisms/Account/LogoutDialog.tsx
  - src/shared/components/organisms/Account/MarketingConsentSummaryModal.tsx
  - src/shared/components/organisms/Address/AddressSearchModal.tsx
  - src/shared/components/organisms/Terms/TermsDialog.tsx
  - src/stories/components/molecules/ConfirmDialog/ConfirmDialog.stories.tsx
  - src/stories/components/organisms/Account/AlreadyRegisteredModal.stories.tsx
  - src/stories/components/organisms/Account/LogoutDialog.stories.tsx
  - src/stories/components/organisms/Account/MarketingConsentSummaryModal.stories.tsx
  - src/stories/components/organisms/Address/AddressSearchModal.stories.tsx
  - src/stories/components/organisms/Terms/TermsDialog.stories.tsx
  - src/shared/features/phone-verification/PhoneVerificationDetailDialog.tsx
  - src/shared/features/mypage/MyPageReviewDialog.tsx
  - src/shared/features/mypage/MyPageWithdrawalCompleteDialog.tsx
  - src/shared/features/mypage/MyPageWithdrawalDialog.tsx
  - src/shared/features/mypage/MyPageAddressDeleteDialog.tsx
  - src/stories/features/signup-registration/RegistrationPage.stories.tsx
  - src/shared/features/notices/NoticesPage.tsx
  - src/shared/features/product/ProductDetailSupport.tsx
  - src/shared/features/run-club/RunClubApplicationNotice.tsx
  - src/shared/features/mypage/MyPageReviews.tsx
  - src/shared/features/mypage/MyPageProfile.tsx
  - src/shared/features/mypage/MyPageAddresses.tsx
  - src/shared/features/find-account/PasswordResetCompleteModal.tsx
  - src/shared/features/product/ProductDetailViewerGallery.tsx
  - src/shared/features/run-club/RunClubEmptyState.tsx
  - src/shared/features/product/ProductVariantAction.tsx
  - src/shared/features/product/ProductDetailSupportRegion.tsx
  - src/shared/features/product/ProductDetailShippingGuide.tsx
  - src/shared/features/product/ProductDetailReturnPrecautions.tsx
  - src/shared/features/product/ProductDetailReturnGuide.tsx
  - src/shared/features/product/ProductDetailGrid.tsx
  - src/shared/features/product/ProductDetailDeliverySupport.tsx
  - src/shared/features/product/ProductDetailDeliverySection.tsx
  - src/shared/features/mypage/MyPageRestockList.tsx
  - src/shared/features/mypage/MyPageRestockCancelDialog.tsx
  - src/shared/features/run-club/RunClubSessionPoster.tsx
  - src/shared/features/run-club/RunClubSessionGuideContent.tsx
  - src/shared/features/product/ProductVariantSection.tsx
  - src/shared/features/product/ProductDetailRecommend.tsx
  - src/shared/features/product/ProductDetailPanel.tsx
  - src/shared/features/product/ProductDetailMobileGallery.tsx
  - src/shared/features/product/ProductDetailImageViewer.tsx
  - src/shared/features/product/ProductDetailDeliveryContent.tsx
  - src/shared/features/mypage/MyPageProductHistoryNote.tsx
  - src/shared/features/mypage/MyPageProductHistoryHeading.tsx
  - src/shared/features/mypage/MyPageProductHistoryGrid.tsx
  - src/shared/features/mypage/MyPageProductHistory.tsx
  - src/shared/features/mypage/MyPageFrame.tsx
  - src/shared/features/mypage/MyPageBreadcrumbs.tsx
  - src/shared/features/locales/LocalesHeading.tsx
  - src/shared/features/locales/LocaleRegionHeading.tsx
  - src/shared/features/locales/LocaleCountryList.tsx
  - src/shared/features/home/HomeShoeFinderSection.tsx
  - src/shared/features/home/HomeCategorySection.tsx
  - src/shared/features/home/HomeBestSellerSection.tsx
  - src/shared/features/catalog/product-listing/MobileProductFilter.tsx
  - src/shared/features/catalog/product-listing/DesktopProductSort.tsx
  - src/shared/features/product/ProductDetailBody.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderInner.tsx
  - src/shared/components/molecules/ProductDetails/ProductDetailsOptions.tsx
  - src/shared/components/molecules/ProductDetails/ProductDetailsIdentity.tsx
  - src/shared/components/molecules/MainSection/MainSectionHeader.tsx
  - src/shared/components/molecules/HomeCarouselSection/HomeCarouselRail.tsx
  - src/stories/features/run-club/RunClubDetail.stories.tsx
  - src/stories/features/run-club/RunClubPreview.tsx
  - src/stories/components/molecules/HomeCarouselSection/HomeCarouselSection.stories.tsx
  - .storybook/preview.ts
  - src/shared/features/home/homeCarouselPreview.ts
  - src/shared/components/molecules/HomeCarouselSection/HomeCarouselSection.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterBrandLogo.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterLegalLinks.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterNavigationLinks.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterNavigationMobile.tsx
  - src/shared/components/organisms/Layout/SiteFooter/SiteFooter.tsx
  - src/shared/components/organisms/Layout/SiteFooter/footerData.ts
  - src/shared/components/molecules/Carousel/Carousel.tsx
  - src/shared/components/molecules/Carousel/CarouselContext.ts
  - src/shared/components/molecules/Carousel/CarouselViewport.tsx
  - src/shared/components/molecules/Carousel/CarouselScrollbar.tsx
  - src/shared/components/molecules/Carousel/CarouselPagination.tsx
  - src/shared/components/molecules/Carousel/CarouselControls.tsx
  - src/shared/components/organisms/Layout/SiteHeader/headerPromotionData.ts
  - src/shared/components/organisms/Layout/SiteHeader/HeaderPromotionCarousel.tsx
  - src/shared/components/organisms/Layout/SiteHeader/HeaderPromotionContent.tsx
  - src/shared/components/organisms/Layout/SiteHeader/HeaderPromotionBanner.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeader.tsx
  - src/shared/features/mypage/RunningProfileContent.tsx
  - src/shared/components/organisms/MyPage/CouponCard.tsx
  - src/shared/features/run-club/RunClubDetailLayout.tsx
  - src/shared/features/run-club/RunClubFilters.tsx
  - src/shared/features/run-club/RunClubSessionImage.tsx
  - src/shared/features/run-club/RunClubRecommendations.tsx
  - src/shared/features/run-club/RunClubPage.tsx
  - src/shared/features/run-club/RunClubApplyButton.tsx
  - src/shared/features/run-club/RunClubMobileActionBar.tsx
  - src/shared/features/run-club/RunClubFacts.tsx
  - src/shared/features/run-club/RunClubHeader.tsx
  - src/shared/features/run-club/RunClubHistoryLink.tsx
  - src/shared/features/run-club/RunClubSessionCard.tsx
  - src/shared/features/run-club/RunClubDetailPage.tsx
  - src/shared/features/run-club/RunClubSessionGuide.tsx
  - src/shared/features/run-club/RunClubSessionNotes.tsx
  - src/shared/features/mypage/mypage.data.ts
  - src/shared/features/mypage/MyPageStatusPage.tsx
  - src/shared/features/mypage/stories/MyPageRouteStory.tsx
  - src/shared/features/screen-index/IaStructurePage.tsx
  - src/shared/features/screen-index/storybookLinks.ts
  - src/stories/features/run-club/RunClub.stories.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerBackButton.tsx
  - src/shared/components/organisms/Layout/SiteHeader/MegaMenuContent.tsx
  - src/shared/components/organisms/Layout/SiteHeader/MegaMenuPanel.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerShoppingLinks.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerBase.tsx
  - src/shared/components/molecules/ProductDetails/ProductDetails.tsx
  - src/shared/components/atoms/EmptyState/EmptyState.tsx
  - src/shared/components/atoms/Pagination/Pagination.tsx
  - src/shared/components/layouts/BottomSheet/BottomSheet.tsx
  - src/shared/components/layouts/BottomSheet/BottomSheetHeader.tsx
  - src/shared/components/molecules/ColorFilter/ColorFilter.tsx
  - src/shared/components/molecules/MainSection/MainSection.tsx
  - src/shared/components/molecules/ProductCard/ProductCardPreview.tsx
  - src/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanel.tsx
  - src/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelHeader.tsx
  - src/shared/components/organisms/Hero/HeroCopy.tsx
  - src/shared/components/organisms/InquiryBoard/InquiryBoard.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterBrand.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterBrandSocial.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterContent.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterLegalLinks.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterNavigationLinks.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterNavigationWeb.tsx
  - src/shared/components/organisms/Layout/SiteFooter/SiteFooter.tsx
  - src/shared/components/organisms/Layout/SiteHeader/MegaMenuList.tsx
  - src/shared/components/organisms/Search/SearchDialog.tsx
  - src/shared/features/account-locked/AccountUnlockCompletePage.tsx
  - src/shared/features/cart/CartPage.tsx
  - src/shared/features/catalog/product-listing/DesktopProductFilter.tsx
  - src/shared/features/catalog/ProductListingResults.tsx
  - src/shared/features/find-account/FindAccountContent.tsx
  - src/shared/features/find-account/IdConfirmationModal.tsx
  - src/shared/features/home/HomeExploreSection.tsx
  - src/shared/features/phone-verification/PhoneVerificationContent.tsx
  - src/shared/features/product/ProductDetailAfterSalesContent.tsx
  - src/shared/features/product/ProductDetailMedia.tsx
  - src/shared/features/product/ProductInformation.tsx
  - src/shared/features/run-club/RunClubLayout.tsx
  - src/shared/features/run-club/RunClubResults.tsx
  - src/shared/features/signup-registration/RegistrationContent.tsx
  - src/shared/features/support/SupportPage.tsx
  - src/shared/features/support/SupportContactCard.tsx
  - src/shared/features/support/InquiryPage.tsx
  - src/shared/features/support/InquiryNewPage.tsx
  - src/shared/features/support/InquiryCautions.tsx
  - src/shared/features/support/SupportExperiencePage.tsx
  - src/shared/features/support/ShippingReturnsPage.tsx
  - src/shared/features/notices/NoticesPage.tsx
  - src/shared/features/notices/NoticeDetailPage.tsx
  - src/app/support/inquiries/page.tsx
  - src/app/support/inquiries/new/page.tsx
  - src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx
  - src/shared/features/faq/FaqPage.tsx
  - src/shared/features/faq/faq.data.ts
  - src/shared/components/molecules/Faq/FaqControls.tsx
  - src/shared/components/molecules/SearchField/SearchField.tsx
  - src/shared/components/organisms/Faq/FaqList.tsx
  - src/shared/components/atoms/FilterTabs/FilterTabs.tsx
  - src/stories/components/atoms/FilterTabs/FilterTabs.stories.tsx
  - src/shared/features/teamwear/TeamwearPage.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerGroups.tsx
  - src/shared/components/atoms/IconButton/IconButton.tsx
  - src/shared/components/organisms/Layout/SiteHeader/HeaderAuthLink.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerFrame.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerHeader.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerNavigation.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerUtilityLinks.tsx
  - src/shared/components/organisms/Layout/SiteHeader/MegaMenuAD.tsx
  - src/shared/components/organisms/Faq/FaqList.tsx
  - src/shared/components/organisms/StoreFinder/StoreResults.tsx
  - src/stories/components/organisms/Faq/FaqList.stories.tsx
  - src/stories/components/molecules/SearchField/SearchField.stories.tsx
  - src/stories/components/organisms/Layout/SiteHeader/MegaMenuAD.stories.tsx
  - src/stories/components/atoms/Accordion/Accordion.stories.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawer.tsx
  - src/shared/components/layouts/AppLayout/AppLayout.tsx
  - src/shared/icons/fontAwesome.ts
  - src/shared/icons/iconAssets.ts
  - public/images/icon/navigation/membership.svg
  - src/stories/components/organisms/Navigation/MenuDrawer/MenuDrawer.stories.tsx
  - src/shared/features/run-club/RunClubBadge.tsx
  - src/shared/features/locales/LocalesPage.tsx
  - src/shared/features/locales/LocalesLayout.tsx
  - src/shared/features/locales/LocaleRegionSection.tsx
  - src/shared/features/locales/locales.data.ts
  - src/shared/features/find-account/FindAccountPage.tsx
  - src/shared/features/find-account/PasswordResetPage.tsx
  - src/shared/features/find-account/PasswordResetContent.tsx
  - src/shared/features/find-account/PasswordResetField.tsx
  - src/shared/features/find-account/passwordValidation.ts
  - src/shared/features/find-account/phoneNumber.ts
  - src/shared/features/account-locked/AccountLockedPage.tsx
  - src/shared/features/account-locked/AccountLockedContent.tsx
  - src/shared/features/identity-verification/IdentityVerificationContent.tsx
  - src/shared/features/signup-registration/RegistrationCompleteContent.tsx
  - src/stories/features/locales/LocalesPage.stories.tsx
  - src/stories/features/find-account/PasswordResetPage.stories.tsx
  - src/stories/features/account-locked/AccountLockedPage.stories.tsx
  - src/shared/components/atoms/RatingInput/RatingInput.tsx
  - src/shared/components/atoms/DescriptionList/DescriptionList.tsx
  - src/shared/components/molecules/ModalDialog/ModalDialog.tsx
  - src/shared/components/molecules/ModalDialog/ModalDialogHeader.tsx
  - src/shared/components/molecules/ModalDialog/ModalDialogFooter.tsx
  - src/shared/components/organisms/MyPage/ReviewManager.tsx
  - src/stories/components/atoms/RatingInput/RatingInput.stories.tsx
  - src/stories/components/organisms/MyPage/ReviewManager.stories.tsx
  - src/stories/components/molecules/ModalDialog/ModalDialog.stories.tsx
  - src/shared/features/home/HomeLayout.tsx
  - src/shared/features/home/HomePage.tsx
  - src/shared/features/signup/SignupLayout.tsx
  - src/shared/features/signup/SignupPage.tsx
  - src/shared/features/product/ProductDetailLayout.tsx
  - src/shared/features/product/ProductDetailPage.tsx
  - src/shared/features/product/ProductWidthSelector.tsx
  - src/shared/features/product/ProductDetailHeaderMeta.tsx
  - src/shared/features/signup-terms/SignupTermsDetail.tsx
  - src/shared/features/signup-terms/SignupTermsContent.tsx
  - src/shared/features/mypage/RunningProfilePage.tsx
  - src/shared/features/run-club/RunClubSessionHero.tsx
  - src/stories/features/signup/SignupPage.stories.tsx
  - src/stories/features/signup-terms/SignupTermsPage.stories.tsx
  - AGENTS.md
  - src/stories/features/mypage/MyPage.stories.tsx
  - src/stories/features/support/SupportPages.stories.tsx
  - src/shared/features/login/LoginContent.tsx
  - src/shared/features/login/LoginLayout.tsx
  - src/shared/features/login/LoginForm.tsx
  - src/shared/features/login/LoginActions.tsx
  - src/shared/features/login/LoginMembership.tsx
  - src/stories/features/login/LoginPage.stories.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeader.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderContainer.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderFrame.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderContent.tsx
  - src/shared/features/checkout/CheckoutPage.tsx
  - src/shared/features/checkout/CheckoutLayout.tsx
  - src/shared/features/checkout/CheckoutContent.tsx
  - src/shared/features/checkout/CheckoutFields.tsx
  - src/shared/features/checkout/CheckoutSummary.tsx
  - src/shared/features/checkout/checkout-summary.ts
  - src/shared/components/atoms/Typography/Typography.tsx
  - src/shared/styles/global.scss
  - src/stories/features/checkout/CheckoutPage.stories.tsx
  - src/stories/components/organisms/Layout/SiteHeader/SiteHeader.stories.tsx
  - src/stories/components/atoms/Typography/Typography.stories.tsx
  - src/shared/components/atoms/SegmentedControl/SegmentedControl.tsx
  - src/shared/components/organisms/MyPage/CouponManager.tsx
  - src/shared/components/organisms/MyPage/EmployeeCoupons.tsx
  - src/shared/components/organisms/Product/ProductDetailSections/ProductReviews.tsx
  - src/shared/components/organisms/Product/ProductDetailSections/ProductDetailSections.tsx
  - src/shared/components/layouts/AppLayout/AppLayout.tsx
  - src/stories/components/atoms/SegmentedControl/SegmentedControl.stories.tsx
  - src/stories/components/layouts/AppLayout/AppLayout.stories.tsx
  - src/stories/components/organisms/Product/ProductDetailSections/ProductDetailSections.stories.tsx
  - src/shared/features/mypage/MyPage.tsx
sources:
  - id: base-ui-jsx-audit
    resource: https://base-ui.com/react/overview/quick-start
    title: 'Base UI 공식 카탈로그 (2026-10-15 JSX 스타일 점검)'
  - id: agents-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/AGENTS.md
    title: 'AGENTS.md'
  - id: panda-config-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/panda.config.ts
    title: 'panda.config.ts'
  - id: src-shared-styles-global-scss
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/src/shared/styles/global.scss
    title: 'src/shared/styles/global.scss'
  - id: -storybook-main-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.storybook/main.ts
    title: '.storybook/main.ts'
  - id: -storybook-preview-ts
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.storybook/preview.ts
    title: '.storybook/preview.ts'
  - id: -codex-skills-component-reusability-skill-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.codex/skills/component-reusability/SKILL.md
    title: '.codex/skills/component-reusability/SKILL.md'
---

# 컴포넌트와 스타일

## 마이페이지 폼 포맷 정리 (2026-10-19)

MyPageAddresses와 MyPageProfile의 기존 JSX·객체·함수 표현을 Prettier로 정리했다. 이 포맷 변경 자체는 상태·검증·문구·스타일 값을 바꾸지 않는다. 기능 변경은 별도 커밋의 Form 전수 점검에 기록한다.


## 회원가입·휴대폰 인증 오류 문구 보완 (2026-10-19)

비밀번호 외 코드 점검에서 휴대폰 필수 약관의 설명 문구 누락, 아이디 안내 조건과 실제 검증 차이, 화면별 이메일 규칙 차이와 확인 상태 불일치를 수정했다. 필드 문구는 FormField.error로, 약관 그룹은 StatusMessage.error와 section의 aria-describedby로 연결한다. 약관의 기존 개별 빨간 표시·모두동의 동작은 유지한다. 상태 소유자와 규칙은 [상태 문서](state.md#회원가입휴대폰-인증-오류-상태-보완-2026-10-19)를 참고한다.

PhoneVerification의 Mobile 스토리에 PlatformProvider를 연결해 실제 모바일 Typography 컨텍스트도 적용한다. PC·모바일 RequiredAgreements는 일부 동의 시 남은 오류, 전체 동의 후 해제, 요청 후 동의 취소 시 재표시를 확인한다. Signup FieldValidation은 아이디·이메일 오류 후 완료, Registration EmailCheckState는 이메일 변경 시 안내 해제·다른 필드 오류 후 이메일 확인 유지·다음 단계 진행을 검사한다.

사용자가 제공한 전체 화면 축소 이미지에서 세부 문구를 확정할 수 없고 Figma 원본은 재인증 오류 상태다. 추가 문구는 현재 화면 안내와 코드에서 확인한 누락을 보완한 것이며 두 Figma 영역 전체와의 일치를 주장하지 않는다. 기존 가입 완료 화면, 이메일 확인의 info 데모 안내와 실제 인증 결과 미연결 계약은 유지한다.

검증 결과: 전체 타입 검사·변경 파일 ESLint·Node 검사 51개·전체 Storybook 빌드가 통과했다. 로그인·재설정·가입·회원정보·휴대폰의 정적 Chromium 검사 27개가 모두 통과했고, 이번 추가 시나리오 6개는 PC와 모바일에서 각각 실행했다. 기존 a11y todo 경고는 별도다.

## 비밀번호 오류 안내 일관성 보완 (2026-10-19)

로그인 스크린샷과 현재 코드에서 확인한 충돌을 수정했다. 가입·로그인·재설정의 규칙과 오류 문구는 [공통 정책](state.md#가입로그인재설정-비밀번호-정책-2026-10-19)을 따른다. SignupDetailsStep의 8자 이상 placeholder도 10~12자·문자 조합 안내로 변경했고, 기본 정보 오류 안내에 무조건 8자 규칙을 덧붙이던 문구를 제거했다.

PasswordResetField는 오류 문구·색상·설명 id·invalid를 FormField.error에 위임한다. 별도 Typography 오류 출력과 required일 때 문구를 숨기는 분기를 제거해 빈 값 제출에서도 두 필드의 오류를 읽을 수 있다. 비밀번호 보기/숨기기와 완료 모달은 유지한다. 재설정 PC·모바일의 빈 값 문구·색상·접근 가능한 설명·10자 비밀번호 완료, 일반 가입의 8자 거부 후 10자 완료, 회원정보 가입의 공백 포함 값 거부 후 수정 스토리를 추가했다.

Figma 원본은 재인증 오류로 대조하지 못했다. 서버 확인이 필요한 중복 이메일·잘못된 인증번호에 임의의 성공/실패 결과를 추가하지 않는다. 현재 작업 트리에서 전체 타입 검사·변경 파일 ESLint·Node 테스트 48개·전체 Storybook 빌드는 통과했다. 이전 절의 전체 검사 실패 기록은 당시 작업 트리를 나타낸다.

최종 정적 브라우저 검사는 로그인 9개·재설정 8개·일반 가입 2개·회원정보 가입 2개, 총 21개를 모두 통과했다. 신규 가입 정책 검사는 PC와 모바일에 모두 명시적 password-policy 태그를 부여했다. 375×812 모바일 캡처에서 재설정의 빈 두 입력 아래 오류 문구와 빨간 테두리를 확인했다. 기존 a11y todo 경고는 별도로 남아 있다.

## 로그인 형식 오류 안내 보완 (2026-10-19)

LoginForm의 이메일·비밀번호에 첨부 디자인의 필드별 오류 문구를 FormField.error로 연결했다. Error·MobileError 스토리는 공통 누락 안내 대신 두 문구와 각각의 빨간 테두리·TextInput 오류 상태·접근 가능한 설명을 표시한다. 로그인 검증 규칙과 제출 이후 수정 계약은 [상태 문서](state.md#로그인-필드-오류)를 참고한다. LoginFlow의 정상 비밀번호 예시도 새 규칙에 맞췄으며 InvalidFormats·MobileInvalidFormats에 이메일 형식, 비밀번호 길이 경계·문자 조합·공백 오류 및 수정 후 성공 검사를 추가했다.

변경한 로그인 TSX 3개는 ESLint를 통과했다. 전체 타입 검사는 작업 트리의 ButtonDocs·ProductDetailSections·SupportExperiencePage JSX 문법 오류로, 전체 Storybook 빌드는 ButtonDocs·ProductDetailSections 문법 오류로 실패했다. 이 파일들은 이번 수정 범위에 포함하지 않는다. 이전 전수 점검의 성공 기록은 당시 코드 기준이며 이번 작업 트리 전체의 성공을 뜻하지 않는다.

로그인 소스·스토리와 실제 의존 코드를 포함한 별도 tsconfig의 타입 검사는 통과했다. 저장소 설정을 재사용하고 로그인 스토리만 선택한 임시 Storybook production build도 통과했다. 임시 설정·빌드 결과는 node_modules/.cache 아래에만 생성했다.

정적 빌드를 Chromium에서 실행한 로그인 스토리 9개가 모두 통과했다. Error·MobileError의 두 문구 계산 색상·aria-invalid·접근 가능한 설명, PC·모바일의 빈 값·형식·비밀번호 경계값·수정 후 로그인, 기능 미연결 안내를 확인했다. 375×812 캡처에서도 두 문구와 빨간 테두리가 표시됨을 확인했다. 기존 a11y todo 경고는 별도이며 전체 접근성 검증을 뜻하지 않는다.

## 전체 페이지 Form 점검 이후 계약 (2026-10-19)

63개 App Router 페이지 및 공통 검색·푸터의 검사 목록과 재현 시나리오는 [전수 점검 보고서](../development/form-state-audit.md)에 기록한다. 아래 계약은 2026-10-16의 ‘Form 오류 상태 전달 조사’에서 발견한 누락을 보완한 현재 구현이다.

- Select는 TextInput처럼 FormFieldContext의 오류·required·disabled·htmlFor·설명을 소비한다. 자체 invalid 또는 부모 invalid는 OR로 합치며 aria-invalid=true로 명시한 TextInput/Select에도 오류 테두리를 적용한다.
- Dropdown은 선택적 invalid를 받으며 자체 error·부모 invalid와 합쳐 상태/테두리를 표시한다. 부모 label/id와 오류 설명, 필수·비활성 상태를 연결하고 포커스·팝업이 열려도 오류 테두리를 유지한다.
- Checkbox·Radio·RatingInput·RangeInput·NumberStepper·SizeSelector는 Base UI의 필드 상태를 유지하면서 빨간 오류 표시를 추가한다. 서버 렌더링에서도 설명을 연결하도록 FormFieldContext.describedBy를 전달한다. Terms의 문구도 부모 오류를 반영한다. Fieldset·검색/필터 자체에는 신규 필수값 규칙을 추가하지 않는다.
- StatusMessage는 선택적 id로 오류 설명 연결을 지원한다. error #A60000, success #16794b, info #4D4D4D와 기존 alert/status 계약은 유지한다. 인증·중복확인의 서비스 미연결 안내는 info이며, 전용 완료 화면은 기존 디자인을 유지한다.
- 인증번호의 길이 오류는 해당 FormField.error로, 인증 만료는 error 안내로 표시한다. 회원가입 주소·약관·기본정보, 배송지·프로필·리뷰·문의·상품 사이즈·주문·쿠폰의 기존 검증 규칙을 필드 표시/설명과 연결한다. native required/type=email 검증에 의존하던 제출 경로는 동일한 규칙을 커스텀 상태로 표시한다. 주소 모달은 필수 두 입력이 있어야 확인으로 닫힌다.

실제 실행한 검사 수·PC/모바일 결과·기존 임시 산출물의 ESLint 영향과 a11y todo 경고는 보고서의 검증 기록을 참고한다. 스토리 추가와 실행 완료를 구분한다.

## 상태 안내의 tone 색상 (2026-10-16)

### Form 오류 상태 전달 조사

FormField는 `invalid || Boolean(error)`를 프로젝트 FormFieldContext.invalid 및 Base UI Field.Root.invalid로 각각 전달한다. 프로젝트 Context의 직접 소비자는 TextInput뿐이며 일반 input·password·multiline textarea 모두 `invalid || field.invalid`로 aria-invalid/data-invalid를 설정한다. boxed의 테두리는 FormField가 소유하므로 자식 TextInput.invalid만 설정하면 외곽 테두리에 역전파되지 않는다. StatusMessage.tone은 이 Context와 연결되지 않는다.

네이티브 Select는 자체 invalid prop만 읽고 부모 Context를 소비하지 않는다. Checkbox(단일/그룹), Radio, RatingInput, SizeSelector, RangeInput, NumberStepper는 내부 Base UI가 Field Context를 읽어 오류 접근성 상태를 전달받지만 프로젝트 스타일에 오류 색상 규칙이 없다. Dropdown도 Base UI 상태는 전달받으나 빨간 테두리와 내부 오류 문구는 자체 error prop에만 의존한다. Terms의 hasError는 자체 invalid/error만 읽는다. Fieldset·SegmentedControl·EmailSignupField는 오류 Context를 소비하지 않으며 SearchField의 내부 TextInput은 상속되지만 검색 외곽 테두리에 오류 스타일은 없다. FormField.Message를 자식 슬롯으로 추가하는 것만으로 부모의 hasError가 설정되지는 않는다.

조사 근거는 해당 컴포넌트 소스와 설치된 `node_modules/@base-ui/react`의 Field/Checkbox/RadioGroup/Select/Slider/NumberField 구현이다. Base UI의 Checkbox·CheckboxGroup·RadioGroup·Select·Slider·NumberField를 invalid Field.Root 안에서 서버 렌더링해 aria-invalid/data-invalid 출력을 확인했다. 전체 조합의 브라우저 검증을 의미하지 않는다. 로그인의 연결 수정은 [상태 문서](state.md)에 기록한다. Login Error 스토리는 `var(...)` 표현 자체와 계산된 rgb를 비교하지 않고, `--colors-red-100`의 실제 값을 읽어 toHaveStyle에 전달한다. CSS 변수 누락도 검사하며 필드 상속 실패와는 구분한다.

`StatusMessage`는 Panda CSS의 `data-tone` 선택자로 error는 의미 토큰 `error`(#A60000), success는 #16794b, info는 `text.subtle`(#4D4D4D)을 적용한다. 속성만 출력하던 기존 구현에는 색상 규칙이 없어 로그인 Error 안내가 기본 검정색으로 표시됐다. 호출자의 className은 함께 유지하고 오류의 alert/assertive, 나머지의 status/polite 및 aria-atomic 계약은 유지한다.

Atoms/StatusMessage의 세 tone과 Login의 Error·MobileError에 실제 적용 색상 검사를 둔다. Panda 생성, 타입 검사, 변경 파일 ESLint와 Storybook production build를 통과했다. 브라우저에서 로그인 PC·모바일 플랫폼의 error 색상 rgb(166, 0, 0)을 확인했고 MobileError play의 콘솔 오류가 없었다. 캡처의 ProductColorSelector heading 오류는 로그인과 다른 스토리의 검사이며, 현재 Desktop 스토리를 직접 열었을 때 h2와 두 번째 컬러 선택을 확인했고 콘솔 오류는 재현되지 않았다. 과거 오류의 발생 원인은 확정하지 않는다.

## 주문 상태 조회 링크

2026-10-16 OrderStatusTracker의 “전체 보기 →” Typography에 tertiary tone을 명시했다. body5 타입과 기존 링크 경로·주문 상태 목록은 유지한다. 타입 검사·변경 TSX ESLint 통과. Prettier는 이 파일의 CRLF 줄바꿈 기준으로 통과했으며 브라우저 시각 검증은 수행하지 않았다.

## Typography 스타일 미적용 옵션

2026-10-16 `variant` prop의 기본값을 `unstyled`로 지정했다. variant 및 해당 플랫폼의 web/mo를 생략하면 recipe를 적용하지 않고 네이티브/상위/호출자 스타일을 사용한다. web/mo가 있으면 기존 플랫폼 선택 순서대로 우선한다. 기존 기본 body 타입이 필요한 호출자는 `variant="body"`를 명시해야 하며, unstyled에서는 weight·언어별 타입 스타일을 생략하고, 명시한 tone만 독립적으로 색상을 적용한다(2026-10-19 보완). 타입 검사·변경 파일 ESLint·Storybook production build를 통과했다. 전체 호출 화면의 시각적 동일성을 검증한 것은 아니다.

2026-10-16 `Typography`에 `unstyled` variant를 추가했다. 현재 플랫폼의 web/mo와 variant에서 선택한 값이 unstyled이면 typography recipe를 생략해 weight·언어별 타입 스타일을 적용하지 않는다. 2026-10-19부터 명시한 tone은 색상 전용 recipe로 적용하며, tone 생략 시 색상 선언도 추가하지 않는다. 호출자의 className·네이티브 속성·자식과 as 태그는 유지한다. 기존 variant와 플랫폼별 선택 순서는 유지한다.

## 상품 상세 컬러 선택 배치 수정 (2026-10-16)

ProductColorSelector는 PC에서 `repeat(auto-fill, 80px)` 그리드로 영역 너비에 맞춰 줄바꿈하고, 모바일에서만 flex 한 줄·가로 스크롤을 사용한다. 썸네일 80×53px, 항목 간격 8px, 선택 밑줄·focus 표시, 모바일 너비 확장과 오른쪽 여백은 유지한다. 공통 Radio의 기본 `display: grid`·gap=4와 원자 유틸리티 생성 순서가 충돌하지 않도록 `&[role="radiogroup"]`에 display·열 정의·간격을 지정하고 모바일 display를 같은 선택자에서 분기한다. 공통 Radio나 발볼 선택기의 스타일은 변경하지 않는다.

기존 PC/모바일 스토리에 배치·80×53px 크기·8px 간격·선택 변경 확인을 위한 play 함수를 추가했다. PC는 여러 행과 가로 넘침 없음, 모바일은 한 행과 내부 스크롤을 검사하도록 구성한다. Panda 생성·타입 검사·변경 파일 ESLint·Next.js production build·Storybook build와 OKF 작업 트리 매핑 검사를 통과했다. 생성 CSS에서 PC 열 정의와 모바일 한정 display 분기를 확인했다. 사용 가능한 브라우저가 없어 play 함수의 실제 실행과 화면 조작 검증은 수행하지 않았다.

## 확인 버튼 하나를 가진 팝업 (2026-10-16)

커밋 전 검증(Codex): 기본 `npm run lint`는 기존 `.tmp-storybook-*` 생성 산출물을 포함해 실패했다. `npm run lint -- --ignore-pattern ".tmp-*/**"`로 임시 산출물을 제외한 전체 린트를 통과했다. 생성 파일과 ESLint 설정은 변경하지 않았다. 스테이징된 소스·문서에 대해 `npm run okf:check`도 통과했다.

`molecules/SingleActionDialog`는 `ModalDialog`의 footer에 primary 확인 버튼 하나를 구성한다. `ModalDialogProps`에서 footer를 제외한 표시 계약과 `onConfirm`, 기본값이 확인인 `confirmLabel`을 받는다. `confirmButtonProps`는 short/tall 크기, fullWidth, density, disabled, className만 허용하며 버튼 variant와 클릭 콜백은 공용 계약으로 유지한다. 이 래퍼는 자동으로 모달을 닫지 않는다. 확인은 `onConfirm`만 실행하고, 헤더 닫기·ESC·바깥 영역 닫기는 기존 `onOpenChange`를 사용한다.

AlreadyRegisteredModal은 short/fullWidth 버튼을, MarketingConsentSummaryModal은 기본 크기/fullWidth 버튼을, AddressSearchModal은 기본 버튼을 사용하도록 이전했다. 두 계정 안내의 확인 콜백과 주소 모달의 `onOpenChange(false)`를 유지한다. 새 DOM 래퍼를 추가하지 않아 ModalDialogFooter의 직접 버튼 너비와 모바일 표시 계약이 동일하다. TermsDialog도 SingleActionDialog를 사용하며 tall/fullWidth 확인 버튼, 확인 시 닫기, 모바일 fullscreen·scrollFade와 버전 전환 버튼은 유지한다. 나머지 기능별 footer는 이번 변경 범위에 포함하지 않는다.

공용 Storybook은 기본·short/fullWidth·사용자 문구·disabled·controlled 상호작용·모바일 사례를 제공한다. play 함수는 확인 콜백과 자동 닫기 없음, 헤더/ESC 닫기에서 확인 콜백 미호출을 검증하도록 작성했다. 브라우저가 없어 play 함수는 실행하지 않았으며 타입 검사·변경 범위 ESLint·Panda 생성·Next.js production build·Storybook 빌드와 OKF 작업 트리 매핑 검사를 통과했다.

## 대분류 간 공용 팝업 (2026-10-16)

기능별 독립 모달 분리 이후, 사용자 승인 범위에 따라 공용 표현과 업무 정책을 구분했다.

- `molecules/ConfirmDialog`는 공통 `ModalDialog` 위에 확인·취소 액션을 구성한다. `title`, `children`, `closeLabel`, 크기·모바일 표시 옵션, 버튼 문구와 `onConfirm`을 받는다. 취소는 `onOpenChange(false)`만 호출하고 확인 후 닫기·삭제·로그아웃 등은 부모가 결정한다. `fullWidthActions`는 기존 HStack 전체 너비/gap=2 배치와 직접 버튼 footer 배치를 보존한다. 배송지 삭제·재입고 취소·탈퇴 확인과 공용 LogoutDialog가 사용한다.
- `organisms/Address/AddressSearchModal`은 회원가입에서 공용 영역으로 이동했다. 회원가입과 마이페이지 배송지 추가/수정이 동일한 controlled 값/콜백 API를 사용한다. 마이페이지의 우편번호 버튼은 고정 목 주소를 주입하는 대신 팝업을 연다. 팝업 입력은 부모 draft에 즉시 반영되고 확인·닫기에서 입력을 롤백하지 않는다. `idPrefix`로 호출부별 label/id를 구분한다. 실제 주소 검색 서비스는 여전히 연결하지 않았으며 수동 입력 미리보기다.
- `organisms/Account/LogoutDialog`는 MyPage 접두사를 제거한 공용 로그아웃 확인 표현이며 실제 로그아웃은 MyPage가 처리한다. `AlreadyRegisteredModal`도 가입 폴더에서 Account로 이동했고 기존 PhoneVerificationPage 호출을 연결했다. 두 팝업의 현재 업무 호출부는 각각 한 곳이며 다른 진입점의 미래 사용을 이미 구현한 것으로 간주하지 않는다.
- `organisms/Account/MarketingConsentSummaryModal`은 `open`, `items: readonly { label, value }[]`와 닫기·확인 콜백을 받는다. 회원가입의 동의값 문자열 변환과 통합 SMS·카카오 항목은 기능 내부 어댑터가 담당한다. 공용 컴포넌트는 RegistrationContent 타입에 의존하지 않으며 별도 채널 표시도 지원한다. 마이페이지 저장 흐름에 새 안내를 추가하지 않았다.
- `organisms/Terms/TermsDialog`는 제목·표시 레이블·본문 children·선택 날짜 문구와 선택적인 `version: { previous, onChange }`를 받는다. 본문 article·모바일 fullscreen·scrollFade·footer 확인은 공용 표현에, 임시 약관 내용과 이전 약관 준비 안내·일자는 SignupTermsDetail에 남긴다. 약관 문구·날짜의 실제 서비스 연동은 추가하지 않았다.

새 공용 팝업 6종은 `src/stories/components/`에 대응 스토리를 둔다. 확인·취소/ESC, 주소 입력/다시 열기, 동의내역 확인, 약관 버전 전환을 위한 play 함수를 추가했고 PC·모바일 사례를 제공한다. AlreadyRegistered 스토리 이동에 맞춰 IA 링크를 `organisms-account-alreadyregisteredmodal--default/mobile`로 갱신했다.

검증(Codex): Panda 생성, 타입 검사, 변경 TSX ESLint, Next.js production build, Storybook build와 기존 계정 복구/App Router 테스트 5개 통과. 이 세션에는 사용 가능한 브라우저가 없어 play 함수와 화면 상호작용은 실행하지 않았다. 빌드 성공을 브라우저 검증으로 기록하지 않는다.

2026-10-16 표시 옵션 커밋 전 검증(Codex): 타입 검사·Carousel 폴더 ESLint·Prettier·Storybook 빌드 통과. 이번 커밋 작업에서 브라우저 상호작용 검증은 추가 실행하지 않았다. Storybook 빌드는 의존성의 use client 지시문·청크 크기 관련 경고를 출력했으나 완료됐다.

2026-10-16 CarouselPagination의 `size` prop은 기본 점의 너비·높이를 설정하며 기본값은 `5px`이다. 문자열 또는 숫자(px)를 받고 비활성 너비 애니메이션에도 적용한다. 활성 항목의 21px 너비와 사용자 정의 `renderItem`은 유지한다.

2026-10-16 CarouselScrollbar의 `h`·`mt` props는 높이·위쪽 여백을 설정하며 기본값은 `20px`·`24px`이다. 숫자는 px로 처리하고 내부 수평 트랙에도 같은 높이를 적용한다. 공개 `CarouselViewport`의 `scrollbarHeight`·`scrollbarMarginTop` props로 전달할 수 있다. 기존 표시 조건·Swiper 동기화는 유지한다.

2026-10-16 CarouselControls의 `iconName`·`iconSize` props는 양쪽 화살표의 Icon name·size를 설정하며 기본값은 `carousel-arrow`·`48px`이다. `iconSize`는 문자열 또는 숫자(px)를 받으며 버튼의 너비·높이에도 CSS 변수로 적용한다. 기존 `className`의 버튼·아이콘 스타일 재정의와 기본 화살표의 이전·다음 방향을 유지한다. `Carousel.tsx`에서 `CarouselControlsProps`도 재export한다.

## 지정 기능의 JSX 이전과 내부 영역 분리 (2026-10-16)

사용자가 지정한 run-club·product·mypage·locales·catalog의 개별 DOM/스타일 영역만 Panda JSX로 옮기거나 기능 내부 구성 요소로 분리했다. 기존 공개 props, 플랫폼 선택, 데이터, URL·선택·삭제 상태와 이벤트 처리 정책은 유지한다. 새 구성 요소는 각 기능 폴더 내부에서 조합하며 새 공용 atom·molecule이나 의존성을 추가하지 않는다.

| 영역                 | 책임 분리와 유지 계약                                                                                                                                                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 런클럽 세션 안내     | `RunClubSessionPoster`가 카테고리별 포스터 제목·일자를, `RunClubSessionGuideContent({ title, rows })`가 안내 문구·Facts·주의사항과 스타일을 소유. 부모 Guide는 전체 배경·1532px 중앙 그리드·PC 2열/모바일 1열 조합 유지                                                                                                              |
| 런클럽 빈 상태·Facts | `RunClubEmptyState`가 role=status, PC EmptyState·모바일 340px 안내를 소유. Facts의 바깥은 Box as=dl, 행은 Box로 이전하고 dt/dd·mobileOnly의 중요도 있는 display 조건 유지. hero/guide의 복합 variant는 기존 cva 유지                                                                                                                 |
| 국가 선택            | `LocalesHeading`이 SVG·localeHeading·PC 92px/모바일 minH=15를 소유. Layout 내용 Box는 1200px 상한·기존 여백 유지. Region은 Box as=section이며 `LocaleRegionHeading({ id, name })`과 `LocaleCountryList({ countries })`를 조합. aria-labelledby·제목 ID·링크/국기 순서·4열/2열 column-count 유지                                      |
| 마이페이지 프레임    | Grid as=main에 기존 180px 사이드바·50px gap·최대 너비·70px/120px 상하 여백과 모바일 block/0 여백을 이전. `MyPageBreadcrumbs`가 기존 prefix와 여백을 소유. 콘텐츠 Box는 minW=0 유지                                                                                                                                                   |
| 상품 내역            | `MyPageProductHistoryHeading`, `MyPageRestockList`, `MyPageProductHistoryGrid`, `MyPageProductHistoryNote`, `MyPageRestockCancelDialog`로 표시 책임 분리. items·liked·pendingCancel과 관심 해제/재입고 취소 삭제는 부모에 유지. 자식은 준비된 데이터와 onLikedChange(id, active), onCancelRequest(id), onClose/onConfirm 콜백만 받음 |
| 상품 상세 배치       | `ProductDetailGrid`가 중앙 구매 그리드를 소유. `ProductDetailSupportRegion({ platform })`을 Media(web)·Panel(mobile)에서 재사용해 지원 안내 노출 위치를 유지. `ProductVariantAction`은 옵션 액션의 baseline·space-between 정렬을 소유. Body는 Box hidden=isViewing 유지                                                              |
| 상품 이미지          | 모바일 슬라이드와 이미지 뷰어의 콘텐츠/뷰어/슬라이드 래퍼를 Grid·Box JSX props와 Panda css prop으로 이전. wrapper·순서·ref·현재 인덱스·이미지 크기·썸네일/페이지네이션·Escape/초점 복원은 유지                                                                                                                                       |
| 배송·반품 안내       | `ProductDetailShippingGuide`, `ProductDetailReturnPrecautions`, `ProductDetailDeliverySupport`, `ProductDetailReturnGuide`로 네 안내 영역 분리. 반복되는 section/h3·번호 목록은 기능 내부 `ProductDetailDeliverySection`/`ProductDetailDeliveryList`로 조합. 문구·리스트·전화/경로 링크·반품 단계·반응형 값 유지                     |
| 상품 목록            | MobileProductFilter의 내용은 Box px=4. DesktopProductSort의 두 wrapper는 Box로 이전하고 onBlurCapture·키보드/포인터 선택 판별 ref와 Radio/Disclosure 계약 유지                                                                                                                                                                       |

재입고 취소 다이얼로그의 취소·확인 액션은 사용자 지적에 따라 `ModalDialog.footer` 슬롯으로 옮겼다. 본문에는 안내 문구만 두고 footer의 HStack은 w=100%·gap=2와 두 fullWidth 버튼을 사용한다. 이 변경은 기존 body 내부 액션 배치를 공통 footer 계약으로 수정하는 의도적인 DOM/간격 변경이며, 위 JSX 이전의 시각적 유지 범위와 구분한다. open·onClose·onConfirm 계약과 삭제 상태는 유지한다.

JSX로 옮긴 단일 사용 클래스는 제거했다. Typography 자체의 타입 스케일과 복합 선택자/variant는 기존 css·cva를 유지하며, inline style 객체나 별도 styles.ts 파일을 추가하지 않았다. 새로운 DOM 래퍼를 추가하지 않고 기존 div/section/main/dl에 대응하는 Panda primitive를 사용한다. 기본/빈 상태/모바일/상세는 기존 기능 스토리에서 검증한다.

검증 (2026-10-16, Codex): 국가 선택·마이페이지 상품내역·상품 목록·상품 상세·런클럽 안내의 변경 전 렌더를 저장해 DOM tag·문구·링크·요소 치수를 비교했다. 국가 선택의 제목 ID 연결과 PC 4열/모바일 2열, 런클럽 정원 행의 mobileOnly·빈 상태 role=status, 관심상품 해제 후 빈 상태, 재입고 취소 다이얼로그의 취소/확인, 상품 정렬의 포인터/키보드/blur, 모바일 필터 열기/적용/닫기, 이미지 뷰어의 본문 숨김·썸네일·Escape·초점 복원과 모바일 갤러리 선택을 확인했다. 타입 검사·임시 생성 폴더 제외 전체 소스 lint·프로덕션 빌드·Storybook 빌드가 통과했다. Storybook은 기존 출력 폴더의 복사 충돌을 피하도록 임시 디렉터리에 빌드했다. 재입고 취소 footer 안의 두 버튼 너비·8px 간격·취소/확인, 분리된 이미지 뷰어 Grid의 gap=0·썸네일 선택·Escape·초점 복원도 확인했다.

## 공통 UI 내부 구성 분리 (2026-10-16)

사용자가 지정한 HomeCarouselSection, MainSection, ProductDetails, SiteHeaderContent와 ProductDetailLayout의 내부 영역을 책임 단위로 분리했다. 기존 공개 props와 호출부는 유지하며 새 구성 요소를 별도 공용 API로 승격하지 않는다. 타입을 공유하는 내부 구성 요소는 부모 props를 type-only `Pick`으로 참조하므로 런타임 순환 의존성을 추가하지 않는다.

| 부모                | 내부 구성 요소                                    | 소유하는 계약                                                                                                                                                               |
| ------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HomeCarouselSection | `HomeCarouselRail`                                | Box의 카드 너비·간격 CSS 변수, WEB 슬라이드 스타일·끝 여백, CarouselViewport props와 내부 `viewportKey` 유지. 부모는 Carousel·MainSection·제목·컨트롤·필터 슬롯 조합을 담당 |
| MainSection         | `MainSectionHeader`                               | HStack의 중앙 너비·모바일 여백·제목 Typography·actionSlot. 부모는 section 컨테이너와 본문 너비 모드·세로 간격을 담당                                                        |
| ProductDetails      | `ProductDetailsIdentity`, `ProductDetailsOptions` | Identity는 프로모션·성별·상품명·가격과 gap=1, Options는 활동·색상/발볼 요약과 gap=0. 부모가 showVariantSummary 조건과 두 영역의 gap=4를 유지. 모든 minW=0·w=100% 계약 유지  |
| SiteHeaderContent   | `SiteHeaderInner`                                 | 중앙 max-width·primary/actions HStack과 그룹 간 정렬. 부모는 header landmark·높이·테두리·배경·WEB/모바일 바깥 여백을 담당                                                   |
| ProductDetailLayout | `ProductDetailBody`                               | hidden=isViewing 래퍼, 최대 1532px 내부 구매 Grid와 그 바깥 footer. viewer는 부모에 남아 hidden 영역 바깥에 표시                                                            |

MainSection의 바깥 section은 Panda `Box as="section"`의 JSX props로 전환했다. 정적 그리드 CSS 변수는 Panda `css` prop에 둔다. SiteHeaderContent는 `Flex as="header"`에 기존 css 선언을 완전히 옮겼고 미사용 header 클래스·css import를 제거했다. ProductDetailBody의 그리드는 Grid JSX props를 사용한다. MainSection의 본문 너비 variant 클래스와 HomeCarouselRail의 복합 슬라이드 선택자는 해당 계약을 드러내는 명명된 css 선언으로 유지한다. 동적 카드 계산용 CSS 변수는 Rail의 기존 style 전달을 유지한다.

DOM 래퍼·순서·landmark·숨김 속성·Typography variant·반응형 값·상태 수명을 바꾸지 않았다. 기존 Carousel와 native 의미 요소를 조합했으며 새 Base UI primitive나 의존성은 추가하지 않았다. 내부 구성 요소는 기존 MainSection·HomeCarouselSection·상품 카드·페이지·헤더 스토리로 검증한다.

검증 (2026-10-16, Codex): 분리 전 Storybook 빌드와 분리 후 렌더를 비교했다. 홈 2560/375px, 상품 목록 375px, 상품 상세 2560/375px의 5개 화면에서 2304개 요소의 DOM tag·role·hidden 및 위치/크기가 0.1px 허용 오차 내에서 동일했다. 캐러셀 play 검사의 정확한 클릭 횟수·끝 정렬·뒤로 이동, 필터 변경 후 rail 초기화, 상품 이미지 뷰어의 본문 숨김·Escape·초점 복원을 다시 확인했다. 타입 검사·임시 생성 폴더 제외 전체 소스 lint·프로덕션 빌드·Storybook 빌드가 통과했다.

## 중앙 그리드와 확장 영역 (2026-10-16)

WEB은 최소 1200px 캔버스와 최대 1532px 중앙 그리드를 사용한다. 좌우 기본 여백은 각각 55px이며, 프레임 너비는 `min(100% - 110px, 1532px)`다. 화면이 커져도 본문·구매 패널·버튼·아이콘의 크기를 viewport에 비례해 확대하지 않는다. 모바일은 기존 플랫폼 조건과 16px 여백을 유지한다.

- 헤더·푸터 내용, 홈 Explore, 상품 목록은 중앙 그리드에 정렬한다. 상품 상세의 바깥 프레임은 전체 너비이며 갤러리·구매 패널을 배치하는 내부 그리드만 너비를 제한한다. 추천 상품은 이 그리드의 형제이므로 `100vw`와 음수 margin으로 탈출하지 않는다.
- 홈 Hero 이미지는 전체 너비, 기존 500px 최소·816px 최대 높이와 `object-fit: cover`를 유지한다. 캠페인 문구·버튼은 중앙 그리드에 정렬한다. 큰 화면에서는 이미지 상하가 더 크롭될 수 있다.
- 런클럽 세션 안내의 배경은 전체 너비, 내부 내용은 최대 1532px다. 신청 Hero는 기존의 더 좁은 1340px 상한을 유지한다.
- `MainSection.contentWidth`에 `extended`를 추가했다. 제목은 중앙 그리드에 두고 내용은 그리드 왼쪽에서 바깥 프레임 오른쪽 끝까지 확장한다. 기존 `contained`·`fullBleed`도 유지한다. inline-size query container와 `cqw`를 사용하므로 브라우저 스크롤바 너비나 WEB 최소 캔버스와 `100vw`의 차이로 넘치지 않는다.
- `HomeCarouselSection`은 WEB에서 extended 프레임과 공통 카드 계산을 소유한다. 카드 크기는 중앙 그리드 너비·표시 개수·좌우 gutter로 결정하며, Swiper 뷰포트는 확장 영역의 실제 너비를 사용한다. WEB 슬라이드는 카드 오른쪽에 전체 카드 간격을 두어 첫 슬라이드부터 동일한 간격으로 snap한다. 마지막 슬라이드는 카드 간격 대신 중앙 그리드 바깥 여백을 오른쪽 padding과 너비에 포함한다. 끝까지 이동하면 마지막 카드 오른쪽이 제목/컨트롤 프레임 오른쪽에 정렬되며, 여백만큼 추가 클릭하는 단계가 생기지 않는다. 단일 카드는 padding을 생략한다. 모바일 gutter와 기본 CarouselViewport의 양쪽 gutter 계약은 유지한다. `slideClassName`은 모바일 카드 크기용이며 `railClassName`과 함께 선택 사항이다.
- 홈 Category·Best sellers·Find my HOKA, 상품 상세 추천, 런클럽 추천이 같은 프레임을 사용한다. 데이터·필터·URL·상품 동작은 각 기능에 남긴다. 기존 Typography·Carousel·Base UI 기반 FilterTabs를 재사용하며 새 인터랙션 primitive나 의존성을 추가하지 않는다.
- Best sellers와 Find my HOKA는 `createHomeCarouselPreviewItems`로 테스트용 항목 12개를 표시한다. Best sellers는 필터에 맞는 상품을 최대 12개 사용하며 부족하면 순환 반복한다. Find my HOKA도 기존 5개 카드를 반복한다. 빈 배열은 그대로 비우며, 반복 항목의 React key는 원본 식별자와 위치를 결합하고 원본 링크·상품 ID를 변경하지 않는다. 이 데이터 보충은 홈 wireframe 검증용이다.
- 모바일 상품 카드의 정보·옵션 부모에 `minW=0`, `w=100%`를 적용하고 옵션 스크롤 행의 너비를 부모 안으로 제한했다. 썸네일 개수가 많아도 페이지를 밀어내지 않고 행 내부에서 스크롤한다.

끝 정렬 후속 검증 (2026-10-16, Codex): 2560px에서 중앙 그리드 시작 514px·끝 2046px에 첫/마지막 카드를 맞췄다. `EndAlignedToGrid` play 검사는 중앙 그리드에 표시하는 개수를 제외한 정확한 클릭 횟수 안에 끝에 도달하고 다음 버튼이 disabled 되는지, 이전 버튼으로 같은 횟수 이동하면 시작 정렬과 disabled 상태로 복귀하는지를 확인한다. 끝 여백을 별도 카드나 추가 snap으로 취급하지 않는다. 1200·1920·2560·3840px의 홈에서 Best sellers 7회·Find my HOKA 8회 이동 직후 끝 정렬과 다음 버튼 disabled를 확인했으며, 실제 Next 앱 2560px에서도 같은 클릭 횟수와 끝 좌표 2046px를 확인했다.

Storybook은 2560·3840px 프리셋과 홈·목록·상세·런클럽 상세의 대형 화면 스토리를 제공한다. HomeCarouselSection에는 4/5열, 대형 화면, 단일 항목, 빈 항목, 모바일 스토리가 있다. 모든 스토리는 `src/stories/`에 둔다.

검증 (2026-10-16, Codex): Edge headless에서 홈·상품 목록·상품 상세·런클럽 상세를 375·768·1200·1600·1920·2560·3840px로 렌더해 28개 화면의 페이지 가로 넘침과 WEB 중앙 프레임·헤더·캐러셀 정렬을 측정했다. 1920·2560·3840px에서 Best sellers·Find my HOKA 각 12개 항목, 마우스 드래그와 좌우 컨트롤을 확인했다. 끝 정렬 기준은 후속 수정으로 화면 끝에서 중앙 그리드 끝으로 변경했다. 공통 캐러셀의 단일/빈 항목 컨트롤 비활성화, 필터 변경 시 위치 초기화, 상품 이미지 뷰어의 초점·Escape·복원도 확인했다. 실제 Next 앱의 900px 뷰포트에서 WEB 캔버스 1200px와 레일 55~1200px를 측정했다. 타입 검사·프로덕션 빌드·Storybook 빌드가 통과했다. 기본 lint는 기존 `.tmp*/`의 생성 번들을 검사해 실패했으며, `npm run lint -- --ignore-pattern '.tmp*/**'`는 통과했다.

## 푸터 레이아웃과 모바일 메뉴 (2026-10-16)

브랜드 로고 너비는 PC 104px·모바일 115px이며 높이는 비율에 따라 자동 결정한다. 모바일 메뉴 제목의 세로 여백은 spacing 5, 펼친 패널은 위 0·왼쪽 spacing 7·아래 spacing 4, 링크 간격은 spacing 2를 사용한다. Accordion은 여러 그룹을 동시에 펼칠 수 있다. 사업자 제목은 PC body3·모바일 body4, 모바일 정보 간격은 12px이며 사업자정보확인 링크에 밑줄과 4px 오프셋을 지정한다. Shop 링크는 매장 찾기·본디·클리프톤·스피드고트·마파테·호파라로 구성한다. PC 푸터 여백은 세로 96px·가로 32px로 명시한다.

커밋 전 검증(Codex): 타입 검사·푸터 ESLint·Panda 생성 통과. Prettier 기본 검사는 LF/CRLF 차이로 경고를 보고했으며, 줄바꿈을 각 파일에 맞추면 포맷 차이가 없다. 브라우저 시각·Accordion 동작 검증은 이번 커밋 작업에서 수행하지 않았다.

## 헤더 회원 혜택 배너

2026-10-16 fade·단일 항목 변경 검증(Codex): 타입 검사·변경 TSX ESLint·Prettier·Panda 생성·Storybook 빌드 통과. 이번 작업에서 Storybook play의 브라우저 실행은 수행하지 않았다.

2026-10-16 단일 데이터 처리: `HeaderPromotionCarousel`은 items가 1개면 Carousel·Swiper·Nav를 생성하지 않고 정적 중앙 콘텐츠를 렌더링한다. Nav 공간 없이 좌우 8px 여백만 사용하며 링크·버튼 종류별 배치는 유지한다. 0개면 콘텐츠를 렌더링하지 않고 2개 이상이면 순환 fade를 사용한다. 현재 데모 데이터는 나머지 항목을 주석 처리해 1개를 표시한다. `PromotionNavigation` play는 단일 항목의 문구·Swiper 미생성·Nav 숨김과 다중 항목의 순환을 데이터 개수에 따라 검사한다.

2026-10-16 전환 효과: `HeaderPromotionCarousel`은 `CarouselViewport effect="fade"`를 사용한다. Viewport의 기본값은 `slide`이며 fade는 Swiper EffectFade·전용 CSS와 `fadeEffect.mode="cross-fade"`를 사용한다. fade에서는 한 항목씩 표시하고 자유 이동·슬라이드 간격·모바일 끝 여백을 비활성화한다. 헤더의 좌우 이동 버튼·순환·활성 문구 너비 측정은 유지한다. `PromotionNavigation` play에 fade 클래스와 전환 후 활성 슬라이드 opacity 검사를 추가했다.

2026-10-16 콘텐츠 타이포·정렬 수정: 안내 문구는 PC `body3`·모바일 `body5`, 링크는 PC `textLink2`·모바일 `textLink3`를 명시한다. `memberBenefits`의 VStack에만 `justifyContent="center"`를 적용하고, `details`에는 `undefined`를 전달해 기본 정렬을 사용한다. Panda의 `justifyContent` 타입은 `null`을 허용하지 않는다. 커밋 전 타입 검사·해당 파일 ESLint·Prettier·Panda 생성을 통과했다. 이번 작업에서 브라우저 시각 검증은 수행하지 않았다.

2026-10-16 Nav 간격 수정: 960px까지 확장하던 프레임을 현재 슬라이드 콘텐츠 너비에 맞췄다. 내부 `PromotionCarouselFrame`이 Carousel의 activeIndex와 콘텐츠 ref를 사용하고 ResizeObserver로 문구·폰트·컨테이너 변경을 반영한다. 좌우 32px 버튼과 콘텐츠 사이 간격은 각각 35px, 외곽 여백은 각각 8px다. 콘텐츠는 max-content 너비·중앙 정렬이며 배너의 inline-size 컨테이너 기준으로 사용 가능한 폭을 제한한다. 슬라이드 overflow를 숨겨 너비 변경 후 인접 문구가 비치는 것을 막는다. PC·375px·320px 모바일에서 좌우 35px 간격과 중앙 오차 0.01px 미만을 브라우저로 확인했다. 타입 검사·변경 파일 ESLint·Panda 생성을 통과했다.

2026-10-16 데모·Nav 검증(Codex): 타입 검사·변경 파일 ESLint·Prettier·Panda 생성·Storybook 빌드 통과. 브라우저에서 `PromotionNavigation` play로 4개 슬라이드의 정방향 순환·첫 항목에서 이전 이동·버튼 종류별 row/column 배치를 확인했다. 별도로 375px 모바일 기본 슬라이드의 문구와 좌우 버튼 표시를 확인했다.

2026-10-16 Carousel 구성은 같은 폴더의 내부 `HeaderPromotionCarousel`로 분리했다. 이 컴포넌트가 뷰포트·슬라이드 스타일과 4개 콘텐츠·순환 설정을 소유하며, `HeaderPromotionBanner`는 외곽 레이아웃과 `buttonType` 전달만 담당한다. 분리 과정에서 DOM·슬라이드 개수·동작·스타일은 유지했다.

2026-10-16 배너 콘텐츠는 `headerPromotionData.ts`의 서로 다른 데모 문구 4개를 순회해 렌더링한다. 각 항목은 id·message·href·buttonType을 가지며 `HeaderPromotionCarousel`의 `items` prop으로 교체할 수 있다. 슬라이드는 너비 100%·중앙 정렬이며 50px 배너 안에서 하나씩 표시한다. `loop`·snap 전환(`freeMode={false}`)을 사용하고 스크롤바는 숨긴다. 공통 `CarouselControls`를 배너 양 끝에 32px 버튼·24px 흰색 화살표로 배치한다. 공통 컨트롤은 `className`을 받고 순환 모드에서는 항목이 2개 이상일 때 양쪽 버튼을 활성화한다. 자동 재생은 설정하지 않는다.

2026-10-16 배너 외곽은 `HStack as="aside"`로 표현한다. 기본 가로 배치·세로 중앙 정렬을 사용하고 높이·간격·배경은 JSX 스타일 props로 지정한다. 흰색 글자의 기존 `&&` 명시도는 `css` prop으로 유지한다.

2026-10-16 구성 분리: `HeaderPromotionBanner`는 aside와 배너 외곽 스타일을 담당하고, 같은 폴더의 내부 구성 `HeaderPromotionContent`는 안내 문구·상세 링크·버튼 종류별 배치를 담당한다. `details`는 `HStack`·gap 4·“자세히 보기”, `memberBenefits`는 `VStack`·gap 0·“회원 혜택 자세히 보기”를 선택한다. 기본 배너는 데이터의 버튼 종류를 사용하고 배너의 선택적 `buttonType` prop으로 전체 슬라이드를 덮어쓸 수 있다. 플랫폼과 무관한 계약이며 Typography·링크 색상은 유지한다.

`SiteHeader`는 PC와 모바일 모두 같은 데모 데이터를 표시한다. 배너는 50px 높이를 유지하고 Carousel 내부 프레임은 현재 콘텐츠 너비에 맞춰 좌우 8px 여백을 사용한다. 모바일 안내와 링크는 12px Typography를 사용한다. 안내 문구와 경로는 데이터에서 받고 링크 문구와 가로·세로 배치는 버튼 종류에 따른다. 데모 링크는 모두 기존 `/products` 경로를 사용한다.

사용자 제공 이미지와 Figma 노드 `362:44160`을 구현 요청의 출처로 기록한다. Figma 연결은 재인증 오류로 상세 조회하지 못했으며, 첨부 이미지와 기존 스타일 기준으로 구현했다. 320px·375px Storybook 모바일 배너에서 가로 넘침 없음과 50px 높이를 확인했고, PC에서 row 방향·16px 간격·50px 높이를 확인했다. TypeScript 검사, 변경 파일 ESLint와 Panda 생성을 통과했다. Figma 원본 수치와의 일치 검증은 수행하지 않았다.

## 고객센터 메인 (2026-10-16)

고객센터 공통 소개 영역은 데스크톱에서 최대 1200px 폭과 좌우 34px 패딩을 사용한다. 모바일에서는 바깥 페이지의 16px 여백을 그대로 사용한다. 출처는 작업 트리의 `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`다.

고객센터 메인의 공지사항 미리보기는 제목 아래 `black.100` 1px Divider와 각 공지 행 아래 `black.20` 1px Divider를 사용한다. 출처는 작업 트리의 `src/shared/features/support/SupportPage.tsx`와 Figma 고객센터 메인 노드 `327:5231`이다.

`CustomerCenterLayout`은 고객센터 메인과 하위 화면이 공통으로 쓰는 Breadcrumb, 소개 영역, 좌측 메뉴, 본문 배치를 소유한다. 페이지마다 breadcrumb 경로와 활성 메뉴를 전달하므로 `/support`와 `/support/faq`는 독립 라우트로 유지된다. `Breadcrumb`은 기존 공통 molecule을 재사용한다. `SupportContactCard`는 반복되는 고객상담실·온라인 스토어 카드의 제목·문의 설명·전화번호 슬롯을 갖는다. 화면 본문의 간격·크기·배치는 Panda JSX props를 사용하며, 전화 링크 밑줄은 모바일에서만 보인다. 데스크톱 FAQ teaser는 첫 항목을 펼치고 모바일은 FAQ 링크 버튼을 표시한다. 공지 행은 PC 69px·모바일 51px 높이로, 날짜는 PC body4·모바일 body5로 표현한다. 공지 데이터는 화면 시안용 정적 데이터이며 각 행은 기존 공지 상세 데모 경로로 연결된다. 사이드 메뉴의 동일 주소 항목은 고유 React key를 쓰며 활성 상태를 별도 지정할 수 있다. 고객센터·FAQ의 PC와 모바일을 각각 제공하는 route story가 이 레이아웃을 검증한다. 출처는 작업 트리의 `src/shared/features/support/SupportPage.tsx`, `SupportContactCard.tsx`, `support.navigation.ts`, `src/shared/features/faq/FaqPage.tsx`, `faq.data.ts`, `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`, `src/shared/components/organisms/Navigation/SideNavigation/SideNavigation.tsx`, `src/stories/features/support/SupportPages.stories.tsx`와 Figma 고객센터 메인 노드 `327:5231`이다.

## FAQ (2026-10-16)

FAQ 카테고리 선택은 공통 `FilterTabs`의 `line` 변형을 사용한다. PC는 Figma 노드 `1056:42189`의 24px 탭 간격·CTA1 글자·선택 항목 2px 밑줄을 따르고, 모바일은 가로 스크롤과 CTA2 글자·하단 경계선을 유지한다. `FaqControls`는 카테고리 데이터와 선택 변경만 전달하며 탭 CSS를 소유하지 않는다. 출처는 작업 트리의 `src/shared/components/atoms/FilterTabs/FilterTabs.tsx`, `src/shared/components/molecules/Faq/FaqControls.tsx`, `src/stories/components/atoms/FilterTabs/FilterTabs.stories.tsx`와 Figma 노드 `1056:42189`다.

`SearchField` 안의 `TextInput`은 포커스 시 별도 outline을 표시하지 않고 검색창의 기존 테두리만 유지한다. 출처는 작업 트리의 `src/shared/components/molecules/SearchField/SearchField.tsx`다.

FAQ 검색 영역은 공통 molecule `SearchField`를 사용한다. 입력값과 검색 동작을 호출자가 전달하며, 검색창은 데스크톱에서 돋보기를 오른쪽에, 모바일에서 왼쪽에 배치한다. `FaqControls`는 검색창 최대 폭 590px과 주변 간격만 소유한다. 출처는 작업 트리의 `src/shared/components/molecules/SearchField/SearchField.tsx`, `src/shared/components/molecules/Faq/FaqControls.tsx`, `src/stories/components/molecules/SearchField/SearchField.stories.tsx`다.

`FaqList`의 섹션 상단선과 답변 배경·패딩·줄바꿈·문단 여백은 Panda Box 속성으로 표현한다. Accordion이 클래스만 받는 항목 경계선·질문 버튼 상태·아이콘 크기만 컴포넌트 내부 CSS에 남긴다. 출처는 작업 트리의 `src/shared/components/organisms/Faq/FaqList.tsx`다.

`FaqPage`는 별도 URL을 유지하면서 `CustomerCenterLayout`의 공통 breadcrumb·소개·사이드 메뉴를 사용한다. PC에서는 첫 질문을 열고 모바일에서는 닫아 둔다. 검색은 질문과 답변을 함께 필터링하고 카테고리 탭은 Figma의 8개 항목을 사용한다. 처음 10개를 표시하며 답변과 검색 데이터는 화면 시안용 정적 데이터다. 고객센터 메인의 FAQ teaser도 기존 `FaqList`를 재사용한다. 간격·패딩·정렬은 Panda JSX props, 검색 필드·밑줄 탭·아코디언 경계처럼 세부 시각 규칙은 컴포넌트의 Panda CSS로 표현한다. 출처는 작업 트리의 `src/shared/features/faq/FaqPage.tsx`, `src/shared/features/faq/faq.data.ts`, `src/shared/components/molecules/Faq/FaqControls.tsx`, `src/shared/components/organisms/Faq/FaqList.tsx`, `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`와 Figma 노드 `991:23024`, `991:23094`, `999:5639`이다.

## 공지사항·1:1 문의 (2026-10-16)

1:1 문의의 `InquiryCautions`는 펼쳤을 때만 제목 아래 구분선을 추가하고, 닫혔을 때는 바깥 위·아래 선만 표시한다. 제목은 좌우 16px, 목록은 상하 24px의 간격을 사용하며 화살표 아이콘은 subtle 텍스트 색상 토큰을 따른다. 공통 `Accordion` 동작은 유지한다. 문의 접수완료 상태는 `SupportPages.stories.tsx`의 데스크톱 `InquiryPendingDesktop`과 모바일 `InquiryPendingMobile375`로 확인할 수 있다. 출처는 작업 트리의 `src/shared/features/support/InquiryCautions.tsx`, `src/stories/features/support/SupportPages.stories.tsx`와 사용자 제공 화면 이미지다.

`/support/after-sales`는 Figma 모바일 `803:25138`과 PC `1066:57459`에 따라 배송 및 반품안내 화면을 표시한다. 공통 `CustomerCenterLayout`의 PC 소개·좌측 메뉴와 모바일 breadcrumb를 재사용하고, 본문에는 제목·세 항목 탭·배송 안내 네 문장을 둔다. 탭은 Base UI Tabs를 사용한다. 아직 내용이 확인되지 않은 `반품 주의사항`과 `상품 반품 안내` 탭은 선택을 비활성화했다. 헤더·푸터 자산은 기존 공통 레이아웃을 재사용한다. 출처는 작업 트리의 `src/shared/features/support/ShippingReturnsPage.tsx`, `src/shared/features/support/support.navigation.ts`, `src/stories/features/support/SupportPages.stories.tsx`와 해당 Figma 노드다.

공지사항 목록은 첫 행 위에 `black.20` 1px Divider를 두고, 펼친 행은 제목과 내용 사이에도 같은 구분선을 둔다. 출처는 작업 트리의 `src/shared/features/notices/NoticesPage.tsx`다.

공지사항 목록은 PC 제목 아래 `black.100` 2px Divider, 각 60px 행 아래 `black.20` 1px Divider를 사용한다. 모바일에서는 상단의 진한 선을 숨기고 56px 행마다 회색 구분선을 둔다. 제목·날짜는 각각 화면 크기에 맞는 Typography variant와 tone을 사용하며, 더보기는 표시 페이지/전체 페이지를 함께 보여준다. 출처는 작업 트리의 `src/shared/features/notices/NoticesPage.tsx`와 Figma 노드 `1056:42533`, `991:23590`이다.

문의 등록 화면도 `CustomerCenterLayout`의 고객센터 제목과 소개 문구를 PC·모바일에서 표시한다. Breadcrumb과 좌측 메뉴도 함께 유지한다. 출처는 작업 트리의 `src/shared/features/support/InquiryNewPage.tsx`와 `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`다.

문의 등록의 문의 유형·상세 유형 선택창은 공통 `Dropdown`을 사용한다. 두 선택창은 필수 라벨을 내부에 표시하고 기존 선택값과 2열 배치를 유지한다. 출처는 작업 트리의 `src/shared/features/support/InquiryNewPage.tsx`와 `src/shared/components/atoms/Dropdown/Dropdown.tsx`다.

답변된 1:1 문의 행은 공통 `Accordion`으로 답변을 접고 펼친다. 처음에는 답변을 표시하고, 기존 Q/A 행·상태 배지·PC/모바일 간격을 유지한다. 미답변 행은 펼칠 내용이 없으므로 정적 행으로 표시한다. 출처는 작업 트리의 `src/shared/features/support/InquiryPage.tsx`와 `src/shared/components/atoms/Accordion/Accordion.tsx`다.

`/support/notices`, `/support/notices/[id]`, `/support/inquiries`, `/support/inquiries/new`는 각각 독립 라우트이며 `CustomerCenterLayout`의 breadcrumb·소개·사이드 메뉴를 재사용한다. 공지사항 목록은 PC Figma처럼 행을 펼치는 방식으로, 기존 상세 경로는 모바일 상세 Figma의 행·본문·목록보기 구조로 갱신했다. 1:1 문의는 빈 상태와 접수·답변 상태를 Q/A 구성으로 표현한다. 문의 등록은 분류·제목·내용·첨부·신청인 정보와 취소/등록 액션을 표시하고, 유의사항은 `InquiryCautions`에서 재사용한다. `InquiryCautions`는 공통 `Accordion`을 사용해 처음부터 펼친 상태를 유지하며, 별도 상태·화살표 구현 없이 접고 펼친다. `SupportExperiencePage`에 남아 있던 구형 문의 목록·등록 구현은 제거했다. 공지·문의 본문과 신청인 정보는 시안용 정적 데이터이며 서버 저장 기능은 없다. 출처는 작업 트리의 `src/shared/features/notices/NoticesPage.tsx`, `NoticeDetailPage.tsx`, `src/shared/features/support/InquiryPage.tsx`, `InquiryNewPage.tsx`, `InquiryCautions.tsx`, `src/shared/components/atoms/Accordion/Accordion.tsx`, `SupportExperiencePage.tsx`, `src/stories/features/support/SupportPages.stories.tsx`와 Figma 노드 `885:30279`, `991:23590`, `991:23643`, `932:16817`, `991:28890`, `1003:17104`, `1003:7512`이다.

2026-10-15 메뉴 변경 커밋 전 검증: TypeScript·변경 TSX ESLint·Storybook 정적 빌드·OKF 스테이징 검사 통과. Storybook play의 추가 브라우저 실행은 수행하지 않았다.

`MenuDrawerUtilityLinks`의 아이콘 슬롯은 Flex(span) 24×24px이며 가로 flex-start·세로 center로 16px 아이콘을 배치한다. 텍스트와의 gap은 spacing 2(8px)로 설정해 슬롯 시작부터 텍스트까지 32px를 유지한다.

`MenuDrawerGroups`의 Sale 링크는 빨간색을 링크에서 지정하고 굵기는 자식 Typography의 `weight="medium"`으로 지정한다. 부모 font-weight만 변경하면 body3의 명시적 기본 굵기가 적용되므로 텍스트 API로 제어한다.

`MenuDrawerGroups`의 Accordion 패널은 위쪽 spacing 4(16px), 아래쪽 spacing 6(24px)를 사용한다. Stack 목록은 gap=7(28px)을 사용하고 마진·패딩은 0으로 유지한다.

`MenuDrawerGroups`의 하위 링크 목록은 `Stack as="ul" gap="7"`를 사용하고 목록 마커·기본 패딩·마진을 제거한다. li 의미와 16px 들여쓰기·Sale 색상은 유지하며 링크 간격은 Stack이 소유한다.

`MenuDrawerBackButton`은 IconButton 자체에도 `display: flex`, `alignItems: center`, `justifyContent: flex-start`를 지정해 내부 아이콘·제목이 버튼 왼쪽에 배치되도록 한다. 내부 Flex만 정렬해서는 native button의 자식 배치를 제어할 수 없다.

`MenuDrawerBackButton`은 공통 `IconButton size="auto"`로 아이콘과 제목 전체를 감싼다. local Panda css로 전체 너비·기존 패딩·포커스 표시·투명 hover를 유지하고 내부 Flex가 정렬과 12px 간격을 소유한다. 포커스 ref는 IconButton을 통해 실제 버튼에 전달한다.

`MenuDrawerUtilityLinks`는 Box(nav)·Stack(ul)·styled(Link)·Flex(span) JSX props로 기존 목록·행·아이콘 스타일을 표현한다. 링크 최소 높이는 spacing 9(36px), 목록 gap은 spacing 1(4px), 아이콘 슬롯은 24px이며 safe area를 유지한다. `MenuDrawerBackButton`은 내부 Flex가 정렬·12px 간격을, IconButton과 local css가 패딩·클릭 영역·focus-visible을 소유하며 ref를 native button에 유지한다.

`MenuDrawerNavigation`의 외곽 배치는 Panda `Box` JSX props로 지정하며 상세 33px/기본 48px 하단 여백을 유지한다. 내부 `MenuDrawerBackButton({ label, onBack, buttonRef })`은 뒤로가기 버튼·아이콘·스타일을 소유하고 native button·접근성 이름·ref·클릭 동작을 보존한다.

`MegaMenuAD`는 `styled(Link)`와 Square·VStack·styled.img의 Panda JSX props로 링크·카드·이미지·그라데이션을 표현한다. desktop/mobile presentation에 따라 기존 358px/전체 너비, 패딩·간격·배경과 자식 카드 포커스 표시를 유지하며 Typography의 제목 여백·밑줄은 local css로 지정한다.

`MegaMenuContent({ menu, onClose })`는 PC 메뉴 목록과 광고를 Panda `Grid`로 조합하고 기존 열 너비·간격·최대 너비·상하 여백을 소유한다. `MegaMenuPanel`은 overlay·section 및 Tab 경계 처리를 유지한다.

`MenuDrawerShoppingLinks`의 목록은 `Stack as="ul" gap="0"`로 배치하고 목록 기본 여백·마커를 제거한다. 각 링크/버튼의 가로 정렬과 `py: 4`는 행 스타일에 남겨 기존 클릭 영역을 유지한다.

`MenuDrawerShoppingLinks`는 Best·카테고리·런칭캘린더를 순서가 있는 하나의 목록으로 만든다. `type: 'link' | 'category'`로 이동 링크와 상세 메뉴 버튼을 구분하고 제목·화살표 렌더링을 공유한다. Best는 화살표 없이, 카테고리와 런칭캘린더는 화살표를 표시하며 기존 경로·포커스용 data 속성을 유지한다.

`MenuDrawerShoppingLinks({ menus, onSelectMenu, onNavigate })`는 기본 쇼핑 메뉴의 nav·목록·행 스타일을 소유한다. `MenuDrawerBase`는 이 목록과 광고를 `Stack gap="56px"`로 배치한다. 링크 경로·버튼의 포커스 복귀용 data 속성·콜백은 유지한다.

`MenuDrawerBase({ menus, onSelectMenu, onNavigate })`는 기본 쇼핑 메뉴와 모바일 광고를 소유하며 `<Stack gap="56px">`으로 두 영역의 간격을 정한다. 광고의 개별 margin-top은 사용하지 않는다. `MenuDrawerNavigation`은 기본/상세 분기와 외곽 패딩, 상세 뒤로가기를 유지한다.

## 상품 가격 할인 표시

`ProductPrice`의 `price`는 현재 판매가이며 선택적인 `originalPrice`가 판매가보다 크고 판매가가 0 이상이면 할인 표시를 사용한다. 정상가는 위쪽에 회색 취소선(`del`)으로, 반올림한 정수 할인율은 아래 판매가 왼쪽에 `red80` 색으로 표시한다. 할인 정보가 없거나 정상가와 판매가가 같으면 기존 판매가만 표시한다. 가격 Typography의 PC·모바일 크기와 원 단위 강조를 유지한다. `ProductCard`와 hover 미리보기는 `ProductDetails` → `ProductDetailsIdentity` → `ProductPrice`로 `originalPrice`를 전달한다. 목 상품 `shoe-3`(Daily Motion 3)은 정상가 290,000원·판매가 232,000원의 20% 할인 예시이며, 가격 필터와 정렬은 기존 판매가 `price`를 사용한다. `Molecules/Product Card`의 Discounted 스토리에서도 확인할 수 있다.

`Molecules/Product Price` 스토리에서 일반가·20% 할인(290,000원 → 232,000원)·모바일 할인·동일 가격을 확인할 수 있다.

커밋 전 검증(Codex): 타입 검사, 임시 생성 산출물을 제외한 전체 린트(`npm run lint -- --ignore-pattern ".tmp-*/**"`), 변경 소스 Prettier 검사, Next.js production build·Storybook build와 기존 주문 합계 테스트 3개를 통과했다. 이번 커밋 작업에서 브라우저 상호작용 검증은 실행하지 않았다.

## 상품 카드 상품명 말줄임

ProductDetails의 상품명·성별·가격을 담는 내부 VStack은 w=100%, minW=0으로 카드 너비 안에 제한한다. 부모의 alignItems=flex-start 아래에서 내부 묶음이 긴 상품명의 내용 너비로 확장되면 ProductName의 truncate가 있어도 옆 카드와 겹친다. ProductName의 기존 한 줄 말줄임 스타일을 유지하고 부모 너비를 제한해 HOME 베스트셀러를 포함한 상품 카드에서 적용되도록 한다.

2026-10-15 Codex 검증: HOME의 긴 상품명 너비가 667px에서 카드와 같은 218px로 제한되고 text-overflow=ellipsis, overflow=hidden이 적용되는 것을 브라우저 DOM과 화면으로 확인했다. 변경 파일 ESLint와 TypeScript 검사가 통과했다.

## Components·Features JSX 스타일 점검 (2026-10-15)

`FindAccountContent`는 제목·설명·인증번호 안내·버튼·상태 메시지의 일회성 간격을 `Stack`과 `Box`의 Panda JSX 속성으로 배치한다. 한 자식만 감싸던 필드 `Stack` 두 개는 제거했다. 글자 색상은 기존과 같은 `Typography` tone(`tertiary`, `red80`)을 사용한다. 두 인증 버튼은 공통 `Button`의 기본 `size="tall"`을 사용하며 별도 `density="auto"`로 높이를 덮어쓰지 않는다. 입력값·검증·인증번호 요청/확인 콜백은 변경하지 않았다. 출처는 작업 트리의 `src/shared/features/find-account/FindAccountContent.tsx`다.

로그인·회원가입·계정 찾기·잠금 해제·휴대폰/본인 인증 화면의 `Button`과 `ButtonLink`는 공통 기본 크기가 `tall`이므로 중복 `size="tall"`을 제거했다. `short` 등 별도 크기를 지정한 호출은 유지하며, 버튼 높이·CTA1 글자·기존 동작은 변경하지 않는다. 출처는 작업 트리의 `src/shared/components/atoms/Button/Button.tsx`, 관련 feature 파일들이다.

휴대폰 인증의 알뜰폰 사업자 안내는 사업자 목록만 `ModalDialog` 본문에 두고 확인 버튼을 `footer`에 전달한다. 긴 목록은 본문에서 스크롤되며 공통 푸터가 확인 버튼을 데스크톱 160px·모바일 전체 너비로 배치한다. 출처는 작업 트리의 `src/shared/features/phone-verification/PhoneVerificationContent.tsx`, `src/shared/components/molecules/ModalDialog/ModalDialogFooter.tsx`다.

공통 `ModalDialogFooter`는 직계 버튼 높이를 40px로 지정한다. 데스크톱 버튼 너비 160px과 모바일 전체 너비는 유지한다. 출처는 작업 트리의 `src/shared/components/molecules/ModalDialog/ModalDialogFooter.tsx`다.

계정 잠금 안내 모달의 확인 동작은 공통 `ModalDialog`의 `footer` 슬롯으로 구성한다. 본문은 안내 문구만 담당하고 푸터가 버튼의 크기·정렬을 맡는다. 출처는 작업 트리의 `src/shared/features/account-locked/AccountLockedContent.tsx`다.

`IdConfirmationModal`은 안내 문단 간격과 두 버튼의 너비를 Panda `Box`·`Stack` 속성으로 표현한다. 기존 8px 기본 Stack 간격과 문단의 20px·24px 여백을 유지한다. PC 버튼은 각각 160px이며 두 버튼을 함께 가운데 정렬하고 모바일에서는 전체 너비로 표시한다. 모달 폭은 공통 `ModalDialog`의 `md`(최대 568px)를 사용하고, 모바일은 공통 fullscreen 규칙을 따른다. 이름은 `userName` prop으로 받아 표시하며 값이 없으면 임의의 이름을 넣지 않는다. 제목은 플랫폼에 따라 문자열 하나를 선택하고, 공통 `ModalDialogHeader`가 `body3` 16px로 렌더링한다. 출처는 작업 트리의 `src/shared/features/find-account/IdConfirmationModal.tsx`, `src/stories/features/find-account/IdConfirmationModal.stories.tsx`다.

지정 범위는 `src/shared/components/`와 `src/shared/features/`다. 311개 TSX에서 구조·상태·상호작용·타입 스케일을 검색하고, Panda JSX에 직접 연결된 스타일 사용 122곳을 대조했다. 48개 파일의 일회성 선언 66개를 JSX 스타일 props로 이전했다. 기존 스테이징된 메뉴·FAQ·Typography 작업은 보존했으며 새 공개 컴포넌트나 API는 추가하지 않았다. 이 점검은 모든 기능의 개별 수동 검증 완료를 의미하지 않는다.

| 분류 | 관찰과 반영                                                                                                                                            | 보존·유지 기준                                                                                                                                             |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 개선 | `MenuDrawerHeader`의 header 클래스 → HStack의 `justifyContent`, `minH`, `flexShrink`, `px`, `borderBottom`                                             | `px="4"` = 1rem = 16px, 58px 최소 높이, 닫기 ref와 인증 링크 콜백 유지                                                                                     |
| 개선 | Footer의 프레임·그리드·브랜드·소셜·링크 목록, BottomSheet의 프레임·헤더, HeroCopy·InquiryBoard·Catalog의 단일 사용 클래스 → 기존 Panda JSX props       | DOM·랜드마크·링크·포털·내부 스크롤과 PC/모바일 조건 유지. FooterLegalLinks의 공유 row와 하위 타입 선택자, FooterNavigationWeb의 nth-child 배치는 유지      |
| 개선 | 로그인·계정 복구·가입·상품·런클럽·지원·팀웨어의 단일 사용 배치 → Box/Stack/Grid/Flex 등의 props                                                        | 지역 상태·URL·콜백·필터·데이터 소유자와 레이아웃 조합 API 유지. 일치하는 spacing/sizes 토큰만 사용하며 58px 등 대응 토큰이 없는 값과 복합 값은 유지        |
| 개선 | AccountUnlockCompletePage의 content, FindAccountContent의 fields 간격을 `gap="2"`로 명시                                                               | 기존 css의 gap 16px은 Stack 기본 gap 8px 클래스에 덮여 실제로는 8px이었다. 선언을 그대로 props로 옮기면 16px로 달라져, 브라우저에서 확인한 기존 8px을 유지 |
| 유지 | MenuDrawer의 Frame/Header/Navigation/Groups/UtilityLinks, SiteHeader의 Container/Frame/Content, 로그인·checkout·catalog의 feature-local Layout/Content | 작은 부품은 이미 구조·반응형·표시 책임을 소유한다. 추가 Wrapper나 context, 공용 atom 승격 없이 유지                                                        |
| 유지 | 공유 스타일·recipe, 상품 옵션 상태 선택자, FAQ/리뷰/지원의 하위 선택자, CSS 변수 override, IconButton·Next Link에 전달하는 클래스                      | 네이티브 요소·외부 컴포넌트에는 Panda 스타일 props를 전달하지 않는다. 타이포그래피·아이콘 glyph·동적 스타일을 단순 배치 변환에 섞지 않는다                 |

Typography의 검색 제목 heading9, 메뉴 navigationHeading/navigationHeadingKr, 로그인 loginTitle, 상품 productTitle/productPrice, 런클럽 sessionTitle 등 기존 variant 호출은 유지했다. 직접 타입 선언이 남은 Cart, RunClubSessionNotes/Guide, FooterLegalLinks 등은 부모의 font-family·굵기·행간 상속과 모바일 값을 확인한 후 semantic variant로 이전할 후속 후보다. 크기 하나만 맞춰 body4/body5로 치환하거나 새로운 레이아웃 props에 타입 선언을 숨기지 않았다.

Base UI 공식 전체 [카탈로그](https://base-ui.com/react/overview/quick-start)와 설치된 1.8.0의 공개 exports를 대조했다. Accordion/Collapsible, Drawer/Dialog, Checkbox/Checkbox Group, Radio/Radio Group, Toggle/Toggle Group, Select, Number Field, Slider, Progress, Separator, Button, Field/Fieldset/Form/Input은 기존 공통 래퍼와 네이티브 계약을 유지한다. Navigation Menu/Menu/Menubar는 SiteHeader의 사용자 정의 키보드 탐색, Scroll Area는 Carousel·필터의 측정/스크롤 동작, Alert Dialog는 문의·리뷰 취소 confirm의 후속 후보이며 모두 설치 버전에서 지원하고 업그레이드는 불필요하다. Autocomplete/Combobox/OTP Field/Context Menu/Popover/Preview Card/Switch/Tabs/Toast/Toolbar/Tooltip/Meter/Avatar도 가용성을 확인했으나 새 전환을 정당화하는 독립적인 동작 근거가 없어 도입하지 않았다. 정적 링크를 명령 메뉴나 탭으로 바꾸지 않았다.

구조 후속 후보는 CartPage의 행·합계·추천 영역과 StoreFinderPage의 검색·종류 탐색·결과 영역이다. 추출한다면 같은 feature 폴더에서 준비된 행/합계 또는 필터 값과 명시적인 콜백을 받고, Page가 수량·삭제·필터 상태를 계속 소유해야 한다. 기존 표/폼/링크 의미와 모든 PC/모바일 값을 확인해야 하므로 이번 JSX 스타일 이전과 함께 일괄 추출하지 않았다.

검증: 최종 `npm run panda`(build의 prebuild 포함), `npm run typecheck`, `npm run build`, `npm run lint -- --ignore-pattern '.tmp*/**'`, `npm run okf:check`와 전체 작업 트리 `pendingDocs(false)` 매핑 검사를 통과했다. lint는 기존 임시 Storybook 산출물을 제외한 결과다. 스토리 파일을 추가·변경하지 않아 Storybook 정적 빌드는 다시 실행하지 않았다.

브라우저에서 변경 전후 27개 대표 스토리의 주요 CSS 속성을 비교했고 두 Stack 간격 차이를 수정한 뒤 기존 8px과 일치함을 확인했다. 푸터·로그인·런클럽·MainSection·메뉴·EmptyState·Pagination·ColorFilter·바텀시트·필터·HeroCopy·InquiryBoard·상품 모바일·가입·약관의 21개 스토리는 기록한 요소 크기도 일치했다. 일부 PC 상품·계정 화면의 텍스트 너비는 글꼴 로딩 시점에 차이가 있어 전체 치수 일치를 주장하지 않는다. 별도로 375px 메뉴의 58px 헤더·16px 좌우 여백, Men 전환·단일 Accordion·뒤로가기 포커스·Escape 후 열기 버튼 포커스, 모바일 로그인 흐름의 성공 안내, 비밀번호 재설정 MobileError의 오류 표시, 모바일 푸터의 scrollWidth 375px을 확인했다. 모든 라우트와 Base UI 후속 후보의 동작 검증을 수행한 것은 아니다.

## MenuDrawer 상세 그룹

`MenuDrawerGroups({ columns, onNavigate })`는 MenuDrawer 폴더 내부에서 상세 카테고리의 Accordion·하위 링크·펼침 표시 스타일을 소유한다. 탐색 프레임·뒤로가기와 광고는 `MenuDrawerNavigation`, 선택 상태·포커스 정책은 `MenuDrawer`가 유지한다. 선택 메뉴 ID를 key로 사용해 메뉴 변경 시 첫 그룹의 기본 열림을 초기화한다.

`HeaderAuthLink`의 로그인·구분선·회원가입 사이 간격은 PC에서 Panda spacing `1.5`, `.platform-mobile` 환경에서 `2px`이다.

`MenuDrawerHeader`의 닫기 버튼은 공통 `IconButton`을 사용하며 현재 버튼과 아이콘 크기는 18px이다. 접근성 이름과 기존 포커스 표시를 유지한다. `IconButtonProps`는 `ComponentPropsWithRef<'button'>`을 기반으로 React 19의 ref prop을 내부 Base UI 버튼에 전달한다.

## 코드 배치

| 위치                               | 책임                                           |
| ---------------------------------- | ---------------------------------------------- |
| `src/app/`                         | URL별 페이지와 루트 레이아웃                   |
| `src/shared/lib/`                  | 기기 판별, 이름 검증, 인증 타이머 등 공용 로직 |
| `src/shared/features/`             | 기능별 화면, UI 조합과 정책·정적 콘텐츠        |
| `src/shared/components/atoms/`     | 기본 UI 요소                                   |
| `src/shared/components/molecules/` | 기본 요소를 조합한 UI                          |
| `src/shared/components/organisms/` | 화면 영역 단위 UI                              |
| `src/shared/components/layouts/`   | 공통 페이지 구조                               |
| `src/stories/`                     | Storybook이 탐색하는 스토리                    |

주문/결제 화면(`src/shared/features/checkout/`)은 `FormField`·`TextInput`·`Radio`·`StepIndicator` 등 기존 요소를 조합한 목 화면이며 실제 결제와 연동하지 않는다.

`CarouselViewport`는 `Children.toArray`로 정규화한 슬라이드 목록을 기준으로 첫·마지막 슬라이드 여백을 정하므로 `null` 자식은 슬라이드로 세지 않는다.

2026-10-16 Carousel 내부 분리: `Carousel.tsx`는 상태·Swiper 등록·이동 콜백·Provider를 담당한다. `CarouselContext.ts`는 내부 Context와 `useCarousel`을 제공하고, `CarouselViewport.tsx`는 Swiper·슬라이드 여백·SimpleBar 위치 동기화를 담당한다. `CarouselScrollbar.tsx`는 전달받은 ref·콜백·측정값으로 모바일 스크롤바를 렌더링한다. `CarouselPagination.tsx`와 `CarouselControls.tsx`는 각각 선택 표시·이동 버튼과 해당 Panda 스타일을 소유한다. 기존 `Carousel.tsx` 경로에서 Viewport·Pagination·Controls와 공개 props 타입을 재export하므로 호출자 import는 유지한다. 분리 과정에서는 기존 DOM·여백·전환·reduced-motion 동작을 유지한다. 표시 크기는 위 props 계약에 따라 변경할 수 있으며, Controls는 순환 모드에서 항목이 2개 이상이면 양쪽 이동 버튼을 활성화한다.

Carousel 분리 검증(Codex, 2026-10-16): 타입 검사·해당 폴더 ESLint·Prettier·Panda 생성·Storybook 빌드 통과. 기존 배너 `PromotionNavigation` play에서 정방향 순환·역방향 이동·버튼 종류별 배치를 확인했고, `MobilePeek`에서 슬라이드 5개와 SimpleBar 수평 스크롤바 렌더링을 확인했다. 모바일 스크롤바 드래그와 페이지네이션 선택의 추가 브라우저 검증은 수행하지 않았다.

공통 UI로 올리기 전에 기존 컴포넌트를 검색한다. 여러 기능에 공통으로 적용되는 의미·인터랙션 계약이 있을 때 재사용 컴포넌트로 추출한다. 자세한 검토 절차는 `.codex/skills/component-reusability/SKILL.md`에 있다.

## 재사용 점검 (2026-10-14)

점검 범위는 `src/shared/features/`와 `src/shared/components/`다. 관련 스토리와 프레임워크·패키지 안내는 검증 근거로 확인했다. 아래는 패턴 검색과 대표 구현 검토 결과이며 모든 화면의 수동 검증 완료를 의미하지 않는다.

### 반영한 개선

- `SegmentedControl`에 읽기 전용 옵션 배열, `unstyled`, `itemClassName(option, selected)`를 추가했다. 기본 버튼 모양은 유지하고, `unstyled`에서는 호출자가 컨테이너·버튼 모양을 모두 소유한다(`fullWidth` 기본 스타일도 적용하지 않는다). `CouponManager`, `ReviewManager`, `ProductReviews`의 단일 선택 처리와 Base UI `Toggle Group` 조합을 이 컴포넌트로 통합했다. 쿠폰 필터의 가로 스크롤, 리뷰 상태 변경 시 페이지 초기화, 상품 리뷰 필터의 둥근 모양과 기존 Typography를 보존한다.
- 공개 선택값을 JSON 문자열로 인코딩해 Base UI 1.8.0이 빈 문자열을 자동 ID로 취급하는 동작과 충돌하지 않도록 했다. 콜백은 원래 타입의 값을 반환하고 비활성 옵션·빈 선택 배열을 무시한다. 옵션 값은 그룹 안에서 고유해야 한다.
- `ProductDetailSections`는 모든 본문이 보이는 스크롤 이동 메뉴다. `Tabs`의 패널 전환 계약과 달라 `Grid as="nav"`, `aria-current="location"`, 이름이 있는 `article`을 사용한다. 기존 스크롤 감지, 부드러운 이동, sticky 위치, PC 58px·모바일 48px 버튼 높이와 모바일 제목을 보존한다.
- `AppLayout`의 전역 Escape 리스너를 제거했다. 닫기 처리는 기존 Base UI `Drawer`의 `onOpenChange`가 소유한다. Escape 동작은 `MenuDismissal` 스토리로 검증한다.

### 후속 후보와 유지 판단

| 분류      | 관찰한 패턴 → 권장 API                                                                                                                    | 보존할 계약                                                                                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 추출 후보 | `DesktopNavigation`·`SiteHeader`의 hover/focus/Tab/Escape 수동 제어 → Base UI `Navigation Menu`를 감싼 기존 헤더 내부 조합                | hover 진입, Shift+Tab 이동, 메뉴별 링크 순서, 포커스 복귀, PC 전용 58px 헤더. 설치 버전 지원, 의존성 업그레이드 불필요. 상호작용 회귀 검증 후 전환                       |
| 추출 후보 | `Carousel`의 SimpleBar 기반 스크롤바와 Swiper 위치 동기화 → Base UI `Scroll Area`를 이용한 캐러셀 내부 스크롤 영역                        | 슬라이드와 스크롤바 양방향 동기화, 드래그, 리사이즈, 모바일 스와이프. 설치 버전 지원, 업그레이드 불필요. 단순 태그 교체로 처리하지 않음                                  |
| 추출 후보 | `CheckoutPage`가 상태·목 상품 조회·합계·배송 폼·요약을 모두 소유 → 기능 내부 `CheckoutContent`, `CheckoutSummary`, 순수 주문 행 계산 모듈 | 장바구니의 색상·너비·사이즈·수량 키, 누락 상품 제외, 완료 콜백, required 입력 검증, PC `1fr 360px`/모바일 `1fr`, 간격 60px/40px. 다른 소비자가 없으므로 shared 승격 보류 |
| 유지      | `Select`의 네이티브 select, `TextInput`의 input/textarea, `Fieldset`의 fieldset/legend                                                    | 네이티브 입력·레이블·폼 제출 의미를 유지. Base UI `Select`, `Input`, `Fieldset`, `Form`은 설치 버전에서 지원하지만 현재 동작만으로 교체할 근거 부족                      |
| 유지      | `ModalDialog`·`BottomSheet`·`Accordion`·`Radio`·`Checkbox`·`NumberStepper`·`RangeInput`·`ProgressBar`                                     | 이미 각각 `Dialog`, `Drawer`, `Accordion`, `Radio Group`, `Checkbox`, `Number Field`, `Slider`, `Progress`를 사용. 기능별로 같은 primitive를 직접 재구현하지 않음        |
| 유지      | 실제 값·색상·크기에 따라 바뀌는 CSS 변수와 캐러셀 측정값                                                                                  | 동적 inline style은 정적 Panda 클래스로 일괄 치환하지 않음. 표·목록·폼 의미를 단순 Box로 바꾸지 않음                                                                     |

설치된 `@base-ui/react` 1.8.0의 전체 package exports를 [공식 카탈로그](https://base-ui.com/react/overview/quick-start)와 대조했다. 위 후보 외에 Alert Dialog, Autocomplete, Combobox, Context Menu, Menu, Menubar, Meter, OTP Field, Popover, Preview Card, Separator, Switch, Tabs, Toast, Toolbar, Tooltip, Toggle과 폼 primitives도 가용성을 확인했다. 이번 개선에 필요한 의존성 업그레이드는 없다. 브라우저 `confirm`을 쓰는 문의·리뷰 취소는 Alert Dialog 후보지만 기존 네이티브 확인 동작만으로 신규 공용 모달을 추가하지 않았다.

Typography 검색에서는 페이지·카드·필터 내부에 직접 타입 선언이 남아 있음을 확인했다. 이번 필터 통합은 기존 `body4`·`body5`와 호출자 스타일을 그대로 유지하며 신규 타입 스케일을 추가하지 않는다. 후속 페이지 분해 시에는 크기뿐 아니라 굵기·행간·자간·PC/모바일 값 전체를 비교해야 한다. 기존 `heading7`이나 `sectionHeading`은 모바일 크기·행간이 다르므로 32px 페이지 제목을 무조건 대체하는 용도로 사용하지 않는다.

### 이번 변경 검증

2026-10-14에 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `git diff --check`를 통과했다. 브라우저에서 `CustomPresentation`, `EmptyStringValue`, `MenuDismissal`의 Storybook play 테스트 PASS를 확인했다. 상품 상세는 PC·375px 모바일 화면을 확인하고 PC 리뷰 버튼의 스크롤 이동 후 `aria-current="location"` 표시를 확인했다.

최초 타입 검사는 오래된 `.next/types/validator.ts`가 삭제된 catch-all 페이지를 참조해 실패했으며 Next 빌드로 생성 파일을 갱신한 뒤 재검사는 통과했다. `npm run lint`는 기존 `.tmp*` Storybook 산출물 때문에 실패했고 `npm run lint -- --ignore-pattern '.tmp*/**'`는 통과했다. 임시 산출물 삭제나 ESLint 설정 변경은 하지 않았다. 스테이징하지 않은 작업 트리 기준 OKF 매핑의 누락 문서가 없음을 확인했으며 스테이징 기준 검사를 대신한 것으로 기록하지 않는다.

## 구조 조합 후속 점검 (2026-10-14)

스킬에 추가된 low-level composition 기준으로 같은 두 폴더의 대표 구조를 다시 검토했다. 작은 구조 컴포넌트는 의미·너비·sticky·배치 계약을 소유할 때 추출하며, 공용 Atomic Design 계층을 추가하거나 context를 만드는 근거로 삼지 않는다.

| 책임과 기존 소유자                      | 반영한 컴포넌트·소유 폴더                        | props/slots와 보존한 계약                                                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SiteHeader`의 sticky 바깥 영역         | `SiteHeaderFrame`, 기존 SiteHeader organism 폴더 | `children`, `onLeave`. 같은 div 안에 헤더와 메가 메뉴를 유지하며 sticky top 0·z-index 20·영역 이탈 이벤트를 함께 소유                                                                                  |
| `SiteHeaderContainer`의 랜드마크와 배치 | `SiteHeaderContent`, 같은 organism 폴더          | `primary`, `actions` 슬롯. header → Flex → 두 HStack의 DOM 순서, 높이 변수, PC 좌우 72px, 모바일 좌측 gutter·우측 9px, 간격 24px/6px 유지. 플랫폼에 따른 실제 콘텐츠 선택과 콜백 연결은 Container 소유 |
| `CheckoutPage`의 프레임·완료 단계       | `CheckoutLayout`, checkout 기능 폴더             | `completed`, `children`. main/header, 최대 너비 1100px, PC/모바일 상하 여백, 진행 단계 유지                                                                                                            |
| `CheckoutPage`의 상태별 표시·폼 배치    | `CheckoutContent`, 같은 기능 폴더                | 준비된 `rows`, `total`, `payment`, `completed`, `onPaymentChange`, `onSubmit`. 완료를 빈 장바구니보다 먼저 표시. PC `1fr 360px`·간격 60px, 모바일 `1fr`·간격 40px 유지                                 |
| 배송 필드와 결제 선택                   | `CheckoutFields`, 같은 기능 폴더                 | controlled `payment`와 `onPaymentChange`. 기존 FormField·TextInput·Radio, id/name/autocomplete, required 브라우저 검증, section 순서 유지                                                              |
| 주문 행·금액 표시                       | `CheckoutSummary`, 같은 기능 폴더                | `rows`, `total`. aside와 옵션별 key, 수량·금액 표시, 무료 배송·제출 버튼 유지. 상품 조회·총액 계산은 수행하지 않음                                                                                     |

헤더의 상태·포커스 정책은 `SiteHeader`에, 주문의 상태·목 데이터 조회·제출 콜백은 `CheckoutPage`에 남겼다. `checkout-summary.ts`는 옵션별 주문 행과 합계를 계산하는 순수 모듈이며 누락 상품을 제외한다. Windows 대소문자 해석과 `CheckoutSummary.tsx`의 모듈 해석이 충돌하지 않도록 파일명을 구분했다. 새 구조 컴포넌트는 각각 기존 organism/feature 내부 구현이며 별도의 공용 atom/molecule로 승격하지 않는다.

`Typography`에 `pageTitle`을 추가해 주문 제목의 직접 선언을 옮겼다. 역할은 간결한 페이지 제목(`as="h1"`)이며 PC·모바일 모두 32px, 굵기 700, 행간·자간 normal, 기존 기본 글꼴을 유지한다. `--type-page-title-{font-size,mobile-font-size,font-weight,line-height,letter-spacing}`가 토큰 계약이다. `heading7`의 모바일 16px나 `sectionHeading`의 40px/30px와 달라 기존 variant를 대신 적용하지 않았다. 공용 variant의 PC·모바일 스토리를 추가했다.

유지 판단: `HeaderLogo`는 링크 의미·로고 크기·모바일 크기를, `HeaderTools`는 액션 간격과 Shift+Tab 경계를, `DesktopNavigation`은 nav와 메뉴 진입을 이미 소유하므로 그대로 사용한다. 기존 `Grid as="nav"`와 목록·표·네이티브 폼 의미도 유지한다. Base UI 전체 exports는 계속 1.8.0이며 기존 점검의 가용성·업그레이드 판단은 변하지 않는다. 이번 구조 분리에 새로운 primitive나 의존성은 필요하지 않다.

초기 점검 후보였던 주문/결제 기능 내부 분리는 이 후속 작업에서 반영했다. 메가 메뉴의 Navigation Menu 전환과 캐러셀의 Scroll Area 통합은 별도의 상호작용 이전 후보로 남는다.

후속 검증에서 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `npm run lint -- --ignore-pattern '.tmp*/**'`, `node --test tests/checkout-summary.test.mjs`(3개), `git diff --check`를 통과했다. 브라우저에서 `CompleteOrder`, `MobileCompleteOrder`, `MenuComposition` play 테스트 PASS를 확인했다. 주문은 required 제출 차단, 결제 수단 변경, 장바구니 비움 이후 완료 화면과 완료 콜백 1회 호출을 확인했고, 헤더는 hover 열기·영역 이탈 닫기·Tab 진입·Shift+Tab 복귀를 확인했다. PC 주문·375px 주문과 모바일 헤더 화면을 확인했으며 주문 제목은 두 플랫폼에서 32px/700, 모바일 행간·자간 normal이었다. 전체 lint의 기존 임시 산출물 제외 범위는 앞선 검증의 제한과 같다.

## 로그인 기능 점검 (2026-10-14)

대상은 `src/shared/features/login/`이다. `LoginPage`는 상태·검증·라우팅을 이미 소유하므로 유지하고, `LoginContent`의 표시 책임을 같은 기능 폴더에서 분리했다. 공용 atom/molecule 승격이나 추가 context 없이 기존 DOM 순서와 중첩을 유지한다.

| 책임                  | 컴포넌트·API                              | 보존 계약                                                                                                                                                 |
| --------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| main·콘텐츠 너비·제목 | `LoginLayout({ children })`               | `Box as="main"`, 최대 너비 500px, PC 상단 96px·좌우 20px·하단 124px, 모바일 40px·16px·32px, h1 `login-title`와 줄바꿈                                     |
| 입력·옵션·안내        | `LoginForm`의 controlled 값과 명시적 콜백 | 같은 form/레이블/id/autocomplete, 아이디 저장·계정 찾기 순서, required 처리와 StatusMessage. `LoginContent`의 외부 props와 `LoginNotice` 타입 재수출 유지 |
| 제출·소셜 액션        | `LoginActions({ onUnavailable })`         | Stack 간격 8px·상단 8px, 버튼 높이·색상·아이콘·type, 데모 미연결 안내 콜백                                                                                |
| 가입 안내와 링크      | `LoginMembership()`                       | section의 `membership-title`, PC 여백 24px·모바일 32px, 본문 스케일, `/signup` 링크                                                                       |

`Typography loginTitle`은 로그인 환영 제목의 의미를 표현한다. 기존 `headingKr6`의 PC 36px와 로컬 모바일 강제 22px를 합친 토큰이며 두 플랫폼에서 Pretendard, 굵기 900, 행간 1.2, 자간 -0.02em을 유지한다. `--type-login-title-{font-size,mobile-font-size,font-weight,line-height,letter-spacing}`를 사용한다. 호출자는 `as="h1"`을 유지하고 로컬에서는 여백만 지정한다. 가입 안내 h2의 로컬 `fontWeight: medium`도 기존 `body3`에 `weight="medium"`을 전달하도록 옮겼다.

Base UI 1.8.0 전체 exports를 기준으로 대응을 검토했다. FormField의 Field, Checkbox, Button은 기존 공용 래퍼를 유지한다. Form·Input·Separator·Toast는 설치 버전에서 지원하지만 네이티브 form/input, 장식용 구분선, 인라인 상태 안내의 기존 계약만으로 교체할 근거가 없어 유지한다. Dialog·OTP Field·Combobox 등 별도 상호작용을 추가할 관찰 근거는 없으며 의존성 업그레이드는 필요하지 않다.

## 추가 기능 폴더 점검 (2026-10-14)

사용자가 지정한 catalog, find-account, home, identity-verification, mypage, product, run-club, signup-terms, signup을 점검했다. 기존 staged 변경을 보존하고 아래 책임 경계와 타입 스케일을 개선했다. 모든 폴더에 새 추상화를 강제로 추가하지 않는다.

| 폴더                  | 판단·반영      | API와 보존할 계약                                                                                                                                                                                                                                                                                                        |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| catalog               | 유지           | ProductListingPage의 URL·필터·결과 계산, 기존 Layout/Content와 desktop/mobile leaf, 순수 filter/policy/metadata가 이미 분리됨. 필터 적용·초기화·정렬·뒤로가기 정책을 레이아웃으로 옮기지 않음                                                                                                                            |
| find-account          | 유지           | FindAccountPage/Content의 상태·표시 분리, 공용 이름 검증·인증 타이머, FormField/TextInput/StatusMessage와 ModalDialog 재사용. 인증번호 6자리·재요청·오류 표시 계약 유지                                                                                                                                                  |
| identity-verification | 유지           | Page가 인증 방식 이동을, Content가 두 버튼과 안내 배치를 담당. Grid·Center·Stack과 Typography, 명시적 onSelect 계약이 충분해 1개 버튼을 새 공용 카드로 승격하지 않음                                                                                                                                                     |
| home                  | 반영           | 기능 내부 `HomeLayout({ platform, children })`가 main의 overflow·배경·PC 하단 96px/모바일 72px와 섹션 간격 112px/72px를 소유. Page의 플랫폼 선택과 Hero→Category→BestSeller→Explore→ShoeFinder 순서 유지                                                                                                                 |
| signup                | 반영           | 기능 내부 `SignupLayout({ step, method, children })`가 main/section·너비 500px·반응형 여백·제목·진행 표시를 소유. 단계 상태와 약관/입력 검증, 방법 선택·라우팅은 기존 Page 유지. step 0은 기존 방법 선택 화면, 나머지는 기존 h1/진행 표시를 유지                                                                         |
| product               | 반영           | 기능 내부 `ProductDetailLayout({ viewer, isViewing, children, footer })`가 ContentLayout·전체 너비 프레임과 최대 1532px 내부 그리드·PC 2fr/.85fr 그리드·모바일 block·hidden 영역을 소유. viewer는 hidden 영역 바깥, 추천과 모바일 구매 액션은 그리드 뒤. 색상별 갤러리 key·크기 초기화·초점/스크롤 복원 콜백은 Page 유지 |
| signup-terms          | 반영           | 기능 내부 `SignupTermsDetail({ selected, previous, onClose, onPrevious })`가 기존 ModalDialog와 약관 본문·이전 약관 전환을 소유. Content는 약관 선택값과 목록·모달 조합, Page는 체크·이동 상태를 유지. 포털·모바일 fullscreen·스크롤 fade·닫기 계약 유지                                                                 |
| mypage                | 반영·후속 후보 | RunningProfilePage h1을 `Typography profileTitle`로 이전. 답변 상태·진행률과 추천 버튼의 완료 조건 유지. MyPage 회원 요약/메뉴와 MyPageStatusPage의 상태별 본문은 기능 내부 `MemberSummary`, `StatusContent` 추출 후보이며 준비된 데이터·액션 props와 기존 링크·모달 상태·모바일 배치를 보존해야 함                      |
| run-club              | 반영·유지      | SessionHero h1을 `Typography sessionTitle`로 이전. 기존 목록의 Page→Layout→Header/Results 및 상세의 Hero/Guide/Recommendations/Notice 책임은 명확해 유지. Guide의 포스터·안내 본문 스케일은 후속 Typography 정리 후보이며 PC 96px/모바일 42px 포스터와 행간 1.05·자간 -0.04em을 보존해야 함                              |

`profileTitle`은 기본 글꼴·PC 32px/모바일 28px·굵기 700·행간/자간 normal, `sessionTitle`은 기본 글꼴·36px/28px·900·1.2·-0.04em이다. 각각 `--type-profile-title-*`, `--type-session-title-*`의 PC/모바일 크기·굵기·행간·자간 토큰과 public variant 타입을 추가했다. 기존 heading variants와 전체 스케일이 달라 무조건 치환하지 않았다. 기존 h1 의미와 여백을 유지하며 PC·모바일 스토리를 추가했다. 상품 너비·메타 Typography의 정적인 `style={{ color: 'inherit' }}`는 같은 의미의 `tone="inherit"`로 옮겼다.

Base UI 전체 카탈로그에 대한 기존 가용성 판단(1.8.0)을 재사용했다. 관찰된 선택 입력·약관 모달·바텀시트는 공용 Radio/Checkbox/ModalDialog/BottomSheet를 유지하며 필요한 업그레이드는 없다. 상품 이미지 뷰어는 다른 본문을 숨기는 페이지 내 section이며 Carousel 선택·Escape·초점 복귀를 이미 소유한다. 이를 Dialog로 바꾸면 body 스크롤·포털·초점 트랩 계약이 달라지므로 구조 분리에서 자동 전환하지 않았다. OTP Field는 설치 버전 지원, 업그레이드 불필요이나 단일 TextInput의 현재 입력·자동완성 계약만으로 교체 근거가 부족하다. 정적인 프레임이나 장식 구분선에 Menu/Separator/Toast 등을 추가하지 않았다.

로그인과 추가 9개 폴더 변경 후 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `npm run lint -- --ignore-pattern '.tmp*/**'`가 통과했다. Windows CRLF를 허용하는 `core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol`로 이번 변경 범위의 `git diff --check HEAD`를 확인했다. 작업 트리 기준 OKF 매핑의 누락 문서가 없음을 확인했다.

브라우저에서 LoginFlow·MobileLoginFlow·UnavailableActions·DetailInteraction·MobileDetailInteraction의 5개 play 테스트 PASS를 확인했다. 로그인은 필수 입력 차단, 비밀번호 보기/숨기기, 체크박스, 데모 콜백 1회, 이동과 안내를 확인했다. 약관은 열기·이전 약관 전환·닫기를 확인했다. 홈·가입 details·상품 상세는 PC/375px 모바일 화면, 상품 이미지 뷰어는 열기→Escape→기존 버튼으로 초점 복원을 확인했다. computed style은 loginTitle 36px/22px·900, profileTitle 32px/28px·700, sessionTitle 36px/28px·900으로 확인했다. 스토리 검증은 실제 인증·소셜 연동 검증을 의미하지 않는다.

## 공통 컴포넌트 네 계층 점검 (2026-10-14)

대상은 atoms, layouts, molecules, organisms 전체 폴더의 패턴 검색과 대표 구현이다. 앞선 staged 변경을 보존하며, 줄 수가 아니라 독립적인 인터랙션·구조 책임을 기준으로 개선했다.

| 계층      | 반영 또는 유지             | 계약                                                                                                                                                                                                                                                                                              |
| --------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| atoms     | `RatingInput` 추가         | controlled `value: 0..5`, 숫자 `onValueChange`, 필수 `ariaLabel`, 선택적 `disabled`/`name`/`className`. 0은 미선택. 기존 Button을 Base UI Radio/Radio Group으로 조합해 점수별 접근 가능한 이름·선택 상태·키보드 이동을 제공. 별 glyph의 기존 24px 루트 스타일과 34px 최소 너비·Button 표현을 유지 |
| atoms     | `DescriptionList` 개선     | readonly items와 선택적 id 키를 지원. dl/dt/dd·두 열 그리드·가변 labelWidth CSS 변수는 유지하고 정적인 display:contents만 Panda css로 이전                                                                                                                                                        |
| layouts   | 유지                       | ContentLayout/ContentHeader의 페이지 프레임·헤더, BottomSheet의 Drawer·Header/Content/Footer가 이미 계약을 소유. 동적 CSS 변수·포털·스크롤·닫기 처리를 임의의 공용 Box로 바꾸지 않음                                                                                                              |
| molecules | ModalDialog 내부 조합 개선 | 같은 폴더의 `ModalDialogHeader({ title, closeLabel })`는 기존 header·Dialog.Title·Close를, `ModalDialogFooter({ children, scrollFade })`는 고정 footer·fade를 소유. 새 DOM 래퍼·context·공용 API 없이 기존 외부 props·Dialog context·포커스 처리를 유지                                           |
| organisms | ReviewManager 소비자 이전  | 별점 버튼 반복을 RatingInput으로 교체. 기존 rating 상태·미선택 검증·본문 입력·확인/취소·페이지 초기화는 유지하고 textarea·파일 입력의 접근 가능한 이름을 추가. 새 별점 atom이 구매 데이터나 라우트에 의존하지 않도록 분리                                                                         |
| organisms | 유지·후속 후보             | SearchDialog는 전체 검색용 크기·스크롤 계약이 ModalDialog와 달라 강제 통합하지 않음. 헤더의 Navigation Menu와 Carousel의 Scroll Area 전환은 기존 포커스/측정/Swiper 동기화 검증이 필요한 별도 후보                                                                                                |

ModalDialogHeader는 제목 높이 32px·header 최소 높이 56px·좌우 16px를, Footer는 좌우 16px·하단 24px·PC 버튼 너비 160px/모바일 100%·80px fade와 pointer-events:none을 보존한다. 이 부품은 molecule 내부 구현이므로 각각 공용 atom으로 승격하거나 별도 공용 스토리를 만들지 않고 ModalDialog의 기존/추가 시나리오로 검증한다.

설치된 Base UI 1.8.0 전체 exports를 다시 확인했다. Radio/Radio Group은 지원되며 업그레이드 없이 새 atom에 사용한다. 기존 Radio 래퍼에는 Button render/점수별 접근 이름 계약이 없어 RatingInput 내부에서 primitive를 조합하며 기능·organism에 직접 primitive를 흩어 놓지 않는다. Dialog·Drawer·Accordion·Collapsible·Checkbox·Select·Number Field·Slider·Progress·Toggle Group 래퍼는 유지한다. Alert Dialog는 리뷰의 네이티브 confirm 대체 후보이나 현재 취소 동작 자체를 교체할 근거가 부족해 유지했다. Navigation Menu·Scroll Area·Alert Dialog 모두 설치 버전 지원, 업그레이드 불필요다. 다른 카탈로그 항목도 설치 가용성과 관찰된 동작을 대조하되 정적 정보·네이티브 입력을 무조건 교체하지 않았다.

Typography는 기존 공통 variant와 호환되는 호출을 유지했다. 이번 추출의 별은 텍스트 스케일이 아닌 아이콘 glyph이므로 기존 Button과 glyph 스타일을 재사용하며 신규 Typography variant를 만들지 않는다. MemberHero의 이름/통계와 StoreResults의 헤더 등 직접 타입 선언은 후속 정리 후보이며 크기만 맞춰 기존 heading variant로 바꾸면 PC/모바일 굵기·행간·자간이 달라질 수 있다. Fieldset의 legend, DataRows의 label/value/meta, 표·설명 목록의 의미도 유지한다.

이번 변경은 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `npm run lint -- --ignore-pattern '.tmp*/**'`를 통과했다. 브라우저에서 RatingInput의 KeyboardSelection/Disabled/Mobile, ReviewManager의 WriteReview/MobileWriteReview, ModalDialog의 HeaderDismissal/ScrollFooter/MobileScrollFooter 등 8개 play 테스트 PASS를 확인했다. 미선택→클릭→화살표 이동, 비활성 콜백 차단, 리뷰 미입력 검증과 확인 닫기, 모달 제목 닫기/Escape/푸터 닫기를 확인했다. 모바일 모달은 실제 platform-mobile, 팝업 343px·푸터 버튼 바깥 너비 311px와 본문 overflow 스크롤을 확인했으며 별점과 모바일 모달 화면도 확인했다. 기존 임시 산출물을 제외한 lint 제한을 유지한다.

## 국가 선택·계정 복구 후속 재사용 점검

지정 범위는 locales, identity-verification, find-account, catalog, account-locked다. 아래 구현은 기능 내부에 두며 공용 atom으로 승격하지 않는다.

| 관찰한 책임                                         | 반영한 소유자·API                                                                                                                                                           | 유지한 의미·반응형·상태 계약                                                                                                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| LocalesPage의 데이터·프레임·지역 목록 혼합          | `locales.data.ts`의 readonly `LocaleRegion`/`LocaleCountry`, `LocalesLayout({ children })`, `LocaleRegionSection({ region })`                                               | main → 제목 영역 → 콘텐츠 → section 순서, 링크·언어별 항목·국기·목록 순서 유지. PC 4단/모바일 2단 CSS columns, 간격 48px/24px 유지. Grid로 바꾸면 순서가 달라져 채택하지 않음  |
| PasswordResetPage의 중첩 필드 렌더 함수·페이지 표현 | `PasswordResetContent({ password, confirmation, errors, onFieldChange, onSubmit, completion })`, `PasswordResetField({ name, label, placeholder, value, error, onChange })` | main/section/form, 최대 500px, PC 상단 96px/모바일 40px, required·autocomplete·label·오류 설명 연결·alert 유지. 상태, touched 이후 확인 검증, 제출, 완료 모달/이동은 Page 소유 |
| 계정 복구의 비렌더링 규칙                           | `passwordValidation.ts`의 `validatePasswordReset`, `phoneNumber.ts`의 형식·유효성 함수                                                                                      | 영문/숫자/특수문자 포함 12자 이상·공백 금지, required sentinel, 비밀번호 일치, 전화번호 11자리 절단과 기존 하이픈 형식·허용 접두어 유지                                        |
| AccountLockedPage의 라우팅과 모달 표현 혼합         | `AccountLockedContent({ onClose, onConfirm })`                                                                                                                              | 공통 ModalDialog의 md 568px·버튼 너비 160px·모바일 설명 줄바꿈 유지. Page가 닫기 `/login`, 확인 `/login/account-locked/verification` 이동 소유                      |

`AccountLockedContent`의 확인 버튼 너비 160px·중앙 정렬과 40px 높이는 공통 `ModalDialogFooter`가 담당한다. 모달은 공통 `ModalDialog`의 `size="md"`(최대 568px)와 기본 배경을 사용한다. 사용하지 않는 별도 오버레이 선언은 제거하고, 모바일에서만 설명 줄을 바꾸는 span 스타일은 로컬 `css`로 유지한다. 출처는 작업 트리의 `src/shared/features/account-locked/AccountLockedContent.tsx`, `src/shared/components/molecules/ModalDialog/ModalDialogFooter.tsx`다.
| 관찰한 책임                                         | 반영한 소유자·API                                                                                                                                                           | 유지한 의미·반응형·상태 계약                                                                                                                                                                             |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LocalesPage의 데이터·프레임·지역 목록 혼합          | `locales.data.ts`의 readonly `LocaleRegion`/`LocaleCountry`, `LocalesLayout({ children })`, `LocaleRegionSection({ region })`                                               | main → 제목 영역 → 콘텐츠 → section 순서, 링크·언어별 항목·국기·목록 순서 유지. PC 4단/모바일 2단 CSS columns, 간격 48px/24px 유지. Grid로 바꾸면 순서가 달라져 채택하지 않음                            |
| PasswordResetPage의 중첩 필드 렌더 함수·페이지 표현 | `PasswordResetContent({ password, confirmation, errors, onFieldChange, onSubmit, completion })`, `PasswordResetField({ name, label, placeholder, value, error, onChange })` | main/section/form, 최대 500px, PC 상단 96px/모바일 40px, required·autocomplete·label·오류 설명 연결·alert 유지. 상태, touched 이후 확인 검증, 제출, 완료 모달/이동은 Page 소유                           |
| 계정 복구의 비렌더링 규칙                           | `passwordValidation.ts`의 `validatePasswordReset`, `phoneNumber.ts`의 형식·유효성 함수                                                                                      | 영문/숫자/특수문자 포함 12자 이상·공백 금지, required sentinel, 비밀번호 일치, 전화번호 11자리 절단과 기존 하이픈 형식·허용 접두어 유지                                                                  |
| AccountLockedPage의 라우팅과 모달 표현 혼합         | `AccountLockedContent({ onClose, onConfirm })`                                                                                                                              | 별도 fixed 배경·blur·z-index 90 래퍼를 제거하고 공통 ModalDialog backdrop을 사용한다. 버튼 너비 160px·모바일 설명 줄바꿈 유지. Page가 닫기 `/login`, 확인 `/login/account-locked/verification` 이동 소유 |

지역 제목의 `region-Asia Pacific`처럼 공백이 있던 id/aria-labelledby는 `region-asia-pacific` 등 명시적 고유 ID로 수정했다. aria-labelledby의 공백 토큰 분리로 지역 이름을 잃는 문제를 해소한다. 국가 링크 URL 자체는 변경하지 않았다.

`localeHeading`은 배송 국가 선택 제목의 공통 Typography variant다. `as="h1"`, 기본 글꼴, PC 20px/모바일 16px, 700, 행간·자간 normal을 유지한다. `--type-locale-heading-{font-size,mobile-font-size,font-weight,line-height,letter-spacing}` 토큰·공개 타입과 PC/모바일 스토리를 함께 추가했다. feature-local 스타일은 여백·배치만 소유한다.

유지 판단: catalog의 ProductListingPage는 URL/필터/정렬/비교 상태를, Layout/Content 및 기존 작은 부품은 프레임·결과·PC sticky 필터/모바일 bottom sheet를, 순수 모듈은 정책·메타데이터를 이미 소유한다. identity-verification은 Page가 휴대폰 인증 이동을, Content가 선택 UI와 레이아웃을 소유한다. FindAccountContent와 AccountUnlockCompletePage의 의미 있는 구조도 유지한다. 아이핀 선택의 기존 미구현 동작은 이번 구조 점검에서 바꾸지 않는다.

Base UI 1.8.0 전체 package exports를 재확인했다. Dialog는 account-locked/완료 모달의 포털·Escape·포커스 동작에 해당하며 기존 ModalDialog 래퍼로 충족한다. Drawer·Accordion·Checkbox·Select·Slider·Number Field는 catalog의 필터 상호작용에 해당하며 기존 공통 래퍼를 유지한다. Field/Form/Input은 설치 버전 지원이나 기존 FormField/TextInput 및 네이티브 required/label 계약을 대체할 새 근거가 없어 유지한다. OTP Field도 지원되지만 계정 찾기의 인증번호는 복합 칸/화살표 탐색 요구 없이 단일 TextInput이므로 유지한다. 모두 업그레이드 불필요이며 새 primitive를 도입하지 않았다. 정적 국가 링크에는 Navigation Menu를 적용하지 않는다.

이번 후속 작업에서 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `npm run lint -- --ignore-pattern '.tmp*/**'`, `node --test tests/account-recovery.test.mjs`(3개)를 통과했다. 브라우저에서 PasswordResetPage의 RequiredFieldsError/ConfirmationMismatch/Complete/MobileError, AccountLockedModal의 ConfirmNavigation/CloseNavigation/EscapeNavigation, Locales의 Default/Mobile 등 9개 play 테스트 PASS를 확인했다. PC 비밀번호 폼·국가 목록, 375px 오류 표시·계정 잠금 모달·국가 목록을 확인했고 localeHeading은 H1, PC 20px/모바일 16px·700·normal을 확인했다. lint는 기존 `.tmp*` 산출물을 제외한 결과다.

런클럽 `RunClubBadge`의 공통 높이를 52px에서 28px로 조정했다. Road/Trail 색상과 기존 Typography·여백 계약은 유지한다. 이는 구조 추출과 분리된 시각적 수정이며 근거는 해당 TSX의 작업 트리다.

## 스타일 기준

`AGENTS.md`가 스타일 규칙의 기준이다.

- 컴포넌트 스타일은 해당 TSX 파일에서 Panda `css`·`cva`로 작성한다.
- `*.module.scss`를 만들거나 유지하지 않는다.
- 반응형 스타일은 기존 값과 동작을 유지한다.
- 최상위 선언과 `export` 사이에는 빈 줄을 둔다(`AGENTS.md`의 코드 포맷 규칙).
- `panda.config.ts`에 토큰과 `.platform-mobile &` 조건이 있다. 포털로 `<body>`에 렌더되는 요소도 이 조건을 받도록 `platform-*` 클래스는 `src/app/layout.tsx`의 `<body>`에 붙는다.
- `styled-system/jsx`의 레이아웃 도구와 공통 `Typography`를 재사용한다.
- 전역 SCSS는 폰트·전역 레이아웃 등의 기반 스타일을 담당한다.
- 마이페이지 주문 카드 상품 사진은 공용 `ProductThumbnail`로 렌더하고 96px 정사각형 슬롯은 페이지 레이아웃에서 지정한다. Typography는 기본 `language="auto"`가 한글을 감지해 한국어 토큰을 선택하므로 호출부에서 `Kr` 접미사를 반복하지 않는다. 프로필 이동은 공용 `ButtonLink`, 구분선은 Panda `Divider`를 사용한다.
- 마이페이지의 리뷰·등급·쿠폰·회원정보·배송지·관심상품·최근 본 상품·재입고 알림 화면은 `MyPageStatusPage`에서 기능별 화면으로 분기한다. 공통 `MyPageFrame`이 탐색 메뉴와 Breadcrumb을 소유하고 각 화면은 기존 Button, FormField, TextInput, SegmentedControl, ModalDialog, ProductCard, ProductThumbnail을 재사용한다. 현재 목록과 입력 결과는 화면 내부의 데모 상태이며 서버 저장소와 연결하지 않는다. 대응 모바일 시나리오는 `src/stories/features/mypage/MyPageDesign.stories.tsx`에 둔다.
- 회원정보의 마케팅 정보 수신 동의 요약은 모바일 `heading7` 제목과 `body4` 세 행으로 구성한다. 제목·행 목록은 24px, 행끼리는 16px을 띄우고 각 행의 상태를 오른쪽 정렬한다. 이메일·모바일 쿠폰북·문자/카카오톡 전송매체를 각각 표시한다. 편집 폼에도 모바일 쿠폰북 선택값을 둬 요약 상태와 일치시킨다. 근거: [Figma 수신 동의 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=789-24649&m=dev) 및 `src/shared/features/mypage/MyPageProfile.tsx` 작업 트리 확인(2026-10-15).
- 회원정보의 섹션 사이 1px 경계선은 `borderTop` 대신 Panda `Divider`(`orientation="horizontal"`, `bg="black.20"`)로 표시한다. 선 뒤 16·24·20px 간격은 각각 바깥 `Stack`의 `gap`으로 유지한다. 근거: `src/shared/features/mypage/MyPageProfile.tsx` 작업 트리 확인(2026-10-15).
- `MyPageReviews`의 작성 완료 목록은 읽기 전용 `RatingStars`를 본문 위에 표시한다. 초기 데모 리뷰는 4.5점으로 보여주고, 작성·수정 후에는 화면 내부 상태에 저장한 별점과 본문을 표시한다. 입력용 `RatingInput`은 모달에서 그대로 사용한다. 근거: `src/shared/features/mypage/MyPageReviews.tsx`와 `src/shared/components/atoms/RatingStars/RatingStars.tsx` 작업 트리 확인(2026-10-15).
- 이 여덟 화면의 타이포는 Figma의 12·14·16·20·22px 역할을 기존 Typography variant로 표현한다. 날짜·숫자는 영문 서체, 뒤따르는 한국어 단위·라벨은 한국어 서체를 각 Typography에 명시해 한 줄에서도 언어별 굵기와 자간을 유지한다. 여백과 정렬은 Box·Stack·HStack이 담당한다.
- `MyPageRewards`는 모바일 Figma 화면에서 결정한 Typography 값을 `mo`에 지정한다. `variant`로 두 플랫폼에 동일한 값을 적용하지 않는다. 영문·숫자만 있는 콘텐츠는 기본 `language="auto"`가 영문 변형을 고르므로 `language="en"`을 반복하지 않는다. 근거: `src/shared/features/mypage/MyPageRewards.tsx`와 Typography의 언어 변형 결정 로직 작업 트리 확인(2026-10-15).
- `MyPageRewards`의 등급 카드에서 `--tier-color`는 카드 배경과 검은 원 안 이니셜 글자색에 함께 적용한다. ELITE·ADVANCED·RUNNER는 각각 Figma color foundation의 `blue.100`·`citrus.100`·`offWhite.100` 토큰을 변수에 연결한다. 근거: `src/shared/features/mypage/MyPageRewards.tsx`, `panda.config.ts` 및 생성 CSS 확인(2026-10-15).
- 등급 혜택과 회원 공통 혜택의 순번은 `ol`의 CSS 마커 대신 `map`의 인덱스를 `Typography`로 출력한다. 주항목과 순번은 모바일 `body4`(14px), 보조 설명은 `body5`(12px)를 쓰며 설명 불릿도 텍스트로 표시한다. 목록의 의미 구조는 `ol`·`li`로 유지한다. 근거: `src/shared/features/mypage/MyPageRewards.tsx` 작업 트리 확인(2026-10-15).
- 회원 공통 혜택은 Figma 노드 `714:22146`의 343px 폭·1px 외곽선·가로 16px/세로 24px 안쪽 여백을 따른다. 제목은 모바일 `heading6`(20px), 네 묶음 제목은 `heading7`(16px), 번호 문장은 `body4`(14px), 쿠폰 조건은 `body5`(12px)와 원형 불릿으로 구분한다. 제목과 목록·묶음 간격은 20px, 묶음 제목과 항목 간격은 12px, 번호 항목 간격은 8px다. 근거: [Figma 공통 혜택 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=714-22146&m=dev) 화면·세부 속성 및 `src/shared/features/mypage/MyPageRewards.tsx` 작업 트리 확인(2026-10-15).
- 쿠폰 목록의 탭과 결과 목록·결과 목록과 더보기 버튼은 각각 24px 간격을 둔다. 총 개수와 첫 카드 사이 8px, 카드끼리는 16px이다. 카드 안은 제목과 금액 사이 24px, 금액과 조건 사이 12px, 조건과 사용 기간 사이 4px을 둔다. 근거: [Figma 쿠폰 목록 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=753-18722&m=dev) 및 `src/shared/components/organisms/MyPage/CouponManager.tsx` 작업 트리 확인(2026-10-15).
- `EmployeeCoupons`는 쿠폰 등록과 쿠폰 내역 사이의 독립 섹션이다. 접힌 상태는 칩을 줄바꿈 없이 가로 한 줄(`nowrap`)로 이어서 보여주고, 52px 높이에서 오른쪽으로 넘친 부분만 잘린다. 펼치면 줄바꿈(`wrap`)해 가로 4px·세로 8px 간격으로 세 줄에 걸쳐 5개 칩을 모두 보여주며 아래 쿠폰 내역을 밀어낸다. 우측 원형 버튼은 `aria-expanded`와 목록 연결을 제공한다. 근거: [Figma 임직원 쿠폰 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=764-19372&m=dev), 제공된 두 상태 이미지 및 `src/shared/components/organisms/MyPage/EmployeeCoupons.tsx` 작업 트리 확인(2026-10-15).
- 임직원 쿠폰의 펼침은 실제 칩 목록 높이를 측정해 52px에서 확장 높이까지 애니메이션한다. 접을 때는 280ms 높이 전환 후 `nowrap`으로 확실히 복원하고, 빠르게 다시 펼치면 대기 중인 접힘 타이머를 취소한다. 화살표와 가장자리 페이드도 함께 전환하며, 움직임 감소 환경에서는 즉시 접는다. 근거: `src/shared/components/organisms/MyPage/EmployeeCoupons.tsx` 작업 트리 확인(2026-10-15).
- `SegmentedControl variant="underline"`는 리뷰·쿠폰의 동일한 전체 폭 밑줄 탭 표현을 소유한다. 옵션 수에 관계없이 버튼을 균등하게 배치하고 선택 항목에 검은 하단선을 표시한다. 기존 기본 버튼형과 `unstyled` 확장 API는 유지한다.

`styled-system/`과 `src/shared/styles/panda.css`는 생성 결과이며 Git에서 제외한다. 생성 CSS를 직접 수정하지 않고 TSX나 Panda 설정을 바꾼 뒤 `npm run panda`를 실행한다.

## 마이페이지 지정 범위 재사용 점검 (2026-10-15)

범위는 `features/mypage`, `organisms/MyPage`, `atoms/SegmentedControl`이다. Typography·토큰·관련 스토리는 타입 스케일 이전과 검증을 위해 확인했다. 기능 전용 구성은 기존 소유 폴더 안에 두며 공용 계층으로 승격하지 않았다.

| 관찰한 책임                                              | 반영한 API와 소유자                                                                                 | 보존 계약                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 러닝 프로필 페이지가 답변 상태와 화면 스타일을 함께 소유 | 기능 내부 `RunningProfileContent({ questions, answers, answeredCount, completed, onAnswerChange })` | 상태·완료 계산은 `RunningProfilePage` 소유. header → 진행률 → 질문 → footer 순서, 진행률 여백 32px/50px, 질문 간격 42px, 모바일 sticky bottom 0·좌우 -16px·상단 30px·패딩 14px/16px 유지. `Box`·`Grid`는 기존 div를 그대로 렌더링                                                                                                |
| 쿠폰 목록의 article 표시와 필터·등록·상세 상태 혼재      | organism 내부 `CouponCard({ coupon, onDetails })`                                                   | article/h3, 패딩 16px/24px, 카드 내부 24px/12px/4px 간격, 상세보기 콜백 유지. 카테고리 변경 시 5개로 초기화, 등록·모달 상태는 Manager 소유. 기존 `CouponManager`의 `CouponItem` 타입 import 경로는 re-export로 유지                                                                                                              |
| 밑줄형 선택 버튼의 직접 타입 선언                        | `Typography as="button" variant="selectionLabel"`를 Toggle의 render로 사용                          | 버튼 DOM을 추가하지 않고 Base UI 이벤트·ref·선택 속성을 전달. 한국어 글꼴, PC/모바일 16px·500·행간 1.3·자간 normal. `--type-selection-label-{font-size,mobile-font-size,font-weight,line-height,letter-spacing}` 토큰 계약. 기존 `ctaKr1`은 600·음수 자간이므로 대체하지 않음. 기본형·unstyled·옵션 비활성·빈 문자열 인코딩 유지 |

`EmployeeCoupons`의 목록 ID와 버튼 `aria-controls`는 인스턴스별 `useId()`로 연결한다. 여러 쿠폰 영역이 함께 렌더링되어도 대상 ID가 겹치지 않는다. 기존 52px 접힘 높이, wrap/nowrap 전환, 280ms 접힘 타이머·재클릭 취소, 움직임 감소 설정, 페이드·화살표는 유지한다. 현재 작업 트리에서 타입 검사와 `.tmp*` 산출물을 제외한 lint를 통과했다. 인스턴스 두 개의 브라우저 동작 검증은 수행하지 않았다.

### Base UI와 유지 판단

설치된 `@base-ui/react` 1.8.0 전체 exports를 [공식 카탈로그](https://base-ui.com/react/overview/quick-start)와 대조했다. Accordion, Alert Dialog, Autocomplete, Avatar, Button, Checkbox/Group, Collapsible, Combobox, Context Menu, Dialog, Drawer, Field/Fieldset/Form/Input, Menu/Menubar, Meter, Navigation Menu, Number Field, OTP Field, Popover, Preview Card, Progress, Radio/Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle/Group, Toolbar, Tooltip 모두 설치 버전에 있다. 이번 범위에는 업그레이드가 필요한 후보가 없다.

- **keep — Toggle Group/Toggle**: 쿠폰·리뷰는 목록 필터이며 독립 탭 패널을 연결하지 않는다. 공용 SegmentedControl의 controlled 선택과 roving focus를 유지한다. 설치 버전 지원, 업그레이드 불필요.
- **keep — Dialog, Checkbox, Radio Group, Progress**: 상세·수정 모달, 기본 배송지, 수신 동의, 진행률은 기존 wrapper가 담당한다. 기능에서 primitive를 직접 재구현하지 않는다. 모두 설치 버전 지원, 업그레이드 불필요.
- **keep — 네이티브 select/input/form 및 confirm**: 기존 정렬·입력·필수 검증·리뷰 취소 의미를 유지한다. Select, Input, Form, Alert Dialog는 설치 버전에서 지원하지만 네이티브 동작을 교체할 추가 요구가 없다. 업그레이드 불필요.
- **keep — EmployeeCoupons**: 펼침은 숨긴 패널 전체를 여닫는 것이 아니라 일부 칩이 보이는 목록의 줄바꿈·측정 높이를 바꾼다. Collapsible은 설치 버전에 있으나 패널 숨김 계약이 달라 기계적으로 이전하지 않는다. 업그레이드 불필요.
- **keep — MyPageFrame, OrderTile, MyPageMenuSection, ProfileField, QuickLinkGrid**: 프레임·주문 표시·섹션 내비게이션·필드·반응형 링크 격자의 책임이 이미 명확하다. nav·article·form·목록 의미와 DOM 순서를 유지한다. 단순 태그 교체나 public component 추가 근거로 삼지 않는다.

### 후속 추출 후보

- `MyPageReviews`의 목록과 편집 화면 → 같은 기능 폴더의 `MyPageReviewList`(준비된 행·전체 개수·정렬값·작성/정렬/더보기 콜백)와 `MyPageReviewEditor`(별점·본문·오류·저장/닫기 콜백). 정렬·10개씩 더보기·작성 데이터 상태는 페이지에 남기고, 기존 빈 상태·모달 포커스 복귀·64px 썸네일을 보존한다. 정렬 select의 16px·500 직접 선언은 글꼴·상속 행간까지 확인한 후 Typography `as={Select}`로 이전한다.
- `MyPageProfile`의 보기/편집 영역 → 기능 내부 `ProfileDetails`·`ProfileForm`에 준비된 필드와 변경/제출 콜백을 전달한다. 마케팅 세 행·수신 동의별 상태·폼 검증·탈퇴 모달의 수명과 간격을 보존한다.
- `MyPageRewards`의 두 번호형 혜택 목록 → 기능 내부 `MembershipBenefitList({ items })`. 번호·보조 불릿·본문/설명 Typography·간격 8px/4px과 현재 목록 DOM을 보존한다. 단일 기능 소비이므로 공용 organism 승격 근거는 없다.

현재 변경에는 신규 스토리 파일과 기존 스토리 수정이 포함되지 않는다. 후속 검증에서는 PC/모바일 러닝 프로필의 진행률·완료 버튼, 쿠폰 필터 초기화·더보기·상세 모달과 밑줄형 선택의 키보드 동작을 확인해야 한다.

### 이번 검증 결과

이전 구현 작업에서 `npm run panda`, `npm run typecheck`, `npm run build`, `npm run build-storybook`, `git diff --check`를 통과했다. 이 기록은 당시 스토리를 포함한 작업 트리 기준이며 현재 커밋의 브라우저 검증을 의미하지 않는다. 전체 `npm run lint`는 기존 `.tmp*` Storybook 번들 산출물에서 실패했으며 `npm run lint -- --ignore-pattern '.tmp*/**'`는 통과했다. Storybook 빌드의 의존성 `use client` 번들 경고는 빌드를 실패시키지 않았다. 연결 가능한 브라우저가 없어 PC/모바일 시각 확인과 play 실행은 수행하지 못했다. `pendingDocs(false)`의 작업 트리 OKF 검사에는 누락 문서가 없으며, 스테이징 기준 검사나 커밋을 수행한 것으로 기록하지 않는다.

## PR #30 충돌 해결 (2026-10-15)

`publishing` 병합 시 양쪽의 Typography 추가를 함께 유지했다. `selectionLabel`과 `navigationPromoTitle`, 러닝세션 전용 variant 및 대응 CSS 토큰을 보존한다. `MyPageStatusPage`는 개별 마이페이지 화면을 선택하는 현재 구조를 유지하고 옛 `event-entries` 종류·샘플 데이터는 제거했다. 실제 `/mypage/event-entries` 경로와 route story는 publishing의 `RunClubPage` 직접 연결을 유지한다. 메뉴·러닝세션 문서와 마이페이지 재사용 점검 기록은 함께 남긴다. 병합 결과에서 Panda 생성, 타입 검사, `.tmp*` 산출물을 제외한 lint, 앱·Storybook 빌드, `node --test tests/app-router.test.mjs`의 두 검사를 통과했다. 브라우저 시각·상호작용 검증은 수행하지 않았다.

## Storybook

`.storybook/main.ts`는 `src/stories/**/*.stories.@(ts|tsx)`만 탐색한다. 다른 폴더의 스토리는 이 패턴에 포함되지 않는다. `public/`을 정적 자산으로 제공하고 접근성·문서 애드온을 사용한다.

모든 `*.stories.ts`·`*.stories.tsx`는 `src/stories/` 아래에 작성한다. 컴포넌트는 `components/`, 기능 화면은 `features/`에서 원본 계층을 따르고 기존 별칭으로 구현을 가져온다. `src/shared/`·`src/app/`에는 스토리를 함께 두지 않는다. 이 기본 규칙은 `AGENTS.md`에 명시하며 마이페이지 스토리도 `src/stories/features/mypage/MyPage.stories.tsx`로 옮겼다.

전역 `nextjs.appDirectory: true`가 App Router 탐색 컨텍스트를 제공한다. 경로·파라미터가 필요한 스토리는 Next.js navigation 설정이나 제공되는 모킹을 사용한다. React Router 래퍼를 추가하지 않는다.

뷰포트 프리셋은 3840, 2560, 1920, 1600, 1200, 768, 375px이다. 접근성 검사 설정 `a11y.test: todo`는 검증 통과를 의미하지 않는다.

[로컬 실행](../development/setup.md), [변경 검증](../development/verification.md)을 참고한다.

## 모바일 전체 메뉴 (2026-10-15)

첫 화면 메뉴 링크·버튼과 상세 뒤로가기의 공통 row는 49px 최소 높이 대신 Panda py=4(상하 16px)를 사용한다. 버튼 초기화는 px=0만 적용해 세로 패딩을 보존하며 실제 높이는 텍스트 높이와 패딩으로 결정한다. 2026-10-15 Codex 검증: MenuDrawer Default 스토리의 Best 링크와 Men 버튼에서 padding-top/bottom이 모두 16px인 것을 확인했다. 변경 파일 ESLint와 TypeScript 검사를 통과했다.

후속 구조 개선과 공개 API 변경은 [Organisms 재사용 점검](organisms.md)을 참고한다. Drawer 프레임·헤더·탐색·고객 지원 DOM과 스타일은 같은 organism 폴더의 전용 컴포넌트가 소유하며, 메뉴 상태와 포커스 전환 정책은 `MenuDrawer`에 남겼다. 웹·모바일 배너는 `MegaMenuAD`의 `presentation`으로 조합한다. 메뉴 제목은 기존 Typography `heading5`, 고객 지원은 `heading9`를 사용하며 미사용 `navigationHeading`·`navigationHeadingKr` variant와 토큰·스토리를 제거했다. 광고 제목은 두 presentation에서 `navigationPromoTitle`을 사용하고 PC·모바일 크기를 24px로 맞췄다.

`AppLayout`이 메뉴 열림을 소유하고 기존 `SiteHeader`의 `onMenu`로 `MenuDrawer`를 연다. `MenuDrawer`의 `close` 계약은 유지하며 `isLoggedIn?: boolean`을 전달해 상단 로그인/회원가입 링크를 마이페이지 링크로 전환한다. 닫힌 Drawer는 마운트 해제되므로 다시 열면 첫 화면으로 초기화된다.

첫 화면의 Best와 런칭캘린더는 직접 이동하며 Men·Women·Shoes·Explore는 웹 `megaMenus`의 그룹과 링크를 상세 화면으로 표시한다. 공통 Accordion을 `multiple={false}`로 재사용해 첫 그룹을 펼친다. 다른 그룹을 열면 기존 그룹을 닫고, 열린 그룹을 다시 누르면 모두 닫는다. 상세 화면에는 배너를 표시하지 않으며 Sale은 빨간색으로 표시한다. 화면 전환 후 layout effect에서 스크롤과 포커스를 이동하고, 뒤로가기는 선택했던 카테고리 버튼에 포커스를 돌린다. Base UI Drawer의 포커스 가두기, Escape, 배경 스크롤 잠금과 닫기 후 포커스 복귀를 유지한다.

고객 지원 영역은 콘텐츠 뒤에 검은 배경으로 배치하며 짧은 화면에서는 Drawer 내부를 스크롤한다. 마이페이지·주문/배송 조회·매장 찾기·고객센터는 Free Solid 아이콘을 사용하고 멤버십은 제공된 `/images/icon/navigation/membership.svg`를 등록된 Icon 자산으로 사용한다. 기존 Regular `faUser`를 보존하고 Solid는 `faUserSolid`로 구분한다. 상단과 본문 스타일은 Panda CSS, 문구는 Typography를 사용한다.

첨부된 두 이미지를 시각 기준으로 삼았다. Figma 원본은 연결 재인증 문제로 확인하지 못했다. Storybook에서 375px 첫 화면·Men 상세·로그인 상태, 320px 화면의 수평 넘침 없음과 내부 스크롤, 독립적인 그룹 토글·뒤로가기·Escape·닫기·재진입 초기화를 검증한다. 작업 트리 출처는 이 문서 frontmatter의 MenuDrawer, AppLayout, 아이콘 등록과 스토리 파일이다.

검증 결과: `npm run typecheck`, 변경 파일 ESLint, Panda 생성, `npm run okf:check`와 전체 작업 트리 `pendingDocs(false)` 매핑 검사, `git diff --check`를 통과했다. Storybook 브라우저에서 375px 첫 화면 및 Men 상세, 로그인 상태, 메뉴 그룹 독립 토글·뒤로가기 포커스·Escape·닫기·재진입 초기화를 확인했다. 320×568 화면의 Drawer clientWidth와 scrollWidth가 모두 305px로 같고 내부 세로 스크롤을 확인했다. 데스크톱 SiteHeader MenuComposition 스토리의 메뉴 표시와 키보드 포커스도 확인했다. Figma 원본과의 일치 검증은 수행하지 않았다.
모바일 전체 메뉴의 비로그인 헤더는 `HeaderAuthLink`를 재사용해 로그인(`/login`)·Divider·회원가입(`/signup`)을 각각 표시한다. 선택적 `onNavigate` 콜백으로 어느 링크를 선택해도 메뉴를 닫는다. 로그인 상태에서는 마이페이지 링크를 유지한다.

## 마이페이지 러닝세션 신청내역

메인 메뉴와 하위 페이지 공통 메뉴의 명칭·주소는 러닝세션 신청내역, `/mypage/event-entries`로 일치한다. 실제 화면과 경로 미리보기는 `RunClubPage`를 사용하고 기존 `MyPageStatusPage`의 이벤트·대회 신청 임시 분기는 제거했다. Storybook은 `PAGES/MYPAGE/RunClub/List`에 목록·빈 목록·모바일 목록을, `PAGES/MYPAGE/RunClub/Detail`에 Open·Closed·Upcoming과 모바일 상태·대형 화면 스토리를 제공한다. 두 CSF 파일은 `src/stories/features/run-club/RunClubPreview.tsx`를 공유해 플랫폼·AppLayout·데모 세션 구성을 유지한다. IA 200·258의 PC·모바일 링크는 `pages-mypage-runclub-list--list`·`pages-mypage-runclub-list--mobile-list`, 259는 `pages-mypage-runclub-detail--open`·`pages-mypage-runclub-detail--mobile-open`을 사용한다. IA 200을 기존 런클럽 목록과 동일한 완료 상태로 연결한다.

타입 검사, 변경 범위 ESLint, Storybook 빌드와 생성된 `index.json`의 네 미리보기 ID·분류 일치를 확인했다. OKF 작업 트리 매핑 검사도 통과했다. 브라우저 상호작용 검증은 수행하지 않았다.

## 러닝세션 모바일 디자인 (2026-10-15)

사용자가 제공한 모바일 이미지 8장을 기준으로 구현했다. Figma 4064:6604·6687·6728·6836·6947·7062는 재인증 오류로 읽지 못했으며 사용자가 첨부 이미지 기반 구현을 명시적으로 선택했다. 기존 세션 목 데이터와 PC의 4열 목록·2열 상세·추천 상품 영역을 유지한다. 모바일 목록 스토리는 3개 세션을 제공하며 실제 페이지는 전달된 전체 세션을 표시한다. 공통 헤더·푸터의 기존 아이콘·사업자 문구 등은 이번 작업 범위에서 변경하지 않는다.

모바일 목록은 16px 제목 여백, 필터·신청내역 링크의 같은 행 배치, 화면 너비의 정사각형 이미지, 20px 카테고리 배지, 이미지 아래 제목·일정으로 구성한다. 카드 자세히 보기 버튼은 모바일에서 숨기고 이미지 링크로 상세에 진입한다. 빈 목록은 340px 높이의 중앙 상태 문구와 추가 하단 여백 없는 구성을 사용한다. 상세는 이미지→세션 정보→안내 사항→회색 세션 안내 영역 순서다. 모바일에서 PC 추천 상품과 이미지 영역 placeholder를 숨긴다.

`RunClubFacts`는 hero·guide 두 variant와 label/value/detail/mobileOnly 데이터로 의미 있는 dl/dt/dd 구조를 재사용한다. `DescriptionList`의 고정 글꼴·색상·행 구조와 안내 표의 구분선 계약이 달라 공통 컴포넌트 확장 대신 feature 내부에 두었다. `RunClubApplyButton`은 기존 공통 Button을 재사용해 open/closed/upcoming의 문구·disabled 계약을 한곳에서 소유한다. `RunClubMobileActionBar`는 16px 좌우 여백·44px 버튼·safe-area·fixed 위치를 소유하고 클릭 콜백은 DetailPage가 전달한다. 인접 푸터 아래 여백으로 마지막 콘텐츠가 고정 바에 가려지지 않게 한다.

component-reusability 점검: 설치된 Base UI 1.8.0의 전체 package exports를 확인했다. 기존 Button 및 ModalDialog 래퍼를 재사용한다. 단일 필터 선택에는 기존 aria-pressed 버튼 계약을 유지하며 새로운 Tabs/ToggleGroup이나 의존성 업그레이드는 추가하지 않는다. 표·안내 문구에는 native dl·aside·ul을 유지하고 배치에는 Panda JSX, 상태 스타일에는 cva를 사용한다. 새 공유 Typography sessionOverlay는 PC heading6/모바일 32px, sessionPosterTitle은 PC 96px/모바일 42px·line-height 1.05·letter-spacing -0.04em으로 정의했다. 모바일 대응 스토리를 추가했고 다른 문구에는 기존 Typography variant와 mo를 재사용한다.

검증: Panda 생성, TypeScript, 변경 범위 ESLint, Next.js production build, Storybook build, 기존 App Router 회귀 테스트 2개, OKF 작업 트리 매핑 검사를 통과했다. 브라우저에서 375px 목록의 정사각형 이미지·필터 선택(로드 1개)·빈 상태(footer top 약 614px), 상세 신청 안내 모달 열기·닫기·포커스 복귀, 모집 마감·신청 예정 버튼 disabled 상태를 확인했다. 320px 목록의 clientWidth·scrollWidth는 모두 305px이며 수평 넘침이 없었다. 1600px PC 목록은 8개 카드·4열·3:4 이미지 비율을 유지했다. 기존 목 데이터 날짜·장소를 사용하며 원본 Figma와의 픽셀 일치를 주장하지 않는다.

## RunClub 재사용·조합 재점검 (2026-10-15)

사용자가 지정한 `src/shared/features/run-club/`를 component-reusability 기준으로 점검했다. 앞선 staged 변경은 보존한다.

| 대상                                                | 조치 | 책임·유지 계약                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DetailPage → DetailLayout                           | 개선 | Page는 세션 조회·정보 행 준비·모달 상태·콜백을 소유한다. Layout의 hero/guide/desktopContent/mobileAction/applicationNotice 슬롯이 main의 DOM 순서, 모바일 푸터 아래 92px+safe-area 여백, PC 전용 콘텐츠 표시를 소유한다.                                                                                                                                    |
| Header → Filters                                    | 개선 | Filters는 filter/onFilterChange로 제어하며 120px PC 버튼·32px 모바일 버튼·두 플랫폼 문구·aria-pressed·group 이름을 소유한다. 필터 적용 상태는 Page에 남긴다.                                                                                                                                                                                                |
| Hero·Guide·Recommendations·SessionImage             | 개선 | Grid·Box·Center의 단일 배치 스타일은 JSX props로 옮긴다. PC 72px/모바일 40px 여백과 60px·48px·32px 간격을 보존한다. selector가 있는 포스터·안내 콘텐츠와 이미지 css, 슬라이드의 !important 계약, Facts의 hero/guide cva는 유지한다.                                                                                                                         |
| Facts·ApplyButton·MobileActionBar·ApplicationNotice | 유지 | 표의 typed row/variant, 신청 상태별 문구·disabled, fixed CTA, 기존 ModalDialog의 포커스·닫기 책임이 명확하다. 다른 feature 소비자가 없어 공용 atom/organism으로 승격하지 않는다.                                                                                                                                                                            |
| Typography                                          | 개선 | sessionFactBody는 PC 16px/모바일 14px·행간 1.6, sessionGuideBody는 14px·행간 1.6, sessionNote는 PC 14px/모바일 12px·행간 1.8, sessionImagePlaceholder는 PC 28px/모바일 20px·900·상속 행간이다. 기존 본문 variant의 한글 감지에 따른 Pretendard·korean 자간, 영문의 HOKA·0 자간을 새 세션 본문 variant에서도 보존한다. 공개 스토리와 모바일 예제를 추가했다. |

Base UI 전체 exports(설치 버전 1.8.0)를 기준으로 Accordion·AlertDialog·Autocomplete·Combobox·ContextMenu·Dialog·Drawer·Menu·Menubar·NavigationMenu·Popover·PreviewCard·ScrollArea·Select·Separator·Switch·Tabs·Toast·Toolbar·Tooltip·Meter·OTPField·NumberField·Slider·Checkbox·Radio·ToggleGroup·Form 등을 대조했다. 현재 관찰된 상호작용은 필터 버튼과 신청 안내 모달이다. Button·Dialog는 설치 버전에서 지원하며 기존 공통 Button·ModalDialog 래퍼를 재사용한다. 단일 선택 필터는 native 버튼의 aria-pressed 및 group 계약으로 충분해 Tabs·ToggleGroup으로 교체하지 않는다. dl·aside·ul에는 추가 Base UI가 필요 없다. 의존성 업그레이드가 필요한 후보는 없다.

재점검 검증: Panda 생성·타입 검사·변경 범위 ESLint·Next.js production build·Storybook build·App Router 회귀 2개·OKF 작업 트리 매핑·git diff --check를 통과했다. 브라우저에서 모바일 트레일 2개/전체 3개 선택, 모달 확인 후 신청 버튼 포커스 복귀, 320px clientWidth=scrollWidth=305px을 확인했다. 375px 상세는 360px 정사각형 이미지와 높이 93px 고정 바를 유지하고 본문 14px/22.4px·안내 12px/21.6px 및 Pretendard를 확인했다. PC 상세는 640px 두 열·72px 상하 여백, 안내 두 열, 모바일 바 display:none, 본문 16px/25.6px, placeholder 28px/900을 확인했다.

## 레이아웃 JSX와 모달 액션 슬롯 (2026-10-16)

Signup·Home·Locales·RunClub 상세·Notices·상품 지원/배송 영역·이미지 뷰어의 단일 배치 스타일은 Panda Box/Stack JSX props로 표현한다. main/section 의미, 기존 너비·간격·반응형 조건, 이미지 뷰어의 키보드 처리와 런클럽 모바일 고정 바에 필요한 인접 footer 여백을 유지한다.

RunClubApplicationNotice, MyPageReviews, MyPageProfile의 탈퇴 확인, MyPageAddresses의 삭제 확인, MyPage의 로그아웃 확인, PasswordResetCompleteModal, IdConfirmationModal, AccountLockedContent의 액션은 ModalDialog의 footer 슬롯이 렌더링한다. 본문은 스크롤 영역에 남고 액션은 공통 고정 푸터 배치·여백을 따른다. 두 버튼을 담는 HStack/Flex는 w=100%로 영역을 채우며 아이디 확인의 모바일 세로 배치를 유지한다. 기존 저장 검증·상태 변경·닫기·이동 콜백과 공통 Dialog의 포커스/키보드 책임을 유지한다. 본문에서 푸터로 이동하면서 공통 footer의 여백이 적용되는 것은 의도된 변경이다.

브라우저에서 계정 찾기 모달 3종의 PC/모바일 footer, 리뷰 필수값 검증과 저장, 배송지 삭제, 탈퇴/로그아웃 취소, 런클럽 확인 후 닫기를 확인했다. JSX 이전 후 회원가입 4개 상태와 기존 홈·상품·국가 선택·마이페이지·런클럽·배송 안내의 DOM/좌표 비교도 통과했다.

회원가입의 우편번호 찾기는 기능 내부 `AddressSearchModal`로 분리했다. open·postalCode·address·변경 콜백·idPrefix를 받는 controlled API로 회원가입 데이터 타입에 의존하지 않는다. 현재 수동 입력 안내와 기존 label/id·입력 즉시 반영·확인 시 닫기를 유지하고 확인 버튼은 ModalDialog.footer에 둔다. 이후 공용 팝업 작업에서 organisms/Address로 승격하고 마이페이지에도 연결했다. 현재는 주소 검색 서비스 연동을 제공하지 않는다. Registration Storybook의 AddressSearch·MobileAddressSearch는 부모 입력 상태를 함께 제어한다.

## 기능별 모달 구성 분리 (2026-10-16)

MyPage의 로그아웃, 배송지 삭제, 탈퇴 확인/완료, 리뷰 편집은 각각 MyPageLogoutDialog·MyPageAddressDeleteDialog·MyPageWithdrawalDialog·MyPageWithdrawalCompleteDialog·MyPageReviewDialog로 분리한다. 모달은 controlled open·표시 값·콜백만 받으며 목록 삭제, 로그아웃, 탈퇴 단계 전환, 리뷰 검증/저장과 상태 수명은 기존 부모가 소유한다. 문구·입력 label·Dialog 크기·footer 버튼 배치를 유지한다.

PhoneVerificationDetailDialog는 상세 안내 프레임과 알뜰폰 사업자 데이터·구분선 스타일을 소유한다. 부모는 detail 선택 상태와 닫기 콜백을 전달한다. 기존 모바일 fullscreen 조건을 유지하며 알뜰폰 확인 버튼은 ModalDialog.footer로 옮겨 공통 고정 푸터 계약을 따른다. PasswordResetCompleteModal과 RunClubApplicationNotice는 이미 독립된 모달로서 유지한다. 당시에는 기능 내부 조합으로 유지했다. 이후 로그아웃과 공통 확인·취소 표현은 위의 대분류 간 공용 팝업 작업에서 공용화했다.

브라우저에서 리뷰 필수값 검증/저장, 배송지 삭제, 탈퇴 취소 및 확인→완료 안내 닫기, 로그아웃 취소, 런클럽 확인 닫기를 확인했다. 1920/375px 알뜰폰 안내의 사업자 3개 그룹과 footer 확인 닫기도 확인했다.

런클럽 목록·상세 스토리는 RunClubPreview를 공유하며, 목록은 `pages-mypage-runclub-list--list`, 상세 기본은 `pages-mypage-runclub-detail--open`으로 접근한다. IA 200/258/259 미리보기도 새 분류를 사용한다.

기능별 JSX·모달 분리 구현은 자체 파일에 배치와 안내 문구를 두고 기존 부모가 제어하는 값/콜백을 받는다. 계정 잠금 화면은 중복 배경 래퍼 없이 공통 ModalDialog의 backdrop·포커스 처리를 사용한다. 가입 주소 모달의 확인 액션과 각 기능의 모달 액션은 footer 슬롯을 사용한다.

## Typography 스크린 리더 전용 옵션 (2026-10-19)

추가 적용: `src/shared/components/organisms/Search/SearchCategorySelect.tsx`의 검색 범위 레이블도 `<Typography as="span" srOnly>`로 통일하고 중복 숨김 CSS를 제거했다. 기존 label/select 연결과 선택 이벤트는 유지한다. 타입 검사·해당 파일 ESLint·Prettier 통과. 브라우저·실제 스크린 리더 검증은 미실행이다.

`Typography`는 선택적 boolean `srOnly`를 제공한다(기본값 false). `<Typography as="h1" srOnly>`는 Panda의 `css({ srOnly: true })`로 시각적으로 숨기면서 제목 의미와 스크린 리더 접근을 유지한다. 숨김 클래스는 typography recipe와 독립적이므로 unstyled·명시적 variant 모두에 적용된다. prop은 내부에서 소비하고 DOM에는 전달하지 않는다. 기존 className·네이티브 속성과 web/mo 선택 계약을 유지한다.

작업 트리 출처는 `src/shared/components/atoms/Typography/Typography.tsx`, `src/shared/features/product/ProductDetailImageViewer.tsx`, `src/stories/components/atoms/Typography/Typography.stories.tsx`다. 상품 이미지 뷰어 제목에 적용하고 ScreenReaderOnly 스토리에서 Controls로 숨김을 전환할 수 있다. Panda 생성·전체 타입 검사·변경 TSX ESLint 통과. 브라우저·실제 스크린 리더 검증은 수행하지 않았다.


## Typography unstyled의 명시적 tone (2026-10-19)

`variant="unstyled"`(기본값)에서도 명시한 `tone`은 색상만 적용한다. tone을 생략하면 상위/네이티브 색상을 보존한다. 글꼴·크기·굵기·행간은 그대로 유지하고 weight는 계속 생략한다. web/mo에서 unstyled가 선택될 때도 동일하다. 색상 매핑을 typographyTones로 공유하며 기존 명시적 variant의 색상 계약을 유지한다. NotFoundPage의 tertiary 색상 선언을 `tone="tertiary"`로 이전하고 m=0을 유지했다.

작업 트리 출처: `src/shared/components/atoms/Typography/Typography.tsx`, `src/shared/features/not-found/NotFoundPage.tsx`, `src/stories/components/atoms/Typography/Typography.stories.tsx`. UnstyledTone 스토리는 상위 글꼴·크기·굵기를 상속하면서 tone 지정/생략 시 색상을 비교한다. 브라우저 시각 검증은 수행하지 않았다.


## Features 재사용성과 JSX 표현 점검 (2026-10-19)

component-reusability 스킬로 `src/shared/features/`의 168개 TSX를 조사하고 사용자 요청에 따라 동작을 보존하는 표현 개선을 적용했다. 동일한 web/mo 59곳을 단일 variant로 통합하고, 텍스트 span/p/h1~h6 94곳을 의미 태그·속성·기존 className을 유지한 Typography로 이전했다. 기존 타입 선언을 유지하기 위해 이 이전은 unstyled를 사용하며 임의의 유사 variant를 대입하지 않는다.

단일 사용 css 67곳(네이티브 구조 요소 56곳·기존 Panda 요소 11곳)을 Box/Flex/Grid/Stack/HStack props로 옮기고 기존 선택자는 css prop으로 유지했다. 무스타일 구조 HTML과 상위/공유 스타일을 사용하는 요소, li/dt/dd·폼 컨트롤·표·SVG·장식 span은 유지했다. Grid/Stack의 추가 gap은 원래 값에 맞췄고 기존 Grid가 제공하던 8px gap도 보존했다. 기본 display 중복 5곳을 제거했다. styled.button·styled.label은 네이티브 button/label과 Panda css로 바꿔 타입·htmlFor·이벤트·스타일 계약을 유지했다. 기존 Panda 태그를 무스타일 HTML로 되돌리는 정리는 수행하지 않았다.

Base UI 1.8.0의 package exports 전체를 공식 [컴포넌트 카탈로그](https://base-ui.com/react/overview/quick-start)와 대조했다. 공지사항은 openIndex·aria-expanded·조건부 본문을 직접 관리하므로 [Accordion](https://base-ui.com/react/components/accordion) 재사용 후보이며 설치 버전에서 지원한다(업그레이드 불필요). 공통 Accordion의 Header/Trigger/Panel과 구분선·초기 PC 열림·모바일 닫힘·더보기 계약을 함께 검증할 별도 변경으로 남겼다. role=status/alert 안내, 파일 input/label, 상품 Radio 래퍼와 이미지 뷰어 Escape 처리는 각각 네이티브 의미·기존 공용 상호작용을 유지한다. 정적 마크업에 새 Base UI를 추가하지 않았다.

분리 후보는 장바구니의 목록/합계/추천 영역, 런칭 캘린더의 필터/대표 상품/카드 레일, IA 대시보드의 요약/필터/표 영역이다. 상태와 정책은 기존 부모에 유지하며 여러 기능의 같은 계약이 확인되기 전까지 공용 컴포넌트로 승격하지 않는다. 기존 CheckoutLayout/Fields/Summary 및 상품·런클럽의 기능 내부 분리는 유지했다.

검증: Panda 생성, Features ESLint, 전체 타입 검사와 Next production build, Storybook production build를 실행했다. 변경 전 스냅샷 43개 파일의 JSX 976개를 정적으로 대조해 기존 Grid의 gap 보존을 보완했다. 대표 6개 컴포넌트(CheckoutLayout, CheckoutSummary, ProductInformation, ProductDetailDeliveryContent, ProductDetailReturnGuide, RunClubSessionNotes)의 PC/모바일 SSR 12건은 class 속성을 제외한 마크업이 일치했다. SSR 비교는 Next Link를 anchor로 대체하므로 실제 라우팅 검증을 포함하지 않는다. Storybook은 use client directive 및 번들 크기/타이밍 경고와 함께 빌드됐다. 브라우저 픽셀 비교·전체 상호작용 검증은 수행하지 않았다. 작업 트리 출처는 frontmatter의 해당 Features 경로다.


## Components 재사용성과 JSX 표현 점검 (2026-10-19)

component-reusability 스킬로 `src/shared/components/`의 213개 TSX를 점검하고 동작을 보존하는 표현 개선을 적용했다. 텍스트 50곳의 span/p/h1~h6는 Typography unstyled와 원래 as로 이전했고 기존 스타일·이벤트·접근성 속성을 유지했다. 동일 web/mo 2곳을 variant로 통합했다. Typography 자체 API와 기존 타입 스케일은 변경하지 않았다.

단일 사용 css 86곳(네이티브 구조 요소 64곳·기존 Panda 요소 22곳)을 Box/Flex/Grid/Stack/HStack/VStack props로 이전했다. 선택자와 복합 상태는 css prop, 공유 클래스와 변형은 기존 recipe에 유지했다. SectionHeader의 고정 flex 배치와 FormField boxed의 column·7px gap은 JSX로 옮기고 divider·spacing·invalid·disabled 변형은 recipe에 남겼다. Fieldset legend는 Box as=legend로 padding·bold를 표현하되 기존 조건부 숨김 CSS는 유지한다.

추가로 Box display=grid 2곳은 Grid gap=normal, Box display=flex 1곳은 Flex로 바꿨으며 기존 primitive의 중복 display 1곳을 제거했다. 새 Grid/Stack 계열의 기본 gap·정렬은 기존 값과 같도록 명시했다. MegaMenuAD의 styled(Link)·styled.img, MenuDrawerUtilityLinks의 styled(Link)는 Next Link/네이티브 img와 Panda css로 통일했다. href·onClick·className·desktop/mobile 표현은 유지했다.

무스타일 구조 div·section과 공유 스타일/상위 선택자를 사용하는 요소는 그대로 둔다. 아이콘·툴팁·진행 표시·Base UI render 슬롯의 span, 표·폼 컨트롤, li 12개·dt 7개·dd 7개와 SVG·motion 요소를 보존했다. Card.Description·EmptyState.Description의 p는 선택적인 children과 네이티브 props 전달 계약을 유지하기 위해 그대로 둔다. 기존 Panda 태그를 무스타일 HTML로 되돌리는 정리나 새 DOM 래퍼 추가는 수행하지 않았다.

검증: Panda 생성, 전체 타입 검사, Components ESLint, 변경 파일 Prettier, Next production build와 Storybook production build를 실행했다. 임시 TypeScript AST 비교에서 변경 65개 파일의 JSX 665개를 원래 의미 태그·속성과 css/recipe/JSX props·primitive 기본값을 해석해 대조했고 차이가 없었다. JSX 내부 표현식은 하위 JSX를 따로 비교하는 정적 검사이며 계산된 브라우저 CSS 검증을 대신하지 않는다. Button·Fieldset 일반/숨김·SectionHeader·FormField 기본/boxed error·TextInput·DataTable·StatusMessage·Tag·MetricGrid·MegaMenuAD PC/모바일·MenuDrawerUtilityLinks·FooterLegalLinks의 PC/모바일 SSR 30건은 class 속성을 제외한 마크업이 일치했다. Next Link는 anchor 대역이므로 실제 라우팅 검증은 포함하지 않는다. Storybook의 use client directive 및 번들 크기/타이밍 경고는 남았다. 브라우저 픽셀 비교·전체 키보드/포커스 회귀는 수행하지 않았다.

상호작용 유지 판단과 후속 재사용 후보는 [Organisms 기록](organisms.md#components-점검-후-재사용-판단-2026-10-19)을 참고한다. 작업 트리 출처는 frontmatter의 관련 Components 경로다.


## 단일 자식 선택자의 스타일 소유권 (2026-10-19)

RecommendedSearches의 유일한 ol에 적용하던 부모 `& ol`의 counterReset=item을 `<Box as="ol" counterReset="item">`로 이전했다. ol/li 의미·순서와 검색 클릭 콜백은 유지한다. mapped li의 justifyContent·gap과 li::before의 counterIncrement·content도 각 네이티브 li의 Panda css/_before로 이전했다. button 규칙은 기존 부모 선택자로 유지한다. 작업 트리 출처는 `src/shared/components/organisms/Search/RecommendedSearches.tsx`와 `.codex/skills/component-reusability/SKILL.md`다.

스킬은 단순 자식 선택자의 소유자가 하나의 로컬 JSX이고 해당 요소가 독립적으로 소유할 스타일이면 직접 적용하도록 정리했다. map으로 여러 DOM을 생성해도 동일한 JSX 소유자면 이전할 수 있고, 자체 before/after 스타일도 함께 옮길 수 있다. 조건부/반응형 분기·외부 children·경쟁 스타일을 확인하며 태그·counter 범위/순서·유효한 cascade를 보존해야 한다. 다른 소유자/외부 children을 포괄하는 공유 규칙, 부모 상태·형제/위치 관계와 실제 CSS 상속은 일괄 이전 대상이 아니다. 반복이나 가상 요소라는 이유만으로 부모에 남기지 않는다. 타입 검사·해당 TSX ESLint·Prettier·Panda 생성 통과. 브라우저 시각 검증은 수행하지 않았다.


## Features·Components 자식 선택자 소유권 전수 점검 (2026-10-19)

현재 component-reusability 정책으로 Features 168개·Components 213개, 합계 381개 TSX를 점검했다. 단순 자식/직계 자식 및 before/after 선택자 185개를 찾고, 실제 로컬 JSX 소유자와 map·조건부 분기·커스텀 컴포넌트 경계를 검토했다. 이번 작업에서 28개 소스 파일의 단순 선택자 67개를 직접 적용하거나 중복 제거해 잔여 개수는 118개다. 렌더링되는 DOM 수가 아니라 하나의 로컬 JSX가 소유하는 스타일 계약으로 판단했다.

- 단순 로컬 적용 56개 규칙은 제목/본문 여백·자체 폰트 스타일·리스트/이미지·리뷰 항목·회원가입 진행 li와 before 등 해당 JSX에 이전했다. Typography에는 className의 Panda css, Panda 레이아웃에는 지원하는 스타일 props, 네이티브 li·strong·small·img·textarea 등에는 css를 적용했다. 옮긴 규칙과 빈 부모 css는 제거했다. 외부/변형 recipe와 경쟁하는 폰트·색상 규칙은 무조건 낮은 specificity의 일반 클래스로 바꾸지 않았다.
- RunClubFacts는 부모의 행/설명 선택자를 각 Grid 행과 dd로 옮겼다. hero/guide의 64px 열, 모바일 62px 열, gap·padding·구분선·마지막 행 테두리와 mobileOnly의 none!/grid!를 유지한다. root의 배경/여백/hero 경계 책임은 그대로 둔다.
- 이미지 뷰어 썸네일의 button·img와 aria-pressed=true 오버레이는 renderItem이 소유한 네이티브 요소로 옮겼다. CarouselPagination이 renderItem 제공 시 기본 버튼을 추가하지 않는 실제 구현을 확인했다. RunClubSessionCard의 이미지 크기·objectFit는 Next Image의 className에 직접 적용했다. ProductDetailMobileGallery/ViewerGallery의 중복 img 선택자는 ProductDetailImage가 이미 동일한 display/block·100% 너비·auto 높이를 소유하므로 제거했다.
- 자체 before·상태는 필요에 따라 _before 또는 자기 자신을 지정하는 선택자로 유지한다. counter·순서·선택 상태를 바꾸거나 DOM 래퍼를 추가하지 않는다. native li/dt/dd 제외와 무스타일 구조 HTML 유지 기준도 계속 적용한다.

유지한 118개 단순 규칙에는 여러 로컬 소유자에 걸친 공통 문서/표 스타일, ContentLayout·SearchSuggestions·Terms의 외부/공용 자식 계약, Button·Select·Icon 등 공통 primitive 내부 스타일/variant override, 반응형·관계 선택자와 결합된 규칙이 포함된다. 예를 들어 ExploreHub hero의 span 규칙은 ButtonLink 내부 span에도 적용되므로 로컬 eyebrow 하나로 축소하지 않았고, h2의 반응형 규칙도 한 그룹으로 유지했다. 수선 안내의 nth-child 배치, 표의 행/열 관계, 역할·data 상태를 활용한 선택자는 무조건 삭제하지 않는다. CSS 상속 자체를 선택자 이전과 혼동하지 않는다.

검증: Panda 생성·전체 타입 검사·양쪽 폴더 ESLint·변경 파일 Prettier·Next production build·Storybook production build를 통과했다. TypeScript AST로 변경 28개 파일의 JSX 552개의 원래 의미 태그·네이티브 속성을 비교해 차이가 없었다(스타일 자체의 computed cascade 비교는 제외). SignupProgress(local/naver와 step 0~3), RunClubFacts(hero/guide 및 mobileOnly/detail), 세션 안내·포스터·주의 사항, HeaderLogo/SearchHeader, StoreResults(빈 값/매장), ProductReviews, ExploreHub, LaunchCalendar, 이미지 뷰어의 PC/모바일 SSR 46건은 class 속성 외 마크업이 일치했다. SSR은 Next Link를 anchor 대역으로 사용하므로 실제 라우팅/클릭·키보드 검증은 포함하지 않는다. 브라우저 computed CSS·픽셀 비교는 수행하지 않았다. 작업 트리 출처는 frontmatter의 관련 경로이며 이전 점검의 수치는 해당 작업 당시 기준이다.


## 다단계 자식 선택자의 로컬 소유권 (2026-10-19)

ReviewGalleryModal의 aside 아래 `& header div/small/button`, `& section div/button/.active` 6개 선택자를 정리했다. header의 정보 div는 Grid gap=1, section의 목록 div는 Flex gap=6px로 옮겼고, small 색상과 닫기 버튼 스타일도 각 JSX에 직접 적용했다. 반복 리뷰 Button의 크기·배치·테두리·색상·글자 크기는 해당 Button의 Panda className으로 옮겼다. Button 기본 recipe보다 우선하던 효과는 자체 `&&` 선택자로 보존한다. 중복된 section .active 규칙은 제거하고 기존 important 활성 클래스를 유지했다. 태그·DOM 구조·선택 조건·클릭 콜백과 모바일 조건은 바꾸지 않는다.

component-reusability의 단일 소유자 기준은 한 단계 선택자에 제한하지 않는다. `& header div`와 `& > header > div`처럼 여러 단계라도 전체 JSX 경로의 대상이 하나의 로컬 작성 노드로 확정되면 직접 적용한다. 공백 선택자는 직계 자식만 의미하지 않으므로 모든 매칭 분기와 커스텀 컴포넌트 출력까지 확인한다. 이번 추가 점검은 해당 모달 범위이며 앞선 381개 파일의 다단계 선택자까지 전수 검증했다는 뜻은 아니다.

검증: 전체 타입 검사, 해당 TSX ESLint, TSX·스킬 Prettier, Panda 생성을 통과했다. 변경 전후 TypeScript AST의 JSX 24개에서 의미 태그·네이티브 속성 차이가 없었고, 생성 CSS의 Button 자체 이중 클래스 우선순위를 확인했다. 브라우저 computed CSS·시각 비교는 수행하지 않았다. 작업 트리 출처는 `src/shared/components/organisms/Product/ProductDetailSections/ReviewGalleryModal.tsx`와 `.codex/skills/component-reusability/SKILL.md`다.


## 다단계 선택자 Features·Components 재점검 (2026-10-19)

Features 168개·Components 213개, 총 381개 TSX를 TypeScript AST로 다시 조사했다. 작업 시작 시 `&`를 포함한 스타일 속성 키는 333개였으며 자체 상태·우선순위 키도 포함한 수치다. 선택자 파서로 & 이후 자식/후손/형제 결합자를 가진 키 218개와 결합자가 두 단계 이상인 키 22개를 구분하고, 중첩 css/recipe 조건과 실제 JSX·공통 컴포넌트 출력도 확인했다. 이전 한 단계 위주 집계와 모집단이 다르므로 단순 잔여 개수로 비교하지 않는다.

이번 변경은 13개 소스 파일의 부모 선택자 17개다. 14개를 실제 작성 JSX에 직접 적용하고, 중복 활성 테두리 1개와 대상이 없는 규칙 2개를 제거했다.

- StoreResults의 `& article button`과 `& article button b`를 각각 mapped Button과 b에 옮겼다. 공통 Button 내부에는 b가 추가되지 않으며 로컬 자식 하나가 대상이다. 같은 부모의 p 규칙은 주소·빈 결과 두 작성 노드를 함께 대상으로 하므로 유지했다.
- SearchSuggestions의 `& header button`은 RecentSearches에만 있는 전체 기록 삭제 Button으로 옮겼다. RecentSearches의 현재 유일한 호출자는 SearchSuggestions임을 확인했다. 그 외 두 검색 섹션의 공통 제목·목록·항목·빈 상태 규칙은 공유 관계를 유지한다.
- ProfileQuestionGroup·OrderStatusTracker의 중첩 `&&` 아래 small/a 색상도 각각 로컬 Typography와 Link로 옮겼다. MegaMenuList의 링크 배치·자체 hover/focus 스타일은 mapped Link로 옮기고, 상위 링크의 상태에 의존하는 sale 자식 색상은 관계 선택자로 유지했다.
- ProductReviews 이미지 버튼, ReviewGalleryModal의 이미지 선택 Button, SearchCategorySelect의 Select, SearchForm의 TextInput/placeholder, SearchCollectionLinks의 mapped Button/마지막 구분선, 휴대폰 인증의 알뜰폰 상세 Button에 스타일을 직접 적용했다. 커스텀 컴포넌트는 className 전달 위치를 확인하고 공통 recipe보다 우선하던 선언은 자체 `&&`로 보존했다. 마지막 구분선은 동일 Button의 _last로 유지하며, 썸네일 활성 important 클래스·모바일 크기·클릭 조건은 유지한다. 휴대폰 상세 공통 class의 다른 소비자에는 justifySelf를 추가하지 않았다.
- ExploreDetailPage의 콘텐츠 section에는 ul/a 및 이를 출력하는 자식이 없으므로 해당 두 규칙을 제거했다. ContentLayout 외곽의 header나 바깥 ButtonLink를 잘못 대상으로 간주하지 않았다.

두 단계 이상인 22개 중 3개를 옮기고 19개는 다음 근거로 유지했다. 깊이가 깊다는 이유로 제외한 항목은 없다.

| 유지 영역 | 선택자 키 수 | 근거 |
| --- | --- | --- |
| DesignGuideTypography, ButtonDocs, DataTable, SizeGuideTable | 11 | 여러 작성 셀/표가 공유하거나 외부 children, rowspan, 행·열·짝수·형제 관계를 표현한다. SizeGuideTable의 두 번째 헤더 행도 네 개의 서로 다른 th를 대상으로 한다. |
| IconButton의 SVG fill/stroke | 2 | 호출자가 제공하는 아이콘 내부의 여러 도형을 대상으로 하는 공용 계약이다. |
| CarouselViewport, Terms | 2 | Swiper/외부 children과 Checkbox 라벨 내부의 외부 문구 전체에 적용하는 계약이다. |
| Button의 iconOnly 내부 span 경로 | 1 | 공용 Button의 조건부 iconOnly 슬롯 계약이다. 부모 조건과 서로 다른 frame/content 소비자를 분리하는 API 변경은 이번 스타일 이전 범위에 포함하지 않는다. |
| FooterLegalLinks | 1 | 여러 문구·링크 작성 노드가 공유하는 폰트 상속 규칙이다. |
| MegaMenuList | 1 | 링크 hover/focus와 sale 자식 사이의 상태 관계를 표현한다. |
| SignupTermsStep | 1 | 서로 다른 세 Terms 인스턴스의 Checkbox 내부 라벨을 함께 대상으로 한다. |

검증: Panda 생성·전체 타입 검사·변경 TSX ESLint·Prettier·최종 소스의 Next/Storybook production build·git diff --check 통과. OKF 소스 매핑 누락도 없었다. TypeScript AST로 13개 파일의 JSX 164개를 비교해 의미 태그·네이티브 속성 차이가 없었다. PC/모바일 SSR 28건(선택된 질문, 주문 조회, Sale/일반 메뉴, 리뷰, 검색 입력·카테고리·기획전, 검색어 있음/없음, 매장 있음/없음, 휴대폰 약관 오류 유무, Explore fallback)은 class 이외 마크업이 일치했다. SSR의 Next Link·navigation은 대역을 사용했으며 모달 열린 상태·실제 이벤트·브라우저 computed CSS·시각 동일성은 검증하지 않았다. 작업 트리 출처는 frontmatter의 이번 관련 경로다.
