import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SignupPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/AUTH/Signup/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Details: Story = { ...scenarios.MobileDetails, name: 'Details' };

export const PasswordValidation: Story = {
  ...scenarios.MobilePasswordValidation,
  name: 'Password Validation',
};

export const FieldValidation: Story = {
  ...scenarios.MobileFieldValidation,
  name: 'Field Validation',
};
