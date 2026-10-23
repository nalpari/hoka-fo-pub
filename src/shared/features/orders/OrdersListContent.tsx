import type { OrderStatusItem } from '@/shared/components/molecules/OrderStatusTracker/OrderStatusTracker';
import { Box, Stack } from 'styled-system/jsx';
import { OrderStatusTracker } from '@/shared/components/molecules/OrderStatusTracker/OrderStatusTracker';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { OrdersFilters, type OrdersFiltersProps } from './OrdersFilters';
import { OrderCard, type OrderCardActions } from './OrderCard';
import type { OrderRecord } from './orders.types';

type Props = OrdersFiltersProps &
  OrderCardActions & { orders: readonly OrderRecord[]; statusItems: OrderStatusItem[] };

/** 주문 현황·필터·주문 카드 목록과 빈 상태를 구성합니다. (Composes the order snapshot, filters, cards, and empty state.) */
export function OrdersListContent({ orders, statusItems, ...props }: Props) {
  return (
    <Stack gap="6">
      <OrderStatusTracker compact items={statusItems} />
      <OrdersFilters {...props} />
      {orders.length ? (
        <Stack as="ul" gap="10" listStyleType="none">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} {...props} />
          ))}
        </Stack>
      ) : (
        <Box minH="300px">
          <EmptyState variant="minimal" title="주문한 상품이 없습니다." />
        </Box>
      )}
    </Stack>
  );
}
