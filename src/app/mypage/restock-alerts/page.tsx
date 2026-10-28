'use client';

import { MyPageProductHistory } from '@/components/mypage/MyPageProductHistory';

/** 재입고 알림 상품의 공용 목록과 취소 기능을 연결합니다. (Connects the shared restock listing and cancellation behavior.) */
export default function Page() {
  return <MyPageProductHistory kind="restock-alerts" />;
}
