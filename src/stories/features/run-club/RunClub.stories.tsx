import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RunClub.scenarios';

const meta = {
  ...base,
  title: 'PAGES/MYPAGE/RunClub/List/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = { ...scenarios.List, name: 'List' };

export const Empty: Story = { ...scenarios.Empty, name: 'Empty' };
