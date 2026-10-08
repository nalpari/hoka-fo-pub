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
  body: css({ p: '24px', _mobile: { p: '24px 16px' } }),
  intro: css({ m: '0' }),
  email: css({
    m: '20px 0 0',
    fontSize: '28px',
    fontWeight: '900',
    lineHeight: '1.2',
    _mobile: { fontSize: '22px' },
  }),
  description: css({ m: '24px 0', color: '#777' }),
  actions: css({ justifyContent: 'center', gap: '2', _mobile: { flexDirection: 'column' } }),
  action: css({
    w: '160px',
    mx: 'auto',
    '--button-height': '40px!',
    '--button-radius': '999px',
    '--button-label-size': '14px',
    '--button-label-weight': '600',
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
          <span className={styles.desktopTitle}>아이디 / 비밀번호 찾기</span>
          <span className={styles.mobileTitle}>HOKA Korea 회원 안내</span>
        </>
      }
      closeLabel="안내 닫기"
      popupClassName={styles.dialog}
      mobilePresentation="fullscreen"
    >
      <Stack className={styles.body}>
        <Typography as="p" variant="bodyKr3" className={styles.intro}>
          김호가님 가입하신 아이디입니다
        </Typography>
        <Typography as="p" variant="headingKr7" className={styles.email}>
          honggildong@kakao.com
        </Typography>
        <Typography as="p" variant="bodyKr4" className={styles.description}>
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
