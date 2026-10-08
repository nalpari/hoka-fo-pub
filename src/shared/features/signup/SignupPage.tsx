'use client';

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { css } from 'styled-system/css';
import { SignupProgress } from '@/shared/components/molecules/Signup/SignupProgress';
import { SignupCompleteStep } from '@/shared/components/organisms/Signup/SignupCompleteStep';
import { SignupDetailsStep } from '@/shared/components/organisms/Signup/SignupDetailsStep';
import { SignupMethodStep } from '@/shared/components/organisms/Signup/SignupMethodStep';
import { SignupTermsStep } from '@/shared/components/organisms/Signup/SignupTermsStep';

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupStep = 0 | 1 | 2 | 3;

type SignupMethodOption = {
  id: SignupMethod;
  label: string;
  description: string;
};

const signupMethods: SignupMethodOption[] = [
  { id: 'local', label: '이메일로 가입', description: '아이디와 비밀번호로 HOKA 계정을 만듭니다.' },
  { id: 'kakao', label: '카카오로 가입', description: '카카오 계정으로 빠르게 가입합니다.' },
  { id: 'naver', label: '네이버로 가입', description: '네이버 계정으로 빠르게 가입합니다.' },
];

const styles = {
  page: css({
    pt: '20',
    px: '5',
    pb: '24',
    _mobile: {
      pt: '10',
      px: '4',
      pb: '8',
      minH: 'calc(100svh - var(--layout-site-header-height))',
    },
  }),
  signup: css({
    w: '100%',
    maxW: '520px',
    minW: 0,
    mx: 'auto',
  }),
  pageTitle: css({
    mt: '2',
    mb: '7',
    fontSize: '32' /* 기존 34px */,
    letterSpacing: 'var(--letter-spacings-korean)',
  }),
  eyebrow: css({
    m: 0,
    color: 'var(--color-black-50)',
    fontSize: '12',
    fontWeight: 'var(--font-weights-bold)',
    letterSpacing: 'var(--letter-spacings-korean)',
  }),
};

export function SignupPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<SignupStep>(searchParams.get('step') === 'details' ? 2 : 0);
  const [method, setMethod] = useState<SignupMethod>('local');
  const [serviceTerms, setServiceTerms] = useState(false);
  const [privacyTerms, setPrivacyTerms] = useState(false);
  const [ageTerms, setAgeTerms] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const selectedMethod = signupMethods.find((item) => item.id === method)!;

  const startSignup = (nextMethod: SignupMethod) => {
    setMethod(nextMethod);
    setMessage('');
    setStep(nextMethod === 'naver' ? 2 : 1);
  };

  const continueFromTerms = () => {
    if (!serviceTerms || !privacyTerms || !ageTerms) {
      setMessage('필수 약관에 모두 동의해 주세요.');
      return;
    }
    setMessage('');
    setStep(2);
  };

  const submitDetails = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const localFieldsMissing = method === 'local' && (!id.trim() || password.length < 8);
    if (!name.trim() || !email.trim() || localFieldsMissing) {
      setMessage('필수 정보를 모두 입력해 주세요. 비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    setMessage('');
    setStep(3);
  };

  const toggleAllTerms = (checked: boolean) => {
    setServiceTerms(checked);
    setPrivacyTerms(checked);
    setAgeTerms(checked);
  };

  return (
    <main className={styles.page}>
      <section className={styles.signup} aria-labelledby="signup-title">
        {step === 0 ? (
          <SignupMethodStep methods={signupMethods} onSelect={startSignup} />
        ) : (
          <>
            <p className={styles.eyebrow}>JOIN HOKA</p>
            <h1 className={styles.pageTitle} id="signup-title">
              회원가입
            </h1>
            <SignupProgress method={method} step={step} />
            {step === 1 ? (
              <SignupTermsStep
                ageTerms={ageTerms}
                message={message}
                method={selectedMethod}
                onAgeTermsChange={setAgeTerms}
                onContinue={continueFromTerms}
                onPrivacyTermsChange={setPrivacyTerms}
                onServiceTermsChange={setServiceTerms}
                onToggleAll={toggleAllTerms}
                privacyTerms={privacyTerms}
                serviceTerms={serviceTerms}
              />
            ) : null}
            {step === 2 ? (
              <SignupDetailsStep
                email={email}
                id={id}
                message={message}
                method={method}
                methodOption={selectedMethod}
                name={name}
                onEmailChange={setEmail}
                onIdChange={setId}
                onNameChange={setName}
                onPasswordChange={setPassword}
                onSubmit={submitDetails}
                password={password}
              />
            ) : null}
            {step === 3 ? <SignupCompleteStep name={name} /> : null}
          </>
        )}
      </section>
    </main>
  );
}
