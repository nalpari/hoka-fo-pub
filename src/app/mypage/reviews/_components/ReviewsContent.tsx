'use client';

import { useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Flex, HStack, Stack, VStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { dataListRecipe } from '@/components/common/atoms/DataList.recipe';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { FormField } from '@/components/common/atoms/FormField';
import { RatingStars } from '@/components/common/atoms/RatingStars';
import { SegmentedControl } from '@/components/common/atoms/SegmentedControl';
import { Typography } from '@/components/common/atoms/Typography';
import { Wishlist } from '@/components/common/atoms/Wishlist';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import {
  demoWrittenReview,
  reviewListPreview,
  reviewPagePreview,
  reviewStatePreview,
} from '@/app/mypage/reviews/reviewFixtures';
import type { ReviewListEntry, ReviewTab } from '@/app/mypage/reviews/reviews.types';
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
        <Typography as="p" variant="b4">
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
            value: body,
            onChange: (event) => onBodyChange(event.target.value),
          }}
        />
        {invalid ? (
          <Typography variant="b8" tone="error">
            별점과 리뷰 내용을 입력해 주세요.
          </Typography>
        ) : null}
      </Stack>
    </ModalDialog>
  );
}

const styles = {
  tabs: css({
    borderBottomWidth: '0',
    _mobile: { w: 'calc(100% + 32px)', mx: '-16px' },
  }),
  tab: css({
    minH: '54px',
    '&[aria-pressed=false]': { borderBottom: '1px solid var(--color-black-40)' },
    '&[aria-pressed=true]': { borderBottom: '2px solid var(--color-black-100)' },
    _mobile: { minH: '44px' },
  }),
  action: css({ flexShrink: '0', '& > span > span': { lineHeight: '1.3' } }),
  stars: css({ '&&': { gap: '4px' } }),
  reviewText: css({ lineClamp: 1 }),
};

type ReviewItemProps = {
  entry: ReviewListEntry;
  tab: ReviewTab;
  onEdit?: () => void;
};

function ReviewItem({ entry: { product, purchasedAt, review }, tab, onEdit }: ReviewItemProps) {
  const mobile = usePlatform() === 'mobile';
  const written = tab === 'written';
  const productRating = written ? product.rating : undefined;
  const [favorite, setFavorite] = useState(false);
  const date = (
    <>
      <Typography web="b6M" mo="b7M" language="en">
        {purchasedAt}
      </Typography>
      <Typography web="b6M" mo="b7M">
        구매
      </Typography>
    </>
  );

  return (
    <Flex
      as="li"
      alignItems="center"
      py="16px"
      _mobile={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}
    >
      <Box pos="relative" flex="1" minW="0">
        <OrderProductSummary
          variant="review"
          name={product.name}
          image={product.imageSrc}
          content={
            <Stack
              flex="1"
              minW="0"
              gap="6px"
              minH={written ? { base: '98px', _mobile: '128px' } : undefined}
            >
              {mobile && <HStack gap="2px">{date}</HStack>}
              <Stack gap="4px">
                <Typography web="b4M" mo="b7M">
                  {product.name}
                </Typography>
                {written && !mobile ? (
                  product.price && (
                    <Typography variant="b3B" language="en">
                      {product.price}
                    </Typography>
                  )
                ) : (
                  <Typography web="b4" mo="b8" tone="subtle">
                    {product.optionLabel}
                  </Typography>
                )}
              </Stack>
              {written && (
                <Stack gap="8px" pt={{ base: '12px', _mobile: '4px' }} maxW={{ _mobile: '190px' }}>
                  {productRating && (
                    <HStack gap="8px">
                      <RatingStars
                        value={productRating.value}
                        size="16px"
                        color={mobile ? 'var(--color-black-100)' : undefined}
                        className={styles.stars}
                      />
                      <Typography variant="b8" language="en">
                        ({productRating.count})
                      </Typography>
                    </HStack>
                  )}
                  {mobile && review?.body && (
                    <Typography as="p" variant="b8" className={styles.reviewText}>
                      {review.body}
                    </Typography>
                  )}
                </Stack>
              )}
            </Stack>
          }
        />
        <Box pos="absolute" top="0" left="64px">
          <Wishlist
            active={favorite}
            ariaLabel={`${product.name} 관심상품`}
            iconSize="16px"
            size="32px"
            onActiveChange={setFavorite}
          />
        </Box>
      </Box>
      {!mobile && (
        <>
          {written && (
            <Box flex="0 1 300px" minW="0" px="16px">
              {review?.body && (
                <Typography as="p" variant="b6" className={styles.reviewText}>
                  {review.body}
                </Typography>
              )}
            </Box>
          )}
          <HStack flex={written ? '0 0 160px' : '0 0 200px'} justify="center" gap="2px">
            {date}
          </HStack>
        </>
      )}
      <Button
        variant="primary"
        size="short"
        fullWidth={mobile}
        className={styles.action}
        onClick={onEdit}
      >
        {written ? '수정하기' : '리뷰 작성'}
      </Button>
    </Flex>
  );
}

