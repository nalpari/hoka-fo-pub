import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/2. 오늘 본 상품/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Recent: Story = { ...scenarios.Recent, name: 'Default' };

export const RecentEmpty: Story = { ...scenarios.RecentEmpty, name: '빈 목록' };
