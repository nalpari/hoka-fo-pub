'use client';

/**
 * [개발팀 바인딩]
 * 이 경로의 실제 데이터/변경 요청은 MyPageDataContext.histories["wishlist"]에 연결합니다. 공통 구현은 MyPageProductHistory입니다.
 * page의 props를 늘리거나 목 개수를 실제 데이터로 사용하지 말고 Provider의 items/totalCount/hasMore를 갱신합니다.
 */

import { MyPageProductHistory } from '@/components/mypage/MyPageProductHistory';

/** 관심상품의 공용 목록과 관리 기능을 연결합니다. (Connects the shared wishlist listing and management behavior.) */
export default function Page() {
  return <MyPageProductHistory kind="wishlist" />;
}
