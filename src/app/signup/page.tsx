'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { SignupMethodStep } from '@/components/common/organisms/Signup/SignupMethodStep';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';
import { SignupLayout } from '@/components/features/signup/SignupLayout';

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupMethodOption = {
  id: SignupMethod;
  label: string;
  description: string;
};

const signupMethods: SignupMethodOption[] = [
  { id: 'local', label: '이메일로 가입', description: '아이디와 비밀번호로 HOKA 계정을 만듭니다.' },
  { id: 'kakao', label: '카카오로 가입', description: '현재 연결되지 않았습니다.' },
  { id: 'naver', label: '네이버로 가입', description: '현재 연결되지 않았습니다.' },
];

/** 회원가입 방법과 가입 흐름의 진입점을 표시합니다. (Displays signup methods and entry points to registration.) */
export default function Page() {
  const router = useRouter();
  const [unavailableMethod, setUnavailableMethod] = useState<SignupMethod | null>(null);
  const selectedMethod = signupMethods.find((item) => item.id === unavailableMethod);

  const startSignup = (method: SignupMethod) => {
    if (method === 'local') {
      router.push('/signup/verify');
      return;
    }

    setUnavailableMethod(method);
  };

  return (
    <>
      <SignupLayout step={0} method="local">
        <SignupMethodStep methods={signupMethods} onSelect={startSignup} />
      </SignupLayout>
      <SingleActionDialog
        open={selectedMethod !== undefined}
        onOpenChange={(open) => {
          if (!open) setUnavailableMethod(null);
        }}
        onConfirm={() => setUnavailableMethod(null)}
        title="회원가입 안내"
        closeLabel="회원가입 안내 닫기"
        size="sm"
      >
        <Typography as="p" variant="body3">
          {selectedMethod?.label.replace('로 가입', '')} 회원가입 기능은 현재 연결되지 않았습니다.
        </Typography>
      </SingleActionDialog>
    </>
  );
}
