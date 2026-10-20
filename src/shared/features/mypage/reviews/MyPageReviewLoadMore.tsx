import { Box } from 'styled-system/jsx';
import { LoadMoreButton } from '@/shared/components/atoms/LoadMoreButton/LoadMoreButton';

type Props = { visibleCount: number; totalCount: number; onLoadMore: () => void };

export function MyPageReviewLoadMore({ visibleCount, totalCount, onLoadMore }: Props) {
  return (
    <Box mt="6">
      <LoadMoreButton
        fullWidth
        variant="secondary"
        size="short"
        onClick={onLoadMore}
        counter={{ current: Math.ceil(visibleCount / 10), total: Math.ceil(totalCount / 10) }}
        labelProps={{ mo: 'ctaKr2' }}
        counterProps={{ mo: 'body5' }}
      />
    </Box>
  );
}
