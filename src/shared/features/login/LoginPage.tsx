'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginContent, type LoginNotice } from './LoginContent';
import { isValidPassword, passwordRequirementsMessage } from '@/shared/lib/passwordValidation';
import { isValidEmail, emailFormatErrorMessage } from '@/shared/lib/emailValidation';

export function LoginPage({ onLogin }: { onLogin?: () => void }) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [notice, setNotice] = useState<LoginNotice | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const validEmail = isValidEmail(id);
  const validPassword = isValidPassword(password);
  const errors = {
    id: hasSubmitted && !validEmail ? emailFormatErrorMessage : undefined,
    password: hasSubmitted && !validPassword ? passwordRequirementsMessage : undefined,
  };

  const showUnavailable = (feature: string) => {
    setNotice({
      tone: 'error',
      message: `${feature} 기능은 데모 환경에서 아직 연결되지 않았습니다.`,
    });
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    setNotice(null);

    if (!validEmail || !validPassword) {
      return;
    }

    onLogin?.();
    setNotice({
      tone: 'success',
      message: `${id}${rememberId ? ' 아이디를 저장하고' : ''} 로그인했습니다. (데모)`,
    });
    router.push('/');
  };

  return (
    <LoginContent
      id={id}
      password={password}
      rememberId={rememberId}
      notice={notice}
      errors={errors}
      onIdChange={(value) => {
        setId(value);
        setNotice(null);
      }}
      onPasswordChange={(value) => {
        setPassword(value);
        setNotice(null);
      }}
      onRememberChange={setRememberId}
      onSubmit={handleLogin}
      onFindAccount={() => router.push('/login/find-account')}
      onUnavailable={showUnavailable}
    />
  );
}
