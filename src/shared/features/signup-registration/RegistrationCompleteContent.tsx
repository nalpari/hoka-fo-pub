import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

const styles = {
  page: css({ pt: '24', px: '4', pb: '124px' }),
  content: css({ maxW: '420px', mx: 'auto', textAlign: 'center', gap: '8' }),
  title: css({ m: '0' }),
  icon: css({ mx: 'auto' }),
  message: css({ '& p': { m: '0' } }),
  button: css({ w: '100%' }),
};

export function RegistrationCompleteContent() {
  return (
    <Box as="main" className={styles.page}>
      <Stack className={styles.content}>
        <Typography as="h1" variant="heading6" mobileVariant="heading4" className={styles.title}>
          회원가입 완료
        </Typography>
        <Icon src="/images/icon/join-check.svg" size="48px" className={styles.icon} />
        <Stack gap="4" className={styles.message}>
          <Typography as="p" variant="body2">
            가입이 성공적으로 이루어졌습니다!
          </Typography>
          <Typography as="p" variant="body4">
            고객님께 알찬 정보, 다양한 이벤트와 혜택을 드리고자
            <br />
            최선을 다하겠습니다
          </Typography>
        </Stack>
        <ButtonLink to="/" variant="primary" height="tall" fullWidth className={styles.button}>
          쇼핑하러 가기
        </ButtonLink>
      </Stack>
    </Box>
  );
}
