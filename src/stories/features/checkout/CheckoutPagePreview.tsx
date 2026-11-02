import Page from '@/app/checkout/page';
import { ShopStatePreview } from '@/stories/features/ShopStatePreview';
import type { CartItem } from '@/types/cart';

type Props = { cart: CartItem[] };

/** 준비된 장바구니 상품을 주문서 화면에 표시합니다. (Displays prepared cart items in the checkout screen.) */
export function CheckoutPage({ cart }: Props) {
  return (
    <ShopStatePreview cart={cart}>
      <Page />
    </ShopStatePreview>
  );
}
