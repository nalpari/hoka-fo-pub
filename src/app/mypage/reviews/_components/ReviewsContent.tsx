'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Flex, Grid, HStack, Stack, VStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { FormField } from '@/components/common/atoms/FormField';
import { RatingStars } from '@/components/common/atoms/RatingStars';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  demoWrittenReview,
  reviewListPreview,
  reviewStatePreview,
} from '@/app/mypage/reviews/reviewFixtures';
import type { ReviewListEntry, ReviewTab } from '@/app/mypage/reviews/reviews.types';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import type { RatingValue } from '@/types/component-contracts/components-common-atoms-RatingStars-RatingStars';

type ReviewDialogProps = {
  open: boolean;
  productName: string;
  title: string;
  rating: RatingValue;
  body: string;
  invalid: boolean;
  onOpenChange: (open: boolean) => void;
  onRatingChange: (value: RatingValue) => void;
  onBodyChange: (value: string) => void;
};

/** 리뷰 작성 입력과 제출 상태를 표시합니다. (Displays review inputs and submission status.) */
function ReviewDialog({
  productName,
  open,
  title,
  rating,
  body,
  invalid,
  onOpenChange,
  onRatingChange,
  onBodyChange,
}: ReviewDialogProps) {
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
      }}
    >
      <Stack gap="20px">
        <Typography as="p" variant="body3">
          {productName}은(는) 어떠셨나요?
        </Typography>
        <FormField htmlFor="review-rating" error={invalid ? '별점을 선택해 주세요.' : undefined}>
          <RatingStars ariaLabel="상품 만족도" value={rating} onValueChange={onRatingChange} />
        </FormField>
        <TextFormField
          id="review-body"
          error={invalid ? '리뷰 내용을 입력해 주세요.' : undefined}
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

type ReviewItemProps = {
  entry: ReviewListEntry;
  tab: ReviewTab;
  onEdit?: () => void;
};

function ReviewItem({ entry: { product, purchasedAt, review }, tab, onEdit }: ReviewItemProps) {
  const platform = usePlatform();
  const actionProps =
    platform === 'mobile'
      ? ({ variant: 'link', size: 'md' } as const)
      : ({ variant: 'secondary', size: 'short' } as const);
  return (
    <Flex
      as="li"
      borderBottom="1px solid var(--color-black-20)"
      alignItems="center"
      gap="0"
      py={tab === 'written' ? '32px' : '16px'}
      _mobile={{
        alignItems: 'flex-start',
        py: '16px',
      }}
    >
      <Box flex="1" minW="0">
        <OrderProductSummary
          variant="review"
          name={product.name}
          image={product.imageSrc}
          orderDate={purchasedAt}
          optionText={product.optionLabel}
          rating={tab === 'written' ? (review?.rating ?? 0) : undefined}
          review={tab === 'written' ? review?.body : undefined}
        />
      </Box>
      <Flex
        flex={tab === 'written' ? '0 0 84px' : '0 0 auto'}
        justify="flex-end"
        _mobile={{ flex: '0 0 auto' }}
      >
        <Button {...actionProps} onClick={onEdit}>
          {tab === 'ready' ? '리뷰 작성' : '수정하기'}
        </Button>
      </Flex>
    </Flex>
  );
}

/** 리뷰 목록·빈 상태와 작성·수정 오류를 고정 표시합니다. (Displays prepared review lists, empty states, and editing errors.)
 * [ 개발팀 바인딩 ] 디자인 목록·빈 결과·편집 오류 fixture이며 저장·조회·페이지 추가 요청은 실행하지 않습니다. 이 화면의 더보기는 표시용 카운터만 제공해 비활성입니다. 목록 버튼은 고정 예시 팝업을 열며 실제 리뷰/구매 ID와 요청·목록 갱신은 통합 소유자가 연결합니다. 작성한 목록은 PC와 모바일 모두 2건을 표시합니다. 이 preview의 편집은 저장 성공을 표시하거나 데이터를 갱신하지 않습니다.
 */
