'use client';

import { useContext, useState } from 'react';
import { MyPageInitialStateContext } from '@/context/MyPageInitialState';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Divider } from '@/components/common/atoms/Divider';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { FormField } from '@/components/common/atoms/FormField';
import { RatingStars } from '@/components/common/atoms/RatingStars';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Select } from '@/components/common/atoms/Select';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { ModalDialog } from '@/components/common/molecules/ModalDialog';
import { ProductThumbnail } from '@/components/common/molecules/ProductThumbnail';

import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import {
  type ReviewListEntry,
  type ReviewTab,
  type WrittenReview,
} from '@/components/mypage/reviews/reviews.types';
import type { RatingValue } from '@/types/component-contracts/components-common-atoms-RatingStars-RatingStars';

type Props = {
  open: boolean;
  title: string;
  rating: RatingValue;
  body: string;
  invalid: boolean;
  onOpenChange: (open: boolean) => void;
  onRatingChange: (value: RatingValue) => void;
  onBodyChange: (value: string) => void;
  onSave: () => void;
};

function MyPageReviewDialog({
  open,
  title,
  rating,
  body,
  invalid,
  onOpenChange,
  onRatingChange,
  onBodyChange,
  onSave,
}: Props) {
  return (
    <ModalDialog
      closeLabel="리뷰 작성창 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title={title}
      actions={{ kind: 'single', label: '저장', onConfirm: onSave }}
    >
      <Stack gap="5">
        <Typography as="p" variant="body3">
          클리프톤 9은(는) 어떠셨나요?
        </Typography>
        <FormField
          htmlFor="review-rating"
          error={invalid && !rating ? '별점을 선택해 주세요.' : undefined}
        >
          <RatingStars ariaLabel="상품 만족도" value={rating} onValueChange={onRatingChange} />
        </FormField>
        <TextFormField
          id="review-body"
          error={invalid && !body.trim() ? '리뷰 내용을 입력해 주세요.' : undefined}
          inputProps={{
            'aria-label': '리뷰 내용',
            multiline: true,
            placeholder: '상품 사용 경험을 입력해 주세요',
            value: body,
            onChange: (event) => onBodyChange(event.target.value),
          }}
        />
        {invalid ? (
          <Typography variant="body5" tone="error">
            별점과 리뷰 내용을 입력해 주세요.
          </Typography>
        ) : null}
      </Stack>
    </ModalDialog>
  );
}

type MyPageReviewTabsProps = { value: ReviewTab; onChange: (value: ReviewTab) => void };

function MyPageReviewTabs({ value, onChange }: MyPageReviewTabsProps) {
  return (
    <SegmentedControl
      ariaLabel="상품리뷰 구분"
      onValueChange={onChange}
      options={[
        { value: 'ready', label: '작성 가능한 리뷰' },
        { value: 'written', label: '내가 작성한 리뷰' },
      ]}
      variant="underline"
      value={value}
    />
  );
}

const sortSelect = css({
  // Resolve the native Select's base styles without competing atomic classes.
  '&&': { border: '0', bg: 'transparent', p: '0', minH: '20px', h: '20px' },
  fontSize: '16px',
  fontWeight: 'medium',
});

type MyPageReviewSortProps = { sort: string; onSortChange: (value: string) => void };

function MyPageReviewSort({ sort, onSortChange }: MyPageReviewSortProps) {
  return (
    <Box w="132px">
      <Select
        aria-label="리뷰 정렬"
        className={sortSelect}
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="recent">최근 구매순</option>
        <option value="oldest">오래된 구매순</option>
      </Select>
    </Box>
  );
}

type MyPageReviewCountProps = { count: number };

function MyPageReviewCount({ count }: MyPageReviewCountProps) {
  return (
    <HStack gap="0.5">
      <Typography variant="body4">총</Typography>
      <Typography variant="body4" weight="medium">
        {count}
        <Typography variant="bodyKr4">건</Typography>
      </Typography>
    </HStack>
  );
}

type MyPageReviewToolbarProps = {
  count: number;
  sort: string;
  onSortChange: (value: string) => void;
};

function MyPageReviewToolbar({ count, sort, onSortChange }: MyPageReviewToolbarProps) {
  return (
    <HStack justifyContent="space-between" alignItems="center" pb="4">
      <MyPageReviewSort sort={sort} onSortChange={onSortChange} />
      <MyPageReviewCount count={count} />
    </HStack>
  );
}

