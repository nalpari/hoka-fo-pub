'use client';

/**
 * [개발팀 바인딩]
 * 본인인증 정보는 AccountFlowProvider.identity에서 읽고 중복확인은 AccountServicesContext.checkId로 요청합니다. ID 변경 시 이전 확인 결과는 무효입니다.
 * register에는 information/preferences/identity/consents가 함께 전달됩니다. 실제 중복/가입 가능 여부/필수 동의/인증 참조는 서버에서 최종 검증합니다.
 * 서비스가 실패하면 입력과 확인 모달을 유지합니다. 성공 후에만 임시 proof/동의를 지우고 가입 완료로 이동합니다. 주소 검색의 실제 제공자 연동은 AddressFields 소유자에 연결합니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/RegistrationContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
