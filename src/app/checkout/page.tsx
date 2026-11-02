'use client';

import { useSearchParams } from 'next/navigation';

import { useState } from 'react';

import { getCheckoutSummary } from '@/app/checkout/checkout-summary';
import { products } from '@/mocks/products';
import { useShop } from '@/context/ShopShell';

import { CheckoutContent, CheckoutEmptyState } from './_components/CheckoutForm';
import { CheckoutLayout } from './_components/CheckoutLayout';
import { type PaymentMethod } from './_components/CheckoutPayment';

/**
 * 장바구니 데이터를 주문서 화면에 배치합니다. (Displays cart data in the checkout layout.)
 *
 * [ 개발팀 바인딩 ] ShopShell에서 현재 장바구니와 상품 표시 데이터를 읽고 `selected` URL 값으로 표시 상품을 고릅니다. 결제수단·쿠폰·동의는 화면 상태이며 제출, 검증, 주문 생성, 완료 이동, 장바구니 정리는 연결하지 않습니다. 실제 주문 연결 소유자는 준비된 주문 데이터와 요청 결과에 맞춰 이를 별도로 연결해야 합니다.
 */
export default function Page() {
  const { cart, products: catalogue = products } = useShop();
  const [payment, setPayment] = useState<PaymentMethod>('kakao');
  const selectedParam = useSearchParams().get('selected');
  const selectedKeys = selectedParam?.split('|');

  const selectedCart = selectedKeys
    ? cart.filter((item) =>
        selectedKeys.includes(`${item.id}-${item.color}-${item.width}-${item.size}`),
      )
    : cart;
  const rows = getCheckoutSummary(selectedCart, catalogue);

  return (
    <CheckoutLayout completed={false}>
      {rows.length === 0 ? (
        <CheckoutEmptyState />
      ) : (
        <CheckoutContent rows={rows} payment={payment} onPaymentChange={setPayment} />
      )}
    </CheckoutLayout>
  );
}
