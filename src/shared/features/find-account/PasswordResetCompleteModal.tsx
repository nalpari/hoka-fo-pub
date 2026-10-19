import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';

type PasswordResetCompleteModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function PasswordResetCompleteModal({
  onOpenChange,
  onConfirm,
}: PasswordResetCompleteModalProps) {
  return (
    <SingleActionDialog
      onConfirm={onConfirm}
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
    </SingleActionDialog>
  );
}
