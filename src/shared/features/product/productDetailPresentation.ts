import type { Product } from '@/mocks/products';

export type ProductDetailSpecification = {
  label: string;
  value: string | readonly string[];
  help?: string;
  note?: string;
};

export type ProductTechnicalScaleData = {
  title: string;
  labels: readonly string[];
  level: 1 | 2 | 3 | 4 | 5;
  help?: string;
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
    help: '모든 신발의 미드솔에는 충격을 줄이고 발을 지지해 주는 쿠셔닝이 적용되어 있습니다. 쿠션의 두께와 단단함·부드러움 정도는 모델별로 다릅니다.',
  },
  {
    title: '안정성',
    labels: ['중립', '안정적', '높은 안정성'],
    level: 1,
    help: '나중에 추가 예정',
  },
  {
    title: '반발력',
    labels: ['자연스러운', '균형잡힌 쿠션', '강력한 추진'],
    level: 3,
    help: '나중에 추가 예정',
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
            help: '무게 관련 설명이 들어갑니다.\n무게 관련 설명이 들어갑니다.\n무게 관련 설명이 들어갑니다.',
          },
          {
            label: 'Heel-to-Toe Drop',
            value: '43/38mm (5mm)',
            help: '뒤꿈치와 앞꿈치의 높이 차이를 나타냅니다.',
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
