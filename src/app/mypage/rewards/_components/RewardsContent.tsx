'use client';

import { Box } from 'styled-system/jsx';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import { accountRewardPreview } from '@/app/mypage/rewards/rewardsPreviews';
import { MembershipRewards } from '@/components/membership/MembershipRewards';
import type { MembershipSummaryDisplay } from '@/components/membership/rewards-data';

/** [ 개발팀 바인딩 ] 마이페이지 통합 소유자가 조회 후 현재 display에 등급, 구매금액, 진행률 및 준비된 안내 문구를 제공합니다. 기본 요약, 산정 케이스와 loading/error는 고정 미리보기입니다. 실제 산정·조회, 실패 시 재시도와 최신 응답 반영은 통합 소유자가 관리합니다. */
/** 회원등급 본문과 고정 조회 상태를 마이페이지 프레임에 배치합니다. (Places shared membership content and fixed query states in the account frame.) */
export function RewardsPageContent({
  display,
  preview,
}: { display?: MembershipSummaryDisplay | null; preview?: 'loading' | 'error' } = {}) {
  const summary = preview ? null : display === undefined ? accountRewardPreview : display;
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
