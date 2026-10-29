'use client';

/**
 * [개발팀 바인딩]
 * PhoneVerificationContext.verify에서 받은 서버 proof를 AccountServicesContext.unlock에 전달합니다.
 * 인증 성공만으로 잠금해제를 완료 처리하지 않으며 unlock이 성공한 뒤 완료 경로로 이동합니다.
 */

import { useRouter } from 'next/navigation';

import { useContext } from 'react';
import { AccountServicesContext } from '@/context/AccountFlowContext';
import { usePhoneVerification } from '@/hooks/usePhoneVerification';

import { PhoneVerificationContent } from '@/components/phone-verification/PhoneVerificationContent';

/** 계정 잠금 해제 인증 화면과 인증 후 이동을 구성합니다. (Composes account unlock verification and post-verification navigation.) */
export default function Page() {
  const router = useRouter();
  const services = useContext(AccountServicesContext);
  const verification = usePhoneVerification(async (identity) => {
    if (services) {
      if (!identity) throw new Error('본인인증 결과가 없습니다.');
      await services.unlock(identity);
    }
    router.push('/login/account-locked/complete');
  });

  return (
    <PhoneVerificationContent
      title="계정 잠금 해제"
      description="해킹, 계정탈취 시도 등의 보안이슈로 인하여 계정이잠금 처리되었습니다. 계속 이용 하시려면 본인인증을 통하여 계정잠금을 해제해 주세요."
      {...verification}
    />
  );
}
