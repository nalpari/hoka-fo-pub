'use client';

import { useState } from 'react';

import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button, ButtonLink } from '@/components/common/atoms/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { HelpToggletip } from '@/components/common/molecules/HelpTips';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';

type LoginFormProps = {
  showErrors?: boolean;
  showHelp?: boolean;
};

function LoginForm({ showErrors = false, showHelp = false }: LoginFormProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);

  return (
    <form onSubmit={(event) => event.preventDefault()} aria-labelledby="login-title" noValidate>
      <fieldset>
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
              type: 'password',
              value: password,
              onChange: (event) => setPassword(event.target.value),
            }}
          />
          <HStack justifyContent="space-between" gap="2" minH="6">
            <HStack gap="1">
              <Checkbox label="아이디 저장" checked={rememberId} onCheckedChange={setRememberId} />
              <HelpToggletip
                defaultOpen={showHelp}
                label="아이디 저장 주의사항"
                title="주의해주세요"
                description="공용으로 사용하는 장치에서는 이메일 저장하기의 사용에 유의해주세요"
              />
            </HStack>
            <ButtonLink variant="link" size="md" href="/login/find-account">
              <Typography as="span" variant="b6M">
                아이디/비밀번호 찾기
              </Typography>
            </ButtonLink>
          </HStack>
        </Stack>

        <Stack gap="2" mt="6">
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
      </fieldset>
    </form>
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
export function LoginContent({ showErrors = false, showHelp = false }: LoginFormProps) {
  return (
    <AccountPageLayout>
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
          titleProps: { web: 'h4B', mo: 'h7B', id: 'login-title' },
        }}
      >
        <Box>
          <LoginForm showErrors={showErrors} showHelp={showHelp} />
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
              <Typography as="h2" web="b2B" mo="b3B" id="membership-title">
                계정이 없으신가요?
              </Typography>
              <Typography as="p" variant="b6">
                회원가입 후 풍성한 멤버십 혜택을 확인해보세요.
              </Typography>
            </Stack>
            <ButtonLink href="/signup" fullWidth variant="secondary">
              회원가입
            </ButtonLink>
          </Stack>
        </Box>
      </ContentSection>
    </AccountPageLayout>
  );
}
