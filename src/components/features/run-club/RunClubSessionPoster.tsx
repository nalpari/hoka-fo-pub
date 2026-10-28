import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { RunClubSession } from './runClub.data';

import { css } from 'styled-system/css';

type Props = { session: Pick<RunClubSession, 'category' | 'overlayDate'> };

/** 세션 카테고리에 맞는 홍보 제목과 날짜를 표시합니다. (Displays a promotional title and date for the session category.) */
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
          variant: 'heading1',
          mo: 'heading2',
          weight: 'black',
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
