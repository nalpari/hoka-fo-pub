/**
 * [개발팀 바인딩]
 * previewOrders는 Storybook/미연동 화면 fixture입니다. 실제 데이터는 OrdersContext.orders로 전달하고 이 배열의 ID/날짜/상태를 서버 응답으로 사용하지 않습니다.
 */

import type { OrderLine, OrderRecord } from './orders.types';

const line = (key: string, quantity = 1): OrderLine => ({
  key,
  productId: 'shoe-1',
  name: '클리프톤 9',
  image: '/images/mypage/speedgoat-7-gtx.png',
  width: 'X-Wide',
  color: '레드',
  size: '225',
  quantity,
  price: 230000,
});

export const previewOrders: OrderRecord[] = [
  {
    id: '202610210192',
    date: '2026-10-10',
    expectedDate: '10월 20일 (화)',
    status: 'paid',
    items: [line('paid-1', 2), line('paid-2')],
    claims: [],
  },
  {
    id: '202610080192',
    date: '2026-10-08',
    expectedDate: '10월 11일 (일)',
    status: 'preparing',
    items: [line('preparing-1')],
    claims: [],
  },
  {
    id: '202610010192',
    date: '2026-10-01',
    expectedDate: '10월 10일 (토)',
    status: 'delivered',
    items: [line('delivered-1')],
    claims: [],
  },
  {
    id: '202609250192',
    date: '2026-09-25',
    expectedDate: '09월 29일 (화)',
    status: 'purchased',
    items: [line('purchased-1'), line('cancelled-1'), line('returned-1')],
    claims: [
      {
        id: '912375821759832',
        kind: 'cancel',
        state: 'complete',
        quantities: { 'cancelled-1': 1 },
        reason: 'mind',
        details: '색상이 마음에 들지 않아 반품합니다.',
        requestedAt: '2026-10-02',
        completedAt: '2026-10-05',
        fee: 5000,
      },
      {
        id: '912375821759833',
        kind: 'return',
        state: 'complete',
        quantities: { 'returned-1': 1 },
        reason: 'damage',
        details: '스크래치가 있어 반품하고 환불 신청합니다.',
        requestedAt: '2026-10-02',
        completedAt: '2026-10-05',
        fee: 0,
      },
    ],
  },
];
