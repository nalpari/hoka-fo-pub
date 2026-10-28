import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/6. 쿠폰/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Coupons: Story = { ...scenarios.Coupons, name: 'Default' };
