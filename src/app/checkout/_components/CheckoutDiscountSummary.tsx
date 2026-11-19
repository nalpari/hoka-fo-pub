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
    <Stack gap={{ base: '28px', _mobile: '12px' }}>
      {!mobile ? (
        <Typography as="h2" variant="headingKr8">
          주문내역
        </Typography>
      ) : null}
      <Stack gap={{ base: '28px', _mobile: '0px' }}>
        <Stack
          gap={{ base: '10px', _mobile: '12px' }}
          _mobile={{ px: '16px', py: '20px', border: '1px solid var(--colors-black-20)' }}
        >
          <AmountRow label="상품 금액" amount={350000} web="body3-2" mo="body4" amountWeb="body3" />
          <Stack gap={{ base: '16px', _mobile: '12px' }}>
            <AmountRow
              label="쿠폰 할인"
              amount={15000}
              web="body3-2"
              mo="body4"
              amountWeb="body3"
              discount
            />
            <Button variant="secondary" size="short" fullWidth onClick={() => setOpen(true)}>
              조회하기
            </Button>
          </Stack>
          <AmountRow label="배송비" amount={0} web="body3-2" amountWeb="body3" />
        </Stack>
        <AmountRow
          label="총 결제 금액"
          labelWeight="700-500"
          amount={mobile ? 3200000 : 334550}
          web="body3"
          mo="body4"
          amountWeb="body2-2"
          amountMo="body3"
          borderTop={{ base: '2px solid black', _mobile: '0px' }}
          pt="20px"
          _mobile={{
            bg: 'black.10',
            border: '1px solid var(--colors-black-20)',
            borderTop: '0',
            px: '16px',
            pb: '20px',
          }}
        />
      </Stack>
      <Stack gap="0px">
        {[
          '쿠폰 보유 시 최대 할인 쿠폰으로 자동 적용됩니다.',
          '정상 상품과 세일 상품을 함께 결제 시 쿠폰 적용 가능 상품에만 쿠폰이 적용됩니다.',
        ].map((text) => (
          <Typography key={text} web="body4" mo="body4-2" tone="tertiary">
            * {text}
          </Typography>
        ))}
      </Stack>
      {open ? <CheckoutCouponDialog onClose={() => setOpen(false)} /> : null}
    </Stack>
  );
}
