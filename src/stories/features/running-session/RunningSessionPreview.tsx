import { PlatformProvider } from '@/context/platform';
import { type Platform } from '@/context/platform';
import { AppLayout } from '@/context/ShopShell';

import { css } from 'styled-system/css';

import { runningSessionSessions } from '@/components/running-session/runningSession.data';
import { RunningSessionPage } from '@/components/running-session/RunningSessionPage';
import { RunningSessionDetailPage } from '@/stories/features/running-session/RunningSessionDetailPagePreview';

type PreviewProps = { platform: Platform; view: 'list' | 'empty' | 'open' | 'closed' | 'upcoming' };

/** 런클럽 스토리의 상태와 화면 프레임을 연결합니다 (Displays the run club preview composition). */
export function RunningSessionPreview({ platform, view }: PreviewProps) {
  const session = runningSessionSessions.find(
    (item) =>
      item.id === (view === 'open' && platform === 'web' ? 'bukchon-night' : 'bukhansan-trail'),
  )!;

  return (
    <>
      <PlatformProvider platform={platform}>
        <div
          className={`platform-${platform} ${platform === 'web' ? css({ minW: '1200px' }) : ''}`}
        >
          <AppLayout cart={0} isLoggedIn={false} wishlistCount={0} recentCount={0}>
            {view === 'list' || view === 'empty' ? (
              <RunningSessionPage
                sessions={
                  view === 'empty'
                    ? []
                    : platform === 'mobile'
                      ? runningSessionSessions.slice(0, 3)
                      : runningSessionSessions
                }
              />
            ) : (
              <RunningSessionDetailPage key={view} session={{ ...session, status: view }} />
            )}
          </AppLayout>
        </div>
      </PlatformProvider>
    </>
  );
}
