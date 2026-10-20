import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './CheckoutPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Checkout/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Web, name: 'Default' };

export const Empty: Story = { ...scenarios.Empty, name: 'Empty' };

export const CompleteOrder: Story = { ...scenarios.CompleteOrder, name: 'Complete Order' };

export const CouponSelection: Story = { ...scenarios.CouponSelection, name: 'Coupon Selection' };
