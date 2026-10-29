'use client';

/**
 * [개발팀 바인딩]
 * 독립 결과 팝업도 AccountFlowProvider.recovery.maskedAccountId를 표시합니다. Provider가 없을 때만 기존 예시 계정을 표시합니다.
 * 직접 경로 진입은 조회/인증 성공을 의미하지 않습니다. 실제 resetProof가 없으면 비밀번호 변경 경로에서 재인증을 요구합니다.
 */

import { useRouter } from 'next/navigation';

import { useContext } from 'react';
import { AccountServicesContext, useAccountFlow } from '@/context/AccountFlowContext';
import { usePlatform } from '@/context/platform';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { IdConfirmationMessage } from '@/components/find-account/IdConfirmationMessage';

/** 독립 아이디 확인 팝업과 로그인·비밀번호 재설정 이동을 구성합니다. (Composes the standalone account lookup dialog and its navigation.) */
export default function Page() {
  const router = useRouter();
  const services = useContext(AccountServicesContext);
  const flow = useAccountFlow();
  const platform = usePlatform();

  return (
    <ModalDialog
      open
      size="md"
      onOpenChange={(open) => !open && router.push('/login/find-account')}
      title={platform === 'mobile' ? 'HOKA Korea 회원 안내' : '아이디 / 비밀번호 찾기'}
      closeLabel="안내 닫기"
      mobilePresentation="fullscreen"
      actions={{
        kind: 'confirm',
        fullWidth: false,
        direction: platform === 'mobile' ? 'vertical' : 'horizontal',
        cancelLabel: '비밀번호 재설정',
        onCancel: () => router.push('/login/find-account/password-reset'),
        onConfirm: () => router.push('/login'),
      }}
    >
      <IdConfirmationMessage
        accountId={services ? (flow?.recovery?.maskedAccountId ?? '') : undefined}
        userName={services ? (flow?.recovery?.displayName ?? '고객') : undefined}
      />
    </ModalDialog>
  );
}
