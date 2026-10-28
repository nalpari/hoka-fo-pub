'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useRoutePreview } from '@/context/RoutePreview';
import { usePhoneVerification } from '@/hooks/usePhoneVerification';

import { css } from 'styled-system/css';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { ModalDialog } from '@/components/common/molecules/ModalDialog';

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

function AlreadyRegisteredModal({ onOpenChange, onConfirm }: AlreadyRegisteredModalProps) {
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
function RouteContent() {
  const router = useRouter();
  const [alreadyRegisteredOpen, setAlreadyRegisteredOpen] = useState(false);
  const verification = usePhoneVerification(() => setAlreadyRegisteredOpen(true));

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

const routePreviewComponents = { AlreadyRegisteredModal } satisfies Pick<
  typeof import('@/types/component-contracts/app-signup-verify-phone-page'),
  'AlreadyRegisteredModal'
>;

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
