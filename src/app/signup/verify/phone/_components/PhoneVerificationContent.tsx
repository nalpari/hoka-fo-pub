'use client';

import { useRouter } from 'next/navigation';

import { useContext } from 'react';
import { useState } from 'react';
import { AccountServicesContext, useAccountFlow } from '@/context/AccountFlowContext';
import { usePhoneVerification } from '@/hooks/usePhoneVerification';

import { css } from 'styled-system/css';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { PhoneVerificationContent } from '@/components/phone-verification/PhoneVerificationContent';

const styles = {
  body: css({ gap: '4' }),
  heading: css({ m: '0' }),
  description: css({ m: '0' }),
};

type AlreadyRegisteredModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

/** 고정 상태와 기본 화면이 공유하는 표시 UI입니다. (Shares presentation between fixed states and the default screen.) */
export function AlreadyRegisteredModal({ onOpenChange, onConfirm }: AlreadyRegisteredModalProps) {
  return (
    <ModalDialog
      open
      onOpenChange={onOpenChange}
      title="회원가입"
      closeLabel="이미 가입한 회원 안내 닫기"
      size="md"
      actions={{ kind: 'single', onConfirm: onConfirm }}
    >
      <ContentHeader
        gap="4"
        className={styles.body}
        titleAs="h2"
        title="이미 가입된 회원이 있습니다"
        titleProps={{ variant: 'body2', className: styles.heading }}
        description="입력하신 정보로 이미 가입한 회원이 있습니다. 가입정보가 기억나지 않으시면 ID/비밀번호 찾기 메뉴를 사용하거나 고객센터로 문의해주세요."
        descriptionProps={{ variant: 'body4', className: styles.description }}
      />
    </ModalDialog>
  );
}

/** 가입 휴대폰 인증 화면과 기존 가입 안내를 구성합니다. (Composes signup phone verification and the existing-account notice.) */
export function RouteContent() {
  const router = useRouter();
  const [alreadyRegisteredOpen, setAlreadyRegisteredOpen] = useState(false);
  const services = useContext(AccountServicesContext);
  const flow = useAccountFlow();
  const verification = usePhoneVerification((identity) => {
    // 개발팀 적용: 서비스 검증 결과의 proof·가입 여부를 반환해야 신규 가입과 기존 회원을 구분합니다.
    if (!services) {
      setAlreadyRegisteredOpen(true);
      return;
    }
    if (!identity || !flow) throw new Error('본인인증 결과가 없습니다. 다시 인증해 주세요.');
    flow.setIdentity(identity);
    if (identity.accountStatus === 'existing') setAlreadyRegisteredOpen(true);
    else router.push('/signup/terms');
  });

  return (
    <>
      <PhoneVerificationContent title="휴대폰 인증" {...verification} />
      {alreadyRegisteredOpen ? (
        <AlreadyRegisteredModal
          onOpenChange={setAlreadyRegisteredOpen}
          onConfirm={() => router.push('/signup')}
        />
      ) : null}
    </>
  );
}

export const routePreviewComponents = { AlreadyRegisteredModal } satisfies Pick<
  typeof import('@/types/component-contracts/app-signup-verify-phone-page'),
  'AlreadyRegisteredModal'
>;
