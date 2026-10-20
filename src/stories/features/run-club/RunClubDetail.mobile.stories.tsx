import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RunClubDetail.scenarios';

const meta = {
  ...base,
  title: 'PAGES/MYPAGE/RunClub/Detail/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = { ...scenarios.MobileOpen, name: 'Open' };

export const Closed: Story = { ...scenarios.MobileClosed, name: 'Closed' };

export const Upcoming: Story = { ...scenarios.MobileUpcoming, name: 'Upcoming' };
