import { ClaimAmountBreakdown } from './ClaimAmountBreakdown';
import { Stack } from 'styled-system/jsx';
import { AmountRow } from '@/shared/components/molecules/AmountRow/AmountRow';

/** 신청 상품 금액과 수수료·예상 환불액을 표시합니다. (Displays claim product amounts, fees, and estimated refund.) */
export function ClaimAmountSummary({
  amount,
  fee,
  refund,
  kind,
}: {
  amount: number;
  fee: number;
  refund: number;
  kind: 'cancel' | 'return';
}) {
  return (
    <Stack gap="0" border="1px solid var(--colors-black-20)">
      <ClaimAmountBreakdown amount={amount} fee={fee} />
      <AmountRow
        p="4"
        bg="black.10"
        label={kind === 'cancel' ? '취소예정금액' : '환불예정금액'}
        amount={refund}
        emphasis
      />
    </Stack>
  );
}
