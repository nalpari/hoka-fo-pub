import { useEffect, useState, type FormEvent } from 'react';
import { FindAccountContent, type FindAccountNotice } from './FindAccountContent';

const isValidName = (value: string) => /^[가-힣a-zA-Z]+(?:\s[가-힣a-zA-Z]+)*$/.test(value.trim());
const getPhoneDigits = (value: string) => value.replace(/\D/g, '').slice(0, 11);
const formatPhoneNumber = (value: string) => {
  const digits = getPhoneDigits(value);

  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};
const isValidPhone = (value: string) => /^01[016789]\d{7,8}$/.test(getPhoneDigits(value));

export function FindAccountPage() {
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [code, setCode] = useState('');
  const [deadline, setDeadline] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [notice, setNotice] = useState<FindAccountNotice | null>(null);

  useEffect(() => {
    if (deadline === null) return;

    const tick = () => setSecondsLeft(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);

    return () => window.clearInterval(timer);
  }, [deadline]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextNameError = isValidName(name) ? '' : '이름을 올바르게 입력해주세요';
    const nextPhoneError = isValidPhone(phone) ? '' : '휴대폰 번호를 올바르게 입력해주세요';

    setNameTouched(true);
    setNameError(nextNameError);
    setPhoneError(nextPhoneError);
    setNotice(null);

    if (nextNameError || nextPhoneError) {
      return;
    }

    setCode('');
    setDeadline(Date.now() + 180000);
    setSecondsLeft(180);
    setNotice({ tone: 'info', message: '화면 미리보기입니다. 실제 인증번호는 발송되지 않습니다.' });
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
      notice={notice}
      onNameChange={(value) => {
        setName(value);
        setNameTouched(true);
        setNameError(!value.trim() || isValidName(value) ? '' : '이름을 올바르게 입력해주세요');
        setDeadline(null);
        setSecondsLeft(0);
        setCode('');
        setNotice(null);
      }}
      onPhoneChange={(value) => {
        const formattedValue = formatPhoneNumber(value);
        setPhone(formattedValue);
        setPhoneError(
          !formattedValue || isValidPhone(formattedValue)
            ? ''
            : '휴대폰 번호를 올바르게 입력해주세요',
        );
        setDeadline(null);
        setSecondsLeft(0);
        setCode('');
        setNotice(null);
      }}
      onCodeChange={(value) => setCode(value.replace(/\D/g, '').slice(0, 6))}
      onConfirmCode={() => {
        if (deadline === null) return;
        if (secondsLeft === 0) {
          setNotice({
            tone: 'error',
            message: '인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.',
          });
          return;
        }
        if (!/^\d{6}$/.test(code)) {
          setNotice({ tone: 'error', message: '인증번호 6자리를 입력해 주세요.' });
          return;
        }
        setNotice({
          tone: 'info',
          message: '인증번호 입력을 확인했습니다. 실제 검증은 서비스 연결 후 가능합니다.',
        });
      }}
      onSubmit={handleSubmit}
    />
  );
}
