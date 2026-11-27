import { type Product, products } from '@/mocks/products';
import type { CartItem } from '@/types/cart';

export type CartPreviewRow = {
  item: CartItem;
  product: Product;
  amount: number;
  soldOut: boolean;
  initialSelected: boolean;
  originalAmount?: number;
  mobileAmount?: number;
  initialFavorite?: boolean;
  optionQuantity?: number;
  optionPreview?: { item: CartItem; product: Product; unavailableColors?: readonly string[] };
};

const optionColors = [
  '(19)Black',
  'Beige',
  'White',
  'Black / Purple',
  'Blue',
  'Sand',
  'Grey',
  'Purple',
  'Sky Blue',
];

/** 옵션 모달 시안용 표시 데이터입니다. (Display data for the option dialog preview.) */
export const cartOptionPreview: { item: CartItem; product: Product } = {
  item: { ...cartPreviewItem(), color: optionColors[0], size: '250' },
  product: {
    ...products[0],
    name: 'Clifton 11 GTX',
    colors: optionColors,
    sizes: Array.from({ length: 17 }, (_, index) => String(220 + index * 5)),
    soldOut: ['295', '300'],
    colorThumbnails: optionColors.map((label, index) => ({
      id: `preview-${index + 1}`,
      label,
      image: `/images/cart/options/color-${index < 5 ? index + 1 : index - 3}.png`,
    })),
    colorOptions: undefined,
  },
};

/** 의류 옵션 시안용 고정 표시 데이터입니다. (Fixed apparel display data for the option preview.) */
export const cartApparelOptionPreview: { item: CartItem; product: Product } = {
  item: { ...cartPreviewItem(), id: 'everyrun', color: '(19)Black', size: 'S' },
  product: {
    ...products[0],
    id: 'everyrun',
    name: 'EveryRun 긴팔티',
    colors: ['(19)Black', 'Pink', 'Red', 'Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    soldOut: ['L'],
    colorOptions: undefined,
    colorThumbnails: [94538, 94650, 94653, 94655].map((id, index) => ({
      id: `apparel-${index}`,
      label: ['(19)Black', 'Pink', 'Red', 'Blue'][index],
      image: `/images/products/everyrun/pdp-${id}.png`,
    })),
  },
};

function cartPreviewItem(): CartItem {
  return {
    id: products[0].id,
    imageSrc: '/images/cart/clifton-preview.png',
    color: '브라운',
    width: 'Regular',
    size: '235',
    quantity: 1,
  };
}

/**
 * [ 개발팀 바인딩 ]
 * 퍼블리싱용 고정 상품·금액·품절 예시입니다. 선택·수량 변경으로 금액을 계산하지 않습니다.
 * 실제 상품/옵션 식별자와 표시 금액·재고 상태, 삭제·저장·주문 요청은 개발팀 장바구니 소유자에서 연결합니다.
 * 요청 성공/실패/pending 및 목록 갱신은 미연결이며 이 예시는 ShopShell 상태를 읽거나 변경하지 않습니다.
 */
export const cartPreviewRows: CartPreviewRow[] = [0, 1, 2, 3, 4].map((index) => ({
  item: {
    ...cartPreviewItem(),
    id: `cart-shoe-${index + 1}`,
    width: '레귤러',
    imageSrc: '/images/cart/speedgoat-black.png',
    quantity: index === 0 || index === 4 ? 2 : 1,
  },
  product: { ...products[0], name: 'Speedgoat 7 GTX', gender: 'All Gender' },
  amount: 240000,
  mobileAmount: index === 4 ? 139000 : undefined,
  originalAmount: index === 1 ? 280000 : undefined,
  soldOut: index > 2,
  initialSelected: index < 3,
  initialFavorite: index === 1,
  optionQuantity: 1,
  optionPreview: { ...cartOptionPreview, unavailableColors: ['White'] },
}));

export const cartPreviewAmounts = {
  product: 349000,
  discount: 17450,
  shipping: 0,
  total: 331550,
  mobileTotal: 240000,
  selectedTotal: 240000,
};
