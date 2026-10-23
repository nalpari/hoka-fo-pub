import type { CartItem } from '@/shared/types/cart';
import type { Product } from '@/mocks/products';

/** Quantity is deliberately excluded so selection survives quantity changes. */
export function itemKey(item: CartItem) {
  return `${item.id}-${item.color}-${item.width}-${item.size}`;
}

export function isCartItemSoldOut(item: CartItem, product: Product) {
  const width = product.colorOptions
    ?.find((option) => option.color === item.color)
    ?.widths.find((option) => option.label === item.width);

  return (width?.soldOut ?? product.soldOut).includes(item.size);
}
