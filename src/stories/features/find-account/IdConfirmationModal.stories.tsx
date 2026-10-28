import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './IdConfirmationModal.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/2. 아이디확인/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };
