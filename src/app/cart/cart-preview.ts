import { type Product, products } from '@/mocks/products';
import type { CartItem } from '@/types/cart';

export type CartPreviewRow = {
  item: CartItem;
  product: Product;
  amount: number;
  soldOut: boolean;
  initialSelected: boolean;
  optionPreview?: { item: CartItem; product: Product };
};

const optionColors = [
  '스타더스트 / 멜로우 라일락',
  '베이지',
  '화이트',
  '블랙 / 퍼플',
  '블루',
  '그레이',
  '민트',
  '블랙',
  '핑크',
  '네이비',
];

/** 옵션 모달 시안용 표시 데이터입니다. (Display data for the option dialog preview.) */
export const cartOptionPreview: { item: CartItem; product: Product } = {
  item: {
    ...cartPreviewItem(),
    color: optionColors[0],
    size: '250',
  },
  product: {
    ...products[0],
    name: '클리프톤 11 GTX',
    colors: optionColors,
    colorThumbnails: optionColors.map((label, index) => ({
      id: `preview-${index + 1}`,
      label,
      image: `/images/cart/options/color-${index === 7 ? 1 : index > 7 ? index : index + 1}.png`,
    })),
    colorOptions: undefined,
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
export const cartPreviewRows: CartPreviewRow[] = [
  {
    item: cartPreviewItem(),
    product: products[0],
    amount: 240000,
    soldOut: false,
    initialSelected: false,
    optionPreview: cartOptionPreview,
  },
  {
    item: {
      id: products[1].id,
      imageSrc: '/images/cart/clifton-preview.png',
      color: '레드',
      width: 'X-Wide',
      size: '225',
      quantity: 2,
    },
    product: products[1],
    amount: 288000,
    soldOut: false,
    initialSelected: false,
  },
  {
    item: {
      id: products[2].id,
      imageSrc: '/images/cart/clifton-preview.png',
      color: '화이트',
      width: 'Wide',
      size: '270',
      quantity: 5,
    },
    product: products[2],
    amount: 720000,
    soldOut: false,
    initialSelected: false,
  },
  {
    item: {
      id: products[3].id,
      imageSrc: '/images/cart/clifton-preview.png',
      color: '옐로우골드',
      width: 'X-Wide',
      size: '250',
      quantity: 4,
    },
    product: products[3],
    amount: 928000,
    soldOut: true,
    initialSelected: false,
  },
];

export const cartPreviewAmounts = {
  product: 3350000,
  shipping: 0,
  total: 3350000,
  selectedTotal: 1236500,
};
