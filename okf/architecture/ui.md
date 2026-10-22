---
type: Architecture
title: '컴포넌트와 스타일'
description: '공통 UI 계층, Panda CSS와 Storybook 작성 규칙을 설명한다.'
tags: [components, panda-css, storybook]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-22T00:48:21.800Z'
source_revision: d6cfae87226f075c8b39d0ec8d0e416ddf7b1f08
working_tree_sources:
  - .storybook/preview.ts
  - src/stories/features/support/SupportPages.scenarios.tsx
  - src/stories/features/support/SupportPages.MemberBenefits.Mobile.stories.tsx
  - src/shared/features/support/SupportPage.tsx
  - src/shared/features/support/SupportContacts.tsx
  - src/shared/features/support/SupportContactCard.tsx
  - src/stories/features/support/SupportPages.stories.tsx
  - src/stories/features/support/SupportPages.CustomerCenter.Mobile.stories.tsx
  at: '2026-10-21T08:15:46.840Z'
source_revision: c9e8b1a75bdd4a2d52308410b8ce77773464a9e6
working_tree_sources:
  - src/shared/features/catalog/product-listing/ProductListingLayout.tsx
  - src/shared/features/catalog/product-listing/MobileProductFilterTrigger.tsx
  - src/shared/components/molecules/AmountRow/AmountRow.tsx
  - src/shared/components/molecules/FormActionGroup/FormActionGroup.tsx
  - src/shared/components/molecules/SocialAuthButton/SocialAuthButton.tsx
  - src/shared/features/mypage/AddressEditor.tsx
  - src/shared/features/mypage/AddressList.tsx
  - src/shared/features/mypage/ProfileEditForm.tsx
  - src/shared/features/mypage/ProfileField.tsx
  - src/shared/features/mypage/ProfileReadView.tsx
  - src/shared/features/mypage/mypage-address.types.ts
  - src/shared/features/mypage/mypage-profile.types.ts
  - src/shared/features/product/ProductSupportTextLink.tsx
  - src/stories/components/atoms/Typography/Typography.CatalogTitle.stories.tsx
  - src/stories/components/molecules/AmountRow/AmountRow.stories.tsx
  - src/stories/components/molecules/FormActionGroup/FormActionGroup.stories.tsx
  - src/stories/components/molecules/SocialAuthButton/SocialAuthButton.stories.tsx
  - src/stories/components/organisms/OrderRecommendations/OrderRecommendations.stories.tsx
  - src/shared/components/atoms/Card/Card.tsx
  - src/shared/components/atoms/DataTable/DataTable.tsx
  - src/shared/components/atoms/EmptyState/EmptyState.tsx
  - src/shared/components/atoms/Fieldset/Fieldset.tsx
  - src/shared/components/atoms/TextInput/TextInput.tsx
  - src/shared/components/atoms/Typography/Typography.tsx
  - src/shared/components/molecules/HomeCarouselSection/HomeCarouselRail.tsx
  - src/shared/components/molecules/HomeCarouselSection/HomeCarouselSection.tsx
  - src/shared/components/organisms/Address/AddressField.tsx
  - src/shared/components/organisms/EmailAddressFields/EmailAddressFields.tsx
  - src/shared/components/organisms/Faq/FaqQuestion.tsx
  - src/shared/components/organisms/OrderRecommendations/OrderRecommendationItem.tsx
  - src/shared/components/organisms/OrderRecommendations/OrderRecommendations.tsx
  - src/shared/components/organisms/Search/SearchDialog.tsx
  - src/shared/components/organisms/Signup/SignupMethodButton.tsx
  - src/shared/features/cart/CartContent.tsx
  - src/shared/features/catalog/product-listing/ProductListTitle.tsx
  - src/shared/components/molecules/AmountRow/AmountRow.tsx
  - src/shared/features/checkout/CheckoutComplete.tsx
  - src/shared/features/checkout/CheckoutDiscountSummary.tsx
  - src/shared/features/checkout/CheckoutRecipientFields.tsx
  - src/shared/features/checkout/CheckoutSavedAddress.tsx
  - src/shared/features/checkout/CheckoutShippingInput.tsx
  - src/shared/features/checkout/CouponAmountSummary.tsx
  - src/shared/features/home/HomeCategorySection.tsx
  - src/shared/features/home/HomeShoeFinderSection.tsx
  - src/shared/features/login/LoginActions.tsx
  - src/shared/features/mypage/MyPageAddresses.tsx
  - src/shared/features/mypage/MyPageProfile.tsx
  - src/shared/features/mypage/MyPageRewards.tsx
  - src/shared/features/product/ProductAfterSalesContacts.tsx
  - src/shared/features/product/ProductDetailRecommend.tsx
  - src/shared/features/product/ProductDetailShippingGuide.tsx
  - src/shared/features/product/ProductSupportContact.tsx
  - src/shared/features/run-club/RunClubFilters.tsx
  - src/shared/features/signup-registration/RegistrationField.tsx
  - src/shared/features/support/InquiryFormActions.tsx
  - src/shared/styles/global.scss
  - src/stories/components/atoms/TextInput/TextInput.stories.tsx
  - src/stories/components/organisms/Search/SearchOverlay.stories.tsx
  - src/shared/features/size-guide/SizeGuideMeasurementMethod.tsx
  - src/shared/features/size-guide/SizeGuideMeasurementImage.tsx
  - src/shared/features/size-guide/SizeGuideMeasurementInstructions.tsx
  - src/shared/features/size-guide/SizeGuideChart.tsx
  - src/shared/features/size-guide/SizeGuideChoiceGroup.tsx
  - src/shared/components/atoms/DataTable/DataTable.tsx
  - src/shared/components/atoms/SegmentedControl/SegmentedControl.tsx
  - src/shared/components/atoms/Typography/Typography.tsx
  - src/shared/styles/global.scss
  - src/shared/features/support/support.navigation.ts
  - src/stories/components/atoms/DataTable/DataTable.stories.tsx
  - src/stories/components/atoms/SegmentedControl/SegmentedControl.stories.tsx
  - src/stories/components/atoms/Typography/Typography.ChoiceLabels.stories.tsx
  - src/shared/features/size-guide/SizeGuidePage.tsx
  - src/shared/features/size-guide/SizeGuidePanel.tsx
  - src/shared/features/size-guide/SizeGuideMeasurements.tsx
  - src/shared/features/size-guide/size-guide.data.ts
  - src/shared/components/molecules/SupportTabs/SupportTabs.tsx
  - src/shared/components/organisms/Layout/SiteFooter/footerData.ts
  - src/shared/features/product/ProductDetailPage.tsx
  - src/shared/features/product/ProductDetailPanel.tsx
  - src/shared/features/product/ProductDetailContent.tsx
  - src/shared/features/product/ProductVariantSelectors.tsx
  - src/shared/features/product/ProductSizeSelector.tsx
  - src/stories/features/support/SupportPages.scenarios.tsx
  - src/shared/features/catalog/product-listing/ProductListingLayout.tsx
  - src/shared/features/catalog/product-listing/ProductListTitle.tsx
  - src/shared/features/catalog/product-listing/MobileCategoryTabs.tsx
  - src/shared/features/catalog/product-listing/MobileProductFilterTrigger.tsx
  - src/shared/features/catalog/ProductListingPage.tsx
  - src/shared/components/molecules/ProductDetails/ProductDetails.tsx
  - src/shared/components/molecules/ProductDetails/ProductDetailsIdentity.tsx
  - src/shared/components/molecules/ProductDetails/ProductDetailsOptions.tsx
  - src/shared/components/molecules/ProductName/ProductName.tsx
  - src/shared/components/atoms/ProductGender/ProductGender.tsx
  - src/shared/components/molecules/PromotionCard/PromotionCard.tsx
  - src/shared/components/molecules/OrderProductSummary/OrderProductSummary.tsx
  - src/shared/components/atoms/Wishlist/Wishlist.tsx
  - src/shared/features/cart/CartContent.tsx
  - src/shared/features/cart/CartSelectionBar.tsx
  - src/shared/features/cart/CartProductList.tsx
  - src/shared/features/cart/CartSupportInfo.tsx
  - src/shared/features/cart/CartOptionsContent.tsx
  - src/shared/components/molecules/AmountRow/AmountRow.tsx
  - src/shared/features/checkout/CheckoutForm.tsx
  - src/shared/features/checkout/CheckoutContent.tsx
  - src/shared/features/checkout/CheckoutPayment.tsx
  - src/shared/features/checkout/CouponAmountSummary.tsx
  - src/stories/components/molecules/OrderProductSummary/OrderProductSummary.stories.tsx
  - src/stories/components/molecules/ProductOptionList/ProductOptionList.stories.tsx
  - src/stories/components/atoms/Wishlist/Wishlist.stories.tsx
  - src/shared/components/atoms/IconButton/IconButton.tsx
  - src/shared/components/atoms/Icon/Icon.tsx
  - src/shared/features/cart/CartItemRow.tsx
  - src/shared/features/cart/CartOptionsDialog.tsx
  - src/shared/features/checkout/CheckoutProductList.tsx
  - src/shared/features/checkout/CheckoutDiscountSummary.tsx
  - src/shared/features/checkout/CouponProductItem.tsx
  - src/shared/features/checkout/CheckoutComplete.tsx
  - src/shared/components/atoms/Button/Button.tsx
  - src/shared/components/atoms/ProductGender/ProductGender.tsx
  - src/shared/features/home/HomeBestSellerSection.tsx
  - src/stories/features/find-account/FindAccountPage.scenarios.tsx
  - src/shared/features/login/LoginPage.tsx
  - src/shared/features/catalog/productListingIaRoute.ts
  - src/shared/components/organisms/Layout/SiteHeader/megaMenu.ts
  - src/stories/components/atoms/Divider/Divider.stories.tsx
  - src/shared/features/terms/TermsDocument.tsx
  - src/shared/features/terms/TermsDateSelect.tsx
  - src/shared/components/atoms/Divider/Divider.tsx
  - src/shared/features/notices/NoticeContent.tsx
  - okf/architecture/support-design.md
  - src/shared/components/layouts/PageFrame/PageFrame.tsx
  - okf/architecture/storefront-design.md
  - src/shared/features/run-club/RunClubSessionCardContent.tsx
  - src/shared/features/run-club/RunClubSessionCardImage.tsx
  - src/shared/features/support/ProductReturnsPanel.tsx
  - src/shared/features/support/ReturnCautionsPanel.tsx
  - src/shared/features/support/ShippingGuidePanel.tsx
  - src/shared/features/support/ShippingReturnsGuide.tsx
  - src/shared/features/product/ProductAfterSalesQuestions.tsx
  - src/shared/features/product/ProductAfterSalesProcess.tsx
  - src/shared/features/product/ProductAfterSalesContacts.tsx
  - src/shared/features/mypage/MyPageBenefitItem.tsx
  - src/shared/features/support/SupportNoticeItem.tsx
  - src/shared/features/support/InquiryAttachmentHelp.tsx
  - src/shared/features/support/InquiryAttachmentList.tsx
  - src/shared/components/molecules/OrderStatusTracker/OrderStatusLink.tsx
  - src/shared/components/molecules/SectionHeading/SectionHeading.tsx
  - src/shared/features/mypage/MyPageMenuItem.tsx
  - src/shared/features/checkout/CheckoutAgreement.tsx
  - src/shared/components/organisms/InquiryBoard/InquiryBoardContent.tsx
  - src/shared/components/organisms/InquiryBoard/InquiryBoardHeader.tsx
  - src/shared/components/organisms/MyPage/CouponHistorySection.tsx
  - src/shared/components/organisms/MyPage/CouponRegistrationSection.tsx
  - src/shared/features/mypage/mypage-home-data.ts
  - src/shared/features/mypage/MyPageMenuSection.tsx
  - src/shared/features/mypage/MyPageOrderTile.tsx
  - src/shared/features/mypage/MyPageRecentOrders.tsx
  - src/shared/features/mypage/MyPageBenefits.tsx
  - src/shared/features/mypage/MyPageMembership.tsx
  - src/shared/features/mypage/MyPageOverviewProfile.tsx
  - src/shared/Mockup/signup/SignupTermsStep.tsx
  - src/shared/Mockup/signup/SignupTermsAgreements.tsx
  - panda.config.ts
  - src/shared/components/layouts/SidebarColumns/SidebarColumns.tsx
  - src/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout.tsx
  - src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx
  - src/shared/components/molecules/MainSection/MainSection.tsx
  - src/shared/components/molecules/MainSection/MainSectionHeader.tsx
  - src/shared/components/organisms/Hero/HeroCopy.tsx
  - src/shared/components/atoms/LoadMoreButton/LoadMoreButton.tsx
  - src/stories/components/atoms/LoadMoreButton/LoadMoreButton.stories.tsx
  - src/shared/components/layouts/BottomSheet/BottomSheet.tsx
  - src/shared/components/layouts/BottomSheet/BottomSheetContent.tsx
  - src/shared/features/catalog/product-listing/filterProducts.ts
  - src/shared/components/atoms/Badge/PromotionBadge.tsx
  - .codex/skills/component-reusability/references/content-sections.md
  - src/stories/components/molecules/ContentHeader/ContentHeader.stories.tsx
  - src/stories/components/layouts/ContentSection/ContentSection.stories.tsx
  - src/shared/features/support/SupportNotices.tsx
  - src/shared/features/support/SupportFaq.tsx
  - src/shared/features/support/SupportMileageContent.tsx
  - src/shared/components/molecules/ContactCard/ContactCard.tsx
  - src/shared/features/support/SupportHours.tsx
  - src/shared/features/mypage/MyPageRewards.tsx
  - src/shared/features/product/ProductSupportLink.tsx
  - src/stories/features/login/LoginPage.stories.tsx
  - src/stories/features/login/LoginPage.mobile.stories.tsx
  - src/stories/features/login/LoginPage.scenarios.tsx
  - src/stories/features/support/SupportPages.scenarios.tsx
  - src/shared/features/screen-index/IaStructurePage.tsx
  - src/shared/features/phone-verification/PhoneVerificationDialogs.tsx
  - src/shared/components/organisms/MyPage/CouponDetailsDialog.tsx
  - src/shared/components/organisms/MyPage/CouponRegistrationDialog.tsx
  - src/shared/components/layouts/ContentSection/ContentSection.tsx
  - src/shared/components/molecules/ContentHeader/ContentHeader.tsx
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
  - src/shared/components/atoms/Button/Button.type-test.tsx
  - src/shared/components/atoms/ToggleButton/ToggleButton.tsx
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
  - src/shared/components/organisms/Search/PopularSearches.tsx
  - src/shared/components/organisms/Search/RecommendedSearches.tsx
  - src/shared/Mockup/signup/SignupCompleteStep.tsx
  - src/shared/Mockup/signup/SignupTermsStep.tsx
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
  - src/shared/Mockup/signup/SignupDetailsStep.tsx
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
  - src/stories/features/Mockup/signup/SignupSteps.stories.tsx
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
  - src/stories/features/signup-registration/RegistrationPage.stories.tsx
  - src/stories/features/signup-registration/MarketingConsentSummaryModal.stories.tsx
  - src/stories/features/identity-verification/IdentityVerificationPage.stories.tsx
  - src/stories/features/find-account/FindAccountPage.stories.tsx
  - src/stories/features/find-account/PasswordResetPage.stories.tsx
  - src/stories/features/find-account/IdConfirmationModal.stories.tsx
  - src/stories/features/find-account/PasswordResetCompleteModal.stories.tsx
  - src/stories/features/account-locked/AccountLockedPage.stories.tsx
  - src/stories/features/account-locked/AccountUnlockCompletePage.stories.tsx
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
  - src/shared/features/catalog/product-listing/SearchListingLayout.tsx
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

## 전체 소스 재사용 조사 적용 (2026-10-21)

