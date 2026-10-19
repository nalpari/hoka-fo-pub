import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

type PasswordResetCompleteModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function PasswordResetCompleteModal({
  onOpenChange,
  onConfirm,
}: PasswordResetCompleteModalProps) {
  return (
    <ModalDialog
      footer={
        <Button type="button" variant="primary" fullWidth onClick={onConfirm}>
          확인
        </Button>
      }
      open
      onOpenChange={onOpenChange}
      title="비밀번호 재설정"
      closeLabel="비밀번호 변경 완료 안내 닫기"
      size="md"
    >
      <Stack gap="4">
        <Typography as="h2" variant="body2">
          비밀번호 변경완료
        </Typography>
        <Typography as="p" variant="body4">
          비밀번호 변경이 완료되었습니다.
        </Typography>
      </Stack>
    </ModalDialog>
  );
}
