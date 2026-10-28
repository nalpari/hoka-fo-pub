import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { RatingStars } from '@/components/common/atoms/RatingStars/RatingStars';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ProductThumbnail } from '@/components/common/molecules/ProductThumbnail/ProductThumbnail';
import type { ReviewListEntry, ReviewTab } from './reviews.types';

const textAction = css({ textDecoration: 'underline' });

const reviewImage = '/images/mypage/speedgoat-7-gtx.png';

type Props = { entry: ReviewListEntry; tab: ReviewTab; onEdit: (id: number) => void };

export function MyPageReviewItem({ entry: { id, review }, tab, onEdit }: Props) {
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
