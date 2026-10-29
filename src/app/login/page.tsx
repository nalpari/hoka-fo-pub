'use client';

/**
 * [ 개발팀 바인딩 ]
 * 로그인 연결 소유자는 잠금 응답을 code: ACCOUNT_LOCKED 오류로 전달합니다. UI는 잠금 안내로 이동하며 그 외 오류는 입력을 유지해 재시도합니다.
 * ShopShell.state.login에 { id, password, rememberId }를 받아 실제 인증하는 함수를 연결합니다. 인증/세션 갱신 후 resolve, 실패는 reject합니다.
 * 소셜 로그인 버튼의 onUnavailable은 현재 안내용입니다. OAuth 연동 시 이 이벤트 소유자에서 제공자 인증을 처리하고 비밀번호를 URL/저장소로 넘기지 않습니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/LoginContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
