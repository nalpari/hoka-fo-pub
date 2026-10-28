'use client';

import { type ComponentProps, type FormEvent, useState } from 'react';
import { useVerificationCountdown } from '@/lib/useVerificationCountdown';

import {
  type PhoneInformation,
  type PhoneVerificationContent,
  type PhoneVerificationErrors,
} from '@/components/phone-verification/PhoneVerificationContent';
import { isValidName } from '@/lib/validation';

const isValidBirthDate = (value: string) => {
  if (!/^\d{8}$/.test(value)) return false;

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6));
  const day = Number(value.slice(6));
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day &&
    date <= new Date()
  );
};

/** 휴대폰 인증의 입력 검증과 약관 및 타이머 상태를 관리합니다. (Manages phone verification validation, agreements, and timer state.) */
export function usePhoneVerification(onVerified: () => void) {
  const [information, setInformation] = useState<PhoneInformation>({
    name: '',
    birthDate: '',
    nationality: '내국인',
    gender: '남자',
    carrier: 'SKT',
    phone: '',
  });
  const [agreements, setAgreements] = useState([false, false, false, false]);
  const [showAgreementErrors, setShowAgreementErrors] = useState(false);
  const { deadline, secondsLeft, start, reset } = useVerificationCountdown();
  const [code, setCode] = useState('');
  const [notice, setNotice] = useState('');
  const [noticeTone, setNoticeTone] = useState<'error' | 'info'>('info');
  const [codeError, setCodeError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<PhoneVerificationErrors>({});
  const [detail, setDetail] = useState<string | null>(null);

  const changeInformation = (key: keyof PhoneInformation, value: string) => {
    setInformation((previous) => ({ ...previous, [key]: value }));
    setFieldErrors((previous) => {
      const next = { ...previous, [key]: undefined };

      if (key === 'name' && value && !isValidName(value)) {
        next.name = '올바른 이름을 입력해주세요';
      }
      if (key === 'birthDate' && value && !isValidBirthDate(value)) {
        next.birthDate = '생년월일을 입력해주세요';
      }

      return next;
    });
    reset();
    setCode('');
    setCodeError('');
    setNotice('');
  };

  const requestCode = () => {
    const missingAgreements = !agreements.every(Boolean);
    const nextErrors: PhoneVerificationErrors = {};

    if (!isValidName(information.name)) nextErrors.name = '올바른 이름을 입력해주세요';
    if (!isValidBirthDate(information.birthDate)) nextErrors.birthDate = '생년월일을 입력해주세요';
    if (!information.gender) nextErrors.gender = '성별을 입력해주세요';
    if (!information.carrier) nextErrors.carrier = '통신사를 선택해주세요';
    if (!/^01[016789]\d{7,8}$/.test(information.phone.replace(/[-\s]/g, '')))
      nextErrors.phone = '올바른 휴대폰 번호를 입력해주세요';

    setFieldErrors(nextErrors);
    setShowAgreementErrors(missingAgreements);
    setCodeError('');
    setNoticeTone('info');
    setNotice('');
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    if (missingAgreements) return;

    start();
    setCode('');
    setNotice(
      '화면 미리보기입니다. 실제 문자는 발송되지 않으며 인증번호 검증은 서비스 연결 후 가능합니다.',
    );
  };

  const confirmCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deadline === null) {
      requestCode();
      return;
    }
    if (!agreements.every(Boolean)) {
      setShowAgreementErrors(true);
      return;
    }
    if (Date.now() >= deadline) {
      setCodeError('');
      setNoticeTone('error');
      setNotice('인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.');
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setNotice('');
      setCodeError('인증번호 6자리를 입력해 주세요.');
      return;
    }
    onVerified();
  };

  return {
    information,
    agreements,
    showAgreementErrors,
    requested: deadline !== null,
    code,
    secondsLeft,
    resendWait: secondsLeft,
    notice,
    noticeTone,
    codeError,
    fieldErrors,
    detail,
    onInformationChange: changeInformation,
    onAgreementChange: (index, checked) => {
      const next = agreements.map((value, position) => (position === index ? checked : value));
      setAgreements(next);
      if (next.every(Boolean)) setShowAgreementErrors(false);
    },
    onAllAgree: (checked) => {
      setAgreements(agreements.map(() => checked));
      if (checked) setShowAgreementErrors(false);
    },
    onCodeChange: (value) => {
      setCode(value.replace(/\D/g, '').slice(0, 6));
      setCodeError('');
      setNotice('');
    },
    onRequest: requestCode,
    onConfirm: confirmCode,
    onDetail: setDetail,
  } satisfies Omit<ComponentProps<typeof PhoneVerificationContent>, 'title' | 'description'>;
}
