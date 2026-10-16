import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { HStack } from 'styled-system/jsx';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function MyPageAddressDeleteDialog({ open, onOpenChange, onConfirm }: Props) {
  return (
    <ModalDialog
      footer={
        <HStack w="100%" gap="2">
          <Button fullWidth size="short" variant="secondary" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button fullWidth size="short" variant="primary" onClick={onConfirm}>
            확인
          </Button>
        </HStack>
      }
      closeLabel="배송지 삭제 확인창 닫기"
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="배송지 관리"
    >
      <Typography as="p" variant="body3">
        배송지를 삭제 하시겠습니까?
      </Typography>
    </ModalDialog>
  );
}
