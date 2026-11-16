import type { OrderRecommendation } from '@/types/component-contracts/components-common-organisms-OrderRecommendations-OrderRecommendations';

/** [ 개발팀 바인딩 ] 추천 화면 시안용 고정 표시 데이터이며 실제 추천 서비스와 로딩·오류·목록 갱신은 호출 화면 소유자가 연결합니다. */
export const orderRecommendations: readonly OrderRecommendation[] = [1, 2, 3, 4, 5, 6].map(
  (index) => ({
    id: `order-recommendation-${index}`,
    name: 'Speedgoat 7 GTX',
    gender: 'All Gender',
    price: 240000,
    href: '/products/shoe-1',
    imageSrc: `/images/cart/recommendation-${index}.png`,
  }),
);

/** 모바일 시안에 명시된 추천 순서와 성별 표시입니다. */
export const mobileOrderRecommendations: readonly OrderRecommendation[] = [
  orderRecommendations[1],
  { ...orderRecommendations[2], gender: "Women's" },
  { ...orderRecommendations[0], gender: "Men's" },
  ...orderRecommendations.slice(3),
];
