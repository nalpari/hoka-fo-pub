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
 * [ 개발팀 바인딩 ] 디자인 목록·빈 결과·편집 오류 fixture이며 저장·조회·페이지 추가 요청은 실행하지 않습니다. 이 화면은 `more.counter`와 선택적 `more.onLoadMore`를 `MyPageReviewsContent`에 전달하며, 현재 preview는 표시용 카운터만 제공해 더보기 버튼이 비활성입니다. 실제 리뷰/구매 ID와 페이지 카운터·요청 콜백, 저장 결과·목록 갱신은 통합 소유자가 연결합니다. 작성한 목록은 PC 1건·총 62건·1/10, MO 2건·총 2건·더보기 없음인 독립 예시이며 실제 응답 건수로 추론하지 않습니다. 이 preview의 편집은 저장 성공을 표시하거나 데이터를 갱신하지 않습니다.
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
  const listDisplay =
    tab === 'written' && platform === 'mobile'
      ? reviewListPreview.writtenMobile
      : reviewListPreview;
  return (
    <MyPageFrame activePath="/mypage/reviews" breadcrumbs={[{ label: '상품리뷰' }]}>
      <MyPageReviewsContent
        tab={tab}
        sort={sort}
        totalCount={empty ? 0 : list ? listDisplay.totalCount : 1}
        entries={entries}
        more={
          list && listDisplay.hasMore
            ? { counter: reviewListPreview.pageInfo, onLoadMore: undefined }
            : undefined
        }
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
        title={state === 'edit' || (list && tab === 'written') ? '상품리뷰 수정' : '상품리뷰 작성'}
        rating={rating}
        body={body}
        invalid={state === 'error'}
        fixedErrors={state === 'error'}
        onOpenChange={setOpen}
        onRatingChange={setRating}
        onBodyChange={setBody}
      />
    </MyPageFrame>
  );
}
