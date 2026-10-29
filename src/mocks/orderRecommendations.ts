/**
 * [개발팀 바인딩]
 * 아래 추천은 시안 생성 목록입니다. 운영 추천 응답은 OrderRecommendations.items의 id/name/price/href/imageSrc 표시 모델로 변환합니다.
 * 현재 cart/checkout에서 이 고정 배열을 참조하는 위치가 추천 서비스 연결 소유자입니다. 목록을 임의 반복하지 말고 실제 응답만 전달합니다.
 */

import { recommendationImages } from '@/mocks/cartDisplay';
import { products } from '@/mocks/products';
import type { OrderRecommendation } from '@/types/component-contracts/components-common-organisms-OrderRecommendations-OrderRecommendations';

export const orderRecommendations: readonly OrderRecommendation[] = products
  .slice(0, 4)
  .map((product, index) => ({
    id: product.id,
    name: product.name,
    gender: product.gender,
    price: product.price,
    href: `/products/${product.id}`,
    imageSrc: recommendationImages[index] ?? product.primaryImage,
  }));
