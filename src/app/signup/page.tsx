'use client';

/**
 * [개발팀 바인딩]
 * local은 본인인증 경로로 이동하고 kakao/naver는 현재 미연동 안내입니다. startSignup의 제공자 선택 이벤트가 OAuth 연결 지점입니다.
 * 소셜 가입을 연결할 때도 가입 여부/인증 proof/동의·추가정보 정책은 서버 결과를 사용하고 임의로 가입 완료 경로로 이동시키지 않습니다.
 */

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { Typography } from '@/components/common/atoms/Typography';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  SignupLayout,
  type SignupMethod,
  signupMethods,
  SignupMethodStep,
} from './_components/SignupContent';

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
      <ModalDialog
        open={selectedMethod !== undefined}
        onOpenChange={(open) => {
          if (!open) setUnavailableMethod(null);
        }}
        title="회원가입 안내"
        closeLabel="회원가입 안내 닫기"
        size="sm"
        actions={{ kind: 'single', onConfirm: () => setUnavailableMethod(null) }}
      >
        <Typography as="p" variant="body3">
          {selectedMethod?.label.replace('로 가입', '')} 회원가입 기능은 현재 연결되지 않았습니다.
        </Typography>
      </ModalDialog>
    </>
  );
}
