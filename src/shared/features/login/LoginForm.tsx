import type { FormEvent } from 'react';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { LoginActions } from '@/shared/features/login/LoginActions';

const rememberIdCheckbox = css({ gap: '2', flexShrink: '0' });

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
        <FormField
          variant="boxed"
          htmlFor="login-id"
          label="이메일 아이디"
          required
          error={errors?.id}
        >
          <TextInput
            id="login-id"
            name="username"
            autoComplete="username"
            placeholder="이메일 주소를 @까지 정확히 입력해 주세요"
            value={id}
            onChange={(event) => onIdChange(event.target.value)}
          />
        </FormField>
        <FormField
          variant="boxed"
          htmlFor="login-password"
          label="비밀번호"
          required
          error={errors?.password}
        >
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
        <HStack justifyContent="space-between" gap="2" minH="6">
          <Checkbox
            className={rememberIdCheckbox}
            label="아이디 저장"
            labelVariant="body4"
            checked={rememberId}
            onCheckedChange={onRememberChange}
          />
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
