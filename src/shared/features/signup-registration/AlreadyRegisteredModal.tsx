import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const styles = {
  dialog: css({  _mobile: { w: 'calc(100vw - 32px)!' } }),
  body: css({ p: '24px 16px', gap: '4' }),
  heading: css({ m: '0' }),
  description: css({ m: '0', lineHeight: '1.4' }),
  button: css({
    '--button-height': '40px!',
    '--button-radius': '999px',
    '--button-border-width': '0px!',
  }),
};

type AlreadyRegisteredModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function AlreadyRegisteredModal({ onOpenChange, onConfirm }: AlreadyRegisteredModalProps) {
  return (
    <ModalDialog
      open
      onOpenChange={onOpenChange}
      title="회원가입"
      closeLabel="이미 가입한 회원 안내 닫기"
      size="md"
      popupClassName={styles.dialog}
    >
      <Stack gap="4" className={styles.body}>
        <Typography as="h2" variant="bodyKr2" className={styles.heading}>
          이미 가입된 회원이 있습니다
        </Typography>
        <Typography as="p" variant="authSmall" className={styles.description}>
          입력하신 정보로 이미 가입한 회원이 있습니다. 가입정보가 기억나지 않으시면 ID/비밀번호 찾기
          메뉴를 사용하거나 고객센터로 문의해주세요.
        </Typography>
        <Button variant="primary" fullWidth className={styles.button} onClick={onConfirm}>
          확인
        </Button>
      </Stack>
    </ModalDialog>
  );
}
