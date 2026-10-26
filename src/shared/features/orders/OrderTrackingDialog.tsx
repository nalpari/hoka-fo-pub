import { OrderTrackingHistory } from './OrderTrackingHistory';
import { Stack } from 'styled-system/jsx';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { StepIndicator } from '@/shared/components/molecules/StepIndicator/StepIndicator';
import { OrderInformationSection } from './OrderInformationSection';
import type { OrderRecord } from './orders.types';

/** 배송 단계·송장 정보와 상품 추적 이력을 표시합니다. (Displays delivery progress, shipment details, and tracking events.) */
export function OrderTrackingDialog({
  order,
  onClose,
}: {
  order: OrderRecord;
  onClose: () => void;
}) {
  const current = order.status === 'preparing' ? 1 : order.status === 'shipping' ? 2 : 4;
  return (
    <SingleActionDialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="배송조회"
      closeLabel="배송조회 닫기"
      confirmLabel="닫기"
      onConfirm={onClose}
      size="sm"
    >
      <Stack gap="8">
        <ContentHeader
          title={`${order.expectedDate} 도착예정`}
          titleAs="h2"
          titleProps={{ variant: 'body2', weight: 'semibold' }}
          textAlign="center"
        />
        <StepIndicator
          variant="connected"
          current={current}
          ariaLabel="배송 진행 단계"
          items={[
            { label: '배송예약' },
            { label: '상품이동중' },
            { label: '배송중' },
            { label: '배송완료' },
          ]}
        />
        <OrderInformationSection
          title="기본정보"
          items={[
            { term: '운송장번호', description: '0000-0000-0000' },
            { term: '상품정보', description: order.items[0]?.name },
            { term: '보내는 분', description: '홍**' },
            { term: '받는 분', description: '박**' },
            { term: '배송기사', description: '김감사 (010-1234-5678)' },
          ]}
        />
        <OrderTrackingHistory date={order.date} />
      </Stack>
    </SingleActionDialog>
  );
}
