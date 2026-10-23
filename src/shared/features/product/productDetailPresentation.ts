import type { Product } from '@/mocks/products';

export type ProductDetailSpecification = { label: string; value: string };

export type ProductTechnicalScaleData = {
  title: string;
  labels: readonly string[];
  marker: 'start' | 'middle' | 'end';
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
  { title: '쿠셔닝', labels: ['반응성', '균형잡힌', '부드러움'], marker: 'end' },
  { title: '안정성', labels: ['중립', '안정적', '높은 안정성'], marker: 'start' },
  { title: '반발력', labels: ['자연스러운', '균형잡힌 쿠션', '강력한 추진'], marker: 'middle' },
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
>;

/** Prepare product-specific publishing data without coupling presentation to the mock catalogue. */
export function getProductDetailPresentation(product: ProductDetailInput) {
  const isClifton = product.styleCode === 'HOKADFG34S';

  return {
    specifications: isClifton
      ? [
          { label: '무게', value: '312g' },
          { label: 'Heel-to-Toe Drop', value: '43/38mm (5mm)' },
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
      { label: '상품명', value: product.name },
      { label: '품번', value: product.styleCode ?? '상품별 표기 참조' },
    ],
  };
}
