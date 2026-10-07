import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faCheck } from '@/shared/icons/fontAwesome';

const styles = {
  page: css({ pt: '24', px: '4', pb: '8' }),
  content: css({ maxW: '420px', mx: 'auto', textAlign: 'center', gap: '8' }),
  title: css({ m: '0' }),
  icon: css({
    w: '44px',
    h: '44px',
    border: '1.5px solid',
    borderColor: 'text.primary',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mx: 'auto',
    '& svg': { w: '24px!', h: '24px!' },
  }),
  message: css({ gap: '4', '& p': { m: '0' } }),
  button: css({
    '--button-radius': '999px',
    '--button-height': '48px!',
    '--button-border-width': '0px!',
  }),
};

export function RegistrationCompleteContent() {
  return (
    <Box as="main" className={styles.page}>
      <Stack className={styles.content}>
        <Typography as="h1" variant="authTitle" className={styles.title}>
          회원가입 완료
        </Typography>
        <Box className={styles.icon} aria-hidden="true">
          <Icon fontAwesomeIcon={faCheck} />
        </Box>
        <Stack className={styles.message}>
          <Typography as="p" variant="authBody">
            가입이 성공적으로 이루어졌습니다!
          </Typography>
          <Typography as="p" variant="authSmall">
            고객님께 알찬 정보, 다양한 이벤트와 혜택을 드리고자
            <br />
            최선을 다하겠습니다
          </Typography>
        </Stack>
        <ButtonLink to="/" variant="primary" fullWidth className={styles.button}>
          쇼핑하러 가기
        </ButtonLink>
        <Typography as="p" variant="authCaption" tone="subtle">
          화면 미리보기입니다. 실제 계정은 생성되지 않았습니다.
        </Typography>
      </Stack>
    </Box>
  );
}
