'use client';

import { useShop } from '@/shared/ShopShell';
import { CartPage } from '@/shared/features/cart/CartPage';

export default function Page() {
  const { cart, updateQuantity, updateOptions, remove } = useShop();
  return (
    <CartPage
      cart={cart}
      onQuantityChange={updateQuantity}
      onRemove={remove}
      onOptionsChange={updateOptions}
    />
  );
}
