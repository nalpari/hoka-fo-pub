'use client';

import { Box } from 'styled-system/jsx';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import { accountRewardPreview } from '@/app/mypage/rewards/rewardsPreviews';
import { MembershipRewards } from '@/components/membership/MembershipRewards';
import type { MembershipSummaryDisplay } from '@/components/membership/rewards-data';

/** [ 개발팀 바인딩 ] 마이페이지 통합 소유자가 조회 후 현재 display에 등급, 구매금액, 진행률 및 준비된 안내 문구를 제공합니다. 기본 요약과 산정 케이스는 고정 표시 예시입니다. 실제 산정·조회, 요청 상태와 재시도, 최신 응답 반영은 통합 소유자가 관리합니다. */
/** 회원등급 본문을 마이페이지 프레임에 배치합니다. (Places shared membership content in the account frame.) */
export function RewardsPageContent({
  display = accountRewardPreview,
}: { display?: MembershipSummaryDisplay | null } = {}) {
  return (
    <MyPageFrame activePath="/mypage/rewards" breadcrumbs={[{ label: '회원등급' }]}>
      <Box _mobile={{ pt: '24px' }}>
        <MembershipRewards summary={display} layout="account" />
      </Box>
    </MyPageFrame>
  );
}
