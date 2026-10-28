'use client';

import { useContext, useState } from 'react';
import { MyPageInitialStateContext } from '@/context/MyPageInitialState';
import type { RatingValue } from '@/components/common/atoms/RatingStars/RatingStars';
import { MyPageReviewDialog } from '@/components/features/mypage/MyPageReviewDialog';
import { MyPageFrame } from '@/components/features/mypage/MyPageFrame';
import { MyPageReviewsContent } from '@/components/features/mypage/reviews/MyPageReviewsContent';
import type { ReviewTab, WrittenReview } from '@/components/features/mypage/reviews/reviews.types';

/** 리뷰 목록의 탐색과 작성 및 수정 상태를 관리합니다. (Manages review browsing, writing, and editing state.) */
export default function Page() {
  const { readyReviewCount: initialReadyCount = 62 } = useContext(MyPageInitialStateContext);
  const [tab, setTab] = useState<ReviewTab>('ready');
  const [sort, setSort] = useState('recent');
  const [visibleCount, setVisibleCount] = useState(10);
  const [editing, setEditing] = useState<number | null>(null);
  const [rating, setRating] = useState<RatingValue>(0);
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [writtenIds, setWrittenIds] = useState<number[]>([0, 1]);
  const [writtenReviews, setWrittenReviews] = useState<Record<number, WrittenReview>>({});
  const readyIds = Array.from({ length: initialReadyCount }, (_, index) => index);
  const ids = tab === 'ready' ? readyIds : writtenIds;
  const sortedIds = sort === 'oldest' ? [...ids].reverse() : ids;
  const displayedIds = sortedIds.slice(0, visibleCount);

  function changeTab(value: ReviewTab) {
    setTab(value);
    setVisibleCount(10);
  }

  function openEditor(id: number) {
    setEditing(id);
    setRating(writtenReviews[id]?.rating ?? 0);
    setBody(writtenReviews[id]?.body ?? '');
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
      <MyPageReviewsContent
        tab={tab}
        sort={sort}
        totalCount={ids.length}
        visibleCount={visibleCount}
        entries={displayedIds.map((id) => ({ id, review: writtenReviews[id] }))}
        hasMore={displayedIds.length < ids.length}
        onTabChange={changeTab}
        onSortChange={setSort}
        onEdit={openEditor}
        onLoadMore={() => setVisibleCount((count) => count + 10)}
      />
      <MyPageReviewDialog
        open={editing !== null}
        title={tab === 'ready' ? '상품리뷰 작성' : '상품리뷰 수정'}
        rating={rating}
        body={body}
        invalid={submitted && (!rating || !body.trim())}
        onOpenChange={(open) => {
          if (!open) closeEditor();
        }}
        onRatingChange={setRating}
        onBodyChange={setBody}
        onSave={() => {
          setSubmitted(true);
          if (rating && body.trim()) {
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
