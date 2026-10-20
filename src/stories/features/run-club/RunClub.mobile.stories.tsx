import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RunClub.scenarios';

const meta = {
  ...base,
  title: 'PAGES/MYPAGE/RunClub/List/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = { ...scenarios.MobileList, name: 'List' };

export const Empty: Story = { ...scenarios.MobileEmpty, name: 'Empty' };
