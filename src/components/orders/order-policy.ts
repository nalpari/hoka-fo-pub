/**
 * [개발팀 바인딩]
 * 이 모듈의 신청 가능 상태/수량과 getClaimAmount는 화면 검증 및 시안 계산입니다. 실제 승인·귀책·기한·비용 판단은 서버에서 다시 검증합니다.
 * 고객 귀책 반품비는 시안 5,000원, 회사 귀책/무료반품은 0원이며 기타 비용은 미확정입니다. 운영 금액은 OrdersContext.quoteClaim을 사용합니다.
 */

import type {
  ClaimKind,
  ClaimReason,
  OrderClaim,
  OrderFilters,
  OrderLine,
  OrderRecord,
  OrderStatus,
} from './orders.types.ts';

export const orderStatusLabels: Record<OrderStatus, string> = {
  paid: '결제완료',
  preparing: '상품준비중',
  shipping: '배송중',
  delivered: '배송완료',
  purchased: '구매확정',
  cancelled: '취소완료',
  returned: '반품완료',
};

export const claimReasonLabels = {
  mind: '단순변심',
  size: '사이즈가 맞지 않음',
  damage: '상품불량/파손',
  wrong: '오배송',
  missing: '구성품 누락',
  other: '기타',
} as const;

export function getRemainingLines(order: OrderRecord): OrderLine[] {
  return order.items.flatMap((line) => {
    const claimed = order.claims.reduce((sum, claim) => sum + (claim.quantities[line.key] ?? 0), 0);
    const quantity = Math.max(0, line.quantity - claimed);
    return quantity ? [{ ...line, quantity }] : [];
  });
}

export function getClaimLines(order: OrderRecord, claim: OrderClaim): OrderLine[] {
  return order.items.flatMap((line) =>
    claim.quantities[line.key] ? [{ ...line, quantity: claim.quantities[line.key] }] : [],
  );
}

export function getLinesAmount(items: readonly OrderLine[]) {
  return items.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

export function getOrderAmounts(order: OrderRecord) {
  return {
    total: getLinesAmount(order.items),
    claimed: order.claims.reduce(
      (sum, claim) => sum + getLinesAmount(getClaimLines(order, claim)),
      0,
    ),
    remaining: getLinesAmount(getRemainingLines(order)),
  };
}

export function getOrderStatusItems(orders: readonly OrderRecord[]) {
  return [
    { label: '전체', count: orders.length },
    {
      label: orderStatusLabels.paid,
      count: orders.filter((order) => order.status === 'paid').length,
    },
    {
      label: orderStatusLabels.preparing,
      count: orders.filter((order) => order.status === 'preparing').length,
    },
    {
      label: '배송준비\n/ 배송중',
      count: orders.filter((order) => order.status === 'shipping').length,
    },
    {
      label: '배송완료\n구매확정',
      count: orders.filter((order) => order.status === 'delivered' || order.status === 'purchased')
        .length,
    },
  ];
}

export function getClaimKind(status: OrderStatus): ClaimKind | null {
  if (status === 'paid') return 'cancel';
  if (status === 'delivered') return 'return';
  return null;
}

export function getClaimAmount(
  items: readonly OrderLine[],
  quantities: Record<string, number>,
  reason: ClaimReason,
  policy: {
    kind?: ClaimKind;
    freeReturn?: boolean;
    freeReturnCouponId?: string;
    otherFee?: number;
  } = {},
) {
  const amount = items.reduce((sum, line) => sum + line.price * (quantities[line.key] ?? 0), 0);
  // 시안용 계산입니다. 운영 반품은 quoteClaim의 서버 금액이 최종 기준입니다. 기타 귀책 비용을 임의로 0원 처리하지 않습니다.
  const free = policy.kind === 'cancel' || policy.freeReturn || !!policy.freeReturnCouponId;
  const fee =
    !amount || free
      ? 0
      : !reason
        ? null
        : reason === 'other'
          ? (policy.otherFee ?? null)
          : reason === 'mind' || reason === 'size'
            ? Math.min(5000, amount)
            : 0;
  return { amount, fee, refund: fee === null ? null : Math.max(0, amount - fee) };
}

export function submitOrderClaim(
  order: OrderRecord,
  kind: ClaimKind,
  quantities: Record<string, number>,
  reason: ClaimReason,
  details: string,
  now: string,
) {
  if (getClaimKind(order.status) !== kind)
    return { ok: false as const, error: '현재 주문 상태에서는 신청할 수 없습니다.' };
  const remaining = getRemainingLines(order);
  if (Object.values(quantities).some((quantity) => !Number.isInteger(quantity) || quantity < 0))
    return { ok: false as const, error: '신청 수량을 다시 확인해 주세요.' };
  const chosen = Object.entries(quantities).filter(([, quantity]) => quantity > 0);
  if (!chosen.length) return { ok: false as const, error: '신청할 상품을 선택해 주세요.' };
  if (
    chosen.some(
      ([key, quantity]) =>
        !Number.isInteger(quantity) ||
        quantity > (remaining.find((line) => line.key === key)?.quantity ?? 0),
    )
  ) {
    return { ok: false as const, error: '신청 수량을 다시 확인해 주세요.' };
  }
  if (!reason || !(reason in claimReasonLabels))
    return { ok: false as const, error: '사유를 선택해 주세요.' };
  const amounts = getClaimAmount(remaining, quantities, reason, { kind, ...order.returnPolicy });
  if (amounts.fee === null)
    return { ok: false as const, error: '반품비 확인이 필요합니다. 견적 서비스를 연결해 주세요.' };
  const claim: OrderClaim = {
    id: `${order.id}-${order.claims.length + 1}`,
    kind,
    state: 'requested',
    quantities: Object.fromEntries(chosen),
    reason,
    details: details.slice(0, 250),
    requestedAt: now,
    fee: amounts.fee,
  };
  return { ok: true as const, order: { ...order, claims: [...order.claims, claim] }, claim };
}

export function filterOrders(orders: readonly OrderRecord[], filters: OrderFilters) {
  const query = filters.query.trim().toLocaleLowerCase();
  return orders.filter(
    (order) =>
      (!filters.start || order.date >= filters.start) &&
      (!filters.end || order.date <= filters.end) &&
      (!query ||
        order.id.includes(query) ||
        order.items.some((item) => item.name.toLocaleLowerCase().includes(query))),
  );
}

export function getPeriodStart(months: number, end: string) {
  const date = new Date(`${end}T12:00:00Z`);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() - months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return date.toISOString().slice(0, 10);
}
