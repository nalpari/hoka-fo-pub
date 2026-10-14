'use client';

import { useState, type FormEvent } from 'react';
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

export function CheckoutPage({ cart, onComplete }: Props) {
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [completed, setCompleted] = useState(false);
  const { rows, total } = getCheckoutSummary(cart, products);

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
