import { Box, HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = { visibleCount: number; totalCount: number; onLoadMore: () => void };

export function MyPageReviewLoadMore({ visibleCount, totalCount, onLoadMore }: Props) {
  return (
    <Box mt="6">
      <Button fullWidth variant="secondary" size="short" onClick={onLoadMore}>
        <HStack gap="1">
          <Typography mo="ctaKr2">더보기</Typography>
          <Typography mo="body5" tone="tertiary">
            ({Math.ceil(visibleCount / 10)}/{Math.ceil(totalCount / 10)})
          </Typography>
        </HStack>
      </Button>
    </Box>
  );
}
