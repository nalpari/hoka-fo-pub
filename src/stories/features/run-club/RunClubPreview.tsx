import { css } from 'styled-system/css';
import { AppLayout } from '@/shared/components/layouts/AppLayout/AppLayout';
import { PlatformProvider } from '@/shared/context/platform';
import type { Platform } from '@/shared/lib/device';
import { RunClubPage } from '@/shared/features/run-club/RunClubPage';
import { RunClubDetailPage } from '@/shared/features/run-club/RunClubDetailPage';
import { runClubSessions } from '@/shared/features/run-club/runClub.data';

type PreviewProps = { platform: Platform; view: 'list' | 'empty' | 'open' | 'closed' | 'upcoming' };

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
