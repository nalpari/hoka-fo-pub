import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './PhoneVerificationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Signup/PhoneVerification/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const FieldErrors: Story = { ...scenarios.MobileFieldErrors, name: 'Field Errors' };

export const AccountUnlock: Story = { ...scenarios.MobileAccountUnlock, name: 'Account Unlock' };

export const RequiredAgreements: Story = {
  ...scenarios.MobileRequiredAgreements,
  name: 'Required Agreements',
};

export const CodeEntry: Story = { ...scenarios.MobileCodeEntry, name: 'Code Entry' };
