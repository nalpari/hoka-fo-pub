'use client';

import { useState } from 'react';

import type { DateRangeValue } from '@/components/common/molecules/dateRange';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import type { OrderAlertNotice } from '@/app/mypage/orders/orderPreviews';
import { previewClaimHistory, previewOrders } from '@/components/orders/orders.data';
import type {
  ClaimHistoryItem,
  OrderClaim,
  OrderRecord,
  OrdersView,
} from '@/components/orders/orders.types';

import { OrderClaimRequest } from './OrderClaimRequest';
import { OrdersContent } from './OrdersContent';
import { OrderTrackingDialog } from './OrderTrackingDialog';

export type OrdersPageProps = {
  initialOrders?: readonly OrderRecord[];
  /** 외부 표시 데이터 사용 시 목록 행도 함께 전달합니다. 현재 props를 그대로 표시합니다. */
  claimHistoryItems?: readonly ClaimHistoryItem[];
  initialView?: OrdersView;
  initialClaimKind?: 'cancel' | 'return';
  initialOverlay?: 'tracking' | 'purchase' | 'delete' | OrderAlertNotice;
  returns?: boolean;
};

const previewOrderStatusItems = [
  { label: '전체', count: 3 },
  { label: '결제완료', count: 2 },
  { label: '상품준비중', count: 0 },
  { label: '배송준비\n/ 배송중', count: 0 },
  { label: '배송완료\n/ 구매확정', count: 1 },
];

/** [ 개발팀 바인딩 ] 현재 화면은 주문 표시 fixture와 로컬 UI 탐색으로 구성합니다. dateRange는 편집 초안이며 DateRangeSearch의 onValueChange가 period/start/end를 함께 갱신합니다. 조회는 미연결이며 실제 주문 기능 소유자가 dateSearch.onSearch에 전체 기간 payload를 받는 요청을 연결해야 합니다. 요청 실패 시 초안을 유지하고 pending/오류를 표시하며 성공 시 목록/count를 갱신하고 오래된 응답을 버리는 책임도 해당 소유자에 있습니다. */
/** [ 개발팀 바인딩 ] initialOverlay의 안내 문구는 고정 preview이며 확인은 팝업만 닫습니다. 주문 기능 소유자가 주문 ID로 삭제 가능 여부를 확인하고 상품·옵션 ID로 장바구니 요청을 연결합니다. 연결 시 요청 중 중복을 막고 실패나 품절 후 재시도를 관리하며, 추가 성공 응답 후에 완료 안내와 장바구니 갱신을 처리합니다. */
/** 고정된 주문 표시 데이터와 화면 확인용 로컬 탐색을 구성합니다. (Composes fixed order display data and local view navigation.) */
export function OrdersPage({
  initialOrders,
  claimHistoryItems,
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
  const alert = typeof initialOverlay === 'object' ? initialOverlay : undefined;
  const [noticeOpen, setNoticeOpen] = useState(
    Boolean(alert) || initialOverlay === 'purchase' || initialOverlay === 'delete',
  );
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    period: 'custom',
    start: '2026-01-01',
    end: '2026-08-30',
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
      claimHistoryItems={claimHistoryItems ?? (initialOrders ? [] : previewClaimHistory)}
      onHistoryDetail={(orderId, claimId) => {
        setSelectedId(orderId);
        setClaimId(claimId);
        setView('claim');
      }}
      statusItems={previewOrderStatusItems}
      view={view}
      selectedOrder={selectedOrder}
      selectedClaim={selectedClaim}
      returns={returns}
      dateSearch={{ value: dateRange, onValueChange: setDateRange }}
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
          {alert ? (
            <ModalDialog
              variant="alert"
              open={noticeOpen}
              onOpenChange={setNoticeOpen}
              title="주문/배송 조회"
              closeLabel="주문/배송 조회 안내 닫기"
              message={alert.message}
              description={
                <>
                  {alert.description}
                  {alert.descriptionContinuation && (
                    <>
                      <br />
                      {alert.descriptionContinuation}
                    </>
                  )}
                </>
              }
              actions={{ kind: 'single', onConfirm: () => setNoticeOpen(false) }}
            />
          ) : (
            <ModalDialog
              variant="confirm"
              open={noticeOpen}
              onOpenChange={setNoticeOpen}
              title={initialOverlay === 'delete' ? '주문 내역 삭제' : '구매 확정'}
              closeLabel="확인 닫기"
              actions={{ kind: 'confirm', onConfirm: () => setNoticeOpen(false) }}
              message={
                initialOverlay === 'delete'
                  ? '주문 내역을 삭제하시겠습니까?'
                  : '상품을 수령하셨나요? 구매를 확정하시겠습니까?'
              }
            />
          )}
        </>
      }
    />
  );
}
