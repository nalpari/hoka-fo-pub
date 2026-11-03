import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './LaunchCalendar.scenarios';

const meta = {
  ...base,
  title: 'PAGES/런칭 캘린더/Mobile',
  args: { ...base.args, platform: 'mobile' as const },
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Feed: Story = { ...scenarios.Feed, name: 'Feed' };

export const InStock: Story = { ...scenarios.InStock, name: 'In Stock' };

export const Upcoming: Story = { ...scenarios.Upcoming, name: 'Upcoming' };

export const Detail: Story = { ...scenarios.Detail, name: '상품 상세' };
