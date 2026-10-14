'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginContent, type LoginNotice } from './LoginContent';

export function LoginPage({ onLogin }: { onLogin?: () => void }) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [notice, setNotice] = useState<LoginNotice | null>(null);

  const showUnavailable = (feature: string) => {
    setNotice({
      tone: 'error',
      message: `${feature} 기능은 데모 환경에서 아직 연결되지 않았습니다.`,
    });
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id.trim() || !password) {
      setNotice({ tone: 'error', message: '아이디와 비밀번호를 모두 입력해 주세요.' });
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
      onIdChange={setId}
      onPasswordChange={setPassword}
      onRememberChange={setRememberId}
      onSubmit={handleLogin}
      onFindAccount={() => router.push('/login/find-account')}
      onUnavailable={showUnavailable}
    />
  );
}
