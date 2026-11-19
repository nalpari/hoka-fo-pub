'use client';

import { useSearchParams } from 'next/navigation';

import { useShopPreviewLoggedIn } from '@/context/ShopPreviewContext';

import { MembershipRewards } from '@/components/membership/MembershipRewards';
import type { OverviewView } from '@/types/mypage-display';

/** [ 개발팀 바인딩 ] 기본 경로는 셸의 현재 로그인 표시 상태를 읽고 preview=logged-in/logged-out은 IA 고정 표시만 지정합니다. 실제 인증 상태는 바꾸지 않습니다. summary는 준비된 개인 등급 데이터이며 생략 시 공통 예시를 사용합니다. 실제 인증·개인 등급 조회·로딩/실패 연결은 고객센터 통합 소유자의 별도 경계입니다. */
/** 로그인 상태에 맞춰 공통 회원등급 본문을 배치합니다. (Places shared membership content according to the current login display state.) */
export function MemberBenefitsContent({ summary }: { summary?: OverviewView | null }) {
  const isLoggedIn = useShopPreviewLoggedIn();
  const searchParams = useSearchParams();
  const preview = searchParams.get('preview');
  const showSummary =
    preview === 'logged-in' ? true : preview === 'logged-out' ? false : isLoggedIn;
  return <MembershipRewards showSummary={showSummary} summary={summary} />;
}
