'use client';

/**
 * [ 개발팀 바인딩 ]
 * 회원명/등급/구매금액/쿠폰수/관심상품수/최근 주문 요약은 통합 소유자가 연결합니다. 현재 연결 Context·요청은 없습니다.
 * 같은 overview를 등급에서도 사용합니다. 주문·쿠폰·관심상품이 바뀌면 이 요약도 재조회해야 합니다.
 */

import { RouteContent } from './_components/MyPageContent';

/** 라우트의 기본 화면을 표시합니다. (Displays the default route screen.) */
export default function Page() {
  return <RouteContent />;
}
