import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { faCheck } from '@/shared/icons/fontAwesome';

const styles = {
  page: css({
    pt: '12',
    px: '4',
    pb: '8',
    minH: 'calc(100svh - var(--layout-site-header-height))',
  }),
  content: css({ maxW: '500px', mx: 'auto', gap: '4', _mobile: { pt: '2' } }),
  title: css({ m: '0', gap: '2', alignItems: 'center' }),
  check: css({
    display: 'inline-flex',
    w: '4',
    h: '4',
    border: '1px solid currentColor',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': { w: '2.5', h: '2.5' },
  }),
  description: css({ m: '0' }),
};

export function AccountUnlockCompletePage() {
  return (
    <Box as="main" className={styles.page}>
      <Stack className={styles.content}>
        <HStack as="h1" className={styles.title}>
          <Typography variant="heading9">계정 잠금 해제 완료</Typography>
          <span className={styles.check} aria-hidden="true">
            <Icon fontAwesomeIcon={faCheck} />
          </span>
        </HStack>
        <Typography as="p" variant="body5" tone="tertiary" className={styles.description}>
          계정 잠금 상태가 성공적으로 해제되었습니다.
          <br />
          다시 로그인을 진행해 주세요.
        </Typography>
        <ButtonLink to="/login" variant="primary" fullWidth>
          홈으로
        </ButtonLink>
      </Stack>
    </Box>
  );
}
