'use client';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack, VStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { FormField } from '@/components/common/atoms/FormField';
import { RatingStars } from '@/components/common/atoms/RatingStars';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

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
  onSave?: () => void;
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
      variant="form"
      closeLabel="리뷰 작성창 닫기"
      onOpenChange={onOpenChange}
      open={open}

      title={title}
      actions={{
        kind: 'single',
        label: '저장',
        onConfirm: onSave,
        buttonProps: { disabled: pending },
      }}
    >
      <fieldset disabled={pending}>
        <Stack gap="20px">
          <BindingFeedback
            error={error}
            pending={pending}
            pendingMessage="리뷰를 저장하고 있습니다."
            errorFirst
          />
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

const reviewProductText = css({
  '&&': { lineHeight: '1.5' },
});

const reviewDateAndName = css({
  '&&': { lineHeight: '1.5', _mobile: { fontSize: '13px' } },
});

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
      py={tab === 'written' ? '32px' : '16px'}
      gridTemplateColumns={
        tab === 'written'
          ? 'minmax(0, 340fr) minmax(96px, 120fr) minmax(0, 300fr) 84px'
          : 'minmax(0, 1fr) auto'
      }
      _mobile={{
        gridTemplateColumns: tab === 'ready' ? 'minmax(0, 1fr) auto' : '64px minmax(0, 1fr)',
        columnGap: tab === 'ready' ? '8px' : '16px',
        rowGap: '8px',
        py: '16px',
        alignItems: 'start',
      }}
    >
      <HStack
        gap="16px"
        minW="0"
        alignItems="center"
        _mobile={{ gridColumn: tab === 'ready' ? '1' : '1 / -1', alignItems: 'flex-start' }}
      >
        <OrderProductSummary
          variant="cart"
          name={product.name}
          image={product.imageSrc}
          alignStart
          imageSize={{ web: 64, mobile: 64 }}
          content={
            <Stack minW="0" gap="6px">
              <HStack gap="2px" _mobile={{ pr: tab === 'written' ? '64px' : '0' }}>
                <Typography variant="body3" language="en" className={reviewDateAndName}>
                  {purchasedAt}
                </Typography>
                <Typography variant="body3" className={reviewDateAndName}>
                  구매
                </Typography>
              </HStack>
              <Stack gap="4px">
                <Typography variant="body3" className={reviewDateAndName}>
                  {product.name}
                </Typography>
                <Typography web="body3" mo="body5" tone="subtle" className={reviewProductText}>
                  {product.optionLabel.replaceAll(' / ', ', ')}
                </Typography>
              </Stack>
            </Stack>
          }
        />
      </HStack>
      {tab === 'written' ? (
        <Box
          lineHeight="0"
          textAlign="center"
          _mobile={{ gridColumn: '2', textAlign: 'left', pt: '4px' }}
        >
          <RatingStars
            value={review?.rating ?? 0}
            size="16px"
            className={css({ '&&': { gap: '4px' } })}
          />
        </Box>
      ) : null}
      {tab === 'written' ? (
        <Typography
          web="body4"
          mo="body5"
          tone="primary"
          className={css({
            '&&': { lineHeight: '1.5' },
            lineClamp: 1,
            mx: '16px',
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
          _mobile:
            tab === 'ready'
              ? { gridColumn: '2', gridRow: '1', alignSelf: 'center' }
              : { position: 'absolute', top: '16px', right: '0' },
        })}
        onClick={() => onEdit(id)}
      >
        {tab === 'ready' ? '리뷰 작성' : '수정하기'}
      </Button>
    </Grid>
  );
}

type MyPageReviewsContentProps = {
  tab: ReviewTab;
  sort: string;
  totalCount: number;
  entries: readonly ReviewListEntry[];
  more?: { counter: { current: number; total: number }; onLoadMore?: () => void };
  onTabChange: (value: ReviewTab) => void;
  onSortChange: (value: string) => void;
  onEdit: (id: ReviewListEntry['id']) => void;
};

