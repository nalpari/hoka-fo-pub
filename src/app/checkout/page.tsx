'use client';

import { useShop } from '@/shared/ShopShell';
import { CheckoutPage } from '@/shared/features/checkout/CheckoutPage';

export default function Page() {
  const { cart, remove } = useShop();
  return <CheckoutPage cart={cart} onComplete={(items) => items.forEach(remove)} />;
}
