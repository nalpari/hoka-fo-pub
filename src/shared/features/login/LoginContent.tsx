import type { FormEvent } from 'react';
import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faComment } from '@/shared/icons/fontAwesome';

const styles = {
  page: css({ pt: '24', px: '5', pb: '20', _mobile: { pt: '10', px: '4', pb: '8' } }),
  content: css({ maxW: '500px', mx: 'auto' }),
  title: css({ m: 0, mb: '10' }),
  form: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  options: css({
    justifyContent: 'space-between',
    gap: '2',
    '& label > span:last-child': { fontSize: '14' /* 기존 13px */ },
  }),
  links: css({
    gap: '2',
    '& a': { color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '2px' },
  }),
  actions: css({ gap: '2', mt: '3' }),
  button: css({
    '& svg': { w: '14px', h: '14px' },
  }),
  kakao: css({
    '--button-bg': 'var(--color-citrus-100)!',
    '--button-color': 'var(--color-black-100)!',
  }),
  naver: css({
    '--button-bg': 'var(--color-black-60)!',
    '--button-color': 'var(--color-white-000)!',
  }),
  membership: css({ mt: '8', pt: '8', borderTop: '1px solid var(--color-black-20)', gap: '2' }),
  signup: css({
    mt: '4',
    '--button-border-width': '1px!',
    '--button-bg': 'var(--color-white-000)!',
    '--button-color': 'var(--color-black-100)!',
    '--button-border-color': 'var(--color-black-100)!',
  }),
};

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
        <Typography as="h1" variant="authTitle" className={styles.title} id="login-title">
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
            <Checkbox label="아이디 저장" checked={rememberId} onCheckedChange={onRememberChange} />
            <HStack className={styles.links}>
              <Button variant="link" size="sm" onClick={onFindAccount}>
                아이디 찾기
              </Button>
              <Typography variant="authCaption" aria-hidden="true">
                |
              </Typography>
              <Button variant="link" size="sm" onClick={() => onUnavailable('비밀번호 찾기')}>
                비밀번호 찾기
              </Button>
            </HStack>
          </HStack>
          {notice ? <StatusMessage tone={notice.tone}>{notice.message}</StatusMessage> : null}
          <Stack className={styles.actions}>
            <Button
              className={styles.button}
              fullWidth
              variant="primary"
              density="auto"
              type="submit"
            >
              로그인
            </Button>
            <Button
              className={[styles.button, styles.kakao].join(' ')}
              fullWidth
              variant="primary"
              density="auto"
              icon={<Icon fontAwesomeIcon={faComment} />}
              onClick={() => onUnavailable('카카오 로그인')}
            >
              카카오 로그인
            </Button>
            <Button
              className={[styles.button, styles.naver].join(' ')}
              fullWidth
              variant="primary"
              density="auto"
              icon={<b aria-hidden="true">N</b>}
              onClick={() => onUnavailable('네이버 로그인')}
            >
              네이버 로그인
            </Button>
          </Stack>
        </form>
        <Stack as="section" className={styles.membership} aria-labelledby="membership-title">
          <Typography as="h2" variant="authBody" id="membership-title" className={css({ m: 0 })}>
            가입과 동시에 시작되는 혜택!
          </Typography>
          <Typography as="p" variant="authSmall" className={css({ m: 0 })}>
            신규가입 쿠폰과 기념일 축하쿠폰, 등급별 혜택을 받으세요.
          </Typography>
          <ButtonLink
            to="/signup"
            fullWidth
            variant="primary"
            density="auto"
            className={styles.signup}
          >
            회원가입
          </ButtonLink>
        </Stack>
      </Box>
    </Box>
  );
}
