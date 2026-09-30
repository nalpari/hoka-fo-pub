import type { BreadcrumbItem } from '@/shared/components/molecules/Breadcrumb/Breadcrumb';

const genderBreadcrumbs: Record<string, { label: string; productLabel: string }> = {
  men: { label: 'Men', productLabel: '남성 신발' },
  women: { label: 'Women', productLabel: '여성 신발' },
  kids: { label: 'Kids', productLabel: '키즈 신발' },
};

const genderTitleLabels: Record<string, string> = {
  men: '남성',
  women: '여성',
  kids: '키즈',
};

const activityBreadcrumbLabels: Record<string, string> = {
  'road-running': '로드 러닝',
  'trail-running': '트레일 러닝',
  walking: '워킹',
  training: '트레이닝',
  hiking: '하이킹',
};

const categoryBreadcrumbLabels: Record<string, string> = {
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

const activityTitleLabels: Record<string, string> = {
  'road-running': '로드러닝 러닝화',
  'trail-running': '트레일 러닝화',
  walking: '워킹화',
  training: '트레이닝화',
  hiking: '하이킹화',
};

const categoryTitleLabels: Record<string, string> = {
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
};

const normalizedKey = (value: string) => value.trim().toLowerCase();

export function getBreadcrumbItems({ gender, category, activity }: ListingRoute): BreadcrumbItem[] {
  const normalizedGender = normalizedKey(gender);
  const genderBreadcrumb = genderBreadcrumbs[normalizedGender];
  const activityLabel = activityBreadcrumbLabels[normalizedKey(activity)];
  const categoryLabel = categoryBreadcrumbLabels[normalizedKey(category)] ?? category;
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
  const items: BreadcrumbItem[] = [
    { label: genderBreadcrumb.label, href: genderHref },
    { label: genderBreadcrumb.productLabel },
  ];

  return currentLabel ? [...items, { label: currentLabel }] : items;
}

export function getProductListingTitle({ gender, category, activity }: ListingRoute) {
  const genderLabel = genderTitleLabels[normalizedKey(gender)];
  const productLabel =
    activityTitleLabels[normalizedKey(activity)] ??
    categoryTitleLabels[normalizedKey(category)] ??
    '';

  if (genderLabel && productLabel) return `${genderLabel} ${productLabel}`;
  if (genderLabel) return `${genderLabel} 신발`;
  if (productLabel) return productLabel;

  return '상품 목록';
}
