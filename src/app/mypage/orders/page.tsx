'use client';

import { OrdersRoute } from '@/components/features/orders/OrdersRoute';

/** 주문 조회의 공용 화면과 장바구니 액션을 연결합니다. (Connects the shared order history screen and cart actions.) */
export default function Page() {
  return <OrdersRoute />;
}
