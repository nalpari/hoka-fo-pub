'use client';

import { useState } from 'react';

import { cartPreviewRows, cartPreviewTotal } from '@/app/cart/cart-preview';

import { CheckoutComplete } from './CheckoutComplete';
import { CheckoutContent, CheckoutEmptyState } from './CheckoutForm';
import { CheckoutLayout } from './CheckoutLayout';
import type { PaymentMethod } from './CheckoutPayment';

/**
 * [ 개발팀 바인딩 ] preview는 고정 상품·금액과 오류를 표시합니다. 결제/배송지 저장·쿠폰 계산·장바구니 정리를 실행하지 않습니다.
 * 실제 제출 payload와 견적·pending/실패/재시도·성공 후 갱신은 CheckoutContext 및 주문 라우트 연결 소유자가 관리합니다.
 */
/** 주문서의 빈 상태·입력 오류·완료를 직접 표시합니다. (Displays fixed empty, invalid and completed checkout states.) */
export function CheckoutStatePreview({ state }: { state: 'empty' | 'error' | 'complete' }) {
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [orderAgreed, setOrderAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [coupon, setCoupon] = useState('none');
  const [maxBenefit, setMaxBenefit] = useState(false);
  return (
    <CheckoutLayout completed={state === 'complete'}>
      {state === 'complete' ? (
        <CheckoutComplete />
      ) : state === 'empty' ? (
        <CheckoutEmptyState />
      ) : (
        <form noValidate onSubmit={(event) => event.preventDefault()}>
          <CheckoutContent
            editShipping
            rows={cartPreviewRows}
            total={cartPreviewTotal}
            discount={0}
            payment={payment}
            errors={{
              name: '받는 분을 입력해 주세요.',
              phone: '연락처를 입력해 주세요.',
              address: '주소를 입력해 주세요.',
            }}
            coupon={coupon}
            maxBenefit={maxBenefit}
            orderAgreed={orderAgreed}
            privacyAgreed={privacyAgreed}
            agreementError
            onPaymentChange={setPayment}
            onCouponChange={setCoupon}
            onMaxBenefitChange={setMaxBenefit}
            onOrderAgreedChange={setOrderAgreed}
            onPrivacyAgreedChange={setPrivacyAgreed}
          />
        </form>
      )}
    </CheckoutLayout>
  );
}
