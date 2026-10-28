import Page from '@/app/cart/page';
import { ShopStatePreview } from '@/stories/features/ShopStatePreview';
import type { CartItem } from '@/types/cart';

type Props = {
  cart: CartItem[];
  onQuantityChange: (item: CartItem, quantity: number) => void;
  onRemove: (item: CartItem) => void;
  onOptionsChange?: (item: CartItem, next: CartItem) => void;
};

/** 장바구니 페이지에 스토리 상태와 액션을 연결합니다. (Connects story state and actions to the cart page.) */
export function CartPage({ cart, onQuantityChange, onRemove, onOptionsChange }: Props) {
  return (
    <ShopStatePreview
      cart={cart}
      updateQuantity={onQuantityChange}
      remove={onRemove}
      updateOptions={onOptionsChange ?? ((item, next) => onQuantityChange(item, next.quantity))}
    >
      <Page />
    </ShopStatePreview>
  );
}
