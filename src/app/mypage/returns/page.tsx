'use client';

/**
 * [개발팀 바인딩]
 * 주문/취소/반품 데이터는 OrdersContext에 연결합니다. 실제 목록 갱신과 비동기 요청 계약은 OrdersRoute와 OrdersContext의 주석을 따릅니다.
 */

import { OrdersRoute } from '@/components/orders/OrdersRoute';

/** 취소와 반품 내역의 공용 주문 화면을 연결합니다. (Connects the shared order screen for cancellations and returns.) */
export default function Page() {
  return <OrdersRoute returns />;
}
