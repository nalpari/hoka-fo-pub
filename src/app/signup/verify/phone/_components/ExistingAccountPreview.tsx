'use client';
import { useState } from 'react';

import { PhoneVerificationStatePreview } from '@/components/phone-verification/PhoneVerificationStatePreview';

import { AlreadyRegisteredModal } from './PhoneVerificationContent';

/** 기존 회원 안내를 인증 요청 없이 표시합니다. (Displays the existing-account notice without verification.) */
export function ExistingAccountPreview() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <PhoneVerificationStatePreview state="code-entry" />
      {open && <AlreadyRegisteredModal onOpenChange={setOpen} onConfirm={() => setOpen(false)} />}
    </>
  );
}
