import type { CartItem } from '@/types/cart';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 주문 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
export type CheckoutRow = {
  item: CartItem;
  product: {
    id: string;
    name: string;
    price: number;
    primaryImage?: string;
  };
  amount: number;
  originalAmount?: number;
};

/** 주문서의 독립적인 시안 표시 데이터입니다. (Independent checkout display fixtures.) */
export const checkoutPreviewRows: CheckoutRow[] = [1, 2].map((index) => ({
  item: {
    id: `checkout-shoe-${index}`,
    imageSrc: '/images/cart/speedgoat-black.png',
    color: '브라운',
    width: '레귤러',
    size: '235',
    quantity: index === 1 ? 2 : 1,
  },
  product: {
    id: `checkout-shoe-${index}`,
    name: 'Speedgoat 7 GTX',
    price: 240000,
    primaryImage: '/images/cart/speedgoat-black.png',
  },
  amount: 240000,
  originalAmount: index === 1 ? 280000 : undefined,
}));

/** 모바일 주문서에 명시된 세 상품의 준비된 표시값입니다. */
export const mobileCheckoutPreviewRows: CheckoutRow[] = [1, 2, 3].map((index) => ({
  ...checkoutPreviewRows[0],
  item: { ...checkoutPreviewRows[0].item, id: `mobile-checkout-shoe-${index}`, quantity: 1 },
  originalAmount: 280000,
}));
