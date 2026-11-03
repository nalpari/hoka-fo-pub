import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/context/ShopShell';

import { LaunchCalendarContent } from '@/app/launch-calendar/_components/LaunchCalendarContent';
import { LaunchCalendarDetail } from '@/app/launch-calendar/_components/LaunchCalendarDetail';

const meta = {
  component: ShopShell,
  args: { children: <LaunchCalendarContent /> },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ShopShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Feed: Story = {};

export const InStock: Story = { args: { children: <LaunchCalendarContent mode="in-stock" /> } };

export const Upcoming: Story = { args: { children: <LaunchCalendarContent mode="upcoming" /> } };

export const Detail: Story = { args: { children: <LaunchCalendarDetail /> } };
