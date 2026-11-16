'use client';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';
type AlreadyRegisteredModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};
/** 고정 상태와 기본 화면이 공유하는 표시 UI입니다. (Shares presentation between fixed states and the default screen.) */
export function AlreadyRegisteredModal({ onOpenChange, onConfirm }: AlreadyRegisteredModalProps) {
  return (
    <ModalDialog
      variant="alert"
      open
      onOpenChange={onOpenChange}
      title="회원가입"
      closeLabel="이미 가입한 회원 안내 닫기"

      actions={{ kind: 'single', onConfirm: onConfirm }}
      message="이미 가입된 회원이 있습니다"
      description="입력하신 정보로 이미 가입한 회원이 있습니다. 가입정보가 기억나지 않으시면 ID/비밀번호 찾기 메뉴를 사용하거나 고객센터로 문의해주세요."
    />
  );
}
