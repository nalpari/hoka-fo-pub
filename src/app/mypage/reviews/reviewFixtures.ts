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
