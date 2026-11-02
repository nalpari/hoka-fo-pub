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
      optionLabel: '블루 코랄 / 270',
      gender: "Men's",
      price: '240,000원',
    },
    purchasedAt: '2025.09.30',
    review,
  };
}

export const demoWrittenReview: WrittenReview = {
  rating: 5,
  body: '쿠션감이 좋아서 잘 달리고 있어요.',
};

/** 디자인의 목록 길이·건수·더보기 표시는 서로 독립적인 고정 fixture입니다. */
export const reviewListPreview = {
  totalCount: 62,
  hasMore: true,
  pageInfo: { current: 1, total: 10 },
  writtenMobile: { totalCount: 2, hasMore: false },
  ready: Array.from({ length: 10 }, (_, index) => createReviewFixture(`preview-purchase-${index}`)),
  written: Array.from({ length: 2 }, (_, index) => ({
    ...createReviewFixture(`preview-written-${index}`, demoWrittenReview),
    product: {
      ...createReviewFixture(`preview-written-${index}`).product,
      name: 'Speedgoat 7 GTX',
    },
  })),
};
