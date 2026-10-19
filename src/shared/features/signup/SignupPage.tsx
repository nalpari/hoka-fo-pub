'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignupLayout } from '@/shared/features/signup/SignupLayout';
import { SignupCompleteStep } from '@/shared/components/organisms/Signup/SignupCompleteStep';
import { SignupDetailsStep } from '@/shared/components/organisms/Signup/SignupDetailsStep';
import { SignupMethodStep } from '@/shared/components/organisms/Signup/SignupMethodStep';
import { SignupTermsStep } from '@/shared/components/organisms/Signup/SignupTermsStep';
import { isValidPassword, passwordRequirementsMessage } from '@/shared/lib/passwordValidation';

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

export function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<'name' | 'email' | 'id' | 'password', string>>
  >({});

  const clearFieldError = (field: 'name' | 'email' | 'id' | 'password') => {
    setFieldErrors((previous) => ({ ...previous, [field]: undefined }));
    setMessage('');
  };

  const selectedMethod = signupMethods.find((item) => item.id === method)!;

  const startSignup = (nextMethod: SignupMethod) => {
    if (nextMethod === 'local') {
      router.push('/signup/verify');
      return;
    }

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
    const emailInvalid =
      !email.trim() ||
      Boolean(
        event.currentTarget.querySelector<HTMLInputElement>('#signup-email')?.validity.typeMismatch,
      );
    setFieldErrors({
      name: name.trim() ? '' : '이름을 입력해 주세요.',
      email: emailInvalid ? '올바른 이메일을 입력해 주세요.' : '',
      id: method !== 'local' || id.trim() ? '' : '아이디를 입력해 주세요.',
      password: method !== 'local' || isValidPassword(password) ? '' : passwordRequirementsMessage,
    });
    const localFieldsMissing = method === 'local' && (!id.trim() || !isValidPassword(password));
    if (!name.trim() || emailInvalid || localFieldsMissing) {
      setMessage('필수 정보를 모두 올바르게 입력해 주세요.');
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
    <SignupLayout step={step} method={method}>
      {step === 0 ? (
        <SignupMethodStep methods={signupMethods} onSelect={startSignup} />
      ) : (
        <>
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
              fieldErrors={fieldErrors}
              methodOption={selectedMethod}
              name={name}
              onEmailChange={(value) => {
                setEmail(value);
                clearFieldError('email');
              }}
              onIdChange={(value) => {
                setId(value);
                clearFieldError('id');
              }}
              onNameChange={(value) => {
                setName(value);
                clearFieldError('name');
              }}
              onPasswordChange={(value) => {
                setPassword(value);
                clearFieldError('password');
              }}
              onSubmit={submitDetails}
              password={password}
            />
          ) : null}
          {step === 3 ? <SignupCompleteStep name={name} /> : null}
        </>
      )}
    </SignupLayout>
  );
}
