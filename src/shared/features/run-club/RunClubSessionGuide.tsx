import type { RunClubSession } from './runClub.data';
import { Box, Grid } from 'styled-system/jsx';
import { RunClubSessionPoster } from './RunClubSessionPoster';
import { RunClubSessionGuideContent } from './RunClubSessionGuideContent';

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
        w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
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
        <RunClubSessionPoster session={session} />
        <RunClubSessionGuideContent title={session.title} rows={rows} />
      </Grid>
    </Box>
  );
}
