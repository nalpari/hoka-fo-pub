'use client';

/**
 * [개발팀 바인딩]
 * PhoneVerificationContext.verify는 proof/information/accountStatus를 반환합니다. AccountServicesContext를 연결한 가입 흐름에서는 이 결과가 필수입니다.
 * accountStatus가 new면 약관, existing이면 기존회원 안내로 분기합니다. 정보와 proof는 AccountFlowProvider를 통해 다음 단계에 전달합니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/PhoneVerificationContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
