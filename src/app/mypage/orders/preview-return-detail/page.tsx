'use client';
import { OrdersPage } from '@/app/mypage/orders/_components/OrdersPage';
import { previewOrders } from '@/components/orders/orders.data';
/** 고정 상태의 퍼블리싱 마크업을 직접 표시합니다. (Displays fixed publishing state markup directly.) */
export default function Page() {
  return (
    <OrdersPage
      initialOrders={[{ ...previewOrders[3], claims: [...previewOrders[3].claims].reverse() }]}
      initialView="claim"
    />
  );
}