/** 리뷰 목록과 조회 도구를 구성합니다. (Composes review lists and query controls.) */
export function MyPageReviewsContent({
  tab,
  sort,
  totalCount,
  entries,
  more,
  onTabChange,
  onSortChange,
  onEdit,
}: MyPageReviewsContentProps) {
  return (
    <ContentSection
      css={{ '--line-heights-body': '1.5' }}
      title="상품리뷰"
      gap="40px"
      _mobile={{ gap: '24px', pt: '24px' }}
      headerProps={{
        titleAs: 'h1',
        titleProps: { web: 'headingKr6', mo: 'headingKr5' },
      }}
    >
      <Stack gap="0">
        {/* [ 개발팀 바인딩 ] 정렬 선택은 onSortChange로 전달하며 서버 조회와 목록 갱신은 호출자가 담당합니다. */}
        <SegmentedControl
          ariaLabel="상품리뷰 구분"
          onValueChange={onTabChange}
          options={[
            { value: 'ready', label: '작성 가능한 리뷰' },
            { value: 'written', label: '내가 작성한 리뷰' },
          ]}
          variant="underline"
          value={tab}
          className={css({ borderBottom: '0', _mobile: { w: 'calc(100% + 32px)', mx: '-4' } })}
          itemClassName={(_, selected) =>
            css({
              minH: '42px',
              borderBottomWidth: selected ? '2px' : '1px',
              borderBottomColor: selected ? 'black.100' : 'black.20',
              _mobile: { minH: '44px' },
            })
          }
          itemRender={(option) => (
            <Typography
              as="button"
              mo="body4"
              web="body3"
              weight={option.value === tab ? 'bold' : 'regular'}
            >
              {option.label}
            </Typography>
          )}
        />
        {totalCount ? (
          <Box>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              pb="16px"
              pt="40px"
              _mobile={{ pt: '32px' }}
              borderBottom="1px solid var(--color-black-100)"
            >
              <Dropdown
                variant="sort"
                popupAlign="start"
                ariaLabel="리뷰 정렬"
                value={sort}
                onValueChange={onSortChange}
                options={[
                  { value: 'recent', label: '최근 구매순' },
                  { value: 'oldest', label: '오래된 구매순' },
                ]}
              />
              <HStack gap="2px">
                <Typography variant="body4">총</Typography>
                <Typography variant="body4Medium">
                  {totalCount}
                  <Typography variant="bodyKr4">건</Typography>
                </Typography>
              </HStack>
            </HStack>
            <Stack gap="0">
              {tab === 'written' ? (
                <Grid
                  display={{ base: 'grid', _mobile: 'none' }}
                  gridTemplateColumns="minmax(0, 340fr) minmax(96px, 120fr) minmax(0, 300fr) 84px"
                  gap="0"
                  textAlign="center"
                  borderTop="2px solid var(--color-black-100)"
                  borderBottom="1px solid var(--color-black-100)"
                  py="20px"
                >
                  <Typography variant="headingKr9">상품정보</Typography>
                  <Typography variant="headingKr9">평점</Typography>
                  <Typography variant="headingKr9">리뷰</Typography>
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
            {more ? (
              <VStack mt="24px">
                <Button
                  variant="plain"
                  size="lg"
                  onClick={more.onLoadMore}
                  disabled={!more.onLoadMore}
                  loadMore={{ counter: more.counter }}
                />
              </VStack>
            ) : null}
          </Box>
        ) : (
          <EmptyState
            variant="page"
            as="section"
            title={tab === 'ready' ? '작성 가능한 상품이 없습니다.' : '작성한 리뷰가 없습니다.'}
            titleProps={{
              as: 'span',
              web: 'headingKr7',
              mo: 'headingKr5',
            }}
            layoutProps={css.raw({
              minH: '755px',
              pt: '160px',
              pb: '0',
              justifyContent: 'flex-start',
              _mobile: {
                py: '0',
                minH: 'calc(100svh - var(--layout-site-header-height) - 186px)',
                justifyContent: 'center',
              },
            })}
          />
        )}
      </Stack>
    </ContentSection>
  );
}
