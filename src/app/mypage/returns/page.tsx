'use client';

import { OrdersRoute } from '@/components/features/orders/OrdersRoute';

/** 취소와 반품 내역의 공용 주문 화면을 연결합니다. (Connects the shared order screen for cancellations and returns.) */
export default function Page() {
  return <OrdersRoute returns />;
}
