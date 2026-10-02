'use client';

import { useState } from 'react';
import { css } from 'styled-system/css';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Flex, VStack } from 'styled-system/jsx';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';

const styles = {
  page: css({ w: '100%', pt: '24' }),
  login: css({
    w: 'min(100% - 40px, 420px)',
    mx: 'auto',
    pb: '76px',
    '& h1': { my: '2.5', fontSize: '32px', letterSpacing: '-1.7px' },
    '& form': { display: 'grid', mt: '42px' },
  }),
  eyebrow: css({ m: 0, color: '#777', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em' }),
  intro: css({ m: 0, color: 'var(--color-text-muted)', fontSize: '14px' }),
  loginButton: css({ mt: '22px', minH: '12', bg: '#111', color: '#fff', fontWeight: 700 }),
  options: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: '4',
    color: '#777',
    fontSize: '12px',
    '& label': { display: 'flex', alignItems: 'center', gap: '7px' },
    '& button': {
      p: 0,
      border: 0,
      bg: 'transparent',
      color: 'inherit',
      textDecoration: 'underline',
    },
  }),
  error: css({ mt: '3.5', fontSize: '13px', color: '#c62828' }),
  success: css({ mt: '3.5', fontSize: '13px', color: '#207341' }),
  divider: css({
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
    my: '34px',
    color: '#888',
    fontSize: '12px',
  }),
  socialLogin: css({
    display: 'grid',
    gap: '2.5',
    '& button': { minH: '12', borderRadius: '3px', fontWeight: 700 },
    '& b': { display: 'inline-block', w: '6', fontSize: '17px' },
  }),
  kakao: css({ bg: '#fee500', color: '#181600' }),
  naver: css({ bg: '#03c75a', color: '#fff' }),
  apple: css({ borderColor: '#d1d1d1 !important', bg: '#fff', color: '#111' }),
  membership: css({
    display: 'grid',
    justifyItems: 'center',
    px: '5',
    pt: '66px',
    pb: '76px',
    bg: '#f5f5f3',
    textAlign: 'center',
    '& h2': { my: '2.5', fontSize: '26px' },
  }),
  signupLink: css({
    display: 'inline-grid',
    minW: '150px',
    minH: '12',
    placeItems: 'center',
    bg: '#111',
    color: '#fff',
    fontWeight: 700,
  }),
  guestOrder: css({
    mt: '25px',
    border: 0,
    bg: 'transparent',
    color: '#777',
    fontSize: '12px',
    textDecoration: 'underline',
  }),
};

type Notice = {
  tone: 'error' | 'success';
  message: string;
};

export function LoginPage({ onLogin }: { onLogin?: () => void }) {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

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
    navigate('/');
  };

  return (
    <main className={styles.page}>
      <section className={styles.login} aria-labelledby="login-title">
        <p className={styles.eyebrow}>HOKA MEMBERS</p>
        <h1 id="login-title">HOKA에 오신 걸 환영합니다.</h1>
        <p className={styles.intro}>로그인 후 더 빠른 쇼핑과 멤버십 혜택을 만나보세요.</p>

        <form onSubmit={handleLogin}>
          <FormField htmlFor="login-id" label="아이디">
            <TextInput
              autoComplete="username"
              id="login-id"
              name="username"
              onChange={(event) => setId(event.target.value)}
              placeholder="아이디를 입력해 주세요"
              value={id}
            />
          </FormField>
          <FormField htmlFor="login-password" label="비밀번호">
            <TextInput
              autoComplete="current-password"
              id="login-password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              type="password"
              value={password}
            />
          </FormField>
          {notice && (
            <StatusMessage
              className={notice.tone === 'error' ? styles.error : styles.success}
              tone={notice.tone}
            >
              {notice.message}
            </StatusMessage>
          )}
          <Button className={styles.loginButton} type="submit" variant="primary">
            로그인
          </Button>
          <Flex className={styles.options}>
            <Checkbox
              label="아이디 저장하기"
              checked={rememberId}
              onCheckedChange={setRememberId}
            />
            <Button
              onClick={() => showUnavailable('아이디/비밀번호 찾기')}
              variant="ghost"
              size="sm"
            >
              아이디 / 비밀번호 찾기
            </Button>
          </Flex>
        </form>

        <Divider className={styles.divider}>
          <span>또는</span>
        </Divider>
        <VStack className={styles.socialLogin} aria-label="소셜 로그인">
          <Button className={styles.kakao} onClick={() => showUnavailable('카카오 로그인')}>
            <b aria-hidden="true">●</b> 카카오로 계속하기
          </Button>
          <Button className={styles.naver} onClick={() => showUnavailable('네이버 로그인')}>
            <b aria-hidden="true">N</b> 네이버로 계속하기
          </Button>
          <Button className={styles.apple} onClick={() => showUnavailable('Apple 로그인')}>
            <b aria-hidden="true">●</b> Apple로 계속하기
          </Button>
        </VStack>
      </section>

      <section className={styles.membership} aria-labelledby="membership-title">
        <p className={styles.eyebrow}>NEW TO HOKA?</p>
        <h2 id="membership-title">가입과 동시에 시작되는 혜택!</h2>
        <p>신규 가입 쿠폰과 멤버십 전용 소식을 받아보세요.</p>
        <Link className={styles.signupLink} to="/signup">
          회원가입
        </Link>
        <Button
          className={styles.guestOrder}
          onClick={() => showUnavailable('비회원 주문조회')}
          variant="ghost"
        >
          비회원 주문조회
        </Button>
      </section>
    </main>
  );
}
