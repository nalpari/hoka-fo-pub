'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.overview의 회원명/등급/구매금액/쿠폰수/관심상품수/최근 주문을 연결합니다.
 * 같은 overview를 등급/친구추천에서도 사용합니다. 주문·쿠폰·관심상품이 바뀌면 이 요약도 재조회해야 합니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/MyPageContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
