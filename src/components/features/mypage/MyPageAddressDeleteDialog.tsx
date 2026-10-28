import { ConfirmDialog } from '@/components/common/molecules/ConfirmDialog/ConfirmDialog';
import { Typography } from '@/components/common/atoms/Typography/Typography';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function MyPageAddressDeleteDialog({ open, onOpenChange, onConfirm }: Props) {
  return (
    <ConfirmDialog
      onConfirm={onConfirm}
      closeLabel="배송지 삭제 확인창 닫기"
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="배송지 관리"
    >
      <Typography as="p" variant="body3">
        배송지를 삭제 하시겠습니까?
      </Typography>
    </ConfirmDialog>
  );
}
