'use client';

import { useState } from 'react';

import { cartPreviewRows } from '@/app/cart/cart-preview';

import { CheckoutComplete } from './CheckoutComplete';
import { CheckoutContent, CheckoutEmptyState } from './CheckoutForm';
import { CheckoutLayout } from './CheckoutLayout';
import type { PaymentMethod } from './CheckoutPayment';

/**
 * [ 개발팀 바인딩 ] preview는 고정 상품·금액·오류를 표시합니다. 로컬 쿠폰 선택은 할인액을 계산하지 않으며 동의 필수 여부도 검증하지 않습니다.
 * 결제 제출·검증·주문 생성은 연결하지 않습니다. error 상태의 필드 안내와 동의 오류는 고정된 화면 확인용입니다.
 */
/** 주문서의 입력·요청사항·오류·완료 상태를 직접 표시합니다. (Displays fixed checkout input, delivery instructions, error, and completion states.) */
export function CheckoutStatePreview({
  state,
}: {
  state: 'empty' | 'error' | 'complete' | 'shipping' | 'address-change' | 'delivery-request';
}) {
  const [payment, setPayment] = useState<PaymentMethod>(
    state === 'address-change' ? 'kakao' : 'card',
  );
  return (
    <CheckoutLayout completed={state === 'complete'}>
      {state === 'complete' ? (
        /* 주문완료 안내 및 추천 상품 */
        <CheckoutComplete />
      ) : state === 'empty' ? (
        <CheckoutEmptyState />
      ) : (
        <CheckoutContent
          editShipping={state === 'shipping' || state === 'error'}
          initialAddressChangeOpen={state === 'address-change'}
          initialDeliveryRequest={state === 'delivery-request' ? 'custom' : undefined}
          rows={cartPreviewRows}
          payment={payment}
          errors={
            state === 'error'
              ? {
                  name: '받는 분을 입력해 주세요.',
                  phone: '연락처를 입력해 주세요.',
                  address: '주소를 입력해 주세요.',
                }
              : undefined
          }
          showAgreementError={state === 'error'}
          onPaymentChange={setPayment}
        />
      )}
    </CheckoutLayout>
  );
}
