import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './MyPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/0. 마이페이지 메인/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Width1600: Story = { ...scenarios.Desktop1600, name: '1600px' };
