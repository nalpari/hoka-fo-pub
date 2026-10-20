import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './LoginPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Login/Login/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const RememberIdHelp: Story = { ...scenarios.RememberIdHelp, name: 'Remember Id Help' };

export const Error: Story = { ...scenarios.Error, name: 'Error' };

export const LoginFlow: Story = { ...scenarios.LoginFlow, name: 'Login Flow' };

export const InvalidFormats: Story = { ...scenarios.InvalidFormats, name: 'Invalid Formats' };

export const UnavailableActions: Story = {
  ...scenarios.UnavailableActions,
  name: 'Unavailable Actions',
};
