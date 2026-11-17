/**
 * [ 개발팀 바인딩 ]
 * 이 파일은 미연동 리뷰 예시 생성기입니다. 운영 목록의 실제 id/product/purchasedAt/review는 통합 소유자가 공급합니다. 현재 연결 Context·요청은 없습니다.
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
      optionLabel: '블루 코랄, 270',
      gender: "Men's",
      price: '240,000원',
    },
    purchasedAt: '2025.09.30',
    review,
  };
}

export const demoWrittenReview = {
  rating: 5 as const,
  body: '쿠션감이 좋아서 잘 달리고 있어요.',
} satisfies WrittenReview;

const readyReviews = Array.from({ length: 10 }, (_, index) =>
  createReviewFixture(`preview-purchase-${index}`),
);

const writtenReviews = Array.from({ length: 2 }, (_, index) => ({
  ...createReviewFixture(`preview-written-${index}`, demoWrittenReview),
  product: { ...readyReviews[0].product, name: 'Speedgoat 7 GTX' },
}));

const more = { counter: { current: 1, total: 10 }, onLoadMore: undefined };

/** 탭별 목록과 총 건수, 더보기 표시를 위한 고정 예시입니다. */
export const reviewListPreview = {
  ready: {
    items: readyReviews,
    totalCount: 62,
    more,
  },
  written: { items: writtenReviews, totalCount: 2, more },
};

/** 빈 화면과 팝업을 바로 확인하기 위한 고정 예시입니다. */
export const reviewStatePreview = {
  empty: { items: [], totalCount: 0, more },
  new: { items: [readyReviews[0]], totalCount: 1, more },
  edit: {
    items: [{ ...readyReviews[0], review: demoWrittenReview }],
    totalCount: 1,
    more,
  },
};
