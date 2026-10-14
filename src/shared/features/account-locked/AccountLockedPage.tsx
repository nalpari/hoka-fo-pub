'use client';

import { useRouter } from 'next/navigation';
import { AccountLockedContent } from '@/shared/features/account-locked/AccountLockedContent';

export function AccountLockedPage() {
  const router = useRouter();
  return (
    <AccountLockedContent
      onClose={() => router.push('/login')}
      onConfirm={() => router.push('/login/account-locked/verification')}
    />
  );
}
