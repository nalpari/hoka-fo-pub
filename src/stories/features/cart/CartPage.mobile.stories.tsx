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

export const Selected: Story = { ...scenarios.MobileSelected, name: '3개 선택' };

export const SoldOut: Story = { ...scenarios.MobileSoldOut, name: '품절 상품' };

export const Options: Story = { ...scenarios.MobileOptions, name: '옵션 변경' };

export const OptionsOpen: Story = {
  ...scenarios.OptionsOpen,
  ...scenarios.Mobile,
  name: '옵션 변경 시안',
  render: scenarios.OptionsOpen.render,
};

export const LimitOpen: Story = {
  ...scenarios.LimitOpen,
  ...scenarios.Mobile,
  name: '수량 제한 안내',
  render: scenarios.LimitOpen.render,
};

export const OptionSave: Story = { ...scenarios.MobileOptionSave, name: '옵션 선택과 닫기' };

export const Empty: Story = {
  ...scenarios.Empty,
  ...scenarios.Mobile,
  name: '빈 목록',
  render: scenarios.Empty.render,
};
