'use client';

import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { Drawer } from '@base-ui/react/drawer';
import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { usePlatform } from '@/context/platform';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';
import { StepIndicator } from '@/components/common/molecules/StepIndicator/StepIndicator';
import { OrderInformationSection } from './OrderInformationSection';
import { OrderTrackingHistory } from './OrderTrackingHistory';
import type { OrderRecord } from './orders.types';

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
        titleProps={{ variant: 'heading6' }}
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
        {content}
      </SingleActionDialog>
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
                <IconButton aria-label="배송조회 닫기" onClick={onClose} size={24}>
                  <Icon name="close" size={16} />
                </IconButton>
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
