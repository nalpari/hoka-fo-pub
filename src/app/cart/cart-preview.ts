import { type Product, products } from '@/mocks/products';
import type { CartItem } from '@/types/cart';

export type CartPreviewRow = {
  item: CartItem;
  product: Product;
  amount: number;
  soldOut: boolean;
  initialSelected: boolean;
};

/**
 * [ 개발팀 바인딩 ]
 * 퍼블리싱용 고정 상품·금액·품절 예시입니다. 선택·수량 변경으로 금액을 계산하지 않습니다.
 * 실제 상품/옵션 식별자와 표시 금액·재고 상태, 삭제·저장·주문 요청은 개발팀 장바구니 소유자에서 연결합니다.
 * 요청 성공/실패/pending 및 목록 갱신은 미연결이며 이 예시는 ShopShell 상태를 읽거나 변경하지 않습니다.
 */
export const cartPreviewRows: CartPreviewRow[] = [
  {
    item: {
      id: products[0].id,
      imageSrc: '/images/cart/clifton-preview.png',
      color: '브라운',
      width: 'Regular',
      size: '235',
      quantity: 1,
    },
    product: products[0],
    amount: 240000,
    soldOut: false,
    initialSelected: true,
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
    initialSelected: true,
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
    soldOut: false,
    initialSelected: false,
  },
];

export const cartPreviewTotal = 528000;
