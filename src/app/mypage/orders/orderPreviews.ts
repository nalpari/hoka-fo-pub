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
] as const;
