'use client';

import { createContext } from 'react';

import type {
  ClaimKind,
  ClaimReason,
  OrderFilters,
  OrderRecord,
} from '@/components/orders/orders.types';

export type ClaimQuoteInput = {
  orderId: string;
  kind: ClaimKind;
  quantities: Record<string, number>;
  reason: ClaimReason;
  freeReturnCouponId?: string;
};

export type ClaimQuote = {
  id: string;
  amount: number;
  fee: number;
  refund: number;
  freeReturnApplied?: boolean;
};

/**
 * [개발팀 바인딩]
 * 주문/취소/반품 라우트의 현재 orders와 필터 조회를 연결합니다. 조회 결과를 새 배열로 갱신하면 화면이 직접 반영합니다.
 * 반품에는 quoteClaim을 연결합니다. 선택 수량/사유/무료반품 쿠폰에 따른 amount/fee/refund와 견적 id를 반환합니다.
 * 화면은 이전 선택의 늦은 견적을 버립니다. 서버는 submitClaim의 quoteId와 현재 재고/주문상태/반품 가능 수량/정책을 다시 검증해야 합니다.
 * submitClaim의 details는 선택 입력이며, 성공은 반품 접수 완료입니다. 환불 완료를 뜻하지 않습니다. 실제 환불은 원 결제수단으로 처리합니다.
 * 견적·신청 실패는 reject합니다. 신청 성공 후 orders를 재조회해 남은 신청 가능 수량과 접수 내역을 갱신합니다. 환불계좌/무통장 입금 값을 추가하지 않습니다.
 */
export type OrdersBinding = {
  orders: readonly OrderRecord[];
  pending?: boolean;
  error?: string;
  onFiltersChange?: (filters: OrderFilters) => void;
  /** 개발팀 적용: 반품은 선택 수량/사유마다 서버 견적을 반환합니다. 쿠폰/귀책/할인 배분을 서버에서 확정하고 id를 제출 시 재검증합니다. 원 결제수단으로 환불하며 계좌정보는 받지 않습니다. */
  quoteClaim?: (input: ClaimQuoteInput) => Promise<ClaimQuote>;
  submitClaim: (input: {
    orderId: string;
    kind: ClaimKind;
    quantities: Record<string, number>;
    reason: ClaimReason;
    details: string;
    quoteId?: string;
    freeReturnCouponId?: string;
  }) => Promise<void>;
  confirmPurchase: (orderId: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
};

export const OrdersContext = createContext<OrdersBinding | null>(null);
