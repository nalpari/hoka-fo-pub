'use client';

import { useState } from 'react';

import { createReviewFixture, demoWrittenReview } from '@/app/mypage/reviews/reviewFixtures';
import type { ReviewTab } from '@/app/mypage/reviews/reviews.types';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import type { RatingValue } from '@/types/component-contracts/components-common-atoms-RatingStars-RatingStars';

import { MyPageReviewDialog, MyPageReviewsContent } from './MyPageReviewsContent';

/** [ 개발팀 바인딩 ] 두 탭의 빈 결과 또는 편집/고정 오류 fixture입니다. 저장·조회는 실행하지 않으며 실제 리뷰/구매 ID와 저장 결과·갱신은 MyPageDataContext.reviews 소유자가 관리합니다. */
/** 리뷰 탭의 빈 상태와 작성·수정 오류를 표시합니다. (Displays empty review tabs and fixed review editing states.) */
export function ReviewStatePreview({
  state,
}: {
  state: 'empty' | 'written-empty' | 'new' | 'edit' | 'error';
}) {
  const [tab, setTab] = useState<ReviewTab>(
    state === 'written-empty' || state === 'edit' ? 'written' : 'ready',
  );
  const empty = state === 'empty' || state === 'written-empty';
  const [open, setOpen] = useState(!empty);
  const [rating, setRating] = useState<RatingValue>(state === 'edit' ? 4 : 0);
  const [body, setBody] = useState(state === 'edit' ? demoWrittenReview.body : '');
  const entry = createReviewFixture(
    'preview-review',
    state === 'edit' ? demoWrittenReview : undefined,
  );
  return (
    <MyPageFrame activePath="/mypage/reviews" breadcrumbs={[{ label: '상품리뷰' }]}>
      <MyPageReviewsContent
        tab={tab}
        sort="recent"
        totalCount={empty ? 0 : 1}
        visibleCount={1}
        entries={empty ? [] : [entry]}
        hasMore={false}
        onTabChange={setTab}
        onSortChange={() => {}}
        onEdit={() => setOpen(true)}
        onLoadMore={() => {}}
      />
      <MyPageReviewDialog
        open={open}
        productName={entry.product.name}
        title={state === 'edit' ? '리뷰 수정' : '리뷰 작성'}
        rating={rating}
        body={body}
        invalid={state === 'error'}
        fixedErrors={state === 'error'}
        onOpenChange={setOpen}
        onRatingChange={setRating}
        onBodyChange={setBody}
        onSave={() => {}}
      />
    </MyPageFrame>
  );
}
