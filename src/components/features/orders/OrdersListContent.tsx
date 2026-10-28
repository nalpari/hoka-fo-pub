import type { OrderStatusItem } from '@/components/common/molecules/OrderStatusTracker/OrderStatusTracker';
import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { OrderStatusTracker } from '@/components/common/molecules/OrderStatusTracker/OrderStatusTracker';
import { EmptyState } from '@/components/common/atoms/EmptyState/EmptyState';
import { OrdersFilters, type OrdersFiltersProps } from './OrdersFilters';
import { OrderCard, type OrderCardActions } from './OrderCard';
import type { OrderRecord } from './orders.types';

type Props = OrdersFiltersProps &
  OrderCardActions & { orders: readonly OrderRecord[]; statusItems: OrderStatusItem[] };

const emptyOrderState = css({
  '& .empty-state__title': {
    fontSize: 'var(--font-sizes-14)',
    fontWeight: 'normal',
    lineHeight: 'body',
    color: 'var(--color-text-subtle)',
  },
});

/** 주문 현황·필터·주문 카드 목록과 빈 상태를 구성합니다. (Composes the order snapshot, filters, cards, and empty state.) */
export function OrdersListContent({ orders, statusItems, ...props }: Props) {
  return (
    <Stack gap="6">
      {/* 주문별 상태 건수를 요약합니다. (Summarizes order counts by status.) */}
      <OrderStatusTracker compact items={statusItems} />
      {/* 주문 기간과 상태 필터를 제공합니다. (Provides order date and status filters.) */}
      <OrdersFilters {...props} />
      {orders.length ? (
        <Stack as="ul" gap="10" listStyleType="none">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} {...props} />
          ))}
        </Stack>
      ) : (
        <Box minH="300px" className={emptyOrderState}>
          <EmptyState variant="standard" title="주문한 상품이 없습니다." />
        </Box>
      )}
    </Stack>
  );
}
