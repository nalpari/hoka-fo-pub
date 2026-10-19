'use client';

import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { products } from '@/mocks/products';
import type { CartItem } from '@/shared/types/cart';
import { CheckoutContent } from '@/shared/features/checkout/CheckoutContent';
import { CheckoutLayout } from '@/shared/features/checkout/CheckoutLayout';
import type { PaymentMethod } from '@/shared/features/checkout/CheckoutFields';
import { getCheckoutSummary } from '@/shared/features/checkout/checkout-summary';

type Props = {
  cart: CartItem[];
  onComplete: () => void;
};

const subscribeLocation = () => () => {};

const serverSelected = () => null;

const clientSelected = () => new URLSearchParams(window.location.search).get('selected');

export function CheckoutPage({ cart, onComplete }: Props) {
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
    onComplete();
  };

  return (
    <CheckoutLayout completed={completed}>
      <CheckoutContent
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
