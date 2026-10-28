import { ModalDialog } from '@/components/common/molecules/ModalDialog/ModalDialog';
import { Typography } from '@/components/common/atoms/Typography/Typography';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MyPageWithdrawalCompleteDialog({ open, onOpenChange }: Props) {
  return (
    <ModalDialog
      closeLabel="회원탈퇴 안내 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title="회원탈퇴"
    >
      <Typography as="p" variant="body3">
        회원탈퇴 요청을 확인했습니다.
      </Typography>
    </ModalDialog>
  );
}
