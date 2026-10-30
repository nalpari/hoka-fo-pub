'use client';

/**
 * [개발팀 바인딩]
 * AccountServicesContext.recovery.request/verify를 실제 발송/검증/계정 조회에 연결합니다. 요청 ID와 서버 유효시간을 사용합니다.
 * verify 결과의 maskedAccountId와 resetProof를 AccountFlowProvider에 보관해 결과 표시와 비밀번호 변경에 사용합니다. 재설정 참조를 URL/저장소에 넣지 않습니다.
 * 900668/honggildong은 Provider가 없는 데모 값입니다. 이름/전화번호 변경 시 이전 인증 요청 결과를 폐기합니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/FindAccountContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