[재사용 조사와 적용 기록](component-reusability-2026-10-21.md#8-코드-적용-2026-10-21)을 기준으로 다음 공용 계약을 적용했다.

- AmountRow를 molecules로 승격해 cart·checkout의 표시를 공유한다. 합계 계산은 기존 기능에 남긴다. OrderRecommendations는 items/title을 받으며 런타임 mock import를 제거했다. src/mocks/orderRecommendations.ts가 첫 네 상품·이미지 fallback·상품 링크를 준비한다.
- SocialAuthButton은 provider와 appearance(login/signup)를 받는다. 기존 로그인 hover와 가입 border/inline 변수, 18px 아이콘, tall 크기를 유지한다. 문구·인증 업무와 미연결 안내는 기존 호출자가 소유한다.
- TextInput의 appearance=compact는 wrapper 없는 native control 표현이다. 기존 14px/1.3·border0·1px focus를 배송·주소에서 사용하고 CheckoutShippingInput 중간 어댑터를 제거했다. disabledAppearance=muted로 가입·이메일·주소의 중복 회색 표현을 모았다. boxed의 && 우선순위 및 disabled/readOnly 정책은 유지한다.
- HomeCarouselSection.mobileRail=bleed가 세 소비처의 100vw·우측 16px·wrapper 좌우 8px를 공유한다. 슬라이드 너비와 PC 2240/2560 표시 개수는 기존 소유자에 유지한다.
- FormActionGroup은 기존 폼 안에서 취소(type=button)·제출(type=submit)을 같은 너비로 배치한다. 문의 등록·배송지 수정·회원정보 수정에 적용하며 새 배송지의 단일 저장 버튼, modal/fixed action은 유지한다.
- AddressList/AddressEditor, ProfileField/ProfileReadView/ProfileEditForm을 mypage 내부 파일로 나눴다. 데이터/타입도 기능 내부에 둔다. 입력값·검증·저장·기본 배송지·삭제·탈퇴 상태는 기존 페이지가 소유한다. Rewards의 번호행과 product 지원 링크는 기능 내부 책임으로만 분리했다.
- RunClubFilters는 기존 unstyled SegmentedControl/ToggleGroup을 사용한다. Fieldset/DataTable 숨김 텍스트는 Typography.srOnly를 사용하며 legend/caption 의미를 보존한다. 동일 web/mo variant, Card/EmptyState 문단, A/S Grid props, 회원등급 Circle도 정리했다.
- 상품 목록 제목은 catalogTitle Typography/토큰으로 PC 기존 headingKr7·MO 24px/900/1.3을 유지한다. 일반 heading의 모바일 축척은 바꾸지 않는다.
- PC SearchDialog는 비모달 Base UI Dialog로 Escape·outside/focus dismissal을 위임한다. Portal은 헤더 내부 host에 놓아 기존 위치/hover 영역을 유지하고 header-search-control로 이동할 때 닫기를 취소한다. 포커스 복원은 기존 SiteHeader 소유다. Autocomplete/NavigationMenu는 현재 독립 버튼/순차 Tab 계약을 유지한다.

새 공용 API와 입력/검색 상호작용에 Storybook 사례를 추가했다. 최종 검증 결과는 위 적용 기록에 남긴다.

## 사이즈 가이드 재사용 개선 (2026-10-21)

[사이즈 가이드 재사용 기록](size-guide.md#재사용-개선과-사이드-메뉴-순서-2026-10-21)에 ContentSection·Grid·기능 내부 선택행, DataTable.spaced의 스타일 병합, SegmentedControl.itemRender와 Typography choiceLabel/unitLabel의 토큰·보존 검증을 기록했다. supportNavigation의 사이즈 가이드는 약관 다음 마지막 항목이다. 앞선 준비 단계의 기능별 표 클래스 구성은 이 변경으로 대체한다.

## 사이즈 가이드 화면 준비 (2026-10-21)

[사이즈 가이드](size-guide.md)에 8개 품목 패널, 측정 안내 분리, SupportTabs guide 변형과 공통 선택·표 재사용을 기록했다. 기존 빈 본문은 측정 안내로 대체했고, 확정되지 않은 치수는 자리표시자로 유지한다. 첨부 이미지 출처와 PC/MO 검증 범위도 해당 문서를 참고한다.

## GNB 최종 메뉴 반영 (2026-10-20)

사용자가 첨부한 최종 GNB 이미지 기준으로 PC·모바일이 공유하는 megaMenus를 갱신했다. Men/Women의 표기를 러닝웨어·기타용품 및 신발의 로드러닝·트레일러닝으로 맞췄다. Shoes는 ICONS(본디·클리프톤·스피드고트·마파테·호파라), 남성, 여성 순서이며 성별 신발 목록은 공통 데이터 함수로 생성한다. Explore는 Featured(로드 러닝 가이드·트레일 러닝 가이드·Running Session), Technology(고어텍스·비브람), 러닝 세션 신청 순서다.

열의 선택적 to는 하위 메뉴가 없는 직접 링크다. MegaMenuList에서는 제목 링크, MenuDrawerGroups에서는 Accordion 다음의 독립 링크로 렌더링한다. 러닝 세션 신청은 /running/run-club로 이동하며 메뉴를 닫는다. 기존 Accordion 단일 펼침과 포커스 복귀 로직은 유지했다. 모바일 첫 화면의 Best·런칭캘린더 등 기존 보조 메뉴는 이번 4개 GNB 분류 변경 범위에 포함하지 않았다.

상품 메뉴는 eland_hca_01에 맞춰 /products 쿼리로 연결한다. IA 링크 생성기도 새 Featured 이름, 색상·모델·UTMB collection, 용품 라이프스타일 조건을 동일하게 처리한다. 이 변경은 메뉴·URL 매핑이며 모델·컬렉션 필터 기능을 새로 구현하지 않는다. IA 158의 미리보기와 준비 상태는 기존 런클럽 목록 스토리로 연결했다.

Explore 가이드 2개, Running Session 소개, 기술 소개 2개는 현재 저장소에 본문 라우트가 없으며 지정 경로만 메뉴에 정의했다. 이번 작업에서 소개 본문을 만들거나 화면 구현 완료로 표시하지 않았다.

작업 트리의 위 6개 UI·링크 파일과 src/data/screenRegistry.ts를 대조했다. 90개 3Depth 항목의 IA 이름·순서 및 상품 URL 조건 일치, IA 번호 중복 없음과 기존 번호·비대상 화면 보존을 Node 단언으로 확인했다. npm run typecheck와 변경 소스 ESLint를 통과했다. 브라우저 화면 검증은 수행하지 않았다.

## 폼 라벨 변경 병합 충돌 해결 (2026-10-20)

`Typography.formLabel`의 body4 스케일과 프로필 부가정보 제목의 `mo: heading7` 변경을 반영했다. `EmployeeCoupons`의 고정 카드와 `ContentSection`, `MyPageProfile`의 공통 `Divider`·폼·footer, `NotFoundPage`의 `SystemStatusPage` 위임은 최신 구현을 유지한다. UI 문서의 단일 생성 시각과 양쪽 변경 이력을 보존한다. 출처는 `working_tree_sources`의 해당 네 TSX 파일이다. 타입·변경 TSX ESLint·Prettier·Panda 생성·Next.js 프로덕션 빌드·스테이징 기준 OKF 검사를 통과했다. 브라우저 시각·상호작용 검증은 실행하지 않았다.

## UI 병합 충돌 해결 (2026-10-20)

`EmployeeCoupons`, `MyPageProfile`, `NotFoundPage`의 공통 `ContentSection` 구성을 유지하면서 들어오는 브랜치의 UI 변경을 통합했다. 임직원 쿠폰은 50%·30% 발급 안내 카드 두 건과 체크 아이콘을 표시한다. 프로필은 문자·카카오톡 수신 설정을 하나로 묶고 결혼 여부 편집, 변경사항 저장 문구와 탈퇴 안내를 반영한다. 프로필의 조회 화면 수정 버튼은 공통 footer에 두고 편집 폼의 검증·제출·취소·탈퇴 대화상자 상태를 유지한다. 404 화면은 `black.100` 아이콘 색상과 제목/설명 사이 간격 4를 적용하며 공통 헤더·footer를 유지한다.

위 세 파일은 `working_tree_sources`에 포함된 작업 트리 출처다. 양쪽 문서 이력과 출처 메타데이터를 보존하고 충돌 난 생성 시각은 더 최신 값을 유지했다. 타입 검사·변경 TS/TSX ESLint·충돌 해결 파일 Prettier·Panda 생성·Next.js 프로덕션 빌드·스테이징 기준 OKF 검사를 통과했다. 브라우저 시각·상호작용 검증은 실행하지 않았다.

## 가로형 ContentHeader 소비처 확대 (2026-10-20)

고객센터 공지·문의 파일 첨부, 최근 검색어, 쿠폰 카드, 상품 옵션, 휴대폰 인증약관과 MainSectionHeader·SectionHeading·OrderStatusTracker의 9개 구성에 orientation/action을 적용했다. 기존 ContentSection 또는 제목과 본문 간격을 소유하는 구성은 title/headerProps 기본 API를 사용한다. MainSectionHeader는 중앙 contentFrame 너비, SectionHeading은 기존 제목 레벨 API를 전달하는 어댑터를 유지한다.

기존 HStack 기본 gap 8px과 Flex의 normal gap을 구분하고, 최근 검색어의 PC flex-start·모바일 space-between, 쿠폰의 flex-start 정렬, 공지 pb=6·약관 mb=2를 보존한다. 중첩 headerProps 스타일은 css.raw로 추출한다. 주문 현황의 헤더 mb=3은 ContentSection gap=3으로 옮겼다. 제목 레벨·ID·타이포그래피, 조건부 액션, 링크·콜백과 파일 입력 ref를 유지하며 상품 옵션 본문 children도 직접 렌더링한다.

기존 표의 MainSectionHeader·OrderStatusTracker·CouponCard 가로 액션 유지 판정은 이번 적용으로 대체한다. InquiryBoardHeader는 제목/체크박스 그룹과 별도 우측 액션의 2단 구성을 유지한다. 모달·BottomSheet의 전용 헤더, PersonalizationCard의 small eyebrow, 장바구니 제목/건수·진행 단계, 제목이 아닌 가격·필드 라벨·목록 행은 이관하지 않는다.

검증: 타입·변경 파일 ESLint/Prettier·Panda 생성·Next/Storybook production build, 기존 폼/계정 복구/주문 합계 테스트 40개가 통과했다. 실제 컴포넌트 SSR fixture 11개(최근 검색어 빈 상태·상품 옵션 액션 없음 포함)를 Chrome에서 1280px/375px로 비교한 22개 사례에서 제목·액션·목록·본문의 좌표/크기·타이포그래피·색상 차이가 없었다. 정적 Storybook에서 두 화면 폭의 검색어 전체 삭제·쿠폰 상세 열기/닫기·약관 모두동의/상세·파일 첨부/삭제·상품 사이즈 가이드 팝업 등 10개 동작도 확인했다. 사이즈 가이드의 외부 응답은 가로채고 팝업 대상 URL만 검사했다. 임시 fixture 기반 비교이며 실제 API 통합 검증을 의미하지 않는다.

## 가입 목업 약관 영역 분리 (2026-10-20)

`Mockup/signup/SignupTermsStep`의 전체 동의와 개별 필수 약관 3개를 같은 목업 폴더의 `SignupTermsAgreements`로 분리했다. 새 컴포넌트는 전체 동의 표시값·개별 선택값·message와 네 개의 체크 콜백을 받고 Fragment로 기존 Terms와 VStack을 직접 반환한다. 별도 DOM 래퍼·상태·상세 모달은 추가하지 않았다.

전체 동의 여부의 AND 계산과 제목·오류 안내·다음 버튼은 SignupTermsStep에 남긴다. 전체 동의의 배경·여백과 목록의 테두리·label/button 선택자, required·미선택 오류 조건과 보기 버튼을 그대로 이전했다. 운영용 signup-terms 기능의 약관 목록과는 별개이며 목업의 공개 props도 유지한다.

개별 약관 3개는 로컬 `items` 배열의 안정적인 id·문구·checked·onCheckedChange·showDetails로 정의하고 한 번의 map으로 Terms를 렌더링한다. required와 미선택 오류 조건은 공통 JSX에서 처리한다. 이용약관·개인정보에는 보기 버튼이 있고 연령 항목에는 없다. 별도 범용 컴포넌트나 상태를 추가하지 않는다.

검증 (2026-10-20, Codex): Panda 생성·전체 타입 검사·변경 TSX ESLint·Prettier·Next/Storybook production build를 통과했다. 기존 `Mockup/Signup` Terms/MobileTerms에서 PC 1600px·모바일 375px 각각 54개 요소의 태그·위치·크기·폰트·색상·padding·gap·display가 분리 전후 동일함을 확인했다. PC는 폰트 로딩이 안정된 뒤 재비교했다. 기존 스토리의 체크/다음 콜백은 no-op이므로 상태 전환 검증으로 기록하지 않는다.

반복 JSX를 map으로 통합한 뒤 Panda·전체 타입·변경 ESLint/Prettier·Next/Storybook production build를 다시 통과했다. 위 브라우저 동일성 검증은 map 통합 전 컴포넌트 분리 단계의 결과이며, 통합 후 브라우저 재확인은 목업 로딩이 완료되지 않아 검증 결과로 기록하지 않는다.

## 중앙 너비 패턴과 사이드바 골격 공통화 (2026-10-20)

`src/shared/components`의 레이아웃 조사 후 중앙 콘텐츠 너비와 사이드바 2열 골격을 공통화했다. 기능 화면의 소스와 기존 공개 레이아웃 props는 변경하지 않았다.

- `panda.config.ts`의 `contentFrame` 패턴은 WEB 너비 `min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))`만 기본으로 제공한다. `mobileWidth`는 `_mobile.w`로 변환한다. MainSection의 contained 본문·MainSectionHeader·HeroCopy가 기존 요소에 생성 클래스를 적용하며 새 DOM 래퍼를 추가하지 않는다. 중앙 정렬 margin과 절대 위치는 소비자가 소유한다.
- 모바일 너비는 MainSection 본문 100%, 제목은 양쪽 16px 제외, HeroCopy는 양쪽 16px 제외 및 343px 상한으로 유지한다. MainSection의 fullBleed/extended 모드와 `100cqw` 기반 확장 너비·offset, HomeCarouselRail 카드 계산은 기존 소유자에 남긴다. 부모가 이미 gutter를 소유하는 SiteHeaderInner/FooterContent에는 패턴을 중복 적용하지 않는다.
- `layouts/SidebarColumns`는 `sidebar` 슬롯과 직접 `children`, 필수 `sidebarWidth`(180px/190px), `gap`(기본 50px), 기존 Grid 스타일 props를 받는다. WEB의 두 열과 모바일 block 전환을 소유한다. 본문 래퍼나 landmark를 자동 추가하지 않는다.
- SidebarNavigationLayout은 기존 `main`을 `SidebarColumns as="main"`으로 대체하고 180px/50px을 유지한다. CustomerCenterLayout은 내부 Grid만 교체하고 190px/98px을 지정한다. Breadcrumb·제목·바깥 프레임·페이지 여백·메뉴 표시 정책과 본문의 `minW="0"`은 각 소비자가 유지한다. 마이페이지의 `mobileSpacing="none"`은 그대로 무여백을 적용한다.

검증 (2026-10-20, Codex): Panda 생성, 전체 타입 검사, 변경 TS/TSX ESLint, Next production build와 Storybook production build를 통과했다. Storybook 첫 빌드는 정적 파일 복사 중 EEXIST로 실패했으며 새 출력 디렉터리에서 재실행해 통과했다. 브라우저에서 고객센터 PC의 190px/98px, 실제 쿠폰 페이지 PC의 180px/50px 및 본문 min-width 0·중첩 main 없음, 고객센터/쿠폰 모바일의 block 전환·메뉴 숨김과 쿠폰의 padding 0을 확인했다. 홈 2560px에서 제목 프레임 1532px과 Hero/제목의 왼쪽 정렬, 모바일의 제목 좌우 여백을 확인했다. 변경 전후 스크린샷 비교나 전체 Storybook play 실행은 하지 않았다.

## ContentSection 하단 액션 슬롯 (2026-10-20)

ContentSection.footer는 선택적 ReactNode로 헤더·직접 children 뒤에 렌더링된다. 자동 div/HTML footer나 빈 본문을 추가하지 않으며 children은 생략할 수 있다. 같은 Stack gap을 사용하므로 버튼 그룹은 기존 HStack/Grid로 전달하고 서로 다른 간격·form 소유권을 숨기지 않는다. CustomerCenterLayout의 footer를 내부 섹션으로 전달해 목록/상세의 하단 액션을 연결했다.

공용 2파일·소비처 15파일에 적용했다. 우선 4곳과 조건부 8개 구성 경계의 결과, 폼/간격/Grid/제목 없는 목록으로 인해 현재 구성을 유지한 9개 경계 및 모달/카드/고정 바 유지 근거는 [footer 적용 조사와 구현](footer-actions.md)을 참고한다. 스킬의 관련 참조도 갱신했다. 기존 버튼의 링크·콜백·표시 조건·폼 제출 동작은 각 소유자가 관리한다.

## 모바일 상품 필터 시트 너비와 여백 (2026-10-20)

BottomSheet는 포털에 `platform-${platform}` 클래스를 전달해 본문 밖에서도 모바일 조건과 토큰을 유지한다. 상품 필터의 하단 패딩은 PC용 256px 대신 모바일 16px을 적용한다. Popup은 `100%` 너비로 고정 viewport의 가용 너비를 채운다. 내부 Stack은 gap 0, 스크롤 본문은 min-height 0으로 헤더·푸터 사이에서 축소된다. 위 두 BottomSheet 파일이 작업 트리 출처다.

검증: Panda 생성과 변경 파일 ESLint를 통과했다. Storybook 모바일 상품 목록에서 너비·하단 패딩·적용/닫기/Escape를 확인했다. 최초 전체 타입 검사는 ProductCard.stories.tsx의 `new` 프로모션 타입 오류로 실패했다. 해당 값을 `New`로 수정한 뒤 커밋 전 재검증에서 전체 타입 검사와 BottomSheet 두 파일 ESLint를 통과했다.

## ContentSection 기본 헤더와 전체 적용 (2026-10-20)

일반 제목은 단독일 때도 ContentHeader를 사용한다. 본문 그룹이 이어지면 ContentSection의 title과 headerProps를 전달해 내부 기본 ContentHeader를 사용하며, 같은 제목을 header={<Typography ...>}나 header={<ContentHeader ...>}로 반복 작성하지 않는다. title/headerProps 방식과 custom header 방식은 타입의 대안 분기로 구분한다. headerProps가 제목 레벨·Typography·설명·보조 문구·헤더 내부 간격을, ContentSection gap이 본문 그룹 간격을 소유한다. action·Divider·계정용 기존 어댑터 등 구조가 다른 경우에만 header 노드를 전달한다.

ContentHeader의 titleAs는 실제 상품 A/S 소비처를 위해 h1~h6으로 확장했다. 의미별 제목 레벨·ID·Typography·PC/MO 크기와 기존 상태/이벤트를 보존했다. 계정·가입·로그인·쿠폰·마이페이지·결제·검색·상품·런클럽·고객센터의 UI 소스 65파일과 공용 컴포넌트 2파일에 적용하고 공용 API 스토리 2개를 추가했다. 단순 동일 gap 본문 Stack은 제거하되 다른 간격·목록·Grid·form·포털 구조는 유지했다. 후속 요청에 따라 AccountFormLayout·CustomerCenterLayout·OrderPageLayout의 무스타일 본문 div를 제거했다. children은 직접 렌더링하므로 Fragment의 최상위 요소도 ContentSection의 flex/gap에 참여한다. 본문 전체를 묶어야 할 때만 소비처에서 의미 있는 그룹을 제공한다.

CustomerCenterLayout은 title/description에 ContentHeader를 사용하고 선택 Divider는 기존 헤더 그룹이 소유한다. headingProps의 mb/모바일 덮어쓰기는 기존 그룹에 유지하고 바깥 ContentSection gap=0으로 연결한다. runtime headingProps를 다른 속성으로 재해석해 기존 cascade를 바꾸지 않는다. SupportPage의 headingProps는 css.raw로 추출해 기존 mb=10 스타일이 다른 소비처의 잔여 클래스에 의존하지 않도록 했다. RunClubHeader의 headerProps.css도 css.raw로 모바일 좌측 정렬을 추출한다. MainContentCard는 card__header와 header 태그를 유지하고 header.raw(variant)를 css prop에서 기본 스타일과 병합한다. Grid·overlay·runtime foreground·Card.Footer는 유지한다.

적용 후보와 이전 조사 기록, 최종 검증 범위는 [전체 조사와 이관 기록](content-sections.md)을 참고한다. component-reusability의 [제목/본문 지침](../../.codex/skills/component-reusability/references/content-sections.md)에 기본 title API·예외 header 슬롯·간격 소유권 기준을 추가했다.

## 쿠폰과 휴대폰 인증의 팝업 구성 분리 (2026-10-20)

CouponRegistrationDialog는 open/onOpenChange로 등록 완료 안내와 확인 버튼을 표시한다. CouponDetailsDialog는 CouponItem 또는 null과 onOpenChange를 받아 선택 쿠폰의 이름·혜택·조건·만료일을 표시한다. CouponManager가 등록 결과와 선택 쿠폰을 계속 소유하며 상세 닫기에서 선택값을 null로 초기화한다. 기존 ModalDialog·Stack·Typography·Button의 DOM과 문구·간격·sm 크기를 유지한다.

PhoneVerificationDialogs는 detail/onDetail을 받아 알뜰폰 사업자일 때 기존 PhoneVerificationDetailDialog를, 그 외에는 기존 빈 본문 안내 ModalDialog를 표시한다. md 크기·모바일 fullscreen·안내 닫기 이름과 닫을 때 onDetail(null) 호출을 유지한다. PhoneVerificationContent는 AccountFormLayout의 dialogs 슬롯에 이 구성을 전달한다. 새 상태나 client 경계는 추가하지 않았다.

타입 검사와 변경 TSX ESLint/Prettier를 통과했다. 이 분리에 대한 추가 브라우저 검증은 수행하지 않았다.

## 제목 그룹과 본문 간격의 공통 구성 (2026-10-20)

ContentHeader는 Stack에 eyebrow(p)·제목(h1/h2/h3)·선택 설명(p)을 순서대로 배치한다. titleAs와 각 Typography props로 기존 PC/MO 크기·색상·ID를 유지하고, 기본 gap은 3이다. AccountFormHeader는 계정 화면의 제목/설명 기본값과 spacingCss를 이 컴포넌트에 위임하는 어댑터다. 기존 SectionHeader는 액션·구분선·별도 타이포그래피 계약을 가진 구성으로 유지한다.

ContentSection은 header 슬롯과 children을 Stack으로 묶어 헤더와 각 본문 그룹 사이의 공통 간격을 소유한다. 같은 간격을 반복하는 본문 Stack은 제거하고 필터·목록·조건부 더보기 버튼을 직접 자식으로 배치한다. 기본 gap은 6이며 소비처가 명시적으로 바꿀 수 있다. 쿠폰 내역은 기존 section·aria-label과 헤더/필터/목록 구조, 헤더 내부 12px·본문 전 24px를 유지한다. SignupLayout은 JOIN HOKA→회원가입 제목의 8px와 진행 단계 전 28px를 각각 ContentHeader gap=2와 ContentSection gap=7로 옮긴다. SignupProgress의 기존 하단 34px와 step=0의 헤더/진행 단계 생략은 유지한다. 라우팅·가입 상태·쿠폰 필터/등록/팝업 상태는 기존 부모에 남긴다.

타입·변경 ESLint/Prettier·Panda 생성·Storybook 빌드를 통과했다. 변경 전후 1600px/375px의 회원가입과 쿠폰 내역 4쌍에서 주요 제목/설명·진행 단계/필터·입력 위치·크기·글꼴을 0.1px 단위로 비교했다. 쿠폰의 짧은 코드 오류→유효 코드 등록→완료 모달 닫기를 두 너비에서 확인했다. 브라우저 비교 대상은 이 두 영역이며 전체 계정 화면의 추가 회귀 검증을 의미하지 않는다.

## 미확정 회원등급·마일리지 화면 (2026-10-20)

SupportExperiencePage는 회원등급과 마일리지 경로별 제목·breadcrumb·활성 메뉴를 pageDetails로 지정하고 공통 CustomerCenterLayout을 사용한다. 디자인이 확정되지 않은 정책 탭·유의사항 대신 본문에 “디자인 작업 중입니다.” 안내만 표시한다. 기존 라우트와 고객센터 탐색은 유지한다.

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

추천 검색어는 Button의 `chip` variant를 사용하는 검색 이동 버튼이다. 칩은 size 옵션이 없으며 높이 36px, 패딩 9px 14px, body4 14px medium을 사용한다. 키워드별 onSearch 동작은 상위가 소유한다.

검증: Panda 생성·전체 TypeScript·변경 TSX ESLint/Prettier와 Next/Storybook production build 통과. 브라우저에서 PC input 입력·자동완성 및 Enter의 실제 검색 결과 이동, 375px 모바일 자동완성 배치와 빈 검색 오류를 확인했다. 장바구니 기준 정렬 수정은 브라우저에서 기본 1020px·자동완성 540px 패널과 장바구니 영역의 오른쪽 좌표 차이 0px로 확인했으며 Panda·타입·변경 ESLint/Prettier를 확인했다. Storybook에는 PC/모바일 기본·자동완성·오류 6개 상태를 제공한다. 출처는 아래 working_tree_sources의 검색·헤더 구현과 스토리이며 첨부 시안은 사용자 제공 디자인이다.

## plain 버튼 내부 정렬과 자동완성 검색어 (2026-10-21)

공통 Button의 `plain`은 내부 내용을 왼쪽 정렬해 호출자가 별도 정렬 스타일을 넣지 않아도 된다. SearchOverlay의 자동완성은 이 `plain` variant를 사용한다. `ul`/`li` 구조, 검색 동작, 일치 문자열의 파란 `mark` 하이라이트와 body3 medium 타이포그래피를 유지한다. Button과 SearchOverlay 구현은 frontmatter의 작업 트리 출처에 포함한다.

검증: 변경 파일 ESLint·Prettier, 타입 검사, Panda 생성, OKF 검사를 수행한다. 브라우저 시각 검증은 수행하지 않았다.

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

PageActionButton은 최대 500px 중앙 정렬 영역과 fullWidth Button/ButtonLink를 조합한다. children·href 또는 onClick·primary/secondary·short/tall·선택적 current/total counter를 받고, containerProps는 기존 mt/pt/_mobile 차이를 보존한다. 기본값은 secondary/short와 상단 padding 36px이다. SupportPage의 FAQs 링크는 기존 tall·margin·모바일 maxW none을, InquiryPage는 primary/short를, FAQ/공지 더보기는 short·모바일 상단 24px와 기존 페이지 계산/표시 조건을 유지한다. LoadMoreButton의 남은 항목 수 API는 유지하며 페이지 카운터도 지원한다. 아래 더보기 버튼 공통화 기록을 참고한다.

## 더보기 버튼 공통화 (2026-10-20)

LoadMoreButton은 기존 `remaining` 남은 항목 수·화살표 표기를 유지하고 상호 배타적인 `counter: { current, total }` 페이지 표기를 지원한다. labelProps/counterProps는 기존 Typography의 PC/MO variant와 라벨 weight를 보존한다. LoadMoreButtonContent는 버튼과 링크의 표시를 공유한다. PageActionButton은 counter가 있는 버튼에 LoadMoreButton을 조합하고 링크에는 공통 content를 사용한다. 너비·상단 간격은 PageActionButton이 소유한다. FAQ·공지는 기존 PageActionButton 호출로 공통 버튼을 사용하고 쿠폰·리뷰는 직접 사용한다. 각 화면의 기존 배치와 리뷰의 mt=24px는 유지한다.

출처: working_tree_sources의 LoadMoreButton·PageActionButton·CouponManager·MyPageReviewLoadMore와 LoadMoreButton 스토리. 스토리는 기존 remaining과 새 PageCounter·MyPageCounter 표시를 제공한다. 검증: 전체 타입 검사, 변경 TSX ESLint/Prettier, Panda 생성과 Storybook production build를 통과했다. 브라우저 계산 스타일과 PC/MO 화면 비교는 수행하지 않았다.

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

병합 후 남은 `src/shared/Mockup/store-finder/StoreFinderPage.tsx` 중복 파일을 제거하고 고객센터 Storybook도 실제 `/support/store`와 같은 feature 페이지를 사용하도록 맞췄다. `store.data.ts` 타입 참조는 정식 `StoreResults` 경로를 사용한다.

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

SingleActionDialog의 확인 버튼은 기본 short이며 명시적인 tall 지정은 계속 지원한다. 계정 안내·주소 검색의 중복 short 설정은 제거했다. TermsDialog도 별도 크기 지정 없이 공통 short/fullWidth 기본값을 사용한다.

검증: Panda 생성·전체 타입 검사·변경 파일 ESLint/Prettier, Edge headless에서 단일 모달 PC/MO·disabled·fullWidth·마케팅 안내와 일반 모달 PC/MO 총 7건의 패딩 및 버튼 크기를 확인했다. 기존 단일 모달과 마케팅 안내의 PC/MO play 4개도 통과했다. production build는 실행하지 않았다.

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

## 밑줄 없는 텍스트 링크 변형 (2026-10-21)

Button의 `link` variant는 밑줄 텍스트 링크, `plain` variant는 밑줄 없는 텍스트 링크다. 두 변형 모두 높이는 콘텐츠에 맞고 패딩은 0이라 별도 여백 없이 사용한다. SearchKeywordButton은 `plain`을 사용한다. ButtonDocs와 Storybook에 두 스타일 예제를 두고 ToggleButton도 두 variant를 전달한다. 출처는 `src/shared/components/atoms/Button/Button.tsx`, `ButtonDocs.tsx`, `ToggleButton.tsx`, `src/stories/components/atoms/Button/Button.stories.tsx`, `src/shared/components/organisms/Search/SearchKeywordButton.tsx`다.

## Button chip 변형과 추천 검색어 (2026-10-21)

Button에 단일 크기 `chip` variant를 추가했다. size 옵션은 없고 높이 36px, 패딩 9px 14px, body4 14px medium을 Button 자체에서 적용한다. 추천 검색어는 선택 상태를 토글하지 않고 검색 결과로 이동하는 버튼으로 이 변형을 사용한다. ButtonDocs·Button Storybook에 chip 예시를 제공한다.

출처는 작업 트리의 `src/shared/components/atoms/Button/Button.tsx`, `ButtonDocs.tsx`, `Button.type-test.tsx`, `ToggleButton.tsx`, `src/stories/components/atoms/Button/Button.stories.tsx`, `src/shared/components/organisms/Search/RecommendedSearches.tsx`다.

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

### 고객센터 사이드 내비게이션 갱신 (2026-10-20)

`SideNavigation`의 `support` 모드는 Figma `1241:78801`을 따른다. 190px 너비에서 28px 제목과 메뉴 사이를 40px 띄우고, 그룹 사이 구분선 없이 20px medium 메뉴를 24px 간격으로 나열한다. 현재 경로의 항목만 검은 글자와 2px 아래 선을 쓰고 나머지는 `#4d4d4d` 색상이다. 메뉴 행은 비활성 42px·활성 44px 높이이며 모바일에서는 기존처럼 숨긴다. `CustomerCenterLayout`은 1200px 외곽과 좌우 34px 패딩을 유지하면서 사이드 열 190px·본문과의 간격 98px로 Figma의 844px 본문 열에 맞춘다. 출처는 작업 트리의 `src/shared/components/organisms/Navigation/SideNavigation/SideNavigation.tsx`, `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`, `src/stories/components/organisms/Navigation/SideNavigation/SideNavigation.stories.tsx`와 Figma 노드 `1241:78795`, `1241:78801`이다. Panda 생성·타입 검사·ESLint·Storybook 빌드와 `/support`, `/support/faq`의 활성 항목 표시를 확인했다.

고객센터 공통 본문 프레임은 데스크톱에서 최대 1200px 폭과 좌우 34px 패딩을 사용한다. 모바일에서는 바깥 페이지의 16px 여백을 그대로 사용한다. 출처는 작업 트리의 `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`다.

`CustomerCenterLayout`은 고객센터 메인과 하위 화면이 공통으로 쓰는 Breadcrumb, 페이지별 제목·설명 영역, 좌측 메뉴, 본문 배치를 소유한다. 페이지마다 breadcrumb 경로와 활성 메뉴를 전달하므로 `/support`와 `/support/faq`는 독립 라우트로 유지된다. `Breadcrumb`은 기존 공통 molecule을 재사용한다. 최신 고객센터 메인 Figma `1322:125606`(웹)·`1368:128720`(모바일)은 설명 아래 고객상담실·온라인 스토어 연락처 카드만 보여준다. `SupportContacts`는 카드를 세로로 배치하고, 각 `SupportContactCard`는 문의 설명·현재 운영 전화번호·운영시간·점심시간을 표시한다. 카드 배경은 `black.10`이며 외곽선을 추가하지 않는다. 웹 카드는 좌우 배치, 모바일 카드는 세로 배치로 전환한다. 기존 공통 Typography의 heading8(웹 22px·모바일 16px)을 쓰고 전화 링크 밑줄은 모바일에서만 보인다. 연락처와 운영시간 묶음 사이 간격은 웹 52px·모바일 32px이다. 공지·FAQ는 메인에서 제거해도 각각 독립 라우트와 기존 페이지 구성을 유지한다. PC·모바일 Customer Center route story는 카드 제목·전화번호·운영시간 및 메인에서 공지/FAQ teaser가 없는 상태를 검사한다. 화면 설명·카드 간격은 Panda JSX props를 사용한다. 출처는 작업 트리의 `src/shared/features/support/SupportPage.tsx`, `SupportContacts.tsx`, `SupportContactCard.tsx`, `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`, `src/stories/features/support/SupportPages.stories.tsx`, `SupportPages.CustomerCenter.Mobile.stories.tsx`와 Figma 노드 `1322:125606`, `1368:128720`이다.
고객센터 메인의 최신 PC·모바일 구성은 설명 아래 연락처 카드 두 개만 표시한다. 공지사항/FAQ 미리보기와 운영시간·전화 아이콘은 이 메인 시안에 없으므로 넣지 않으며, 각 공지·FAQ 페이지는 독립 라우트로 유지한다. 카드 배경은 `black.10`이며 얇은 외곽선을 추가하지 않는다. PC·모바일 Customer Center route story는 카드 정보와 메인에서 공지/FAQ가 빠진 상태를 검사한다.

## FAQ (2026-10-16)

FAQ 카테고리 선택은 공통 `FilterTabs`의 `line` 변형을 사용한다. PC는 Figma 노드 `1056:42189`의 24px 탭 간격·CTA1 글자·선택 항목 2px 밑줄을 따르고, 모바일은 가로 스크롤과 CTA2 글자·하단 경계선을 유지한다. `FaqControls`는 카테고리 데이터와 선택 변경만 전달하며 탭 CSS를 소유하지 않는다. 출처는 작업 트리의 `src/shared/components/atoms/FilterTabs/FilterTabs.tsx`, `src/shared/components/molecules/Faq/FaqControls.tsx`, `src/stories/components/atoms/FilterTabs/FilterTabs.stories.tsx`와 Figma 노드 `1056:42189`다.

`SearchField` 안의 `TextInput`은 포커스 시 별도 outline을 표시하지 않고 검색창의 기존 테두리만 유지한다. 출처는 작업 트리의 `src/shared/components/molecules/SearchField/SearchField.tsx`다.

FAQ 검색 영역은 공통 molecule `SearchField`를 사용한다. 입력값과 검색 동작을 호출자가 전달하며, 검색창은 데스크톱에서 돋보기를 오른쪽에, 모바일에서 왼쪽에 배치한다. `FaqControls`는 검색창 최대 폭 590px과 주변 간격만 소유한다. 출처는 작업 트리의 `src/shared/components/molecules/SearchField/SearchField.tsx`, `src/shared/components/molecules/Faq/FaqControls.tsx`, `src/stories/components/molecules/SearchField/SearchField.stories.tsx`다.

`FaqList`의 섹션 상단선과 답변 배경·패딩·줄바꿈·문단 여백은 Panda Box 속성으로 표현한다. Accordion이 클래스만 받는 항목 경계선·질문 버튼 상태·아이콘 크기만 컴포넌트 내부 CSS에 남긴다. 출처는 작업 트리의 `src/shared/components/organisms/Faq/FaqList.tsx`다.

`FaqPage`는 별도 URL을 유지하면서 `CustomerCenterLayout`의 공통 breadcrumb·페이지 제목·사이드 메뉴를 사용한다. PC에서는 첫 질문을 열고 모바일에서는 닫아 둔다. 검색은 질문과 답변을 함께 필터링하고 카테고리 탭은 Figma의 8개 항목을 사용한다. 처음 10개를 표시하며 답변과 검색 데이터는 화면 시안용 정적 데이터다. 고객센터 메인에는 FAQ teaser를 표시하지 않는다. 간격·패딩·정렬은 Panda JSX props, 검색 필드·밑줄 탭·아코디언 경계처럼 세부 시각 규칙은 컴포넌트의 Panda CSS로 표현한다. 출처는 작업 트리의 `src/shared/features/faq/FaqPage.tsx`, `src/shared/features/faq/faq.data.ts`, `src/shared/components/molecules/Faq/FaqControls.tsx`, `src/shared/components/organisms/Faq/FaqList.tsx`, `src/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout.tsx`와 Figma 노드 `991:23024`, `991:23094`, `999:5639`이다.

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
| signup                | 반영           | 기능 내부 `SignupLayout({ step, method, children })`가 가입 방법 화면과 Mockup 단계의 레이아웃을 소유. 실제 `/signup`은 방법 선택만 표시하고 이메일은 `/signup/verify`로 이동, 카카오·네이버는 연결되지 않음을 안내한다. 이전 약관·정보 입력·가입 완료 화면은 `src/shared/Mockup/signup`과 Mockup Storybook에 보존한다.  |
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
- 회원정보의 마케팅 정보 수신 동의 요약은 모바일 `heading7` 제목과 `body4` 세 행으로 구성한다. 제목·행 목록은 24px, 행끼리는 16px을 띄우고 각 행의 상태를 오른쪽 정렬한다. 편집 상태도 이메일·모바일 쿠폰북·문자/카카오톡 전송매체 세 행으로 표시하며, 각 행은 왼쪽 항목명과 오른쪽 `수신`/`수신안함` 라디오를 가로 배치한다. 문자와 카카오톡은 하나의 선택값을 공유한다. 근거: [Figma 수신 동의 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=789-24649&m=dev), 제공된 편집 상태 캡처 및 `src/shared/features/mypage/MyPageProfile.tsx` 확인(2026-10-20).
- 회원정보의 섹션 사이 1px 경계선은 `borderTop` 대신 Panda `Divider`(`orientation="horizontal"`, `bg="black.20"`)로 표시한다. 선 뒤 16·24·20px 간격은 각각 바깥 `Stack`의 `gap`으로 유지한다. 근거: `src/shared/features/mypage/MyPageProfile.tsx` 작업 트리 확인(2026-10-15).
- 회원정보 하단 보기 상태는 마케팅 동의 요약, 결혼유무, 안내문과 `회원정보 수정` 버튼으로 구성한다. 편집 상태는 마케팅 동의 편집 뒤 구분선, `부가정보`의 결혼유무 라디오, 48px 취소·변경사항 저장 버튼과 회원탈퇴 안내/링크 순서로 배치한다. 라디오에서 버튼까지 24px, 저장 버튼에서 탈퇴 안내까지 40px을 두며 보기/편집의 결혼유무 값은 같은 상태를 사용한다. 근거: [Figma 회원정보 수정 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=789-25505&m=dev), 제공된 보기/수정 캡처 및 `src/shared/features/mypage/MyPageProfile.tsx` 확인(2026-10-20).
- `MyPageReviews`의 작성 완료 목록은 읽기 전용 `RatingStars`를 본문 위에 표시한다. 초기 데모 리뷰는 4.5점으로 보여주고, 작성·수정 후에는 화면 내부 상태에 저장한 별점과 본문을 표시한다. 입력용 `RatingInput`은 모달에서 그대로 사용한다. 근거: `src/shared/features/mypage/MyPageReviews.tsx`와 `src/shared/components/atoms/RatingStars/RatingStars.tsx` 작업 트리 확인(2026-10-15).
- 이 여덟 화면의 타이포는 Figma의 12·14·16·20·22px 역할을 기존 Typography variant로 표현한다. 날짜·숫자는 영문 서체, 뒤따르는 한국어 단위·라벨은 한국어 서체를 각 Typography에 명시해 한 줄에서도 언어별 굵기와 자간을 유지한다. 여백과 정렬은 Box·Stack·HStack이 담당한다.
- `MyPageRewards`는 모바일 Figma 화면에서 결정한 Typography 값을 `mo`에 지정한다. `variant`로 두 플랫폼에 동일한 값을 적용하지 않는다. 영문·숫자만 있는 콘텐츠는 기본 `language="auto"`가 영문 변형을 고르므로 `language="en"`을 반복하지 않는다. 근거: `src/shared/features/mypage/MyPageRewards.tsx`와 Typography의 언어 변형 결정 로직 작업 트리 확인(2026-10-15).
- `MyPageRewards`의 등급 카드에서 `--tier-color`는 카드 배경과 검은 원 안 이니셜 글자색에 함께 적용한다. ELITE·ADVANCED·RUNNER는 각각 Figma color foundation의 `blue.100`·`citrus.100`·`offWhite.100` 토큰을 변수에 연결한다. 근거: `src/shared/features/mypage/MyPageRewards.tsx`, `panda.config.ts` 및 생성 CSS 확인(2026-10-15).
- 등급 혜택과 회원 공통 혜택의 순번은 `ol`의 CSS 마커 대신 `map`의 인덱스를 `Typography`로 출력한다. 주항목과 순번은 모바일 `body4`(14px), 보조 설명은 `body5`(12px)를 쓰며 설명 불릿도 텍스트로 표시한다. 목록의 의미 구조는 `ol`·`li`로 유지한다. 근거: `src/shared/features/mypage/MyPageRewards.tsx` 작업 트리 확인(2026-10-15).
- 등급 혜택 상세와 문의 등록 유의사항의 불릿은 `li`의 `HStack` 안에서 `・` 기호와 본문 `Typography`를 별도 요소로 둔다. 긴 설명이 다음 줄로 넘어가도 본문 시작선에 정렬되며, 두 목록은 각각 기존 모바일 `body5` 및 웹 `body4`·모바일 `body5` 값을 유지한다. 근거: `src/shared/features/mypage/MyPageRewards.tsx`, `src/shared/features/support/InquiryCautions.tsx` 작업 트리와 사용자 지정 모범 사례 확인(2026-10-19).
- 회원 공통 혜택은 Figma 노드 `714:22146`의 343px 폭·1px 외곽선·가로 16px/세로 24px 안쪽 여백을 따른다. 제목은 모바일 `heading6`(20px), 네 묶음 제목은 `heading7`(16px), 번호 문장은 `body4`(14px), 쿠폰 조건은 `body5`(12px)와 원형 불릿으로 구분한다. 제목과 목록·묶음 간격은 20px, 묶음 제목과 항목 간격은 12px, 번호 항목 간격은 8px다. 근거: [Figma 공통 혜택 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=714-22146&m=dev) 화면·세부 속성 및 `src/shared/features/mypage/MyPageRewards.tsx` 작업 트리 확인(2026-10-15).
- 쿠폰 목록의 탭과 결과 목록·결과 목록과 더보기 버튼은 각각 24px 간격을 둔다. 총 개수와 첫 카드 사이 8px, 카드끼리는 16px이다. 카드 안은 제목과 금액 사이 24px, 금액과 조건 사이 12px, 조건과 사용 기간 사이 4px을 둔다. 근거: [Figma 쿠폰 목록 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=753-18722&m=dev) 및 `src/shared/components/organisms/MyPage/CouponManager.tsx` 작업 트리 확인(2026-10-15).
- `EmployeeCoupons`는 쿠폰 등록과 쿠폰 내역 사이에 50%·30% 발급 안내 두 건을 나란히 표시한다. 각 항목은 `black.10` 배경, 16px 안쪽 여백, 8px 간격과 18px Font Awesome Regular `faCircleCheck` 아이콘을 사용한다. 펼침 상태나 추가 쿠폰 목록은 두지 않는다. 근거: [Figma 임직원 쿠폰 노드](https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=764-19062&m=dev), `src/shared/components/organisms/MyPage/EmployeeCoupons.tsx` 작업 트리 확인(2026-10-20).
- `SegmentedControl variant="underline"`는 리뷰·쿠폰의 동일한 전체 폭 밑줄 탭 표현을 소유한다. 옵션 수에 관계없이 버튼을 균등하게 배치하고 선택 항목에 검은 하단선을 표시한다. 기존 기본 버튼형과 `unstyled` 확장 API는 유지한다.

`styled-system/`과 `src/shared/styles/panda.css`는 생성 결과이며 Git에서 제외한다. 생성 CSS를 직접 수정하지 않고 TSX나 Panda 설정을 바꾼 뒤 `npm run panda`를 실행한다.

## 마이페이지 지정 범위 재사용 점검 (2026-10-15)

범위는 `features/mypage`, `organisms/MyPage`, `atoms/SegmentedControl`이다. Typography·토큰·관련 스토리는 타입 스케일 이전과 검증을 위해 확인했다. 기능 전용 구성은 기존 소유 폴더 안에 두며 공용 계층으로 승격하지 않았다.

| 관찰한 책임                                              | 반영한 API와 소유자                                                                                 | 보존 계약                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 러닝 프로필 페이지가 답변 상태와 화면 스타일을 함께 소유 | 기능 내부 `RunningProfileContent({ questions, answers, answeredCount, completed, onAnswerChange })` | 상태·완료 계산은 `RunningProfilePage` 소유. header → 진행률 → 질문 → footer 순서, 진행률 여백 32px/50px, 질문 간격 42px, 모바일 sticky bottom 0·좌우 -16px·상단 30px·패딩 14px/16px 유지. `Box`·`Grid`는 기존 div를 그대로 렌더링                                                                                                |
| 쿠폰 목록의 article 표시와 필터·등록·상세 상태 혼재      | organism 내부 `CouponCard({ coupon, onDetails })`                                                   | article/h3, 패딩 16px/24px, 카드 내부 24px/12px/4px 간격, 상세보기 콜백 유지. 카테고리 변경 시 5개로 초기화, 등록·모달 상태는 Manager 소유. 기존 `CouponManager`의 `CouponItem` 타입 import 경로는 re-export로 유지                                                                                                              |
| 밑줄형 선택 버튼의 직접 타입 선언                        | `Typography as="button" variant="selectionLabel"`를 Toggle의 render로 사용                          | 버튼 DOM을 추가하지 않고 Base UI 이벤트·ref·선택 속성을 전달. 한국어 글꼴, PC/모바일 16px·500·행간 1.3·자간 normal. `--type-selection-label-{font-size,mobile-font-size,font-weight,line-height,letter-spacing}` 토큰 계약. 기존 `ctaKr1`은 600·음수 자간이므로 대체하지 않음. 기본형·unstyled·옵션 비활성·빈 문자열 인코딩 유지 |

`EmployeeCoupons`는 Figma 업데이트에 따라 기존 5개 칩과 펼침·접힘 인터랙션을 제거하고 50%·30% 쿠폰 발급 안내 두 건으로 단순화했다. 두 항목은 균등 너비로 나란히 표시하며 체크 아이콘을 포함한다.

### Base UI와 유지 판단

설치된 `@base-ui/react` 1.8.0 전체 exports를 [공식 카탈로그](https://base-ui.com/react/overview/quick-start)와 대조했다. Accordion, Alert Dialog, Autocomplete, Avatar, Button, Checkbox/Group, Collapsible, Combobox, Context Menu, Dialog, Drawer, Field/Fieldset/Form/Input, Menu/Menubar, Meter, Navigation Menu, Number Field, OTP Field, Popover, Preview Card, Progress, Radio/Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle/Group, Toolbar, Tooltip 모두 설치 버전에 있다. 이번 범위에는 업그레이드가 필요한 후보가 없다.

- **keep — Toggle Group/Toggle**: 쿠폰·리뷰는 목록 필터이며 독립 탭 패널을 연결하지 않는다. 공용 SegmentedControl의 controlled 선택과 roving focus를 유지한다. 설치 버전 지원, 업그레이드 불필요.
- **keep — Dialog, Checkbox, Radio Group, Progress**: 상세·수정 모달, 기본 배송지, 수신 동의, 진행률은 기존 wrapper가 담당한다. 기능에서 primitive를 직접 재구현하지 않는다. 모두 설치 버전 지원, 업그레이드 불필요.
- **keep — 네이티브 select/input/form 및 confirm**: 기존 정렬·입력·필수 검증·리뷰 취소 의미를 유지한다. Select, Input, Form, Alert Dialog는 설치 버전에서 지원하지만 네이티브 동작을 교체할 추가 요구가 없다. 업그레이드 불필요.
- **keep — EmployeeCoupons**: 최신 Figma에서 두 개의 고정 안내 항목만 표시하므로 접힘·펼침 primitive가 필요하지 않다. 50%·30% 항목의 균등 배치와 아이콘을 유지한다.
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

## SUPPORT Storybook 탐색 구조 (2026-10-22)

고객센터 스토리는 `PAGES/고객센터/번호. 이름/WEB` 또는 `/Mobile`에 등록한다. 폴더는 0. 고객센터 메인, 1. FAQs, 2. 공지사항, 3. 1:1문의, 4. 매장 찾기, 5. 온라인 회원 등급 안내, 6. 사이즈 가이드, 7. 배송 및 반품안내, 8. 세탁 및 손질 방법 안내, 9. 약관 순서이며, `.storybook/preview.ts`의 `storySort.order`가 각 폴더와 WEB → Mobile 순서를 고정한다.

공지사항 Mobile에는 목록 Default와 상세를, 1:1문의의 각 플랫폼에는 기존 목록·상태와 문의 작성을 함께 둔다. 모바일 첨부파일 미리보기도 유지한다. 온라인 회원 등급 안내의 WEB·Mobile에는 회원 안내 Default와 마일리지를 함께 두며, Mobile 회원 안내는 기존 SupportExperiencePage를 재사용한다. 별도 NoticeDetail·InquiryNew·Mileage 스토리 등록 파일은 통합되어 제거했다. 앱 화면과 기능, 기존 play·viewport·navigation 경로는 유지한다. 상위 폴더 이름은 SUPPORT에서 고객센터로 변경했다. 제목 변경으로 Storybook ID와 링크는 변경된다.

출처는 작업 트리의 `.storybook/preview.ts`와 `src/stories/features/support/`이다. 2026-10-22 Codex가 타입 검사와 Storybook production build, 빌드 인덱스의 10개 폴더·20개 플랫폼 그룹·30개 스토리 등록을 확인했다. 브라우저에서 10개 폴더의 번호순·WEB → Mobile 순서와 공지 상세, WEB·Mobile 문의 작성, WEB·Mobile 마일리지 및 새 회원 안내 Mobile 렌더링을 확인했다. 회원 안내·마일리지 본문은 기존의 디자인 작업 중 상태를 유지한다.

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

AccountFormHeader는 제목과 선택 설명을 공용 ContentHeader에 위임하며 내부 Stack 배치를 유지한다. title·titleId·description·descriptionTone과 호출부의 간격 객체 spacingCss를 받는다. 제목은 Typography as="h1" web="heading7" mo="heading5", 설명은 p/body3·기본 tertiary, 제목→설명 기본 간격은 gap="3"(12px)이다. spacingCss는 호출부의 css.raw 값을 Stack의 css prop으로 전달해 기본 스타일 뒤에 병합한다. 기존 div·세로 flex와 호출부의 gap/반응형 여백 덮어쓰기를 유지하며 중복 display/flexDirection 선언을 제거했다. 상태나 추가 client 경계는 만들지 않는다.

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

## 공통 Breadcrumb (2026-10-20)

`Breadcrumb`는 Figma `1241:78730`의 모바일 고객센터 경로를 기준으로 24px 높이 행, 항목 간 4px, 구분 아이콘과 다음 글자 간 8px을 Panda HStack props로 표현한다. 구분 아이콘은 공통 `chevron-right`를 13px로 표시하고 `#777`을 적용한다. 글자는 공통 body4(14px), 마지막 항목은 tertiary 색을 사용한다. 링크 hover와 `aria-current`는 유지하며 고객센터 조합을 Storybook에 추가했다. 출처는 `src/shared/components/molecules/Breadcrumb/Breadcrumb.tsx`, `src/stories/components/molecules/Breadcrumb/Breadcrumb.stories.tsx`, Figma `1241:78730`이다.

검증: 변경 TSX ESLint·Prettier, Panda 생성, Storybook 빌드 통과. 전체 TypeScript 검사는 기존 `.next/types/app/`의 다른 페이지 props 오류로 실패했으며 Breadcrumb 관련 오류는 보고되지 않았다.

## Icon 색상 토큰

`Icon.color`는 `currentColor`, CSS 색상값과 Panda 색상 토큰 경로를 받는다. `FontAwesomeIcon`과 mask 방식 SVG는 토큰 경로를 생성된 CSS 변수로 바꿔 적용한다. 색을 보존해야 하는 등록 이미지 아이콘과 일반 `src` 이미지는 원본 색을 유지한다. 호출부는 기본 색상 별칭 대신 `black.100`·`white.0` 같은 디자인 토큰을 직접 전달한다. 출처는 `src/shared/components/atoms/Icon/Icon.tsx`, `src/shared/icons/iconAssets.ts`, `panda.config.ts`다.

## Font Awesome 아이콘 스토리 카탈로그

Font Awesome 아이콘 카탈로그는 `triangle-exclamation`, Regular `circle-check`(`faCircleCheck`), `xmark`(`faXmark`)를 포함한다. 아이콘은 공유 barrel에서 export하고 `Atoms/Icon`의 FontAwesome 스토리에 표시한다. 출처는 `src/shared/icons/fontAwesome.ts`, `src/stories/components/atoms/Icon/Icon.stories.tsx`다.

## 최근 검색 Timer 아이콘 (2026-10-20)

최근 검색 기록은 Figma `901:31346`의 `Timer` 벡터를 `public/images/icon/timer.svg`로 저장하고 공통 `Icon` 이름 `timer`로 등록한다. `RecentSearchItem`은 이를 16px로 표시하며 Icon의 전체 SVG 스토리 카탈로그에 포함한다. 출처는 위 Figma 노드와 `src/shared/icons/iconAssets.ts`, `src/shared/components/organisms/Search/RecentSearchItem.tsx`, `src/stories/components/atoms/Icon/Icon.stories.tsx`다.

`RecentSearchItem`은 `Flex as="li"`의 JSX props로 기존 수평 정렬과 8px 간격을 표현한다. IconButton은 Panda JSX 스타일 props를 받지 않으므로 모바일에서 삭제 버튼을 오른쪽으로 미는 `ml: auto`는 기존 Panda `css` class로 유지한다. 검색·삭제 콜백과 목록 항목의 HTML 의미는 그대로 둔다.

## Typography formLabel 스케일 (2026-10-20)

`Typography`의 `formLabel` variant는 폼 라벨에 쓰는 body4 타이포그래피를 사용한다. 라디오·체크박스 전용 표현이 아니라 라벨 문구에 공통으로 적용하는 시각 스타일이며, 그룹 제목의 의미 구조는 소비처에서 별도로 제공한다. 출처는 `src/shared/components/atoms/Typography/Typography.tsx`다.

## 최근 검색어 전체 삭제의 링크형 버튼 (2026-10-19)

RecentSearches의 전체 삭제는 경로 이동이 아닌 onClear 동작이므로 Button variant="link" size="md"로 표시한다. 기본 텍스트 스타일을 재사용해 로컬 button CSS와 중복 Typography를 제거했다. 검색어가 있을 때만 표시하며 목록·개별 삭제·외부 props는 유지한다. 기존 body5 라벨은 공통 md 링크 규격으로 전환한다.

검증: 변경 파일 ESLint·Prettier 통과. 기존 SearchOverlay PC/MO 스토리에서 BUTTON 태그, 클릭 후 빈 상태·전체 삭제 버튼 숨김·localStorage 배열 초기화를 확인했다. 출처는 작업 트리의 RecentSearches.tsx와 기존 SearchOverlay.stories.tsx다.

## 최근 검색어 빈 영역 숨김 (2026-10-21)

최근 검색 기록이 없으면 안내 문구와 최근 검색어 섹션을 모두 렌더링하지 않는다. SearchSuggestions는 최근 검색 목록이 있을 때만 섹션을 배치하며, RecentSearches도 빈 목록에 대해 null을 반환한다. PC SearchDialog는 최근 검색어가 있을 때 1024px, 없을 때 544px 너비를 사용하고 기존 우측 정렬을 유지한다. 내부 Flex는 최근 검색어가 있을 때 두 영역을 같은 너비로 나누며, 없을 때 추천/인기 검색 영역이 480px 전체를 채운다. 모바일에서는 전체 화면과 기존 세로 배치·간격·패딩을 유지한다. SearchOverlay Storybook의 EmptyRecentSearches로 빈 상태 패널을 확인한다.

출처는 작업 트리의 `src/shared/components/organisms/Search/RecentSearches.tsx`, `SearchSuggestions.tsx` 및 `src/stories/components/organisms/Search/SearchSuggestions.stories.tsx`다.

## 검색 오류 문구 색상 지정 (2026-10-21)

SearchForm의 검색 오류 안내는 Typography `tone="error"`로 지정해 오류 색상 토큰을 직접 사용한다. 오류가 표시될 때 검색 입력의 빨간 테두리와 안내 문구 색상이 PC·모바일 모두 오류 상태를 나타낸다. SearchOverlay Storybook의 `Invalid`와 `MobileInvalid`가 각각 PC·모바일 예시를 제공한다.

출처는 작업 트리의 `src/shared/components/organisms/Search/SearchForm.tsx`와 `src/stories/components/organisms/Search/SearchOverlay.stories.tsx`다.

## 검색 결과 없음 문구의 PC/MO 시안 반영 (2026-10-21)

SearchListingLayout의 결과 없음 상태를 Figma `906:8115`(PC)와 `773:42681`(모바일)에 맞춘다. 안내 두 문장은 PC에서 Body3 16px, 모바일에서 Body4 14px이며 모두 regular·text secondary(`#4d4d4d`, `subtle`)를 사용한다. 문장 사이에 별도 간격을 두지 않고 연속된 두 줄로 표시한다. PC 표시 영역의 최소 높이는 470px, 모바일은 상하 96px 패딩으로 구성한다. 기존 검색 결과 제목·필터·상품 목록 동작은 이 변경에 포함하지 않는다.

출처는 Figma `906:8115`, `773:42681`과 작업 트리의 `src/shared/features/catalog/product-listing/SearchListingLayout.tsx`다. 시안 값은 해당 노드의 디자인 문맥으로 확인했다.

## 인기 검색어 섹션 분리 (2026-10-21)

SearchSuggestions에서 인기 검색어의 제목·순위 목록·키워드 링크를 `PopularSearches`로 분리했다. 데이터와 검색 이동 처리는 상위가 소유하고, 새 컴포넌트는 `queries`와 `onNavigateSearch`를 받아 섹션 UI만 렌더링한다. 목록 항목은 Panda `HStack as="li"`로 배치하고, 2열 목록의 행/열 간격 12px·24px와 번호 폭 20px, PC/MO 제목 스케일 및 링크 동작을 유지한다. 기존 SearchSuggestions Storybook이 Default/Empty와 모바일 통합 구성을 계속 보여준다.

출처는 작업 트리의 `src/shared/components/organisms/Search/PopularSearches.tsx`, `SearchSuggestions.tsx`, `searchOverlayData.ts` 및 `src/stories/components/organisms/Search/SearchSuggestions.stories.tsx`다.

## 최근 검색어 키워드의 공통 버튼 재사용 (2026-10-20)

SearchKeywordButton은 공통 ButtonLink의 `plain` variant로 `/search?q=…&scope=전체` 주소를 제공하고 Typography body4 문구로 표시한다. 여백 없는 plain 기본 레이아웃을 사용한다. Next Link의 onNavigate에서 검색어 저장과 오버레이 닫기를 처리해 실제 경로 이동은 링크에 맡긴다. 검색 폼·자동완성·추천 검색어 버튼은 기존 검색 콜백으로 이동한다. mouse down 기본 동작 방지로 오버레이 입력 포커스도 유지한다. ButtonLink는 Next Link의 onNavigate를 전달한다.

작업 트리 출처: `src/shared/components/organisms/Search/SearchKeywordButton.tsx`, `SearchOverlay.tsx`, `SearchSuggestions.tsx`, `RecentSearches.tsx`, `src/stories/components/organisms/Search/SearchSuggestions.stories.tsx`, 공통 `Button.tsx`와 SearchOverlay 스토리.

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

## Storybook 페이지 분류와 Mockup 제거 (2026-10-20)

페이지 스토리 179개는 `PAGES/<영역>/<페이지>/Web/<상태>` 또는 `PAGES/<영역>/<페이지>/Mobile/<상태>`로 탐색한다. Web 기본 뷰포트는 1600px, Mobile은 375px이며 기존 개별 스토리의 375·768·1200·1600·1920·2560·3840px 설정을 유지한다. Mobile·Desktop 접두어는 상태 이름에서 제거한다. 고객센터는 Customer Center·Faq·Notices·Inquiries 등 화면별 분류 다음에 플랫폼을 둔다. 기존에 한 플랫폼만 있던 상태를 새로 복제하지 않는다.

각 페이지의 렌더·decorator·args·play 정의는 동일 디렉터리의 `*.scenarios.tsx`에서 공유하고, `*.stories.tsx`는 플랫폼별 meta와 명시적인 상태 export를 제공한다. 스토리 탐색은 계속 `.storybook/main.ts`의 `src/stories/`로 제한한다. IA 구조도의 PC/MO 미리보기 링크는 새 story ID로 연결한다.

`src/shared/Mockup/`의 구현 24개 파일과 `src/stories/features/Mockup/`의 전용 스토리 3개를 제거했다. Mockup을 직접 사용하던 앱 라우트 12개와 MyPageRouteStory의 running-profile 분기도 제거했다. 이 절은 위쪽의 과거 Mockup 이동 기록 이후의 현재 상태를 설명한다.

검증(Codex): 타입 검사, 변경 파일 ESLint·Prettier, Panda 생성, Next·Storybook production build, 앱 라우트 테스트 2개를 통과했다. Storybook index에서 기존 페이지 시나리오 179개의 새 ID와 모든 IA 미리보기 ID가 존재하고 Mockup 분류가 없음을 확인했다. 소스·Storybook 설정에서 Mockup 참조가 남지 않았음을 확인했다. 브라우저 시각 비교와 play 재실행은 수행하지 않았다.

## 상품 복수 프로모션 뱃지 (2026-10-20)

`PromotionBadge`와 `ProductDetails`의 `promotion`은 기존 단일 값과 readonly 배열을 모두 받는다. 배열 순서대로 개별 `Typography`와 세로 `Divider`를 렌더링한다. 2026-10-21부터 `Exclusive` 여부와 관계없이 모든 라벨은 `tone="brand"`, 구분선은 같은 `var(--color-text-brand)` 색상을 적용하며 빈 배열은 렌더링하지 않는다. 상품 카드·상세 헤더·hover 미리보기가 같은 컴포넌트를 사용하며, 신상품순 정렬은 배열 안의 `New`도 인식한다. `Molecules/Product Card`의 `MultiplePromotions` 스토리에서 `Best | Exclusive` 조합을 제공한다.

작업 트리의 위 소스를 기준으로 타입 검사·변경 파일 ESLint와 단일/복수/빈 뱃지의 JSX 결과·색상 prop 및 신상품 정렬을 확인했다. 브라우저 시각 검증은 수행하지 않았다.

### 복수 뱃지 스토리 표시 옵션 수정 (2026-10-20)

`ProductCard`는 `options`에 `promotion`이 있을 때만 상품 뱃지를 전달한다. `MultiplePromotions` 스토리에서 빠진 `options: ['promotion']`을 추가해 복수 값이 실제 카드에 전달되도록 수정했다. 브라우저 연결이 제공되지 않아 화면 검증은 수행하지 못했다.

### 프로모션별 색상과 구분선 (2026-10-20)

사용자 요청에 따라 문자열 결합을 개별 Typography와 Panda Divider로 변경했다. HStack의 gap=1로 간격을 소유하고 세로 구분선은 h=3·border-tertiary 및 aria-hidden을 사용한다. weight와 className은 각각의 Typography에 전달한다. 단일 값에는 구분선을 넣지 않고 빈 배열은 생략한다. 동일한 값이 반복되어도 모두 렌더링한다.

## Storybook 로그인·회원가입 분류 (2026-10-20)

기존 `Pages/AUTH`는 인증 화면을 찾기 위한 상위 카테고리였으며, 로그인과 회원가입이 같은 컴포넌트를 공유한다는 뜻은 아니었다. Storybook에서는 로그인·계정 복구 화면을 `PAGES/Login`, 가입·등록·약관·본인/휴대폰 인증 화면을 `PAGES/Signup`으로 나눴다. 각 페이지의 Web·Mobile 하위 분류와 공통 scenarios 구조는 유지한다. 재사용 컴포넌트와 실제 화면 구현 위치, App Router는 바꾸지 않았다.

IA 미리보기의 story ID도 같은 분류로 연결한다. `/signup`은 가입 방법 선택과 카카오 미연결 안내 시나리오를 제공한다. 운영 흐름에서 제거된 구형 details·terms·필드 검증 시나리오는 제거하고, 이전 가입 단계 세 화면은 incoming 변경대로 `Mockup/Signup`에 보존한다. 앞선 전체 Mockup 제거 기록 이후 이 병합에서 보존한 범위는 signup 세 구현과 전용 스토리 한 파일이다. 출처는 frontmatter의 로그인·회원가입 Storybook 파일과 작업 트리의 SignupPage.scenarios.tsx, SignupPage.mobile.stories.tsx, IaStructurePage.tsx다.

## 계정 잠금 안내 모달의 직접 조합 (2026-10-20)

`AccountLockedContent`는 공통 `ModalDialog`를 직접 사용하고 확인 버튼을 `footer` 슬롯에 둔다. 모달은 `size="md"`를 사용하며 확인 버튼은 공통 푸터 규격(PC 160px 너비·40px 높이, 모바일 전체 너비)을 따른다. 닫기·Escape는 `onClose`, 확인은 `onConfirm`을 호출하며 로그인 및 휴대폰 인증 이동 책임은 Page에 둔다. 제목·설명·모바일 줄바꿈과 접근성 동작을 유지한다. 출처는 작업 트리의 `src/shared/features/account-locked/AccountLockedContent.tsx`, `src/shared/components/molecules/ModalDialog/ModalDialog.tsx`, `src/shared/components/molecules/ModalDialog/ModalDialogFooter.tsx`, `src/shared/components/atoms/Button/Button.tsx`다.

## ModalDialog 본문 패딩 통일 (2026-10-20)

본문에 `content` 한 가지 스타일만 사용한다. PC 패딩은 위·좌우 24px, 아래 16px이며 모바일은 `24px 16px 16px`이다. 기존 `actionCount` API와 단일 액션 전용 스타일을 제거해 footer 액션 수와 본문 간격을 분리했다. `SingleActionDialog`도 동일한 본문 패딩을 사용한다. 출처는 작업 트리의 `src/shared/components/molecules/ModalDialog/ModalDialog.tsx`, `src/shared/components/molecules/SingleActionDialog/SingleActionDialog.tsx`, `src/shared/features/account-locked/AccountLockedContent.tsx`다.

## 충돌 병합 검토 (2026-10-20)

AccountLockedContent는 기존 ContentHeader 조합을 유지하면서 ModalDialog와 footer 확인 버튼 변경을 반영했다. ModalDialog 공통 본문 패딩과 SignupPage의 소셜 가입 미연결 안내는 incoming 변경을 유지한다. Storybook 분류는 로그인/회원가입과 Web/Mobile 두 변경을 함께 반영했으며 양쪽 문서 이력을 보존했다.

검증(Codex, 2026-10-20): 전체 타입 검사, 변경 파일 ESLint·Prettier, Panda 생성, Next.js·Storybook production build와 기존 Node 테스트 53개가 통과했다. 생성된 Storybook index에서 IA 미리보기 48개와 가입 안내·목업 story ID를 확인했고 AUTH 분류가 없음을 확인했다. 브라우저 시각 비교와 Storybook play 실행은 수행하지 않았다.

## 마이페이지·쿠폰·문의·결제 세부 구성 분리 (2026-10-20)

`MyPage`는 화면 골격과 로그아웃 다이얼로그 상태를 소유하고, 프로필 요약(`MyPageOverviewProfile`), 회원등급(`MyPageMembership`), 쿠폰/관심상품 요약(`MyPageBenefits`), 주문 캐러셀(`MyPageRecentOrders`), 주문 항목(`MyPageOrderTile`), 메뉴 그룹(`MyPageMenuSection`)을 별도 파일로 조합한다. 주문 샘플·타입과 메뉴 데이터는 `mypage-home-data.ts`에 두며, 플랫폼 판별은 캐러셀 소비처로 옮겼다. 회원정보 수정 화면인 기존 `MyPageProfile`은 별개 구현이다.

`CouponManager`는 등록 입력·검증·완료/상세 팝업 상태를 유지하고 `CouponRegistrationSection`에 값과 콜백을 전달한다. `CouponHistorySection`은 카테고리와 5개 단위 더보기 상태를 소유하고 상세 선택을 상위로 알린다. `InquiryBoardHeader`는 제목·전체 건수·비밀글 제외 컨트롤을, `InquiryBoardContent`는 공개/본인/접근 제한 및 답변 표시를 담당하며 필터와 펼침 설정은 보드에 남는다. `CheckoutAgreement`는 결제 동의 체크와 오류 표시만 담당하고 제출 검증·동의 상태는 `CheckoutContent`에 유지한다. 오류 문구는 Fragment로 반환해 기존 Stack의 직접 자식 간격을 보존한다.

기존 링크·문구·HTML 구조·Panda 스타일·반응형 값과 이벤트 흐름을 유지했다. 출처는 위 frontmatter의 작업 트리 파일이다. 타입 검사·변경 파일 ESLint/Prettier·Panda 생성·Next.js 프로덕션 빌드를 통과했다. 브라우저 시각/상호작용 검증은 수행하지 않았다.

## ContentHeader 가로형과 마이페이지 링크 스타일 (2026-10-20)

`ContentHeader`는 기본 `orientation="vertical"`을 유지하며 `orientation="horizontal"`에서 제목 그룹과 선택적 `action`을 좌우로 배치한다. 제목만 있으면 추가 DOM 그룹 없이 바로 렌더링하고, eyebrow/description이 있으면 이 텍스트만 내부 Stack으로 묶는다. `gap`은 텍스트 내부 및 액션과의 간격에 사용하며 기존 Stack 레이아웃 props로 반응형 값을 지정할 수 있다. 세로형에서는 기존 제목·설명 구조를 유지하고 action은 그 뒤에 온다.

`MyPageRecentOrders`는 custom header 대신 `title`과 `headerProps.orientation/action`을 사용한다. 제목 h2·PC/MO 타이포그래피·기존 HStack의 8px 간격(gap=2)·전체 보기 링크를 유지한다. ContentHeader Storybook에 가로 제목/액션, 설명 포함, 액션 생략 세 가지 예시를 추가했다. `MyPageMembership`, `MyPageBenefits`, `MyPageMenuSection`의 `styled(Link)`는 모두 제거하고 일반 Next Link에 Panda `css` 클래스를 전달한다. 링크 주소와 스타일 값은 유지한다. 출처는 frontmatter의 해당 작업 트리 소스와 ContentHeader 스토리, content-sections 스킬 참조 문서다.

가로형 변경의 타입 검사·변경 ESLint·Panda 생성·Next/Storybook 프로덕션 빌드를 확인했다. 브라우저 시각/상호작용 및 Storybook play는 실행하지 않았다.

## 마이페이지 메뉴 항목 분리 (2026-10-20)

`MyPageMenuItem`은 label/to를 받아 일반 Next Link와 Panda css로 메뉴 한 행의 제목·화살표·하단 테두리·최소 높이를 렌더링한다. `MyPageMenuSection`은 제목·구분선·gap=0 목록과 항목 매핑만 담당하고 항목 props 타입을 재사용한다. 기존 링크·키·DOM 구조·스타일 값을 유지했다. 출처는 frontmatter의 MyPageMenuItem/MyPageMenuSection 작업 트리 파일이다. 타입 검사·변경 파일 ESLint/Prettier·Panda 생성을 확인했다. 브라우저 검증은 수행하지 않았다.

## ContentHeader 가로형 옵션 (2026-10-20)

`ContentHeader`는 기본 `orientation="vertical"`을 유지하며 `orientation="horizontal"`에서 제목 그룹과 선택적 `action`을 좌우로 배치한다. 제목만 있으면 추가 DOM 그룹 없이 바로 렌더링하고, eyebrow/description이 있으면 이 텍스트만 내부 Stack으로 묶는다. `gap`은 텍스트 내부 및 액션과의 간격에 사용하며 기존 Stack 레이아웃 props로 반응형 값을 지정할 수 있다. 세로형에서는 기존 제목·설명 구조를 유지하고 action은 그 뒤에 온다.

가로 제목/액션·설명 포함·액션 생략 Storybook 예시를 추가했다. 기존 세로형을 유지하며 타입 검사·변경 ESLint/Prettier·Panda 생성·Next/Storybook 프로덕션 빌드를 확인했다. 브라우저 검증과 Storybook play는 실행하지 않았다. 출처는 frontmatter의 ContentHeader 구현과 스토리, content-sections 스킬 참조 문서다.

## 상품 옵션 본문 래퍼 제거 (2026-10-20)

`ProductVariantSection`의 본문 Box를 제거하고 children을 section Stack에 직접 렌더링한다. 제목/보조 액션은 기존 HStack에 유지하며 각 최상위 본문 요소가 부모의 gap=4 간격에 참여한다. 미사용 Box import도 제거했다. 출처는 frontmatter의 ProductVariantSection 작업 트리 파일이다. 타입 검사·ESLint·Prettier를 확인했다. 브라우저 검증은 수행하지 않았다.

## 주문 상태·첨부파일·공지 항목 분리 (2026-10-20)

`OrderStatusLink`는 주문 상태의 label/count/href를 받아 기존 Grid 링크와 마지막 항목 테두리 생략 스타일을 렌더링한다. `OrderStatusTracker`는 5열 반응형 목록과 상태별 주소의 기본값을 소유한다.

`InquiryAttachmentList`는 파일명·삭제 버튼을 기존 ul/li로 표시하고 파일이 없으면 null을 반환한다. 삭제할 인덱스를 상위에 알리며 실제 배열 갱신과 오류 초기화는 `InquiryAttachments`에 남긴다. 숨겨진 input/ref, 선택 후 input 값 초기화, 확장자·5개·파일당 10MB 검증과 오류 표시는 기존 상위가 소유한다. `InquiryAttachmentHelp`는 기존 안내 문구와 inquiry-files-help ID를 유지해 파일찾기 버튼의 aria-describedby 연결을 보존한다.

`SupportNoticeItem`은 title/date를 받아 기존 li 내부 링크·제목 말줄임·time·구분선을 렌더링한다. `SupportNotices`는 데이터와 목록 매핑을 소유하며 링크 주소와 PC/MO 여백·타이포그래피를 유지한다. 모두 추가 DOM 래퍼 없이 일반 Link와 Panda css/JSX를 사용한다. 출처는 frontmatter의 해당 작업 트리 파일이다.

검증: 타입 검사·변경 파일 ESLint/Prettier·Panda 생성·diff 공백 검사를 확인했다. 브라우저 시각/상호작용 검증은 수행하지 않았다.

## 마이페이지 혜택 항목 중복 제거 (2026-10-20)

`MyPageBenefits`의 쿠폰/관심상품 링크는 동일한 구조이므로 `MyPageBenefitItem`에 href·label·count·unit을 전달한다. Grid의 2열/gap=2는 부모가 유지하고 항목은 기존 Link·Stack·HStack·Typography와 Panda css를 그대로 사용한다. 추가 DOM·상태 없이 쿠폰 3개/관심상품 6건, 링크·PC/MO 타이포그래피·여백을 보존한다. 출처는 frontmatter의 MyPageBenefits/MyPageBenefitItem 작업 트리 파일이다. 타입 검사·변경 ESLint/Prettier·Panda 생성을 확인했다. 브라우저 검증은 수행하지 않았다.

## 계정 잠금 단일 확인 다이얼로그 재사용 (2026-10-20)

`AccountLockedContent`의 수동 ModalDialog.footer/Button 조합을 `SingleActionDialog`로 교체했다. 기본 확인 문구·primary/short/fullWidth 버튼이 기존과 동일하므로 onConfirm만 전달한다. size=md·안내 닫기 레이블·닫기/Escape의 onClose·ContentHeader 본문·모바일 줄바꿈과 Page의 라우팅 책임을 유지한다. 앞선 직접 조합/병합 기록은 당시 상태이며 현재는 이 단일 액션 어댑터를 사용한다. 출처는 frontmatter의 AccountLockedContent/SingleActionDialog 작업 트리 파일이다. 타입 검사·변경 ESLint/Prettier를 확인했다. 브라우저 검증은 수행하지 않았다.

## 쿠폰 등록 완료 단일 액션 다이얼로그 (2026-10-20)

`CouponRegistrationDialog`는 `SingleActionDialog`를 사용하고 확인 시 onOpenChange(false)를 호출한다. 제목·닫기 레이블·sm 크기·완료 안내 Typography와 부모 open 상태 소유권을 유지한다. 기존 본문의 Stack/확인 버튼을 제거하고 공통 고정 footer로 옮겨 PC 160px 너비·40px 높이, 모바일 전체 너비와 공통 footer 여백을 적용한다. 기존 본문 내 fullWidth 버튼·gap=6 배치에서 공통 단일 액션 규격으로 바뀌는 것은 의도된 변경이다. 앞선 팝업 분리 기록의 DOM/간격 보존은 당시 구현 기준이다. 출처는 frontmatter의 CouponRegistrationDialog/SingleActionDialog/ModalDialogFooter 작업 트리 파일이다. 타입 검사·변경 ESLint/Prettier를 확인했다. 브라우저 검증은 수행하지 않았다.

## 결제 쿠폰 단일 액션 다이얼로그 재사용 (2026-10-20)

`CouponDialog`의 수동 ModalDialog.footer/Button을 `SingleActionDialog`로 교체했다. confirmLabel=쿠폰 적용하기와 기존 적용 콜백을 전달하며 primary/short/fullWidth 기본 버튼·sm 크기·모바일 fullscreen·공통 고정 footer를 유지한다. 확인 시 onApply(discount) → 마지막 적용 선택값 저장 → 상위 onOpenChange(false) 순서를 유지한다. 취소/닫기 경로에서 마지막 적용값으로 복원하는 onOpenChange도 그대로 전달해 적용과 취소를 구분한다. 선택·할인 계산·펼침 상태와 본문은 CouponDialog가 계속 소유한다. 출처는 frontmatter의 CouponDialog/SingleActionDialog 작업 트리 파일이다. 타입 검사·변경 ESLint/Prettier를 확인했다. 브라우저 검증은 수행하지 않았다.

## 장바구니 옵션 확인 다이얼로그 재사용 (2026-10-20)

`CartOptionsDialog`의 수동 취소/변경 footer를 `ConfirmDialog`로 교체했다. `ConfirmDialog.confirmDisabled`는 기본 false이며 확인 버튼의 disabled만 제어한다. 옵션 모달은 confirmLabel=변경, confirmDisabled=!valid, onConfirm=onSave(draft)를 전달한다. 취소는 기존 onOpenChange(false) 경로로 onClose를 호출하고 draft를 저장하지 않는다. 기존 fullWidthActions 기본 HStack gap=2·전체 너비 버튼, size=sm·모바일 fullscreen, 본문 선택 컨트롤과 고정 footer를 유지한다. 공용 스토리에 확인 비활성/취소 활성 예시와 play 검사를 추가했다.

출처는 frontmatter의 CartOptionsDialog/ConfirmDialog 및 ConfirmDialog 스토리 작업 트리 파일이다. 타입 검사·변경 ESLint/Prettier·Panda 생성·Next.js 프로덕션 빌드를 확인했다. 브라우저/Storybook play는 실행하지 않았다.

## 확인 다이얼로그 세로 액션과 아이디 안내 적용 (2026-10-20)

`ConfirmDialog.actionDirection`은 horizontal(기본)/vertical을 지원한다. vertical은 fullWidthActions 값과 관계없이 w=100%·gap=2 Stack으로 두 버튼을 묶고, horizontal은 기존 fullWidthActions=true의 HStack/false의 직접 버튼 배치를 유지한다. `onCancel`을 전달하면 보조 버튼이 해당 콜백을 호출하며, 생략하면 기존 onOpenChange(false)를 호출한다. 확인은 onConfirm만 호출하며 이후 닫기나 이동은 소비처가 소유한다.

`IdConfirmationModal`은 ConfirmDialog를 사용하고 비밀번호 재설정→onPasswordReset, 확인→onConfirm을 전달한다. PC는 fullWidthActions=false·horizontal로 기존 공통 footer의 가로 버튼 크기를 유지한다. 모바일은 vertical로 전환하며 본문 내 두 버튼을 제거해 공통 고정 footer에 배치한다. 이는 기존 모바일 본문 버튼 배치에서 의도적으로 변경한 부분이며, 본문 안내·userName 정규화·타이포그래피·여백·모바일 fullscreen과 플랫폼별 제목은 유지한다. Vertical/VerticalMobile 스토리와 보조 액션이 닫기를 자동 호출하지 않는 play 검사를 추가했다.

출처는 frontmatter의 ConfirmDialog/IdConfirmationModal 구현과 ConfirmDialog 스토리 작업 트리 파일이다. 타입 검사·변경 ESLint/Prettier·Panda 생성·Next/Storybook 프로덕션 빌드를 통과했다. 브라우저 시각/상호작용 및 Storybook play는 실행하지 않았다.

## 상품 수선 안내 컴포넌트 분리 (2026-10-20)

`ProductDetailAfterSalesContent`는 도입 문구와 세 영역 조합만 소유한다. `ProductAfterSalesContacts`는 고객센터/A/S 문의처와 FAQ/1:1 문의 액션을 담당하며 동일한 문의처 행과 액션 행을 로컬 컴포넌트로 재사용한다. `ProductAfterSalesProcess`는 아이콘·절차 데이터와 6열/모바일 1열 ordered list를, `ProductAfterSalesQuestions`는 Q&A 데이터와 질문/답변 표시를 소유한다. 기존 외부 접수 URL·새 창/rel 속성·링크·h4/h5 레벨·Grid 직계 li 선택자와 PC/MO 스타일을 유지한다.

출처는 frontmatter의 해당 작업 트리 파일이다. 타입 검사·변경 ESLint/Prettier·Panda 생성·Next/Storybook 프로덕션 빌드를 통과했다. 임시 검증기로 외부 공용 컴포넌트 경계를 고정하고 JSX를 펼쳐 해당 진입점의 구조·문구·속성·스타일 값이 변경 전과 같음을 확인했다. 실제 DOM/브라우저 시각·상호작용 검증은 수행하지 않았다.

## 배송 반품 안내 패널과 목록 분리 (2026-10-20)

`ShippingReturnsPage`는 고객센터 레이아웃과 세 탭 정의를 조합한다. `ShippingGuidePanel`, `ReturnCautionsPanel`, `ProductReturnsPanel`이 각 탭의 문구·데이터·절차를 소유하고 `ShippingReturnsGuide`의 GuidePanel/NumberedList/BulletList 표현을 재사용한다. 상위 공용 UI로 범위를 확장하지 않고 해당 기능 내부에 둔다. 기존 탭 value/label/defaultValue·본문 순서·ol/ul/li·번호·bullet 장식·compact 간격을 유지한다. 상품 상세 배송/반품 컴포넌트는 문구와 구성이 달라 그대로 유지한다.

출처는 frontmatter의 해당 작업 트리 파일이다. 타입 검사·변경 ESLint/Prettier·Panda 생성·Next/Storybook 프로덕션 빌드를 통과했다. 임시 검증기로 외부 공용 컴포넌트 경계를 고정하고 JSX를 펼쳐 해당 진입점의 구조·문구·속성·스타일 값이 변경 전과 같음을 확인했다. 실제 DOM/브라우저 시각·상호작용 검증은 수행하지 않았다.

## 런클럽 세션 카드 구성 분리 (2026-10-20)

`RunClubSessionCard`는 article Stack에서 `RunClubSessionCardImage`와 `RunClubSessionCardContent`를 조합한다. 이미지는 LinkOverlay·Next Image·날짜/지역/거리 오버레이를, 상세 안내는 카테고리·ContentHeader·모바일 숨김 상세 링크를 소유한다. 기존 상세 URL·aria-label·빈 이미지 alt·sizes·PC/MO 종횡비·오버레이·카드 간격·모바일 CTA 생략을 유지하고 추가 DOM 래퍼를 만들지 않는다.

출처는 frontmatter의 해당 작업 트리 파일이다. 타입 검사·변경 ESLint/Prettier·Panda 생성·Next/Storybook 프로덕션 빌드를 통과했다. 임시 검증기로 외부 공용 컴포넌트 경계를 고정하고 JSX를 펼쳐 해당 진입점의 구조·문구·속성·스타일 값이 변경 전과 같음을 확인했다. 실제 DOM/브라우저 시각·상호작용 검증은 수행하지 않았다.

## 스토어프런트 첨부 시안 반영 (2026-10-20)

메인·전체메뉴·전체검색·상품목록·상품상세·검색결과·에러 7개 화면의 변경과 유지 경계, 사진 출처, 기능 내부 구성과 Typography 계약은 [첨부 시안 대조 기록](storefront-design.md)에 정리했다. SearchListingLayout과 SystemStatusPage는 기능 내부에 두고 기존 ContentHeader·SearchField·상품 카드·필터·Base UI 래퍼를 재사용한다. 상품 데이터는 기존 목업을 유지한다.

## 홍보 배너 전체 페이지 노출 (2026-10-20)

사용자 요구에 따라 HeaderPromotionBanner는 PC·모바일 모든 페이지에 표시한다. SiteHeader의 플랫폼·홈 경로 조건을 제거했으며, 일반 헤더를 생략하는 모바일 검색 페이지에서도 AppLayout이 같은 배너를 표시한다. 배너의 기존 높이와 캐러셀 동작은 유지한다. 출처는 working_tree_sources의 SiteHeader.tsx와 AppLayout.tsx다.

## 페이지 공통 프레임 (2026-10-20)

CustomerCenterLayout의 바깥 main·Breadcrumb 영역·중앙 본문을 layouts/PageFrame으로 추출했다. PageFrame은 선택적 breadcrumbItems와 children을 받아 PC 바깥 최대 1532px·본문 1200px/좌우 34px, 모바일 전체 너비/좌우 16px, 기존 하단 여백과 Breadcrumb 높이 56px을 소유한다. Breadcrumb을 생략하면 해당 영역도 생략한다. 사이드바·제목·본문 데이터·경로 정책은 호출자가 조합하므로 다른 메뉴와 사이드바 없는 페이지에서도 같은 프레임을 사용할 수 있다. CustomerCenterLayout은 기존 props를 유지하며 PageFrame 안에 SidebarColumns·ContentSection을 조합한다. 기존 DOM 순서와 고객센터 PC 190px/98px 및 모바일 표시 정책은 유지한다. 출처는 working_tree_sources의 PageFrame.tsx·CustomerCenterLayout.tsx다.

## 고객센터 시안과 구성 정리 (2026-10-20)

고객센터 첨부 시안 7종에 대한 차이·반영 범위·재사용 책임은 [고객센터 시안 반영 기록](support-design.md)에 정리했다. 이전 FAQ outline 카테고리와 모바일 공지 accordion 설명보다 이 기록이 우선한다. PC SUPPORT 사이드 제목과 PageFrame을 재사용하고, FAQ는 fill 카테고리 아래 검정 구분선을 둔다. 모바일 필터 rail의 기존 외부 margin/padding과 목록의 추가 margin을 정리해 FaqCategoryNav가 목록 앞 간격을 소유한다. 공지는 PC accordion, 모바일 상세 링크이며 제목·날짜는 공용 notices.data를 사용한다. StoreMapPreview는 PC 422px·모바일 240px 영역에서 지도 샘플의 종횡비를 보존한다.

문의 읽기 파일 목록/선택은 InquiryReadAttachments, 공통 SingleActionDialog·Carousel 조합은 InquiryAttachmentPreview가 소유한다. CareInstructions는 ContentSection 기본 제목을 사용하고 TermsDocument는 선택된 시행일을, TermsDateSelect는 Popover 열림/닫힘과 Radio 선택 후 닫기를 소유한다. 문의 form/업로드 유효성 검사는 그대로 유지한다. 기능 내부 상태를 구분하는 추출이며 새 공용 atom이나 Base UI 의존성을 추가하지 않는다. 출처와 실제 검증 범위는 연결한 기록의 working_tree_sources와 검증 항목을 따른다.

## 약관 시행일 선택과 가로 구분선 공통화 (2026-10-20)

TermsDateSelect는 terms 기능 내부에서 시행일 Popover 트리거·포털·Radio·열림 상태를 소유한다. TermsDocument는 날짜 목록·선택값과 약관 본문을 소유하며 name/options/value/onValueChange를 전달한다. 플랫폼 포털 클래스, 선택 후 닫기, 날짜 표시 형식과 접근성 이름은 유지한다.

공통 atoms/Divider는 장식용 가로 구분선의 subtle(black.20/1px), strong(black.100/1px), heading(black.100/2px) 세 variant를 제공한다. 기존 Panda Divider의 DOM·border 동작을 유지하며 간격·모바일 표시/두께 차이는 소비자가 소유한다. 고객센터·공지·문의·마이페이지의 가로 구분선을 이전했고, 헤더 로그인·상품 메타·프로모션의 세로 구분선은 고유 규격으로 기존 Panda 컴포넌트를 유지한다. 세 variant와 모바일 변경 예시는 src/stories/components/atoms/Divider/Divider.stories.tsx에 있다. 출처는 frontmatter에 기록한 작업 트리 파일이다.

검증(Codex, 2026-10-20): 변경 TSX ESLint·Prettier, 전체 타입 검사, Panda 생성, Next.js 및 Storybook 프로덕션 빌드를 통과했다. 브라우저 시각·상호작용 검증은 수행하지 않았다.

## 일반 아이디 로그인 전환 (2026-10-20)

첨부 설계서와 사용자가 확정한 영문·숫자 4자 이상 규칙을 반영했다. LoginForm은 EmailField 대신 기존 TextFormField를 사용해 라벨 “아이디”, placeholder “아이디를 입력해 주세요”, type text와 기존 name/autocomplete username을 전달한다. boxed·required·오류 설명 연결과 Panda 배치는 유지한다. 로그인 오류·성공·형식 스토리와 아이디 찾기·폼 감사의 결과 예시를 갱신했다. 아이디 찾기 결과는 `honggildong`으로 표시하며 가입·비밀번호·인증·계정 잠금 화면은 변경하지 않는다. 이 기록은 이전 이메일 기반 로그인 설명을 대체한다. [상태 계약](state.md#일반-아이디-로그인-전환-2026-10-20)을 참고한다.

검증: 전체 타입 검사·변경 TSX ESLint·변경 파일 Prettier·전체 Storybook production build가 통과했다. 빌드 결과를 로컬 HTTP 서버에서 Edge/Playwright로 실행해 로그인 PC 6개·모바일 5개, 아이디 찾기 결과 PC/모바일 2개·재설정 이동 1개, 폼 감사 찾기 PC/모바일 2개로 총 16개 스토리가 통과했다. 아이디 3자 거부·4자 영문/숫자/혼합 허용, 공백·한글·특수문자·이메일 거부, 오류 해제·재표시와 로그인 콜백·홈 이동을 확인했다. 1600px·375px 기본 화면 캡처와 375px 화면을 시각 확인했다. 실제 인증 API는 검사 대상이 아니다.

## 런클럽 첨부 시안 보완 (2026-10-21)

첨부된 PC·모바일 목록/빈 화면/상세 시안과 Storybook 렌더를 비교했다. RunClubLayout의 결과 영역은 PC에서 최대 1280px·전체 가용 너비로 지정하고 모바일은 전체 너비를 유지한다. 결과 영역의 신청 내역/카드 간격은 24px이며 PC 빈 화면에서는 신청 내역 링크를 생략한다. 모바일 헤더의 신청 내역 링크는 유지한다. RunClubHeader의 소개 문구는 PC 중앙·모바일 왼쪽 정렬이다.

카드 제목은 PC heading7(28px)·모바일 body1을 사용하고 제목/설명 간격은 8px, 본문/CTA 간격은 24px이다. 이미지의 날짜와 코스 두 줄은 gap=0으로 조합한다. 상세의 정원 20명은 PC·모바일 모두 표시하고, RunClubSessionHero의 뱃지는 HStack으로 감싸 내용 너비에 맞게 배치한다. 실제 세션 데이터와 신청 준비 안내 동작은 유지하며, 시안 내 서로 다른 예시 날짜/코스를 고정 문구로 복제하지 않는다. 공통 헤더의 홍보 배너는 기존 전체 페이지 노출 정책을 유지한다.

출처: 작업 트리의 `src/shared/features/run-club/RunClubLayout.tsx`, `RunClubHeader.tsx`, `RunClubSessionCardContent.tsx`, `RunClubSessionCardImage.tsx`, `RunClubDetailPage.tsx`, `RunClubSessionHero.tsx`. 이 기록은 이전 PC 정원의 mobileOnly 보존 설명을 대체한다.

검증(Codex, 2026-10-21): Panda 생성·전체 타입 검사·런클럽 폴더 ESLint가 통과했다. Edge headless의 Storybook PC 1600px 목록/빈 목록/마감 상세와 모바일 375px 목록/빈 목록/오픈 예정 상세 6개 화면에서 가로 넘침이 없음을 확인했다. PC 카드 제목 28px, 빈 목록 신청 내역 링크 생략, PC 상세 정원 표시와 PC/MO 로드 필터 결과(4개/1개)를 확인했다. 목록·빈 화면·모바일 상세 캡처를 시각 검토했다. 실제 신청 API 연동 검증은 수행하지 않았다.
`npm run build`의 Next.js 프로덕션 빌드도 통과했다.

## Best sellers 모바일 비례 폭 (2026-10-21)

사용자가 첨부한 메인 시안과 768px Storybook 화면을 기준으로 Best sellers의 모바일 카드 폭을 수정했다. 375px 디자인의 상품 이미지 160px과 좌우 gutter 각각 5px을 뷰포트에 비례시키며, 사용자 후속 요청에 따라 gutter도 고정 px 대신 비례값을 사용한다. 이미지 폭은 `42.66666666666667vw`, 각 gutter는 `1.3333333333333333vw`이며 슬라이드 폭은 셋의 합이다. 기존 `mobileItemGutter={5}`는 공통 캐러셀의 간격 모드 선택을 유지하고, 홈의 모바일 slide 스타일이 실제 padding을 덮어쓴다. 공통 API와 타입은 변경하지 않았다.

공통 ProductCard showcase의 모바일 160px 폭과 ProductThumbnail의 160px 높이를 이 섹션 안에서만 해제한다. 최초 수정에서는 썸네일 영역을 정사각형으로 유지했으나, 아래 후속 시안 대조에 따라 PC·모바일 모두 3:4 영역으로 변경했다. 기존 중요도 지정 폭과 충돌하지 않도록 모바일 slide의 직접 카드 너비 및 레일 내부 `.image` 크기/비율에만 제한된 우선순위를 사용한다. PC 카드 폭과 개수, Find my HOKA의 253px 상한, 레일 여백과 필터 변경 시 viewport 재생성 계약은 유지한다. 출처는 frontmatter의 작업 트리 파일과 2026-10-21 사용자 요청이다.

검증(Codex, 2026-10-21): Panda 생성·전체 타입 검사·변경 TSX ESLint/Prettier가 통과했다. 실행 중인 Storybook의 모바일 375px에서는 이미지 160×160px·gutter 5px, 768px에서는 이미지 약 327.7×327.7px·gutter 10.24px을 측정했다. 두 상품과 다음 상품 일부 노출, 모바일 페이지 가로 넘침 없음, 드래그로 마지막 상품 도달과 필터 변경 후 첫 슬라이드 x=8px 복귀를 확인했다. 독립 미리보기를 375→768px로 리사이즈해 같은 비례값으로 재계산됨을 확인했다. PC 1200·1920px의 중앙 그리드 기준 상품 이미지 폭 약 202.2·293.6px과 모바일 Find my HOKA 슬라이드 253px을 확인했다. PC 1200px 스토리는 기존 WEB 최소 1200px 캔버스를 유지한다. 이번 변경으로 프로덕션 빌드는 별도 수행하지 않았다.

첨부 메인의 Hero→Shop by category→Best sellers→Explore→Find my HOKA 순서는 현재 구성과 일치한다. 상품 목업에는 시안의 신발 진열과 다른 상품·가격 및 의류 항목이 포함되고 테스트 레일은 12개 항목을 사용한다. 이 데이터 차이와 다른 메인 디자인은 이번 폭 수정에 포함하지 않는다.

후속 비율 반영(Codex, 2026-10-21): 첨부 시안의 Best sellers 썸네일은 약 3:4 세로형으로 판단했으며 사용자 요청대로 기존 정사각형 상품 이미지는 수직 중앙에 유지한다. `thumbnailRatio`의 Panda raw 스타일을 PC·모바일 레일 스타일과 생성 전에 병합하고, 영역의 높이는 auto·aspect-ratio는 3/4로 적용했다. ProductThumbnail의 기존 이미지 width=100%·height=auto·top=50%·translateY(-50%)를 유지해 원본 이미지를 늘이거나 자르지 않는다. 공통 ProductThumbnail과 다른 소비처는 변경하지 않는다.

후속 검증: Panda 생성·타입 검사·변경 TSX ESLint/Prettier가 통과했다. Storybook 375·768·1200·1920px에서 썸네일 영역은 각각 약 160×213.3·327.7×436.9·202.2×269.6·293.6×391.5px, 정사각형 원본 이미지의 수직 중심 차이는 0.01px 미만으로 측정했다. 앞선 정사각형 영역의 검증 수치는 비율 변경 전 기록이며 최종 영역 크기는 이 후속 검증을 따른다.

## 모바일 홈 유동 크기 (2026-10-21)

HomeLayout의 `.platform-mobile` 영역에서만 `--home-title-*`·`--home-body-*`·`--home-pagination-*` 변수를 정의한다. 기본 루트 글자 16px일 때 375→768px를 선형 보간하는 rem+vw clamp이며, 375px 이하 기존 크기·768px 이상 상한을 유지한다. 제목은 1.5배, 설명·상품 정보·필터·버튼 글자는 1.25배까지 확대한다. 예: display 40→60px, sectionHeading 30→45px, cardTitle 20→30px, overlay/imagePill 제목 24→36px, 본문/CTA 14→17.5px, 가격 13→16.25px, 필터 12→15px. 단위 없는 줄높이는 유지한다. rem을 사용하므로 사용자 기본 글자 크기에 따라 보간 경계와 실제 크기는 달라질 수 있다.

Typography의 의미 토큰 및 body·cta2/ctaKr2·textLink2/textLinkKr2, ProductGender showcase, MainContentCard의 로컬 제목/설명, Button auto/compact, FilterTabs fill이 홈 변수를 소비한다. 변수가 없는 경우 기존 토큰/px로 돌아가며 Figma 기초 타이포그래피 정의와 공개 React props는 바꾸지 않는다. 버튼 높이 40→50px·좌우 패딩 16→20px, 필터 높이 30→37.5px를 적용한다. HeroCopy는 모바일 카피를 가용 폭으로 확장하고 설명 폭을 제한하며 CTA 그룹은 줄바꿈을 허용한다.

HeroPagination은 모바일 점 6→9px·활성 막대 32→48px·간격 8→12px이며 진행 바의 시작 폭은 실제 점 크기 변수를 참조한다. 기존 자동 재생·정지·키보드 선택·포커스를 유지한다. 일반 CarouselPagination, 이미지 비율·레일 폭·Find my HOKA 카드 상한·공통 헤더/푸터는 유지한다. 기존 고정 글자 크기 설명 중 모바일 홈에는 이 기록이 우선한다.

검증(Codex, 2026-10-21): 실행 중인 Storybook의 모바일 320·375·430·620·768·900px에서 크기·상한·가로 넘침 없음·CTA/페이지 표시 겹침 없음을 측정했다. 375px의 제목/본문 40/14px·점/막대 6/32px, 768px의 60/17.5px·9/48px 및 필터 15px·가격 16.25px를 확인했다. 키보드 선택·흰 포커스 outline·포커스 중 진행률 정지, 자동 슬라이드 전환, 상품 레일 드래그와 필터 변경 후 transform=0 복귀를 확인했다. PC 1600px의 제목 64px·본문 16px·점/막대 8/42px 및 모바일 로그인에 홈 변수가 없음을 확인했다. 768px의 상품명 말줄임·Explore 오버레이를 시각 검토했다. 실제 브라우저 200% 확대는 자동화 키 입력으로 확대 상태를 만들 수 없어 검증하지 못했다.

검증 명령: Panda 생성·전체 타입 검사·변경 TSX ESLint/Prettier·Next.js 프로덕션 빌드·Storybook 프로덕션 빌드가 통과했다. 작업 트리 전체의 OKF 관련 문서 누락 검사도 통과했다. 375px의 상품명 ellipsis·Explore 제목 24px/설명 14px/하단 CTA 여백 30px, 768px Find my HOKA의 제목 36px/설명 17.5px과 카드 안 텍스트 배치도 확인했다.

## 2560px PC 상품 표시 확대 (2026-10-21)

사용자 요청으로 PC의 1920px 시안 크기를 기준으로 2560px까지 콘텐츠 폭·의미별 글자 크기를 선형 확대한다. `.platform-web`의 중앙 최대 폭은 1532→2040px, sectionHeading은 40/38→52/50px(글자/행간), cardTitle은 24/23→28/27px, 상품 정보는 16→18px다. 2560px 이상은 상한을 유지한다. 공통 헤더·푸터·Hero 카피·상품 상세 중앙 그리드도 같은 콘텐츠 폭 토큰으로 정렬하며, 별도로 폭을 제한하는 계정/고객센터 폼은 확대하지 않는다. PC 최소 캔버스 1200px와 모바일 전용 크기·배치는 유지한다.

Panda의 wideDesktop(2240px), ultraWideDesktop(2560px) 조건으로 상품 목록·검색 결과는 3→4→5열을 표시한다. HomeCarouselRail은 기본 표시 개수에서 단계별 1/2개를 늘리고 실제 항목 수를 넘겨 새 열을 추가하지 않는다(기존 기본 개수는 하한으로 보존). Best sellers는 5→6→7개, Find my HOKA는 4→5→6개, 카테고리는 4→5→5개다. 공유하는 상품 상세·런클럽 추천 레일에도 같은 규칙을 적용한다. 기존 오른쪽 다음 카드 미리보기와 마지막 카드의 중앙 그리드 끝 정렬을 유지한다. 추가 데이터·뷰포트 감지 React 상태·이벤트 리스너를 만들지 않는다.

ProductDetails가 상품명·성별·가격의 의미 토큰을 로컬로 지정한다. Typography의 body/productAudience는 기존 Figma 기초 스타일을 유지하고 글자 크기만 기존 의미 토큰을 소비한다. 기본값은 기존 16px이며 모바일 body의 홈 유동 크기와 성별 variant·가격의 모바일 토큰은 유지한다. Storybook EndAlignedToGrid는 CSS가 결정한 실제 표시 개수로 끝까지 이동할 클릭 횟수를 계산한다.

작업 트리 출처: panda.config.ts, src/shared/styles/global.scss, src/shared/components/atoms/Typography/Typography.tsx, src/shared/components/molecules/ProductDetails/ProductDetails.tsx, src/shared/components/molecules/HomeCarouselSection/{HomeCarouselSection,HomeCarouselRail}.tsx, src/shared/features/catalog/ProductListingResults.tsx, src/stories/components/molecules/HomeCarouselSection/HomeCarouselSection.stories.tsx. 해당 경로는 이 문서의 working_tree_sources에 기록되어 있다.

검증(Codex, 2026-10-21): Panda 생성·전체 타입 검사·변경 TypeScript/TSX ESLint를 통과했다. 실제 Next 앱을 Edge headless에서 PC 1200·1920·2240·2560·3840px, 모바일 375·768px로 확인했다. PC 중앙 폭 1920/2240/2560/3840px에서 1532/1786/2040/2040px, 제목 40/46/52/52px, 상품명 16/17/18/18px와 목록 3/4/5/5열을 측정했다. 2560px Best sellers는 5번 이동 후 다음 버튼 비활성·마지막 카드 오른쪽 정렬 오차 1px 미만, 5번 역이동 후 이전 버튼 비활성을 확인했다. 모든 측정 화면에 페이지 가로 넘침이 없고 모바일 목록은 2열을 유지한다. 2560px 검색 결과와 상품 상세에도 가로 넘침이 없다. 홈·목록 2560px 스크린샷을 시각 검토했다. 이번 변경에서 프로덕션 빌드는 재실행하지 않았다.

## 홈 Hero 버튼 외곽선 제거 (2026-10-21)

HeroCopy의 ButtonLink를 `variant="primary" colorway="white"`로 변경했다. 공통 Button의 기존 조합을 사용해 기본 상태의 흰 배경·검은 글자를 유지하면서 secondary가 만들던 검은색 1px inset box-shadow를 제거한다. 홈의 TECTON X 4·TRAIL READY·RUN THE CITY 및 HeroCopy를 사용하는 스토리에 동일하게 적용된다. 크기·링크·배치와 공통 버튼의 hover/active/focus 처리는 기존 API를 따른다.

작업 트리 출처: `src/shared/components/organisms/Hero/HeroCopy.tsx`, `src/shared/components/atoms/Button/Button.tsx`. 브라우저 시각 검증은 수행하지 않았다.

## 주문 화면 시각 오차 보정 (2026-10-21)

사용자 첨부 모바일 시안과 현재 Storybook을 대조해 표시만 보정했다. CartItemRow는 모바일 카드 최소 높이 164px, 80px 썸네일과 상단 체크 위치를 사용하고 옵션/수량을 한 흐름으로 표시한다. 상품 이미지는 contain으로 유지해 잘림과 flex 축소를 방지한다. CheckoutProductList와 CouponProductItem도 모바일 썸네일을 80px로 맞춘다. CartOptionsDialog의 큰 이미지는 PC 24px·모바일 16px 본문 좌우 패딩과 상단 24px 패딩을 상쇄해 팝업 경계에 맞춘다.

CheckoutDiscountSummary는 쿠폰 조회 링크를 라벨 옆에 두고, 할인액을 오른쪽에 정렬한다. 총 결제금액 행에만 연한 배경을 적용하고 안내문은 테두리 밖에 둔다. CouponProductItem은 공통 Collapsible의 기본 버튼으로 문구와 우측 +/- 표시를 분리한다. 제어 상태·라디오 값·onOpenChange·onSelect 계약은 유지한다. CheckoutComplete의 체크 장식은 첨부 시안에 맞춰 모바일에서만 숨기고 PC에서는 유지한다.

작업 트리 출처는 frontmatter의 CartItemRow·CartOptionsDialog·CheckoutProductList·CheckoutDiscountSummary·CouponProductItem·CheckoutComplete다. 금액 계산, 상품 선택 대상, 품절 처리, 주문 상태별 행동, 기간 필터와 실제 결제 정책은 사용자 범위 밖이므로 변경하지 않았다. 주문/배송 조회의 정적 구현을 새 흐름으로 확장하지 않았다.

Panda 생성·전체 타입 검사·변경 TSX ESLint를 통과했다. 모바일 375px에서 카드와 쿠폰 팝업 정렬을 시각 확인하고 기존 CouponSelection 시나리오가 480,000원에서 48,000원 할인 후 432,000원을 표시하는 것을 확인했다. 실제 결제 승인·주문 저장은 검증 범위에 포함하지 않는다.

추가 검증: Next.js 프로덕션 빌드(52개 정적 페이지 생성)와 변경 TSX Prettier 검사를 통과했다. PC 1280px에서도 기존 CouponSelection 적용 결과와 금액 요약 배치를 확인했다. 모바일 옵션 팝업의 이미지가 헤더 직후·좌우 경계에 맞고 취소/변경 버튼이 유지되는 것을 시각 확인했다. OKF 작업 트리 매핑 검사도 통과했다.

## 주문 화면 공통 프리미티브 보완 (2026-10-21)

직전 변경의 6개 컴포넌트를 재검토해 CartItemRow·CheckoutProductList·CouponProductItem의 정사각형 이미지 3곳을 Panda square 패턴으로 통합했다. 크기는 size 토큰 24/20(96/80px)과 쿠폰의 PC 88px 리터럴·모바일 20(80px)로 기존 PC/모바일 값을 유지하며 display:block·objectFit:contain·flex:0 0 auto를 사용한다. 설치된 SquareProps는 HTMLStyledProps<'div'> 기준으로 src/alt를 선언하지 않으므로, 타입 캐스팅이나 추가 래퍼 대신 네이티브 img에 square 패턴을 적용한다. 너비/높이의 중복 선언은 제거했다.

CartItemRow의 삭제는 기존 IconButton(size=24)·Icon(faXmark)을 사용하며 접근성 이름과 onRemove 콜백을 유지한다. CheckoutComplete의 원형 장식은 Circle(size=10)로 이전하고 기존 block/모바일 숨김·flex:0 1 auto를 명시해 기본 중앙 정렬과 flex 기본값이 배치를 바꾸지 않도록 했다. 이 장식의 글리프 크기는 본문 Typography 척도가 아닌 장식 값으로 유지한다. CheckoutDiscountSummary의 안내문 앞 12px은 부모 Stack gap=3으로 이동하고 불필요한 Box 래퍼를 제거했다. 새 공개 컴포넌트나 API는 추가하지 않았다.

CartOptionsDialog의 대표 이미지와 색상 썸네일은 고정 w/h 쌍이 아닌 너비+aspectRatio로 고유 비율을 유지하므로 기존 네이티브 img·Panda css를 유지한다. Square의 퍼센트 size를 적용하면 높이가 부모 높이에 의존할 수 있어 동등한 계약이 아니다. 색상 버튼은 선택 테두리를 가진 썸네일 버튼으로 일반 IconButton 적용 대상이 아니다. CartItemRow의 액션 mt=1은 앞선 gap=1에 추가되는 단일 4px 간격이며 반복 형제 간격이 아니므로 유지했다.

검증: Panda 생성·전체 타입 검사·변경 TSX ESLint를 통과했다. 모바일 375px에서 이미지가 실제 IMG·80×80px·contain·flex:0 0 auto인 것을 측정했고, 삭제 클릭 후 행 제거·선택상품 수·합계 갱신을 확인했다. 작업 트리 출처는 frontmatter의 6개 주문 컴포넌트와 IconButton·Icon 및 설치된 styled-system의 square/Circle 구현이다.

후속 검증: Next.js 프로덕션 빌드와 OKF 작업 트리 매핑 검사를 통과했다. PC 장바구니 이미지는 96×96px, 모바일 쿠폰 이미지는 80×80px로 측정했다. 기존 모바일 CouponSelection 시나리오의 쿠폰 선택·펼침 상태와 432,000원 결제 표시를 확인했다.

쿠폰 펼침 아이콘 보완: CouponProductItem의 Typography 문자 +/-를 공통 Icon(fontAwesomeIcon=faPlus/faMinus, size=12)으로 교체했다. Collapsible의 장식용 aria-hidden 영역과 기존 open/onOpenChange를 유지한다. 별도 상태나 버튼은 추가하지 않았다. 출처는 기존 frontmatter의 CouponProductItem.tsx·Icon.tsx다.

아이콘 보완 검증: 전체 타입 검사·변경 파일 ESLint·Prettier·Panda 생성·Next.js 프로덕션 빌드를 통과했다. 이 보완에서는 브라우저 시각 검증을 재실행하지 않았다.

## 주문 화면 구성 분리와 재사용 (2026-10-21)

공통 molecule OrderProductSummary는 image/name/optionText/amount, 선택적 gender/children과 cart/checkout/coupon variant를 받는다. CartItemRow·CheckoutProductList·CouponProductItem이 사용한다. 목 상품 조회·합계 계산·선택·쿠폰 상태는 소비처가 유지한다. PC 이미지 96px(쿠폰 88px)·모바일 80px, cart의 두 줄 말줄임과 모바일 중앙 정렬, coupon의 기본색 옵션·보통 굵기 금액을 보존한다. 액션은 children으로 기존 정보 Stack에 직접 참여하며 추가 DOM 래퍼를 만들지 않는다. 새 공개 API는 이 컴포넌트 하나이며 src/stories/components/molecules/OrderProductSummary에서 세 context와 모바일 긴 이름을 제공한다.

CartContent는 CartSelectionBar·CartProductList·CartSupportInfo를 조합한다. 각 부분은 기존 선택 바, ul/li 목록, 고객센터 section을 그대로 렌더링하며 신규 상태나 중간 래퍼를 추가하지 않는다. CartOptionsDialog가 draft·width/color별 sizes·soldOut·valid와 ConfirmDialog 저장/취소를 유지하고 CartOptionsContent에는 준비된 정보·색상 썸네일과 변경 콜백만 전달한다. 숫자·사이즈·발볼은 기존 NumberStepper·SizeSelector·Radio를 유지한다.

ProductOptionList에 layout=cart를 추가했다. 72px 이미지·2px 선택 테두리·8px 가로 간격·기존 가로 스크롤을 보존한다. 버튼/선택 스타일은 recipe.raw와 css.raw를 단일 css 호출에서 병합해 cart의 밑줄과 기존 hover 규칙이 충돌하지 않게 한다. preview/grid/scroll 기본값은 유지하며 미리보기 화살표의 문자 표시는 기존 Icon의 Chevron으로 바꿨다. 공통 옵션 목록의 새 Storybook에 기존 layout과 cart의 제어 선택 play를 제공한다.

Wishlist의 선택적 label·iconSize로 장바구니의 12px 하트+관심상품 표기를 지원한다. label이 없으면 기존 38px 토글과 PC 24px/MO 19px 아이콘을 유지한다. 선택은 기존 Base UI Toggle의 pressed/onPressedChange로 관리하고, CartPage favorites가 계속 원본 상태다. Labelled 스토리는 왕복 토글을 확인한다. CheckoutComplete의 원형 완료 장식도 문자 체크 대신 Icon(faCheck)을 사용하며 모바일 숨김을 유지한다.

CheckoutPayment는 기존 공통 Radio(custom)로 3열·4px gap·56px 최소 높이와 선택 테두리를 유지한다. name=paymentMethod와 kakao/naver/toss/card/samsung/payco 값을 보존한다. 설치된 Base UI Radio·RadioGroup을 재사용하며 의존성 변경은 없다. 로고 자산 등록과 결제수단 추가는 하지 않는다. AmountRow는 결제 기능 안에서 label/amount/discount/emphasis/emphasizeLabel/action과 HStack 배치 props를 받고, CheckoutDiscountSummary·CouponAmountSummary가 기존 계산값과 행별 여백을 전달한다. 할인 색은 Typography tone=error(red.100)로 통일했다.

CheckoutForm으로 검증·쿠폰 열림/할인·동의 상태와 form 이벤트를 이동했다. CheckoutContent는 준비된 값·명시적 콜백으로 화면을 조립한다. CheckoutPage가 기존 완료·결제수단·URL 선택 책임을 유지하며 완료/빈 상품 분기는 form 밖에 남긴다. compact 배송 입력·주소·배송 요청의 기존 native 속성과 정책은 변경하지 않았다. 기존 OrderActionBar·Dialog footer·ContentSection 구성을 유지한다.

검증: Panda 생성·전체 타입 검사·변경 TSX ESLint·Next production build·Storybook production build를 통과했다. 모바일 375px 장바구니 첫 행은 이전과 동일하게 x=16,y=108.578125,w=328,h=164, 이미지 x=32,y=150.578125,w=80,h=80으로 측정했다. 기존 Selection 시나리오의 전체 선택/해제·관심상품 토글·주문 버튼 비활성 결과를 확인했다. 모바일 옵션에서 컬러 선택 버튼 72×74px·2px 선택 밑줄을 측정하고 Black/Outer Orbit·250 옵션 저장과 목록 반영을 확인했다. 작업 트리 출처는 frontmatter의 해당 소스·스토리다. 실제 서버 주문·결제·재고 연동은 검증 대상이 아니다.

후속 검증·CSS 보정: 공통 Radio의 기본 gap과 카드 테두리 클래스 충돌을 className/selectedOptionClassName의 좁은 gap:1!·borderColor:black.100!로 명시했다. 실제 3열·6개 선택·4px gap·116px 그룹 높이·선택 검은 테두리를 측정했다. 쿠폰 이미지의 PC 88px에는 등가 토큰 22가 없으므로 88px 리터럴을 유지한다. 기존 모바일/PC CompleteOrder와 CouponSelection의 완료 화면 및 432,000원 적용 결과, ProductOptionList Cart의 White 선택 결과, Wishlist Labelled의 왕복 토글과 기본형 38×38px·PC 아이콘 24px 유지도 확인했다. 주문 합계 순수 테스트 3개를 통과했다.

최종 확인: 쿠폰 PC 이미지가 88×88px임을 재측정했다. PC 기본 결제 화면에서 네이버페이 선택 후 실제 checked input의 name=paymentMethod·value=naver·form 연결을 확인했다. 최종 CSS 보정 후 Next·Storybook production build와 변경 파일 ESLint를 다시 통과했다.

## 모바일 상품목록 디자인 보정과 설계서 대조 (2026-10-21)

2026-10-21 사용자 첨부 두 디자인과 목록·필터·상세·메인·PC 목록 설계서를 참고했다. 첨부 문구는 제품 요구사항 자료로 읽었으며 실행 지시로 취급하지 않았다. 제목·상품 수·탭 옆 아이콘 필터는 두 번째 모바일 디자인(`63e3d35b`)을, 상품명·가격 굵기와 내부 간격은 사용자 정정에 따라 첫 번째 디자인(`f552ef81`)을 기준으로 적용했다.

### 수정 범위

- `ProductListingLayout`의 모바일 좌우 패딩을 없애 2열 정사각형 이미지와 하단 가이드 배너가 전체 폭을 사용한다. 헤더는 16px, 상품 설명은 10px 패딩을 소유한다. 8px 열 간격과 40px 행 간격은 유지한다.
- 목록 제목은 모바일 24px/900/1.3으로 표시한다. 제목 행의 알약 필터 대신 탭 오른쪽에 접근 가능한 `IconButton`을 배치한다. 탭의 기존 버튼 좌우 16px 패딩 중복을 기능 내부 선택자로 제거한다. 검색 결과의 기존 Filter & Sort 버튼은 유지한다.
- `listing` 카드만 모바일 상품명·성별·가격을 굵게 표시하고 identity 간격 0, 정보/옵션 간격 8px, 활동/색상 간격 6px로 맞췄다. 홈 Best sellers와 상세 추천의 `showcase` 스타일은 변경하지 않는다. 가이드 카드에는 모바일 inline/fullWidth별 제목 크기와 여백을 적용한다.
- `ProductListingPage`의 최초·추가 로딩 단위를 설계서대로 8→36으로 변경했다. 기존 IntersectionObserver 기반 무한 로딩을 유지한다. 목업이 총 25개여서 실제 36→72 추가 배치의 브라우저 실행은 검증하지 못했다.
- PC 레이아웃·필터·정렬·기본 3열과 프로모션 삽입 위치는 유지한다. 대형 PC의 4/5열은 이전 사용자 요청 정책이 우선한다. 목업 상품·가격·개수를 디자인의 예시 데이터로 하드코딩하지 않았다.

### 필터 설계서 대조 결과 — 미수정 사항

출처는 첨부 `20981f78`의 원본 설명과 다음 소스다. 이번에는 확인 요청에 따라 기존 기능 차이를 기록하며, 아래 정책을 변경한 것으로 보지 않는다.

| 차이                                | 현재 구현과 근거                                                                                                                                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 초기화 후 닫아도 실제 필터가 변경됨 | `ProductListingPage.reset`이 모바일 임시 상태뿐 아니라 `setParams`와 실제 가격 상태를 변경한다. 설계서는 적용 전 닫으면 변경을 버리도록 요구한다. 일반 개별 선택·닫기는 임시 상태를 사용한다.                                                           |
| 정렬 아코디언·표시 순서             | `MobileProductFilter`는 정렬을 접을 수 없는 알약 Radio로 표시한다. 설계서는 라디오 목록이 있는 접이식 정렬이며 선택 태그가 정렬보다 먼저 위치한다. 현재 태그는 정렬 뒤에 있다. 다른 필터 섹션은 기본 펼침이며 설계와 일치한다.                          |
| 메뉴별 숨김·옵션 범위 미적용        | `ProductListingFilterPanel`은 성별·액티비티·러닝 타입·주행감·안정성을 항상 표시하고 고정 옵션을 사용한다. 설계서는 남성/여성 진입에서 성별을 숨기고, 의류/잡화에서 액티비티·러닝 타입·주행감·안정성을 숨긴다. 상품이 가진 조건에 맞는 항목 표시도 없다. |
| 사이즈                              | `koreanSizes`와 `productListingFilterValues.sizeValues`는 220~300만 제공한다. 설명의 220~310 및 의류/용품 XS~XXL, 혼합 목록의 두 종류 병행 조건이 없다. 그림의 예시 값과 본문 범위가 달라 본문 기준으로 비교했다.                                       |
| 가격 범위                           | 현재 50,000~389,000 고정이다. 설계서 본문은 상품 최저/최고가와 기본 0~1,000,000을 언급해 예시 그림 범위와 차이가 있다. 데이터 기반 범위·기본값 정책을 확정할 필요가 있다.                                                                               |
| 정렬·발볼 실제 계산                 | `filterProducts.sortProducts`의 베스트순은 판매량 대신 ID, 신상품순은 발매일 대신 New 뱃지/ID를 사용한다. `productFilterPolicy`는 wide와 x-wide를 모두 Wide로 매칭한다. 현재 목업에 판매량·발매일·독립 X-Wide 상품 필드가 없어 실제 정책과 다르다.      |

`BottomSheet`의 닫기/바깥 영역 종료, 다중 체크, 단일 정렬, 하단 고정 적용 버튼과 임시 결과 개수 계산은 구현돼 있다. URL의 `category=footwear/apparel` 값은 상품의 한글 category와 직접 비교되는 별도 매칭 제약도 있어 데이터 계약 정리가 필요하다.

### 상세·메인 설계서 대조 결과 — 미수정 사항

상세 출처는 첨부 `ea9d2a2f`, 메인 출처는 `7f692174`, PC 목록 출처는 `6335010d`다. 소스 대조 결과이며 실제 외부 서비스 연결 검증을 의미하지 않는다.

- 상세 `ProductDetailPage.submit`은 현재 옵션 1개·수량 1만 담는다. 설계서의 최대 5개 옵션 행, 수량 변경·합계·구매수량 제한 Alert가 없다. 장바구니 등록 후 옵션 초기화와 완료 토스트도 없다.
- 상세 `ProductDetailHeaderActions`의 리뷰 링크는 `product-information`으로 이동하고 실제 리뷰 영역이 없다. `ShareButton`은 동작 콜백이 연결되지 않았다. 사이즈 가이드는 내부 사이즈 영역으로 스크롤하는 대신 외부 HOKA 홈을 연다.
- 상세 갤러리는 이미지 문자열만 지원해 설계서의 mp4 자동·반복 재생이 없다. 색상 변경 시 갤러리 전환·사이즈 초기화와 관심상품 로컬 토글은 구현돼 있다. `ProductDetailSupport`에는 문의·배송/반품·A/S만 있고 설계서의 사이즈·리뷰·세탁 안내 전체가 구현된 상태는 아니다.
- 상세 추천은 EIGEN AI가 아닌 현재 상품을 제외한 목업 앞 6개다. 상품 선택·관심상품도 프런트엔드 데모 수준이며 서버 상품/재고/추천 연동 완료를 주장하지 않는다.
- 메인 섹션 순서는 Hero → 카테고리 → Best sellers → Explore → Find my HOKA로 설계와 일치한다. `Hero`는 5초 전환과 단일 슬라이드 자동전환 방지를 구현한다. 현재 콘텐츠는 BO 연동 대신 정적 데이터다.
- 메인 Hero의 남성/여성 CTA는 모두 필터 없는 `/products`로 이동하며, Find my HOKA는 설계의 브랜드별 상품 목록 대신 공통 `/explore/shoe-finder`로 연결된다. Best sellers는 데이터가 적으면 `createHomeCarouselPreviewItems`로 상품을 반복해 12칸을 채운다. 하이킹 필터는 액티비티 대신 Wide 발볼을 사용한다. 이번 모바일 listing 카드 스타일 변경은 이 홈 showcase에 적용하지 않았다.

### 검증

Codex가 2026-10-21에 `npm run panda`, `npm run typecheck`, 변경 TSX 대상 ESLint와 `git diff --check`를 실행했다. 375px Storybook 목록에서 전체 폭 2열·카드 굵기·카테고리/아이콘 배치와 필터 열기/닫기를 확인했다. 768px의 2열·아이콘 배치, 1600px PC의 3열·필터·정렬 유지도 확인했다. 필터·상세·메인 정책 차이는 소스 및 첨부 대조이며, 해당 기능을 모두 브라우저에서 실행한 결과가 아니다.

## 상품 상세 사이즈 가이드 링크 (2026-10-21)

ProductSizeSelector의 사이즈 가이드는 공통 ButtonLink로 `/support/size-guide`에 현재 창에서 이동한다. 기존 link 변형·md 크기를 유지하며 ProductDetailPage부터 전달하던 팝업 콜백은 제거했다. 위 과거 설계서 대조 기록의 외부 HOKA 이동 설명은 이 변경으로 대체한다.

## 사이즈 가이드 영역 분리 (2026-10-21)

SizeGuideMeasurements는 Grid 배치와 하위 영역 조합을 담당한다. SizeGuideMeasurementImage는 성별·품목별 이미지 선택과 반응형 이미지 크기를, SizeGuideMeasurementInstructions는 품목 측정 단계와 신발 발볼 안내를 담당한다. SizeGuideChart는 단위 선택·표 제목·caption·행·준비 중 안내를 담당하며 category/gender/width/unit/onUnitChange를 받는다. 성별·발볼·단위 상태와 초기화 수명은 SizeGuidePanel에 유지한다. 추가 DOM 래퍼 없이 기존 스타일, 목록·표 의미와 조건부 표시를 보존했다.

측정 안내 내부의 공통 제목·STEP 목록·선택적 보충 설명은 기능 내부 SizeGuideMeasurementMethod(title/steps/description)로 분리했다. SizeGuideMeasurementInstructions는 품목별 안내와 신발 전용 발볼 안내를 같은 컴포넌트로 조합한다. 기존 간격·문구·ol/li 구조와 신발 조건부 표시를 유지한다.

## 모바일 상품목록 필터 버튼 원복 (2026-10-21)

사용자가 첨부한 `codex-clipboard-b6ac903c-ee94-4a7a-8f6b-1b735ef540eb.png`와 필터 UI 원복 요청을 기준으로 `ProductListingLayout`의 모바일 `headerAction`에 기존 `MobileProductFilterTrigger`를 복원했다. 제목 오른쪽에 필터 문구·아이콘이 있는 테두리 알약 버튼을 표시하며, 탭 오른쪽 아이콘은 제거했다. 사용처가 없어진 `iconOnly` API와 IconButton import도 제거했다. 이 정책은 위의 모바일 상품목록 보정 기록 중 탭 옆 아이콘 배치 설명을 대체한다.

상품 카드·이미지/배너 전체 폭·글자·36개 로딩, PC 정렬 및 검색 화면의 Filter & Sort 버튼과 필터 시트 상태/적용 방식은 유지한다. 카테고리 영역은 기존 좌우 16px 패딩과 36px 높이로 표시한다.

출처: 작업 트리의 `src/shared/features/catalog/product-listing/ProductListingLayout.tsx`, `MobileProductFilterTrigger.tsx`. Codex 기록 시각: 2026-10-21T08:36:20Z. 기존 문서의 provenance와 과거 검증 기록은 보존한다.

검증: 변경 TSX ESLint, Panda 생성, typecheck, 작업 트리 OKF 매핑과 diff 공백 검사 통과. 375px Storybook에서 제목 오른쪽 알약 버튼 표시와 클릭 시 상품 필터 시트 열림을 확인했다.
