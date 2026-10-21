import { Stack } from 'styled-system/jsx';
import { AmountRow } from './AmountRow';

export function CouponAmountSummary({ total, discount }: { total: number; discount: number }) {
  return (
    <Stack gap="4" bg="black.10" p="4">
      <AmountRow label="총 상품금액" amount={total} />
      <AmountRow label="할인 금액" amount={discount} discount />
      <AmountRow label="결제 예정 금액" amount={total - discount} emphasis />
    </Stack>
  );
}
