import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RunClubDetail.scenarios';

const meta = {
  ...base,
  title: 'PAGES/탐색/1. 러닝세션 상세/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = { ...scenarios.MobileOpen, name: '신청 가능' };

export const Closed: Story = { ...scenarios.MobileClosed, name: '모집 마감' };

export const Upcoming: Story = { ...scenarios.MobileUpcoming, name: '신청 예정' };
