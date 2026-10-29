'use client';

/**
 * [ 개발팀 바인딩 ]
 * CheckoutContext에 배송지·쿠폰·견적과 submit을 연결합니다. ShopShell.state.products/cart도 동일한 실제 ID/옵션으로 공급합니다.
 * submit 성공은 결제 승인/주문 저장 완료입니다. 실패는 reject해 입력을 유지합니다. UI 검증/표시 금액은 서버 검증을 대신하지 않습니다.
 */

import { useSearchParams } from 'next/navigation';

import { useContext, useState } from 'react';
import { CheckoutContext, type CheckoutSubmission } from '@/context/CheckoutContext';
import { useShop } from '@/context/ShopShell';
import { useRequestAction } from '@/hooks/useRequestAction';

import { getCheckoutSummary } from '@/app/checkout/checkout-summary';
import { products } from '@/mocks/products';
import { type CartItem } from '@/types/cart';

import { CheckoutForm } from './_components/CheckoutForm';
import { CheckoutLayout } from './_components/CheckoutLayout';
import { type PaymentMethod } from './_components/CheckoutPayment';

/** 선택 상품의 주문 상태와 결제 완료 후 장바구니 정리를 관리합니다. (Manages selected-item checkout and removes completed items from the cart.) */
export default function Page() {
  const { cart, remove, products: catalogue = products } = useShop();
  const binding = useContext(CheckoutContext);
  const request = useRequestAction();
  const onComplete = (items: readonly CartItem[]) => items.forEach(remove);
  const [payment, setPayment] = useState<PaymentMethod>('kakao');
  const [completed, setCompleted] = useState(false);
  const selectedParam = useSearchParams().get('selected');
  const selectedKeys = selectedParam?.split('|');

  const selectedCart = selectedKeys
    ? cart.filter((item) =>
        selectedKeys.includes(`${item.id}-${item.color}-${item.width}-${item.size}`),
      )
    : cart;
  const { rows, total } = getCheckoutSummary(selectedCart, catalogue);

  const submit = (input: CheckoutSubmission) => {
    void request.run(async () => {
      if (binding) await binding.submit(input);
      else onComplete(input.items);
      setCompleted(true);
    });
  };

  return (
    <CheckoutLayout completed={completed}>
      <CheckoutForm
        completed={completed}
        rows={rows}
        total={total}
        payment={payment}
        onPaymentChange={setPayment}
        onSubmit={submit}
        pending={request.pending}
        error={request.error}
      />
    </CheckoutLayout>
  );
}
