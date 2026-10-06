import { useState } from 'react';
import {
  IdentityVerificationContent,
  type VerificationMethod,
} from './IdentityVerificationContent';

export function IdentityVerificationPage() {
  const [notice, setNotice] = useState('');

  const selectMethod = (method: VerificationMethod) => {
    setNotice(`${method === 'phone' ? '휴대폰' : '아이핀'} 인증 서비스 연결을 준비 중입니다.`);
  };

  return <IdentityVerificationContent onSelect={selectMethod} notice={notice} />;
}
