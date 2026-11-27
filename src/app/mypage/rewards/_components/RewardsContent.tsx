'use client';

import { usePlatform } from '@/context/platform';

import { Box } from 'styled-system/jsx';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import { MembershipRewards } from '@/components/membership/MembershipRewards';
import { accountRewardPreview } from '@/components/membership/rewards-data';
import type { OverviewView } from '@/types/mypage-display';

/** [ 개발팀 바인딩 ] 마이페이지 통합 소유자가 조회 후 현재 OverviewView를 display로 제공합니다. 응답 없이 사용하는 PC·모바일 요약과 loading/error는 고정 미리보기입니다. 실제 요청·실패 시 재시도·최신 응답 반영은 통합 소유자가 관리합니다. */
/** 회원등급 본문과 고정 조회 상태를 마이페이지 프레임에 배치합니다. (Places shared membership content and fixed query states in the account frame.) */
export function RewardsPageContent({
  display,
  preview,
}: { display?: OverviewView | null; preview?: 'loading' | 'error' } = {}) {
  const platform = usePlatform();
  const summary = preview ? null : display === undefined ? accountRewardPreview[platform] : display;
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
