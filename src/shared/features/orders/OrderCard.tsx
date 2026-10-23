import { OrderDeliveryStatus } from './OrderDeliveryStatus';
import { Stack } from 'styled-system/jsx';
import { OrderCardHeader } from './OrderCardHeader';
import { OrderHistoryProduct } from './OrderHistoryProduct';
import { OrderItemActions } from './OrderItemActions';
import { OrderClaimGroup } from './OrderClaimGroup';
import { getRemainingLines, orderStatusLabels } from './order-policy';
import type { OrderClaim, OrderLine, OrderRecord } from './orders.types';

export type OrderCardActions = {
  onDetail: (order: OrderRecord) => void;
  onClaim: (order: OrderRecord) => void;
  onTracking: (order: OrderRecord) => void;
  onConfirm: (order: OrderRecord) => void;
  onClaimDetail: (order: OrderRecord, claim: OrderClaim) => void;
  onAddToCart?: (line: OrderLine) => void;
};

/** 주문 한 건의 상품·상태·후속 처리 액션을 구성합니다. (Composes products, status, and follow-up actions for an order.) */
export function OrderCard({ order, ...actions }: { order: OrderRecord } & OrderCardActions) {
  const items = getRemainingLines(order);
  return (
    <Stack as="li" gap="6" listStyleType="none">
      <OrderCardHeader order={order} onDetail={() => actions.onDetail(order)} />
      {items.length ? (
        <>
          <OrderDeliveryStatus
            label={orderStatusLabels[order.status]}
            expectedDate={order.expectedDate}
          />
          <Stack gap="4">
            {items.map((line) => (
              <OrderHistoryProduct key={line.key} line={line} onAddToCart={actions.onAddToCart} />
            ))}
          </Stack>
          <OrderItemActions
            order={order}
            onClaim={() => actions.onClaim(order)}
            onTracking={() => actions.onTracking(order)}
            onConfirm={() => actions.onConfirm(order)}
          />
        </>
      ) : null}
      {order.claims.map((claim) => (
        <OrderClaimGroup
          key={claim.id}
          order={order}
          claim={claim}
          onDetail={() => actions.onClaimDetail(order, claim)}
        />
      ))}
    </Stack>
  );
}
