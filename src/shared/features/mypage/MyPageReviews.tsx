'use client';

import { useState } from 'react';
import { css } from 'styled-system/css';
import { Box, Divider, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { RatingStars, type RatingValue } from '@/shared/components/atoms/RatingStars/RatingStars';
import { SegmentedControl } from '@/shared/components/atoms/SegmentedControl/SegmentedControl';
import { Select } from '@/shared/components/atoms/Select/Select';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { MyPageReviewDialog } from '@/shared/features/mypage/MyPageReviewDialog';
import { ProductThumbnail } from '@/shared/components/molecules/ProductThumbnail/ProductThumbnail';
import { MyPageFrame } from './MyPageFrame';

type ReviewTab = 'ready' | 'written';

const textAction = css({ textDecoration: 'underline' });

const sortSelect = css({
  border: '0',
  bg: 'transparent',
  p: '0',
  minH: '20px',
  h: '20px',
  fontSize: '16px',
  fontWeight: 'medium',
});

const reviewImage = '/images/mypage/speedgoat-7-gtx.png';

export function MyPageReviews({ initialReadyCount = 62 }: { initialReadyCount?: number }) {
  const [tab, setTab] = useState<ReviewTab>('ready');
  const [sort, setSort] = useState('recent');
  const [visibleCount, setVisibleCount] = useState(10);
  const [editing, setEditing] = useState<number | null>(null);
  const [rating, setRating] = useState<RatingValue>(0);
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [writtenIds, setWrittenIds] = useState<number[]>([0, 1]);
  const [writtenReviews, setWrittenReviews] = useState<
    Record<number, { rating: RatingValue; body: string }>
  >({});
  const readyIds = Array.from({ length: initialReadyCount }, (_, index) => index);
  const ids = tab === 'ready' ? readyIds : writtenIds;
  const sortedIds = sort === 'oldest' ? [...ids].reverse() : ids;
  const displayedIds = sortedIds.slice(0, visibleCount);

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
      <Stack gap="0" pb="16">
        <SegmentedControl
          ariaLabel="상품리뷰 구분"
          onValueChange={(value) => {
            setTab(value);
            setVisibleCount(10);
          }}
          options={[
            { value: 'ready', label: '작성 가능한 리뷰' },
            { value: 'written', label: '내가 작성한 리뷰' },
          ]}
          variant="underline"
          value={tab}
        />
        {ids.length ? (
          <Box px="4" pt="8">
            <HStack justifyContent="space-between" alignItems="center" pb="4">
              <Box w="132px">
                <Select
                  aria-label="리뷰 정렬"
                  className={sortSelect}
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="recent">최근 구매순</option>
                  <option value="oldest">오래된 구매순</option>
                </Select>
              </Box>
              <HStack gap="0.5">
                <Typography variant="body4">총</Typography>
                <Typography variant="body4" weight="medium">
                  {ids.length}
                  <Typography variant="bodyKr4">건</Typography>
                </Typography>
              </HStack>
            </HStack>
            <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.100" />
            <Stack gap="0">
              {displayedIds.map((id) => (
                <HStack
                  key={id}
                  borderBottom="1px solid var(--colors-black-20)"
                  alignItems="flex-start"
                  gap="4"
                  py="6"
                >
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
                        <RatingStars value={writtenReviews[id]?.rating ?? 4.5} size="16px" />
                        <Typography variant="body5" tone="primary">
                          {writtenReviews[id]?.body ?? '쿠션감이 좋아서 잘 달리고 있어요.'}
                        </Typography>
                      </Stack>
                    ) : null}
                  </Stack>
                  <Button
                    className={textAction}
                    size="md"
                    variant="link"
                    onClick={() => {
                      setEditing(id);
                      setRating(writtenReviews[id]?.rating ?? 0);
                      setBody(writtenReviews[id]?.body ?? '');
                    }}
                  >
                    {tab === 'ready' ? '리뷰 작성' : '수정하기'}
                  </Button>
                </HStack>
              ))}
            </Stack>
            {displayedIds.length < ids.length ? (
              <Box mt="6">
                <Button
                  fullWidth
                  variant="secondary"
                  size="short"
                  onClick={() => setVisibleCount((count) => count + 10)}
                >
                  <HStack gap="1">
                    <Typography mo="ctaKr2">더보기</Typography>
                    <Typography mo="body5" tone="tertiary">
                      ({Math.ceil(visibleCount / 10)}/{Math.ceil(ids.length / 10)})
                    </Typography>
                  </HStack>
                </Button>
              </Box>
            ) : null}
          </Box>
        ) : (
          <EmptyState title="작성한 리뷰가 없습니다." variant="minimal" />
        )}
      </Stack>
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
