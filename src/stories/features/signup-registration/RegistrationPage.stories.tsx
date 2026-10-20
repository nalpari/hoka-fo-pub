import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RegistrationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/AUTH/Registration/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const Additional: Story = { ...scenarios.Additional, name: 'Additional' };

export const Error: Story = { ...scenarios.Error, name: 'Error' };

export const Complete: Story = { ...scenarios.Complete, name: 'Complete' };

export const Interactive: Story = { ...scenarios.Interactive, name: 'Interactive' };

export const PasswordValidation: Story = {
  ...scenarios.PasswordValidation,
  name: 'Password Validation',
};

export const EmailCheckState: Story = { ...scenarios.EmailCheckState, name: 'Email Check State' };

export const AddressSearch: Story = { ...scenarios.AddressSearch, name: 'Address Search' };
