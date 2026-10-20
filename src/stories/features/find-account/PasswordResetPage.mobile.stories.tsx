import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './PasswordResetPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/AUTH/FindAccount/PasswordResetPage/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const RequiredFieldsError: Story = {
  ...scenarios.MobileRequiredFieldsError,
  name: 'Required Fields Error',
};

export const Complete: Story = { ...scenarios.MobileComplete, name: 'Complete' };

export const Error: Story = { ...scenarios.MobileError, name: 'Error' };
