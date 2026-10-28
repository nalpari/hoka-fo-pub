import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './MyPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/0. 마이페이지 메인/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Width375: Story = { ...scenarios.Mobile375, name: '375px' };
