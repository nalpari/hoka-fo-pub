import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/SUPPORT/ShippingReturns/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.ShippingReturnsMobile375, name: 'Default' };
