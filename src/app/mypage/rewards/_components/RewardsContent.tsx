'use client';

import { Box } from 'styled-system/jsx';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import { MembershipRewards } from '@/components/membership/MembershipRewards';
import { rewardPreview } from '@/components/membership/rewards-data';
import type { OverviewView } from '@/types/mypage-display';

/** 회원등급 본문과 고정 조회 상태를 마이페이지 프레임에 배치합니다. (Places shared membership content and fixed query states in the account frame.) */
export function RewardsPageContent({
  display,
  preview,
}: { display?: OverviewView | null; preview?: 'loading' | 'error' } = {}) {
  const summary = preview ? null : display === undefined ? rewardPreview : display;
  return (
    <MyPageFrame activePath="/mypage/rewards" breadcrumbs={[{ label: '회원등급' }]}>
      <BindingFeedback
        pending={preview === 'loading'}
        error={preview === 'error' ? '회원등급을 불러오지 못했습니다.' : undefined}
      />
      <Box _mobile={{ pt: '24px' }}>
        <MembershipRewards summary={summary} layout="account" />
      </Box>
    </MyPageFrame>
  );
}
