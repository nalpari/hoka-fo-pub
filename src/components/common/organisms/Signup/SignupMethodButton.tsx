import { Button } from '@/components/common/atoms/Button/Button';
import { SocialAuthButton } from '@/components/common/molecules/SocialAuthButton/SocialAuthButton';
import type { CSSProperties } from 'react';

export type SignupMethod = 'local' | 'kakao' | 'naver';

const labels: Record<SignupMethod, string> = {
  local: '만 14세 이상 회원가입',
  kakao: '카카오 계정으로 신규가입',
  naver: '네이버 계정으로 신규가입',
};

type Props = { method: SignupMethod; onSelect: () => void };

export function SignupMethodButton({ method, onSelect }: Props) {
  if (method !== 'local')
    return (
      <SocialAuthButton provider={method} appearance="signup" size="tall" onClick={onSelect}>
        {labels[method]}
      </SocialAuthButton>
    );

  return (
    <Button
      fullWidth
      onClick={onSelect}
      variant="primary"
      size="tall"
      style={
        {
          '--button-bg': 'var(--color-black-100)',
          '--button-color': 'var(--color-white-000)',
          '--button-border-color': 'var(--color-black-100)',
          '--button-border-width': '0px',
        } as CSSProperties
      }
    >
      {labels.local}
    </Button>
  );
}
