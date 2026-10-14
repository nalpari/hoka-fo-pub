'use client';

import { useRouter } from 'next/navigation';
import {
  IdentityVerificationContent,
  type VerificationMethod,
} from './IdentityVerificationContent';

export function IdentityVerificationPage() {
  const router = useRouter();

  const selectMethod = (method: VerificationMethod) => {
    if (method === 'phone') {
      router.push('/signup/verify/phone');
      return;
    }
  };

  return <IdentityVerificationContent onSelect={selectMethod} />;
}
