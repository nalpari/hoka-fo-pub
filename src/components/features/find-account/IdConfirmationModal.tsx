import { IdConfirmationMessage } from './IdConfirmationMessage';
import { ConfirmDialog } from '@/components/common/molecules/ConfirmDialog/ConfirmDialog';
import { usePlatform } from '@/context/platform';

type IdConfirmationModalProps = {
  userName?: string;
  onOpenChange: (open: boolean) => void;
  onPasswordReset: () => void;
  onConfirm: () => void;
};

/** 아이디 확인 안내를 재사용 가능한 반응형 모달로 표시합니다. (Displays account lookup guidance in a reusable responsive modal.) */
export function IdConfirmationModal({
  userName,
  onOpenChange,
  onPasswordReset,
  onConfirm,
}: IdConfirmationModalProps) {
  const platform = usePlatform();

  return (
    <ConfirmDialog
      fullWidthActions={false}
      actionDirection={platform === 'mobile' ? 'vertical' : 'horizontal'}
      cancelLabel="비밀번호 재설정"
      onCancel={onPasswordReset}
      onConfirm={onConfirm}
      open
      size="md"
      onOpenChange={onOpenChange}
      title={platform === 'mobile' ? 'HOKA Korea 회원 안내' : '아이디 / 비밀번호 찾기'}
      closeLabel="안내 닫기"
      mobilePresentation="fullscreen"
    >
      <IdConfirmationMessage userName={userName} />
    </ConfirmDialog>
  );
}
