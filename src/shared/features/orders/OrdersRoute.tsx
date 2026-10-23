'use client';

import { useShop } from '@/shared/ShopShell';
import { OrdersPage } from './OrdersPage';

/** 주문 내역의 다시 담기를 상점 장바구니 상태에 연결합니다. (Connects order history reorder actions to shop cart state.) */
export function OrdersRoute({ returns = false }: { returns?: boolean }) {
  const shop = useShop();
  return (
    <OrdersPage
      returns={returns}
      onAddToCart={(line) =>
        shop.add({
          id: line.productId,
          width: line.width,
          color: line.color,
          size: line.size,
          quantity: line.quantity,
        })
      }
    />
  );
}
