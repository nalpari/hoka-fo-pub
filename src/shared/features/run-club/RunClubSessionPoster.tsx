import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { RunClubSession } from './runClub.data';

import { css } from 'styled-system/css';

type Props = { session: Pick<RunClubSession, 'category' | 'overlayDate'> };

export function RunClubSessionPoster({ session }: Props) {
  return (
    <ContentSection
      color="var(--color-blue-100)"
      gap="7"
      title={
        <>
          {session.category === 'Trail'
            ? 'Bugaksan Uphill Interval Session'
            : 'HOKA Night City Run'}
        </>
      }
      headerProps={{
        gap: '18px',
        eyebrow: <>Hoka Run Club</>,
        eyebrowProps: { variant: 'body2', web: 'heading6', mo: 'body1', weight: 'black' },
        titleAs: 'h2',
        titleProps: {
          variant: 'sessionPosterTitle',
          className: css({ overflowWrap: 'anywhere' }),
        },
      }}
    >
      <Typography as="span" variant="body2" mo="body3">
        {session.overlayDate}
        <br />
        @hoka_kr
      </Typography>
    </ContentSection>
  );
}
