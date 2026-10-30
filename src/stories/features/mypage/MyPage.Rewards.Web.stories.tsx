import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MyPageDataContext, type OverviewView } from '@/context/MyPageDataContext';
import { ShopShell } from '@/context/ShopShell';

import RewardsPage from '@/app/mypage/rewards/page';

type Args = { item: OverviewView | null | undefined; pending: boolean; error: string };

const item: OverviewView = {
  name: '김테스트',
  tier: 'ADVANCED',
  tierInitial: 'A',
  purchaseAmount: '456,789',
  nextTierText: '서버에서 준비한 등급 안내',
  couponCount: 0,
  wishlistCount: 0,
  tierProgress: {
    percent: 72,
    label: '준비된 다음 등급 안내',
    currentAmount: '654,321',
    targetAmount: '999,999',
  },
  orders: [],
  referralCode: 'external-member-42',
  referralCount: 0,
  referralRewards: '0',
};

const retry = fn();

const meta = {
  title: 'PAGES/마이페이지/5. 회원등급/WEB',
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka1600' },
  args: { item: undefined, pending: false, error: '' },
  render: ({ item, pending, error }) => (
    <ShopShell platform="web">
      <MyPageDataContext.Provider
        value={item === undefined ? {} : { overview: { item, pending, error, onRetry: retry } }}
      >
        <RewardsPage />
      </MyPageDataContext.Provider>
    </ShopShell>
  ),
} satisfies Meta<Args>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Rewards: Story = { name: 'Default' };

export const Connected: Story = { name: '연결 표시 데이터', args: { item } };

export const Pending: Story = { name: '조회 중', args: { item: null, pending: true } };

export const Failed: Story = {
  name: '조회 실패와 재시도',
  args: { item: null, error: '회원등급을 불러오지 못했습니다.' },
};
