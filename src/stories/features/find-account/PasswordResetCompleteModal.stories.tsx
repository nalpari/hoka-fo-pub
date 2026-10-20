import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './PasswordResetCompleteModal.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Login/FindAccount/PasswordResetCompleteModal/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };
