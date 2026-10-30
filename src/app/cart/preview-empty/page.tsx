import { CartEmptyState } from '@/app/cart/_components/CartEmptyState';
import { CartHeading } from '@/app/cart/_components/CartHeading';
import { OrderPageLayout } from '@/components/orders/OrderPageLayout';

/** 빈 장바구니 마크업을 바로 확인합니다. (Displays the empty cart markup directly.) */
export default function Page() {
  return (
    <OrderPageLayout step={1} title={<CartHeading itemCount={0} />}>
      <CartEmptyState />
    </OrderPageLayout>
  );
}
