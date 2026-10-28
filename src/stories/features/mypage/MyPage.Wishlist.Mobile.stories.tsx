import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/1. 관심상품/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Wishlist: Story = { ...scenarios.Wishlist, name: 'Default' };

export const WishlistEmpty: Story = { ...scenarios.WishlistEmpty, name: '빈 목록' };
