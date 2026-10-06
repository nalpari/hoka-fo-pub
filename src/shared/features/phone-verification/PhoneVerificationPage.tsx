import { useEffect, useState, type FormEvent } from 'react';
import { PhoneVerificationContent, type PhoneInformation } from './PhoneVerificationContent';

export function PhoneVerificationPage() {
  const [information, setInformation] = useState<PhoneInformation>({
    name: '',
    birthDate: '',
    nationality: '내국인',
    gender: '남자',
    carrier: 'SKT',
    phone: '',
  });
  const [agreements, setAgreements] = useState([false, false, false, false]);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [code, setCode] = useState('');
  const [notice, setNotice] = useState('');
  const [detail, setDetail] = useState<string | null>(null);

  useEffect(() => {
    if (deadline === null) return;
    const tick = () => setSecondsLeft(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [deadline]);

  const changeInformation = (key: keyof PhoneInformation, value: string) => {
    setInformation((previous) => ({ ...previous, [key]: value }));
    setDeadline(null);
    setSecondsLeft(0);
    setCode('');
    setNotice('');
  };

  const requestCode = () => {
    if (!agreements.every(Boolean)) {
      setNotice('필수 인증약관에 모두 동의해 주세요.');
      return;
    }
    const date = information.birthDate;
    const birth = new Date(
      Number(date.slice(0, 4)),
      Number(date.slice(4, 6)) - 1,
      Number(date.slice(6)),
    );
    if (
      !information.name.trim() ||
      !/^\d{8}$/.test(date) ||
      birth.getFullYear() !== Number(date.slice(0, 4)) ||
      birth.getMonth() + 1 !== Number(date.slice(4, 6)) ||
      birth.getDate() !== Number(date.slice(6)) ||
      birth > new Date() ||
      !/^01[016789]\d{7,8}$/.test(information.phone.replace(/[-\s]/g, ''))
    ) {
      setNotice('이름, 생년월일 8자리와 올바른 휴대폰 번호를 입력해 주세요.');
      return;
    }
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
      setNotice('필수 인증약관에 모두 동의해 주세요.');
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
    setNotice(
      '인증번호 입력을 확인했습니다. 실제 본인인증 완료 처리는 인증 서비스 연결 후 가능합니다.',
    );
  };

  return (
    <PhoneVerificationContent
      information={information}
      agreements={agreements}
      requested={deadline !== null}
      code={code}
      secondsLeft={secondsLeft}
      resendWait={secondsLeft}
      notice={notice}
      detail={detail}
      onInformationChange={changeInformation}
      onAgreementChange={(index, checked) =>
        setAgreements((previous) =>
          previous.map((value, position) => (position === index ? checked : value)),
        )
      }
      onAllAgree={(checked) => setAgreements(agreements.map(() => checked))}
      onCodeChange={setCode}
      onRequest={requestCode}
      onConfirm={confirmCode}
      onDetail={setDetail}
    />
  );
}
