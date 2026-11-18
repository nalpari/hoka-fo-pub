import type { ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { Stack } from 'styled-system/jsx';

import type { DateRangeSearchProps } from '@/components/common/molecules/DateRangeSearch';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import type {
  ClaimHistoryItem,
  OrderClaim,
  OrderRecord,
  OrdersView,
} from '@/components/orders/orders.types';

import { OrderClaimDetail, OrderDetail } from './OrderDetails';
import { OrdersListContent } from './OrdersList';
import type { OrderCardActions } from './OrdersProducts';
import type { OrderStatusItem } from './OrdersStatus';

type OrdersContentProps = OrderCardActions & {
  dateSearch: DateRangeSearchProps;
  orders: readonly OrderRecord[];
  claimHistoryItems: readonly ClaimHistoryItem[];
  onHistoryDetail: (orderId: string, claimId: string) => void;
  statusItems: OrderStatusItem[];
  view: OrdersView;
  selectedOrder?: OrderRecord;
  selectedClaim?: OrderClaim;
  returns: boolean;
  dialogs: ReactNode;
  onList: () => void;
};

/** 주문 목록·주문 상세·신청 상세 화면을 공통 골격 안에 구성합니다. (Composes order list, order detail, and claim detail views.) */
export function OrdersContent({
  view,
  selectedOrder,
  selectedClaim,
  returns,
  dialogs,
  onList,
  ...props
}: OrdersContentProps) {
  const platform = usePlatform();
  const title =
    view === 'claim'
      ? selectedClaim?.kind === 'cancel'
        ? '취소 상세'
        : '반품 상세'
      : view === 'detail'
        ? '주문 상세'
        : returns
          ? '취소/반품내역'
          : '주문/배송조회';
  return (
    <MyPageFrame
      activePath={returns ? '/mypage/returns' : '/mypage/orders'}
      breadcrumbs={[{ label: title }]}
    >
      <Stack gap="0">
        <ContentSection
          title={title}
          headerProps={{ titleAs: 'h1', titleProps: { web: 'heading6', mo: 'heading5' } }}
          gap={
            view === 'claim' || returns
              ? { base: '40px', _mobile: '24px' }
              : view === 'list'
                ? { base: '40px', _mobile: '32px' }
                : { base: '40px', _mobile: '16px' }
          }
          _mobile={{ pt: '24px' }}
        >
          {view === 'claim' && selectedOrder && selectedClaim ? (
            <OrderClaimDetail
              display={selectedClaim.detailDisplay[platform === 'mobile' ? 'mobile' : 'web']}
              claim={selectedClaim}
              onList={onList}
            />
          ) : view === 'detail' && selectedOrder ? (
            <OrderDetail
              display={selectedOrder.detailDisplay[platform === 'mobile' ? 'mobile' : 'web']}
              onList={onList}
              onDetail={() => props.onDetail(selectedOrder)}
              onTracking={() => props.onTracking(selectedOrder)}
              onClaimDetail={(claimId) => {
                const claim = selectedOrder.claims.find((item) => item.id === claimId);
                if (claim) props.onClaimDetail(selectedOrder, claim);
              }}
            />
          ) : (
            <OrdersListContent {...props} returns={returns} />
          )}
          {dialogs}
        </ContentSection>
      </Stack>
    </MyPageFrame>
  );
}
