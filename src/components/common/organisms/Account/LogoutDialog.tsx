import { ConfirmDialog } from '@/components/common/molecules/ConfirmDialog/ConfirmDialog';
import { Typography } from '@/components/common/atoms/Typography/Typography';

export type LogoutDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function LogoutDialog({ open, onOpenChange, onConfirm }: LogoutDialogProps) {
  return (
    <ConfirmDialog
      onConfirm={onConfirm}
      closeLabel="로그아웃 확인창 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title="로그아웃"
    >
      <Typography as="p" variant="body3">
        로그아웃 하시겠습니까??
      </Typography>
    </ConfirmDialog>
  );
}
