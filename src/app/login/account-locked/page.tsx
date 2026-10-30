'use client';

/**
 * [개발팀 바인딩]
 * 이 화면은 잠금 안내/인증 이동 UI입니다. 실제 계정 잠금 여부는 로그인 서버 응답으로 판단하고 이 경로로 연결합니다.
 * 잠금 해제 요청은 verification 경로의 AccountServicesContext.unlock에서 처리하며 안내 확인 클릭만으로 계정 상태를 바꾸지 않습니다.
 */

import { useRouter } from 'next/navigation';

import { AccountLockedContent } from './_components/AccountLockedContent';

/** 계정 잠금 안내와 해제 절차의 진입 화면을 표시합니다. (Displays account lock information and entry to the unlock flow.) */
export default function Page() {
  const router = useRouter();
  return (
    <AccountLockedContent
      onClose={() => router.push('/login')}
      onConfirm={() => router.push('/login/account-locked/verification')}
    />
  );
}
