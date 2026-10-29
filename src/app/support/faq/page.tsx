'use client';

/**
 * [개발팀 바인딩]
 * SupportContentContext.faq에 서버 검색 결과/전체 건수/hasMore와 onQueryChange/onLoadMore/onRetry를 연결합니다.
 * 같은 질문 제목이 여러 개 있어도 id로 구분합니다. 검색 조건이 바뀐 뒤 도착한 이전 응답은 조회 어댑터에서 버립니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/FaqContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
