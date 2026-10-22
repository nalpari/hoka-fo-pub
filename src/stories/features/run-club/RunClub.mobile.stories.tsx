import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RunClub.scenarios';

const meta = {
  ...base,
  title: 'PAGES/탐색/0. 러닝세션 목록/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = { ...scenarios.MobileList, name: '목록' };

export const Empty: Story = { ...scenarios.MobileEmpty, name: '빈 목록' };
