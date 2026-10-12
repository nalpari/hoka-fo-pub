import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PhoneVerificationContent,
  type PhoneInformation,
  type PhoneVerificationErrors,
} from './PhoneVerificationContent';
import { AlreadyRegisteredModal } from '@/shared/features/signup-registration/AlreadyRegisteredModal';

const isValidName = (value: string) => /^[가-힣a-zA-Z]+(?:\s[가-힣a-zA-Z]+)*$/.test(value.trim());

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

export function PhoneVerificationPage({ mode = 'signup' }: { mode?: 'signup' | 'account-unlock' }) {
  const navigate = useNavigate();
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
  const [deadline, setDeadline] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [code, setCode] = useState('');
  const [notice, setNotice] = useState('');
  const [fieldErrors, setFieldErrors] = useState<PhoneVerificationErrors>({});
  const [detail, setDetail] = useState<string | null>(null);
  const [alreadyRegisteredOpen, setAlreadyRegisteredOpen] = useState(false);

  useEffect(() => {
    if (deadline === null) return;
    const tick = () => setSecondsLeft(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [deadline]);

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
    setDeadline(null);
    setSecondsLeft(0);
    setCode('');
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
    setNotice('');
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    if (missingAgreements) return;

    setDeadline(Date.now() + 180000);
    setSecondsLeft(180);
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
      setNotice('인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.');
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setNotice('인증번호 6자리를 입력해 주세요.');
      return;
    }
    if (mode === 'account-unlock') {
      navigate('/login/account-locked/complete');
      return;
    }

    setAlreadyRegisteredOpen(true);
  };

  return (
    <>
      <PhoneVerificationContent
        title={mode === 'account-unlock' ? '계정 잠금 해제' : '휴대폰 인증'}
        description={
          mode === 'account-unlock'
            ? '해킹, 계정 탈취 시도 등의 보안 이슈로 계정이 잠겼습니다. 계속 이용하시려면 본인 인증을 통해 계정 잠금을 해제해 주세요.'
            : undefined
        }
        information={information}
        agreements={agreements}
        showAgreementErrors={showAgreementErrors}
        requested={deadline !== null}
        code={code}
        secondsLeft={secondsLeft}
        resendWait={secondsLeft}
        notice={notice}
        fieldErrors={fieldErrors}
        detail={detail}
        onInformationChange={changeInformation}
        onAgreementChange={(index, checked) => {
          const next = agreements.map((value, position) => (position === index ? checked : value));
          setAgreements(next);
          if (next.every(Boolean)) setShowAgreementErrors(false);
        }}
        onAllAgree={(checked) => {
          setAgreements(agreements.map(() => checked));
          if (checked) setShowAgreementErrors(false);
        }}
        onCodeChange={setCode}
        onRequest={requestCode}
        onConfirm={confirmCode}
        onDetail={setDetail}
      />
      {alreadyRegisteredOpen ? (
        <AlreadyRegisteredModal
          onOpenChange={setAlreadyRegisteredOpen}
          onConfirm={() => navigate('/signup')}
        />
      ) : null}
    </>
  );
}
