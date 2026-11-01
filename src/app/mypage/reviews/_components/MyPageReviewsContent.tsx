'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { FormField } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';
import { RatingStars } from '@/components/common/atoms/RatingStars';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Select } from '@/components/common/atoms/Select';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { ProductThumbnail } from '@/components/common/molecules/ProductThumbnail';

import { ContentSection } from '@/components/common/layouts/ContentSection';
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
      <fieldset disabled={pending}>
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
      className={css({ borderBottom: '0', _mobile: { w: 'calc(100% + 32px)', mx: '-4' } })}
      itemClassName={(_, selected) =>
        css({
          minH: '42px',
          borderBottomWidth: selected ? '2px' : '1px',
          borderBottomColor: selected ? 'black.100' : 'black.20',
          _mobile: { minH: '8' },
        })
      }
      itemRender={(option) => (
        <Typography as="button" variant="body3" weight="regular">
          {option.label}
        </Typography>
      )}
    />
  );
}

const sortSelect = css({
  // Resolve the native Select's base styles without competing atomic classes.
  '&&': {
    border: '0',
    bg: 'transparent',
    p: '0',
    pr: '22px',
    minH: '20px',
    h: '20px',
    appearance: 'none',
    borderRadius: '0',
  },
  fontSize: '16px',
  fontWeight: 'normal',
});

type MyPageReviewSortProps = { sort: string; onSortChange: (value: string) => void };

function MyPageReviewSort({ sort, onSortChange }: MyPageReviewSortProps) {
  return (
    <Box w="102px" pos="relative">
      <Select
        aria-label="리뷰 정렬"
        className={sortSelect}
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="recent">최근 구매순</option>
        <option value="oldest">오래된 구매순</option>
      </Select>
      <Icon
        name="chevron-down-small"
        size="14px"
        className={css({ pos: 'absolute', right: '0', top: '3px', pointerEvents: 'none' })}
      />
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
      pb="4"
      mt="10"
      _mobile={{ mt: '8' }}
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
      ? ({ variant: 'link', size: 'md' } as const)
      : ({ variant: 'secondary', size: 'short' } as const);
  return (
    <Grid
      as="li"
      position="relative"
      borderBottom="1px solid var(--color-black-20)"
      alignItems="center"
      gap="0"
      py={tab === 'written' ? '8' : '4'}
      gridTemplateColumns={
        tab === 'written'
          ? 'minmax(0, 340fr) minmax(96px, 120fr) minmax(0, 300fr) 84px'
          : 'minmax(0, 1fr) auto'
      }
      _mobile={{
        gridTemplateColumns: '64px minmax(0, 1fr)',
        columnGap: '4',
        rowGap: '2',
        py: '4',
        alignItems: 'start',
      }}
    >
      <HStack
        gap="4"
        minW="0"
        alignItems="center"
        _mobile={{ gridColumn: '1 / -1', alignItems: 'flex-start' }}
      >
        <Box
          w={tab === 'written' ? '24' : '16'}
          h={tab === 'written' ? '24' : '16'}
          flexShrink="0"
          _mobile={{ w: '16', h: '16' }}
        >
          <ProductThumbnail alt={product.name} src={product.imageSrc} />
        </Box>
        <Stack minW="0" gap="1.5">
          <HStack gap="0.5" display="none" _mobile={{ display: 'flex', pr: '18' }}>
            <Typography variant="body4" language="en">
              {purchasedAt}
            </Typography>
            <Typography variant="body4">구매</Typography>
          </HStack>
          <Stack gap={tab === 'written' ? '0.5' : '1'}>
            {tab === 'written' ? (
              <Box display="block" _mobile={{ display: 'none' }}>
                {product.gender ? <Typography variant="body4">{product.gender}</Typography> : null}
              </Box>
            ) : null}
            <Typography variant="body4">{product.name}</Typography>
            {tab === 'written' && product.price ? (
              <Typography variant="body4" className={css({ _mobile: { display: 'none' } })}>
                {product.price}
              </Typography>
            ) : null}
            <Typography
              variant="body4"
              className={css(
                tab === 'written' ? { display: 'none', _mobile: { display: 'block' } } : {},
              )}
            >
              옵션 : {product.optionLabel}
            </Typography>
          </Stack>
        </Stack>
      </HStack>
      {tab === 'written' ? (
        <Box
          lineHeight="0"
          textAlign="center"
          _mobile={{ gridColumn: '2', textAlign: 'left', mt: '0.5' }}
        >
          <RatingStars
            value={review?.rating ?? 0}
            size="16px"
            className={css({ '&&': { gap: '1' } })}
          />
        </Box>
      ) : null}
      {tab === 'written' ? (
        <Typography
          web="body4"
          mo="body5"
          tone="primary"
          className={css({
            lineClamp: 1,
            mx: '4',
            _mobile: { gridColumn: '2', mx: '0', lineClamp: 1 },
          })}
        >
          {review?.body ?? ''}
        </Typography>
      ) : null}
      <Button
        {...actionProps}
        className={css({
          justifySelf: 'end',
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
          gridTemplateColumns="minmax(0, 340fr) minmax(96px, 120fr) minmax(0, 300fr) 84px"
          gap="0"
          textAlign="center"
          borderTop="2px solid var(--color-black-100)"
          borderBottom="1px solid var(--color-black-100)"
          py="5"
        >
          <Typography variant="heading9">상품정보</Typography>
          <Typography variant="heading9">평점</Typography>
          <Typography variant="heading9">리뷰</Typography>
        </Grid>
      ) : null}
      <Stack
        as="ul"
        gap="0"
        aria-label={tab === 'ready' ? '작성 가능한 리뷰 목록' : '내가 작성한 리뷰'}
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
    <ContentSection
      title="상품리뷰"
      gap="10"
      _mobile={{ gap: '0' }}
      headerProps={{
        titleAs: 'h1',
        titleProps: { web: 'headingKr6', mo: 'headingKr5' },
        className: css({ _mobile: { srOnly: true } }),
      }}
    >
      <Stack gap="0">
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
            mt="10"
            py="203px"
            justifyContent="center"
            alignItems="center"
            _mobile={{ mt: '0', pt: '24', pb: '8' }}
          >
            <Typography variant="body3" className={css({ color: '#4D4D4D' })}>
              {tab === 'ready' ? '작성 가능한 상품이 없습니다.' : '작성한 리뷰가 없습니다.'}
            </Typography>
          </Stack>
        )}
      </Stack>
    </ContentSection>
  );
}
