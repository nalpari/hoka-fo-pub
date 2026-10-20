import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { CheckoutRow } from '@/shared/features/checkout/checkout-summary';
import { CheckoutProductList } from './CheckoutProductList';
import { CheckoutDiscountSummary } from './CheckoutDiscountSummary';

export function CheckoutSummary({
  rows,
  total,
  discount = 0,
  onCoupons,
}: {
  rows: readonly CheckoutRow[];
  total: number;
  discount?: number;
  onCoupons: () => void;
}) {
  return (
    <Stack as="section" gap="4">
      <Typography as="h2" web="heading9" mo="heading7">
        주문상품 정보 및 할인 적용
      </Typography>
      <CheckoutProductList rows={rows} />
      <Typography variant="body5" tone="subtle">
        * 상품수량 변경은 상품상세 또는 장바구니에서 하실 수 있습니다.
      </Typography>
      <CheckoutDiscountSummary total={total} discount={discount} onCoupons={onCoupons} />
    </Stack>
  );
}
