import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './CheckoutPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Checkout/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Empty: Story = { ...scenarios.MobileEmpty, name: 'Empty' };

export const CompleteOrder: Story = { ...scenarios.MobileCompleteOrder, name: 'Complete Order' };

export const CouponSelection: Story = {
  ...scenarios.MobileCouponSelection,
  name: 'Coupon Selection',
};
