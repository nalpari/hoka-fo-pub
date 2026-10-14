'use client';

import { useShop } from '@/shared/ShopShell';
import { MyPage } from '@/shared/features/mypage/MyPage';

export default function Page() {
  const { logout } = useShop();
  return <MyPage onLogout={logout} />;
}
