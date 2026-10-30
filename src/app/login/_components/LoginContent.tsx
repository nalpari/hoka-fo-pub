'use client';

import { Popover } from '@base-ui/react/popover';
import { type ReactNode, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';

import { faCircleInfo } from '@/icons/fontAwesome';

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
        headerProps={{
          titleAs: 'h1',
          titleProps: { web: 'headingKr6', mo: 'headingKr5', id: 'login-title' },
        }}
      >
        <div>{children}</div>
      </ContentSection>
    </AccountPageLayout>
  );
}

function LoginActions() {
  return (
    <Stack gap="2" mt="2">
      <Button fullWidth variant="primary" type="submit">
        로그인
      </Button>
      <Button social={{ provider: 'kakao' }} type="button">
        카카오 로그인
      </Button>
      <Button social={{ provider: 'naver' }} type="button">
        네이버 로그인
      </Button>
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

type LoginFormProps = {
  showErrors?: boolean;
};

function LoginForm({ showErrors = false }: LoginFormProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  return (
    <form onSubmit={(event) => event.preventDefault()} aria-labelledby="login-title" noValidate>
      <fieldset className={css({ border: 0, p: 0, m: 0, minW: 0 })}>
        <Stack gap="4">
          <TextFormField
            variant="boxed"
            id="login-id"
            label="아이디"
            required
            error={showErrors ? '아이디를 입력해 주세요' : undefined}
            inputProps={{
              name: 'username',
              type: 'text',
              autoComplete: 'username',
              placeholder: '아이디를 입력해 주세요',
              value: id,
              onChange: (event) => setId(event.target.value),
            }}
          />
          <TextFormField
            variant="boxed"
            id="login-password"
            label="비밀번호"
            required
            error={
              showErrors
                ? '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요'
                : undefined
            }
            inputProps={{
              name: 'password',
              autoComplete: 'current-password',
              placeholder: '비밀번호를 입력해 주세요',
              type: 'password',
              value: password,
              onChange: (event) => setPassword(event.target.value),
            }}
          />
          <HStack justifyContent="space-between" gap="2" minH="6">
            <HStack gap="2">
              <Checkbox
                className={rememberIdCheckbox}
                label="아이디 저장"
                checked={rememberId}
                onCheckedChange={setRememberId}
              />
              <RememberIdHelp />
            </HStack>
            <ButtonLink variant="link" size="md" href="/login/find-account">
              <Typography as="span" variant="body4">
                아이디/비밀번호 찾기
              </Typography>
            </ButtonLink>
          </HStack>
          <LoginActions />
        </Stack>
      </fieldset>
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

/**
 * 로그인 기본 또는 고정 오류 마크업을 표시합니다. (Displays the default login markup or fixed field errors.)
 *
 * [ 개발팀 바인딩 ]
 * 이 화면은 퍼블리싱 확인용이며 showErrors는 고정 오류 표시만 선택합니다. 입력과 체크는 로컬 UI 상태입니다.
 * 인증·형식 검증·소셜 로그인·아이디 저장소 연결·요청 상태·완료 이동은 구현하지 않습니다.
 * 개발팀은 실제 로그인 소유자에서 입력값과 동의 상태를 수집하고 요청·오류·저장·이동을 연결해야 합니다.
 */
export function LoginContent({ showErrors = false }: LoginFormProps) {
  return (
    <LoginLayout>
      <LoginForm showErrors={showErrors} />
      <LoginMembership />
    </LoginLayout>
  );
}
