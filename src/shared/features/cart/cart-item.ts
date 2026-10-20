import type { CartItem } from '@/shared/types/cart';

/** Quantity is deliberately excluded so selection survives quantity changes. */
export function itemKey(item: CartItem) {
  return `${item.id}-${item.color}-${item.width}-${item.size}`;
}