/** 리뷰 목록·빈 상태와 작성·수정 오류를 고정 표시합니다. (Displays prepared review lists, empty states, and editing errors.)
 * [ 개발팀 바인딩 ] 디자인 목록·빈 결과·편집 오류 fixture이며 저장·조회·페이지 추가 요청은 실행하지 않습니다. 작성 가능한 리뷰의 더보기는 표시용 카운터입니다. 관심상품 토글은 화면 내 표시 상태이며 저장하지 않습니다. 목록 버튼은 고정 예시 팝업을 열며 실제 리뷰/구매 ID, 관심상품 상태와 요청·목록 갱신은 통합 소유자가 연결합니다. PC·모바일 목록과 총 건수는 시안별 fixture입니다. 이 preview의 편집은 저장 성공을 표시하거나 데이터를 갱신하지 않습니다.
 */
export function ReviewsContent({
  state,
}: {
  state: 'ready-list' | 'written-list' | 'empty' | 'written-empty' | 'new' | 'edit' | 'error';
}) {
  const platform = usePlatform();
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
      ? reviewPagePreview[platform][tab]
      : reviewStatePreview[state === 'edit' ? 'edit' : 'new'];
  const { items, totalCount, more } = display;
  return (
    <MyPageFrame
      fillAvailable={items.length === 0}
      activePath="/mypage/reviews"
      breadcrumbs={[{ label: '구매내역', href: '/mypage/orders' }, { label: '상품리뷰' }]}
    >
      <ContentSection
        flex={items.length === 0 ? '1' : undefined}
        title="상품리뷰"
        headerProps={{
          titleAs: 'h1',
          titleProps: { web: 'h6', mo: 'h7', className: css({ color: 'black.100' }) },
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
            className={styles.tabs}
            itemClassName={() => styles.tab}
            value={tab}
            onValueChange={setTab}
            options={[
              { value: 'ready', label: '작성 가능한 리뷰' },
              { value: 'written', label: '내가 작성한 리뷰' },
            ]}
          />
          {items.length > 0 ? (
            <>
              <HStack justifyContent="space-between" pt="40px" pb="16px" _mobile={{ pt: '32px' }}>
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
                  <Typography variant="b6">총</Typography>
                  <HStack gap="0">
                    <Typography variant="b6M" language="en">
                      {totalCount}
                    </Typography>
                    <Typography variant="b6">
                      {platform === 'mobile' && tab === 'ready' ? '개' : '건'}
                    </Typography>
                  </HStack>
                </HStack>
              </HStack>
              <Stack
                as="ul"
                gap="0"
                aria-label={tab === 'ready' ? '작성 가능한 리뷰 목록' : '내가 작성한 리뷰'}
                className={dataListRecipe({ top: 'thinSubtle' }).root}
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
              {tab === 'ready' && (
                <VStack mt="24px">
                  <Button
                    variant="plain"
                    size="lg"
                    onClick={more.onLoadMore}
                    loadMore={{ counter: more.counter }}
                  />
                </VStack>
              )}
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
