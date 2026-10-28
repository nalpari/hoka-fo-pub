'use client';

import { useShop } from '@/context/ShopShell';

import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { products } from '@/mocks/products';
import type { CartItem } from '@/types/cart';
import { CheckoutForm } from '@/components/features/checkout/CheckoutForm';
import { CheckoutLayout } from '@/components/features/checkout/CheckoutLayout';
import type { PaymentMethod } from '@/components/features/checkout/CheckoutPayment';
import { getCheckoutSummary } from '@/components/features/checkout/checkout-summary';

const subscribeLocation = () => () => {};

const serverSelected = () => null;

const clientSelected = () => new URLSearchParams(window.location.search).get('selected');

/** 선택 상품의 주문 상태와 결제 완료 후 장바구니 정리를 관리합니다. (Manages selected-item checkout and removes completed items from the cart.) */
export default function Page() {
  const { cart, remove } = useShop();
  const onComplete = (items: readonly CartItem[]) => items.forEach(remove);
  const [payment, setPayment] = useState<PaymentMethod>('kakao');
  const [completed, setCompleted] = useState(false);
  const selectedParam = useSyncExternalStore(subscribeLocation, clientSelected, serverSelected);
  const selectedKeys = selectedParam?.split('|');

  const selectedCart = selectedKeys
    ? cart.filter((item) =>
        selectedKeys.includes(`${item.id}-${item.color}-${item.width}-${item.size}`),
      )
    : cart;
  const { rows, total } = getCheckoutSummary(selectedCart, products);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCompleted(true);
    onComplete(selectedCart);
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
      />
    </CheckoutLayout>
  );
}
