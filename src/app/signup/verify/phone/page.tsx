'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PhoneVerificationContent } from '@/components/features/phone-verification/PhoneVerificationContent';
import { usePhoneVerification } from '@/components/features/phone-verification/usePhoneVerification';
import { AlreadyRegisteredModal } from '@/components/common/organisms/Account/AlreadyRegisteredModal';

/** 가입 휴대폰 인증 화면과 기존 가입 안내를 구성합니다. (Composes signup phone verification and the existing-account notice.) */
export default function Page() {
  const router = useRouter();
  const [alreadyRegisteredOpen, setAlreadyRegisteredOpen] = useState(false);
  const verification = usePhoneVerification(() => setAlreadyRegisteredOpen(true));

  return (
    <>
      <PhoneVerificationContent title="휴대폰 인증" {...verification} />
      {alreadyRegisteredOpen ? (
        <AlreadyRegisteredModal
          onOpenChange={setAlreadyRegisteredOpen}
          onConfirm={() => router.push('/signup')}
        />
      ) : null}
    </>
  );
}
