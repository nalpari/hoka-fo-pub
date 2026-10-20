import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SignupPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/AUTH/Signup/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const Details: Story = { ...scenarios.Details, name: 'Details' };

export const Terms: Story = { ...scenarios.Terms, name: 'Terms' };

export const PasswordValidation: Story = {
  ...scenarios.PasswordValidation,
  name: 'Password Validation',
};

export const FieldValidation: Story = { ...scenarios.FieldValidation, name: 'Field Validation' };
