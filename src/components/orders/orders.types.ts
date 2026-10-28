export type OrderStatus =
  'paid' | 'preparing' | 'shipping' | 'delivered' | 'purchased' | 'cancelled' | 'returned';

export type ClaimKind = 'cancel' | 'return';

export type ClaimReason = '' | 'mind' | 'size' | 'damage' | 'wrong';

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
};

export type OrdersView = 'list' | 'detail' | 'claim';

export type OrdersPeriod = '1' | '3' | '6' | '12' | 'custom';

export type OrderFilters = { period: OrdersPeriod; start: string; end: string; query: string };
