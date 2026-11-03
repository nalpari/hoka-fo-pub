'use client';

/**
 * [개발팀 바인딩]
 * selectMethod의 phone은 공통 인증 페이지로 연결됩니다. ipin 선택은 현재 실제 인증 서비스가 없는 상태입니다.
 * 아이핀을 연결할 경우 제공자 인증 결과를 VerifiedIdentity로 변환해 AccountFlowProvider에 전달하고 서버 accountStatus에 따라 다음 단계를 결정합니다.
 */

import { RouteContent } from './_components/IdentityVerificationContent';

/** 라우트의 기본 화면을 표시합니다. (Displays the default route screen.) */
export default function Page() {
  return <RouteContent />;
}
