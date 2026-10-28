'use client';

import { useRouter } from 'next/navigation';
import { AccountLockedContent } from '@/components/features/account-locked/AccountLockedContent';

/** 계정 잠금 안내와 해제 절차의 진입 화면을 표시합니다. (Displays account lock information and entry to the unlock flow.) */
export default function Page() {
  const router = useRouter();
  return (
    <AccountLockedContent
      onClose={() => router.push('/login')}
      onConfirm={() => router.push('/login/account-locked/verification')}
    />
  );
}
