import { useState, type FormEvent } from 'react';
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
  const [notice, setNotice] = useState<FindAccountNotice | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextNameError = isValidName(name) ? '' : '이름을 올바르게 입력해주세요';
    const nextPhoneError = isValidPhone(phone) ? '' : '휴대폰 번호를 올바르게 입력해주세요';

    setNameError(nextNameError);
    setPhoneError(nextPhoneError);
    setNotice(null);

    if (nextNameError || nextPhoneError) {
      return;
    }

    setNotice({
      tone: 'info',
      message: '화면 미리보기입니다. 실제 인증번호는 발송되지 않습니다.',
    });
  };

  return (
    <FindAccountContent
      name={name}
      phone={phone}
      nameError={nameTouched ? nameError : ''}
      phoneError={phoneError}
      notice={notice}
      onNameChange={(value) => {
        setName(value);
        setNameTouched(true);
        setNameError(!value.trim() || isValidName(value) ? '' : '이름을 올바르게 입력해주세요');
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
        setNotice(null);
      }}
      onSubmit={handleSubmit}
    />
  );
}
