'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
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
    <HStack
      justifyContent="space-between"
      alignItems="center"
      minH="64px"
      borderBottom="1px solid var(--color-black-100)"
    >
      <MyPageReviewSort sort={sort} onSortChange={onSortChange} />
      <MyPageReviewCount count={count} />
    </HStack>
  );
}

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
  const platform = usePlatform();
  const actionProps =
    platform === 'mobile'
      ? ({ variant: 'link', size: 'sm' } as const)
      : ({ variant: 'secondary', size: 'short' } as const);
  return (
    <Grid
      as="li"
      position="relative"
      borderBottom="1px solid var(--color-black-20)"
      alignItems="center"
      gap="4"
      py="4"
      gridTemplateColumns={
        tab === 'written' ? 'minmax(0, 1.3fr) 120px minmax(0, 1fr) 80px' : 'minmax(0, 1fr) 80px'
      }
      _mobile={{ gridTemplateColumns: 'minmax(0, 1fr)', gap: '2' }}
    >
      <HStack gap="4" minW="0">
        <Box w="64px" h="64px" flexShrink="0">
          <ProductThumbnail alt={product.name} src={product.imageSrc} />
        </Box>
        <Stack minW="0" gap="1" _mobile={{ pr: '18' }}>
          <HStack
            gap="0.5"
            display={tab === 'written' ? { base: 'none', _mobile: 'flex' } : 'flex'}
          >
            <Typography variant="body4" language="en" weight="medium">
              {purchasedAt}
            </Typography>
            <Typography variant="body4" weight="medium">
              구매
            </Typography>
          </HStack>
          {tab === 'written' ? (
            <Stack gap="0" display={{ base: 'flex', _mobile: 'none' }}>
              {product.gender ? <Typography variant="body4">{product.gender}</Typography> : null}
              <Typography variant="body4" weight="medium">
                {product.name}
              </Typography>
              {product.price ? <Typography variant="body4">{product.price}</Typography> : null}
            </Stack>
          ) : null}
          <Box display={tab === 'written' ? { base: 'none', _mobile: 'block' } : 'block'}>
            <Typography variant="body4" weight="medium">
              옵션 : {product.optionLabel}
            </Typography>
          </Box>
        </Stack>
      </HStack>
      {tab === 'written' ? (
        <Box _mobile={{ pl: '80px' }}>
          <RatingStars value={review?.rating ?? 0} size="16px" />
        </Box>
      ) : null}
      {tab === 'written' ? (
        <Typography
          variant="body5"
          tone="primary"
          className={css({ lineClamp: 1, _mobile: { pl: '80px', lineClamp: 2 } })}
        >
          {review?.body ?? ''}
        </Typography>
      ) : null}
      <Button
        {...actionProps}
        className={css({
          '--button-height': '32px',
          '--button-label-size': '12px',
          '--button-padding-x': '12px',
          _mobile: { position: 'absolute', top: '4', right: '0' },
        })}
        onClick={() => onEdit(id)}
      >
        {tab === 'ready' ? '리뷰 작성' : '수정하기'}
      </Button>
    </Grid>
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
      {tab === 'written' ? (
        <Grid
          display={{ base: 'grid', _mobile: 'none' }}
          gridTemplateColumns="minmax(0, 1.3fr) 120px minmax(0, 1fr) 80px"
          gap="4"
          textAlign="center"
          borderBottom="1px solid var(--color-black-100)"
          py="4"
        >
          <Typography variant="body4">상품정보</Typography>
          <Typography variant="body4">평점</Typography>
          <Typography variant="body4">리뷰</Typography>
        </Grid>
      ) : null}
      <Stack
        as="ul"
        gap="0"
        aria-label={tab === 'ready' ? '작성 가능한 리뷰 목록' : '작성한 리뷰 목록'}
      >
        {entries.map((entry) => (
          <MyPageReviewItem key={entry.id} entry={entry} tab={tab} onEdit={onEdit} />
        ))}
      </Stack>
    </Stack>
  );
}

type MyPageReviewLoadMoreProps = {
  visibleCount: number;
  totalCount: number;
  pageInfo?: { current: number; total: number };
  onLoadMore?: () => void;
};

function MyPageReviewLoadMore({
  visibleCount,
  totalCount,
  pageInfo,
  onLoadMore,
}: MyPageReviewLoadMoreProps) {
  return (
    <Box mt="6" w="160px" mx="auto" _mobile={{ w: '100%' }}>
      <Button
        fullWidth
        variant="secondary"
        size="short"
        onClick={onLoadMore}
        disabled={!onLoadMore}
        className={
          !onLoadMore
            ? css({
                '&&:disabled > span': {
                  bg: 'white!',
                  color: 'black.100!',
                  boxShadow: 'inset 0 0 0 1px var(--color-black-100)!',
                },
              })
            : undefined
        }
        loadMore={{
          counter: pageInfo ?? {
            current: Math.ceil(visibleCount / 10),
            total: Math.ceil(totalCount / 10),
          },
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
  pageInfo?: { current: number; total: number };
  onTabChange: (value: ReviewTab) => void;
  onSortChange: (value: string) => void;
  onEdit: (id: ReviewListEntry['id']) => void;
  onLoadMore?: () => void;
};

/** 리뷰 목록과 조회 도구를 구성합니다. (Composes review lists and query controls.) */
export function MyPageReviewsContent({
  tab,
  sort,
  totalCount,
  visibleCount,
  entries,
  hasMore,
  pageInfo,
  onTabChange,
  onSortChange,
  onEdit,
  onLoadMore,
}: MyPageReviewsContentProps) {
  return (
    <Stack gap="0" pb="16">
      <Box mb="10" _mobile={{ mb: '6' }}>
        <Typography as="h1" web="headingKr6" mo="headingKr5">
          상품리뷰
        </Typography>
      </Box>
      <MyPageReviewTabs value={tab} onChange={onTabChange} />
      {totalCount ? (
        <Box>
          <MyPageReviewToolbar count={totalCount} sort={sort} onSortChange={onSortChange} />
          <MyPageReviewList entries={entries} tab={tab} onEdit={onEdit} />
          {hasMore ? (
            <MyPageReviewLoadMore
              visibleCount={visibleCount}
              totalCount={totalCount}
              pageInfo={pageInfo}
              onLoadMore={onLoadMore}
            />
          ) : null}
        </Box>
      ) : (
        <Stack
          as="section"
          minH="480px"
          justifyContent="center"
          alignItems="center"
          _mobile={{ minH: '180px' }}
        >
          <Typography variant="body4" tone="tertiary">
            {tab === 'ready' ? '작성 가능한 상품 리뷰가 없습니다.' : '작성한 리뷰가 없습니다.'}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
