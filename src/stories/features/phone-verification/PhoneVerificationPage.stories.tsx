import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './PhoneVerificationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Signup/PhoneVerification/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const AccountUnlock: Story = { ...scenarios.AccountUnlock, name: 'Account Unlock' };

export const CodeEntry: Story = { ...scenarios.CodeEntry, name: 'Code Entry' };

export const Expired: Story = { ...scenarios.Expired, name: 'Expired' };

export const Interactive: Story = { ...scenarios.Interactive, name: 'Interactive' };

export const RequiredAgreements: Story = {
  ...scenarios.RequiredAgreements,
  name: 'Required Agreements',
};
