import { Stack } from 'styled-system/jsx';
import { OrderProductSummary } from '@/shared/components/molecules/OrderProductSummary/OrderProductSummary';
import { getCartImage } from '@/mocks/cartDisplay';
import type { CheckoutRow } from '@/shared/features/checkout/checkout-summary';

type Props = { rows: readonly CheckoutRow[] };

export function CheckoutProductList({ rows }: Props) {
  return (
    <Stack borderTop="1px solid var(--colors-black-100)">
      {rows.map(({ item, product }) => (
        <OrderProductSummary
          key={`${item.id}-${item.color}-${item.width}-${item.size}`}
          image={getCartImage(item, product.primaryImage ?? '/images/mypage/speedgoat-7-gtx.png')}
          name={product.name}
          optionText={`옵션 : ${item.width} / ${item.color} / ${item.size} ${item.quantity}개`}
          amount={product.price * item.quantity}
        />
      ))}
    </Stack>
  );
}
