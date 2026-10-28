'use client';

import { useState } from 'react';
import { ConfirmDialog } from '@/shared/components/molecules/ConfirmDialog/ConfirmDialog';
import { OrdersContent } from './OrdersContent';
import { OrderClaimSheet } from './OrderClaimSheet';
import { OrderTrackingDialog } from './OrderTrackingDialog';
import { previewOrders } from './orders.data';
import {
  getOrderStatusItems,
  filterOrders,
  getClaimKind,
  getPeriodStart,
  submitOrderClaim,
} from './order-policy';
import type {
  ClaimKind,
  OrderClaim,
  OrderFilters,
  OrderLine,
  OrderRecord,
  OrdersView,
} from './orders.types';

type Props = {
  initialOrders?: readonly OrderRecord[];
  initialView?: OrdersView;
  initialClaimKind?: ClaimKind;
  returns?: boolean;
  onAddToCart?: (line: OrderLine) => void;
};

/** 주문 조회와 상세 진입·신청·구매확정의 상태를 관리합니다. (Manages order history navigation, claims, and purchase confirmation.) */
export function OrdersPage({
  initialOrders = previewOrders,
  initialView = 'list',
  initialClaimKind,
  returns = false,
  onAddToCart,
}: Props) {
  const [orders, setOrders] = useState(() => [...initialOrders]);
  const [view, setView] = useState<OrdersView>(initialView);
  const [selectedId, setSelectedId] = useState(initialOrders[0]?.id);
  const [claimId, setClaimId] = useState(initialOrders[0]?.claims[0]?.id);
  const [sheet, setSheet] = useState<{ id: string; kind: ClaimKind } | null>(() =>
    initialClaimKind && initialOrders[0]
      ? { id: initialOrders[0].id, kind: initialClaimKind }
      : null,
  );
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ id: string; kind: 'delete' | 'purchase' } | null>(null);
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState<OrderFilters>({
    period: '1',
    start: '2026-09-23',
    end: '2026-10-23',
    query: '',
  });
  const [dates, setDates] = useState({ start: '2026-09-23', end: '2026-10-23' });
  const [error, setError] = useState('');
  const baseOrders = returns ? orders.filter((order) => order.claims.length > 0) : orders;
  const visibleOrders = filterOrders(baseOrders, filters);
  const selectedOrder = orders.find((order) => order.id === selectedId);
  const selectedClaim = selectedOrder?.claims.find((claim) => claim.id === claimId);
  const sheetOrder = orders.find((order) => order.id === sheet?.id);
  const trackingOrder = orders.find((order) => order.id === trackingId);
  const showList = () => {
    setView('list');
    setMessage('');
  };
  const showDetail = (order: OrderRecord) => {
    setSelectedId(order.id);
    setView('detail');
    setMessage('');
  };
  const showClaim = (order: OrderRecord, claim: OrderClaim) => {
    setSelectedId(order.id);
    setClaimId(claim.id);
    setView('claim');
    setMessage('');
  };

  return (
    <OrdersContent
      orders={visibleOrders}
      statusItems={getOrderStatusItems(baseOrders)}
      view={view}
      selectedOrder={selectedOrder}
      selectedClaim={selectedClaim}
      returns={returns}
      filters={filters}
      dates={dates}
      error={error}
      message={message}
      onPeriodChange={(period) => {
        setError('');
        if (period !== 'custom') {
          const start = getPeriodStart(Number(period), filters.end);
          setDates((previous) => ({ ...previous, start, end: filters.end }));
          setFilters((previous) => ({ ...previous, period, start, end: previous.end }));
          return;
        }
        setFilters((previous) => ({ ...previous, period }));
      }}
      onDateChange={(key, value) => {
        setDates((previous) => ({ ...previous, [key]: value }));
        setFilters((previous) => ({ ...previous, period: 'custom' }));
      }}
      onDateSearch={() => {
        if (!dates.start || !dates.end || dates.start > dates.end) {
          setError('조회 기간을 다시 확인해 주세요.');
          return;
        }
        setError('');
        setFilters((previous) => ({ ...previous, ...dates }));
      }}
      onQueryChange={(query) => setFilters((previous) => ({ ...previous, query }))}
      onDetail={showDetail}
      onClaimDetail={showClaim}
      onList={showList}
      onClaim={(order) => {
        const kind = getClaimKind(order.status);
        if (kind) setSheet({ id: order.id, kind });
      }}
      onTracking={(order) => setTrackingId(order.id)}
      onConfirm={(order) => setConfirm({ id: order.id, kind: 'purchase' })}
      onDelete={() => {
        if (selectedOrder) setConfirm({ id: selectedOrder.id, kind: 'delete' });
      }}
      onAddToCart={(line) => {
        onAddToCart?.(line);
        setMessage('장바구니에 상품을 담았습니다.');
      }}
      dialogs={
        <>
          {sheet && sheetOrder ? (
            <OrderClaimSheet
              key={`${sheet.id}-${sheet.kind}`}
              order={sheetOrder}
              kind={sheet.kind}
              onClose={() => setSheet(null)}
              onSubmit={(draft) => {
                const result = submitOrderClaim(
                  sheetOrder,
                  sheet.kind,
                  draft.quantities,
                  draft.reason,
                  draft.details,
                  '2026-10-23',
                );
                if (!result.ok) return result.error;
                setOrders((previous) =>
                  previous.map((order) => (order.id === result.order.id ? result.order : order)),
                );
                setSheet(null);
                setMessage(
                  `${sheet.kind === 'cancel' ? '주문 취소' : '환불(반품)'} 신청이 접수되었습니다.`,
                );
                return null;
              }}
            />
          ) : null}
          {trackingOrder ? (
            <OrderTrackingDialog order={trackingOrder} onClose={() => setTrackingId(null)} />
          ) : null}
          <ConfirmDialog
            open={Boolean(confirm)}
            onOpenChange={(open) => {
              if (!open) setConfirm(null);
            }}
            title={confirm?.kind === 'delete' ? '주문 내역 삭제' : '구매 확정'}
            closeLabel="확인 닫기"
            onConfirm={() => {
              if (!confirm) return;
              setOrders((previous) =>
                confirm.kind === 'delete'
                  ? previous.filter((order) => order.id !== confirm.id)
                  : previous.map((order) =>
                      order.id === confirm.id ? { ...order, status: 'purchased' } : order,
                    ),
              );
              setConfirm(null);
              setView('list');
              setMessage(
                confirm.kind === 'delete' ? '주문 내역을 삭제했습니다.' : '구매가 확정되었습니다.',
              );
            }}
          >
            {confirm?.kind === 'delete'
              ? '주문 내역을 삭제하시겠습니까?'
              : '상품을 수령하셨나요? 구매를 확정하시겠습니까?'}
          </ConfirmDialog>
        </>
      }
    />
  );
}
