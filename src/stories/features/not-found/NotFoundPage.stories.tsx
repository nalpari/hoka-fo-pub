import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './NotFoundPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/공통/1. 404에러페이지/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };
