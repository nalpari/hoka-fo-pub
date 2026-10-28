'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getPhoneDigits, isValidPhone } from '@/components/features/find-account/phoneNumber';
import { isValidName } from '@/lib/validation';
import { useVerificationCountdown } from '@/lib/useVerificationCountdown';
import {
  FindAccountContent,
  type FindAccountNotice,
} from '@/components/features/find-account/FindAccountContent';
import { IdConfirmationModal } from '@/components/features/find-account/IdConfirmationModal';

const demoVerificationCode = '900668';

/** 계정 찾기 입력과 인증 예시 흐름을 관리합니다. (Manages account recovery inputs and the example verification flow.) */
export default function Page() {
  const router = useRouter();
  const [resultOpen, setResultOpen] = useState(false);
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const { deadline, secondsLeft, start, reset } = useVerificationCountdown();
  const [notice, setNotice] = useState<FindAccountNotice | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextNameError = isValidName(name) ? '' : '이름을 올바르게 입력해주세요';
    const nextPhoneError = isValidPhone(phone) ? '' : '휴대폰 번호를 올바르게 입력해주세요';

    setNameTouched(true);
    setNameError(nextNameError);
    setPhoneError(nextPhoneError);
    setNotice(null);
    setCodeError('');

    if (nextNameError || nextPhoneError) {
      return;
    }

    setCode('');
    start();
    setNotice({
      tone: 'info',
      message: `데모 인증번호는 ${demoVerificationCode}입니다. 실제 문자는 발송되지 않으며 예시 아이디가 표시됩니다.`,
    });
  };

  return (
    <FindAccountContent
      name={name}
      phone={phone}
      code={code}
      requested={deadline !== null}
      secondsLeft={secondsLeft}
      nameError={nameTouched ? nameError : ''}
      phoneError={phoneError}
      codeError={codeError}
      notice={notice}
      result={
        resultOpen ? (
          <IdConfirmationModal
            userName={name}
            onOpenChange={setResultOpen}
            onConfirm={() => router.push('/login')}
            onPasswordReset={() => router.push('/login/find-account/password-reset')}
          />
        ) : null
      }
      onNameChange={(value) => {
        setName(value);
        setNameTouched(true);
        setNameError(!value.trim() || isValidName(value) ? '' : '이름을 올바르게 입력해주세요');
        reset();
        setCode('');
        setCodeError('');
        setNotice(null);
      }}
      onPhoneChange={(value) => {
        const formattedValue = getPhoneDigits(value);
        setPhone(formattedValue);
        setPhoneError(
          !formattedValue || isValidPhone(formattedValue)
            ? ''
            : '휴대폰 번호를 올바르게 입력해주세요',
        );
        reset();
        setCode('');
        setCodeError('');
        setNotice(null);
      }}
      onCodeChange={(value) => {
        setCode(value.replace(/\D/g, '').slice(0, 6));
        setCodeError('');
        setNotice(null);
      }}
      onConfirmCode={() => {
        if (deadline === null) return;
        if (secondsLeft === 0) {
          setCodeError('');
          setNotice({
            tone: 'error',
            message: '인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.',
          });
          return;
        }
        if (!/^\d{6}$/.test(code)) {
          setCodeError('인증번호 6자리를 입력해 주세요.');
          setNotice(null);
          return;
        }
        if (code !== demoVerificationCode) {
          setCodeError('인증번호가 일치하지 않습니다.');
          setNotice(null);
          return;
        }
        setCodeError('');
        setNotice(null);
        setResultOpen(true);
      }}
      onSubmit={handleSubmit}
    />
  );
}
