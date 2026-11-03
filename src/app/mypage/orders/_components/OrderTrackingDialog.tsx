import { Drawer } from '@base-ui/react/drawer';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { DataTable } from '@/components/common/atoms/DataTable';
import { Icon } from '@/components/common/atoms/Icon';
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
    '& th, & td': { h: '40px', px: '1', borderBottom: '1px solid var(--color-black-20)' },
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
      gap="3"
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

const backdrop = css({
  pos: 'fixed',
  inset: '0',
  zIndex: '110',
  bg: 'color-mix(in srgb, var(--color-black-100) 50%, transparent)',
});

const viewport = css({
  pos: 'fixed',
  inset: '0',
  zIndex: '110',
  display: 'flex',
  alignItems: 'flex-end',
});

const popup = css({ w: '100%', minW: '0' });

/** 배송 단계·송장 정보와 상품 추적 이력을 표시합니다. (Displays delivery progress, shipment details, and tracking events.) */
export function OrderTrackingDialog({
  order,
  onClose,
}: {
  order: OrderRecord;
  onClose: () => void;
}) {
  const platform = usePlatform();
  const current =
    order.status === 'preparing'
      ? 2
      : order.status === 'shipping'
        ? 3
        : order.status === 'paid'
          ? 1
          : 4;
  const content = (
    <Stack gap="8">
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

  if (platform !== 'mobile') {
    return (
      <ModalDialog
        open
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        title="배송조회"
        closeLabel="배송조회 닫기"
        size="md"
        popupClassName={css({ h: '804px' })}
        headerProps={{ css: { h: '56px', flexShrink: '0' } }}
        actions={{ kind: 'single', label: '닫기', onConfirm: onClose }}
      >
        {content}
      </ModalDialog>
    );
  }

  return (
    <Drawer.Root open onOpenChange={(open) => !open && onClose()} swipeDirection="down">
      <Drawer.Portal className={`platform-${platform}`}>
        <Drawer.Backdrop className={backdrop} />
        <Drawer.Viewport className={viewport}>
          <Drawer.Popup aria-label="배송조회" className={popup}>
            <Stack
              gap="0"
              maxH="calc(100dvh - 44px)"
              overflow="hidden"
              borderRadius="20px 20px 0 0"
              bg="white.0"
            >
              <HStack
                as="header"
                flexShrink="0"
                h="56px"
                justifyContent="space-between"
                px="6"
                borderBottom="1px solid var(--color-black-20)"
              >
                <Typography as="h2" variant="body4">
                  배송조회
                </Typography>
                <Button variant="icon" aria-label="배송조회 닫기" onClick={onClose} size={24}>
                  <Icon name="close" size={16} />
                </Button>
              </HStack>
              <Box minH="0" flex="1" overflowY="auto" overscrollBehaviorY="contain" px="6" py="8">
                {content}
              </Box>
              <Box as="footer" flexShrink="0" p="4" borderTop="1px solid var(--color-black-20)">
                <Button variant="primary" size="tall" fullWidth onClick={onClose}>
                  닫기
                </Button>
              </Box>
            </Stack>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
