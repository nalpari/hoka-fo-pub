import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IdentityVerificationContent,
  type VerificationMethod,
} from './IdentityVerificationContent';

export function IdentityVerificationPage() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');

  const selectMethod = (method: VerificationMethod) => {
    if (method === 'phone') {
      navigate('/signup/verify/phone');
      return;
    }
    setNotice('아이핀 인증 서비스 연결을 준비 중입니다.');
  };

  return <IdentityVerificationContent onSelect={selectMethod} notice={notice} />;
}
