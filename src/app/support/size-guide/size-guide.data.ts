/**
 * [개발팀 바인딩]
 * GuideCategory는 value/label/image/measurements/steps/sizes 표시 모델입니다. 실제 측정표와 단위별 셀은 같은 품목/성별 기준으로 전달합니다.
 * 00 / 00~00은 미확정 시안 값입니다. 운영 사이즈표로 사용하기 전에 승인된 데이터로 바꾸고 cm/inch 변환 기준을 확인합니다.
 */

export type Gender = 'men' | 'women' | 'unisex';

export type Unit = 'cm' | 'inch';

export type GuideCategory = {
  value: string;
  label: string;
  image: string;
  measurements: readonly string[];
  steps: readonly string[];
  sizes: readonly string[];
};

export const genderOptions = [
  { value: 'men', label: '남성' },
  { value: 'women', label: '여성' },
  { value: 'unisex', label: '공용' },
] as const;

export const widthOptions = [
  { value: 'regular', label: '레귤러' },
  { value: 'wide', label: '와이드' },
  { value: 'extra-wide', label: 'X-와이드' },
] as const;

const apparelSizes = ['XS', 'S', 'M', 'L', 'XL'];

// The supplied wireframes use 00 / 00~00 for unconfirmed measurements.
// Keep those cells explicit placeholders until an approved size dataset is supplied.
export const guideCategories: readonly GuideCategory[] = [
  {
    value: 'shoes',
    label: '신발',
    image: 'shoes',
    measurements: ['발길이'],
    sizes: [],
    steps: [
      '종이 위에 양발의 윤곽을 따라 그려주세요.',
      '뒤꿈치 중앙부터 가장 긴 발가락 끝까지 직선으로 길이를 측정해 주세요.',
      '양발 중 더 긴 발을 기준으로 사이즈표에서 가장 가까운 사이즈를 선택해 주세요.',
    ],
  },
  {
    value: 'tops',
    label: '상의',
    image: 'tops',
    measurements: ['가슴', '허리', '엉덩이'],
    sizes: apparelSizes,
    steps: [
      '가슴의 가장 넓은 부분을 따라 줄자를 수평으로 둘러 측정해 주세요.',
      '허리의 가장 잘록한 부분을 따라 줄자를 둘러 측정해 주세요.',
      '엉덩이의 가장 넓은 부분을 따라 줄자를 수평으로 둘러 측정해 주세요.',
    ],
  },
  {
    value: 'bottoms',
    label: '하의',
    image: 'bottoms',
    measurements: ['허리', '엉덩이', '다리 안쪽길이'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    steps: [
      '허리의 가장 잘록한 부분을 따라 줄자를 둘러 측정해 주세요.',
      '엉덩이의 가장 넓은 부분을 따라 줄자를 수평으로 둘러 측정해 주세요.',
      '다리 안쪽의 가장 윗부분부터 발목까지 길이를 측정해 주세요.',
    ],
  },
  {
    value: 'vest',
    label: '러닝 베스트',
    image: 'vest',
    measurements: ['가슴'],
    sizes: apparelSizes,
    steps: ['가슴의 가장 넓은 부분을 따라 줄자를 수평으로 둘러 측정해 주세요.'],
  },
  {
    value: 'belt',
    label: '러닝 벨트',
    image: 'belt',
    measurements: ['허리'],
    sizes: apparelSizes,
    steps: ['벨트를 착용할 허리 부분을 따라 줄자를 수평으로 둘러 측정해 주세요.'],
  },
  {
    value: 'hat',
    label: '모자',
    image: 'hat',
    measurements: ['머리둘레'],
    sizes: ['S/M', 'L/XL', 'FREE'],
    steps: ['이마와 뒤통수의 가장 넓은 부분을 따라 머리둘레를 측정해 주세요.'],
  },
  {
    value: 'socks',
    label: '양말',
    image: 'socks',
    measurements: ['발길이'],
    sizes: apparelSizes,
    steps: ['뒤꿈치부터 가장 긴 발가락 끝까지 직선으로 발길이를 측정해 주세요.'],
  },
  {
    value: 'gloves',
    label: '장갑',
    image: 'gloves',
    measurements: ['손길이', '손너비'],
    sizes: apparelSizes,
    steps: [
      '손목부터 가장 긴 손가락 끝까지 손길이를 측정해 주세요.',
      '엄지를 제외한 손바닥의 가장 넓은 부분의 너비를 측정해 주세요.',
    ],
  },
];

export function shoeSizes(gender: Gender) {
  const start = gender === 'men' ? 250 : 220;
  const end = gender === 'unisex' ? 350 : gender === 'women' ? 280 : 300;
  return Array.from({ length: (end - start) / 5 + 1 }, (_, index) => start + index * 5);
}
