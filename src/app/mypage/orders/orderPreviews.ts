export const orderPreviews = [
  {
    href: '/mypage/orders/preview-cancel-request',
    label: '주문 취소 신청',
    state: 'cancel',
  },
  {
    href: '/mypage/orders/preview-return-request',
    label: '반품 신청',
    state: 'return',
  },
  {
    href: '/mypage/orders/preview-tracking',
    label: '배송 조회',
    state: 'tracking',
  },
  {
    href: '/mypage/orders/preview-purchase-confirm',
    label: '구매 확정 확인',
    state: 'purchase',
  },
  {
    href: '/mypage/orders/preview-delete-confirm',
    label: '주문 삭제 확인',
    state: 'delete',
  },
  {
    href: '/mypage/orders/preview-delete-blocked',
    label: '주문 내역 삭제 차단',
    state: 'alert',
    notice: {
      message: '주문을 삭제할 수 없습니다',
      description: '취소나 환불이 진행중인 주문은 삭제할 수 없습니다.',
      descriptionContinuation: '완료 후 다시 신청해주세요.',
    },
  },
  {
    href: '/mypage/orders/preview-cart-sold-out',
    label: '품절 상품 장바구니 담기',
    state: 'alert',
    notice: {
      message: '장바구니에 추가할 수 없습니다.',
      description: '상품이 품절되어 장바구니에 추가할 수 없습니다.',
    },
  },
  {
    href: '/mypage/orders/preview-cart-added',
    label: '장바구니 담기 완료',
    state: 'alert',
    notice: {
      message: '장바구니에 추가되었습니다.',
      description: '상품을 장바구니에 추가하였습니다.',
    },
  },
] as const;

export type OrderAlertNotice = {
  message: string;
  description: string;
  descriptionContinuation?: string;
};
