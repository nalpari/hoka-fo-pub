'use client';

import { useRouter } from 'next/navigation';
import { IdConfirmationModal } from '@/shared/features/find-account/IdConfirmationModal';

export default function Page() {
  const router = useRouter();
  return (
    <IdConfirmationModal
      onOpenChange={() => {}}
      onPasswordReset={() => router.push('/login/find-account/password-reset')}
      onConfirm={() => {}}
    />
  );
}
