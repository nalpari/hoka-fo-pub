'use client';

import { useState, type FormEvent } from 'react';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { PasswordField } from '@/components/common/molecules/FormFields/PasswordField';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';
import { validatePasswordReset, type Errors, type FieldName } from '@/lib/passwordValidation';

type Props = {
  onClose: () => void;
  onComplete: () => void;
};

const titles = {
  input: '비밀번호 설정',
  confirm: '비밀번호 변경 확인',
  complete: '비밀번호 변경 완료',
};

/** 비밀번호 입력·검증과 변경 확인·완료의 데모 흐름을 관리합니다. (Manages the demo flow for password validation, confirmation, and completion.) */
export function ProfilePasswordDialog({ onClose, onComplete }: Props) {
  const [step, setStep] = useState<'input' | 'confirm' | 'complete'>('input');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  function changeField(field: FieldName, value: string) {
    if (field === 'password') setPassword(value);
    else setConfirmation(value);
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
      ...(field === 'password' ? { confirmation: undefined } : {}),
    }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const nextErrors = validatePasswordReset(password, confirmation);
    if (nextErrors.password) {
      nextErrors.password = '올바른 비밀번호를 입력해주세요.';
    }
    if (confirmation && password !== confirmation) {
      nextErrors.confirmation = '비밀번호가 일치하지 않습니다. 다시 확인해주세요.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep('confirm');
  }

  function confirm() {
    if (step === 'confirm') {
      // This screen models the flow locally; no account API is connected yet.
      setPassword('');
      setConfirmation('');
      onComplete();
      setStep('complete');
    } else {
      onClose();
    }
  }

  return (
    <SingleActionDialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={titles[step]}
      closeLabel="비밀번호 설정 닫기"
      size="sm"
      confirmLabel={step === 'input' ? '비밀번호 설정' : '확인'}
      onConfirm={step === 'input' ? undefined : confirm}
      confirmButtonProps={{
        type: step === 'input' ? 'submit' : 'button',
        form: step === 'input' ? 'profile-password-form' : undefined,
        size: 'tall',
      }}
    >
      {step === 'input' ? (
        <form id="profile-password-form" noValidate onSubmit={submit}>
          <Stack gap="4">
            <PasswordField
              id="profile-new-password"
              label="비밀번호"
              required
              variant="boxed"
              error={errors.password}
              hint="연속적인 숫자나 생일, 전화번호등 추측하기 쉬운 개인정보 및 아이디와 비슷한 전화번호 사용을 피하시기 바랍니다. 비밀번호는 특수기호를 포함한 3가지 이상을 혼합하여 입력하세요."
              hintProps={{ variant: 'body4', className: css({ pt: '2' }) }}
              inputProps={{
                autoComplete: 'new-password',
                value: password,
                onChange: (event) => changeField('password', event.target.value),
              }}
            />
            <PasswordField
              id="profile-password-confirmation"
              label="비밀번호 재입력"
              required
              variant="boxed"
              error={errors.confirmation}
              inputProps={{
                autoComplete: 'new-password',
                placeholder: '비밀번호를 다시 입력해 주세요',
                value: confirmation,
                onChange: (event) => changeField('confirmation', event.target.value),
              }}
            />
          </Stack>
        </form>
      ) : (
        <Typography variant="body3" role="status">
          {step === 'confirm' ? '비밀번호를 변경하시겠습니까?' : '비밀번호가 변경되었습니다.'}
        </Typography>
      )}
    </SingleActionDialog>
  );
}
