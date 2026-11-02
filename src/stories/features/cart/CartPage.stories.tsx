import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './CartPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/장바구니/0. 장바구니 목록/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Web, name: 'Default' };

export const Empty: Story = { ...scenarios.Empty, name: '빈 목록' };

export const Selection: Story = { ...scenarios.Selection, name: '상품 선택' };

export const Quantity: Story = { ...scenarios.Quantity, name: '수량 변경과 고정 금액' };

export const OptionsOpen: Story = { ...scenarios.OptionsOpen, name: '옵션 변경 시안' };

export const LimitOpen: Story = { ...scenarios.LimitOpen, name: '수량 제한 안내' };
