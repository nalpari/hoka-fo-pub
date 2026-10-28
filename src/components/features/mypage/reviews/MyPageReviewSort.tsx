import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Select } from '@/components/common/atoms/Select/Select';

const sortSelect = css({
  // Resolve the native Select's base styles without competing atomic classes.
  '&&': { border: '0', bg: 'transparent', p: '0', minH: '20px', h: '20px' },
  fontSize: '16px',
  fontWeight: 'medium',
});

type Props = { sort: string; onSortChange: (value: string) => void };

export function MyPageReviewSort({ sort, onSortChange }: Props) {
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
