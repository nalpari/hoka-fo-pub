import type { Meta, StoryObj } from '@storybook/react';

import { RunningSessionPreview } from '@/stories/features/running-session/RunningSessionPreview';

const meta = {
  title: 'PAGES/탐색/0. 러닝세션 목록',
  component: RunningSessionPreview,
  parameters: { layout: 'fullscreen' },
  args: { platform: 'web', view: 'list' },
} satisfies Meta<typeof RunningSessionPreview>;

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
