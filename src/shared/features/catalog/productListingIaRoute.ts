import { screens } from '@/data/screenRegistry';

const activityValues: Record<string, string> = {
  '로드 러닝': 'road-running',
  '트레일 러닝': 'trail-running',
  라이프스타일: 'lifestyle',
  하이킹: 'hiking',
  워킹: 'walking',
  리커버리: 'recovery',
};

const featuredSortValues: Record<string, string> = {
  BEST: 'popular',
  NEW: 'new',
  'Coming Soon': 'coming-soon',
};

const categoryValues: Record<string, string> = {
  신발: 'footwear',
  의류: 'apparel',
  상의: 'tops',
  하의: 'shorts',
  용품: 'accessories',
  모자: 'hats',
  양말: 'socks',
  '베스트&벨트': 'vests-belts',
  기타: 'other-accessories',
};

export function getProductListingIaKey(iaNumber: number) {
  return `ia-${iaNumber}`;
}

export function getProductListingRoute(iaKey?: string) {
  if (!iaKey) return undefined;

  const iaNumber = Number(iaKey?.replace(/^ia-/, ''));
  const screen = screens.find((candidate) => candidate.iaNumber === iaNumber);

  if (!screen || screen.screenCode !== 'eland_hca_01') return undefined;

  const [depth1, depth2, depth3] = screen.depths;
  const query = new URLSearchParams();
  const gender = depth1 === 'MEN' ? 'men' : depth1 === 'WOMEN' ? 'women' : '';
  const shoesGender =
    depth1 === 'SHOES' ? (depth2 === '남성' ? 'men' : depth2 === '여성' ? 'women' : '') : '';
  const resolvedGender = gender || shoesGender;

  if (resolvedGender) query.set('gender', resolvedGender);

  if (depth2 === 'Featured') {
    const sort = featuredSortValues[depth3];
    if (sort) query.set('sort', sort);
  } else if (depth2 === '액티비티') {
    const activity = activityValues[depth3];
    if (activity) query.set('activity', activity);
  } else if (depth2 === '신발' || depth2 === '의류' || depth2 === '용품') {
    const category = categoryValues[depth3 === '전체보기' ? depth2 : depth3];
    if (category) query.set('category', category);

    if (depth2 === '신발') {
      const activity = activityValues[depth3];
      if (activity) query.set('activity', activity);
    }
  } else if (depth1 === 'SHOES') {
    query.set('category', 'footwear');

    const activity = activityValues[depth3];
    if (activity) query.set('activity', activity);
  }

  const queryString = query.toString();
  return queryString ? `/products?${queryString}` : '/products';
}
