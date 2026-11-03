/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 주문 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
export type OrderStatus =
  'paid' | 'preparing' | 'shipping' | 'delivered' | 'purchased' | 'cancelled' | 'returned';
export type ClaimKind = 'cancel' | 'return';
export type ClaimReason = '' | 'mind' | 'size' | 'damage' | 'wrong' | 'missing' | 'other';
export type OrderLine = {
  key: string;
  /** 한 주문 안에서 상품마다 다른 단계일 때 사용하는 표시 상태입니다. */
  displayStatus?: OrderStatus;
  displayExpectedDate?: string;
  productId: string;
  name: string;
  image: string;
  width: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  displayAmount?: number;
};

export type OrderClaim = {
  previewDisplay?: { web: ClaimDetailDisplay; mobile: ClaimDetailDisplay };
  refundMethod?: string;
  collection?: {
    name: string;
    phone: string;
    address: string;
    carrier: string;
    trackingNumber: string;
    scheduledDate: string;
  };
  id: string;
  kind: ClaimKind;
  state: 'requested' | 'complete';
  quantities: Record<string, number>;
  reason: Exclude<ClaimReason, ''>;
  details: string;
  requestedAt: string;
  completedAt?: string;
  fee: number;
  displayAmount?: number;
  displayRefund?: number;
};

export type ClaimDetailDisplay = {
  orderDate: string;
  orderNumber: string;
  status: string;
  requestedAt: string;
  claimNumber: string;
  completedAt: string;
  refundedAt: string;
  reason: string;
  details: string;
  itemAmount: number;
  productAmount: number;
  fee: number;
  refund: number;
  feeNote?: string;
};

export type OrderRecord = {
  id: string;
  date: string;
  expectedDate: string;
  status: OrderStatus;
  items: OrderLine[];
  claims: OrderClaim[];
  displayAmounts?: {
    total: number;
    claimed: number;
    remaining: number;
  };
  claimKind?: ClaimKind;
  returnPolicy?: {
    freeReturn?: boolean;
    freeReturnCouponId?: string;
  };
  /** 주문상세 시안의 PC·모바일 고정 표시값입니다. 실제 주문 데이터에는 사용하지 않습니다. */
  detailPreview?: {
    web: OrderDetailPreview;
    mobile: OrderDetailPreview;
  };
};

export type OrderDetailPreview = {
  date: string;
  orderNumber: string;
  itemAmount: number;
  itemQuantity: number;
  productAmount: number;
  discountAmount: number;
  shippingAmount: number;
  payableAmount: number;
  claimRequestedAt: string;
  claimRefundAmount: number;
  returnLineCount?: number;
};

export type OrdersView = 'list' | 'detail' | 'claim';
export type OrdersPeriod = '1' | '3' | '6' | '12' | 'custom';
export type OrderFilters = {
  period: OrdersPeriod;
  start: string;
  end: string;
  query: string;
};
