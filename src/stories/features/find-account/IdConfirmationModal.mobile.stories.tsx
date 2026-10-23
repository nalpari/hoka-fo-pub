import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './IdConfirmationModal.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/2. 아이디확인/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };
