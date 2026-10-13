import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { css } from 'styled-system/css';
import { AppLayout } from '@/shared/components/layouts/AppLayout/AppLayout';
import { PlatformProvider } from '@/shared/context/platform';
import type { Platform } from '@/shared/lib/device';
import { RunClubPage } from './RunClubPage';
import { RunClubDetailPage } from './RunClubDetailPage';
import { runClubSessions } from './runClub.data';

type PreviewProps = { platform: Platform; view: 'list' | 'empty' | 'open' | 'closed' | 'upcoming' };

function RunClubPreview({ platform, view }: PreviewProps) {
  const session = runClubSessions.find(
    (item) => item.id === (view === 'open' ? 'bukchon-night' : 'bukhansan-trail'),
  )!;

  return (
    <MemoryRouter>
      <PlatformProvider platform={platform}>
        <div
          className={`platform-${platform} ${platform === 'web' ? css({ minW: '1200px' }) : ''}`}
        >
          <AppLayout cart={0} isLoggedIn={false} wishlistCount={0} recentCount={0}>
            {view === 'list' || view === 'empty' ? (
              <RunClubPage sessions={view === 'empty' ? [] : runClubSessions} />
            ) : (
              <RunClubDetailPage key={view} session={{ ...session, status: view }} />
            )}
          </AppLayout>
        </div>
      </PlatformProvider>
    </MemoryRouter>
  );
}

const meta = {
  title: 'PAGES/RunClub',
  component: RunClubPreview,
  parameters: { layout: 'fullscreen' },
  args: { platform: 'web', view: 'list' },
} satisfies Meta<typeof RunClubPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = {};

export const Empty: Story = { args: { view: 'empty' } };

export const Open: Story = { args: { view: 'open' } };

export const Closed: Story = { args: { view: 'closed' } };

export const Upcoming: Story = { args: { view: 'upcoming' } };

export const MobileList: Story = { args: { platform: 'mobile' }, globals: { viewport: 'hoka375' } };

export const MobileOpen: Story = {
  args: { platform: 'mobile', view: 'open' },
  globals: { viewport: 'hoka375' },
};
