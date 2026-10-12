import { css } from 'styled-system/css';
import { Flex, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const styles = {
  dialog: css({
    w: '568px!',
    _mobile: { w: '100vw!' },
  }),
  desktopTitle: css({ display: 'inline', _mobile: { display: 'none' } }),
  mobileTitle: css({ display: 'none', _mobile: { display: 'inline' } }),
  intro: css({ m: '0' }),
  email: css({ m: '20px 0 0' }),
  description: css({ m: '24px 0', color: 'var(--color-text-tertiary)' }),
  actions: css({ justifyContent: 'center', gap: '2', _mobile: { flexDirection: 'column' } }),
  action: css({
    w: '160px',
    mx: 'auto',
    _mobile: { w: '100%!' },
  }),
};

type IdConfirmationModalProps = {
  onOpenChange: (open: boolean) => void;
  onPasswordReset: () => void;
  onConfirm: () => void;
};

export function IdConfirmationModal({
  onOpenChange,
  onPasswordReset,
  onConfirm,
}: IdConfirmationModalProps) {
  return (
    <ModalDialog
      open
      onOpenChange={onOpenChange}
      title={
        <>
          <Typography as="span" variant="bodyKr4" className={styles.desktopTitle}>
            아이디 / 비밀번호 찾기
          </Typography>
          <Typography as="span" variant="bodyKr4" className={styles.mobileTitle}>
            HOKA Korea 회원 안내
          </Typography>
        </>
      }
      closeLabel="안내 닫기"
      popupClassName={styles.dialog}
      mobilePresentation="fullscreen"
    >
      <Stack>
        <Typography as="p" variant="body3" className={styles.intro}>
          김호가님 가입하신 아이디입니다
        </Typography>
        <Typography as="p" variant="headingKr6" className={styles.email}>
          honggildong@kakao.com
        </Typography>
        <Typography as="p" variant="body4" className={styles.description}>
          비밀번호가 생각나지 않으시는 경우 임시비밀번호를 통해 재설정하실 수 있습니다.
        </Typography>
        <Flex className={styles.actions}>
          <Button variant="secondary" fullWidth className={styles.action} onClick={onPasswordReset}>
            비밀번호 재설정
          </Button>
          <Button variant="primary" fullWidth className={styles.action} onClick={onConfirm}>
            확인
          </Button>
        </Flex>
      </Stack>
    </ModalDialog>
  );
}
