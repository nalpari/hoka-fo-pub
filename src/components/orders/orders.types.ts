/**
 * [개발팀 바인딩]
 * OrderRecord.id는 주문, OrderLine.key는 주문 상품 행, productId는 상품 상세 식별자입니다. 신청 quantities는 key별 수량입니다.
 * price는 화면 금액 계산에 사용하는 행의 환불 대상 단가입니다. 실제 할인 배분/반품비/최종 환불은 quoteClaim의 서버 견적으로 확정합니다.
 * claims에는 실제 접수 id/상태/일자/선택 수량/사유/반품비를 매핑합니다. returnPolicy의 무료반품/쿠폰은 서버가 인정한 적용 정보만 전달합니다.
 */

export type OrderStatus =
  'paid' | 'preparing' | 'shipping' | 'delivered' | 'purchased' | 'cancelled' | 'returned';

export type ClaimKind = 'cancel' | 'return';

export type ClaimReason = '' | 'mind' | 'size' | 'damage' | 'wrong' | 'missing' | 'other';

export type OrderLine = {
  key: string;
  productId: string;
  name: string;
  image: string;
  width: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

export type OrderClaim = {
  id: string;
  kind: ClaimKind;
  state: 'requested' | 'complete';
  quantities: Record<string, number>;
  reason: Exclude<ClaimReason, ''>;
  details: string;
  requestedAt: string;
  completedAt?: string;
  fee: number;
};

export type OrderRecord = {
  id: string;
  date: string;
  expectedDate: string;
  status: OrderStatus;
  items: OrderLine[];
  claims: OrderClaim[];
  returnPolicy?: { freeReturn?: boolean; freeReturnCouponId?: string };
};

export type OrdersView = 'list' | 'detail' | 'claim';

export type OrdersPeriod = '1' | '3' | '6' | '12' | 'custom';

export type OrderFilters = { period: OrdersPeriod; start: string; end: string; query: string };
