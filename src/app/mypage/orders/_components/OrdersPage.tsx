'use client';

import { useState } from 'react';

import { previewOrders } from '@/components/orders/orders.data';
import type {
  OrderClaim,
  OrderFilters,
  OrderRecord,
  OrdersView,
} from '@/components/orders/orders.types';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { OrderClaimRequest } from './OrderClaimRequest';
import { OrderTrackingDialog } from './OrderTrackingDialog';
import { OrdersContent } from './OrdersContent';

export type OrdersPageProps = {
  initialOrders?: readonly OrderRecord[];
  initialView?: OrdersView;
  initialClaimKind?: 'cancel' | 'return';
  initialOverlay?: 'tracking' | 'purchase' | 'delete';
  returns?: boolean;
};

const previewOrderStatusItems = [
  { label: '전체', count: 3 },
  { label: '결제완료', count: 2 },
  { label: '상품준비중', count: 0 },
  { label: '배송준비\n/ 배송중', count: 0 },
  { label: '배송완료\n/ 구매확정', count: 1 },
];

/** [ 개발팀 바인딩 ] 현재 화면은 주문 표시 fixture와 로컬 UI 탐색으로 구성합니다. 실제 주문 조회·신청 데이터와 요청 처리는 주문 기능 소유자가 이 화면의 표시 데이터·식별자·입력 payload를 연결하고 응답 후 목록을 갱신해야 합니다. */
/** 고정된 주문 표시 데이터와 화면 확인용 로컬 탐색을 구성합니다. (Composes fixed order display data and local view navigation.) */
export function OrdersPage({
  initialOrders,
  initialView = 'list',
  initialClaimKind,
  initialOverlay,
  returns = false,
}: OrdersPageProps) {
  const orders =
    initialOrders ??
    (returns ? previewOrders.filter((order) => order.claims.length) : previewOrders);
  const [view, setView] = useState<OrdersView>(initialView);
  const [selectedId, setSelectedId] = useState(orders[0]?.id);
  const [claimId, setClaimId] = useState(
    orders[0]?.claims.find((claim) => !initialClaimKind || claim.kind === initialClaimKind)?.id,
  );
  const [request, setRequest] = useState<{ orderId: string; kind: 'cancel' | 'return' } | null>(
    initialClaimKind && orders[0] ? { orderId: orders[0].id, kind: initialClaimKind } : null,
  );
  const requestOrder = orders.find((order) => order.id === request?.orderId);
  const [trackingId, setTrackingId] = useState<string | null>(
    initialOverlay === 'tracking' ? (orders[0]?.id ?? null) : null,
  );
  const [confirmOpen, setConfirmOpen] = useState(
    initialOverlay === 'purchase' || initialOverlay === 'delete',
  );
  const [filters, setFilters] = useState<OrderFilters>({
    period: returns ? 'custom' : '1',
    start: returns ? '2026-01-01' : '2026-09-23',
    end: returns ? '2026-08-30' : '2026-10-23',
    query: '',
  });
  const [dates, setDates] = useState({
    start: returns ? '2026-01-01' : '2026-09-23',
    end: returns ? '2026-08-30' : '2026-10-23',
  });
  const selectedOrder = orders.find((order) => order.id === (selectedId ?? orders[0]?.id));
  const selectedClaim = selectedOrder?.claims.find(
    (claim) => claim.id === claimId && (!initialClaimKind || claim.kind === initialClaimKind),
  );
  const trackingOrder = orders.find((order) => order.id === trackingId);
  const showList = () => {
    setView('list');
  };
  const showDetail = (order: OrderRecord) => {
    setSelectedId(order.id);
    setView('detail');
  };
  const showClaim = (order: OrderRecord, claim: OrderClaim) => {
    setSelectedId(order.id);
    setClaimId(claim.id);
    setView('claim');
  };

  return (
    <OrdersContent
      orders={orders}
      statusItems={initialOrders ? [] : previewOrderStatusItems}
      view={view}
      selectedOrder={selectedOrder}
      selectedClaim={selectedClaim}
      returns={returns}
      filters={filters}
      dates={dates}
      onPeriodChange={(period) => {
        setFilters((previous) => ({ ...previous, period }));
      }}
      onDateChange={(key, value) => {
        setDates((previous) => ({ ...previous, [key]: value }));
        setFilters((previous) => ({ ...previous, period: 'custom' }));
      }}
      onDateSearch={() => setFilters((previous) => ({ ...previous, ...dates, period: 'custom' }))}
      onDetail={showDetail}
      onClaimDetail={showClaim}
      onList={showList}
      onCancel={(order) => setRequest({ orderId: order.id, kind: 'cancel' })}
      onReturn={(order) => setRequest({ orderId: order.id, kind: 'return' })}
      onTracking={(order) => setTrackingId(order.id)}
      dialogs={
        <>
          {requestOrder && request ? (
            <OrderClaimRequest
              key={`${requestOrder.id}-${request.kind}`}
              order={requestOrder}
              kind={request.kind}
              onClose={() => setRequest(null)}
            />
          ) : null}
          {trackingOrder ? (
            <OrderTrackingDialog order={trackingOrder} onClose={() => setTrackingId(null)} />
          ) : null}
          <ModalDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title={initialOverlay === 'delete' ? '주문 내역 삭제' : '구매 확정'}
            closeLabel="확인 닫기"
            size="sm"
            actions={{ kind: 'confirm', onConfirm: () => setConfirmOpen(false) }}
          >
            {initialOverlay === 'delete'
              ? '주문 내역을 삭제하시겠습니까?'
              : '상품을 수령하셨나요? 구매를 확정하시겠습니까?'}
          </ModalDialog>
        </>
      }
    />
  );
}
