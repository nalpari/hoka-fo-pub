import type { CartItem } from '@/types/cart';

/** Uses an explicit cart image override, otherwise preserving the catalogue image. */
export function getCartImage(item: CartItem, fallback: string) {
  return item.imageSrc ?? fallback;
}

export const recommendationImages = [
  '/images/cart/recommend-2.png',
  '/images/cart/recommend-3.png',
  '/images/cart/recommend-1.png',
] as const;
