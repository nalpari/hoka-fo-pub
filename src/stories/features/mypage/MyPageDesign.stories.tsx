import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/MYPAGE/Figma Screens/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Reviews: Story = { ...scenarios.Reviews, name: 'Reviews' };

export const Rewards: Story = { ...scenarios.Rewards, name: 'Rewards' };

export const Coupons: Story = { ...scenarios.Coupons, name: 'Coupons' };

export const Profile: Story = { ...scenarios.Profile, name: 'Profile' };

export const Addresses: Story = { ...scenarios.Addresses, name: 'Addresses' };

export const Wishlist: Story = { ...scenarios.Wishlist, name: 'Wishlist' };

export const Recent: Story = { ...scenarios.Recent, name: 'Recent' };

export const RestockAlerts: Story = { ...scenarios.RestockAlerts, name: 'Restock Alerts' };

export const ReviewsEmpty: Story = { ...scenarios.ReviewsEmpty, name: 'Reviews Empty' };

export const WishlistEmpty: Story = { ...scenarios.WishlistEmpty, name: 'Wishlist Empty' };

export const RecentEmpty: Story = { ...scenarios.RecentEmpty, name: 'Recent Empty' };

export const RestockAlertsEmpty: Story = {
  ...scenarios.RestockAlertsEmpty,
  name: 'Restock Alerts Empty',
};
