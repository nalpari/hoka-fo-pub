import { HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { OrderRecord } from './orders.types';

/** 주문 일자·번호와 상세 진입을 표시합니다. (Displays order identification and its detail action.) */
export function OrderCardHeader({
  order,
  onDetail,
  compact = false,
}: {
  order: OrderRecord;
  onDetail?: () => void;
  compact?: boolean;
}) {
  return (
    <HStack
      alignItems="flex-end"
      justifyContent="space-between"
      gap="2"
      pb="3"
      borderBottom="1px solid var(--colors-black-100)"
    >
      <Stack gap="1">
        <Typography variant={compact ? 'body4' : 'body2'} weight="semibold">
          {order.date.replaceAll('-', '.')}
        </Typography>
        <Typography variant="body5" tone="subtle">
          주문번호 {order.id}
        </Typography>
      </Stack>
      {onDetail ? (
        <Button variant="link" size="sm" onClick={onDetail}>
          상세보기
        </Button>
      ) : null}
    </HStack>
  );
}
