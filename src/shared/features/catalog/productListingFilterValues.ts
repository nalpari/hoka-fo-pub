type FilterValueLabels = Record<string, string>;

export const colorOptions = [
  { value: 'red', label: '레드', hex: '#f10b0b' },
  { value: 'blue', label: '블루', hex: '#357ab7' },
  { value: 'green', label: '그린', hex: '#48794b' },
  { value: 'orange', label: '오렌지', hex: '#f5a633' },
  { value: 'gray', label: '그레이', hex: '#99a1a7' },
  { value: 'black', label: '블랙', hex: '#111111' },
  { value: 'white', label: '화이트', hex: '#ffffff' },
  { value: 'pink', label: '핑크', hex: '#e43891' },
  { value: 'brown', label: '브라운', hex: '#5b4b3d' },
  { value: 'yellow', label: '옐로우', hex: '#fff94a' },
  { value: 'purple', label: '퍼플', hex: '#76127b' },
  { value: 'cream', label: '크림', hex: '#f4f3dc' },
] as const;

export const widthLabels = {
  regular: '레귤러',
  wide: '와이드',
  'x-wide': 'X-와이드',
} satisfies FilterValueLabels;

export const cushioningLabels = {
  balanced: '균형 있는',
  plush: '폭신한',
  responsive: '스피드 있는',
} satisfies FilterValueLabels;

export const stabilityLabels = { stable: '안정성', neutral: '뉴트럴' } satisfies FilterValueLabels;

export const genderLabels = { men: '남성', women: '여성' } satisfies FilterValueLabels;

export const activityLabels = {
  'road-running': '로드 러닝',
  'trail-running': '트레일 러닝',
  lifestyle: '라이프스타일',
  hiking: '하이킹',
  walking: '워킹',
  recovery: '리커버리',
} satisfies FilterValueLabels;

export const colorLabels = Object.fromEntries(
  colorOptions.map(({ value, label }) => [value, label]),
) satisfies FilterValueLabels;

export const sizeValues = [
  '220',
  '225',
  '230',
  '235',
  '240',
  '245',
  '250',
  '255',
  '260',
  '265',
  '270',
  '275',
  '280',
  '285',
  '290',
  '295',
  '300',
];

export const collectionValues = ['클리프톤', '아라히', '가비오타', '마하'];

export const runningTypeValues = ['데일리 러닝', '레이스 데이'];

export const productListingPriceRange = { min: 50000, max: 389000, defaultMax: 189000 };

export const valuesToLabels = (values: string[], labels: FilterValueLabels) =>
  values.map((value) => labels[value] ?? value);

export const labelsToValues = (labels: string[], values: FilterValueLabels) =>
  labels.map((label) => Object.entries(values).find(([, value]) => value === label)?.[0] ?? label);
