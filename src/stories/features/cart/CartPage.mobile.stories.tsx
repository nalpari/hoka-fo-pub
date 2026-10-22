import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './CartPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/장바구니/0. 장바구니 목록/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Selection: Story = { ...scenarios.MobileSelection, name: '상품 선택' };
