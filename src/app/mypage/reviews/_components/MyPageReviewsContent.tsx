'use client';

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
import { ProductThumbnail } from '@/components/common/molecules/ProductThumbnail';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { type ReviewListEntry, type ReviewTab } from '@/app/mypage/reviews/reviews.types';
import type { RatingValue } from '@/types/component-contracts/components-common-atoms-RatingStars-RatingStars';

type Props = {
  open: boolean;
  productName: string;
  pending?: boolean;
  error?: string;
  title: string;
  rating: RatingValue;
  body: string;
  invalid: boolean;
  fixedErrors?: boolean;
  onOpenChange: (open: boolean) => void;
  onRatingChange: (value: RatingValue) => void;
  onBodyChange: (value: string) => void;
  onSave: () => void;
};

/** 리뷰 작성 입력과 제출 상태를 표시합니다. (Displays review inputs and submission status.) */
export function MyPageReviewDialog({
  productName,
  pending,
  error,
  open,
  title,
  rating,
  body,
  invalid,
  fixedErrors = false,
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
      actions={{
        kind: 'single',
        label: '저장',
        onConfirm: onSave,
        buttonProps: { disabled: pending },
      }}
    >
      <fieldset disabled={pending} className={css({ border: 0, p: 0, m: 0, minW: 0 })}>
        <Stack gap="5">
          {error && <Typography role="alert">{error}</Typography>}
          {pending && <Typography role="status">리뷰를 저장하고 있습니다.</Typography>}
          <Typography as="p" variant="body3">
            {productName}은(는) 어떠셨나요?
          </Typography>
          <FormField
            htmlFor="review-rating"
            error={invalid && (fixedErrors || !rating) ? '별점을 선택해 주세요.' : undefined}
          >
            <RatingStars ariaLabel="상품 만족도" value={rating} onValueChange={onRatingChange} />
          </FormField>
          <TextFormField
            id="review-body"
            error={
              invalid && (fixedErrors || !body.trim()) ? '리뷰 내용을 입력해 주세요.' : undefined
            }
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
      </fieldset>
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

type MyPageReviewItemProps = {
  entry: ReviewListEntry;
  tab: ReviewTab;
  onEdit: (id: ReviewListEntry['id']) => void;
};

function MyPageReviewItem({
  entry: { id, product, purchasedAt, review },
  tab,
  onEdit,
}: MyPageReviewItemProps) {
  return (
    <HStack
      borderBottom="1px solid var(--colors-black-20)"
      alignItems="flex-start"
      gap="4"
      py="6"
      className={css({
        display: 'grid',
        gridTemplateColumns:
          tab === 'written'
            ? '64px minmax(0, 1fr) 100px minmax(0, 1fr) 80px'
            : '64px minmax(0, 1fr) 100px',
        _mobile: { gridTemplateColumns: '64px minmax(0, 1fr) 80px' },
      })}
    >
      <Box w="64px" h="64px" flexShrink="0">
        <ProductThumbnail alt={product.name} src={product.imageSrc} />
      </Box>
      <Stack flex="1" minW="0" gap="1.5">
        <HStack gap="0.5">
          <Typography variant="body4" language="en" weight="medium">
            {purchasedAt}
          </Typography>
          <Typography variant="body4" weight="medium">
            구매
          </Typography>
        </HStack>
        <Stack gap="1">
          <Typography variant="body4" weight="medium">
            {product.name}
          </Typography>
          <Typography variant="body4" weight="medium">
            옵션 : {product.optionLabel}
          </Typography>
        </Stack>
      </Stack>
      {tab === 'written' ? (
        <Stack gap="2" mt="1" className={css({ _mobile: { gridColumn: '2', gridRow: '2' } })}>
          <RatingStars value={review?.rating ?? 0} size="16px" />
        </Stack>
      ) : null}
      {tab === 'written' ? (
        <Typography
          variant="body5"
          tone="primary"
          className={css({ _mobile: { gridColumn: '2 / span 2', gridRow: '3' } })}
        >
          {review?.body ?? ''}
        </Typography>
      ) : null}
      <Button
        className={css({ gridColumn: '-2', gridRow: '1', alignSelf: 'start' }) + ' ' + textAction}
        size="md"
        variant="link"
        onClick={() => onEdit(id)}
      >
        {tab === 'ready' ? '리뷰 작성' : '수정하기'}
      </Button>
    </HStack>
  );
}

type MyPageReviewListProps = {
  entries: readonly ReviewListEntry[];
  tab: ReviewTab;
  onEdit: (id: ReviewListEntry['id']) => void;
};

function MyPageReviewList({ entries, tab, onEdit }: MyPageReviewListProps) {
  return (
    <Stack gap="0">
      <HStack
        display={{ _mobile: 'none' }}
        justifyContent="space-between"
        borderY="1px solid var(--colors-black-100)"
        py="4"
        px="6"
      >
        <Typography variant="body4">상품정보 / 구매일</Typography>
        <Typography variant="body4">{tab === 'written' ? '평가 / 리뷰' : '상품평 작성'}</Typography>
        <Typography variant="body4">{tab === 'written' ? '수정' : '작성'}</Typography>
      </HStack>
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
  onEdit: (id: ReviewListEntry['id']) => void;
  onLoadMore: () => void;
};

/** 리뷰 목록과 조회 도구를 구성합니다. (Composes review lists and query controls.) */
export function MyPageReviewsContent({
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
        <EmptyState
          title={tab === 'ready' ? '작성 가능한 상품 리뷰가 없습니다.' : '작성한 리뷰가 없습니다.'}
          variant="minimal"
        />
      )}
    </Stack>
  );
}
