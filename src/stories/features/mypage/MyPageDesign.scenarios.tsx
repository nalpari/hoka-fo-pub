import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/context/ShopShell';

import { MyPageProductHistory } from '@/components/mypage/MyPageProductHistory';
import { MyPageReviews } from '@/stories/features/mypage/MyPagePreview';
import {
  type MyPageStatusKind,
  MyPageStatusPage,
} from '@/stories/features/mypage/MyPageRoutePreview';

type Args = { kind: MyPageStatusKind };

const meta = {
  title: 'PAGES/마이페이지',
  parameters: { layout: 'fullscreen' },
  render: ({ kind }) => (
    <ShopShell platform="mobile">
      <MyPageStatusPage kind={kind} />
    </ShopShell>
  ),
} satisfies Meta<Args>;

export default meta;

type Story = StoryObj<typeof meta>;

const mobile = { viewport: 'hoka375' };

export const Reviews: Story = { args: { kind: 'reviews' }, globals: mobile };

export const Rewards: Story = { args: { kind: 'rewards' }, globals: mobile };

export const Coupons: Story = { args: { kind: 'coupons' }, globals: mobile };

export const Profile: Story = { args: { kind: 'profile' }, globals: mobile };

export const Addresses: Story = { args: { kind: 'addresses' }, globals: mobile };

export const Wishlist: Story = { args: { kind: 'wishlist' }, globals: mobile };

export const Recent: Story = { args: { kind: 'recent' }, globals: mobile };

export const RestockAlerts: Story = { args: { kind: 'restock-alerts' }, globals: mobile };

export const ReviewsEmpty: Story = {
  args: { kind: 'reviews' },
  globals: mobile,
  render: () => (
    <ShopShell platform="mobile">
      <MyPageReviews initialReadyCount={0} />
    </ShopShell>
  ),
};

export const WishlistEmpty: Story = {
  args: { kind: 'wishlist' },
  globals: mobile,
  render: () => (
    <ShopShell platform="mobile">
      <MyPageProductHistory kind="wishlist" initialCount={0} />
    </ShopShell>
  ),
};

export const RecentEmpty: Story = {
  args: { kind: 'recent' },
  globals: mobile,
  render: () => (
    <ShopShell platform="mobile">
      <MyPageProductHistory kind="recent" initialCount={0} />
    </ShopShell>
  ),
};

export const RestockAlertsEmpty: Story = {
  args: { kind: 'restock-alerts' },
  globals: mobile,
  render: () => (
    <ShopShell platform="mobile">
      <MyPageProductHistory kind="restock-alerts" initialCount={0} />
    </ShopShell>
  ),
};
