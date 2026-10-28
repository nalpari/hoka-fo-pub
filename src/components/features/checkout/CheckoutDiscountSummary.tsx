import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { Dropdown } from '@/components/common/atoms/Dropdown/Dropdown';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { AmountRow } from '@/components/common/molecules/AmountRow/AmountRow';
import { Flex, Stack } from 'styled-system/jsx';
import { checkoutCouponOptions } from './checkout-coupons';
import { checkoutShippingFee } from './checkout-summary';

/** 주문 금액과 쿠폰 선택 결과를 요약합니다. (Summarizes order amounts and coupon selection.) */
export function CheckoutDiscountSummary({
  total,
  discount,
  itemCount,
  coupon,
  maxBenefit,
  onCouponChange,
  onMaxBenefitChange,
}: {
  total: number;
  discount: number;
  itemCount: number;
  coupon: string;
  maxBenefit: boolean;
  onCouponChange: (coupon: string) => void;
  onMaxBenefitChange: (checked: boolean) => void;
}) {
  return (
    <Stack gap="4">
      <Stack gap="3" border="1px solid var(--colors-black-20)">
        <AmountRow label={`주문금액 (상품 ${itemCount}개)`} amount={total} px="4" pt="4" />
        <AmountRow label="상품 할인금액" amount={0} px="4" />
        <Stack gap="2" px="4">
          <Flex justifyContent="flex-end">
            <Checkbox
              label="최대 혜택 적용"
              checked={maxBenefit}
              onCheckedChange={onMaxBenefitChange}
            />
          </Flex>
          <Dropdown
            ariaLabel="쿠폰 선택"
            label="쿠폰"
            required
            value={coupon}
            onValueChange={(value) => onCouponChange(value)}
            options={checkoutCouponOptions}
          />
        </Stack>
        <AmountRow label="쿠폰 할인금액" amount={discount} discount px="4" />
        <AmountRow label="배송비" amount={checkoutShippingFee} px="4" />
        <AmountRow
          label="총 결제 금액"
          amount={total - discount + checkoutShippingFee}
          emphasis
          emphasizeLabel
          p="4"
          bg="black.10"
          borderTop="1px solid var(--colors-black-20)"
        />
      </Stack>
      <Stack gap="1">
        <Typography variant="body5" tone="subtle">
          - 쿠폰 보유 시 최대 할인 쿠폰으로 자동 적용됩니다.
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
