import type { FormEvent } from 'react';
import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { LoginActions } from '@/shared/features/login/LoginActions';

const styles = {
  form: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  rememberId: css({ gap: '2', flexShrink: '0' }),
  accountLink: css({ '--button-label-size': '14px!', '--button-height': 'auto!' }),
};

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
    <form className={styles.form} onSubmit={onSubmit} aria-labelledby="login-title" noValidate>
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
          className={styles.rememberId}
          label="아이디 저장"
          labelVariant="body4"
          checked={rememberId}
          onCheckedChange={onRememberChange}
        />
        <HStack gap="2" flexShrink="0">
          <Button variant="link" size="md" className={styles.accountLink} onClick={onFindAccount}>
            아이디 찾기
          </Button>
          <Box as="span" w="1px" h="2.5" bg="#dadada" aria-hidden="true" />
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
      {notice ? (
        <StatusMessage id="login-notice" tone={notice.tone}>
          {notice.message}
        </StatusMessage>
      ) : null}
      <LoginActions onUnavailable={onUnavailable} />
    </form>
  );
}
