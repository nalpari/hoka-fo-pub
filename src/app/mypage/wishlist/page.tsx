'use client';

import { MyPageProductHistory } from '@/components/mypage/MyPageProductHistory';

/** 관심상품의 공용 목록과 관리 기능을 연결합니다. (Connects the shared wishlist listing and management behavior.) */
export default function Page() {
  return <MyPageProductHistory kind="wishlist" />;
}
