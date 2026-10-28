'use client';

import { useRouter } from 'next/navigation';

import { usePlatform } from '@/context/platform';

import { ModalDialog } from '@/components/common/molecules/ModalDialog';

import { IdConfirmationMessage } from '@/components/find-account/IdConfirmationMessage';

/** 독립 아이디 확인 팝업과 로그인·비밀번호 재설정 이동을 구성합니다. (Composes the standalone account lookup dialog and its navigation.) */
export default function Page() {
  const router = useRouter();
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
      <IdConfirmationMessage />
    </ModalDialog>
  );
}
