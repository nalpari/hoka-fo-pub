'use client';

import { useRouter } from 'next/navigation';

import { Popover } from '@base-ui/react/popover';
import { type ComponentProps, type FormEvent, type ReactNode, useState } from 'react';
import { usePlatform } from '@/context/platform';
import { useRoutePreview } from '@/context/RoutePreview';
import { useShop } from '@/context/ShopShell';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Icon } from '@/components/common/atoms/Icon';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { SocialAuthButton } from '@/components/common/molecules/SocialAuthButton';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';

import { faCircleInfo } from '@/icons/fontAwesome';
import { isValidPassword, passwordRequirementsMessage } from '@/lib/passwordValidation';

function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <AccountPageLayout pageCss={css.raw({ pb: '124px' })}>
      <ContentSection
        gap="10"
        title={
          <>
            HOKA Korea에
            <br />
            오신것을 환영합니다
          </>
        }
        headerProps={{ titleAs: 'h1', titleProps: { variant: 'loginTitle', id: 'login-title' } }}
      >
        <div>{children}</div>
      </ContentSection>
    </AccountPageLayout>
  );
}

function LoginActions({ onUnavailable }: { onUnavailable: (feature: string) => void }) {
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

/** Login-only help; Base UI owns positioning, dismissal and keyboard focus. */
function RememberIdHelp() {
  const platform = usePlatform();

  return (
    <Popover.Root>
      <Popover.Trigger
        type="button"
        openOnHover
        aria-label="아이디 저장 주의사항"
        className={css({
          display: 'inline-flex',
          p: '0',
          border: '0',
          bg: 'transparent',
          color: 'text.tertiary',
          cursor: 'pointer',
          _focusVisible: { outline: '2px solid black', outlineOffset: '2px' },
        })}
      >
        <Icon fontAwesomeIcon={faCircleInfo} size="16px" />
      </Popover.Trigger>
      <Popover.Portal>
        <div className={`platform-${platform}`}>
          <Popover.Positioner side="top" sideOffset={10} className={css({ zIndex: '100' })}>
            <Popover.Popup
              className={css({
                w: '48',
                maxW: 'calc(100vw - 32px)',
                p: '4',
                bg: 'white.0',
                color: 'black.100',
                boxShadow: '0 0 12px rgba(0, 0, 0, 0.15)',
                outline: 'none',
              })}
            >
              <Popover.Title
                render={(props) => (
                  <Typography {...props} as="h2" variant="body4" weight="medium">
                    {props.children}
                  </Typography>
                )}
              >
                주의해주세요
              </Popover.Title>
              <Popover.Description
                render={(props) => (
                  <Typography {...props} as="p" variant="body5" className={css({ mt: '2' })}>
                    {props.children}
                  </Typography>
                )}
              >
                공용으로 사용하는 장소에서는 아이디 저장하기 사용에 유의해주세요.
              </Popover.Description>
              <Popover.Arrow
                className={css({
                  w: '3',
                  h: '3',
                  bg: 'white.0',
                  transform: 'rotate(45deg)',
                  '&[data-side=top]': { bottom: '-6px' },
                  '&[data-side=bottom]': { top: '-6px' },
                })}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </div>
      </Popover.Portal>
    </Popover.Root>
  );
}

const rememberIdCheckbox = css({ flexShrink: '0' });

type LoginNotice = {
  tone: 'error' | 'success';
  message: string;
};

type LoginFormProps = {
  id: string;
  password: string;
  rememberId: boolean;
  notice: LoginNotice | null;
  errors?: Partial<Record<'id' | 'password', string>>;
  onIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFindAccount: () => void;
  onUnavailable: (feature: string) => void;
};

function LoginForm({
  id,
  password,
  rememberId,
  notice,
  errors,
  onIdChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
  onFindAccount,
  onUnavailable,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} aria-labelledby="login-title" noValidate>
      <Stack gap="4">
        <TextFormField
          variant="boxed"
          id="login-id"
          label="아이디"
          required
          error={errors?.id}
          inputProps={{
            name: 'username',
            type: 'text',
            autoComplete: 'username',
            placeholder: '아이디를 입력해 주세요',
            value: id,
            onChange: (event) => onIdChange(event.target.value),
          }}
        />
        <TextFormField
          variant="boxed"
          id="login-password"
          label="비밀번호"
          required
          error={errors?.password}
          inputProps={{
            name: 'password',
            autoComplete: 'current-password',
            placeholder: '비밀번호를 입력해 주세요',
            type: 'password',
            value: password,
            onChange: (event) => onPasswordChange(event.target.value),
          }}
        />
        <HStack justifyContent="space-between" gap="2" minH="6">
          <HStack gap="2">
            <Checkbox
              className={rememberIdCheckbox}
              label="아이디 저장"
              checked={rememberId}
              onCheckedChange={onRememberChange}
            />
            <RememberIdHelp />
          </HStack>
          <Button variant="link" size="md" onClick={onFindAccount}>
            <Typography as="span" variant="body4">
              아이디/비밀번호 찾기
            </Typography>
          </Button>
        </HStack>
        {notice ? (
          <StatusMessage id="login-notice" tone={notice.tone}>
            {notice.message}
          </StatusMessage>
        ) : null}
        <LoginActions onUnavailable={onUnavailable} />
      </Stack>
    </form>
  );
}

