import type { Product } from '@/mocks/products';

export const productDetailPreviews = [
  { state: 'apparel', label: '의류 기본' },
  { state: 'inquiries-expanded', label: '신발 · 상품문의 펼침' },
  { state: 'sale', label: '할인가' },
  { state: 'partial-stock', label: '일부 사이즈 품절' },
  { state: 'sold-out', label: '전체 품절' },
  { state: 'options-selected', label: '옵션 선택' },
  { state: 'options-scroll', label: '옵션 선택 · 최대 높이' },
  { state: 'cart-added', label: '장바구니 추가 완료' },
  { state: 'cart-added-scroll', label: '장바구니 추가 완료 · 최대 높이' },
] as const;

export type ProductDetailPreview =
  | (typeof productDetailPreviews)[number]['state']
  | 'empty-inquiries'
  | 'restock'
  | 'selection-required';

const apparelImage = (id: number) => `/images/products/everyrun/pdp-${id}.png`;

// [ 개발팀 바인딩 ] 의류·할인·품절과 아래 선택/완료 값은 PDP 인계용 표시 데이터입니다.
// 상세 통합 소유자가 상품별 이미지, 옵션과 가격, 선택 항목/합계 및 추가 완료 응답을 공급합니다.
// 구매 요청의 pending, 실패 시 선택 유지·재시도, 성공 후 장바구니 갱신은 통합 소유자가 관리합니다.
export function prepareProductDetailPreview(
  product: Product,
  preview?: ProductDetailPreview,
): Product {
  if (preview === 'apparel') {
    return {
      ...product,
      id: 'everyrun',
      name: 'EveryRun 긴팔티',
      gender: "Women's",
      promotion: ['Best', 'Exclusive'],
      price: 109000,
      styleCode: '1175857',
      colors: ['Black', 'Pink', 'Red', 'Blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      soldOut: ['XXL'],
      colorOptions: undefined,
      galleryImages: [94538, 94539, 94540, 94541, 94542, 94543].map(apparelImage),
      primaryImage: apparelImage(94538),
      hoverImage: apparelImage(94539),
      colorThumbnails: [
        { id: 'BLK', label: 'Black', image: apparelImage(94538) },
        { id: 'PNK', label: 'Pink', image: apparelImage(94650) },
        { id: 'RED', label: 'Red', image: apparelImage(94653) },
        { id: 'BLU', label: 'Blue', image: apparelImage(94655) },
      ],
      detailDescription:
        '회복 훈련부터 유지 훈련까지, 피부에 직접 닿는 레이어 역할을 하는 EveryRun 긴팔 티셔츠는 일상 훈련에 가장 적합한 아이템으로 빠르게 자리 잡았습니다. 통기성과 땀 흡수 기능이 뛰어난 FlyLite™ 소재로 제작되었으며, 혁신적인 측면 통풍구로 최상의 활동성을 보장합니다. 반사 로고와 세련된 엄지손가락 구멍으로 마무리된 이 긴팔 티셔츠는 처음부터 끝까지 가볍고 쾌적한 착용감을 선사합니다.',
    };
  }
  if (preview === 'sale') return { ...product, originalPrice: 290000, discountLabel: '20%' };
  if (preview !== 'partial-stock' && preview !== 'restock' && preview !== 'sold-out') {
    return product;
  }

  return {
    ...product,
    colorOptions: product.colorOptions?.map((option, index) => ({
      ...option,
      widths: option.widths.map((width, widthIndex) => ({
        ...width,
        soldOut:
          preview === 'sold-out'
            ? width.sizes
            : index === 0 && widthIndex === 0
              ? ['295', '300']
              : width.soldOut,
      })),
    })),
  };
}

export const apparelFeatures = [
  { image: apparelImage(94559), title: '재활용 소재로 제작된 통기성 좋은 FlyLite™ 소재' },
  { image: apparelImage(94564), title: '슬림핏 실루엣' },
  { image: apparelImage(94569), title: '밑단 절개 디테일' },
  { image: apparelImage(94574), title: '리플렉티브 로고 디자인' },
];

const addedItem = {
  color: '(19)Black',
  size: '250',
  width: 'Regular',
  quantity: 1,
  amount: 139000,
};

export const cartAddedPreviewItems = [addedItem, { ...addedItem, quantity: 2 }];

const selectedOptions = [
  { color: 'Black / Outer Orbit', size: '250', quantity: 1, amount: 240000 },
  { color: 'Varsity Navy / Burnt Red', size: '255', quantity: 2, amount: 480000 },
];

export function getSelectedOptionsPreview(preview?: ProductDetailPreview) {
  if (preview !== 'options-selected' && preview !== 'options-scroll') return [];
  return preview === 'options-selected'
    ? selectedOptions
    : ['220', '225', '230', '235', '240', '245', '250', '255'].map((size) => ({
        ...selectedOptions[0],
        size,
      }));
}
