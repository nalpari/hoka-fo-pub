import type { CartItem } from '@/shared/types/cart';

type CheckoutProduct = { id: string; name: string; price: number };

export type CheckoutRow = { item: CartItem; product: CheckoutProduct };

/** Preserve option-level cart rows and ignore products absent from the catalogue. */
export function getCheckoutSummary(
  cart: readonly CartItem[],
  products: readonly CheckoutProduct[],
) {
  const rows: CheckoutRow[] = cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ item, product }] : [];
  });
  const total = rows.reduce((sum, { item, product }) => sum + product.price * item.quantity, 0);
  return { rows, total };
}
