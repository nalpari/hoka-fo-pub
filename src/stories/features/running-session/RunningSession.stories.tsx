import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './RunningSession.scenarios';

const meta = {
  ...base,
  title: 'PAGES/탐색/0. 러닝세션 목록/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = { ...scenarios.List, name: '목록' };

export const Empty: Story = { ...scenarios.Empty, name: '빈 목록' };
