'use client';

/**
 * [개발팀 바인딩]
 * selectMethod의 phone은 공통 인증 페이지로 연결됩니다. ipin 선택은 현재 실제 인증 서비스가 없는 상태입니다.
 * 아이핀을 연결할 경우 제공자 인증 결과를 VerifiedIdentity로 변환해 AccountFlowProvider에 전달하고 서버 accountStatus에 따라 다음 단계를 결정합니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/IdentityVerificationContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
