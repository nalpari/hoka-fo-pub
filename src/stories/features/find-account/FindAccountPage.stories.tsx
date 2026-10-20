import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './FindAccountPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Login/FindAccount/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const Error: Story = { ...scenarios.Error, name: 'Error' };

export const CodeEntry: Story = { ...scenarios.CodeEntry, name: 'Code Entry' };

export const IdResult: Story = { ...scenarios.IdResult, name: 'Id Result' };

export const ResetFromResult: Story = { ...scenarios.ResetFromResult, name: 'Reset From Result' };
