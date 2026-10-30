'use client';

import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';

import { AmountRow } from '@/components/common/molecules/AmountRow';

import { OrderActionBar } from '@/components/common/layouts/OrderActionBar';

type CartOrderActionsProps = {
  total: number;
};

/** 고정 결제예정금액과 주문 버튼을 표시합니다. (Displays the fixed preview total and order button.) */
export function CartOrderActions({ total }: CartOrderActionsProps) {
  return (
    <OrderActionBar>
      <Stack gap="5">
        <AmountRow
          label="결제예정금액"
          amount={total}
          emphasis
          display={{ base: 'none', _mobile: 'flex' }}
        />
        <Button variant="primary" fullWidth>
          주문하기
        </Button>
      </Stack>
    </OrderActionBar>
  );
}
