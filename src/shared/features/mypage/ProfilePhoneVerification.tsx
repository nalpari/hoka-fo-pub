'use client';

import { useEffect, useRef, useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { PhoneNumberField } from '@/shared/components/molecules/FormFields/PhoneNumberField';
import { VerificationCodeField } from '@/shared/components/molecules/FormFields/VerificationCodeField';
import { VerificationCountdown } from '@/shared/components/molecules/FormFields/VerificationCountdown';
import { getPhoneDigits, isValidPhone } from '@/shared/features/find-account/phoneNumber';
import { useVerificationCountdown } from '@/shared/lib/useVerificationCountdown';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  phone: string;
  error?: string;
  verified: boolean;
  onPhoneChange: (value: string) => void;
  onVerifiedChange: (verified: boolean) => void;
};

const demoCode = '900668';

/** 공통 필드와 타이머로 회원정보의 휴대폰 인증 데모를 제공합니다. (Provides profile phone verification using shared fields and a countdown.) */
export function ProfilePhoneVerification({
  phone,
  error,
  verified,
  onPhoneChange,
  onVerifiedChange,
}: Props) {
  const [phoneError, setPhoneError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [notice, setNotice] = useState<'mismatch' | 'expired' | null>(null);
  const codeInput = useRef<HTMLInputElement>(null);
  const { deadline, secondsLeft, start, reset } = useVerificationCountdown();
  const requested = deadline !== null;
  const expired = requested && secondsLeft === 0;

  useEffect(() => {
    if (deadline === null) return;
    const timeout = window.setTimeout(
      () => setNotice('expired'),
      Math.max(0, deadline - Date.now()),
    );
    return () => window.clearTimeout(timeout);
  }, [deadline]);

  function dismissNotice() {
    setNotice(null);
    setCode('');
    setCodeError('');
    if (deadline !== null && Date.now() < deadline) {
      window.requestAnimationFrame(() => codeInput.current?.focus());
    }
  }

  function requestCode() {
    if (!isValidPhone(phone)) {
      setPhoneError('휴대폰 번호를 올바르게 입력해주세요.');
      return;
    }
    setPhoneError('');
    setCode('');
    setCodeError('');
    setNotice(null);
    onVerifiedChange(false);
    start();
  }

  function confirmCode() {
    if (deadline === null) return;
    if (Date.now() >= deadline) {
      setNotice('expired');
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setCodeError('인증번호 6자리를 입력해 주세요.');
      return;
    }
    if (code !== demoCode) {
      setNotice('mismatch');
      return;
    }
    setCode('');
    setCodeError('');
    reset();
    onVerifiedChange(true);
  }

  return (
    <Stack gap="6">
      <PhoneNumberField
        id="profile-phone"
        label="휴대폰 번호"
        required
        variant="boxed"
        error={phoneError || error}
        inputProps={{
          name: 'tel',
          type: 'tel',
          inputMode: 'numeric',
          autoComplete: 'tel-national',
          value: phone,
          onChange: (event) => {
            onPhoneChange(getPhoneDigits(event.target.value));
            onVerifiedChange(false);
            setPhoneError('');
            setCode('');
            setCodeError('');
            setNotice(null);
            reset();
          },
        }}
      />
      <Button
        type="button"
        fullWidth
        variant="primary"
        disabled={verified || (requested && !expired)}
        onClick={requestCode}
      >
        {requested ? '인증번호 재요청' : '인증번호 요청'}
      </Button>
      {requested ? (
        <Stack gap="3">
          <VerificationCodeField
            id="profile-verification-code"
            variant="boxed"
            required
            error={expired ? '인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.' : codeError}
            inputProps={{
              ref: codeInput,
              value: code,
              disabled: expired,
              onChange: (event) => {
                setCode(event.target.value.replace(/\D/g, '').slice(0, 6));
                setCodeError('');
              },
            }}
          />
          <VerificationCountdown secondsLeft={secondsLeft} />
          <StatusMessage>
            데모 인증번호는 {demoCode}입니다. 실제 문자는 발송되지 않습니다.
          </StatusMessage>
          <Button
            type="button"
            fullWidth
            variant="primary"
            disabled={expired}
            onClick={confirmCode}
          >
            인증번호 확인
          </Button>
        </Stack>
      ) : null}
      {verified ? (
        <StatusMessage tone="success">휴대폰 인증이 완료되었습니다.</StatusMessage>
      ) : null}
      {notice ? (
        <SingleActionDialog
          open
          size="sm"
          title={notice === 'mismatch' ? '인증번호 불일치' : '인증번호 입력시간 초과'}
          closeLabel="인증번호 안내 닫기"
          onConfirm={dismissNotice}
          onOpenChange={(open) => {
            if (!open) dismissNotice();
          }}
        >
          <Typography as="p" variant="body3">
            {notice === 'mismatch'
              ? '인증번호가 일치하지 않습니다. 다시 입력해주세요.'
              : '인증번호 입력 시간이 초과하였습니다. 인증번호 재전송 후 이용해주세요.'}
          </Typography>
        </SingleActionDialog>
      ) : null}
    </Stack>
  );
}
