import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import type { RunClubSession } from './runClub.data';
import { RunClubSessionCard } from './RunClubSessionCard';

const styles = {
  grid: css({
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    columnGap: '16px',
    rowGap: '96px',
    _mobile: { gridTemplateColumns: '1fr', rowGap: '40px' },
  }),
};

export function RunClubResults({ sessions }: { sessions: RunClubSession[] }) {
  return sessions.length ? (
    <Grid className={styles.grid}>
      {sessions.map((session) => (
        <RunClubSessionCard key={session.id} session={session} />
      ))}
    </Grid>
  ) : (
    <div role="status">
      <EmptyState title="현재 운영중인 세션이 없습니다." />
    </div>
  );
}
