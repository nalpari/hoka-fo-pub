import { screens } from '@/data/screenRegistry';

const activityValues: Record<string, string> = {
  로드러닝: 'road-running',
  트레일러닝: 'trail-running',
  '로드 러닝': 'road-running',
  '트레일 러닝': 'trail-running',
  라이프스타일: 'lifestyle',
  하이킹: 'hiking',
  워킹: 'walking',
  리커버리: 'recovery',
};

const featuredSortValues: Record<string, string> = {
  Best: 'popular',
  New: 'new',
  Sale: 'sale',
  BEST: 'popular',
  NEW: 'new',
  'Coming Soon': 'coming-soon',
};

const categoryValues: Record<string, string> = {
  러닝웨어: 'apparel',
  기타용품: 'other-accessories',
  의류: 'apparel',
  '러닝 웨어': 'apparel',
  아우터: 'outerwear',
  '탑&티셔츠': 'tops',
  '후디&스웻셔츠': 'hoodies-sweatshirts',
  쇼츠: 'shorts',
  타이즈: 'tights',
  용품: 'accessories',
  모자: 'hats',
  양말: 'socks',
  '베스트&벨트': 'vests-belts',
  '기타 용품': 'other-accessories',
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
    if (depth3 === 'Triple Black') query.set('color', 'black');
    if (depth3 === 'Ready for UTMB') query.set('collection', 'utmb');
    if (depth3 === '가을 러닝의 시작, Bondi') query.set('model', 'bondi');
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
    if (depth2 === '의류' && depth3 === '러닝웨어') query.set('activity', 'road-running');
    if (depth2 === '용품' && depth3 === '라이프스타일') {
      query.set('category', 'accessories');
      query.set('activity', 'lifestyle');
    }
  } else if (depth1 === 'SHOES') {
    if (depth2 === 'ICONS') {
      const models: Record<string, string> = {
        본디: 'bondi',
        클리프톤: 'clifton',
        스피드고트: 'speedgoat',
        마파테: 'mafate',
        호파라: 'hopara',
      };
      if (models[depth3]) query.set('model', models[depth3]);
    }
    const activity = activityValues[depth3];
    if (activity) query.set('activity', activity);
  }

  const queryString = query.toString();
  return queryString ? `/products?${queryString}` : '/products';
}
