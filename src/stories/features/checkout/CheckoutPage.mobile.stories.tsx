import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './CheckoutPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/주문/0. 주문서/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Empty: Story = { ...scenarios.MobileEmpty, name: '빈 목록' };

export const CompleteOrder: Story = { ...scenarios.MobileCompleteOrder, name: '주문 완료 흐름' };

export const CouponSelection: Story = {
  ...scenarios.MobileCouponSelection,
  name: '쿠폰 선택',
};
