import Page from '@/app/running/run-club/[sessionId]/page';
import { RunClubSessionContext } from '@/components/features/run-club/RunClubSessionContext';
import type { RunClubSession } from '@/components/features/run-club/runClub.data';

/** 런클럽 상세 페이지에 예시 세션을 제공합니다. (Provides an example session for the run club detail page.) */
export function RunClubDetailPage({ session }: { session?: RunClubSession }) {
  return (
    <RunClubSessionContext value={session}>
      <Page />
    </RunClubSessionContext>
  );
}
