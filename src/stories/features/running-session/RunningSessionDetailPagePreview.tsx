import { RunningSessionSessionContext } from '@/context/RunningSessionSessionContext';

import Page from '@/app/running/running-session/[sessionId]/page';
import type { RunningSessionSession } from '@/components/running-session/runningSession.data';

/** 런클럽 상세 페이지에 예시 세션을 제공합니다. (Provides an example session for the run club detail page.) */
export function RunningSessionDetailPage({ session }: { session?: RunningSessionSession }) {
  return (
    <RunningSessionSessionContext value={session}>
      <Page />
    </RunningSessionSessionContext>
  );
}
