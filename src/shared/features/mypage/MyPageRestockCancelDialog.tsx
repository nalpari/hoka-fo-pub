import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

type Props = { open: boolean; onClose: () => void; onConfirm: () => void };

export function MyPageRestockCancelDialog({ open, onClose, onConfirm }: Props) {
  return (
    <ModalDialog
      closeLabel="재입고 알림 취소창 닫기"
      footer={
        <>
          <Button fullWidth variant="secondary" size="short" onClick={onClose}>
            취소
          </Button>
          <Button fullWidth variant="primary" size="short" onClick={onConfirm}>
            확인
          </Button>
        </>
      }
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
    </ModalDialog>
  );
}
