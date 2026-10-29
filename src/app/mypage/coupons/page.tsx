'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.coupons의 items/totalCount/hasMore와 category별 서버 조회·register를 연결합니다.
 * 등록 성공 후 목록/요약 수를 갱신하고 resolve합니다. 실패 시 코드가 남습니다. employeeCoupons는 실제 임직원 자격/발급 상태에 맞는 표시 목록입니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/CouponManagement';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
