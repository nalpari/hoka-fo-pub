'use client';

import { useState } from 'react';

import { Stack } from 'styled-system/jsx';

import { Dropdown, type DropdownOption } from '@/components/common/atoms/Dropdown';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';

import { checkoutCouponOptions } from '@/app/checkout/checkout-coupons';

const amounts = {
  product: 350000,
  discount: 0,
  shipping: 0,
  total: 350000,
};

/** 주문 금액과 쿠폰 선택 결과를 요약합니다. (Summarizes order amounts and coupon selection.) */
export function CheckoutDiscountSummary() {
  const [coupon, setCoupon] = useState('none');
  const options: readonly DropdownOption[] = checkoutCouponOptions;

  return (
    <Stack gap="4">
      <Stack gap="3">
        <AmountRow label="상품가격" amount={amounts.product} />
        <AmountRow label="쿠폰할인" amount={amounts.discount} discount />
        <Dropdown
          ariaLabel="보유 쿠폰 선택"
          label="쿠폰"
          options={options}
          value={coupon || 'none'}
          onValueChange={setCoupon}
        />
        <AmountRow label="배송비" amount={amounts.shipping} />
      </Stack>
      <AmountRow
        label="총 결제금액"
        amount={amounts.total}
        emphasis
        emphasizeLabel
        p="4"
        bg="black.10"
        borderTop="1px solid var(--colors-black-20)"
      />
      <Stack gap="1" pt="1">
        <Typography variant="body5" tone="tertiary">
          - 쿠폰 보유 시 최대 할인 쿠폰으로 자동 적용됩니다.
        </Typography>
        <Typography variant="body5" tone="tertiary">
          - 정상 상품과 세일 상품을 함께 결제 시 쿠폰 적용 가능 상품에만 쿠폰이 적용됩니다.
        </Typography>
      </Stack>
    </Stack>
  );
}
