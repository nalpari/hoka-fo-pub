'use client';

import { useRouter } from 'next/navigation';
import { PhoneVerificationContent } from '@/components/features/phone-verification/PhoneVerificationContent';
import { usePhoneVerification } from '@/components/features/phone-verification/usePhoneVerification';

/** 계정 잠금 해제 인증 화면과 인증 후 이동을 구성합니다. (Composes account unlock verification and post-verification navigation.) */
export default function Page() {
  const router = useRouter();
  const verification = usePhoneVerification(() => router.push('/login/account-locked/complete'));

  return (
    <PhoneVerificationContent
      title="계정 잠금 해제"
      description="해킹, 계정탈취 시도 등의 보안이슈로 인하여 계정이잠금 처리되었습니다. 계속 이용 하시려면 본인인증을 통하여 계정잠금을 해제해 주세요."
      {...verification}
    />
  );
}
