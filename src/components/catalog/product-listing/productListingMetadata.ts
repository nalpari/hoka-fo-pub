/**
 * [개발팀 바인딩]
 * URL 필터 코드의 breadcrumb/제목 표시 매핑입니다. 서버 분류 코드는 현재 URL 값으로 변환하고 GNB/목록 조회와 같은 코드를 사용합니다.
 * 이 모듈은 표시 메타데이터이며 실제 상품 검색이나 조회 건수를 결정하지 않습니다.
 */

import type { BreadcrumbItem } from '@/components/common/molecules/Breadcrumb';

const genderBreadcrumbs: Record<string, { label: string }> = {
  men: { label: 'Men' },
  women: { label: 'Women' },
  kids: { label: 'Kids' },
};

const genderTitleLabels: Record<string, string> = {
  men: '남성',
  women: '여성',
  kids: '키즈',
};

const genderFeaturedTitleLabels: Record<string, string> = {
  men: "Men's",
  women: "Women's",
  kids: "Kids'",
};

const featuredListingMetadata: Record<string, { breadcrumb: string; title: string }> = {
  popular: { breadcrumb: 'Best Sellers', title: 'Running Best Sellers' },
  new: { breadcrumb: 'New Arrivals', title: 'New Arrivals' },
  'coming-soon': { breadcrumb: 'Coming Soon', title: 'Coming Soon' },
  sale: { breadcrumb: 'Sale', title: 'Sale' },
};

const activityBreadcrumbLabels: Record<string, string> = {
  'road-running': '로드 러닝',
  'trail-running': '트레일 러닝',
  walking: '워킹',
  training: '트레이닝',
  hiking: '하이킹',
};

const categoryBreadcrumbLabels: Record<string, string> = {
  footwear: '신발',
  apparel: '의류',
  outerwear: '아우터',
  tops: '탑&티셔츠',
  'hoodies-sweatshirts': '후디&스웻셔츠',
  shorts: '쇼츠',
  tights: '타이즈',
  accessories: '용품',
  hats: '모자',
  socks: '양말',
  'vests-belts': '베스트&벨트',
  'other-accessories': '기타 용품',
  'road running': '로드 러닝',
  'trail running': '트레일 러닝',
  'trail running & hiking': '트레일 러닝',
  '로드 러닝': '로드 러닝',
  러닝: '러닝',
  트레일: '트레일 러닝',
  하이킹: '하이킹',
  라이프스타일: '라이프스타일',
  워킹: '워킹',
  '스튜디오/피트니스': '스튜디오/피트니스',
};

const categoryGroupLabels: Record<string, string> = {
  footwear: '신발',
  sandals: '신발',
  apparel: '의류',
  outerwear: '의류',
  tops: '의류',
  'hoodies-sweatshirts': '의류',
  shorts: '의류',
  tights: '의류',
  accessories: '용품',
  hats: '용품',
  socks: '용품',
  'vests-belts': '용품',
  'other-accessories': '용품',
};

const activityTitleLabels: Record<string, string> = {
  'road-running': '로드러닝 러닝화',
  'trail-running': '트레일 러닝화',
  walking: '워킹화',
  training: '트레이닝화',
  hiking: '하이킹화',
};

const categoryTitleLabels: Record<string, string> = {
  footwear: '신발',
  apparel: '의류',
  outerwear: '아우터',
  tops: '탑&티셔츠',
  'hoodies-sweatshirts': '후디&스웻셔츠',
  shorts: '쇼츠',
  tights: '타이즈',
  accessories: '용품',
  hats: '모자',
  socks: '양말',
  'vests-belts': '베스트&벨트',
  'other-accessories': '기타 용품',
  'road running': '로드러닝 러닝화',
  'trail running': '트레일 러닝화',
  'trail running & hiking': '트레일 러닝화',
  '로드 러닝': '로드러닝 러닝화',
  러닝: '러닝화',
  트레일: '트레일 러닝화',
  하이킹: '하이킹화',
  라이프스타일: '라이프스타일 신발',
  워킹: '워킹화',
  '스튜디오/피트니스': '스튜디오/피트니스 신발',
};

type ListingRoute = {
  activity: string;
  category: string;
  gender: string;
  sort: string;
};

const normalizedKey = (value: string) => value.trim().toLowerCase();

export function getBreadcrumbItems({
  gender,
  category,
  activity,
  sort,
}: ListingRoute): BreadcrumbItem[] {
  const normalizedGender = normalizedKey(gender);
  const normalizedCategory = normalizedKey(category);
  const genderBreadcrumb = genderBreadcrumbs[normalizedGender];
  const featuredListing = featuredListingMetadata[normalizedKey(sort)];
  const activityLabel = activityBreadcrumbLabels[normalizedKey(activity)];
  const categoryLabel = categoryBreadcrumbLabels[normalizedCategory] ?? category;
  const categoryGroupLabel = categoryGroupLabels[normalizedCategory] ?? '신발';
  const currentLabel = activityLabel ?? categoryLabel;

  if (!genderBreadcrumb) {
    return currentLabel
      ? [
          { label: 'HOME', href: '/' },
          { label: '상품', href: '/products' },
          { label: currentLabel },
        ]
      : [{ label: 'HOME', href: '/' }, { label: '상품' }];
  }

  const genderHref = `/products?gender=${normalizedGender}`;

  if (featuredListing) {
    return [
      { label: genderBreadcrumb.label, href: genderHref },
      { label: 'Featured' },
      { label: featuredListing.breadcrumb },
    ];
  }

  const items: BreadcrumbItem[] = [
    { label: genderBreadcrumb.label, href: genderHref },
    { label: categoryGroupLabel },
  ];

  return currentLabel && currentLabel !== categoryGroupLabel
    ? [...items, { label: currentLabel }]
    : items;
}

export function getProductListingTitle({ gender, category, activity, sort }: ListingRoute) {
  const genderLabel = genderTitleLabels[normalizedKey(gender)];
  const featuredListing = featuredListingMetadata[normalizedKey(sort)];
  const productLabel =
    activityTitleLabels[normalizedKey(activity)] ??
    categoryTitleLabels[normalizedKey(category)] ??
    '';

  if (featuredListing) {
    const featuredGenderLabel = genderFeaturedTitleLabels[normalizedKey(gender)];

    return featuredGenderLabel
      ? `${featuredGenderLabel} ${featuredListing.title}`
      : featuredListing.title;
  }

  if (genderLabel && productLabel) return `${genderLabel} ${productLabel}`;
  if (genderLabel)
    return `${genderLabel} ${categoryGroupLabels[normalizedKey(category)] ?? '신발'}`;
  if (productLabel) return productLabel;

  return '상품 목록';
}
