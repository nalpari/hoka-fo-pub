'use client';

import { MyPageProductHistory } from '@/components/features/mypage/MyPageProductHistory';

/** 최근 본 상품의 공용 목록을 표시합니다. (Displays the shared recently viewed product listing.) */
export default function Page() {
  return <MyPageProductHistory kind="recent" />;
}
