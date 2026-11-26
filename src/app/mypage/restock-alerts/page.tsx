'use client';

/**
 * [ 개발팀 바인딩 ]
 * 이 경로의 실제 데이터/변경 요청은 통합 소유자가 연결합니다(현재 연결 Context·요청 없음). 공통 구현은 MyPageProductHistory입니다.
 * 연결 시 page 대신 MyPageProductHistory에 실제 신청 행 ID가 포함된 entries를 전달합니다.
 */

import { MyPageProductHistory } from '@/app/mypage/_components/MyPageProductHistory';

/** 재입고 알림 상품 목록 화면을 표시합니다. (Displays the restock alert product list.) */
export default function Page() {
  return <MyPageProductHistory kind="restock-alerts" />;
}
