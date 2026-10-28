import type { DropdownOption } from '@/components/common/atoms/Dropdown';

import type { CheckoutRow } from './checkout-summary';

export const checkoutCouponOptions: readonly DropdownOption[] = [
  { value: 'none', label: '쿠폰을 선택해 주세요.' },
  { value: 'product-10', label: '[상품쿠폰] 10% 할인 쿠폰' },
  { value: 'family-7', label: '[등급쿠폰] HOKA FAMILY 감사 쿠폰 7%' },
  { value: 'cart-5000', label: '장바구니 5,000원 할인' },
  { value: 'family-4000', label: 'HOKA FAMILY 장바구니 4,000원 할인' },
];

export function getCheckoutCouponDiscount(
  coupon: string,
  rows: readonly CheckoutRow[],
  total: number,
) {
  if (coupon === 'product-10' || coupon === 'family-7') {
    const rate = coupon === 'product-10' ? 0.1 : 0.07;
    return Math.min(
      total,
      rows.reduce(
        (sum, { item, product }) => sum + Math.floor(product.price * item.quantity * rate),
        0,
      ),
    );
  }

  if (coupon === 'cart-5000') return total >= 50_000 ? 5_000 : 0;
  if (coupon === 'family-4000') return total >= 50_000 ? 4_000 : 0;
  return 0;
}

export function getMaximumCheckoutCoupon(rows: readonly CheckoutRow[], total: number) {
  return checkoutCouponOptions
    .map(({ value }) => value)
    .reduce(
      (best, coupon) =>
        getCheckoutCouponDiscount(coupon, rows, total) >
        getCheckoutCouponDiscount(best, rows, total)
          ? coupon
          : best,
      'none',
    );
}
