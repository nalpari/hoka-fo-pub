'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import {
  createReviewFixture,
  demoWrittenReview,
  reviewListPreview,
} from '@/app/mypage/reviews/reviewFixtures';
import type { ReviewTab } from '@/app/mypage/reviews/reviews.types';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import type { RatingValue } from '@/types/component-contracts/components-common-atoms-RatingStars-RatingStars';

import { MyPageReviewDialog, MyPageReviewsContent } from './MyPageReviewsContent';

/** 리뷰 목록·빈 상태와 작성·수정 오류를 고정 표시합니다. (Displays prepared review lists, empty states, and editing errors.)
 * [ 개발팀 바인딩 ] 디자인 목록/빈 결과/편집 오류 fixture이며 저장·조회·페이지 추가 요청은 실행하지 않습니다. 실제 리뷰/구매 ID와 저장 결과·갱신은 MyPageDataContext.reviews 소유자가 관리합니다. PC 작성 목록 1건/MO 2건과 총 62건·1/10 표시는 독립된 디자인 예시이며 실제 응답 건수로 추론하지 않습니다.
 */
export function ReviewStatePreview({
  state,
}: {
  state: 'ready-list' | 'written-list' | 'empty' | 'written-empty' | 'new' | 'edit' | 'error';
}) {
  const platform = usePlatform();
  const [tab, setTab] = useState<ReviewTab>(
    state === 'written-list' || state === 'written-empty' || state === 'edit' ? 'written' : 'ready',
  );
  const empty = state === 'empty' || state === 'written-empty';
  const list = state === 'ready-list' || state === 'written-list';
  const [open, setOpen] = useState(!empty && !list);
  const [selected, setSelected] = useState<string | number | null>(null);
  const [sort, setSort] = useState('recent');
  const [rating, setRating] = useState<RatingValue>(state === 'edit' ? 4 : 0);
  const [body, setBody] = useState(state === 'edit' ? demoWrittenReview.body : '');
  const entry = createReviewFixture(
    'preview-review',
    state === 'edit' ? demoWrittenReview : undefined,
  );
  const entries = empty
    ? []
    : list
      ? tab === 'ready'
        ? reviewListPreview.ready
        : reviewListPreview.written.slice(0, platform === 'mobile' ? 2 : 1)
      : [entry];
  const selectedEntry = entries.find((item) => item.id === selected) ?? entry;
  return (
    <MyPageFrame
      activePath="/mypage/reviews"
      breadcrumbs={[{ label: '구매내역', href: '/mypage' }, { label: '상품리뷰' }]}
    >
      <MyPageReviewsContent
        tab={tab}
        sort={sort}
        totalCount={empty ? 0 : list ? reviewListPreview.totalCount : 1}
        visibleCount={entries.length}
        entries={entries}
        hasMore={list}
        pageInfo={list ? reviewListPreview.pageInfo : undefined}
        onTabChange={setTab}
        onSortChange={setSort}
        onEdit={(id) => {
          setSelected(id);
          const review = entries.find((item) => item.id === id)?.review;
          if (list) {
            setRating(([0, 1, 2, 3, 4, 5] as const).find((value) => value === review?.rating) ?? 0);
            setBody(review?.body ?? '');
          }
          setOpen(true);
        }}
      />
      <MyPageReviewDialog
        open={open}
        productName={selectedEntry.product.name}
        title={state === 'edit' || (list && tab === 'written') ? '리뷰 수정' : '리뷰 작성'}
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
