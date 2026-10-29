/**
 * [개발팀 바인딩]
 * 이 파일은 미연동 리뷰 예시 생성기입니다. 운영 목록은 MyPageDataContext.reviews로 실제 id/product/purchasedAt/review를 공급합니다.
 * 실제 ID에 예시 상품을 붙이는 용도로 createReviewFixture를 호출하지 않습니다.
 */

import type { ReviewListEntry, WrittenReview } from './reviews.types';

export function createReviewFixture(
  id: ReviewListEntry['id'],
  review?: WrittenReview,
): ReviewListEntry {
  return {
    id,
    product: {
      name: '클리프톤 9',
      imageSrc: '/images/mypage/speedgoat-7-gtx.png',
      optionLabel: '화이트 / 270',
    },
    purchasedAt: '2026.08.18',
    review,
  };
}

export const demoWrittenReview: WrittenReview = {
  rating: 4.5,
  body: '쿠션감이 좋아서 잘 달리고 있어요.',
};
