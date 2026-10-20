import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './PasswordResetPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Login/FindAccount/PasswordResetPage/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const RequiredFieldsError: Story = {
  ...scenarios.RequiredFieldsError,
  name: 'Required Fields Error',
};

export const ConfirmationMismatch: Story = {
  ...scenarios.ConfirmationMismatch,
  name: 'Confirmation Mismatch',
};

export const Complete: Story = { ...scenarios.Complete, name: 'Complete' };
