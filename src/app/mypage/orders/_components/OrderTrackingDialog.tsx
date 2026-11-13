import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { DataTable } from '@/components/common/atoms/DataTable';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { StepIndicator } from '@/components/common/molecules/StepIndicator';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import type { OrderRecord } from '@/components/orders/orders.types';

import { OrderInformationSection } from './OrderDetails';

const trackingTable = css({
  '&&': {
    tableLayout: 'fixed',
    fontSize: '12px',
    '& th, & td': { h: '40px', px: '4px', borderBottom: '1px solid var(--color-black-20)' },
    '& thead th': {
      h: '42px',
      bg: 'transparent',
      borderTop: '1px solid var(--color-black-100)',
      borderBottom: '1px solid var(--color-black-100)',
      fontWeight: 'normal',
    },
    '& tbody td + td': { borderLeft: '0' },
  },
});

/** 상품 배송 추적 표를 표시합니다. (Displays the shipment tracking history table.) */
function OrderTrackingHistory({ date }: { date: string }) {
  return (
    <ContentSection
      gap="12px"
      title="상품추적"
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'body3', weight: 'semibold' } }}
    >
      <DataTable caption="상품 배송 추적 이력" className={trackingTable}>
        <thead>
          <tr>
            {['처리장소', '상대장소', '구분', '처리일자'].map((label) => (
              <th key={label}>
                <Typography variant="body5">{label}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['옥천HUB', '군포HUB', '집하처리'],
            ['군포HUB', '대구동', '간선하차'],
          ].map(([place, destination, state]) => (
            <tr key={`${place}-${destination}`}>
              <td>{place}</td>
              <td>{destination}</td>
              <td>{state}</td>
              <td>
                {date}
                <br />
                11:31
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </ContentSection>
  );
}

/** 배송 단계·송장 정보와 상품 추적 이력을 표시합니다. (Displays delivery progress, shipment details, and tracking events.) */
export function OrderTrackingDialog({
  order,
  onClose,
}: {
  order: OrderRecord;
  onClose: () => void;
}) {
  const current =
    order.status === 'preparing'
      ? 2
      : order.status === 'shipping'
        ? 3
        : order.status === 'paid'
          ? 1
          : 4;
  const content = (
    <Stack gap="32px">
      <ContentHeader
        title={`${order.expectedDate} 도착예정`}
        titleAs="h2"
        titleProps={{ web: 'heading7', mo: 'heading5' }}
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
          { term: '보내는 분', description: '황**' },
          { term: '받는 분', description: '박**' },
          { term: '배송기사', description: '김길규 (010-1234-5678)' },
        ]}
      />
      <OrderTrackingHistory date={order.date} />
    </Stack>
  );

  return (
    <ModalDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="배송조회"
      closeLabel="배송조회 닫기"
      size="sm"
      mobilePresentation="bottomSheet"
      popupClassName={css({ h: '804px', _mobile: { h: 'auto' } })}
      headerProps={{ css: { h: '56px', flexShrink: '0' } }}
      actions={{ kind: 'single', label: '닫기', onConfirm: onClose }}
    >
      {content}
    </ModalDialog>
  );
}
