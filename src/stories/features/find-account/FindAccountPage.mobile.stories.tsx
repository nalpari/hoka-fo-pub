import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './FindAccountPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Login/FindAccount/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Error: Story = { ...scenarios.MobileError, name: 'Error' };

export const IdResult: Story = { ...scenarios.MobileIdResult, name: 'Id Result' };
