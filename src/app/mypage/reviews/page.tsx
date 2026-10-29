'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.reviews에 ready/written과 save를 연결합니다. 행별 실제 상품/구매일/옵션/리뷰 모델을 전달합니다.
 * save는 선택 구매/리뷰 id와 본문·평점을 받습니다. 저장 후 목록을 갱신하고 resolve합니다. 현재 계약에는 파일 업로드가 없습니다. 현재 더보기는 전달받은 누적 배열의 표시 개수를 늘립니다.
 */

import { useContext, useState } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';
import { MyPageInitialStateContext } from '@/context/MyPageInitialState';
import { useRequestAction } from '@/hooks/useRequestAction';

import { Typography } from '@/components/common/atoms/Typography';

import { createReviewFixture, demoWrittenReview } from '@/app/mypage/reviews/reviewFixtures';
import {
  type ReviewListEntry,
  type ReviewTab,
  type WrittenReview,
} from '@/app/mypage/reviews/reviews.types';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import type { RatingValue } from '@/types/component-contracts/components-common-atoms-RatingStars-RatingStars';

import { MyPageReviewDialog, MyPageReviewsContent } from './_components/MyPageReviewsContent';

/** 리뷰 목록의 탐색과 작성 및 수정 상태를 관리합니다. (Manages review browsing, writing, and editing state.) */
export default function Page() {
  const { readyReviewCount: initialReadyCount = 62 } = useContext(MyPageInitialStateContext);
  const { reviews: binding } = useContext(MyPageDataContext);
  const request = useRequestAction();
  const [tab, setTab] = useState<ReviewTab>('ready');
  const [sort, setSort] = useState('recent');
  const [visibleCount, setVisibleCount] = useState(10);
  const [editing, setEditing] = useState<ReviewListEntry['id'] | null>(null);
  const [rating, setRating] = useState<RatingValue>(0);
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [writtenIds, setWrittenIds] = useState<ReviewListEntry['id'][]>([0, 1]);
  const [writtenReviews, setWrittenReviews] = useState<Record<string, WrittenReview>>({});
  const readyIds = Array.from({ length: initialReadyCount }, (_, index) => index);
  const ids = tab === 'ready' ? readyIds : writtenIds;
  const entries = binding
    ? [...(tab === 'ready' ? binding.ready : binding.written)]
    : ids.map((id) =>
        createReviewFixture(
          id,
          writtenReviews[id] ?? (tab === 'written' ? demoWrittenReview : undefined),
        ),
      );
  const sortedEntries = binding
    ? [...entries].sort((a, b) =>
        sort === 'oldest'
          ? a.purchasedAt.localeCompare(b.purchasedAt)
          : b.purchasedAt.localeCompare(a.purchasedAt),
      )
    : sort === 'oldest'
      ? [...entries].reverse()
      : entries;
  const displayedEntries = sortedEntries.slice(0, visibleCount);
  const selectedEntry = entries.find((entry) => entry.id === editing);

  function changeTab(value: ReviewTab) {
    setTab(value);
    setVisibleCount(10);
  }

  function openEditor(id: ReviewListEntry['id']) {
    setEditing(id);
    const review = entries.find((entry) => entry.id === id)?.review;
    setRating(([0, 1, 2, 3, 4, 5] as const).find((value) => value === review?.rating) ?? 0);
    setBody(review?.body ?? '');
  }

  function closeEditor() {
    setEditing(null);
    setRating(0);
    setBody('');
    setSubmitted(false);
  }

  return (
    <MyPageFrame
      activePath="/mypage/reviews"
      breadcrumbs={[{ label: '구매내역', href: '/mypage' }, { label: '상품리뷰' }]}
    >
      {binding?.pending && <Typography role="status">리뷰를 불러오고 있습니다.</Typography>}
      {binding?.error && <Typography role="alert">{binding.error}</Typography>}
      {entries.length === 0 && (binding?.pending || binding?.error) ? null : (
        <MyPageReviewsContent
          tab={tab}
          sort={sort}
          totalCount={entries.length}
          visibleCount={visibleCount}
          entries={displayedEntries}
          hasMore={displayedEntries.length < entries.length}
          onTabChange={changeTab}
          onSortChange={setSort}
          onEdit={openEditor}
          onLoadMore={() => setVisibleCount((count) => count + 10)}
        />
      )}
      <MyPageReviewDialog
        productName={selectedEntry?.product.name ?? ''}
        pending={request.pending}
        error={request.error}
        open={editing !== null}
        title={tab === 'ready' ? '상품리뷰 작성' : '상품리뷰 수정'}
        rating={rating}
        body={body}
        invalid={submitted && (!rating || !body.trim())}
        onOpenChange={(open) => {
          if (!open && !request.pending) closeEditor();
        }}
        onRatingChange={setRating}
        onBodyChange={setBody}
        onSave={() => {
          setSubmitted(true);
          if (rating && body.trim()) {
            if (binding && editing !== null) {
              void request.run(async () => {
                await binding.save(editing, { rating, body: body.trim() });
                closeEditor();
              });
              return;
            }
            if (editing !== null && !writtenIds.includes(editing))
              setWrittenIds((current) => [...current, editing]);
            if (editing !== null)
              setWrittenReviews((current) => ({
                ...current,
                [editing]: { rating, body: body.trim() },
              }));
            closeEditor();
          }
        }}
      />
    </MyPageFrame>
  );
}
