import { HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function CouponAmountSummary({ total, discount }: { total: number; discount: number }) {
  return (
    <Stack gap="4" bg="black.10" p="4">
      <HStack justifyContent="space-between">
        <Typography variant="body4">총 상품금액</Typography>
        <Typography variant="body4">{total.toLocaleString()}원</Typography>
      </HStack>
      <HStack justifyContent="space-between">
        <Typography variant="body4">할인 금액</Typography>
        <Typography variant="body4" className={css({ color: 'red.100' })}>
          - {discount.toLocaleString()}원
        </Typography>
      </HStack>
      <HStack justifyContent="space-between">
        <Typography variant="body4">결제 예정 금액</Typography>
        <Typography variant="body3" weight="semibold">
          {(total - discount).toLocaleString()}원
        </Typography>
      </HStack>
    </Stack>
  );
}
