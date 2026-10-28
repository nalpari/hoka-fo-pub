import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/3. 재입고 알림 상품/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const RestockAlerts: Story = { ...scenarios.RestockAlerts, name: 'Default' };

export const RestockAlertsEmpty: Story = { ...scenarios.RestockAlertsEmpty, name: '빈 목록' };
