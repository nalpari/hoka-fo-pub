'use client';

/**
 * [개발팀 바인딩]
 * HomeContentContext에 bestSellers와 탭 변경 조회를 연결하고 hero/categories/explore/shoeFinder에는 기존 카드 조합을 넣습니다.
 * 시안의 12개 반복 생성은 서비스 모드에 적용하지 않습니다. 운영 응답 수/빈 결과/조회 상태를 그대로 전달합니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/HomeContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
