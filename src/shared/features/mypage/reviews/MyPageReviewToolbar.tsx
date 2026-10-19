import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';
import { Select } from '@/shared/components/atoms/Select/Select';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const sortSelect = css({
  border: '0',
  bg: 'transparent',
  p: '0',
  minH: '20px',
  h: '20px',
  fontSize: '16px',
  fontWeight: 'medium',
});

type Props = { count: number; sort: string; onSortChange: (value: string) => void };

export function MyPageReviewToolbar({ count, sort, onSortChange }: Props) {
  return (
    <HStack justifyContent="space-between" alignItems="center" pb="4">
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
      <HStack gap="0.5">
        <Typography variant="body4">총</Typography>
        <Typography variant="body4" weight="medium">
          {count}
          <Typography variant="bodyKr4">건</Typography>
        </Typography>
      </HStack>
    </HStack>
  );
}
