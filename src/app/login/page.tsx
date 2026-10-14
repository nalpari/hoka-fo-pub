'use client';

import { useShop } from '@/shared/ShopShell';
import { LoginPage } from '@/shared/features/login/LoginPage';

export default function Page() {
  const { login } = useShop();
  return <LoginPage onLogin={login} />;
}
