'use client';

import { useState } from 'react';
import { runClubSessions, type RunClubSession } from './runClub.data';
import { RunClubHeader, type RunClubFilter } from './RunClubHeader';
import { RunClubLayout } from './RunClubLayout';
import { RunClubResults } from './RunClubResults';

type RunClubPageProps = { sessions?: RunClubSession[] };

export function RunClubPage({ sessions = runClubSessions }: RunClubPageProps) {
  const [filter, setFilter] = useState<RunClubFilter>('all');
  const visibleSessions = sessions.filter(
    (session) => filter === 'all' || session.category === filter,
  );

  return (
    <RunClubLayout header={<RunClubHeader filter={filter} onFilterChange={setFilter} />}>
      <RunClubResults sessions={visibleSessions} />
    </RunClubLayout>
  );
}
