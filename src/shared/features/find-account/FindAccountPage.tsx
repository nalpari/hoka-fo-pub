import { useState, type FormEvent } from 'react';
import { FindAccountContent, type FindAccountNotice } from './FindAccountContent';

export function FindAccountPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notice, setNotice] = useState<FindAccountNotice | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !/^01[016789]\d{7,8}$/.test(phone.replace(/[\s-]/g, ''))) {
      setNotice({ tone: 'error', message: '이름과 올바른 휴대폰 번호를 입력해 주세요.' });
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
      notice={notice}
      onNameChange={(value) => {
        setName(value);
        setNotice(null);
      }}
      onPhoneChange={(value) => {
        setPhone(value);
        setNotice(null);
      }}
      onSubmit={handleSubmit}
    />
  );
}
