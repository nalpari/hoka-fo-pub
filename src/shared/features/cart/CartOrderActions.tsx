import { Stack } from 'styled-system/jsx';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { AmountRow } from '@/shared/components/molecules/AmountRow/AmountRow';
import { OrderActionBar } from '@/shared/components/molecules/OrderActionBar/OrderActionBar';

type Props = {
  total: number;
  checkoutHref: string | null;
};

/** 결제예정금액과 주문 가능 상태에 따른 액션을 표시합니다. (Displays the cart total and available order action.) */
export function CartOrderActions({ total, checkoutHref }: Props) {
  return (
    <OrderActionBar>
      <Stack gap="6">
        <AmountRow
          label="결제예정금액"
          amount={total}
          emphasis
          display={{ base: 'none', _mobile: 'flex' }}
        />
        {checkoutHref ? (
          <ButtonLink href={checkoutHref} variant="primary" fullWidth>
            주문하기
          </ButtonLink>
        ) : (
          <Button variant="primary" fullWidth disabled>
            주문하기
          </Button>
        )}
      </Stack>
    </OrderActionBar>
  );
}
