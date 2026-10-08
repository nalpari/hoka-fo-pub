import { useNavigate } from 'react-router-dom';
import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const styles = {
  page: css({
    position: 'fixed',
    inset: '0',
    zIndex: '90',
    display: 'grid',
    placeItems: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '0',
      zIndex: '0',
      bg: 'color-mix(in srgb, var(--color-black-100) 56%, transparent)',
      backdropFilter: 'blur(8px)',
    },
  }),
  dialog: css({
    w: '568px!',
    borderRadius: '0',
    boxShadow: 'none',
    position: 'relative',
    zIndex: '1',
    _mobile: { w: 'min(375px, calc(100vw - 32px))!' },
  }),
  body: css({ gap: '4', p: '24px 16px' }),
  title: css({}),
  description: css({}),
  descriptionSecondLine: css({ display: 'inline', _mobile: { display: 'block' } }),
  button: css({
    w: '160px!',
    mx: 'auto',
    _mobile: {
      w: '100%!',
      '--button-radius': '999px',
      '--button-height': '40px!',
      '--button-border-width': '0px! ',
      '--button-label-size': '14px',
      '--button-label-weight': '600',
    },
  }),
};

export function AccountLockedPage() {
  const navigate = useNavigate();

  const continueToVerification = () => navigate('/login/account-locked/verification');

  return (
    <Box className={styles.page}>
      <ModalDialog
        open
        onOpenChange={() => {}}
        title="아이디 / 비밀번호 찾기"
        closeLabel="안내 닫기"
        popupClassName={styles.dialog}
      >
        <Stack className={styles.body}>
          <Typography as="h4" className={styles.title}>
            계정 잠금상태입니다
          </Typography>
          <Typography as="p" className={styles.description}>
            서비스 이용을 위해 계정잠금을 해제해주세요.&nbsp;
            <span className={styles.descriptionSecondLine}>휴대폰 인증화면으로 이동합니다.</span>
          </Typography>
          <Button
            variant="primary"
            fullWidth
            className={styles.button}
            onClick={continueToVerification}
          >
            확인
          </Button>
        </Stack>
      </ModalDialog>
    </Box>
  );
}
