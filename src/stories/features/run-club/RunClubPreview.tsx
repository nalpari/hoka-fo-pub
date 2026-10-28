import { PlatformProvider } from '@/context/platform';
import { AppLayout } from '@/context/ShopShell';

import { css } from 'styled-system/css';

import { runClubSessions } from '@/components/run-club/runClub.data';
import { RunClubPage } from '@/components/run-club/RunClubPage';
import { type Platform } from '@/lib/device';
import { RunClubDetailPage } from '@/stories/features/run-club/RunClubDetailPagePreview';

type PreviewProps = { platform: Platform; view: 'list' | 'empty' | 'open' | 'closed' | 'upcoming' };

/** 런클럽 스토리의 상태와 화면 프레임을 연결합니다 (Displays the run club preview composition). */
export function RunClubPreview({ platform, view }: PreviewProps) {
  const session = runClubSessions.find(
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
              <RunClubPage
                sessions={
                  view === 'empty'
                    ? []
                    : platform === 'mobile'
                      ? runClubSessions.slice(0, 3)
                      : runClubSessions
                }
              />
            ) : (
              <RunClubDetailPage key={view} session={{ ...session, status: view }} />
            )}
          </AppLayout>
        </div>
      </PlatformProvider>
    </>
  );
}
