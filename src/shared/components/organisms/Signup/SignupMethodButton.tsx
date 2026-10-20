import type { CSSProperties } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

export type SignupMethod = 'local' | 'kakao' | 'naver';

type MethodConfig = {
  label: string;
  iconName?: string;
  style: CSSProperties;
};

const methodConfig: Record<SignupMethod, MethodConfig> = {
  kakao: {
    label: '카카오 계정으로 신규가입',
    iconName: 'social/kakao',
    style: {
      '--button-bg': '#FAE100',
      '--button-color': 'var(--color-black-100)',
      '--button-border-color': '#FAE100',
      '--button-border-width': '0px',
    } as CSSProperties,
  },
  naver: {
    label: '네이버 계정으로 신규가입',
    iconName: 'social/naver',
    style: {
      '--button-bg': '#03C75A',
      '--button-color': 'var(--color-white-000)',
      '--button-border-color': '#03C75A',
      '--button-border-width': '0px',
    } as CSSProperties,
  },
  local: {
    label: '만 14세 이상 회원가입',
    style: {
      '--button-bg': 'var(--color-black-100)',
      '--button-color': 'var(--color-white-000)',
      '--button-border-color': 'var(--color-black-100)',
      '--button-border-width': '0px',
    } as CSSProperties,
  },
};

type Props = {
  method: SignupMethod;
  onSelect: () => void;
};

export function SignupMethodButton({ method, onSelect }: Props) {
  const { label, iconName, style } = methodConfig[method];

  return (
    <Button
      fullWidth
      icon={iconName ? <Icon name={iconName} size="18px" /> : undefined}
      onClick={onSelect}
      style={style}
      variant="primary"
      size="tall"
    >
      {label}
    </Button>
  );
}
