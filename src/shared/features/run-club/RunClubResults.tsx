import { Grid } from 'styled-system/jsx';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import type { RunClubSession } from './runClub.data';
import { RunClubSessionCard } from './RunClubSessionCard';

export function RunClubResults({ sessions }: { sessions: RunClubSession[] }) {
  return sessions.length ? (
    <Grid
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      columnGap="4"
      rowGap="24"
      _mobile={{ gridTemplateColumns: '1fr', rowGap: '10' }}
    >
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
