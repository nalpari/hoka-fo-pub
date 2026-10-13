import { cva } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { RunClubSession } from './runClub.data';

const runClubBadge = cva({
  base: {
    h: '52px',
  },
  variants: {
    category: { Road: { bg: '#dfff00', color: '#000' }, Trail: { bg: '#5d6825', color: '#fff' } },
  },
});

export function RunClubBadge({ category }: { category: RunClubSession['category'] }) {
  return (
    <HStack as="span" className={runClubBadge({ category })} p="2">
      <Typography variant="body4" weight="bold">
        {category}
      </Typography>
    </HStack>
  );
}
