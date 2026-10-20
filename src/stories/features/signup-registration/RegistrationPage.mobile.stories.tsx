import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './RegistrationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/AUTH/Registration/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Additional: Story = { ...scenarios.MobileAdditional, name: 'Additional' };

export const PasswordValidation: Story = {
  ...scenarios.MobilePasswordValidation,
  name: 'Password Validation',
};

export const EmailCheckState: Story = {
  ...scenarios.MobileEmailCheckState,
  name: 'Email Check State',
};

export const AddressSearch: Story = { ...scenarios.MobileAddressSearch, name: 'Address Search' };
