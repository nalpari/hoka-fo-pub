import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './AccountLockedPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Login/FindAccount/AccountLockedModal/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const ConfirmNavigation: Story = {
  ...scenarios.ConfirmNavigation,
  name: 'Confirm Navigation',
};

export const CloseNavigation: Story = { ...scenarios.CloseNavigation, name: 'Close Navigation' };

export const EscapeNavigation: Story = { ...scenarios.EscapeNavigation, name: 'Escape Navigation' };
