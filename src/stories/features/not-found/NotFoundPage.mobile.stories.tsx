import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './NotFoundPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/공통/1. 404에러페이지/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };
