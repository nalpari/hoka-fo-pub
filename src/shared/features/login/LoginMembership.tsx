import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  benefitTitle: css({ m: '0' }),
  benefitDescription: css({ m: '0' }),
};

export function LoginMembership() {
  return (
    <Stack
      as="section"
      mt="6"
      pt="6"
      borderTop="1px solid token(colors.black.20)"
      gap="6"
      _mobile={{ mt: '8', pt: '8' }}
      aria-labelledby="membership-title"
    >
      <Stack gap="2">
        <Typography
          as="h2"
          variant="body3"
          id="membership-title"
          className={styles.benefitTitle}
          weight="medium"
        >
          가입과 동시에 시작되는 혜택!
        </Typography>
        <Typography as="p" variant="body4" className={styles.benefitDescription}>
          신규가입 쿠폰과 기념일 축하쿠폰, 등급별 혜택을 받으세요.
        </Typography>
      </Stack>
      <ButtonLink href="/signup" fullWidth variant="secondary">
        회원가입
      </ButtonLink>
    </Stack>
  );
}
