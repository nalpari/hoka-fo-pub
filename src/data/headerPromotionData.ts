/**
 * [개발팀 바인딩]
 * HeaderPromotionItem의 id/message/href/buttonType이 헤더 배너 표시 모델입니다. BO 운영 배너는 이 형태로 변환해 헤더의 items 소유자에 전달합니다.
 * 배너 ID는 순서가 바뀌어도 유지하며 목적지 링크와 버튼 표시를 함께 갱신합니다. 아래 배열은 현재 시안 콘텐츠입니다.
 */

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
