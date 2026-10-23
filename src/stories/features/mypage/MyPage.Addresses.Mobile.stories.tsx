import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/8. 배송지 관리/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Addresses: Story = { ...scenarios.Addresses, name: 'Default' };
