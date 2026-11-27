import type { MembershipSummaryDisplay } from '@/components/membership/rewards-data';

export const accountRewardPreview = {
  name: '박연진',
  tier: 'RUNNER',
  tierInitial: 'R',
  purchaseAmount: '180,000',
  tierProgress: {
    percent: 60,
    label: '120,000원 더 구매확정하면 ADVANCED가 돼요.',
    currentAmount: '180,000',
    targetAmount: '300,000',
  },
} satisfies MembershipSummaryDisplay;

const downgradeSummary = {
  name: accountRewardPreview.name,
  tier: 'ELITE',
  tierInitial: 'E',
  purchaseAmount: '280,000',
  tierProgress: { percent: 28, currentAmount: '280,000', targetAmount: '1,000,000' },
} satisfies MembershipSummaryDisplay;

export const rewardsPreviews = [
  {
    state: 'upgrade-scheduled',
    label: '상향 예정',
    display: {
      ...accountRewardPreview,
      purchaseAmount: '320,000',
      tierProgress: {
        percent: 100,
        label: '0원 구매시 등급 업!',
        currentAmount: '320,000',
        targetAmount: '300,000',
        notice: '12월 3일 ADVANCED로 변경될 예정이에요.',
      },
    },
  },
  {
    state: 'maintained',
    label: '유지',
    display: {
      name: accountRewardPreview.name,
      tier: 'ADVANCED',
      tierInitial: 'A',
      purchaseAmount: '320,000',
      tierProgress: {
        percent: 32,
        label: '680,000원 구매시 등급 업!',
        currentAmount: '320,000',
        targetAmount: '1,000,000',
        notice: '12월 3일에도 ADVANCED 등급이 유지될 예정이에요.',
      },
    },
  },
  {
    state: 'downgrade-risk',
    label: '하락 위험',
    display: {
      ...downgradeSummary,
      tierProgress: {
        ...downgradeSummary.tierProgress,
        label: '720,000원 구매 시 ELITE 등급 유지!',
        labelSize: 'compact',
        notice: '말일까지 720,000원 더 구매확정하면 ELITE 등급이 유지돼요.',
      },
    },
  },
  {
    state: 'downgrade-scheduled',
    label: '하락 예정',
    display: {
      ...downgradeSummary,
      tierProgress: {
        ...downgradeSummary.tierProgress,
        label: '720,000원 구매시 ELITE 등급 유지!',
        notice: '11월 30일까지 720,000원 더 구매확정하면 ELITE 등급이 유지돼요',
      },
    },
  },
  {
    state: 'elite-achieved',
    label: 'ELITE 달성',
    display: {
      ...downgradeSummary,
      purchaseAmount: '1,000,000',
      tierProgress: {
        percent: 100,
        label: 'ELITE 달성!',
        currentAmount: '1,000,000',
        targetAmount: '1,000,000',
      },
    },
  },
] satisfies { state: string; label: string; display: MembershipSummaryDisplay }[];
