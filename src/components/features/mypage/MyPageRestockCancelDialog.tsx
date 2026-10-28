import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ConfirmDialog } from '@/components/common/molecules/ConfirmDialog/ConfirmDialog';

type Props = { open: boolean; onClose: () => void; onConfirm: () => void };

export function MyPageRestockCancelDialog({ open, onClose, onConfirm }: Props) {
  return (
    <ConfirmDialog
      closeLabel="재입고 알림 취소창 닫기"
      onConfirm={onConfirm}
      fullWidthActions={false}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      open={open}
      size="sm"
      title="재입고 알림 취소"
    >
      <Typography as="p" variant="body3">
        재입고 알림 신청을 취소하시겠습니까?
      </Typography>
    </ConfirmDialog>
  );
}
