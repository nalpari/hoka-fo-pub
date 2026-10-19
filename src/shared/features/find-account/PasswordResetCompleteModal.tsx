import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const styles = {
  dialog: css({ maxW: '568px!' }),
  heading: css({ m: '0' }),
  description: css({ m: '0' }),
  button: css({
    w: '160px',
    mx: 'auto',
    '--button-label-size': '14px',
    '--button-label-weight': '600',
  }),
};

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
        <Button
          type="button"
          variant="primary"
          fullWidth
          className={styles.button}
          onClick={onConfirm}
        >
          확인
        </Button>
      }
      open
      onOpenChange={onOpenChange}
      title="비밀번호 재설정"
      closeLabel="비밀번호 변경 완료 안내 닫기"
      popupClassName={styles.dialog}
      size="sm"
    >
      <Stack gap="4">
        <Typography as="h2" variant="body2" className={styles.heading}>
          비밀번호 변경완료
        </Typography>
        <Typography as="p" variant="body4" className={styles.description}>
          비밀번호 변경이 완료되었습니다.
        </Typography>
      </Stack>
    </ModalDialog>
  );
}
