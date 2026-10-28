import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './CheckoutPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/주문/0. 주문서/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Web, name: 'Default' };

export const Empty: Story = { ...scenarios.Empty, name: '빈 목록' };

export const CompleteOrder: Story = { ...scenarios.CompleteOrder, name: '주문 완료 흐름' };

export const CouponSelection: Story = { ...scenarios.CouponSelection, name: '쿠폰 선택' };
