import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const styles = {
  dialog: css({ w: '568px!', _mobile: { w: 'calc(100vw - 32px)!' } }),
  body: css({ p: '24px', _mobile: { p: '24px 16px' } }),
  heading: css({ m: '0' }),
  description: css({ m: '0' }),
  button: css({
    w: '160px',
    mx: 'auto',
    '--button-height': '40px!',
    '--button-radius': '999px',
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
      open
      onOpenChange={onOpenChange}
      title="비밀번호 재설정"
      closeLabel="비밀번호 변경 완료 안내 닫기"
      popupClassName={styles.dialog}
      size="sm"
    >
      <Stack gap="4" className={styles.body}>
        <Typography as="h2" variant="bodyKr2" className={styles.heading}>
          비밀번호 변경완료
        </Typography>
        <Typography as="p" variant="bodyKr4" className={styles.description}>
          비밀번호 변경이 완료되었습니다.
        </Typography>
        <Button
          type="button"
          variant="primary"
          fullWidth
          className={styles.button}
          onClick={onConfirm}
        >
          확인
        </Button>
      </Stack>
    </ModalDialog>
  );
}
