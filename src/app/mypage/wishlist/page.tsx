'use client';

/**
 * [ 개발팀 바인딩 ]
 * 이 경로의 실제 데이터/변경 요청은 통합 소유자가 연결합니다(현재 연결 Context·요청 없음). 공통 구현은 MyPageProductHistory입니다.
 * page의 props를 늘리거나 목 개수를 실제 데이터로 사용하지 말고 연결 시 실제 items/totalCount/hasMore를 전달합니다.
 */

import { MyPageProductHistory } from '@/components/mypage/MyPageProductHistory';

/** 관심상품의 공용 목록과 관리 기능을 연결합니다. (Connects the shared wishlist listing and management behavior.) */
export default function Page() {
  return <MyPageProductHistory kind="wishlist" />;
}