export function ReviewsContent({
  state,
}: {
  state: 'ready-list' | 'written-list' | 'empty' | 'written-empty' | 'new' | 'edit' | 'error';
}) {
  const list = state === 'ready-list' || state === 'written-list';
  const empty = state === 'empty' || state === 'written-empty';
  const [tab, setTab] = useState<ReviewTab>(
    state === 'written-list' || state === 'written-empty' || state === 'edit' ? 'written' : 'ready',
  );
  const [open, setOpen] = useState(!list && !empty);
  const [sort, setSort] = useState('recent');
  const [rating, setRating] = useState<RatingValue>(
    state === 'edit' ? demoWrittenReview.rating : 0,
  );
  const [body, setBody] = useState(state === 'edit' ? demoWrittenReview.body : '');
  const display = empty
    ? reviewStatePreview.empty
    : list
      ? reviewListPreview[tab]
      : reviewStatePreview[state === 'edit' ? 'edit' : 'new'];
  const { items, totalCount, more } = display;
  return (
    <MyPageFrame
      fillAvailable={items.length === 0}
      activePath="/mypage/reviews"
      breadcrumbs={[{ label: '상품리뷰' }]}
    >
      <ContentSection
        flex={items.length === 0 ? '1' : undefined}
        title="상품리뷰"
        headerProps={{
          titleAs: 'h1',
          titleProps: { web: 'headingKr6', mo: 'headingKr5' },
        }}
        gap="40px"
        _mobile={{ gap: '24px', pt: '24px' }}
        css={{ '--line-heights-body': '1.5' }}
      >
        <Box
          display={items.length === 0 ? 'flex' : undefined}
          flexDirection="column"
          flex={items.length === 0 ? '1' : undefined}
        >
          {/* [ 개발팀 바인딩 ] 정렬 선택은 현재 화면의 로컬 상태이며 서버 조회와 목록 갱신은 연동 소유자가 담당합니다. */}
          <SegmentedControl
            ariaLabel="상품리뷰 구분"
            variant="underline"
            className={css({ _mobile: { w: 'calc(100% + 32px)', mx: '-16px' } })}
            value={tab}
            onValueChange={setTab}
            options={[
              { value: 'ready', label: '작성 가능한 리뷰' },
              { value: 'written', label: '내가 작성한 리뷰' },
            ]}
          />
          {items.length > 0 ? (
            <>
              <HStack
                justifyContent="space-between"
                pt="40px"
                pb="16px"
                _mobile={{ pt: '32px' }}
                borderBottom="1px solid var(--color-black-100)"
              >
                <Dropdown
                  ariaLabel="리뷰 정렬"
                  variant="sort"
                  popupAlign="start"
                  value={sort}
                  onValueChange={setSort}
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
                {tab === 'written' && (
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
                )}
                <Stack
                  as="ul"
                  gap="0"
                  aria-label={tab === 'ready' ? '작성 가능한 리뷰 목록' : '내가 작성한 리뷰'}
                >
                  {items.map((entry) => (
                    <ReviewItem
                      key={entry.id}
                      entry={entry}
                      tab={tab}
                      onEdit={() => {
                        setRating(tab === 'written' ? demoWrittenReview.rating : 0);
                        setBody(tab === 'written' ? demoWrittenReview.body : '');
                        setOpen(true);
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
              <VStack mt="24px">
                <Button
                  variant="plain"
                  size="lg"
                  onClick={more.onLoadMore}
                  disabled={!more.onLoadMore}
                  loadMore={{ counter: more.counter }}
                />
              </VStack>
            </>
          ) : (
            <EmptyState
              layout="reviews"
              variant="page"
              as="section"
              title={tab === 'ready' ? '작성 가능한 상품이 없습니다.' : '작성한 리뷰가 없습니다.'}
            />
          )}
        </Box>
      </ContentSection>
      <ReviewDialog
        open={open}
        productName={items[0]?.product.name ?? reviewListPreview.ready.items[0].product.name}
        title={state === 'edit' || (list && tab === 'written') ? '상품리뷰 수정' : '상품리뷰 작성'}
        rating={rating}
        body={body}
        invalid={state === 'error'}
        onOpenChange={setOpen}
        onRatingChange={setRating}
        onBodyChange={setBody}
      />
    </MyPageFrame>
  );
}
