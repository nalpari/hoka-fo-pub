import type { DropdownOption } from '@/components/common/atoms/Dropdown';

export const checkoutCouponOptions: readonly DropdownOption[] = [
  { value: 'none', label: '쿠폰을 선택해 주세요.' },
  { value: 'product-10', label: '[상품쿠폰] 10% 할인 쿠폰' },
  { value: 'family-7', label: '[등급쿠폰] HOKA FAMILY 감사 쿠폰 7%' },
  { value: 'cart-5000', label: '장바구니 5,000원 할인' },
  { value: 'family-4000', label: 'HOKA FAMILY 장바구니 4,000원 할인' },
];
