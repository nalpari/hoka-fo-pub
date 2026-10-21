import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { SocialAuthButton } from '@/shared/components/molecules/SocialAuthButton/SocialAuthButton';

export function LoginActions({ onUnavailable }: { onUnavailable: (feature: string) => void }) {
  return (
    <Stack gap="2" mt="2">
      <Button fullWidth variant="primary" type="submit">
        로그인
      </Button>
      <SocialAuthButton provider="kakao" onClick={() => onUnavailable('카카오 로그인')}>
        카카오 로그인
      </SocialAuthButton>
      <SocialAuthButton provider="naver" onClick={() => onUnavailable('네이버 로그인')}>
        네이버 로그인
      </SocialAuthButton>
    </Stack>
  );
}
