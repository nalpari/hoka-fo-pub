import type { OrderStatusItem } from '@/shared/components/molecules/OrderStatusTracker/OrderStatusTracker';
import type { ReactNode } from 'react';
import { OrdersLayout } from './OrdersLayout';
import { OrdersListContent } from './OrdersListContent';
import { OrderDetail } from './OrderDetail';
import { OrderClaimDetail } from './OrderClaimDetail';
import type { OrdersFiltersProps } from './OrdersFilters';
import type { OrderCardActions } from './OrderCard';
import type { OrderClaim, OrderRecord, OrdersView } from './orders.types';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';

type Props = OrdersFiltersProps &
  OrderCardActions & {
    orders: readonly OrderRecord[];
    statusItems: OrderStatusItem[];
    view: OrdersView;
    selectedOrder?: OrderRecord;
    selectedClaim?: OrderClaim;
    returns: boolean;
    message: string;
    dialogs: ReactNode;
    onList: () => void;
    onDelete: () => void;
  };

/** 주문 목록·주문 상세·신청 상세 화면을 공통 골격 안에 구성합니다. (Composes order list, order detail, and claim detail views.) */
export function OrdersContent({
  view,
  selectedOrder,
  selectedClaim,
  returns,
  message,
  dialogs,
  onList,
  onDelete,
  ...props
}: Props) {
  const title =
    view === 'claim'
      ? selectedClaim?.kind === 'cancel'
        ? '취소 상세'
        : '반품 상세'
      : view === 'detail'
        ? '주문 상세'
        : returns
          ? '취소/반품 조회'
          : '주문/배송 조회';
  return (
    <OrdersLayout title={title} returns={returns}>
      {message ? <StatusMessage tone="success">{message}</StatusMessage> : null}
      {view === 'claim' && selectedOrder && selectedClaim ? (
        <OrderClaimDetail order={selectedOrder} claim={selectedClaim} onList={onList} />
      ) : view === 'detail' && selectedOrder ? (
        <OrderDetail {...props} order={selectedOrder} onList={onList} onDelete={onDelete} />
      ) : (
        <OrdersListContent {...props} />
      )}
      {dialogs}
    </OrdersLayout>
  );
}
