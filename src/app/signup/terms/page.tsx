'use client';

/**
 * [개발팀 바인딩]
 * AccountServicesContext.signupTerms에 BO의 id/version/label/required/body와 previousVersions를 전달합니다.
 * 동의 제출은 현재 약관의 id/version/accepted입니다. 이전 본문을 열람해도 제출 동의 버전을 과거 버전으로 바꾸지 않습니다.
 * 본문은 안전한 ReactNode로 전달하고 BO 버전 변경 시 기존 동의를 그대로 승인한 것으로 처리하지 않습니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/SignupTermsContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
