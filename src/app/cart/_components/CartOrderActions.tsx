'use client';

import { usePlatform } from '@/context/platform';

import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';

import { AmountRow } from '@/components/common/molecules/AmountRow';

import { OrderActionBar } from '@/components/common/layouts/OrderActionBar';

import { cartPreviewAmounts } from '@/app/cart/cart-preview';

/** 모바일 장바구니의 하단 주문 액션을 표시합니다. (Displays the mobile cart's fixed bottom order action.)
 *
 * [ 개발팀 바인딩 ] 결제예정금액은 화면 확인용 고정 예시이고 주문 버튼은 요청을 보내지 않습니다.
 * 실제 선택 상품 금액과 주문 요청은 개발팀 장바구니 소유자에서 연결합니다.
 */
export function CartOrderActions({ selectedPreview = false }: { selectedPreview?: boolean }) {
  const mobile = usePlatform() === 'mobile';

  if (!mobile) return null;

  return (
    <OrderActionBar>
      <Stack gap="5">
        <AmountRow
          label="결제예정금액"
          amount={selectedPreview ? cartPreviewAmounts.selectedTotal : cartPreviewAmounts.total}
          emphasis
        />
        <Button variant="primary" fullWidth>
          주문하기
        </Button>
      </Stack>
    </OrderActionBar>
  );
}
