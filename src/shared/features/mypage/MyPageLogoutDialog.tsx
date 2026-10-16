import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { HStack } from 'styled-system/jsx';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function MyPageLogoutDialog({ open, onOpenChange, onConfirm }: Props) {
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
      closeLabel="로그아웃 확인창 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title="로그아웃"
    >
      <Typography as="p" web="body3" mo="body3">
        로그아웃 하시겠습니까??
      </Typography>
    </ModalDialog>
  );
}
