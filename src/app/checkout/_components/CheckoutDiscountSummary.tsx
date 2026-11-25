'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';

import { checkoutEmployeeDiscountNotice } from '@/app/checkout/checkout-summary';

import { CheckoutCouponDialog } from './CheckoutCouponDialog';

const styles = {
  limitLabel: css({ flexShrink: 0 }),
  limitNotice: css({ textAlign: 'right' }),
};

/** 주문 금액과 보유 쿠폰 조회 UI를 표시합니다. (Displays prepared order totals and the coupon lookup interface.) */
export function CheckoutDiscountSummary({
  initialCouponOpen = false,
}: {
  initialCouponOpen?: boolean;
}) {
  const [open, setOpen] = useState(initialCouponOpen);
  const mobile = usePlatform() === 'mobile';
  // [ 개발팀 바인딩 ] 주문금액·할인·합계와 임직원 할인한도는 고정 표시 데이터입니다. 주문 연결 소유자가 견적 응답에서 금액과 계정별 한도 표시값을 전달하고 쿠폰 적용 성공 후 갱신합니다.
  return (
    <Stack gap={{ base: '28px', _mobile: '12px' }}>
      {!mobile ? (
        <Typography as="h2" web="h10B" mo="h8">
          주문내역
        </Typography>
      ) : null}
      <Stack gap={{ base: '28px', _mobile: '0px' }}>
        <Stack
          gap={{ base: '10px', _mobile: '12px' }}
          _mobile={{ px: '16px', py: '20px', border: '1px solid var(--colors-black-20)' }}
        >
          <AmountRow label="상품 금액" amount={350000} web="b5" mo="b6" amountWeb="b4" />
          <Stack gap={{ base: '16px', _mobile: '12px' }}>
            <AmountRow label="쿠폰 할인" amount={15000} web="b5" mo="b6" amountWeb="b4" discount />
            <Button variant="secondary" size="short" fullWidth onClick={() => setOpen(true)}>
              쿠폰 조회하기
            </Button>
          </Stack>
          <HStack alignItems="flex-start" justifyContent="space-between" gap="8px">
            <Typography web="b5B" mo="b6" className={styles.limitLabel}>
              임직원
            </Typography>
            <Typography web="b6" mo="b6" className={styles.limitNotice}>
              {checkoutEmployeeDiscountNotice.usage}
              <br />
              {checkoutEmployeeDiscountNotice.remaining}
            </Typography>
          </HStack>
        </Stack>
        <AmountRow
          label="총 결제 금액"
          labelWeight="700-500"
          amount={mobile ? 3200000 : 334550}
          web="b4"
          mo="b6"
          amountWeb="b3"
          amountMo="b4"
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
          '상품 쿠폰은 상품별로 1장씩만 적용 가능하며, 장바구니 쿠폰과 상품 쿠폰은 함께 사용하실 수 없습니다.',
        ].map((text) => (
          <Typography key={text} web="b6" mo="b7" tone="tertiary">
            * {text}
          </Typography>
        ))}
      </Stack>
      {open ? <CheckoutCouponDialog onClose={() => setOpen(false)} /> : null}
    </Stack>
  );
}
