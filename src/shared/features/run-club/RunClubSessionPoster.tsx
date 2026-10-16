import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { RunClubSession } from './runClub.data';

type Props = { session: Pick<RunClubSession, 'category' | 'overlayDate'> };

const poster = css({
  color: 'var(--color-blue-100)',
  '& p': { m: '0 0 18px' },
  '& h2': { m: '0 0 28px', overflowWrap: 'anywhere' },
});

export function RunClubSessionPoster({ session }: Props) {
  return (
    <div className={poster}>
      <Typography as="p" variant="body2" web="heading6" mo="body1" weight="black">
        Hoka Run Club
      </Typography>
      <Typography as="h2" variant="sessionPosterTitle">
        {session.category === 'Trail' ? 'Bugaksan Uphill Interval Session' : 'HOKA Night City Run'}
      </Typography>
      <Typography as="span" variant="body2" mo="body3">
        {session.overlayDate}
        <br />
        @hoka_kr
      </Typography>
    </div>
  );
}
