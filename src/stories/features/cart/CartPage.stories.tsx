import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './CartPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Cart/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Web, name: 'Default' };

export const Empty: Story = { ...scenarios.Empty, name: 'Empty' };

export const Selection: Story = { ...scenarios.Selection, name: 'Selection' };
