import type { FormEvent } from 'react';
import { css, cva } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  page: css({ pt: '24', px: '5', pb: '124px', _mobile: { pt: '10', px: '4', pb: '8' } }),
  content: css({ maxW: '500px', mx: 'auto' }),
  title: css({ m: '0', mb: '10', _mobile: { fontSize: '22!' } }),
  form: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  options: css({ justifyContent: 'space-between', gap: '2', minH: '6' }),
  rememberId: css({ gap: '2', flexShrink: '0' }),
  links: css({ gap: '2', flexShrink: '0' }),
  accountLink: css({ '--button-label-size': '14px!', '--button-height': 'auto!' }),
  divider: css({ w: '1px', h: '10px', bg: '#dadada' }),
  actions: css({ gap: '2', mt: '2' }),
  socialIcon: css({ display: 'block', flexShrink: '0' }),
  membership: css({
    mt: '6',
    pt: '6',
    borderTop: '1px solid token(colors.black.20)',
    gap: '6',
    _mobile: { mt: '8', pt: '8' },
  }),
  benefits: css({ gap: '2' }),
  benefitTitle: css({ m: '0', fontWeight: 'medium' }),
  benefitDescription: css({ m: '0' }),
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

export type LoginNotice = { tone: 'error' | 'success'; message: string };

type LoginContentProps = {
  id: string;
  password: string;
  rememberId: boolean;
  notice: LoginNotice | null;
  onIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFindAccount: () => void;
  onUnavailable: (feature: string) => void;
};

export function LoginContent({
  id,
  password,
  rememberId,
  notice,
  onIdChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
  onFindAccount,
  onUnavailable,
}: LoginContentProps) {
  return (
    <Box as="main" className={styles.page}>
      <Box className={styles.content}>
        <Typography as="h1" variant="headingKr6" className={styles.title} id="login-title">
          HOKA Korea에
          <br />
          오신것을 환영합니다
        </Typography>
        <form className={styles.form} onSubmit={onSubmit} aria-labelledby="login-title">
          <FormField variant="boxed" htmlFor="login-id" label="이메일 아이디" required>
            <TextInput
              id="login-id"
              name="username"
              autoComplete="username"
              placeholder="이메일 주소를 @까지 정확히 입력해 주세요"
              value={id}
              onChange={(event) => onIdChange(event.target.value)}
            />
          </FormField>
          <FormField variant="boxed" htmlFor="login-password" label="비밀번호" required>
            <TextInput
              id="login-password"
              name="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력해 주세요"
              type="password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
            />
          </FormField>
          <HStack className={styles.options}>
            <Checkbox
              className={styles.rememberId}
              label="아이디 저장"
              labelVariant="body4"
              checked={rememberId}
              onCheckedChange={onRememberChange}
            />
            <HStack className={styles.links}>
              <Button
                variant="link"
                size="md"
                className={styles.accountLink}
                onClick={onFindAccount}
              >
                아이디 찾기
              </Button>
              <Box as="span" className={styles.divider} aria-hidden="true" />
              <Button
                variant="link"
                size="md"
                className={styles.accountLink}
                onClick={() => onUnavailable('비밀번호 찾기')}
              >
                비밀번호 찾기
              </Button>
            </HStack>
          </HStack>
          {notice ? <StatusMessage tone={notice.tone}>{notice.message}</StatusMessage> : null}
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
        </form>
        <Stack as="section" className={styles.membership} aria-labelledby="membership-title">
          <Stack className={styles.benefits}>
            <Typography
              as="h2"
              variant="body3"
              id="membership-title"
              className={styles.benefitTitle}
            >
              가입과 동시에 시작되는 혜택!
            </Typography>
            <Typography as="p" variant="body4" className={styles.benefitDescription}>
              신규가입 쿠폰과 기념일 축하쿠폰, 등급별 혜택을 받으세요.
            </Typography>
          </Stack>
          <ButtonLink to="/signup" fullWidth variant="secondary" size="tall">
            회원가입
          </ButtonLink>
        </Stack>
      </Box>
    </Box>
  );
}
