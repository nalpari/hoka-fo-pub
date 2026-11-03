'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.coupons의 items/totalCount/hasMore와 category별 서버 조회·register를 연결합니다.
 * 등록 성공 후 목록/요약 수를 갱신하고 resolve합니다. 실패 시 코드가 남습니다. employeeCoupons는 실제 임직원 자격/발급 상태에 맞는 표시 목록입니다.
 */

import { RouteContent } from './_components/CouponManagement';

/** 라우트의 기본 화면을 표시합니다. (Displays the default route screen.) */
export default function Page() {
  return <RouteContent />;
}
