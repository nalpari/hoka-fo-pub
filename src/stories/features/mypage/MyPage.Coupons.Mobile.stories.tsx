import type { StoryObj } from '@storybook/react';

import base from './MyPage.Coupons.Web.stories';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/6. 쿠폰/Mobile',
  globals: { viewport: 'hoka375' },
  args: { ...base.args, platform: 'mobile' as const },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Coupons: Story = { name: 'Default' };

export const Employee: Story = { name: '임직원', args: { employee: true } };
