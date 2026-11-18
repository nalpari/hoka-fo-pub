import { CartEmptyContent } from '@/app/cart/_components/CartEmptyContent';
import { OrderPageLayout } from '@/components/orders/OrderPageLayout';

/** 빈 장바구니 마크업을 바로 확인합니다. (Displays the empty cart markup directly.) */
export default function Page() {
  return (
    <OrderPageLayout
      title={null}
      maxWidth="none"
    >
      <CartEmptyContent />
    </OrderPageLayout>
  );
}
