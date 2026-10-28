import type { HeaderPromotionButtonType } from '@/types/component-contracts/context-ShopShell';

export type HeaderPromotionItem = {
  id: string;
  message: string;
  href: string;
  buttonType: HeaderPromotionButtonType;
};

/** Demo slides for checking navigation and both promotion button layouts. */
export const headerPromotionItems: HeaderPromotionItem[] = [
  {
    id: 'new-arrivals',
    message: '새롭게 만나는 HOKA 신상품',
    href: '/products',
    buttonType: 'details',
  },
  // {
  //   id: 'member-shipping',
  //   message: '회원 전용 무료 배송 및 반품 기간 연장',
  //   href: '/products',
  //   buttonType: 'memberBenefits',
  // },
  // {
  //   id: 'running-collection',
  //   message: '나에게 맞는 러닝화 찾기',
  //   href: '/products',
  //   buttonType: 'details',
  // },
  // {
  //   id: 'member-news',
  //   message: '회원에게 먼저 전하는 새로운 소식',
  //   href: '/products',
  //   buttonType: 'memberBenefits',
  // },
];
