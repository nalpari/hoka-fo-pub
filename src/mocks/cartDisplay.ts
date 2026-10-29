/**
 * [개발팀 바인딩]
 * 이 파일은 시안 이미지 override와 표시값 변환을 담당합니다. 실제 상품은 ShopShell.state.products, 선택 옵션/수량은 cart에서 읽습니다.
 * 명시적인 CartItem.imageSrc만 이미지 override로 사용합니다. 색상명이나 예시 ID가 일치한다는 이유로 운영 상품 이미지를 바꾸지 않습니다.
 */

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