function LoginMembership() {
  return (
    <ContentSection
      as="section"
      mt="6"
      pt="6"
      borderTop="1px solid token(colors.black.20)"
      gap="6"
      _mobile={{ mt: '8', pt: '8' }}
      aria-labelledby="membership-title"
      title="가입과 동시에 시작되는 혜택!"
      headerProps={{
        gap: '2',
        titleAs: 'h2',
        titleProps: { variant: 'body3', id: 'membership-title', weight: 'medium' },
        description: '신규가입 쿠폰과 기념일 축하쿠폰, 등급별 혜택을 받으세요.',
        descriptionProps: { variant: 'body4' },
      }}
      footer={
        <ButtonLink href="/signup" fullWidth variant="secondary">
          회원가입
        </ButtonLink>
      }
    />
  );
}

function LoginContent(props: ComponentProps<typeof LoginForm>) {
  return (
    <LoginLayout>
      <LoginForm {...props} />
      <LoginMembership />
    </LoginLayout>
  );
}

/** 로그인 입력을 검증하고 상점 로그인 상태를 연결합니다. (Validates login inputs and connects shop authentication state.) */
function RouteContent() {
  const { login: onLogin } = useShop();
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [notice, setNotice] = useState<LoginNotice | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const validId = /^[a-zA-Z0-9]{4,}$/.test(id);
  const idError = !id ? '아이디를 입력해 주세요' : '영문, 숫자 조합으로 4자 이상 입력해 주세요.';
  const validPassword = isValidPassword(password);
  const errors = {
    id: hasSubmitted && !validId ? idError : undefined,
    password: hasSubmitted && !validPassword ? passwordRequirementsMessage : undefined,
  };

  const showUnavailable = (feature: string) => {
    setNotice({
      tone: 'error',
      message: `${feature} 기능은 데모 환경에서 아직 연결되지 않았습니다.`,
    });
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    setNotice(null);

    if (!validId || !validPassword) {
      return;
    }

    onLogin?.();
    setNotice({
      tone: 'success',
      message: `${id}${rememberId ? ' 아이디를 저장하고' : ''} 로그인했습니다. (데모)`,
    });
    router.push('/');
  };

  return (
    <LoginContent
      id={id}
      password={password}
      rememberId={rememberId}
      notice={notice}
      errors={errors}
      onIdChange={(value) => {
        setId(value);
        setNotice(null);
      }}
      onPasswordChange={(value) => {
        setPassword(value);
        setNotice(null);
      }}
      onRememberChange={setRememberId}
      onSubmit={handleLogin}
      onFindAccount={() => router.push('/login/find-account')}
      onUnavailable={showUnavailable}
    />
  );
}

const routePreviewComponents = { LoginContent } satisfies Pick<
  typeof import('@/types/component-contracts/app-login-page'),
  'LoginContent'
>;

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
