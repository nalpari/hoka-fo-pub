import type { ComponentProps, CSSProperties } from 'react';
import { cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

const loginStyle = cva({
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

type Props = Omit<
  ComponentProps<typeof Button>,
  'icon' | 'variant' | 'style' | 'className' | 'size'
> & {
  provider: 'kakao' | 'naver';
  size?: 'short' | 'tall';
  appearance?: 'login' | 'signup';
};

/** Brand presentation only; callers own authentication and unavailable-service flows. */
export function SocialAuthButton({ provider, appearance = 'login', ...props }: Props) {
  const background = provider === 'kakao' ? '#FAE100' : '#03C75A';
  const signupStyle = {
    '--button-bg': background,
    '--button-color': provider === 'kakao' ? 'var(--color-black-100)' : 'var(--color-white-000)',
    '--button-border-color': background,
    '--button-border-width': '0px',
  } as CSSProperties;

  return (
    <Button
      {...props}
      fullWidth
      variant="primary"
      icon={<Icon name={`social/${provider}`} size="18px" />}
      className={appearance === 'login' ? loginStyle({ provider }) : undefined}
      style={appearance === 'signup' ? signupStyle : undefined}
    />
  );
}
