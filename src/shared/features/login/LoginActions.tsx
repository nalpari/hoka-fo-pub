import { css, cva } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

const styles = {
  actions: css({ gap: '2', mt: '2' }),
  socialIcon: css({ display: 'block', flexShrink: '0' }),
};

const socialButton = cva({
  base: { '--button-icon-size': '18px' },
  variants: {
    provider: {
      kakao: {
        '--button-bg': '#fae100!',
        '--button-color': 'token(colors.black.100)!',
        '--button-bg-hover': '#fae100!',
        '--button-color-hover': 'token(colors.black.100)!',
      },
      naver: {
        '--button-bg': '#03c75a!',
        '--button-color': 'token(colors.white.0)!',
        '--button-bg-hover': '#03c75a!',
        '--button-color-hover': 'token(colors.white.0)!',
      },
    },
  },
});

export function LoginActions({ onUnavailable }: { onUnavailable: (feature: string) => void }) {
  return (
    <Stack className={styles.actions}>
      <Button fullWidth variant="primary" size="tall" type="submit">
        로그인
      </Button>
      <Button
        className={socialButton({ provider: 'kakao' })}
        fullWidth
        variant="primary"
        size="tall"
        icon={<img src="/assets/login/kakao.svg" alt="" className={styles.socialIcon} />}
        onClick={() => onUnavailable('카카오 로그인')}
      >
        카카오 로그인
      </Button>
      <Button
        className={socialButton({ provider: 'naver' })}
        fullWidth
        variant="primary"
        size="tall"
        icon={<img src="/assets/login/naver.svg" alt="" className={styles.socialIcon} />}
        onClick={() => onUnavailable('네이버 로그인')}
      >
        네이버 로그인
      </Button>
    </Stack>
  );
}
