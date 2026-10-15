import { css } from 'styled-system/css';
import type { RunClubSession } from './runClub.data';
import { RunClubSessionNotes } from './RunClubSessionNotes';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { RunClubFacts } from './RunClubFacts';
import { Box, Grid } from 'styled-system/jsx';

const styles = {
  poster: css({
    color: 'var(--color-blue-100)',
    '& p': { m: '0 0 18px' },
    '& h2': { m: '0 0 28px', overflowWrap: 'anywhere' },
  }),
  guideContent: css({
    maxW: '640px',
    '& h2': { m: '0 0 16px' },
    '& > p': { mb: '20px' },
    _mobile: { maxW: 'none' },
  }),
};

export type RunClubGuideRow = { label: string; value: string };

type RunClubSessionGuideProps = { session: RunClubSession; rows: RunClubGuideRow[] };

export function RunClubSessionGuide({ session, rows }: RunClubSessionGuideProps) {
  return (
    <Box
      as="section"
      bg="var(--color-black-10)"
      py="72px"
      _mobile={{ py: '10' }}
      aria-label="세션 안내"
    >
      <Grid
        w="min(calc(100% - 110px), 1776px)"
        mx="auto"
        gridTemplateColumns="1fr 1fr"
        gap="12"
        _mobile={{
          w: '100%',
          px: 'var(--layout-mobile-inline-gutter)',
          gridTemplateColumns: '1fr',
          gap: '8',
        }}
      >
        <div className={styles.poster}>
          <Typography as="p" variant="body2" web="heading6" mo="body1" weight="black">
            Hoka Run Club
          </Typography>
          <Typography as="h2" variant="sessionPosterTitle">
            {session.category === 'Trail'
              ? 'Bugaksan Uphill Interval Session'
              : 'HOKA Night City Run'}
          </Typography>
          <Typography as="span" variant="body2" mo="body3">
            {session.overlayDate}
            <br />
            @hoka_kr
          </Typography>
        </div>
        <div className={styles.guideContent}>
          <Typography as="h2" variant="body1" mo="body2" weight="black">
            세션 안내
          </Typography>
          <Typography as="p" variant="sessionGuideBody" className={css({ _mobile: { mb: '6' } })}>
            호카 런 클럽 {session.title}에서
            <br />
            러너들과 함께 달리며 그룹 러닝의 즐거움을 느껴보세요!
          </Typography>
          <RunClubFacts variant="guide" rows={rows} />
          <RunClubSessionNotes precautions />
        </div>
      </Grid>
    </Box>
  );
}
