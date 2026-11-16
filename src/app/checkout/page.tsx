'use client';
import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { checkoutPreviewRows, mobileCheckoutPreviewRows } from '@/app/checkout/checkout-summary';

import { CheckoutContent } from './_components/CheckoutForm';
import { CheckoutLayout } from './_components/CheckoutLayout';
import type { PaymentMethod } from './_components/CheckoutPayment';
/** 준비된 주문서 상품과 로컬 입력을 표시합니다. (Displays prepared checkout rows and local inputs.) */
export default function Page() {
  const platform = usePlatform();
  const [payment, setPayment] = useState<PaymentMethod>('kakao');
  return (
    <CheckoutLayout completed={false}>
      <CheckoutContent
        rows={platform === 'mobile' ? mobileCheckoutPreviewRows : checkoutPreviewRows}
        payment={payment}
        onPaymentChange={setPayment}
      />
    </CheckoutLayout>
  );
}
