'use client';

import { usePlatform } from '@/context/platform';

import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { AmountRow } from '@/components/common/molecules/AmountRow';

import { OrderActionBar } from '@/components/common/layouts/OrderActionBar';

import { cartPreviewAmounts } from '@/app/cart/cart-preview';

/** 주문내역과 모바일 고정 구매 액션을 표시합니다. (Displays order totals and the fixed mobile purchase action.) */
export function CartOrderActions({ selectedPreview = false }: { selectedPreview?: boolean }) {
  const mobile = usePlatform() === 'mobile';
  // [ 개발팀 바인딩 ] 금액은 PC/MO 시안별 고정 표시입니다. 선택·수량과 재계산하거나 주문을 실행하지 않습니다. 실제 견적과 구매 요청·pending·실패·재시도·성공 후 갱신은 장바구니 연결 소유자가 담당합니다.
  if (mobile)
    return (
      <OrderActionBar>
        <Stack gap="24px">
          <AmountRow
            label="총 결제금액"
            amount={
              selectedPreview ? cartPreviewAmounts.selectedTotal : cartPreviewAmounts.mobileTotal
            }
            emphasizeLabel
          />
          <Button variant="primary" fullWidth>
            구매하기
          </Button>
        </Stack>
      </OrderActionBar>
    );
  return (
    <Stack as="aside" gap="28px" p="24px" bg="black.10" alignSelf="start">
      <Typography as="h2" web="h10B" mo="h8">
        주문내역
      </Typography>
      <Stack gap="12px">
        <AmountRow label="주문 금액" amount={cartPreviewAmounts.product} />
        <AmountRow label="할인 금액" amount={cartPreviewAmounts.discount} discount />
        {/* 무료배송 정책으로 배송비 행을 숨깁니다.
        <AmountRow label="배송비" amount={cartPreviewAmounts.shipping} />
        */}
      </Stack>
      <AmountRow
        label="총 결제금액"
        amount={cartPreviewAmounts.total}
        emphasizeLabel
        borderTop="2px solid var(--color-black-20)"
        pt="24px"
      />
      <Button variant="primary" fullWidth>
        구매하기
      </Button>
    </Stack>
  );
}
