import type { CartItem } from '@/types/cart';

type CheckoutProduct = { id: string; name: string; price: number; primaryImage?: string };

export type CheckoutRow = { item: CartItem; product: CheckoutProduct };

/** 주문서에 표시할 상품 행을 준비하고 상품 목록에 없는 항목은 제외합니다. (Prepares checkout product rows and omits items missing from the catalogue.) */
export function getCheckoutSummary(
  cart: readonly CartItem[],
  products: readonly CheckoutProduct[],
) {
  return cart.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ item, product }] : [];
  });
}
