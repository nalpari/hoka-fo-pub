import type { FormEvent } from 'react';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { LoginActions } from '@/shared/features/login/LoginActions';
import { RememberIdHelp } from '@/shared/features/login/RememberIdHelp';
import { TextFormField } from '@/shared/components/molecules/FormFields/TextFormField';
import { PasswordField } from '@/shared/components/molecules/FormFields/PasswordField';

const rememberIdCheckbox = css({ flexShrink: '0' });

export type LoginNotice = {
  tone: 'error' | 'success';
  message: string;
};

export type LoginFormProps = {
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

export function LoginForm({
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
        <PasswordField
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
