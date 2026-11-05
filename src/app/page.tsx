'use client';

/**
 * [ 개발팀 바인딩 ]
 * bestSellers와 탭 변경 조회는 통합 소유자가 연결하고 hero/categories/explore/shoeFinder에는 기존 카드 조합을 넣습니다. 현재 연결 Context·요청은 없습니다.
 * 시안의 12개 반복 생성은 서비스 모드에 적용하지 않습니다. 운영 응답 수/빈 결과/조회 상태를 그대로 전달합니다.
 */

import { RouteContent } from './_components/HomeContent';

/** 라우트의 기본 화면을 표시합니다. (Displays the default route screen.) */
export default function Page() {
  return <RouteContent />;
}
