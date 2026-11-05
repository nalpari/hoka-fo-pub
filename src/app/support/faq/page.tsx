'use client';

/**
 * [ 개발팀 바인딩 ]
 * 서버 검색 결과/전체 건수/hasMore와 조건 변경·더보기·재시도는 통합 소유자가 연결합니다. 현재 연결 Context·요청은 없습니다.
 * 같은 질문 제목이 여러 개 있어도 id로 구분합니다. 검색 조건이 바뀐 뒤 도착한 이전 응답은 조회 어댑터에서 버립니다.
 */

import { RouteContent } from './_components/FaqContent';

/** 라우트의 기본 화면을 표시합니다. (Displays the default route screen.) */
export default function Page() {
  return <RouteContent />;
}
