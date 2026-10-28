import { cva } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { RunClubSession } from './runClub.data';

const runClubBadge = cva({
  base: {
    h: '28px',
    _mobile: { w: 'fit-content', h: '20px', px: '2', py: '0' },
  },
  variants: {
    category: { Road: { bg: '#dfff00', color: '#000' }, Trail: { bg: '#5d6825', color: '#fff' } },
  },
});

export function RunClubBadge({ category }: { category: RunClubSession['category'] }) {
  return (
    <HStack as="span" className={runClubBadge({ category })} p="2">
      <Typography variant="body4" mo="body5" weight="bold">
        {category}
      </Typography>
    </HStack>
  );
}
