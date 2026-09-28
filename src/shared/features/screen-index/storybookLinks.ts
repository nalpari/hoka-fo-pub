const storybookBaseUrl = 'http://localhost:6006';

type ScreenStoryIds = { web?: string; mobile?: string };

const storyIds: Record<string, ScreenStoryIds> = {
  'FO-CM-001': { web: 'organisms-layout-siteheader--default' },
  'FO-CM-003': { web: 'organisms-layout-siteheader--default' },
  'FO-CM-004': { web: 'organisms-layout-sitefooter--default' },
  'FO-MN-001': { web: 'pages-home-main--default', mobile: 'pages-home-main--mobile' },
  'FO-EX-001': { web: 'pages-explore-hub--web', mobile: 'pages-explore-hub--mobile' },
  'FO-EX-010': { web: 'pages-explore-detail--web', mobile: 'pages-explore-detail--mobile' },
  'FO-EX-011': { web: 'pages-explore-detail--web', mobile: 'pages-explore-detail--mobile' },
  'FO-EX-014': { web: 'pages-explore-detail--web', mobile: 'pages-explore-detail--mobile' },
  'FO-PL-003': { web: 'pages-product-listing-content--default' },
  'FO-PD-001': { web: 'pages-product-detail-content--default' },
  'FO-SE-002': { web: 'pages-search-results--web', mobile: 'pages-search-results--mo' },
  'FO-EX-002': { web: 'pages-collection-detail--web', mobile: 'pages-collection-detail--mo' },
  'FO-LC-001': { web: 'pages-launch-calendar--web', mobile: 'pages-launch-calendar--mo' },
  'FO-CT-001': { web: 'pages-order-cart--web', mobile: 'pages-order-cart--mo' },
  'FO-MP-001': { web: 'pages-mypage-home--web', mobile: 'pages-mypage-home--mobile' },
  'FO-MP-002': { web: 'pages-mypage-orders--web', mobile: 'pages-mypage-orders--mobile' },
  'FO-MP-008': { web: 'pages-mypage-returns--web', mobile: 'pages-mypage-returns--mobile' },
  'FO-MP-010': { web: 'pages-mypage-coupons--web', mobile: 'pages-mypage-coupons--mobile' },
  'FO-MP-013': { web: 'pages-mypage-wishlist--web', mobile: 'pages-mypage-wishlist--mobile' },
  'FO-MP-014': { web: 'pages-mypage-recent--web', mobile: 'pages-mypage-recent--mobile' },
  'FO-MP-018': { web: 'pages-mypage-profile--web', mobile: 'pages-mypage-profile--mobile' },
  'FO-MP-019': { web: 'pages-mypage-addresses--web', mobile: 'pages-mypage-addresses--mobile' },
  'FO-MB-001': { web: 'pages-auth-signup--default', mobile: 'pages-auth-signup--mobile' },
  'FO-MB-008': { web: 'pages-auth-login--default', mobile: 'pages-auth-login--mobile' },
  'FO-CS-001': { web: 'pages-support-notices--web', mobile: 'pages-support-notices--mo' },
  'FO-CS-002': { web: 'pages-support-faq--web', mobile: 'pages-support-faq--mo' },
  'FO-CS-004': { web: 'pages-support-terms--web', mobile: 'pages-support-terms--mo' },
  'FO-ST-001': { web: 'pages-support-store-finder--web', mobile: 'pages-support-store-finder--mo' },
};

export function storybookUrlsFor(requirementId: string) {
  const story = storyIds[requirementId];
  if (!story) return undefined;

  return {
    web: story.web ? `${storybookBaseUrl}/?path=/story/${story.web}` : undefined,
    mobile: story.mobile ? `${storybookBaseUrl}/?path=/story/${story.mobile}` : undefined,
  };
}
