/**
 * [ 개발팀 바인딩 ]
 * 이 파일은 미연동 리뷰 예시 생성기입니다. 운영 목록의 실제 id/product/purchasedAt/review는 통합 소유자가 공급합니다. 상품 평점·건수와 작성한 리뷰의 별점은 별도로 제공하며, PC·모바일 표시 건수 차이는 시안용입니다. 현재 연결 Context·요청은 없습니다.
 * 실제 ID에 예시 상품을 붙이는 용도로 createReviewFixture를 호출하지 않습니다.
 */

import { formatProductOptions } from '@/lib/formatProductOptions';

import type { ReviewListEntry, WrittenReview } from './reviews.types';

export function createReviewFixture(
  id: ReviewListEntry['id'],
  review?: WrittenReview,
): ReviewListEntry {
  return {
    id,
    product: {
      name: 'Speedgoat 7 GTX',
      imageSrc: '/images/cart/speedgoat-black.png',
      optionLabel: formatProductOptions({ color: '브라운', size: '235', width: '레귤러' }),
      gender: "Men's",
      price: '240,000원',
    },
    purchasedAt: '2026.08.18',
    review,
  };
}

export const demoWrittenReview = {
  rating: 5 as const,
  body: '쿠션감이 좋아서 집 앞 외출할 때도 자주 신고 다녀요.',
} satisfies WrittenReview;

const readyReviews = Array.from({ length: 7 }, (_, index) =>
  createReviewFixture(`preview-purchase-${index}`),
);

const writtenReviews = Array.from({ length: 2 }, (_, index) => ({
  ...createReviewFixture(`preview-written-${index}`, demoWrittenReview),
  product: { ...readyReviews[0].product, rating: { value: 4.5, count: 472 } },
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

/** 플랫폼별 시안의 목록 길이와 표시 건수를 제공합니다. */
export const reviewPagePreview = {
  web: {
    ready: { ...reviewListPreview.ready, items: readyReviews.slice(0, 3) },
    written: { ...reviewListPreview.written, totalCount: 62 },
  },
  mobile: {
    ready: { ...reviewListPreview.ready, totalCount: 2 },
    written: reviewListPreview.written,
  },
};

/** 빈 화면과 팝업을 바로 확인하기 위한 고정 예시입니다. */
export const reviewStatePreview = {
  empty: { items: [], totalCount: 0, more },
  new: { items: [readyReviews[0]], totalCount: 1, more },
  edit: {
    items: [writtenReviews[0]],
    totalCount: 1,
    more,
  },
};
