'use client';

import { useRouter } from 'next/navigation';
import {
  IdentityVerificationContent,
  type VerificationMethod,
} from '@/components/features/identity-verification/IdentityVerificationContent';

/** 회원가입 본인확인 방법을 선택하는 화면을 표시합니다. (Displays identity verification method selection for signup.) */
export default function Page() {
  const router = useRouter();

  const selectMethod = (method: VerificationMethod) => {
    if (method === 'phone') {
      router.push('/signup/verify/phone');
      return;
    }
  };

  return <IdentityVerificationContent onSelect={selectMethod} />;
}
