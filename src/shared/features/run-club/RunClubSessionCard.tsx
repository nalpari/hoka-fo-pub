'use client';

import { Stack } from 'styled-system/jsx';
import type { RunClubSession } from './runClub.data';
import { RunClubSessionCardImage } from './RunClubSessionCardImage';
import { RunClubSessionCardContent } from './RunClubSessionCardContent';

export function RunClubSessionCard({ session }: { session: RunClubSession }) {
  return (
    <Stack as="article" gap="5" _mobile={{ gap: '3' }}>
      <RunClubSessionCardImage session={session} />
      <RunClubSessionCardContent session={session} />
    </Stack>
  );
}
