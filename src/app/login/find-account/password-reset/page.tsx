'use client';

/**
 * [개발팀 바인딩]
 * AccountServicesContext.recovery.resetPassword에 이전 단계의 resetProof와 password가 전달됩니다.
 * 서버 변경 완료 후 resolve해야 완료 팝업을 표시합니다. 만료/실패는 reject해 입력을 유지하며 proof가 없으면 재인증이 필요합니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/PasswordResetContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
