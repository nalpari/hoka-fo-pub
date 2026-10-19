import type { Meta, StoryObj } from '@storybook/react';
import { RunClubPreview } from '@/stories/features/run-club/RunClubPreview';

const meta = {
  title: 'PAGES/MYPAGE/RunClub/List',
  component: RunClubPreview,
  parameters: { layout: 'fullscreen' },
  args: { platform: 'web', view: 'list' },
} satisfies Meta<typeof RunClubPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = {};

export const Empty: Story = { args: { view: 'empty' } };

export const MobileList: Story = {
  parameters: { layout: 'fullscreen' },
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const MobileEmpty: Story = {
  parameters: { layout: 'fullscreen' },
  args: { platform: 'mobile', view: 'empty' },
  globals: { viewport: 'hoka375' },
};
