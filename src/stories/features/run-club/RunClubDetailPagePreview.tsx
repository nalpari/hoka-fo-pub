import Page from '@/app/running/run-club/[sessionId]/page';
import type { RunClubSession } from '@/components/run-club/runClub.data';
import { RunClubSessionContext } from '@/components/run-club/RunClubSessionContext';

/** 런클럽 상세 페이지에 예시 세션을 제공합니다. (Provides an example session for the run club detail page.) */
export function RunClubDetailPage({ session }: { session?: RunClubSession }) {
  return (
    <RunClubSessionContext value={session}>
      <Page />
    </RunClubSessionContext>
  );
}
