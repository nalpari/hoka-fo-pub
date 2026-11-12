'use client';

import { createContext } from 'react';

import type { Address } from '@/types/mypage-address.types';

/**
 * [ 개발팀 바인딩 ]
 * 저장 배송지 표시 데이터를 선택적으로 전달합니다. savedAddress가 null이면 직접 입력 상태이며 otherPhone은 선택 표시값입니다.
 * addresses는 마이페이지와 동일한 Address 표시 목록이며 변경된 props를 그대로 읽습니다. 저장·삭제 동작은 연결하지 않습니다.
 * 주문 금액·할인·배송비는 CheckoutContent의 준비된 표시 데이터로 전달하고, 쿠폰 선택은 화면 안에서만 동작합니다.
 * 이 퍼블리싱 화면은 결제 제출, 주문 생성, 승인/취소, 저장과 갱신을 연결하지 않습니다. 해당 흐름은 프론트 연결 소유자가 구현합니다.
 */
export type CheckoutBinding = {
  /** 현재 표시할 배송지 목록이며 미연결 시 고정 예시를 대신 표시하지 않습니다. */
  addresses?: readonly Address[];
  savedAddress: {
    id: string;
    label: string;
    name: string;
    phone: string;
    otherPhone?: string;
    address: string;
    postalCode: string;
    addressDetail: string;
  } | null;
};

export const CheckoutContext = createContext<CheckoutBinding | null>(null);
