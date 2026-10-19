import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { RunClubSession } from './runClub.data';
import { Box } from 'styled-system/jsx';
import { css } from 'styled-system/css';

type Props = { session: Pick<RunClubSession, 'category' | 'overlayDate'> };

export function RunClubSessionPoster({ session }: Props) {
  return (
    <Box color="var(--color-blue-100)">
      <Typography
        as="p"
        variant="body2"
        web="heading6"
        mo="body1"
        weight="black"
        className={css({ m: '0 0 18px' })}
      >
        Hoka Run Club
      </Typography>
      <Typography
        as="h2"
        variant="sessionPosterTitle"
        className={css({ m: '0 0 28px', overflowWrap: 'anywhere' })}
      >
        {session.category === 'Trail' ? 'Bugaksan Uphill Interval Session' : 'HOKA Night City Run'}
      </Typography>
      <Typography as="span" variant="body2" mo="body3">
        {session.overlayDate}
        <br />
        @hoka_kr
      </Typography>
    </Box>
  );
}
