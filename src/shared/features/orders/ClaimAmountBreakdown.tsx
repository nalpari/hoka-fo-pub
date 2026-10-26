import { Stack } from 'styled-system/jsx';
import { AmountRow } from '@/shared/components/molecules/AmountRow/AmountRow';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

/** 신청 상품금액과 반품비 또는 사유 선택 안내를 표시합니다. (Displays claim product amount and fee or the reason selection hint.) */
export function ClaimAmountBreakdown({ amount, fee }: { amount: number; fee: number }) {
  return (
    <Stack p="4" gap="3">
      <AmountRow label="상품금액" amount={amount} />
      {amount ? (
        <AmountRow label="반품비" amount={fee} discount />
      ) : (
        <Typography variant="body5" tone="subtle">
          사유 선택 후 확인
        </Typography>
      )}
    </Stack>
  );
}
