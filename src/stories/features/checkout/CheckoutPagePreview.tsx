import { useRef } from 'react';
import Page from '@/app/checkout/page';
import { ShopStatePreview } from '@/stories/features/ShopStatePreview';
import type { CartItem } from '@/types/cart';

type Props = { cart: CartItem[]; onComplete: (items: readonly CartItem[]) => void };

/** 주문 페이지의 상품별 제거를 스토리 완료 콜백에 연결합니다. (Connects order item removal to the story completion callback.) */
export function CheckoutPage({ cart, onComplete }: Props) {
  const removed = useRef<CartItem[]>([]);
  return (
    <ShopStatePreview
      cart={cart}
      remove={(item) => {
        removed.current.push(item);
        // Completion removes the selected items synchronously; report the batch once.
        if (removed.current.length === 1)
          queueMicrotask(() => {
            const items = removed.current;
            removed.current = [];
            onComplete(items);
          });
      }}
    >
      <Page />
    </ShopStatePreview>
  );
}
