/**
 * [ 개발팀 바인딩 ]
 * 상품의 규격/기술 지표/에디토리얼 표시 모델입니다. 현재 특정 시안의 검증된 내용만 해당 상품에 적용하고 다른 상품으로 복제하지 않습니다.
 * BO 상품 상세를 연결할 때 specification/scales/features를 실제 상품 코드 기준으로 변환합니다. 아직 측정하지 않은 도움말/수치를 사실로 생성하지 않습니다.
 * specifications와 scales의 help는 항목별 안내 문구입니다. helpMaxWidth는 확인된 시안의 표시 폭이며, 줄바꿈은 툴팁에서 항목 구분에 사용합니다.
 */

import type { Product } from '@/mocks/products';

export type ProductDetailSpecification = {
  label: string;
  value: string | readonly string[];
  help?: string;
  helpMaxWidth?: number;
  note?: string;
};

export type ProductTechnicalScaleData = {
  title: string;
  labels: readonly string[];
  level: 1 | 2 | 3 | 4 | 5;
  help?: string;
  helpMaxWidth?: number;
};

export type ProductEditorialFeature = {
  image: string;
  title: string;
  description: string;
};

export const productDetailAnchors = [
  { id: 'product-details', label: '상품 정보' },
  { id: 'product-reviews', label: '리뷰' },
  { id: 'product-inquiries', label: '상품 문의' },
] as const;

const cliftonScales: readonly ProductTechnicalScaleData[] = [
  {
    title: '쿠셔닝',
    labels: ['반응성', '균형잡힌', '부드러움'],
    level: 5,
    helpMaxWidth: 375,
    help: [
      '① 탄탄함: 착지 시 쿠셔닝이 덜 눌려, 지면을 또렷하게 느낄 수 있습니다.',
      '② 균형 잡힌: 부드러움과 탄탄함 사이의 무난한 감촉으로, 데일리 러닝에 두루 어울립니다.',
      '③ 부드러운: 발이 깊게 감싸이듯 쿠션을 누르며, 푹신한 착지감을 제공합니다.',
    ].join('\n'),
  },
  {
    title: '안정성',
    labels: ['중립', '안정적', '높은 안정성'],
    level: 1,
    helpMaxWidth: 374,
    help: [
      '① 중립: 좌우 대칭형 쿠셔닝으로 불필요한 보정 없이 필요한 지지력을 제공합니다.',
      '② 안정적: 넓은 바닥 면적과 Active Foot Frame 기술로 균형 잡힌 안정감을 제공합니다.',
      '③ 높은 안정성: H-Frame™ 기술로 발이 안쪽으로 과도하게 기울어지는 것을 방지하여 안정적인 주행을 돕습니다.',
    ].join('\n'),
  },
  {
    title: '반발력',
    labels: ['자연스러운', '균형잡힌 쿠션', '강력한 추진'],
    level: 3,
    helpMaxWidth: 375,
    help: [
      '① 자연스러운: 신발의 개입이 강하지 않아, 내 페이스대로 편안하게 주행할 수 있습니다.',
      '② 균형 잡힌: 적당한 탄력이 더해져, 다양한 페이스에서 경쾌한 주행감이 느껴집니다.',
      '③ 강력한: 튀어오르듯 되돌려주는 힘으로, 빠른 페이스 유지를 돕는 주행감이 느껴집니다.',
    ].join('\n'),
  },
];

const cliftonFeatures: readonly ProductEditorialFeature[] = [
  {
    image: '/images/products/clifton-11-gtx/feature-upper.png',
    title: '프리미엄 어퍼',
    description: '편안한 착화감과 통기성을 위한 어퍼.',
  },
  {
    image: '/images/products/clifton-11-gtx/feature-detail.png',
    title: '더 정제된 디테일',
    description: '매일의 러닝을 위한 세심한 디테일.',
  },
  {
    image: '/images/products/clifton-11-gtx/feature-cushioning.png',
    title: '더 부드러운 착화감',
    description: '발을 편안하게 감싸는 쿠셔닝.',
  },
];

type ProductDetailInput = Pick<
  Product,
  'styleCode' | 'name' | 'runningType' | 'width' | 'cushioning' | 'stability'
> &
  Partial<Pick<Product, 'colors'>>;

/** Prepare product-specific publishing data without coupling presentation to the mock catalogue. */
export function getProductDetailPresentation(product: ProductDetailInput) {
  const isClifton = product.styleCode === 'HOKADFG34S';

  return {
    specifications: isClifton
      ? [
          {
            label: '무게',
            value: '312g',
            helpMaxWidth: 161,
            help: '신발 한 쪽 기준 무게입니다.\n*기준 사이즈\n남성 280mm / 여성 250mm',
          },
          {
            label: 'Heel-to-Toe Drop',
            value: '43/38mm (5mm)',
            helpMaxWidth: 271,
            help: [
              '힐투토 드롭은 신발의 뒤꿈치와 앞꿈치의 높이 차이를 의미합니다.',
              '① 높은 드롭: 뒤꿈치를 받쳐주며, 앞으로 굴러가듯 자연스러운 발구름을 만들어 줍니다.',
              '② 낮은 드롭: 맨발로 선 것처럼 평평한 자세에 가까운 착지감을 줍니다.',
            ].join('\n'),
          },
        ]
      : [
          { label: '용도', value: product.runningType },
          { label: '발볼', value: product.width },
        ],
    attributes: [
      { label: '쿠셔닝', value: product.cushioning },
      { label: '안정성', value: product.stability },
    ],
    scales: isClifton ? cliftonScales : [],
    features: isClifton ? cliftonFeatures : [],
    notice: [
      { label: '컬러', value: product.colors?.[0] ?? '상품별 표기 참조' },
      { label: '스타일코드', value: product.styleCode ?? '상품별 표기 참조' },
      { label: '발볼 넓이', value: product.width },
      {
        label: '소재',
        value: isClifton
          ? '겉감1: 폴리에스터 100% / 겉감2: 천연가죽(소) / 겉감3: 합성가죽 / 안감: 폴리에스터 92% + 천연가죽 3% + 합성가죽 5% / 창: 폴리에스터 / 겉감1: 폴리에스터 100% / 겉감2: 천연가죽(소) / 겉감3: 합성가죽'
          : '상품별 표기 참조',
      },
      { label: '제조국', value: isClifton ? 'CHINA' : '상품별 표기 참조' },
      { label: '제조년월', value: isClifton ? '2026년 12월' : '상품별 표기 참조' },
      {
        label: '제조자 또는 수입자',
        note: '(국내산은 제조자 표시, 수입산은 수입자 표시)',
        value: isClifton ? '(주)이랜드월드' : '상품별 표기 참조',
      },
      {
        label: '품질보증기간',
        value: isClifton
          ? '구매일로부터 1년간/그외 기준은 관련법 및 소비자분쟁해결 규정에 따름'
          : '상품별 표기 참조',
      },
    ],
  };
}
