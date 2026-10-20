---
type: Architecture
title: '컴포넌트와 스타일'
description: '공통 UI 계층, Panda CSS와 Storybook 작성 규칙을 설명한다.'
tags: [components, panda-css, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-20T01:14:02Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
working_tree_sources:
  - src/shared/features/find-account/FindAccountIdentityFields.tsx
  - src/shared/features/find-account/FindAccountCodeFields.tsx
  - src/shared/features/support/InquiryMessageFields.tsx
  - src/shared/components/molecules/FormFields/BirthDateField.tsx
  - src/shared/components/molecules/FormFields/CharacterCount.tsx
  - src/shared/components/molecules/FormFields/EmailField.tsx
  - src/shared/components/molecules/FormFields/NameField.tsx
  - src/shared/components/molecules/FormFields/PasswordField.tsx
  - src/shared/components/molecules/FormFields/PhoneNumberField.tsx
  - src/shared/components/molecules/FormFields/PreferenceField.tsx
  - src/shared/components/molecules/FormFields/TextareaField.tsx
  - src/shared/components/molecules/FormFields/TextFormField.tsx
  - src/shared/components/molecules/FormFields/VerificationCodeField.tsx
  - src/shared/components/molecules/FormFields/VerificationCountdown.tsx
  - src/shared/components/organisms/EmailAddressFields/EmailAddressFields.tsx
  - src/stories/components/molecules/FormFields/FormFields.stories.tsx
  - .codex/skills/component-reusability/references/form-fields.md
  - src/shared/components/organisms/Address/AddressFields.tsx
  - src/shared/components/organisms/Address/AddressField.tsx
  - src/shared/features/signup-registration/RegistrationContent.tsx
  - src/shared/components/atoms/Collapsible/Collapsible.tsx
  - src/shared/components/molecules/SupportTabs/SupportTabs.tsx
  - src/stories/components/atoms/Collapsible/Collapsible.stories.tsx
  - src/shared/features/cart/CartContent.tsx
  - src/shared/features/cart/CartItemRow.tsx
  - src/shared/features/cart/cart-item.ts
  - src/shared/components/molecules/OrderActionBar/OrderActionBar.tsx
  - src/stories/components/molecules/OrderActionBar/OrderActionBar.stories.tsx
  - src/stories/components/molecules/SupportTabs/SupportTabs.stories.tsx
  - src/shared/features/find-account/PasswordResetField.tsx
  - src/shared/features/find-account/PasswordResetContent.tsx
  - src/shared/features/find-account/FindAccountPage.tsx
  - src/shared/features/find-account/FindAccountContent.tsx
  - src/shared/features/login/RememberIdHelp.tsx
  - src/shared/components/layouts/AccountFormLayout/AccountFormLayout.tsx
  - src/shared/features/identity-verification/IdentityVerificationContent.tsx
  - src/shared/features/phone-verification/PhoneVerificationContent.tsx
  - src/shared/features/signup/SignupLayout.tsx
  - src/shared/features/signup-registration/RegistrationAdditionalFields.tsx
  - src/shared/features/signup-registration/RegistrationAddressFields.tsx
  - src/shared/features/signup-registration/RegistrationCompleteContent.tsx
  - src/shared/features/signup-registration/RegistrationPersonalFields.tsx
  - src/shared/features/signup-registration/RegistrationPreferenceRow.tsx
  - src/shared/features/support/InquiryAttachments.tsx
  - src/shared/features/support/InquiryNewPage.tsx
  - src/shared/features/support/InquiryCautions.tsx
  - src/shared/features/support/SupportPage.tsx
  - src/shared/features/support/SupportContactCard.tsx
  - src/shared/features/support/ShippingReturnsPage.tsx
  - src/shared/features/support/InquiryPage.tsx
  - src/shared/features/faq/FaqPage.tsx
  - src/shared/features/notices/NoticesPage.tsx
  - src/shared/components/atoms/FilterTabs/FilterTabs.tsx
  - src/shared/components/molecules/Faq/FaqControls.tsx
  - src/shared/components/molecules/Faq/FaqSearch.tsx
  - src/shared/components/molecules/Faq/FaqCategoryNav.tsx
  - src/stories/components/atoms/FilterTabs/FilterTabs.stories.tsx
  - src/stories/features/support/SupportPages.stories.tsx
  - src/stories/features/forms/form-state-audit/support.scenarios.tsx
  - src/shared/features/cart/CartOptionsDialog.tsx
  - src/shared/features/checkout/CouponDialog.tsx
  - src/shared/components/organisms/OrderRecommendations/OrderRecommendations.tsx
  - src/shared/components/organisms/OrderRecommendations/OrderRecommendationItem.tsx
  - src/shared/components/organisms/Signup/SignupBenefit.tsx
  - src/shared/components/organisms/Signup/SignupMethodButton.tsx
  - src/shared/components/organisms/Layout/SiteHeader/HeaderTools.tsx
  - src/shared/components/organisms/Search/RecentSearchItem.tsx
  - src/shared/components/organisms/Search/SearchOverlay.tsx
  - src/shared/components/organisms/Search/searchOverlayData.ts
  - src/stories/components/organisms/Search/SearchOverlay.stories.tsx
  - src/shared/components/layouts/BottomSheet/BottomSheetFooter.tsx
  - src/shared/components/organisms/Signup/SignupMethodStep.tsx
  - src/shared/components/molecules/AccountFormHeader/AccountFormHeader.tsx
  - src/shared/features/care-guide/CareGuidePage.tsx
  - src/stories/components/molecules/PageActionButton/PageActionButton.stories.tsx
  - src/shared/components/molecules/PageActionButton/PageActionButton.tsx
  - src/shared/components/organisms/Faq/FaqQuestion.tsx
  - src/shared/components/organisms/Faq/FaqAnswer.tsx
  - src/shared/components/organisms/Faq/FaqEmptyState.tsx
  - src/shared/Mockup/explore/exploreContent.ts
  - src/shared/Mockup/launch-calendar/LaunchCalendarPage.tsx
  - src/shared/features/store-finder/StoreFinderPage.tsx
  - src/shared/components/organisms/StoreFinder/StoreResults.tsx
  - src/shared/features/store-finder/store.data.ts
  - src/shared/Mockup/running-hub/stories/RunningExperienceRouteStory.tsx
  - src/shared/Mockup/explore/ExploreHubPage.tsx
  - src/shared/Mockup/product-detail-sections/SizeGuideTable.tsx
  - src/shared/Mockup/product-detail-sections/ProductInquiryNotices.tsx
  - src/shared/Mockup/product-detail-sections/ProductInquiryDeliveryNotice.tsx
  - src/shared/Mockup/product-detail-sections/ProductInquiryCareNotice.tsx
  - src/shared/Mockup/product-detail-sections/ProductInquiryAfterSalesNotice.tsx
  - src/shared/Mockup/product-detail-sections/ProductInquiry.tsx
  - src/shared/features/mypage/reviews/MyPageReviewsContent.tsx
  - src/shared/features/mypage/reviews/MyPageReviewTabs.tsx
  - src/shared/features/mypage/reviews/MyPageReviewToolbar.tsx
  - src/shared/features/mypage/reviews/MyPageReviewList.tsx
  - src/shared/features/mypage/reviews/MyPageReviewItem.tsx
  - src/shared/features/mypage/reviews/MyPageReviewLoadMore.tsx
  - src/shared/features/mypage/reviews/reviews.types.ts
  - src/shared/components/organisms/MyPage/ReviewEditor.tsx
  - src/shared/components/organisms/MyPage/ReviewList.tsx
  - src/shared/components/organisms/MyPage/ReviewListToolbar.tsx
  - src/shared/components/organisms/MyPage/ReviewStatusTabs.tsx
  - src/shared/components/organisms/MyPage/ReviewManager.types.ts
  - src/shared/Mockup/shoe-finder/ShoeFinderPage.tsx
  - src/shared/components/atoms/RatingStars/RatingStars.tsx
  - src/shared/components/atoms/RatingStars/RatingStarsControl.tsx
  - src/shared/components/organisms/MyPage/ReviewManager.tsx
  - src/shared/features/mypage/MyPageReviewDialog.tsx
  - src/shared/features/mypage/MyPageReviews.tsx
  - src/stories/components/atoms/RatingStars/RatingStarsSelection.stories.tsx
  - src/shared/Mockup/running-profile/RunningProfilePage.tsx
  - src/shared/Mockup/running-profile/RunningProfileContent.tsx
  - src/shared/Mockup/running-profile/ProfileQuestionGroup.tsx
  - src/shared/Mockup/running-profile/running-profile.data.ts
  - src/shared/features/mypage/mypage.data.ts
  - src/shared/features/mypage/stories/MyPageRouteStory.tsx
  - src/stories/features/Mockup/running-profile/ProfileQuestionGroup.stories.tsx
  - src/stories/components/molecules/MyPage/ProfileQuestionGroup.stories.tsx
  - src/shared/components/molecules/MainContentCard/MainContentCard.tsx
  - src/shared/components/molecules/ProductCompareButton/ProductCompareButton.tsx
  - src/shared/Mockup/product-detail-sections/ProductInquiryToolbar.tsx
  - src/shared/components/organisms/Search/SearchKeywordButton.tsx
  - src/shared/features/collection/CollectionDetailPage.tsx
  - src/shared/features/not-found/NotFoundPage.tsx
  - src/stories/features/not-found/NotFoundPage.stories.tsx
  - src/shared/features/state/StatePage.tsx
  - src/shared/components/organisms/Layout/SiteHeader/HeaderSearch.tsx
  - src/shared/features/catalog/product-listing/MobileProductFilterTrigger.tsx
  - src/stories/components/atoms/Button/Button.stories.tsx
  - src/shared/features/cart/CartPage.tsx
  - src/shared/features/checkout/CheckoutShipping.tsx
  - src/shared/features/checkout/CheckoutShippingForm.tsx
  - src/shared/features/checkout/CheckoutRecipientFields.tsx
  - src/shared/features/checkout/CheckoutAddressFields.tsx
  - src/shared/features/checkout/CheckoutSavedAddress.tsx
  - src/shared/features/checkout/CheckoutShippingInput.tsx
  - src/shared/features/checkout/CheckoutDeliveryRequest.tsx
  - src/shared/features/checkout/CheckoutPayment.tsx
  - src/shared/features/checkout/CheckoutComplete.tsx
  - src/shared/features/checkout/CheckoutPaymentNotice.tsx
  - src/shared/features/cart/CartDialogs.tsx
  - src/shared/features/cart/CartLimitDialog.tsx
  - src/shared/features/checkout/CheckoutSummary.tsx
  - src/stories/features/cart/CartPage.stories.tsx
  - src/stories/features/forms/form-state-audit/account.scenarios.tsx
  - src/stories/features/forms/form-state-audit/controls.scenarios.tsx
  - src/stories/features/forms/form-state-audit/enterAddress.ts
  - src/stories/features/forms/form-state-audit/MO.Expired.stories.tsx
  - src/stories/features/forms/form-state-audit/MO.Inheritance.stories.tsx
  - src/stories/features/forms/form-state-audit/MO.Validation.stories.tsx
  - src/stories/features/forms/form-state-audit/mypage.scenarios.tsx
  - src/stories/features/forms/form-state-audit/PC.Expired.stories.tsx
  - src/stories/features/forms/form-state-audit/PC.Inheritance.stories.tsx
  - src/stories/features/forms/form-state-audit/PC.Validation.stories.tsx
  - src/stories/features/forms/form-state-audit/product.scenarios.tsx
  - src/stories/features/forms/form-state-audit/shared.tsx
  - src/shared/components/layouts/OrderPageLayout/OrderPageLayout.tsx
  - src/shared/components/layouts/AccountPageLayout/AccountPageLayout.tsx
  - src/shared/features/signup-terms/SignupTermsAgreementList.tsx
  - src/shared/features/phone-verification/PhoneVerificationAgreements.tsx
  - src/shared/features/phone-verification/PhoneInformationFields.tsx
  - src/shared/features/phone-verification/VerificationCodeFields.tsx
  - src/shared/features/phone-verification/phone-verification.types.ts
  - src/shared/features/signup-registration/RegistrationEmailFields.tsx
  - src/shared/features/signup-registration/RegistrationField.tsx
  - src/shared/features/signup-registration/registration.types.ts
  - src/stories/utils/assertAccountFormLayout.ts
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
  - src/shared/Mockup/product-detail-sections/ProductInformation.tsx
  - src/shared/Mockup/product-detail-sections/ProductInquiryNoticeSection.tsx
  - src/shared/Mockup/product-detail-sections/ReviewGalleryModal.tsx
  - src/shared/components/organisms/Product/ProductGallery/ProductGallery.tsx
  - src/shared/components/organisms/Search/RecommendedSearches.tsx
  - src/shared/components/organisms/Search/SearchCollectionLinks.tsx
  - src/shared/components/organisms/Search/SearchHeader.tsx
  - src/shared/components/organisms/Search/SearchSuggestions.tsx
  - src/shared/components/organisms/Signup/SignupCompleteStep.tsx
  - src/shared/components/organisms/Signup/SignupTermsStep.tsx
  - src/shared/features/catalog/product-listing/ProductListingContent.tsx
  - src/shared/Mockup/explore/ExploreDetailPage.tsx
  - src/shared/features/explore/ExploreHubPage.tsx
  - src/shared/features/explore/ShoeFinderPage.tsx
  - src/shared/features/launch-calendar/LaunchCalendarPage.tsx
  - src/shared/Mockup/running-hub/RunningExperiencePage.tsx
  - src/shared/features/screen-index/DesignGuideColor.tsx
  - src/shared/features/screen-index/DesignGuidePage.tsx
  - src/shared/features/screen-index/DesignGuideTypography.tsx
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
  - src/shared/features/mypage/MyPageWithdrawalCompleteDialog.tsx
  - src/shared/features/mypage/MyPageWithdrawalDialog.tsx
  - src/shared/features/mypage/MyPageAddressDeleteDialog.tsx
  - src/stories/features/signup-registration/RegistrationPage.stories.tsx
  - src/shared/features/product/ProductDetailSupport.tsx
  - src/shared/features/run-club/RunClubApplicationNotice.tsx
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
  - src/shared/features/mypage/MyPageStatusPage.tsx
  - src/shared/features/screen-index/IaStructurePage.tsx
  - src/shared/features/screen-index/storybookLinks.ts
  - src/stories/features/run-club/RunClub.stories.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerBackButton.tsx
  - src/shared/components/organisms/Layout/SiteHeader/MegaMenuContent.tsx
  - src/shared/components/organisms/Layout/SiteHeader/MegaMenuPanel.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerShoppingLinks.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerBase.tsx
  - src/shared/components/atoms/EmptyState/EmptyState.tsx
  - src/shared/components/atoms/Pagination/Pagination.tsx
  - src/shared/components/layouts/BottomSheet/BottomSheet.tsx
  - src/shared/components/layouts/BottomSheet/BottomSheetHeader.tsx
  - src/shared/components/molecules/ColorFilter/ColorFilter.tsx
  - src/shared/components/molecules/MainSection/MainSection.tsx
  - src/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanel.tsx
  - src/shared/components/organisms/Catalog/CatalogFilterPanel/CatalogFilterPanelHeader.tsx
  - src/shared/components/organisms/Hero/HeroCopy.tsx
  - src/shared/components/organisms/InquiryBoard/InquiryBoard.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterBrand.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterBrandSocial.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterContent.tsx
  - src/shared/components/organisms/Layout/SiteFooter/FooterNavigationWeb.tsx
  - src/shared/components/organisms/Layout/SiteHeader/MegaMenuList.tsx
  - src/shared/components/organisms/Search/SearchDialog.tsx
  - src/shared/features/account-locked/AccountUnlockCompletePage.tsx
  - src/shared/features/catalog/product-listing/DesktopProductFilter.tsx
  - src/shared/features/catalog/ProductListingResults.tsx
  - src/shared/features/find-account/IdConfirmationModal.tsx
  - src/shared/features/home/HomeExploreSection.tsx
  - src/shared/features/product/ProductDetailAfterSalesContent.tsx
  - src/shared/features/product/ProductDetailMedia.tsx
  - src/shared/features/product/ProductInformation.tsx
  - src/shared/features/run-club/RunClubLayout.tsx
  - src/shared/features/run-club/RunClubResults.tsx
  - src/shared/features/signup-registration/RegistrationContent.tsx
  - src/shared/features/support/SupportExperiencePage.tsx
  - src/shared/features/notices/NoticeDetailPage.tsx
  - src/app/support/inquiries/page.tsx
  - src/app/support/inquiries/new/page.tsx
  - src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx
  - src/shared/features/faq/faq.data.ts
  - src/shared/components/molecules/SearchField/SearchField.tsx
  - src/shared/components/organisms/Faq/FaqList.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerGroups.tsx
  - src/shared/components/atoms/IconButton/IconButton.tsx
  - src/shared/components/organisms/Layout/SiteHeader/HeaderAuthLink.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerFrame.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerHeader.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerNavigation.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawerUtilityLinks.tsx
  - src/shared/components/organisms/Layout/SiteHeader/MegaMenuAD.tsx
  - src/stories/components/organisms/Faq/FaqList.stories.tsx
  - src/stories/components/molecules/SearchField/SearchField.stories.tsx
  - src/stories/components/organisms/Layout/SiteHeader/MegaMenuAD.stories.tsx
  - src/stories/components/atoms/Accordion/Accordion.stories.tsx
  - src/shared/components/organisms/Navigation/MenuDrawer/MenuDrawer.tsx
  - src/shared/components/layouts/AppLayout/AppLayout.tsx
  - src/shared/icons/fontAwesome.ts
  - src/shared/icons/iconAssets.ts
  - src/stories/components/atoms/Icon/Icon.stories.tsx
  - public/images/icon/unlock-keyhole.svg
  - public/images/icon/navigation/membership.svg
  - src/stories/components/organisms/Navigation/MenuDrawer/MenuDrawer.stories.tsx
  - src/shared/features/run-club/RunClubBadge.tsx
  - src/shared/features/locales/LocalesPage.tsx
  - src/shared/features/locales/LocalesLayout.tsx
  - src/shared/features/locales/LocaleRegionSection.tsx
  - src/shared/features/locales/locales.data.ts
  - src/shared/features/find-account/PasswordResetPage.tsx
  - src/shared/features/find-account/passwordValidation.ts
  - src/shared/features/find-account/phoneNumber.ts
  - src/shared/features/account-locked/AccountLockedPage.tsx
  - src/shared/features/account-locked/AccountLockedContent.tsx
  - src/stories/features/locales/LocalesPage.stories.tsx
  - src/stories/features/find-account/PasswordResetPage.stories.tsx
  - src/stories/features/account-locked/AccountLockedPage.stories.tsx
  - src/shared/components/atoms/RatingInput/RatingInput.tsx
  - src/shared/components/atoms/DescriptionList/DescriptionList.tsx
  - src/shared/components/molecules/ModalDialog/ModalDialog.tsx
  - src/shared/components/molecules/ModalDialog/ModalDialogHeader.tsx
  - src/shared/components/molecules/ModalDialog/ModalDialogFooter.tsx
  - src/stories/components/atoms/RatingInput/RatingInput.stories.tsx
  - src/stories/components/organisms/MyPage/ReviewManager.stories.tsx
  - src/stories/components/molecules/ModalDialog/ModalDialog.stories.tsx
  - src/shared/features/home/HomeLayout.tsx
  - src/shared/features/home/HomePage.tsx
  - src/shared/features/signup/SignupPage.tsx
  - src/shared/features/product/ProductDetailLayout.tsx
  - src/shared/features/product/ProductDetailPage.tsx
  - src/shared/features/product/ProductWidthSelector.tsx
  - src/shared/features/product/ProductDetailHeaderMeta.tsx
  - src/shared/features/signup-terms/SignupTermsDetail.tsx
  - src/shared/features/signup-terms/SignupTermsContent.tsx
  - src/shared/features/signup-terms/PreviousTermsPicker.tsx
  - src/shared/features/mypage/RunningProfilePage.tsx
  - src/shared/features/run-club/RunClubSessionHero.tsx
  - src/stories/features/signup/SignupPage.stories.tsx
  - src/stories/features/signup-terms/SignupTermsPage.stories.tsx
  - AGENTS.md
  - src/stories/features/mypage/MyPage.stories.tsx
  - src/shared/features/login/LoginContent.tsx
  - src/shared/features/login/LoginLayout.tsx
  - src/shared/features/login/LoginForm.tsx
  - src/shared/features/login/LoginActions.tsx
  - src/shared/features/login/LoginMembership.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderContainer.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderFrame.tsx
  - src/shared/components/organisms/Layout/SiteHeader/SiteHeaderContent.tsx
  - src/shared/features/checkout/CheckoutPage.tsx
  - src/shared/features/checkout/CheckoutLayout.tsx
  - src/shared/features/checkout/CheckoutContent.tsx
  - src/shared/features/checkout/checkout-summary.ts
  - src/shared/styles/global.scss
  - src/stories/features/checkout/CheckoutPage.stories.tsx
  - src/stories/components/organisms/Layout/SiteHeader/SiteHeader.stories.tsx
  - src/stories/components/atoms/Typography/Typography.stories.tsx
  - src/shared/components/atoms/SegmentedControl/SegmentedControl.tsx
  - src/shared/components/organisms/MyPage/CouponManager.tsx
  - src/shared/components/organisms/MyPage/EmployeeCoupons.tsx
  - src/shared/Mockup/product-detail-sections/ProductReviews.tsx
  - src/shared/Mockup/product-detail-sections/ProductDetailSections.tsx
  - src/stories/components/atoms/SegmentedControl/SegmentedControl.stories.tsx
  - src/stories/components/layouts/AppLayout/AppLayout.stories.tsx
  - src/stories/features/Mockup/product-detail-sections/ProductDetailSections.stories.tsx
  - src/shared/features/mypage/MyPage.tsx
  - src\shared\features\checkout\CheckoutProductList.tsx
  - src\shared\features\checkout\CheckoutDiscountSummary.tsx
  - src\shared\features\checkout\CouponProductItem.tsx
  - src\shared\features\checkout\CartCouponOptions.tsx
  - src\shared\features\checkout\CouponAmountSummary.tsx
  - src\shared\features\find-account\FindAccountIdentityFields.tsx
  - src\shared\features\find-account\FindAccountCodeFields.tsx
  - src\shared\features\identity-verification\VerificationMethodCard.tsx
  - src\shared\features\mypage\reviews\MyPageReviewSort.tsx
  - src\shared\features\mypage\reviews\MyPageReviewCount.tsx
  - src\shared\features\phone-verification\PhoneVerificationForm.tsx
  - src\shared\features\product\ProductSupportContact.tsx
  - src\shared\features\product\ProductSupportLink.tsx
  - src\shared\features\notices\NoticeHeading.tsx
  - src\shared\features\notices\NoticeContent.tsx
  - src\shared\features\notices\NoticesList.tsx
  - src\shared\features\support\InquiryCustomerInfo.tsx
  - src\shared\features\support\InquiryCategoryFields.tsx
  - src\shared\features\support\InquiryMessageFields.tsx
  - src\shared\features\support\InquiryFormActions.tsx
  - src\shared\features\support\InquiryEmptyState.tsx
  - src\shared\features\support\InquiryQuestion.tsx
  - src\shared\features\support\InquiryAnswer.tsx
  - src\shared\features\support\InquiryListItem.tsx
  - src\shared\features\support\SupportMileageContent.tsx
  - src\shared\features\support\SupportContacts.tsx
  - src\shared\features\support\SupportHours.tsx
  - src\shared\features\support\SupportNotices.tsx
  - src\shared\features\support\SupportFaq.tsx
  - src/shared/Mockup/teamwear/TeamwearPage.tsx
  - src/shared/features/size-guide/SizeGuidePage.tsx
  - src/shared/features/support/support.navigation.ts
  - src/stories/features/Mockup/teamwear/TeamwearPage.stories.tsx
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

## 폼 필드 공통화와 스킬 반영 (2026-10-20)

TextFormField와 이름·전화·이메일·비밀번호·생년월일·인증번호·textarea의 의미별 조합을 molecules/FormFields에 추가했다. 입력/설명/오류는 기존 FormField/TextInput을 사용하며, 별도 DOM 래퍼나 검증 라이브러리를 도입하지 않는다. 시간·글자수·수신 동의 표시도 공유하며 split 이메일은 organisms/EmailAddressFields로 분리했다. 기능 어댑터와 부모 콜백은 유지한다. AddressFields는 separated/fieldOptions로 마이페이지의 ID·필수·읽기 전용·비활성 상태·버튼 배치를 보존한다.

실제 API·소비처·유지 대상·검증은 [폼 필드 이관 결과](form-fields.md#공통-필드-이관-결과-2026-10-20)에 기록했다. 변경 타입·린트/포맷·Next/Storybook 빌드와 40개 테스트, PC/MO 18쌍 좌표/속성 비교, Storybook play 22개와 별도 동작 9개를 확인했다. 외부 주소 검색·인증·메일·결제 API 연결은 추가하지 않았다.

component-reusability의 [진입 문서](../../.codex/skills/component-reusability/SKILL.md)와 [폼 필드 참조](../../.codex/skills/component-reusability/references/form-fields.md)에 이번 조사에서 확인한 공통화 경계와 속성 보존 기준을 반영했다. 조사 요청·이관 요청·스킬만 수정하는 요청의 범위를 구분하며, 동일 placeholder를 동일 검증 정책으로 해석하지 않는다. 정적인 조사 개수나 특정 화면 목록을 향후 모든 작업의 의무 범위로 고정하지 않는다.

## 주소 필드 공통화와 폼 전수 조사 (2026-10-20)

CheckoutAddressFields와 RegistrationAddressFields는 공용 organisms/Address/AddressFields에 값·오류·변경 콜백과 팝업 제어를 전달하는 어댑터다. AddressFields는 우편번호·찾기 버튼·주소·상세주소와 AddressSearchModal 연결을 담당하고, AddressField는 label/input/error를 compact/boxed로 표시한다. 이전 구성 분리 기록의 주소 재사용 보류 판단은 이 구현으로 대체했다.

variant=compact는 기존 결제의 14px native input·우편번호 readOnly·수정 가능한 주소·비제어 상세주소와 name/FormData를 보존한다. boxed는 기존 회원가입 FormField/TextInput·우편번호/주소 disabled·제어 상세주소를 보존한다. 회원가입의 기존 상세주소 별표/required 차이도 임의로 변경하지 않았다. 값·오류·팝업 상태는 각 부모가 소유하며 모달 렌더링만 AddressFields가 담당한다. 회원가입 AccountFormLayout의 별도 dialogs 조합과 CheckoutShipping의 별도 AddressSearchModal은 제거했다. 마이페이지 주소는 required/readOnly/disabled·배치 계약이 달라 이번 이관에서 제외하고 후속 후보로 기록했다.

타입·변경 ESLint/Prettier·Panda·Next/Storybook 빌드·기존 테스트 40개를 확인했다. 결제/회원가입 각각 PC 1600px·MO 375px의 변경 전후 모달 오류/값 반영, 상세주소 입력과 위치·크기·font/padding·name/disabled/readOnly 일치를 확인했다. 결제 FormData·배송지 전환 후 주소 유지와 기존 회원가입 이메일 확인→부가정보 이동/비밀번호 오류 회귀 PC/MO 4개 사례를 확인했다. 실제 주소 검색은 미연결 미리보기다.

전체 소스의 이름·연락처·인증번호·비밀번호·이메일·생년월일·주소·textarea·동의 항목을 조사했다. 적용 후보·기존 공용화 유지·필수 표시와 검증 정책 차이 및 확인 파일은 [폼 필드 전수 조사](form-fields.md)에 기록한다. 주소 외 후보의 자동 이관은 수행하지 않았다.

## 기능 화면 구성 분리와 고객센터 메뉴 정리 (2026-10-20)

선택된 UI를 feature 내부 컴포넌트 29개로 분리했다. 부모의 데이터 조회·상태·콜백을 유지하고 children을 추가 DOM 래퍼 없이 대체했다. 기존 FormField/TextInput/Radio/Accordion/Collapsible/Dropdown과 공용 레이아웃을 그대로 사용한다.

| 소유 기능             | 분리한 구성과 입력 계약                                                                                                                                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| checkout              | CheckoutProductList(rows), CheckoutDiscountSummary(total/discount/onCoupons), CouponProductItem(item/product/expanded/selected와 변경 콜백), CartCouponOptions(value/onValueChange/eligible), CouponAmountSummary(total/discount) |
| find-account          | FindAccountIdentityFields(이름·휴대폰 값/오류/변경 콜백), FindAccountCodeFields(코드·오류·남은 시간·변경 콜백)                                                                                                                    |
| identity-verification | VerificationMethodCard(method/onSelect), 기존 버튼·아이콘 영역과 160px 높이 유지                                                                                                                                                  |
| phone-verification    | PhoneVerificationForm(기존 폼 정보·오류·인증 요청/확인 콜백), form/noValidate·버튼 type·재요청 비활성 조건 유지                                                                                                                   |
| mypage/reviews        | MyPageReviewSort(sort/onSortChange), MyPageReviewCount(count), 기존 native Select와 20px 높이·132px 너비 유지                                                                                                                     |
| notices               | NoticesList(공지/표시 수/열린 항목/변경 콜백/플랫폼), NoticeHeading(notice/platform), NoticeContent(notice/index), 단일 펼침·첫 공지 본문·PC/MO 높이 유지                                                                         |
| product               | ProductSupportContact, ProductSupportLink(title/description/label/to), 기존 tel/Link와 반응형 열 유지                                                                                                                             |
| support 문의          | InquiryCustomerInfo, InquiryCategoryFields, InquiryMessageFields(title/body/invalid/변경 콜백), InquiryFormActions(onCancel), InquiryEmptyState, InquiryListItem(item), InquiryQuestion(item), InquiryAnswer                      |
| support 정책·메인     | SupportMileageContent(title), SupportContacts, SupportHours, SupportNotices, SupportFaq, 기존 제목 ID·링크·PC/MO 간격 유지                                                                                                        |

쿠폰 선택/적용/취소·확장 상태는 CouponDialog, 계정 찾기 타이머/인증은 FindAccountPage, 문의 입력·파일·오류·취소/이동은 InquiryNewPage가 계속 소유한다. 문의 완료 Accordion은 기존 초기 펼침을 유지한다. 메뉴에 표시하는 데이터와 문구는 추출한 기능 컴포넌트 안에서 기존 값을 사용한다.

팀/단체복 화면은 src/shared/Mockup/teamwear/TeamwearPage.tsx로 이동하고 Storybook Mockup/Teamwear에 PC/MO를 보존했다. 운영 /support/teamwear 라우트·고객센터 메뉴와 IA 215(eland_hcu_08)는 제거했다. 새 사이즈 가이드는 /support/size-guide, SizeGuidePage와 공통 제목·탐색만 제공하며 본문은 null이다. 메뉴와 IA 260에 연결하고 디자인 대기 상태로 기록했다. 임의 디자인·안내 문구는 추가하지 않았다.

검증: 변경 TS/TSX·테스트의 ESLint/Prettier, Panda 생성·Next/Storybook production build, 폼·계정 복구·주문 합계 40개와 App Router 2개 테스트가 통과했다. Edge headless에서 기존 play를 포함한 Storybook 32개를 렌더링하고 쿠폰 적용 432,000원·공지 단일 펼침·문의 오류/취소 후 값 유지·문의 답변 접기·계정 찾기 결과/비밀번호 이동·휴대폰 인증·리뷰 정렬을 확인했다. 상품 배송 고객센터는 1600px/375px에서 펼친 후 전화·FAQ 링크를 확인했다. 사이즈 가이드 PC/MO는 제목 존재·본문 h2 없음, IA 검색은 팀/단체복 미노출·사이즈 가이드 노출을 확인했다. 실제 Next 서버에서 /support/size-guide 200과 /support/teamwear 404를 확인했다. 임시 Python 정적 서버의 동적 자산 전송 실패는 Node 정적 서버로 교체해 나머지 사례를 확인했으며 제품 소스 오류가 아니었다. 사이즈 가이드 모바일 화면을 시각 확인했다. 외부 인증·문의 저장·결제 API 연동 검증은 수행하지 않았다.

## 장바구니 팝업과 결제 구성 분리 (2026-10-20)

`CartDialogs`는 rows/editingKey로 기존 옵션 팝업을 표시하고 onSave(item, next)·onEditClose를 호출한다. `CartLimitDialog`는 open/onOpenChange로 수량 제한 안내를 표시한다. 옵션 저장에 따른 선택 키 치환과 onOptionsChange/onQuantityChange 분기는 CartPage에 유지한다.

`CheckoutFields.tsx`를 제거하고 사용처를 개별 컴포넌트로 연결했다. `CheckoutShipping`은 편집 여부·우편번호·주소·모달 상태, `CheckoutSavedAddress`는 기존 배송지 요약, `CheckoutShippingForm`은 직접 입력 구성을 담당한다. 그 안의 `CheckoutRecipientFields`는 이름·연락처, `CheckoutAddressFields`는 우편번호·주소·상세주소를 표시한다. 두 입력 모드는 `CheckoutShippingInput`으로 native input의 스타일·속성을 공유한다. `CheckoutDeliveryRequest`는 요청 선택·250자 직접 입력 상태, `CheckoutPayment`는 native radio 결제 수단과 PaymentMethod 타입을 소유한다. 폼 검증·쿠폰·동의 상태는 CheckoutContent에 유지한다. 완료 화면은 `CheckoutComplete`, 결제 안내문은 `CheckoutPaymentNotice`로 분리했다. 추가 DOM 래퍼 없이 기존 section/form·간격·반응형 스타일을 유지한다.

재사용 검토: 주소 모달은 회원가입 RegistrationContent·마이페이지 MyPageAddresses와 같은 공용 `AddressSearchModal`을 이미 사용하므로 그대로 유지했다. Button·Checkbox·Typography·OrderRecommendations·SingleActionDialog도 재사용한다. RegistrationAddressFields는 회원가입 information/fieldErrors에 결합되어 있고 disabled 입력을 사용한다. 결제는 readOnly 우편번호와 수정 가능한 주소를 FormData에 포함하므로 직접 가져오지 않았다. 공용 FormField/TextInput의 boxed 입력은 21px 높이·16px 글꼴 등 별도 계약이 있어, 결제의 14px 입력·여백·포커스를 보존하는 feature 내부 input만 공통화했다. 실제 주소 검색 서비스는 미연결이며 모달의 미리보기 직접 입력 안내를 유지한다.

출처는 위 작업 트리의 cart/checkout 파일과 검토한 RegistrationAddressFields·AddressSearchModal·TextInput이다. Codex가 타입 검사·변경 TSX ESLint/Prettier·주문 합계 테스트 3개·Panda 생성·Next/Storybook production build를 확인했다. Edge headless 1600px/375px에서 직접 입력 필수 오류, 주소 모달 필수 오류/적용, 배송지 전환 후 주소와 요청사항 유지, 결제 수단 선택·동의·주문 완료와 추천 4개, 장바구니 옵션 저장/선택 유지/취소를 확인했다. 결제 직접 입력 화면을 두 너비에서 시각 확인했다. 외부 주소 검색·실제 결제 연동과 수량 제한 팝업의 브라우저 검증은 수행하지 않았다.

## 추천 상품과 가입 방법 구성 분리 (2026-10-20)

`OrderRecommendations`는 추천 목록과 이미지 선택을 유지하고 같은 폴더의 `OrderRecommendationItem`에 상품의 id/gender/name/price와 imageSrc를 전달한다. 항목은 상품 링크·140px 이미지·성별 기본값·두 줄 상품명·가격 표시를 소유한다. 기존 네 상품 순서, 가로 스크롤과 DOM 구조를 유지한다.

`SignupMethodStep`의 혜택은 benefits 배열을 같은 폴더의 `SignupBenefit`으로 렌더링한다. iconName/title/description을 전달하며 3열 배치·108px 최소 높이·모바일 전용 줄바꿈을 유지한다. 가입 버튼은 methodOrder의 kakao/naver/local 순서로 `SignupMethodButton`을 렌더링한다. 버튼은 methodConfig에 문구·아이콘·CSS 변수 색상을 모으고 method/onSelect를 받는다. 기존 methods 조회와 선택 콜백은 부모가 소유하고 fullWidth·primary·tall 계약을 유지한다.

출처는 위 컴포넌트들의 작업 트리 파일이다. Codex가 전체 타입 검사와 변경 TSX 5개의 ESLint·Prettier 검사를 통과한 것을 확인했다. 브라우저 시각·상호작용 검증은 수행하지 않았다.

## FAQ 컨트롤 분리 (2026-10-20)

`FaqControls`의 검색 영역은 같은 폴더의 `FaqSearch`, 카테고리 탐색은 `FaqCategoryNav`가 소유한다. 검색은 query/onQueryChange, 카테고리는 category/categories/onCategoryChange를 전달받는다. `FaqControls`의 기존 공개 props와 FaqPage의 상태 소유권은 유지한다. DOM 래퍼를 추가하지 않고 검색 폭 590px·모바일 100%, PC/MO 여백과 nav 접근성 이름, outline 필터를 그대로 이동했다.

출처는 위 세 작업 트리 파일이다. Codex가 타입 검사와 세 TSX 파일의 ESLint·Prettier 검사를 통과한 것을 확인했다. 브라우저 시각·상호작용 검증은 수행하지 않았다.

## features 재사용 개선 적용 (2026-10-20)

- features의 동일한 Typography web/mo 리터럴 102곳을 variant 하나로 통합했다. 플랫폼 값이 다른 제목, 동적 값과 기존 variant의 타입 스케일은 유지한다.
- CartContent와 CartItemRow는 장바구니 feature 내부의 표현 구성이다. OrderActionBar는 장바구니와 결제가 공유하는 children 슬롯이며, PC static/MO fixed, 하단 패딩 32px와 가로 패딩 16px, 모바일 상단 테두리를 보존한다. 결제 버튼은 기존 form 안에 남아 native submit을 사용한다.
- 공지는 공용 Accordion의 단일 펼침과 indicator=null을 사용한다. PC 첫 항목 열림/MO 모두 닫힘, 59px/55px 트리거 높이와 본문 간격을 유지한다. 설치된 Base UI 1.8.0 Accordion은 방향키 로빙 포커스를 지원하지 않으므로 Tab/Shift+Tab과 Enter로 검증한다.
- 쿠폰은 공용 Collapsible의 triggerRender로 기존 Button link/sm을 합성한다. 기본 trigger 스타일과 사용자 render의 스타일은 중복 적용하지 않는다. 선택 상태는 팝업이 소유하며 펼침을 닫아도 유지하고, 패널 상단 16px 간격을 유지한다.
- 약관 시행일은 Popover.Portal/Positioner/Popup을 사용한다. 포털에 platform 클래스를 전달하며 트리거 왼쪽 정렬·8px 간격, Radio 선택 후 닫기, Escape·외부 클릭과 포커스 복귀를 지원한다. 약관 본문은 Grid gap=normal로 기본 8px gap을 추가하지 않는다.
- SupportTabs의 scrollable variant는 기존 Button을 render로 합성해 마일리지 탭의 가로 스크롤·높이·선택 밑줄·글꼴을 유지한다. 기본 variant는 기존 32px 높이와 균등 너비를 유지한다. 방향키는 포커스를 옮기고 Enter가 선택을 확정한다.
- 상품 고객센터의 contactDetails div는 Stack gap=2로 이전했다. 리뷰 정렬 Select는 && 범위에서 기본 border/bg/p/minH를 명시적으로 재정의해 클래스 나열 순서 의존을 없앴다. native select와 결제 radio는 유지한다.

검증 출처는 각 작업 트리 소스와 src/stories의 공용 컴포넌트·장바구니·결제·고객센터 사례다. 2026-10-20 Codex가 Panda 생성, typecheck, Next production build, Storybook production build, 임시 산출물 제외 전체 lint(`npm run lint -- --ignore-pattern ".tmp*/**" --max-warnings 0`), diff 공백 검사와 OKF staged/working-tree 매핑을 확인했다. 일반 `npm run lint`는 기존 .tmp-storybook* 빌드 산출물까지 포함해 실패하므로 이 실행에서는 임시 디렉터리를 명시적으로 제외했다. 브라우저에서 1600px/375px 장바구니 선택·관심상품·주문 비활성화, 공지 단일 펼침/Tab 포커스/59px·55px 높이, 약관 Escape/포커스 복귀/날짜 선택/외부 클릭 닫기, 쿠폰 48,000원 할인 후 432,000원 결제 표시, PC/MO 데모 주문 완료, 마일리지 선택과 공용 탭 방향키+Enter를 확인했다. 리뷰 정렬의 computed height 20px/padding 0/border 0/투명 배경과 정렬 값 변경, 기본 탭 32px, 하단 액션 PC static/padding 0 및 MO fixed/padding 16px 16px 32px도 확인했다. 모바일 장바구니 화면을 시각 확인했다. 전체 화면 픽셀 비교나 외부 결제/API 연동 검증을 수행한 것은 아니다.

## 로그인·계정 찾기 첨부 디자인 반영 (2026-10-19)

2026-10-19 재첨부한 32768×1716 이미지의 로그인 기본·오류·도움말, 아이디/비밀번호 찾기 기본·오류·코드 입력·결과, 비밀번호 재설정 기본·오류·완료를 기존 구현과 대조했다. 이미지의 다른 가입/잠금 해제 영역은 이번 변경 범위에 포함하지 않는다.

- LoginForm의 아이디 저장 옆에 기능 내부 RememberIdHelp를 추가했다. Base UI Popover의 hover·클릭·키보드 접근·Escape·포커스 복원을 사용하며 제목·설명·화살표·192px 너비와 흰색 그림자를 Panda CSS로 표현한다. 새 공용 컴포넌트는 추가하지 않는다.
- FindAccountContent의 휴대폰 번호 라벨을 시안에 맞춰 띄어쓰고 인증번호를 필수 필드로 표시한다. 기존 500px 중앙 폭과 PC 600px 최소 높이·모바일 뷰포트 높이는 유지한다. 예시 코드 성공 후 기존 결과 팝업을 표시한다.
- PasswordResetContent의 36px PC 제목을 공통 AccountFormHeader의 28px PC/22px 모바일 계정 제목으로 맞췄다. PC에 적용되던 뷰포트 최소 높이를 제거하고 하단 124px 여백을 적용해 본문 뒤에 푸터가 이어지도록 한다. 모바일 뷰포트 최소 높이는 유지한다. 입력은 ‘새로운 비밀번호’·‘비밀번호 확인’, placeholder는 ‘비밀번호를 입력해 주세요’·‘비밀번호를 한 번 더 입력해 주세요’로 맞추고 FormField.required를 사용한다. 버튼은 공통 primary/tall 기본값으로 불필요한 강제 변수 덮어쓰기를 제거한다.

작업 트리 출처: `src/shared/features/login/RememberIdHelp.tsx`, `src/shared/features/login/LoginForm.tsx`, `src/shared/features/find-account/FindAccountContent.tsx`, `src/shared/features/find-account/FindAccountPage.tsx`, `src/shared/features/find-account/PasswordResetContent.tsx`, `src/shared/features/find-account/PasswordResetField.tsx`와 관련 login/find-account·FormStateAudit 계정 스토리. 실제 인증·SMS·계정 조회는 데모 범위다.

검증: 전체 타입 검사, 변경 파일 ESLint·Prettier, Panda 생성, Next production build, Storybook build 및 `okf:check`를 통과했다. 브라우저 Storybook에서 PC/MO 도움말 닫기·포커스 복원, 잘못된 코드와 예시 코드의 결과 팝업, 결과에서 재설정 이동, PC/MO 필수 오류와 완료 후 로그인 이동을 확인했다. 전체 `npm run lint`는 기존 `.tmp-storybook-ia-routes` 등 임시 빌드 산출물을 검사해 실패했으며 해당 폴더를 삭제하거나 설정을 바꾸지 않았다. Next build의 첫 실행은 다른 빌드의 실행 잠금으로 종료되었고, 잠금 해제 후 재실행은 통과했다.

## 고객센터 첨부 시안 디자인 반영 (2026-10-19)

사용자가 제공한 고객센터 합성 스크린샷을 화면별로 확대해 현재 구현과 비교했다. 임시 이미지 경로는 저장소의 영구 출처로 취급하지 않는다. 메인 FAQ는 목록 대신 제목·PC 구분선·안내문·바로가기 버튼으로 구성하며, 연락처에는 전화 아이콘, 운영시간에는 시계 아이콘을 사용한다. 메인의 평일·일반 유선상담 표기는 시안의 10:00~17:00을 반영했다.

FAQ 카테고리는 FilterTabs의 새 `outline` variant를 사용한다. 미선택은 흰 배경·회색 테두리·회색 글자, 선택은 검은 배경·흰 글자로 표시한다. 기존 단일 선택·키보드·모바일 가로 스크롤 계약을 유지한다. 검색과 카테고리에 따른 더보기 분모는 필터 결과의 실제 페이지 수로 계산한다.

PageActionButton의 `width`는 기본 500px, `compact` 180px, `narrow` 160px이며 compact/narrow는 모바일에서 본문 전체 너비다. 고객센터 메인·문의하기는 compact, FAQ·공지 더보기는 narrow를 사용한다. 너비는 컴포넌트 내부 Panda JSX에서 생성해 호출자의 임의 객체 속성이 CSS 추출에서 누락되지 않도록 한다.

문의등록은 기존 FormField boxed와 Dropdown으로 필드 안쪽 라벨을 구성하고 모바일에서는 분류를 한 열로 배치한다. 제목·내용 오류와 문자 수 표시를 유지하고 취소는 ConfirmDialog로 표시한다. InquiryAttachments는 기능 내부 표현·입력 컴포넌트로, 선택 파일 목록·삭제·최대 5개·파일당 10MB·JPG/PNG/PDF 확장자 검사를 제공한다. 실제 업로드나 문의 저장 API는 추가하지 않았으며 기존 등록 후 목록 이동을 유지한다.

팀/단체복의 ONLINE/OFFLINE STORE는 PC 두 열·동일 높이 카드, 모바일 한 열이며 문의 버튼은 온라인 카드의 운영시간 아래에 둔다. 배송·세탁 안내와 팀/단체복의 제목 아래 추가 구분선은 제거한다. 배송·세탁 본문과 매장 찾기 구현은 유지한다.

정적 Storybook에서 Edge headless 1600px·375px로 메인 버튼 180px/343px, 가로 넘침 없음, FAQ 선택 색상·필터·검색, 문의 오류·수정 후 해제, 파일 추가·삭제·개수/용량 오류와 취소 모달의 입력 유지, 팀/단체복 배치를 확인했다. 타입 검사·변경 TSX ESLint/Prettier·Panda 생성·Next.js/Storybook 빌드가 통과했다. 새 outline PC/MO·하단 버튼 너비·문의등록 PC 스토리를 기존 `src/stories/`에 추가했다.

## 헤더 input과 검색 패널 확정 디자인 (2026-10-19)

HeaderSearch의 PC 검색은 178×36px 네이티브 input(TextInput)과 돋보기 submit으로 구성한다. SiteHeader가 검색 열림·입력값·오류를 소유하며 HeaderTools·SiteHeaderContainer를 통해 전달한다. 입력 포커스/클릭은 패널을 열고 Enter는 연결된 site-search-form을 제출한다. ArrowDown은 검색어 목록의 첫 버튼에 진입한다. 검색 패널의 오른쪽 끝은 헤더 장바구니 아이콘 영역(data-search-panel-anchor)의 오른쪽 끝에 맞춘다. useLayoutEffect에서 헤더 프레임과 장바구니 영역의 실제 좌표 차이를 CSS 변수로 전달하고 ResizeObserver·resize로 화면 크기 및 로그인 도구 너비 변경에 대응한다. 왼쪽 화면 여백 24px도 확보한다. 기본 너비 1020px, 자동완성 시 540px이며 화면 너비와 높이에 제한된다. 바깥 클릭/포커스·Escape로 닫고 패널에서 닫을 때 헤더 input으로 포커스를 돌린다. 메가 메뉴와 검색 패널은 동시에 열리지 않는다.

모바일은 Base UI Dialog 전체 화면·스크롤·초기 입력 포커스를 사용한다. 닫기 행, 왼쪽 돋보기 입력, 최근 검색어, 추천 태그, 2열 인기 검색어 순서다. 자동완성은 PC 최대 9개·모바일 최대 3개와 파란 일치 문구를 표시하며 모바일은 기존 검색 섹션도 유지한다. 최근 검색어의 저장/개별 삭제/전체 삭제와 /search?q=…&scope=전체 이동을 유지한다. 데이터는 검색 API와 연결되지 않은 목 데이터다. 빈 검색 제출은 입력 요청 오류를 표시하며, 외부 error/onErrorChange 계약과 Invalid/MobileInvalid 스토리로 시안의 금칙어 오류 표시를 제공한다. 금칙어 목록이나 판정 정책을 새로 만들지 않았다. 기존 Button의 headerSearch variant는 호환성을 위해 남아 있으나 SiteHeader는 사용하지 않는다.

검증: Panda 생성·전체 TypeScript·변경 TSX ESLint/Prettier와 Next/Storybook production build 통과. 브라우저에서 PC input 입력·자동완성 및 Enter의 실제 검색 결과 이동, 375px 모바일 자동완성 배치와 빈 검색 오류를 확인했다. 장바구니 기준 정렬 수정은 브라우저에서 기본 1020px·자동완성 540px 패널과 장바구니 영역의 오른쪽 좌표 차이 0px로 확인했으며 Panda·타입·변경 ESLint/Prettier를 확인했다. Storybook에는 PC/모바일 기본·자동완성·오류 6개 상태를 제공한다. 출처는 아래 working_tree_sources의 검색·헤더 구현과 스토리이며 첨부 시안은 사용자 제공 디자인이다.

## 404 안내 화면 (2026-10-19)

본문 main은 Stack gap="8"로 세로 배치하며 아이콘·안내문·홈 버튼 사이를 각각 32px로 유지한다. 자식 Box의 중복 mt="8"은 제거했다. 이번 간격 정리는 변경 파일 ESLint·Prettier와 기존 PC/MO 스토리의 실제 32px 간격으로 확인했다.

`src/shared/features/not-found/NotFoundPage.tsx`는 중앙 정렬한 Font Awesome `faTriangleExclamation`(48px), 한국어 제목·두 줄 설명과 홈 링크로 구성한다. 공통 Icon·Typography·ButtonLink를 재사용하고 PC 버튼 너비는 180px, 모바일은 좌우 16px 여백 안에서 전체 너비·48px 높이를 사용한다. 모바일 본문 최소 높이는 화면 높이에서 헤더 높이를 빼서 푸터가 첫 화면 아래에 오도록 한다. Storybook `PAGES/NotFound`의 Default/Mobile에서 앱 레이아웃과 함께 확인한다.

첨부된 404 이미지가 이번 작업의 시각적 출처다. Figma 노드 `577:11405`는 연결 재인증 오류로 원본 수치·레이어를 조회하지 못했으므로 Figma 대조 완료로 기록하지 않는다. 아이콘은 Font Awesome을 우선 사용하고 대응 아이콘이 없을 때 export할 파일명과 저장 폴더를 안내한다.

Panda 생성·타입 검사·변경 TSX ESLint/Prettier·Next/Storybook 빌드가 통과했다. 브라우저에서 PC 화면과 모바일 375px 스토리를 확인했고 모바일 버튼 343×48px·홈 링크 `/`·Font Awesome SVG 48×48px를 확인했다. 기존 공통 헤더의 프로모션 배너 등 첨부 이미지와 다른 영역은 이번 수정 범위 밖이다.

## 모바일 Storybook 여백 공통 기준 (2026-10-19)

모바일 이름·플랫폼·375px viewport를 지정한 스토리 108개에 layout fullscreen을 명시했다. 고정 모바일 너비를 사용하는 래퍼 13곳에는 maxWidth 100%를 적용해 스크롤바를 포함한 가용 너비를 넘지 않게 한다. 페이지 내부의 디자인 여백과 PC 스토리 설정은 유지한다. 출처는 src/stories/ 아래 모바일 스토리와 features/forms/form-state-audit/shared.tsx다.

## Checkbox 오류 테두리 간격 (2026-10-19)

Checkbox의 aria-invalid 오류 outline은 offset -2px로 16px 아이콘 안쪽에 겹쳐 표시한다. 기존 +2px 외곽 간격을 없애며 일반 키보드 포커스의 offset +2px는 유지한다. Checkbox.stories.tsx의 Error·ErrorChecked에서 미선택·선택 오류 상태를 확인할 수 있다. 출처: src/shared/components/atoms/Checkbox/Checkbox.tsx, src/stories/components/atoms/Checkbox/Checkbox.stories.tsx.

## 휴대폰 인증 Storybook 모바일 여백 (2026-10-19)

PhoneVerificationPage.stories.tsx는 페이지 단위 미리보기에 fullscreen을 지정한다. 전역 padded의 외곽 여백을 제거하고 모바일 래퍼는 width 100%, maxWidth 375px로 가용 너비에 맞춘다. 고정 375px와 세로 스크롤바가 겹쳐 발생하던 가로 넘침을 방지한다.

## 페이지 하단 공통 액션 (2026-10-19)

PageActionButton은 최대 500px 중앙 정렬 영역과 fullWidth Button/ButtonLink를 조합한다. children·href 또는 onClick·primary/secondary·short/tall·선택적 current/total counter를 받고, containerProps는 기존 mt/pt/_mobile 차이를 보존한다. 기본값은 secondary/short와 상단 padding 36px이다. SupportPage의 FAQs 링크는 기존 tall·margin·모바일 maxW none을, InquiryPage는 primary/short를, FAQ/공지 더보기는 short·모바일 상단 24px와 기존 페이지 계산/표시 조건을 유지한다. 기존 LoadMoreButton의 남은 항목 수 API는 변경하지 않는다.

## Secondary 버튼 자식 텍스트의 상태색 (2026-10-19)

Button variant secondary의 hover/focus-visible/active에서는 프레임 안 자식의 color가 프레임 색을 상속한다. ButtonLink도 같은 Button 구현을 사용한다. 기본 상태의 Typography tertiary tone은 유지하고 disabled/data-disabled 버튼은 상태색 상속에서 제외한다. PageActionButton에는 별도 상태색 스타일이 없으며 기본 Typography 조합만 사용한다.

검증: Panda 생성·타입 검사·변경 파일 ESLint/Prettier·Next.js/Storybook production build를 통과했다. Edge headless에서 FAQ/공지 PC/MO 4건의 기본 회색·hover/focus 흰색·40px 프레임·상단 36/24px·500px 폭·더보기 완료, Support/문의 PC/MO 링크 4건의 href와 48/40px 높이, 일반 secondary 버튼/링크/disabled 스토리 3건의 hover/focus/active 상속·비활성 유지 등 총 11건을 확인했다. PageActionButton 4개 및 Button 3개 스토리를 보강했다. Storybook 빌드는 기존 의존성 use-client·청크 크기·플러그인 시간 경고를 포함해 성공했다.

## FAQ 목록 표현 영역 분리 (2026-10-19)

FaqList의 질문 제목·답변 본문·검색 결과 없음 표시를 같은 organism 폴더의 FaqQuestion·FaqAnswer·FaqEmptyState로 분리했다. FaqList의 외부 props와 FaqListEntry/FaqListProps export, Accordion의 단일 펼침 제어와 onToggle 연결은 유지한다. 추가 DOM 래퍼 없이 기존 태그·Panda 값·PC/MO Typography·ReactNode 답변을 보존한다.

검증: Panda 생성·전체 타입 검사·변경 파일 ESLint/Prettier를 통과했다. Edge headless에서 기존 Default/Mobile 열기·닫기, Empty 표시와 버튼 부재, ControlledDisclosure의 Enter·클릭·Space 및 aria-expanded/aria-controls 연결 play를 확인했다. production build는 재실행하지 않았다.

## 런클럽 필터 버튼 크기 지정 (2026-10-19)

RunClubFilters의 유형 버튼에 size short를 명시했다. PC는 40px 프레임과 CTA2를 사용하고 모바일은 기존 전용 32px 높이 override·레이블 전환·aria-pressed 및 onFilterChange를 유지한다. 전체 타입 검사·변경 파일 ESLint/Prettier를 통과했다. Edge headless PC/MO에서 프레임 높이와 로드 러닝 선택 후 aria-pressed 갱신을 확인했다.

## 러닝 프로필 중복 데이터 제거 (2026-10-19)

Mockup/running-profile/running-profile.data.ts로 이미 분리한 profileQuestions를 features/mypage/mypage.data.ts에서도 제거했다. 현재 페이지와 전용 스토리는 목업 데이터만 import하므로 공용 마이페이지 데이터에는 메뉴·링크만 남는다. 전체 타입 검사·변경 파일 ESLint/Prettier와 참조 검색을 확인했다.

## 단일 확인 모달 추가 적용 (2026-10-19)

PasswordResetCompleteModal·MyPageReviewDialog·RunClubApplicationNotice·PreviousTermsPicker의 수동 footer를 SingleActionDialog로 교체했다. 기본 short/fullWidth와 actionCount 1 패딩을 사용하며 리뷰는 confirmLabel 저장·onSave, 비밀번호 완료는 onConfirm, 런클럽은 onOpenChange(false), 이전 약관은 onSelect를 연결한다. 기존 외부 props·필드 검증·날짜 상태와 모바일 시트의 footer 숨김/휠 선택·popupClassName 스타일은 유지한다. PreviousTermsPicker의 기존 선택기 전용 본문 패딩 override도 유지한다.

검증: 전체 타입 검사·변경 파일 ESLint/Prettier 통과. Edge headless에서 비밀번호 완료 PC/MO 패딩·확인 크기 2건, 이전 약관 PC/MO 선택 play 2개, 리뷰 PC/MO 오류→입력→저장 play 2개, 런클럽 PC/MO 안내 열기→확인 닫기 2건을 확인했다. production build는 재실행하지 않았다.

## 계정 잠금 안내의 SingleActionDialog 적용 (2026-10-19)

AccountLockedContent의 수동 primary 확인 footer를 SingleActionDialog로 교체했다. 공통 short/fullWidth 확인 버튼과 actionCount 1의 PC 본문 패딩 24px 24px 16px·MO 24px 16px 16px 16px를 사용한다. 제목·본문·모바일 줄바꿈·onClose/onConfirm 외부 API와 AccountLockedPage의 로그인/인증 화면 이동은 유지한다.

검증: 전체 타입 검사·변경 파일 ESLint/Prettier를 통과했다. 기존 Storybook PC/MO의 본문 패딩·확인 버튼 14px와 확인→인증 화면·헤더 닫기/Escape→로그인 이동 play 3개를 Edge headless에서 확인했다. production build는 재실행하지 않았다.

## EXPLORE 상세 화면 목업 분리 (2026-10-19)

ExploreDetailPage와 해당 화면에서만 사용하는 exploreContent.ts를 src/shared/Mockup/explore로 함께 옮겼다. 이전 허브 이동에서 제외했던 상세 구현도 이제 같은 목업 폴더에 위치한다. 화면·준비 중 상태·콘텐츠 데이터·버튼의 기존 미커밋 수정은 유지하고 import만 새 경로로 연결한다.

검증: 이동 전후 import 치환·포맷 정규화 후 내용 일치와 src의 이전 구현·데이터 경로 참조 부재를 확인했다. Panda 생성·전체 타입 검사·변경 파일 ESLint/Prettier를 통과했다. production build와 브라우저 화면 검증은 재실행하지 않았다.

## 런칭 캘린더 목업 분리 (2026-10-19)

LaunchCalendarPage 전용 구현을 src/shared/Mockup/launch-calendar/LaunchCalendarPage.tsx로 이동했다. 내부 LaunchCard·런칭 데이터·톤 타입·Panda 스타일·성인/키즈 선택·History/Now/Coming 상태와 필터·현재 출시 상품·상품 상세 링크를 유지한다. 전용 외부 파일이나 스토리는 없다. 공유 Button·Typography·Panda 레이아웃은 기존 위치에서 재사용한다.

검증: Prettier 포맷을 정규화해 이동 전후 페이지 내용 보존과 이전 경로 참조 제거를 확인했다. 변경 파일 ESLint/Prettier·전체 타입 검사·Panda 생성·Next production build와 앱 라우트 검사 2개를 통과했다. 브라우저 화면 비교는 재실행하지 않았다.

## 휴대폰 인증의 알뜰폰 사업자 전용 팝업 (2026-10-19)

PhoneVerificationDetailDialog는 open/onOpenChange만 받아 알뜰폰 사업자 제목과 통신망별 목록을 고정 표시한다. 문자열 detail 분기와 자체 footer를 제거하고 SingleActionDialog의 기본 short/fullWidth 확인 버튼·단일 액션 패딩을 사용한다. 확인은 onOpenChange(false)를 호출한다. PhoneVerificationContent에서 detail이 알뜰폰 사업자일 때 이 전용 팝업을 연결하고 다른 약관의 기존 제목 전용 ModalDialog 동작은 유지한다. Content/Page의 외부 detail/onDetail API는 바꾸지 않는다.

검증: 전체 타입 검사·변경 파일 ESLint/Prettier와 Edge headless에서 알뜰폰 3개 통신망 표시·확인/헤더 닫기/Escape·단일 액션 패딩/14px 확인 버튼, 기존 약관 팝업 4개의 열기·닫기를 확인했다. production build는 재실행하지 않았다.

## 매장 찾기 디자인 반영 후 정식 경로 복귀 (2026-10-19)

디자인이 반영된 매장 찾기 페이지와 데이터는 src/shared/features/store-finder에 두고, StoreResults는 src/shared/components/organisms/StoreFinder에 둔다. 페이지와 데이터는 정식 organism 경로의 StoreResults와 타입을 참조한다. 서울·인천·경기 탭, 매장 정보와 지도 펼침 UI를 사용하며 CustomerCenterLayout의 제목 영역·SupportTabs를 재사용한다. Mockup/store-finder 폴더는 제거했다.

이번 정리는 디자인이 반영된 구현을 정식 경로로 복귀시키고 라우트·스토리 참조를 갱신하는 변경이다.

## running-hub 목업 분리 (2026-10-19)

RunningExperiencePage와 stories/RunningExperienceRouteStory helper를 src/shared/Mockup/running-hub로 옮겼다. 7개 kind의 화면·상태·Panda 스타일·기존 버튼 수정은 유지하며 내부 helper와 앱 진입점 import만 갱신한다. helper는 *.stories.tsx가 아니며 새로운 Storybook 분류나 스토리는 추가하지 않았다.

검증: 이동 전 내용과 import 치환·포맷 정규화 후 내용이 동일함을 비교했다. src의 기존 features/running-hub 참조가 없고 Panda 생성·전체 타입 검사·관련 파일 ESLint/Prettier를 통과했다. production build와 브라우저 화면 검증은 재실행하지 않았다.

## EXPLORE 허브 목업 분리 (2026-10-19)

ExploreHubPage의 전용 구현은 src/shared/Mockup/explore/ExploreHubPage.tsx로 이동했다. 페이지 내부 groups 데이터·Panda 스타일·배너·카테고리 링크를 그대로 유지하며 ContentLayout·ButtonLink·Typography 등 실제 공용 UI는 기존 위치에서 재사용한다. 전용 외부 컴포넌트·데이터·스토리는 없다. 별도 상세 화면 ExploreDetailPage와 상세 데이터 exploreContent.ts는 이번 이동 대상이 아니다.

검증: 이동 전후 페이지 내용이 줄바꿈을 제외하고 일치하며 이전 경로 import가 남지 않았음을 확인했다. 변경 파일 ESLint/Prettier·전체 타입 검사·Panda 생성·Next production build와 앱 라우트 검사 2개를 통과했다. 브라우저 화면 비교는 재실행하지 않았다.

## ProductDetailSections 목업 분리 (2026-10-19)

상품 상세 섹션 목업 12개 파일을 `src/shared/Mockup/product-detail-sections/`로 옮기고 내부 import를 새 경로로 갱신했다. 구현 외부 참조는 전용 Storybook뿐이며 실제 상품 상세 feature로 적용 범위를 넓히지 않았다. 전용 스토리는 `src/stories/features/Mockup/product-detail-sections/`로 이동해 `Mockup/ProductDetailSections`로 분류한다. 기존 default·without-size-guide·mobile 시나리오와 이동 전 미커밋 수정 내용은 유지한다.

검증: 이동 전 파일 12개와 import 경로 치환·포맷 정규화 후 내용이 동일함을 비교했다. 기존 경로 참조가 src에 없고 Panda 생성·전체 타입 검사·이동 파일 ESLint/Prettier가 통과했다. Edge headless에서 기본·사이즈 가이드 제외·모바일 3개 스토리의 렌더링과 리뷰 섹션 이동, 콘솔 pageerror 부재를 확인했다. production build는 재실행하지 않았다.

## 마이페이지 리뷰 분리와 미사용 목업 제거 (2026-10-19)

실제 /mypage/reviews는 MyPageStatusPage가 MyPageReviews를 렌더링한다. organisms/MyPage/ReviewManager는 실제 화면의 import·재수출·호출이 없고 단독 Storybook만 참조하므로 삭제했다. 전용 ReviewEditor·ReviewList·ReviewListToolbar·ReviewStatusTabs·ReviewManager.types와 ReviewManager 스토리도 다른 사용처가 없어 함께 제거했다. 공용 RatingStars·Pagination·첨부 컴포넌트와 실제 MyPageReviewDialog는 삭제 대상이 아니다.

MyPageReviews는 탭·정렬·표시 건수·편집값·검증·작성 리뷰 저장 상태와 이벤트를 소유한다. features/mypage/reviews의 MyPageReviewsContent는 탭·빈 상태·목록·더보기를 배치하며 MyPageReviewTabs, MyPageReviewToolbar, MyPageReviewList, MyPageReviewItem, MyPageReviewLoadMore가 각 화면 영역을 담당한다. reviews.types는 탭·작성 리뷰·목록 항목 타입을 공유한다. MyPageReviewDialog는 기존 컴포넌트를 재사용하고 상태는 페이지에 유지한다. 새 DOM 래퍼·client 경계를 추가하지 않았으며 기존 텍스트·버튼 크기·간격·목록 키·선택/정렬·작성값·닫기 초기화를 보존한다.

검증: 전체 타입·변경 파일 ESLint/Prettier·Panda·Next/Storybook production build를 통과했다. 기존 페이지 소스를 별도로 읽어 웹/모바일 × 초기 건수 0/1/62의 6개 SSR 마크업을 비교했고 React 생성 ID를 정규화한 DOM이 일치했다. Edge/Playwright는 실제 production /mypage/reviews를 PC 1280px·모바일 UA/375px로 열어 더보기 10→20개, 탭 복귀 10개, 필수 별점/본문 오류, 작성 후 목록 3개, 수정 팝업 기존 값, 별점·본문 저장, 오래된 순 정렬, 닫기 초기화와 브라우저 오류 부재를 확인했다. 제거 대상은 소스·테스트에 참조가 없고 기존 화면/폼 상태 스토리는 유지한다.

## ReviewManager 역할별 구성 분리 (2026-10-19)

이 절은 삭제 전 작업 이력이다. 현재 실제 화면에는 사용되지 않는 목업으로 확인되어 위의 미사용 제거 작업에서 구현·전용 부품·스토리를 삭제했다.

ReviewManager는 상태·페이지·편집값·검증·초기화를 소유하고, 같은 organism 폴더의 ReviewStatusTabs(상태 탭), ReviewListToolbar(정렬·건수), ReviewList(빈 상태·상품 행), ReviewEditor(별점·본문·첨부·액션)를 값과 콜백으로 조합한다. ReviewManager.types는 탭·구매 항목 타입만 공유한다. 새 DOM 래퍼나 client 경계를 추가하지 않고 기존 버튼 크기·필드 ID·접근성 연결·스타일·파일 5개/10MB 제한을 유지한다. 정렬 select의 기존 표시 전용 동작도 유지한다.

검증: Panda 생성·타입 검사·변경 파일 ESLint/Prettier를 통과했다. Edge headless에서 기존 PC/MO WriteReview play 2개(오류→별점/본문 입력→완료), 페이지 이동·탭 전환 시 1페이지 복귀·첨부 5개 제한·취소 거절/수락을 확인했다. production build는 재실행하지 않았다.

## SHOE FINDER 목업 분리 (2026-10-19)

디자인 미확정 SHOE FINDER 구현은 src/shared/Mockup/shoe-finder/ShoeFinderPage.tsx로 이동했다. 기존 파일의 활동·쿠셔닝 선택 데이터, 상태, Panda 스타일과 추천 상품 쿼리 연결을 그대로 옮겼으며 전용 외부 컴포넌트·데이터·스토리는 없다. 기존 short 버튼 크기와 클라이언트 경계를 유지한다. 공유 ContentLayout·Button·Typography는 기존 위치에서 재사용한다. 홈의 HomeShoeFinderSection과 /running/shoe-finder의 RunningExperiencePage는 별도 구현이므로 이번 이동 대상이 아니다.

검증: 변경 파일 ESLint/Prettier·전체 타입 검사·Panda 생성·Next production build와 기존 URL 목록의 앱 라우트 검사 2개를 통과했다. 이전 ShoeFinderPage import가 소스에 남지 않았음을 확인했다. 브라우저 화면 비교는 재실행하지 않았다.

## 별점 표시·선택의 RatingStars 통합 (2026-10-19)

별점 공개 컴포넌트는 RatingStars로 통일한다. onValueChange가 없으면 기존 표시 모드(기본 16px, 0~5점 반별점 반올림, role img)를 유지한다. ariaLabel·정수 value·onValueChange를 주면 선택 모드이며 0은 미응답, 1~5는 단일 선택이다. 선택 타입 RatingValue와 RatingStarsSelectionProps를 같은 모듈에서 제공한다. 선택 모드는 내부 client 부품 RatingStarsControl이 기존 Base UI RadioGroup/Radio로 클릭·방향키·disabled·name·FormField 오류/설명 연결을 담당한다. 표시 모듈 자체에 use client 경계를 추가하지 않았다.

선택 별은 문자열 ★와 일반 CTA Button 대신 RatingStars와 같은 Icon·Font Awesome 채움/빈 별을 사용한다. 기본 아이콘 크기는 24px, 각 선택 버튼의 최소 크기는 34px이며 네이티브 button을 렌더링한다. 리뷰 작성 팝업·ReviewManager·폼 상태 스토리·회귀 검사의 RatingInput 참조와 RatingValue 타입 경로를 교체하고 기존 RatingInput 파일을 삭제했다. 마이페이지 리뷰 작성값·목록 상태와 기존 표시 호출부 API는 유지한다. 선택 스토리는 Atoms/RatingStars/Selection에 모으고 기존 표시 스토리와 반별점 예제도 유지한다.

검증: 타입 검사·변경 소스 ESLint/Prettier·폼 회귀 33개·Panda 생성·Next 및 Storybook production build를 통과했다. 정적 Storybook과 Edge/Playwright에서 1280px·375px의 미응답·클릭 3점·채운 Icon 개수·좌우 방향키 선택과 포커스, disabled 변경 차단 및 기존 4.5점 표시를 확인했다. 소스·테스트에 RatingInput 참조가 없으며 브라우저 오류도 관찰되지 않았다. Mobile 스토리의 내부 완료 상태를 기다리는 첫 검사 harness는 타임아웃이 발생해, 재검증은 play가 없는 Default 스토리에서 화면 폭·모바일 클래스를 지정하고 직접 상호작용을 검사했다.

## 러닝 프로필 목업 분리 (2026-10-19)

디자인 미확정인 러닝 프로필 전용 페이지·본문·질문 컴포넌트·질문 데이터는 `src/shared/Mockup/running-profile/`에 모은다. RunningProfilePage·RunningProfileContent는 기존 mypage feature에서, ProfileQuestionGroup은 공용 molecules/MyPage에서 옮겼다. profileQuestions는 공통 mypage.data에서 `running-profile.data.ts`로 분리했다. 실제 공용 SidebarNavigationLayout·Typography·ProgressBar·Button과 마이페이지 메뉴 데이터는 기존 위치에서 재사용한다. 답변·진행률·완료 판정·버튼 크기·마크업·스타일은 이전 상태를 유지한다.

질문 스토리는 `src/stories/features/Mockup/running-profile/ProfileQuestionGroup.stories.tsx`로 이동하며 Storybook 분류는 `Mockup/RunningProfile/ProfileQuestionGroup`이다. 기존 PC/MO·선택/미선택 4개 스토리와 상호작용 코드는 유지한다. 모든 stories 파일을 src/stories 아래에 두며 .storybook/main.ts의 탐색 규칙은 유지한다. 이전 경로의 중간 재수출 파일은 두지 않고 앱 라우트와 MyPageRouteStory의 import를 새 경로로 연결한다.

검증: 전체 타입 검사·변경 파일 ESLint/Prettier·Panda 생성·Next 및 Storybook production build를 통과했다. 앱 라우트 검사 2개로 기존 URL 목록의 빌드 포함을 확인했으며, Storybook index에서 새 Mockup 분류의 4개 스토리와 이전 분류 제거를 확인했다. 이동 후 브라우저 play·시각 비교는 재실행하지 않았다. Storybook 빌드는 기존 의존성 use-client·청크 크기·플러그인 시간 경고를 포함해 성공했다.

## 카드 링크와 히어로 버튼 크기 지정 (2026-10-19)

MainContentCard는 link 분기를 분리해 size md를 명시하고, HeroCopy의 액션은 size short를 명시한다. 링크 전용 sm/md/lg와 일반 버튼 tall/short 타입 계약을 유지한다. 전체 타입 검사·변경 파일 ESLint/Prettier를 확인했다.

## 단일 확인 버튼 모달의 공통 기본값 (2026-10-19)

확인 버튼은 `fullWidth`도 기본 true로 처리한다. disabled 등 다른 confirmButtonProps만 전달하거나 size/fullWidth가 undefined여도 short/true 기본값을 유지하며 명시적 false는 허용한다. 계정 안내 2곳과 TermsDialog의 중복 fullWidth 지정을 제거했다. 기존 ShortFullWidth 스토리는 기본값을 사용하고 ContentWidth 스토리로 false 재정의를 제공한다. 타입·변경 파일 ESLint/Prettier와 브라우저 기본/false/disabled/MO 옵션 적용 및 기존 확인·닫기·Escape play를 확인했다. fullWidth는 기존 ModalDialogFooter의 버튼 너비 규칙 안에서 적용된다.

ModalDialog의 `actionCount?: 1 | 2 | null`은 footer 액션 개수를 나타내며 기본값은 null이다. SingleActionDialog는 내부에서 `actionCount={1}`을 전달한다. 액션이 하나면 본문 패딩은 PC `24px 24px 16px`, MO `24px 16px 16px 16px`이며, 2 또는 null이면 기존 기본 패딩을 사용한다. 일반적인 간격 선택 API를 노출하지 않는다. SingleActionDialog의 확인 버튼은 기본 short이며 명시적인 tall 지정은 계속 지원한다. 계정 안내·주소 검색의 중복 short 설정은 제거했다. TermsDialog도 별도 크기 지정 없이 공통 short/fullWidth 기본값을 사용한다.

검증: Panda 생성·전체 타입 검사·변경 파일 ESLint/Prettier, Edge headless에서 단일 모달 PC/MO·disabled·fullWidth·마케팅 안내와 일반 모달 PC/MO 총 7건의 패딩 및 버튼 크기를 확인했다. 기존 단일 모달과 마케팅 안내의 PC/MO play 4개도 통과했다. actionCount 적용 후 타입 검사와 단일 모달 PC/MO·일반 모달 PC의 패딩을 다시 확인했다. production build는 실행하지 않았다.

## ProfileQuestionGroup 화면 확인 스토리 (2026-10-19)

`Molecules/MyPage/ProfileQuestionGroup`에 PC/MO 각각 미선택·선택 스토리 4개를 추가했다. 실제 profileQuestions의 첫 질문을 사용하며 클릭으로 단일 선택을 변경하고 Controls로 초기 value를 바꿀 수 있다. 플랫폼 Provider와 platform 클래스를 함께 지정해 PC 3열·MO 1열을 재현한다.

검증: 타입 검사·스토리 ESLint/Prettier 및 Edge headless에서 4개 스토리의 렌더링·열 배치·클릭 후 선택 클래스 변경을 확인했다. 모바일 스크린샷에서는 기존 Button과 option 스타일 충돌에 따른 테두리 중첩과 선택 배경색 미적용도 관찰했다. 이 변경은 스토리만 추가하며 컴포넌트 스타일은 수정하지 않았다. production build는 실행하지 않았다.

## 미사용 ProductCompareButton 제거 (2026-10-19)

`src/shared/components/molecules/ProductCompareButton/ProductCompareButton.tsx`는 자체 컴포넌트·props 타입 선언 외 import·재수출·사용처·스토리가 없어 삭제했다. 앞선 short 명시 작업에 포함됐던 미사용 버튼 한 곳도 함께 제거한다. frontmatter의 해당 경로는 삭제 전 검토 출처다.

## 미사용 ProductActionBar 제거 (2026-10-19)

`src/shared/components/molecules/Product/ProductActionBar.tsx`는 저장소 검색에서 자체 선언 이외 import·export·스토리·사용처가 없어 삭제했다. 실제 상품 상세 구매 액션은 `src/shared/features/product/ProductPurchaseActions.tsx`가 담당한다. 앞선 short 명시 작업에 포함되었던 해당 파일의 버튼 두 개도 삭제 대상이며, 나머지 크기 명시 변경은 유지한다.

## 영향 목록 버튼의 short 명시 (2026-10-19)

사용자가 선택한 크기 미지정 일반 버튼·자체 스타일 버튼·간접 사용처에 short 크기를 명시했다. 직접 Button/ButtonLink와 ToggleButton·LoadMoreButton 호출, SegmentedControl 기본형과 RatingInput render 버튼을 합해 65개 JSX 위치에 `size="short"`를 지정했다. 주소 검색·마케팅 수신내역 팝업은 SingleActionDialog 호출의 `confirmButtonProps.size`를 short로 지정했다. 공용 SingleActionDialog·ToggleButton·LoadMoreButton의 기본값과 다른 호출자의 옵션은 바꾸지 않았다.

홈 MainContentCard는 link 분기에서 지원되는 md를 명시하고, 테두리형 primary/secondary 분기만 short로 지정한다. link의 size는 sm/md/lg 계약을 유지한다. 별도 표로 안내했던 검색 headerSearch·모바일 filterTrigger, 이미 tall이던 인증·로그인 주요 버튼과 아이콘 전용 닫기 버튼은 이번 지정 목록에 포함하지 않는다.

short 기본 높이는 웹·모바일 모두 40px, 좌우 내부 여백은 16px이며 라벨은 CTA2를 사용한다. 호출자의 별도 높이·Typography·important 선언은 계속 적용되므로 모든 버튼의 계산 높이나 글자가 일률적으로 같아지는 변경은 아니다. 크기 지정 외 이벤트·상태·라우팅·접근성 속성은 유지한다. 작업 트리 출처는 frontmatter에 기록한 관련 TSX다.

검증: 52개 TSX의 추가 short JSX 위치 65개를 AST로 확인했고, 전체 타입 검사·변경 TSX ESLint/Prettier·Panda 생성·Next production build를 통과했다. 실제 Button/ButtonLink/ToggleButton/LoadMoreButton의 웹·모바일 12개 SSR 조합에서 short 높이·여백 클래스와 14px CTA, 기본 tall 대조군의 48px·24px·16px를 확인했다. 공용 Button 및 전달 래퍼 3개의 소스가 변경되지 않았음도 확인했다. Edge headless가 DOM 결과를 반환하지 않아 브라우저 계산 스타일·화면 비교는 검증하지 못했다. SSR 검사는 생성 클래스·구조 확인 범위다.

## 버튼 유형별 기본 크기와 라벨 (2026-10-19)

Button의 link 기본 size는 md이며, 생략해도 tall/CTA1 래핑을 받지 않는다. 일반 버튼의 tall/short는 CTA1/CTA2를 유지한다. headerSearch/filterTrigger는 CTA 자동 래핑과 중복 라벨 크기·굵기 지정을 제거하고 HeaderSearch·MobileProductFilterTrigger에서 Typography body4를 직접 전달한다. ButtonDocs 예제와 복사 코드도 같은 조합을 사용하고 DefaultLink 스토리로 size 생략 사례를 제공한다. 회원가입 주소 검색은 size md를 명시한다.

검증: 전체 타입 검사·변경 파일 ESLint/Prettier, Panda 생성, Edge headless에서 검색 PC/MO 열기·웹 14px/400·178×36px·hover/focus 색 상속, 필터 375/768px의 14px/400·32.2px 높이·모달 열기, 기본 link 웹/모바일 14px/500·CTA 래퍼 부재 및 일반 tall/short 표시를 확인했다. production build는 재실행하지 않았다. 출처는 frontmatter의 작업 트리 경로다.

## Button 내부 스타일 병합 (2026-10-19)

작업 트리 출처는 `src/shared/components/atoms/Button/Button.tsx`다. 외곽은 `button.raw()`와 아이콘 전용/variant 스타일을 한 `css()` 호출에서 합친다. content·label·아이콘 전용 선언은 `css.raw()` 객체로 보관하며 content의 headerSearch 정렬과 label의 link 줄 높이도 각각 한 `css()`에서 병합한다. 같은 조건·속성의 값을 먼저 결정하므로 생성 CSS의 클래스 선언 순서에 의존하지 않는다. Panda는 여전히 속성별 클래스를 여러 개 생성한다.

headerSearch 내용에는 `justifyContent: space-between`, link label에는 `lineHeight: 1.3`, 아이콘 전용 외곽에는 기본 높이 변수 24px·수평 여백 변수 0px가 남는다. density의 모바일 조건, fullWidth와 variant의 나머지 값, DOM·props·상태 처리·외부 className 후행 연결은 유지한다. 외부 className의 충돌 해결까지 보장하는 API는 아니다.

실제 Button TSX와 Panda 런타임을 사용한 임시 SSR 검사 180개 조합에서 variant·size·density·아이콘 전용·fullWidth를 바꾸며 동일 조건·속성 중복 제거, 정렬·줄 높이·아이콘 전용 기본 변수와 호출자 클래스 보존을 확인했다. 타입 검사·변경 파일 ESLint·Prettier·Panda 생성·Next 프로덕션 빌드도 통과했다. 전체 lint는 기존 `.tmp-storybook-ia-routes/assets/` 등의 생성 파일 오류가 포함되어 실패했다. 이는 브라우저의 계산 스타일이나 fo-web 통합 화면 검증을 대신하지 않는다.

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

회원가입 약관 상세의 ‘이전 약관 보기’는 기능 내부 `PreviousTermsPicker`를 연다. 데스크톱은 공통 `ModalDialog` md(568px) 안에 시행일을 고르는 공통 `Radio` 목록과 확인 푸터 버튼을 제공한다. 모바일은 같은 모달의 하단 시트 배치에서 날짜 휠 형태를 유지한다. 두 화면은 Figma에 기재된 7개 날짜를 사용한다. 날짜 선택 후 기존 이전 약관 준비 안내로 전환하며, 실제 약관 본문을 날짜별로 연결하는 기능은 추가하지 않았다. `SignupTermsPage`가 열림 상태를 소유하고 `SignupTermsContent`가 두 모달을 조합한다. PC·모바일 상호작용 스토리는 날짜 선택과 확인, 닫기를 각각 검사한다. 출처는 작업 트리의 `src/shared/features/signup-terms/PreviousTermsPicker.tsx`, `SignupTermsPage.tsx`, `SignupTermsContent.tsx`, `src/stories/features/signup-terms/SignupTermsPage.stories.tsx`와 Figma `957:30452`이다.

`AccountUnlockCompletePage`는 Figma desktop `957:30471`·mobile `957:29862` 기준의 완료 화면이다. 웹 본문은 최소 높이 600px, 상단 96px·좌우 144px·하단 124px, 콘텐츠 폭 500px이며 모바일은 헤더 높이를 뺀 화면 높이, 상단 40px·좌우 16px·하단 32px을 사용한다. 제목-안내 간격은 12px, 제목 아이콘은 18px, 안내-버튼 간격은 36px이다. 제목은 웹 28px·모바일 22px, 안내는 양쪽 모두 16px이다. 일회성 css 선언 대신 Panda JSX 레이아웃 속성을 사용하고 잠금 해제 아이콘은 Figma 노드 `957:30479`의 SVG를 `Icon` 공통 자산으로 등록해 사용한다. `Atoms/Icon`의 `AllAvailableIcons` Storybook 목록에도 포함한다.

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

고객센터 공통 본문 프레임은 데스크톱에서 최대 1200px 폭과 좌우 34px 패딩을 사용한다. 모바일에서는 바깥 페이지의 16px 여백을 그대로 사용한다. 출처는 작업 트리의 `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`다.

고객센터 메인의 공지사항 미리보기는 제목 아래 `black.100` 1px Divider와 각 공지 행 아래 `black.20` 1px Divider를 사용한다. 출처는 작업 트리의 `src/shared/features/support/SupportPage.tsx`와 Figma 고객센터 메인 노드 `327:5231`이다.

`CustomerCenterLayout`은 고객센터 메인과 하위 화면이 공통으로 쓰는 Breadcrumb, 페이지별 제목·설명 영역, 좌측 메뉴, 본문 배치를 소유한다. 페이지마다 breadcrumb 경로와 활성 메뉴를 전달하므로 `/support`와 `/support/faq`는 독립 라우트로 유지된다. `Breadcrumb`은 기존 공통 molecule을 재사용한다. `SupportContactCard`는 반복되는 고객상담실·온라인 스토어 카드의 제목·문의 설명·전화번호 슬롯을 갖는다. 화면 본문의 간격·크기·배치는 Panda JSX props를 사용하며, 전화 링크 밑줄은 모바일에서만 보인다. 데스크톱 FAQ teaser는 첫 항목을 펼치고 모바일은 FAQ 링크 버튼을 표시한다. 공지 행은 PC 69px·모바일 51px 높이로, 날짜는 PC body4·모바일 body5로 표현한다. 공지 데이터는 화면 시안용 정적 데이터이며 각 행은 기존 공지 상세 데모 경로로 연결된다. 사이드 메뉴의 동일 주소 항목은 고유 React key를 쓰며 활성 상태를 별도 지정할 수 있다. 고객센터·FAQ의 PC와 모바일을 각각 제공하는 route story가 이 레이아웃을 검증한다. 출처는 작업 트리의 `src/shared/features/support/SupportPage.tsx`, `SupportContactCard.tsx`, `support.navigation.ts`, `src/shared/features/faq/FaqPage.tsx`, `faq.data.ts`, `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`, `src/shared/components/organisms/Navigation/SideNavigation/SideNavigation.tsx`, `src/stories/features/support/SupportPages.stories.tsx`와 Figma 고객센터 메인 노드 `327:5231`이다.

## FAQ (2026-10-16)

FAQ 카테고리 선택은 공통 `FilterTabs`의 `line` 변형을 사용한다. PC는 Figma 노드 `1056:42189`의 24px 탭 간격·CTA1 글자·선택 항목 2px 밑줄을 따르고, 모바일은 가로 스크롤과 CTA2 글자·하단 경계선을 유지한다. `FaqControls`는 카테고리 데이터와 선택 변경만 전달하며 탭 CSS를 소유하지 않는다. 출처는 작업 트리의 `src/shared/components/atoms/FilterTabs/FilterTabs.tsx`, `src/shared/components/molecules/Faq/FaqControls.tsx`, `src/stories/components/atoms/FilterTabs/FilterTabs.stories.tsx`와 Figma 노드 `1056:42189`다.

`SearchField` 안의 `TextInput`은 포커스 시 별도 outline을 표시하지 않고 검색창의 기존 테두리만 유지한다. 출처는 작업 트리의 `src/shared/components/molecules/SearchField/SearchField.tsx`다.

FAQ 검색 영역은 공통 molecule `SearchField`를 사용한다. 입력값과 검색 동작을 호출자가 전달하며, 검색창은 데스크톱에서 돋보기를 오른쪽에, 모바일에서 왼쪽에 배치한다. `FaqControls`는 검색창 최대 폭 590px과 주변 간격만 소유한다. 출처는 작업 트리의 `src/shared/components/molecules/SearchField/SearchField.tsx`, `src/shared/components/molecules/Faq/FaqControls.tsx`, `src/stories/components/molecules/SearchField/SearchField.stories.tsx`다.

`FaqList`의 섹션 상단선과 답변 배경·패딩·줄바꿈·문단 여백은 Panda Box 속성으로 표현한다. Accordion이 클래스만 받는 항목 경계선·질문 버튼 상태·아이콘 크기만 컴포넌트 내부 CSS에 남긴다. 출처는 작업 트리의 `src/shared/components/organisms/Faq/FaqList.tsx`다.

`FaqPage`는 별도 URL을 유지하면서 `CustomerCenterLayout`의 공통 breadcrumb·페이지 제목·사이드 메뉴를 사용한다. PC에서는 첫 질문을 열고 모바일에서는 닫아 둔다. 검색은 질문과 답변을 함께 필터링하고 카테고리 탭은 Figma의 8개 항목을 사용한다. 처음 10개를 표시하며 답변과 검색 데이터는 화면 시안용 정적 데이터다. 고객센터 메인의 FAQ teaser도 기존 `FaqList`를 재사용한다. 간격·패딩·정렬은 Panda JSX props, 검색 필드·밑줄 탭·아코디언 경계처럼 세부 시각 규칙은 컴포넌트의 Panda CSS로 표현한다. 출처는 작업 트리의 `src/shared/features/faq/FaqPage.tsx`, `src/shared/features/faq/faq.data.ts`, `src/shared/components/molecules/Faq/FaqControls.tsx`, `src/shared/components/organisms/Faq/FaqList.tsx`, `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`와 Figma 노드 `991:23024`, `991:23094`, `999:5639`이다.

## 공지사항·1:1 문의 (2026-10-16)

`InquiryPage` 제목 아래 구분선은 웹에서 `black.100`, 모바일에서 `black.20`으로 표시한다. 두 화면 모두 높이는 2px이다.

1:1 문의의 `InquiryCautions`는 펼쳤을 때만 제목 아래 구분선을 추가하고, 닫혔을 때는 바깥 위·아래 선만 표시한다. 제목은 좌우 16px, 목록은 상하 24px의 간격을 사용하며 화살표 아이콘은 subtle 텍스트 색상 토큰을 따른다. 공통 `Accordion` 동작은 유지한다. 문의 접수완료 상태는 `SupportPages.stories.tsx`의 데스크톱 `InquiryPendingDesktop`과 모바일 `InquiryPendingMobile375`로 확인할 수 있다. 출처는 작업 트리의 `src/shared/features/support/InquiryCautions.tsx`, `src/stories/features/support/SupportPages.stories.tsx`와 사용자 제공 화면 이미지다.

`/support/after-sales`는 Figma 모바일 `803:25138`, `897:48598`, `803:25411`과 PC `1066:57459`, `1066:59817`, `1066:60232`에 따라 배송 안내·반품 주의사항·상품 반품 안내를 모두 선택할 수 있게 표시한다. 공통 `CustomerCenterLayout`의 제목 영역과 Base UI Tabs 기반 `SupportTabs`를 재사용한다. 세 탭의 번호 목록·불릿·문구는 각 시안을 따른다. 출처는 작업 트리의 `src/shared/features/support/ShippingReturnsPage.tsx`, `src/shared/components/molecules/SupportTabs/SupportTabs.tsx`, `src/stories/features/support/SupportPages.stories.tsx`와 해당 Figma 노드다.

반품 주의사항의 불릿은 표시 기호와 본문을 별도 가로 요소로 배치한다. 본문의 `<br>` 뒤에 오는 `(ex. …)`와 배송비 하위 `-` 설명은 기호 아래로 되돌아가지 않고 같은 항목의 텍스트 시작선에 맞춰진다. 출처는 작업 트리의 `src/shared/features/support/ShippingReturnsPage.tsx`와 사용자 제공 비교 이미지다.

`/support/store`는 Figma 모바일 `1079:49652`와 PC `1066:48028`의 서울·인천·경기 탭, 매장 정보 행, 길 찾기 펼침 상태를 사용한다. 지도는 Figma 원본 PNG를 프로젝트 자산으로 보관해 프리뷰 영역에 표시한다. 서울은 시안의 세 매장, 경기는 금촌 매장을 사용하며 인천 목록은 제공된 자료에 없어 빈 상태로 둔다. 구현과 데이터는 `src/shared/features/store-finder/`에 둔다. `/support/teamwear`는 모바일 `803:25048`의 온라인·오프라인 고객센터 카드, 운영시간, 안내문을 표시한다. 두 페이지도 공통 고객센터 레이아웃과 제목을 사용한다. 출처는 작업 트리의 `src/shared/features/store-finder/`, `src/shared/features/teamwear/TeamwearPage.tsx`, `public/images/store-finder/map-preview.png`와 해당 Figma 노드다.

`/support/care`는 Figma 모바일 `806:25575`, `806:25793`과 PC `1066:57895`, `1066:61095`의 신발·의류/용품 탭을 제공한다. 각 번호 제목과 안내 문구를 `care.data.ts`에 두고 공통 `SupportTabs`와 `CustomerCenterLayout`을 재사용한다. `/support/terms`도 같은 고객센터 레이아웃으로 옮겨 이용 약관·개인정보 처리방침 탭, 시행일 선택 목록, 시안의 약관 내용 자리표시자와 개인정보 처리방침 버전 정보를 표시한다. Figma 노드는 모바일 `806:25898`, `897:49060`, PC `1066:58331`이다. 실제 확정 약관 본문과 시행일별 데이터는 시안에서 제공되지 않았다. `/support/member-benefits`의 좌측 메뉴와 페이지 제목 영역도 `CustomerCenterLayout`으로 통일했다. 출처는 작업 트리의 `src/shared/features/care-guide/`, `src/shared/features/terms/TermsPage.tsx`, `src/shared/features/support/SupportExperiencePage.tsx`, `src/shared/features/support/support.navigation.ts`와 해당 Figma 노드다.

공통 푸터의 세탁 및 손질 방법 링크도 신규 `/support/care` 경로로 연결한다. 출처는 작업 트리의 `src/shared/components/organisms/Layout/SiteFooter/footerData.ts`다.

공지사항 목록은 첫 행 위에 `black.20` 1px Divider를 두고, 펼친 행은 제목과 내용 사이에도 같은 구분선을 둔다. 출처는 작업 트리의 `src/shared/features/notices/NoticesPage.tsx`다.

공지사항 목록은 PC 제목 아래 `black.100` 2px Divider, 각 60px 행 아래 `black.20` 1px Divider를 사용한다. 모바일에서는 상단의 진한 선을 숨기고 56px 행마다 회색 구분선을 둔다. 제목·날짜는 각각 화면 크기에 맞는 Typography variant와 tone을 사용하며, 더보기는 표시 페이지/전체 페이지를 함께 보여준다. 출처는 작업 트리의 `src/shared/features/notices/NoticesPage.tsx`와 Figma 노드 `1056:42533`, `991:23590`이다.

문의 등록 화면은 `CustomerCenterLayout`에 전달한 1:1 문의등록 제목을 PC·모바일에서 표시한다. Breadcrumb과 좌측 메뉴도 함께 유지한다. 출처는 작업 트리의 `src/shared/features/support/InquiryNewPage.tsx`와 `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`다.

문의 등록의 문의 유형·상세 유형 선택창은 공통 `Dropdown`을 사용한다. 두 선택창은 필수 라벨을 내부에 표시하고 기존 선택값과 2열 배치를 유지한다. 출처는 작업 트리의 `src/shared/features/support/InquiryNewPage.tsx`와 `src/shared/components/atoms/Dropdown/Dropdown.tsx`다.

답변된 1:1 문의 행은 공통 `Accordion`으로 답변을 접고 펼친다. 처음에는 답변을 표시하고, 기존 Q/A 행·상태 배지·PC/모바일 간격을 유지한다. 미답변 행은 펼칠 내용이 없으므로 정적 행으로 표시한다. 출처는 작업 트리의 `src/shared/features/support/InquiryPage.tsx`와 `src/shared/components/atoms/Accordion/Accordion.tsx`다.

`/support/notices`, `/support/notices/[id]`, `/support/inquiries`, `/support/inquiries/new`는 각각 독립 라우트이며 `CustomerCenterLayout`의 breadcrumb·페이지 제목·사이드 메뉴를 재사용한다. 공지사항 목록은 PC Figma처럼 행을 펼치는 방식으로, 기존 상세 경로는 모바일 상세 Figma의 행·본문·목록보기 구조로 갱신했다. 1:1 문의는 빈 상태와 접수·답변 상태를 Q/A 구성으로 표현한다. 문의 등록은 분류·제목·내용·첨부·신청인 정보와 취소/등록 액션을 표시하고, 유의사항은 `InquiryCautions`에서 재사용한다. `InquiryCautions`는 공통 `Accordion`을 사용해 처음부터 펼친 상태를 유지하며, 별도 상태·화살표 구현 없이 접고 펼친다. `SupportExperiencePage`에 남아 있던 구형 문의 목록·등록 구현은 제거했다. 공지·문의 본문과 신청인 정보는 시안용 정적 데이터이며 서버 저장 기능은 없다. 출처는 작업 트리의 `src/shared/features/notices/NoticesPage.tsx`, `NoticeDetailPage.tsx`, `src/shared/features/support/InquiryPage.tsx`, `InquiryNewPage.tsx`, `InquiryCautions.tsx`, `src/shared/components/atoms/Accordion/Accordion.tsx`, `SupportExperiencePage.tsx`, `src/stories/features/support/SupportPages.stories.tsx`와 Figma 노드 `885:30279`, `991:23590`, `991:23643`, `932:16817`, `991:28890`, `1003:17104`, `1003:7512`이다.

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

아이디·비밀번호 찾기 화면은 Figma 모바일 `957:29176`과 PC `957:29231` 기준으로 PC 콘텐츠 폭 500px·상단 96px·제목 28px, 모바일 좌우 16px·상단 40px·제목 22px을 사용한다. 제목과 필드 사이 간격은 PC 40px·모바일 32px, 두 필드는 16px 간격이다. 제목에는 `web="heading7" mo="heading5"`를 사용하며 인증번호 요청 후에는 하나의 입력 영역만 렌더링한다. 출처는 작업 트리의 `src/shared/features/find-account/FindAccountContent.tsx`와 해당 Figma 노드다.

로그인·회원가입·계정 찾기·잠금 해제·휴대폰/본인 인증 화면의 `Button`과 `ButtonLink`는 공통 기본 크기가 `tall`이므로 중복 `size="tall"`을 제거했다. `short` 등 별도 크기를 지정한 호출은 유지하며, 버튼 높이·CTA1 글자·기존 동작은 변경하지 않는다. 출처는 작업 트리의 `src/shared/components/atoms/Button/Button.tsx`, 관련 feature 파일들이다.

휴대폰 인증의 알뜰폰 사업자 안내는 사업자 목록만 `ModalDialog` 본문에 두고 확인 버튼을 `footer`에 전달한다. 긴 목록은 본문에서 스크롤되며 공통 푸터가 확인 버튼을 데스크톱 160px·모바일 전체 너비로 배치한다. 출처는 작업 트리의 `src/shared/features/phone-verification/PhoneVerificationContent.tsx`, `src/shared/components/molecules/ModalDialog/ModalDialogFooter.tsx`다.

공통 `ModalDialogFooter`는 직계 버튼 높이를 40px로 지정한다. 데스크톱 버튼 너비 160px과 모바일 전체 너비는 유지한다. 출처는 작업 트리의 `src/shared/components/molecules/ModalDialog/ModalDialogFooter.tsx`다.

계정 잠금 안내 모달의 확인 동작은 공통 `ModalDialog`의 `footer` 슬롯으로 구성한다. 본문은 안내 문구만 담당하고 푸터가 버튼의 크기·정렬을 맡는다. 출처는 작업 트리의 `src/shared/features/account-locked/AccountLockedContent.tsx`다.

`IdConfirmationModal`은 안내 문단 간격과 두 버튼의 너비를 Panda `Box`·`Stack` 속성으로 표현한다. 기존 8px 기본 Stack 간격과 문단의 20px·24px 여백을 유지한다. PC 버튼은 각각 160px이며 두 버튼을 함께 가운데 정렬하고 모바일에서는 전체 너비로 표시한다. 모달 폭은 공통 `ModalDialog`의 `md`(최대 568px)를 사용하고, 모바일은 공통 fullscreen 규칙을 따른다. 이름은 `userName` prop으로 받아 표시하며 값이 없으면 임의의 이름을 넣지 않는다. 제목은 플랫폼에 따라 문자열 하나를 선택하고, 공통 `ModalDialogHeader`가 `body3` 16px로 렌더링한다. 출처는 작업 트리의 `src/shared/features/find-account/IdConfirmationModal.tsx`, `src/stories/features/find-account/IdConfirmationModal.stories.tsx`다.

아이디 확인 모달은 모바일 Figma `957:29520`에 맞춰 버튼 두 개를 본문의 설명 아래 8px 간격으로 배치하고, 웹에서는 같은 버튼을 공통 `ModalDialog` 푸터에 둔다. 모바일 버튼은 `short` 높이 40px·CTA2 14px과 전체 너비를 사용한다. 이름·이메일·설명 사이 모바일 간격은 각각 24px·52px이며 PC의 기존 푸터 배치는 유지한다. 출처는 작업 트리의 `src/shared/features/find-account/IdConfirmationModal.tsx`와 해당 Figma 노드다.

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

주문/결제 화면(`src/shared/features/checkout/`)은 `Checkbox`·`Button`·`Typography`·`StepIndicator` 등을 조합한 목 화면이며 실제 결제와 연동하지 않는다. 모바일 장바구니·주문/결제는 Figma `962:8877`, `1108:12627`의 375px 시안을 기준으로 16px 좌우 여백, 상품 카드, 배송지 정보, 3열 결제 수단, 하단 주문·결제 버튼을 구성한다. 상품 이미지는 Figma 미리보기 목 자산을 `public/images/cart/`에 저장하고, 카카오페이 로고는 `public/images/checkout/`에 저장했다. 다른 상품 항목은 카탈로그 이미지로 표시한다.

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

| 책임과 기존 소유자                      | 반영한 컴포넌트·소유 폴더                            | props/slots와 보존한 계약                                                                                                                                                                              |
| --------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SiteHeader`의 sticky 바깥 영역         | `SiteHeaderFrame`, 기존 SiteHeader organism 폴더     | `children`, `onLeave`. 같은 div 안에 헤더와 메가 메뉴를 유지하며 sticky top 0·z-index 20·영역 이탈 이벤트를 함께 소유                                                                                  |
| `SiteHeaderContainer`의 랜드마크와 배치 | `SiteHeaderContent`, 같은 organism 폴더              | `primary`, `actions` 슬롯. header → Flex → 두 HStack의 DOM 순서, 높이 변수, PC 좌우 72px, 모바일 좌측 gutter·우측 9px, 간격 24px/6px 유지. 플랫폼에 따른 실제 콘텐츠 선택과 콜백 연결은 Container 소유 |
| `CheckoutPage`의 프레임·완료 단계       | `CheckoutLayout`, checkout 기능 폴더                 | `completed`, `children`. main/header, 최대 너비 1100px, PC/모바일 상하 여백, 진행 단계 유지                                                                                                            |
| `CheckoutPage`의 상태별 표시·폼 배치    | `CheckoutContent`, 같은 기능 폴더                    | 준비된 `rows`, `total`, `payment`, `completed`, `onPaymentChange`, `onSubmit`. 완료를 빈 장바구니보다 먼저 표시. PC `1fr 360px`·간격 60px, 모바일 `1fr`·간격 40px 유지                                 |
| 배송 필드와 결제 선택                   | `CheckoutShipping`·`CheckoutPayment`, 같은 기능 폴더 | controlled `payment`와 `onPaymentChange`. 기존 native input/radio, id/name/autocomplete, FormData와 부모 폼 검증, section 순서 유지                                                                    |
| 주문 행·금액 표시                       | `CheckoutSummary`, 같은 기능 폴더                    | `rows`, `total`. aside와 옵션별 key, 수량·금액 표시, 무료 배송·제출 버튼 유지. 상품 조회·총액 계산은 수행하지 않음                                                                                     |

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

2026-10-19 Figma 로그인 화면 `957:28877`(모바일)·`957:28953`(웹)에서는 아이디 저장 오른쪽의 찾기 동작이 `아이디/비밀번호 찾기` 한 버튼이다. `LoginForm`은 입력 필드 사이 16px, 옵션 행 뒤 버튼까지 24px 배치를 `Stack`과 `LoginActions`의 Panda JSX 간격으로 유지한다. 찾기 버튼은 공통 `Button variant="link" size="md"`와 `Typography body4`를 쓰며 기존 `/login/find-account`로 이동한다. 별도 비밀번호 찾기 데모 안내와 구분선은 제거했다. 변경 범위는 작업 트리의 `src/shared/features/login/LoginForm.tsx`와 `src/stories/features/login/LoginPage.stories.tsx`에서 확인했다.

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
| AccountLockedPage의 라우팅과 모달 표현 혼합         | `AccountLockedContent({ onClose, onConfirm })`                                                                                                                              | 공통 ModalDialog의 md 568px·버튼 너비 160px·모바일 설명 줄바꿈 유지. Page가 닫기 `/login`, 확인 `/login/account-locked/verification` 이동 소유                                 |

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
- 등급 혜택 상세와 문의 등록 유의사항의 불릿은 `li`의 `HStack` 안에서 `・` 기호와 본문 `Typography`를 별도 요소로 둔다. 긴 설명이 다음 줄로 넘어가도 본문 시작선에 정렬되며, 두 목록은 각각 기존 모바일 `body5` 및 웹 `body4`·모바일 `body5` 값을 유지한다. 근거: `src/shared/features/mypage/MyPageRewards.tsx`, `src/shared/features/support/InquiryCautions.tsx` 작업 트리와 사용자 지정 모범 사례 확인(2026-10-19).
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

로그인 소셜 버튼의 카카오·네이버 표시는 등록된 공통 `Icon` 자산 `social/kakao`, `social/naver`를 18px로 사용한다. 버튼의 브랜드 색과 클릭 시 데모 안내는 `LoginActions`에 유지한다.

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

| 유지 영역                                                    | 선택자 키 수 | 근거                                                                                                                                                           |
| ------------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DesignGuideTypography, ButtonDocs, DataTable, SizeGuideTable | 11           | 여러 작성 셀/표가 공유하거나 외부 children, rowspan, 행·열·짝수·형제 관계를 표현한다. SizeGuideTable의 두 번째 헤더 행도 네 개의 서로 다른 th를 대상으로 한다. |
| IconButton의 SVG fill/stroke                                 | 2            | 호출자가 제공하는 아이콘 내부의 여러 도형을 대상으로 하는 공용 계약이다.                                                                                       |
| CarouselViewport, Terms                                      | 2            | Swiper/외부 children과 Checkbox 라벨 내부의 외부 문구 전체에 적용하는 계약이다.                                                                                |
| Button의 iconOnly 내부 span 경로                             | 1            | 공용 Button의 조건부 iconOnly 슬롯 계약이다. 부모 조건과 서로 다른 frame/content 소비자를 분리하는 API 변경은 이번 스타일 이전 범위에 포함하지 않는다.         |
| FooterLegalLinks                                             | 1            | 여러 문구·링크 작성 노드가 공유하는 폰트 상속 규칙이다.                                                                                                        |
| MegaMenuList                                                 | 1            | 링크 hover/focus와 sale 자식 사이의 상태 관계를 표현한다.                                                                                                      |
| SignupTermsStep                                              | 1            | 서로 다른 세 Terms 인스턴스의 Checkbox 내부 라벨을 함께 대상으로 한다.                                                                                         |

검증: Panda 생성·전체 타입 검사·변경 TSX ESLint·Prettier·최종 소스의 Next/Storybook production build·git diff --check 통과. OKF 소스 매핑 누락도 없었다. TypeScript AST로 13개 파일의 JSX 164개를 비교해 의미 태그·네이티브 속성 차이가 없었다. PC/모바일 SSR 28건(선택된 질문, 주문 조회, Sale/일반 메뉴, 리뷰, 검색 입력·카테고리·기획전, 검색어 있음/없음, 매장 있음/없음, 휴대폰 약관 오류 유무, Explore fallback)은 class 이외 마크업이 일치했다. SSR의 Next Link·navigation은 대역을 사용했으며 모달 열린 상태·실제 이벤트·브라우저 computed CSS·시각 동일성은 검증하지 않았다. 작업 트리 출처는 frontmatter의 이번 관련 경로다.

## 가입·인증 공통 폼 레이아웃과 내부 구성 (2026-10-19)

`AccountFormLayout`은 약관동의·휴대폰 인증·회원 정보/부가 정보의 제목과 설명 영역을 소유하며 main·중앙 폭 제한은 공통 `AccountPageLayout`에 위임한다. 공개 props는 `title`, 선택적 `description`, `contentWidth`(기본 420px, 인증 568px), `fillMobileViewport`, `children`, `dialogs`, `actions`, `actionsSpacing`다. 제목은 `Typography as="h1" web="heading7" mo="heading5"`로 통일하고 제목 영역과 첫 본문 사이를 웹 40px·모바일 32px로 둔다. 설명이 있으면 제목 아래 12px에 배치하며 설명까지 포함한 영역 다음에 공통 간격을 적용한다. 외곽 패딩과 약관동의만 사용하는 모바일 화면 최소 높이는 기존 값을 유지한다. dialogs는 중앙 폭 제한 밖 main 내부에 조합한다. 기존 SignupLayout·ContentLayout·다른 인증 화면은 변경하지 않았다.

약관동의는 `SignupTermsAgreementList`, 휴대폰 인증은 `PhoneVerificationAgreements`·`PhoneInformationFields`·`VerificationCodeFields`, 회원가입은 `RegistrationEmailFields`·`RegistrationPersonalFields`·`RegistrationAddressFields`·`RegistrationAdditionalFields`로 표현 책임을 분리했다. 반복 입력과 수신 동의 행은 기능 내부 `RegistrationField`·`RegistrationPreferenceRow`가 담당한다. 분리용 DOM 래퍼를 추가하지 않고 기존 form·Stack 자식 순서, 필드 ID, 오류 연결, disabled 상태, 약관 상세·주소 모달 계약을 유지한다. Content가 폼·섹션·버튼·모달을 조합하고 상태·검증·라우팅은 기존 Page에 남는다. 타입은 기능 내부 types 파일로 옮겼으나 기존 Content의 타입·상수 export 경로는 유지한다. 휴대폰 약관 소제목의 기존 작업 트리 수정(web heading9/mo heading7)도 유지했다.

검증: Panda 생성, 전체 타입 검사, 변경 파일 ESLint·Prettier, Next.js 및 Storybook production build, 기존 폼·계정 복구·이메일 테스트 38개가 통과했다. Edge headless에서 Storybook 21개 상태/상호작용을 확인했다. 13개 레이아웃 상태는 웹/모바일 간격 40px/32px, 한국어 제목 28px/22px·굵기 900, 폭 제한 420px/568px, 단일 main/h1과 설명문 간격 12px를 검증했다. 나머지는 웹/모바일 약관 이전 버전 선택·닫기, 필수 인증 약관 오류·전체 동의, 회원 정보 비밀번호 검증과 이메일 중복확인·주소 모달 입력·부가 정보 전환이다. 기존 데스크톱 약관 스토리의 닫힌 상세 팝업 참조를 새 이전 약관 팝업을 기다리는 방식으로 수정한 뒤 재검증했다. 계정 잠금 해제 웹·부가 정보 모바일 스크린샷도 확인했다. Storybook의 기존 tertiary 텍스트 색 대비 경고와 의존성 use-client 번들 경고는 이번 구조 변경에서 수정하지 않았다. 출처는 frontmatter에 기록한 작업 트리 경로다.

### AccountFormLayout 공통 액션 영역 (2026-10-19)

`actions?: ReactNode` 슬롯은 제목/본문과 동일한 폭 제한 안에서 children 다음에 렌더된다. 레이아웃이 동일 너비 2열·버튼 사이 8px Grid를 소유하며 각 feature는 버튼의 문구·variant·콜백을 전달한다. `actionsSpacing`의 기본값 `default`는 본문 아래 32px, `compact`는 24px다. 약관동의는 기본값으로 취소/확인, 회원 정보·부가 정보는 compact로 취소/다음을 전달해 기존 실효 간격(Stack gap 16px + 버튼 영역 margin 8px)을 유지한다. 액션이 없는 휴대폰 인증은 인증 요청·확인 버튼을 기존 폼 내부에 둔다.

회원가입 form은 `id="registration-form"`을 유지 식별자로 사용하고 레이아웃 액션의 submit 버튼은 `form="registration-form"`으로 연결한다. 버튼이 폼 밖에 있어도 기존 onSubmit·noValidate와 Enter 제출을 유지하며, 레이아웃은 폼 상태나 제출 정책을 소유하지 않는다.

검증: Panda 생성·타입 검사·변경 파일 ESLint·Prettier·Next.js production build 통과. 웹/모바일 Storybook 12개(약관 4개, 회원가입 8개)에서 간격·동일 너비·2열/8px gap과 submit.form 연결 및 기존 팝업·비밀번호·이메일/주소 입력 흐름을 확인했다. 별도 브라우저 검사로 웹/모바일 Enter 제출이 기존 검증 핸들러를 실행하는 것도 확인했다. 관련 출처는 AccountFormLayout, SignupTermsContent, RegistrationContent와 세 파일의 기존 Storybook 검증 경로다.

## 유사 화면의 레이아웃 그룹 공통화 (2026-10-19)

Features의 main·폭 제한·제목/본문 구조와 기존 layouts를 점검한 뒤 중앙 정렬 계정 화면·주문 화면·사이드바 화면을 공통화했다. 상태·검증·데이터·라우팅은 각 feature에 유지한다.

| 그룹             | 공통 구성과 적용 화면                                                                                                                                                                | 유지 계약                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| 계정 중앙 프레임 | `AccountPageLayout` → LoginLayout, SignupLayout, 계정 찾기, 비밀번호 재설정, 본인인증, 잠금 해제 완료, 가입 완료, 기존 AccountFormLayout의 약관동의·휴대폰 인증·회원 정보: 10개 화면 | main/내부 div·section 2단 구조, 기존 폭 420/500/568px·외곽 패딩·최소 높이·제목 크기/간격·완료 안내 배치 유지     |
| 주문 프레임      | `OrderPageLayout` → 장바구니와 CheckoutLayout의 주문/결제·주문완료                                                                                                                   | 1100px 폭, 웹/모바일 외곽 패딩, 제목과 주문 단계의 header, 단계 1/2/3 및 모바일 숨김 유지                        |
| 사이드바 프레임  | `MyPageFrame` → 기존 `SidebarNavigationLayout` 조합으로 주소·프로필·쿠폰·리워드·리뷰·상품 이용내역에 적용                                                                            | 데스크톱 180px 사이드바·50px gap·상단 70px/하단 120px, 마이페이지의 모바일 무여백·숨김 메뉴·Breadcrumb 순서 유지 |

`AccountPageLayout`은 `children`, `contentWidth`(기본 500px), `contentAs`(div/section), `contentLabelledBy`, `fillMobileViewport`, `outsideContent`, `pageCss`, `contentCss`를 받는다. 기본 외곽은 기존 AccountFormLayout과 같은 웹 상단 96px·좌우 20px·하단 80px, 모바일 상단 40px·좌우 16px·하단 32px이다. 기능별 차이는 타입이 지정된 `pageCss`·`contentCss`에 `css.raw` 객체를 전달해 보존한다. 공통 기본 스타일과 호출부 차이를 하나의 `css(...)`에서 병합하며, 호출부 `css.raw`는 Panda 정적 추출 대상이다. 모달/완료 안내는 폭 제한 밖 main 내부 `outsideContent`로 전달한다. 추가 DOM 래퍼나 client 경계는 만들지 않는다.

제목·진행 단계는 LoginLayout·SignupLayout에 남고, AccountFormLayout의 공개 제목·설명·actions 계약도 유지한다. 비밀번호 재설정·본인인증·완료 화면의 서로 다른 제목이나 안내 배치는 해당 feature가 소유한다. 가입 완료는 기존 모바일에서도 상단 96px·하단 124px을 쓰므로 공통 모바일 기본값을 명시적으로 덮어쓴다. `SidebarNavigationLayout.mobileSpacing`은 기본 `default`로 기존 지원 화면의 모바일 여백을 유지하며 `none`을 사용하는 MyPageFrame만 모바일 좌우·상하 여백을 0으로 둔다.

기존 ContentLayout·CustomerCenterLayout·상품 목록/상세·런클럽 레이아웃은 각자의 Breadcrumb·폭·sticky·모바일 배치 책임을 유지한다. 서로 다른 화면을 동일한 제목 variant나 여백으로 강제 통일하지 않았다.

검증: Panda 생성·전체 타입 검사·변경 TSX ESLint·Prettier, 폼/계정 복구/App Router 테스트 37개·주문 합계 테스트 3개, Next.js·Storybook production build가 통과했다. 변경 전후 웹/모바일 31건(Storybook 29개·장바구니 실제 경로 2개)에서 정규화한 DOM(클래스 제외·자동 ID 정규화), main 기준 좌표·크기·padding/margin/gap·최소 높이·font-size/display가 일치했다. 로그인 성공/형식 오류, 가입 필드 검증, 계정 찾기 인증번호 요청/오류, 비밀번호 재설정 오류/완료의 기존 play 11개와 주문 완료 웹/모바일 play 2개도 통과했다. 실제 경로 `/mypage/addresses`, `/mypage/profile`, `/support/store`, `/support/terms`, `/support/teamwear`의 웹/모바일 10건에서 공통 사이드바 배치와 마이페이지 무여백/기존 지원 화면 여백을 확인했다. Storybook 의존성의 기존 번들 경고는 유지된다. 출처는 frontmatter의 작업 트리 경로다.

`OrderPageLayout`의 API는 `title: ReactNode`, `step: 1 | 2 | 3`, `headerSpacing?: 'default' | 'none'`, `children`이다. title 슬롯에 각 feature의 기존 h1 Typography를 전달해 장바구니와 결제 화면의 다른 타입 스케일을 보존한다. 공통 StepIndicator는 장바구니→주문/결제→주문완료 항목을 사용하고 모바일에서는 숨긴다. 기본 제목 아래 간격은 40px이며 장바구니는 `none`으로 기존 상품 수 안내의 자체 margin을 유지한다. CartPage의 수량·삭제 콜백과 합계 계산, CheckoutPage의 검증·완료 상태와 onComplete는 기존 소유자에 남고, CheckoutLayout의 외부 API도 유지한다.

## FormStateAudit의 PC/MO·상태 분류 (2026-10-19)

기존 단일 FormStateAudit.stories.tsx는 `src/stories/features/forms/form-state-audit/`로 나눴다. Storybook 탐색 경로는 `Development/FormStateAudit/{PC|MO}/{Validation|Expired|Inheritance}`다. 각 플랫폼은 Validation(오류→수정·복구/완료) 13개, Expired(휴대폰 인증 만료) 1개, Inheritance(공통 컨트롤의 오류 상속·해제) 1개로 구성되며 총 30개다. preview의 storySort는 PC→MO, Validation→Expired→Inheritance 순서를 지정한다.

6개 *.stories.tsx는 분류와 시나리오 선택만 담당한다. 계정·마이페이지·상품·고객문의·공통 컨트롤의 5개 *.scenarios.tsx는 기존 render/play를 소유하고, shared.tsx는 플랫폼 Provider·375px 모바일 wrapper·fullscreen을, enterAddress.ts는 반복 주소 모달 입력을 담당한다. 모바일 전용 story 복제와 parameters 덮어쓰기를 제거해 상품 pathname과 가입 step query를 공통 플랫폼 메타와 함께 유지한다. 기존 form-audit/form-audit-new 태그에 form-audit-pc/mo와 form-audit-validation/expired/inheritance를 추가했다. CSF 정적 인덱싱을 위해 태그는 각 meta에 문자열 리터럴로 명시한다. 이전 단일 그룹 story ID는 새 플랫폼/상태 경로로 바뀐다.

검증: 원본 15개 render/play 선언의 이동 전후 소스 일치, 정적 index의 6개 그룹·30개 story·기존/신규 태그 등록을 확인했다. 변경 파일 ESLint·Prettier·전체 타입 검사·Storybook production build가 통과했으며 정적 Storybook(127.0.0.1:6007)을 대상으로 Edge headless에서 PC/MO play 30개가 모두 통과했다. 앱 구현과 검증 조건은 변경하지 않았다. 출처는 frontmatter의 새 스토리/시나리오·helper·preview 작업 트리 경로다.

## 고객센터 페이지 제목의 레이아웃 소유권 (2026-10-19)

CustomerCenterLayout은 필수 title과 선택 description을 받아 오른쪽 본문 상단에 단일 h1과 설명을 배치한다. PC에서는 제목과 좌측 메뉴의 시작점을 맞추고 모바일에서는 메뉴를 숨긴다. 고객센터 메인의 제목·소개 문구와 모바일 줄바꿈은 SupportPage만 전달한다. 하위 화면에는 메인 소개를 표시하지 않는다. 이전 hideIntro·hideIntroMobile 분기를 제거하고 사용처 12곳을 전환했다.

제목은 PC heading6을 유지한다. mobileTitleVariant는 기존 heading4·heading5·heading7을 보존하고, headingProps는 gap·mb·모바일 간격을 전달한다. 기본 제목 영역은 gap 16px·하단 24px이며 메인은 제목→소개 24px(모바일 16px)·하단 40px, FAQ 모바일은 하단 8px, 공지 목록은 PC 하단 36px, 문의 모바일은 하단 16px을 유지한다. showHeadingDivider는 기존 SupportPageHeading의 PC 2px 검은 구분선을 표현하며 모바일에서 숨긴다. 미사용이 된 SupportPageHeading은 제거했다. Breadcrumb·활성 메뉴·탭·필터·문의 상태와 제출 처리는 기존 소유자에 둔다.

실제 검증: Edge 브라우저로 기존 고객센터 스토리 24개에서 PC/MO 제목·단일 main/h1·메인 소개의 표시 범위·메뉴 정렬과 모바일 숨김을 확인했다. FAQ·공지 더보기, 배송/반품 탭 전환을 확인했다. Panda 생성, TypeScript, 변경 TSX ESLint·Prettier, Next.js와 Storybook 빌드를 통과했다. Storybook의 기존 directive·청크·플러그인 시간 경고는 남아 있다. 출처는 작업 트리의 CustomerCenterLayout, 해당 기능 페이지와 src/stories/features/support/SupportPages.stories.tsx다.

## 계정 폼 제목의 AccountFormHeader 공통화 (2026-10-19)

AccountFormHeader는 제목과 선택 설명을 한 영역에 배치한다. title·titleId·description·descriptionTone과 호출부의 간격 객체 spacingCss를 받는다. 제목은 Typography as="h1" web="heading7" mo="heading5", 설명은 p/body3·기본 tertiary, 제목→설명 기본 간격은 12px이다. spacingCss는 css.raw로 전달해 Panda에서 추출하고 공통 스타일과 하나의 css 호출로 병합한다. 상태나 추가 client 경계는 만들지 않는다.

IdentityVerificationContent·FindAccountContent·SignupMethodStep·AccountFormLayout 네 곳이 이를 사용한다. 본문 간격은 호출부에서 유지한다. 본인인증은 32px·설명 subtle, 계정 찾기는 PC 40px/MO 32px·제목→설명 PC 10px/MO 12px, 가입 방법은 본문 mt 24px, AccountFormLayout은 PC 40px/MO 32px이다. verification-title·find-account-title·signup-title과 section/form의 aria-labelledby 연결을 유지한다. AccountFormLayout의 공개 props·버튼·모달과 각 feature 상태·콜백은 유지한다.

실제 검증: 기존 PC/MO 스토리 14개에서 본문 간격, 설명 유무와 제목→설명 간격, 단일 h1과 기존 ID 연결을 확인했다. 계정 찾기 오류·인증번호 입력, 약관 상세 상호작용, 회원가입 이메일 중복확인 스토리를 확인했다. Panda 생성·TypeScript·변경 TSX ESLint/Prettier·Next.js/Storybook 빌드를 통과했다. 본인인증 모바일 스토리는 기존처럼 platform-mobile 클래스만 지정하므로 Typography의 web 컨텍스트 동작을 이번 변경에서 수정하지 않았다. 출처는 작업 트리의 AccountFormHeader와 네 사용처, 해당 기존 Storybook이다.

## 바텀시트 버튼 크기의 Footer 소유권 (2026-10-19)

MobileProductFilter의 적용 액션은 일반 Button variant="primary"를 사용한다. BottomSheetFooter가 전달받은 단일 버튼 요소를 cloneElement로 조합해 size="tall"·fullWidth=true를 적용한다. onClick·라벨·기존 ref 등 나머지 props는 보존한다. 이에 맞춰 BottomSheet.footer와 Footer.children 타입은 ReactElement<ButtonProps>로 지정한다. 기존 Footer 패딩·safe-area·상단 경계, Drawer 포털·닫기·스크롤 구조는 유지한다.

ButtonVariant에서 bottomSheetPrimary와 해당 primary 판정·강제 전체 너비 분기를 제거했다. ButtonDocs의 전용 variant 비교 셀과 너비 분기도 제거했다. 기본 primary의 색상·상태 처리는 그대로 사용한다. 크기와 전체 너비의 책임은 시트 Footer에 둔다.

실제 검증: Edge에서 상품 목록 375px·768px의 필터를 열어 적용 버튼 높이 48px·Footer 내부 전체 너비(각 343px·608px)·검은 배경, 적용·닫기 버튼·Escape 동작을 확인했다. src에서 bottomSheetPrimary 참조가 사라졌으며 기존 form-controls 테스트 33개, Panda 생성·TypeScript·변경 TSX ESLint/Prettier·Next.js와 Storybook 빌드를 통과했다. 출처는 작업 트리의 위 5개 변경 파일과 기존 ProductListingPage Storybook이다.

## 반복 상단 여백의 Stack 간격 소유권 (2026-10-19)

선택한 7개 소스의 동일 구간 반복 mt를 Stack gap으로 이전했다. EmptyState의 standard/minimal 루트는 gap 2로 설명·액션의 조건부 표시를 유지한다. SupportPage는 상담·공지·FAQ 본문 그룹을 PC gap 20(80px)·MO gap 10(40px)으로 배치한다. SignupDetailsStep은 입력 필드 그룹에 gap 4와 그룹 시작 mt 4를 적용하고 각 필드의 styles.field를 제거했다. local의 아이디·비밀번호와 오류 표시·폼 제출 연결을 유지한다. SignupMethodStep은 제목·혜택·링크 구간만 gap 6으로 묶고 뒤의 36px·16px 간격을 유지한다.

DesignGuideTypography는 두 표 섹션을 gap 6·시작 mt 6인 그룹으로 묶는다. IaStructurePage의 진행률·진행 막대·요약 그룹은 gap 3·시작 mt 4를 사용한다. ButtonDocs 루트는 gap 10(40px)으로 헤더·variant별 섹션·사용 예시를 배치하고 section 클래스의 mt를 제거한다. 고정 위치 복사 안내는 기존 위치를 유지한다. 그룹에 따라 간격을 소유하는 Stack 래퍼를 추가하며 기존 section·form·제목 ID·표·링크·콜백과 외부 props는 유지한다.

검증: 임시 Storybook fixture로 PC/MO 24개 조합의 변경 전후 제목·본문·입력·버튼·링크·표 등의 좌표와 크기를 비교해 일치를 확인했다. EmptyState 설명/액션 생략, standard/minimal, 가입 local/social·오류 상태를 포함한다. 임시 fixture는 검증 후 제거했다. 기존 가입 비밀번호·필드 검증 PC/MO play 4개도 통과했다. Panda 생성·전체 작업 트리 TypeScript·변경 TSX ESLint/Prettier, 별도 작업 폴더의 Storybook 빌드를 확인했다. 현재 작업 트리의 기본 Next.js production build도 통과했다. 별도 폴더의 기본 빌드는 외부 node_modules 링크 제한, webpack 빌드는 기존 라우트의 자동 생성 PageProps 오류로 실패했으며 최종 결과는 현재 작업 트리의 기본 빌드로 확인했다. 출처는 작업 트리의 위 7개 파일이다.

## 반복 형제 여백의 프로젝트 정책 (2026-10-19)

AGENTS.md의 Styling rules는 반복 mt/marginTop이 같은 형제 간격을 나타내면 부모 Stack gap을 우선 사용하도록 규정한다. 세부 기준은 component-reusability의 Repeated sibling spacing을 참조한다. 실제 형제 순서·조건부 분기·직접 props와 css/공유 클래스/컴포넌트 내부 여백을 확인하고, 같은 간격 구간만 묶어 그룹 시작 여백·PC/MO 값·HTML 의미를 유지한다. Grid의 배치 의도, 음수·sticky·겹침과 서로 다른 경계는 일괄 전환하지 않는다.

기존 부모를 우선 재사용하고 새 wrapper는 실제 간격 책임과 직접 자식 선택자·폭/정렬·최소 높이·form/접근성 연결을 확인한 뒤 검토한다. margin collapse와 기존 mb/my·padding/gap도 비교한다. 구현 시 PC/MO 좌표·크기·조건부 상태 및 필요한 폼 동작을 검증하고 임시 fixture를 제거한다. 이전 32px 값이나 24개 검증 조합을 모든 작업의 고정 기준으로 삼지 않는다. 정책만 수정하는 요청은 추가 소스 마이그레이션이나 앱 빌드를 요구하지 않는다.

검증: 임시 검증 경로에 PyYAML을 설치해 skill-creator의 quick_validate.py 통과를 확인했고 AGENTS·스킬 Prettier와 변경 diff를 검사했다. 애플리케이션 소스는 수정하지 않았다. 출처는 작업 트리의 AGENTS.md와 .codex/skills/component-reusability/SKILL.md다.

## 최근 검색어 전체 삭제의 링크형 버튼 (2026-10-19)

RecentSearches의 전체 삭제는 경로 이동이 아닌 onClear 동작이므로 Button variant="link" size="md"로 표시한다. 기본 텍스트 스타일을 재사용해 로컬 button CSS와 중복 Typography를 제거했다. 검색어가 있을 때만 표시하며 목록·개별 삭제·외부 props는 유지한다. 기존 body5 라벨은 공통 md 링크 규격으로 전환한다.

검증: 변경 파일 ESLint·Prettier 통과. 기존 SearchOverlay PC/MO 스토리에서 BUTTON 태그, 클릭 후 빈 상태·전체 삭제 버튼 숨김·localStorage 배열 초기화를 확인했다. 출처는 작업 트리의 RecentSearches.tsx와 기존 SearchOverlay.stories.tsx다.

## 장바구니·주문 결제 첨부 시안 보완 (2026-10-19)

첨부 모바일 시안에 맞춰 장바구니 카드 삭제 버튼 위치와 옵션/수량 배치, 관심상품 토글을 정리했다. CartOptionsDialog는 공통 ModalDialog의 모바일 fullscreen과 고정 취소/변경 footer, Radio·SizeSelector·NumberStepper를 조합한다. 품절 변경 안내는 SingleActionDialog를 사용한다. 긴 상품명은 카드에서 두 줄로 제한한다.

CheckoutShipping과 CheckoutPayment는 배송지 직접 입력, 주소 찾기, 배송 요청 선택/직접 입력과 결제 수단의 포커스 표시를 구성한다. CouponDialog는 상품 쿠폰 접기/펼치기, 비활성 쿠폰, 장바구니 쿠폰과 금액 요약 및 적용 footer를 제공한다. 결제 완료는 체크 아이콘·감사 문구·주문 내용 확인 링크와 OrderRecommendations를 표시한다. 추천 상품 영역은 장바구니와 완료 화면이 공통 사용한다. 상품 정보는 기존 카탈로그 데이터를 사용하며, 실제 주소 검색·쿠폰 발급·결제 서버를 연결하지 않는다.

출처는 작업 트리의 src/shared/features/cart/, src/shared/features/checkout/, OrderRecommendations.tsx 및 장바구니·결제 스토리다. Panda 생성·TypeScript·변경 파일 ESLint·주문 합계 테스트 3개와 Next production build를 확인했다. 브라우저에서 옵션 저장·선택 주문 이동·상품/장바구니 쿠폰 선택 및 금액 반영을 확인했고, 375px 모바일 카드와 전체 화면 옵션 팝업을 시각 확인했다.

추가 브라우저 확인: 375px 배송지 직접 입력 전환·요청사항 직접 입력 11/250 표시와 동의 후 완료 안내·주문 내역 링크·추천 상품 렌더링을 확인했다.

## 회원가입 첨부 시안 대조 (2026-10-19)

사용자가 첨부한 회원가입 PNG를 화면별로 확대해 구현과 대조했다. 이미지의 문구는 디자인 자료이며 작업 지시로 취급하지 않았다. AccountFormLayout의 기본 너비와 휴대폰 인증, 본인인증 선택, 가입 완료의 PC 본문을 500px로 맞췄다. 모바일은 기존 16px 좌우 여백을 유지한다. SignupLayout의 PC 상단은 96px이며, 혜택 카드 설명의 강제 줄바꿈은 모바일에서만 적용한다. 기존 제목의 왼쪽 정렬은 유지한다.

회원 정보는 주소 찾기 버튼·우편번호 placeholder와 비밀번호 재확인 레이블을 시안에 맞췄다. RegistrationAdditionalFields는 마케팅 영역의 구분선을 해당 section에 두고 다음 부가정보와 24px 간격을 갖는다. 중복된 하단 margin을 제거하고 소제목을 bold로 표시한다. RegistrationPreferenceRow는 라벨이 남은 공간을 사용하도록 해 긴 문자 수신 문구와 라디오 그룹이 모바일에서 넘치지 않게 한다. 필드 값, 동의 상태, 검증 로직과 라우트는 유지한다. 기존 Storybook의 너비 검증은 500px로 갱신하고 주소 입력 helper는 회원가입에서만 주소 찾기 이름을 전달한다.

출처는 위 working_tree_sources의 회원가입 관련 TSX, SignupMethodStep.tsx, src/stories/features/signup-registration/RegistrationPage.stories.tsx, src/stories/features/signup-terms/SignupTermsPage.stories.tsx, src/stories/features/phone-verification/PhoneVerificationPage.stories.tsx, src/stories/features/forms/form-state-audit/account.scenarios.tsx 및 enterAddress.ts다. 첨부 PNG는 외부 디자인 참고이며 저장소에 복사하지 않았다. 브라우저에서 PC 본문 500px·혜택 카드 줄바꿈 없음, 375px 부가 정보 본문 343px·가로 넘침 없음, 휴대폰 인증 오류 네 필드 표시, 모바일 이메일 형식 확인·주소 입력·부가 정보 전환 스토리의 최종 상태와 오류 로그 없음을 확인했다. Panda 생성·변경 파일 ESLint·Storybook production build는 통과했다. 동시 작업의 로그인 타입 오류가 해소된 최신 작업 트리에서 TypeScript와 Next production build(61개 경로)도 최종 통과했다. 실제 인증/SNS/이메일 중복 조회 등 서비스 연결을 검증한 것은 아니다.

가입 완료의 설명도 PC에서는 한 줄, 모바일에서는 지정된 위치에서 줄바꿈하도록 보완했다. 본문 너비·버튼·모바일 간격은 그대로 유지한다.
