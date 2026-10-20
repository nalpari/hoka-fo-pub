import type { Meta, StoryObj } from '@storybook/react';
import { RunClubPreview } from '@/stories/features/run-club/RunClubPreview';

const meta = {
  title: 'PAGES/MYPAGE/RunClub/Detail',
  component: RunClubPreview,
  parameters: { layout: 'fullscreen' },
  args: { platform: 'web', view: 'open' },
} satisfies Meta<typeof RunClubPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = { args: { view: 'open' } };

export const Closed: Story = { args: { view: 'closed' } };

export const Upcoming: Story = { args: { view: 'upcoming' } };

export const MobileOpen: Story = {
  parameters: { layout: 'fullscreen' },
  args: { platform: 'mobile', view: 'open' },
  globals: { viewport: 'hoka375' },
};

export const MobileClosed: Story = {
  parameters: { layout: 'fullscreen' },
  args: { platform: 'mobile', view: 'closed' },
  globals: { viewport: 'hoka375' },
};

export const MobileUpcoming: Story = {
  parameters: { layout: 'fullscreen' },
  args: { platform: 'mobile', view: 'upcoming' },
  globals: { viewport: 'hoka375' },
};

export const DetailWidth1200: Story = {
  args: { platform: 'web', view: 'upcoming' },
  globals: { viewport: 'hoka1200' },
};

export const DetailWidth1920: Story = {
  args: { platform: 'web', view: 'upcoming' },
  globals: { viewport: 'hoka1920' },
};

export const DetailWidth2560: Story = {
  args: { platform: 'web', view: 'upcoming' },
  globals: { viewport: 'hoka2560' },
};

export const DetailWidth3840: Story = {
  args: { platform: 'web', view: 'upcoming' },
  globals: { viewport: 'hoka3840' },
};
