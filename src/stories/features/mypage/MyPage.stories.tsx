import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './MyPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/MYPAGE/Main/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Width375: Story = { ...scenarios.Mobile375, name: '375px' };
