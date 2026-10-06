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
      bg: 'rgb(0 0 0 / 56%)',
      backdropFilter: 'blur(8px)',
    },
  }),
  dialog: css({
    w: 'min(375px, calc(100vw - 32px))!',
    borderRadius: '0',
    boxShadow: 'none',
    position: 'relative',
    zIndex: '1',
  }),
  body: css({ p: '4' }),
  title: css({ m: '0', mb: '3' }),
  description: css({ m: '0', mb: '4', whiteSpace: 'pre-line' }),
  button: css({
    '--button-radius': '999px',
    '--button-height': '40px!',
    '--button-border-width': '0px!',
  }),
};

export function AccountLockedPage() {
  const navigate = useNavigate();

  const continueToVerification = () => navigate('/signup/verify/phone');

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
          <Typography as="h1" variant="authBody" className={styles.title}>
            계정 잠금상태입니다
          </Typography>
          <Typography as="p" variant="authSmall" className={styles.description}>
            {'서비스 이용을 위해 계정잠금을 해제해주세요.\n휴대폰 인증화면으로 이동합니다.'}
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
