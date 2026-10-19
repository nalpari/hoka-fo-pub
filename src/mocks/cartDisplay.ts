import type { CartItem } from '@/shared/types/cart';

const previewColors = new Set(['브라운', '레드', '화이트', '옐로우골드']);

/** Figma cart fixture imagery; real catalogue entries retain their own product images. */
export function getCartImage(item: CartItem, fallback: string) {
  return previewColors.has(item.color) ? '/images/cart/clifton-preview.png' : fallback;
}

export const recommendationImages = [
  '/images/cart/recommend-1.png',
  '/images/cart/recommend-2.png',
  '/images/cart/recommend-3.png',
] as const;
