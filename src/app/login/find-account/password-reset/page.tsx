'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordResetContent } from '@/components/features/find-account/PasswordResetContent';
import {
  validatePasswordReset as validate,
  type Errors,
  type FieldName,
} from '@/components/features/find-account/passwordValidation';
import { PasswordResetCompleteModal } from '@/components/features/find-account/PasswordResetCompleteModal';

/** 새 비밀번호 입력 검증과 재설정 예시 흐름을 관리합니다. (Manages new-password validation and the example reset flow.) */
export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(password, confirmation);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setCompleteOpen(true);
  };

  const updateField = (field: FieldName, value: string) => {
    const nextPassword = field === 'password' ? value : password;
    const nextConfirmation = field === 'confirmation' ? value : confirmation;
    if (field === 'password') {
      setPassword(value);
    } else {
      setConfirmation(value);
    }
    setTouched((previous) => ({ ...previous, [field]: true }));
    const nextErrors = validate(nextPassword, nextConfirmation);
    if (field === 'password' && !touched.confirmation && !submitted) {
      delete nextErrors.confirmation;
    }
    setErrors(nextErrors);
  };

  return (
    <PasswordResetContent
      password={password}
      confirmation={confirmation}
      errors={errors}
      onFieldChange={updateField}
      onSubmit={submit}
      completion={
        completeOpen ? (
          <PasswordResetCompleteModal
            onOpenChange={(open) => {
              setCompleteOpen(open);
              if (!open) router.push('/login');
            }}
            onConfirm={() => router.push('/login')}
          />
        ) : null
      }
    />
  );
}
