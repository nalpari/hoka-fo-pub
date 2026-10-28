import { css } from 'styled-system/css';
import { AppLayout } from '@/components/common/layouts/AppLayout/AppLayout';
import { PlatformProvider } from '@/context/platform';
import type { Platform } from '@/lib/device';
import { RunClubPage } from '@/components/features/run-club/RunClubPage';
import { RunClubDetailPage } from '@/stories/features/run-club/RunClubDetailPagePreview';
import { runClubSessions } from '@/components/features/run-club/runClub.data';

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
