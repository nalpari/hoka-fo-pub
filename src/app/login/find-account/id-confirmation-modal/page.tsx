'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 회원·인증 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import { useRouter } from 'next/navigation';

import { usePlatform } from '@/context/platform';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { IdConfirmationMessage } from '@/components/find-account/IdConfirmationMessage';
/** 독립 아이디 확인 팝업과 로그인·비밀번호 재설정 이동을 구성합니다. (Composes the standalone account lookup dialog and its navigation.) */
export default function Page() {
  const router = useRouter();
  const platform = usePlatform();
  return (
    <ModalDialog
      open
      size="sm"
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
