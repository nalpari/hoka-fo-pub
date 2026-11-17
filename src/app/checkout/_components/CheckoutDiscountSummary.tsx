'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';

import { CheckoutCouponDialog } from './CheckoutCouponDialog';

/** 주문 금액과 보유 쿠폰 조회 UI를 표시합니다. (Displays prepared order totals and the coupon lookup interface.) */
export function CheckoutDiscountSummary({
  initialCouponOpen = false,
}: {
  initialCouponOpen?: boolean;
}) {
  const [open, setOpen] = useState(initialCouponOpen);
  const mobile = usePlatform() === 'mobile';
  // [ 개발팀 바인딩 ] 주문금액·할인·합계는 시안별 고정 표시이며 쿠폰 초안과 재계산하지 않습니다. 실제 쿠폰 적용 후 견적 응답 갱신은 주문 연결 소유자 책임입니다.
  return (
    <Stack gap="28px">
      {!mobile ? (
        <Typography as="h2" variant="heading8">
          주문내역
        </Typography>
      ) : null}
      <Stack gap="28px" _mobile={{ p: '16px', bg: 'black.10' }}>
        <Stack gap="12px">
          <AmountRow label="상품 금액" amount={350000} />
          <AmountRow label="쿠폰 할인" amount={15000} discount />
          <Button variant="secondary" fullWidth onClick={() => setOpen(true)}>
            조회하기
          </Button>
          <AmountRow label="배송비" amount={0} />
        </Stack>
        <AmountRow
          label="총 결제 금액"
          amount={mobile ? 3200000 : 334550}
          emphasizeLabel
          borderTop={{ base: '2px solid black', _mobile: '1px solid var(--colors-black-20)' }}
          pt="24px"
        />
      </Stack>
      <Stack gap="4px">
        {[
          '쿠폰 보유 시 최대 할인 쿠폰으로 자동 적용됩니다.',
          '정상 상품과 세일 상품을 함께 결제 시 쿠폰 적용 가능 상품에만 쿠폰이 적용됩니다.',
        ].map((text) => (
          <Typography key={text} variant="body5" tone="tertiary">
            * {text}
          </Typography>
        ))}
      </Stack>
      {open ? <CheckoutCouponDialog onClose={() => setOpen(false)} /> : null}
    </Stack>
  );
}
