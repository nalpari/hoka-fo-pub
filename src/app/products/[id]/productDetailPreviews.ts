import type { Product } from '@/mocks/products';

export const restockPhoneRequiredNotice = {
  variant: 'confirm',
  message: '휴대폰 번호를 등록해주세요.',
  description: '입고알림신청을 위해서는 휴대폰 번호가 필요합니다.',
  nextStep: '[확인]을 누르면 회원정보수정 화면으로 이동합니다.',
} as const;

export const productDetailPreviews = [
  { state: 'share', label: '공유하기 팝업' },
  { state: 'inquiry-form', label: '상품 문의하기 팝업' },
  { state: 'apparel', label: '의류 기본' },
  { state: 'accessories', label: '용품 기본' },
  { state: 'socks', label: '양말 기본' },
  { state: 'socks-size-guide', label: '양말 사이즈 가이드 팝업' },
  { state: 'width-single', label: '발볼 1개 · 선택기 숨김' },
  { state: 'width-double', label: '발볼 2개' },
  { state: 'width-double-sold-out', label: '발볼 2개 · 1개 품절' },
  { state: 'width-triple', label: '발볼 3개' },
  { state: 'width-triple-sold-out', label: '발볼 3개 · 1개 품절' },
  { state: 'inquiries-expanded', label: '신발 · 상품문의 펼침' },
  { state: 'sale', label: '할인가' },
  { state: 'partial-stock', label: '일부 사이즈 품절' },
  { state: 'sold-out', label: '전체 품절' },
  { state: 'options-selected', label: '옵션 선택' },
  { state: 'options-scroll', label: '옵션 선택 · 최대 높이' },
  {
    state: 'quantity-limit',
    label: '상품 상세 · 수량 변경 제한',
    notice: {
      variant: 'alert',
      message: '수량을 변경할 수 없습니다.',
      description: '#개까지 구매 가능합니다.',
    },
  },
  {
    state: 'product-not-selected',
    label: '상품 상세 · 상품 미선택',
    notice: {
      variant: 'confirm',
      message: '상품이 선택되지 않았습니다.',
      description: '상품을 먼저 선택하고 진행해주세요.',
    },
  },
  {
    state: 'link-copied',
    label: '상품 상세 · 상품 주소 복사 완료',
    notice: {
      variant: 'alert',
      message: '주소를 복사하였습니다.',
      description: '상품의 주소를 클립보드에 복사하였습니다.',
    },
  },
  {
    state: 'restock-complete',
    label: '상품 상세 · 입고 알림 신청 완료',
    notice: {
      variant: 'alert',
      message: '입고 알림 신청되었습니다.',
      description: '상품의 입고가 추가되면 카카오톡으로 알려드리겠습니다.',
    },
  },
  {
    state: 'restock-confirm',
    label: '상품 상세 · 품절 상품 재입고 알림 신청 확인',
    notice: {
      variant: 'confirm',
      message: '품절된 상품입니다',
      description: '재입고 알림신청을 하시겠습니까?',
    },
  },
  {
    state: 'restock-phone-required',
    label: '상품 상세 · 입고 알림 휴대폰 번호 등록 안내',
    notice: restockPhoneRequiredNotice,
  },
  {
    state: 'cart-added',
    label: '상품 상세 · 장바구니 추가 완료',
    notice: {
      variant: 'alert',
      message: '장바구니에 추가되었습니다.',
      description: '상품을 장바구니에 추가하였습니다.',
    },
  },
] as const;

export type ProductDetailPreview =
  | (typeof productDetailPreviews)[number]['state']
  | 'empty-inquiries'
  | 'restock'
  | 'selection-required';

const widthPreviews: Partial<Record<ProductDetailPreview, { count: number; soldOut?: boolean }>> = {
  'width-single': { count: 1 },
  'width-double': { count: 2 },
  'width-double-sold-out': { count: 2, soldOut: true },
  'width-triple': { count: 3 },
  'width-triple-sold-out': { count: 3, soldOut: true },
};

const apparelImage = (id: number) => `/images/products/everyrun/pdp-${id}.png`;