const textAction = css({ textDecoration: 'underline' });

const reviewImage = '/images/mypage/speedgoat-7-gtx.png';

type MyPageReviewItemProps = {
  entry: ReviewListEntry;
  tab: ReviewTab;
  onEdit: (id: number) => void;
};

function MyPageReviewItem({ entry: { id, review }, tab, onEdit }: MyPageReviewItemProps) {
  return (
    <HStack borderBottom="1px solid var(--colors-black-20)" alignItems="flex-start" gap="4" py="6">
      <Box w="64px" h="64px" flexShrink="0">
        <ProductThumbnail alt="클리프톤 9" src={reviewImage} />
      </Box>
      <Stack flex="1" minW="0" gap="1.5">
        <HStack gap="0.5">
          <Typography variant="body4" language="en" weight="medium">
            2026.08.18
          </Typography>
          <Typography variant="body4" weight="medium">
            구매
          </Typography>
        </HStack>
        <Stack gap="1">
          <Typography variant="body4" weight="medium">
            클리프톤 9
          </Typography>
          <Typography variant="body4" weight="medium">
            옵션 : 화이트 / 270
          </Typography>
        </Stack>
        {tab === 'written' ? (
          <Stack gap="2" mt="1">
            <RatingStars value={review?.rating ?? 4.5} size="16px" />
            <Typography variant="body5" tone="primary">
              {review?.body ?? '쿠션감이 좋아서 잘 달리고 있어요.'}
            </Typography>
          </Stack>
        ) : null}
      </Stack>
      <Button className={textAction} size="md" variant="link" onClick={() => onEdit(id)}>
        {tab === 'ready' ? '리뷰 작성' : '수정하기'}
      </Button>
    </HStack>
  );
}

type MyPageReviewListProps = {
  entries: readonly ReviewListEntry[];
  tab: ReviewTab;
  onEdit: (id: number) => void;
};

function MyPageReviewList({ entries, tab, onEdit }: MyPageReviewListProps) {
  return (
    <Stack gap="0">
      {entries.map((entry) => (
        <MyPageReviewItem key={entry.id} entry={entry} tab={tab} onEdit={onEdit} />
      ))}
    </Stack>
  );
}

type MyPageReviewLoadMoreProps = {
  visibleCount: number;
  totalCount: number;
  onLoadMore: () => void;
};

function MyPageReviewLoadMore({ visibleCount, totalCount, onLoadMore }: MyPageReviewLoadMoreProps) {
  return (
    <Box mt="6">
      <Button
        fullWidth
        variant="secondary"
        size="short"
        onClick={onLoadMore}
        loadMore={{
          counter: { current: Math.ceil(visibleCount / 10), total: Math.ceil(totalCount / 10) },
          labelProps: { mo: 'ctaKr2' },
          counterProps: { mo: 'body5' },
        }}
      />
    </Box>
  );
}

type MyPageReviewsContentProps = {
  tab: ReviewTab;
  sort: string;
  totalCount: number;
  visibleCount: number;
  entries: readonly ReviewListEntry[];
  hasMore: boolean;
  onTabChange: (value: ReviewTab) => void;
  onSortChange: (value: string) => void;
  onEdit: (id: number) => void;
  onLoadMore: () => void;
};

function MyPageReviewsContent({
  tab,
  sort,
  totalCount,
  visibleCount,
  entries,
  hasMore,
  onTabChange,
  onSortChange,
  onEdit,
  onLoadMore,
}: MyPageReviewsContentProps) {
  return (
    <Stack gap="0" pb="16">
      <MyPageReviewTabs value={tab} onChange={onTabChange} />
      {totalCount ? (
        <Box px="4" pt="8">
          <MyPageReviewToolbar count={totalCount} sort={sort} onSortChange={onSortChange} />
          <Divider variant="strong" />
          <MyPageReviewList entries={entries} tab={tab} onEdit={onEdit} />
          {hasMore ? (
            <MyPageReviewLoadMore
              visibleCount={visibleCount}
              totalCount={totalCount}
              onLoadMore={onLoadMore}
            />
          ) : null}
        </Box>
      ) : (
        <EmptyState title="작성한 리뷰가 없습니다." variant="minimal" />
      )}
    </Stack>
  );
}

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
