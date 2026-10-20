import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './LoginPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Login/Login/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const RememberIdHelp: Story = {
  ...scenarios.MobileRememberIdHelp,
  name: 'Remember Id Help',
};

export const Error: Story = { ...scenarios.MobileError, name: 'Error' };

export const LoginFlow: Story = { ...scenarios.MobileLoginFlow, name: 'Login Flow' };

export const InvalidFormats: Story = { ...scenarios.MobileInvalidFormats, name: 'Invalid Formats' };