// [ 개발팀 바인딩 ] 의류·할인·품절과 아래 선택/완료 값은 PDP 인계용 표시 데이터입니다.
// 상세 통합 소유자가 상품별 이미지, 옵션과 가격, 선택 항목/합계 및 추가 완료 응답을 공급합니다.
// 구매 요청의 pending, 실패 시 선택 유지·재시도, 성공 후 장바구니 갱신은 통합 소유자가 관리합니다.
export function prepareProductDetailPreview(
  product: Product,
  preview?: ProductDetailPreview,
): Product {
  // [ 개발팀 바인딩 ] 발볼 개수와 두 번째 발볼의 품절 표시는 IA 직접 확인용 fixture입니다.
  // 실제 상품의 발볼별 isSoldOut과 사이즈별 soldOut은 상세 통합 소유자가 현재 재고 표시 데이터에서 공급합니다.
  const widthPreview = preview && widthPreviews[preview];

  if (widthPreview) {
    return {
      ...product,
      colorOptions: product.colorOptions?.map((option) => ({
        ...option,
        widths: option.widths
          .slice(0, widthPreview.count)
          .map((width, index) =>
            widthPreview.soldOut && index === 1
              ? { ...width, isSoldOut: true, soldOut: [...width.sizes] }
              : width,
          ),
      })),
    };
  }

  if (preview === 'apparel') {
    return {
      ...product,
      id: 'everyrun',
      productKind: 'apparel',
      measurementChart: {
        sizes: ['XS(080)', 'S(085)', 'M(090)', 'L(095)', 'XL(100)', 'XXL(105)'],
        rows: [
          { label: '어깨너비', valuesCm: [32.5, 34, 35.5, 37, 38.5, 40] },
          { label: '소매길이', valuesCm: [83.5, 86, 88.5, 91, 93.5, 96] },
          { label: '가슴둘레', valuesCm: [115, 120, 125, 130, 135, 140] },
          { label: '전체길이', valuesCm: [66, 67, 69, 71, 73, 75] },
        ],
      },
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
      detailTitle: '어떤 날씨에도 쿠션감 있는 편안한 주행',
      detailDescription:
        '회복 훈련부터 유지 훈련까지, 피부에 직접 닿는 레이어 역할을 하는 EveryRun 긴팔 티셔츠는 일상 훈련에 가장 적합한 아이템으로 빠르게 자리 잡았습니다. 통기성과 땀 흡수 기능이 뛰어난 FlyLite™ 소재로 제작되었으며, 혁신적인 측면 통풍구로 최상의 활동성을 보장합니다. 반사 로고와 세련된 엄지손가락 구멍으로 마무리된 이 긴팔 티셔츠는 처음부터 끝까지 가볍고 쾌적한 착용감을 선사합니다.',
    };
  }
  if (preview === 'accessories') {
    const color = 'Varsity Navy / Gold';
    const galleryImages = [1, 2, 3, 4].map(
      (view) => `/images/products/hoka-run-hat/vgl-${view}.webp`,
    );
    return {
      ...product,
      id: 'accessories-preview',
      productKind: 'accessories',
      name: 'HOKA Run Hat',
      price: 39000,
      gender: 'All Gender',
      styleCode: '1164330',
      promotion: undefined,
      colors: [color],
      sizes: ['FREE'],
      soldOut: [],
      colorOptions: undefined,
      colorThumbnails: [{ id: 'VGL', label: color, image: galleryImages[0], galleryImages }],
      measurementChart: undefined,
      galleryImages,
      primaryImage: galleryImages[0],
      hoverImage: galleryImages[1],
      reviewCount: 0,
      detailTitle: undefined,
      detailDescription: 'HOKA의 러닝용 캡입니다.',
    };
  }
  if (preview === 'socks' || preview === 'socks-size-guide') {
    const galleryImages = [1, 2, 3, 4].map(
      (view) => '/images/products/merino-crew-sock/blk-' + view + '.webp',
    );
    return {
      ...product,
      id: 'merino-crew-sock',
      productKind: 'accessories',
      sizeGuide: 'socks',
      name: 'Merino Crew Sock',
      price: 39000,
      gender: 'All Gender',
      styleCode: '1178675',
      promotion: undefined,
      colors: ['Black'],
      sizes: ['S', 'M', 'L', 'XL'],
      soldOut: [],
      colorOptions: undefined,
      colorThumbnails: [{ id: 'BLK', label: 'Black', image: galleryImages[0], galleryImages }],
      measurementChart: undefined,
      galleryImages,
      primaryImage: galleryImages[0],
      hoverImage: galleryImages[1],
      reviewCount: 0,
      detailTitle: undefined,
      detailDescription: '메리노 울 혼방 소재를 사용한 남녀 공용 크루 길이 러닝 양말입니다.',
    };
  }
  if (preview === 'sale') return { ...product, originalPrice: 290000, discountLabel: '20%' };
  if (
    preview !== 'partial-stock' &&
    preview !== 'restock' &&
    preview !== 'restock-confirm' &&
    preview !== 'restock-complete' &&
    preview !== 'restock-phone-required' &&
    preview !== 'sold-out'
  ) {
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
