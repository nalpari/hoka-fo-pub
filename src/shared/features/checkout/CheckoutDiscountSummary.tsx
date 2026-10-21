import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { AmountRow } from './AmountRow';

export function CheckoutDiscountSummary({
  total,
  discount,
  onCoupons,
}: {
  total: number;
  discount: number;
  onCoupons: () => void;
}) {
  return (
    <Stack gap="3">
      <Stack gap="3" border="1px solid var(--colors-black-20)">
        <AmountRow label="총 상품금액" amount={total} px="4" pt="4" />
        <AmountRow label="상품 할인금액" amount={0} px="4" />
        <AmountRow
          label="쿠폰"
          amount={discount}
          discount
          px="4"
          pb="1"
          action={
            <Button variant="link" size="sm" onClick={onCoupons}>
              조회하기
            </Button>
          }
        />
        <AmountRow
          label="총 결제 금액"
          amount={total - discount}
          emphasis
          emphasizeLabel
          p="4"
          bg="black.10"
          borderTop="1px solid var(--colors-black-20)"
        />
      </Stack>
      <Stack gap="1">
        <Typography variant="body5" tone="subtle">
          - 보유 쿠폰 조회에서 사용할 쿠폰을 선택할 수 있습니다.
        </Typography>
        <Typography variant="body5" tone="subtle">
          - 정상 상품과 세일 상품을 함께 결제 시 쿠폰 적용 가능 상품에만 쿠폰이 적용됩니다.
        </Typography>
        <Typography variant="body5" tone="subtle">
          - 할인 및 쿠폰 적용 후 실 결제금액의 최대 30%까지 마일리지 사용 가능합니다.
        </Typography>
        <Typography variant="body5" tone="subtle">
          - 마일리지는 5,000점 이상 보유 시 100점 단위로 사용 가능합니다.
        </Typography>
      </Stack>
    </Stack>
  );
}
