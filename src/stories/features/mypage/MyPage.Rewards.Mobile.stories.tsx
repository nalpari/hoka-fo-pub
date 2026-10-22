import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/5. 회원등급/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Rewards: Story = { ...scenarios.Rewards, name: 'Default' };
