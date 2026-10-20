import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { FormEvent } from 'react';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { Button } from '@/shared/components/atoms/Button/Button';
import { NameField } from '@/shared/components/molecules/FormFields/NameField';
import { EmailField } from '@/shared/components/molecules/FormFields/EmailField';
import { TextFormField } from '@/shared/components/molecules/FormFields/TextFormField';
import { PasswordField } from '@/shared/components/molecules/FormFields/PasswordField';

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupMethodOption = {
  label: string;
};

const styles = {
  formSection: css({
    display: 'grid',
  }),
  error: css({
    mt: '18px',
    color: 'var(--color-red-100)',
  }),
  primary: css({
    display: 'grid',
    w: '100%',
    mt: '7',
    placeItems: 'center',
    bg: 'var(--color-black-100)',
    color: 'var(--color-text-inverse)',
  }),
};

type SignupDetailsStepProps = {
  method: SignupMethod;
  methodOption: SignupMethodOption;
  name: string;
  email: string;
  id: string;
  password: string;
  message: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'id' | 'password', string>>;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function SignupDetailsStep({
  method,
  methodOption,
  name,
  email,
  id,
  password,
  message,
  fieldErrors,
  onNameChange,
  onEmailChange,
  onIdChange,
  onPasswordChange,
  onSubmit,
}: SignupDetailsStepProps) {
  return (
    <form noValidate className={styles.formSection} onSubmit={onSubmit}>
      <ContentHeader
        gap="9px"
        titleAs="h2"
        title="기본 정보 입력"
        titleProps={{ variant: 'heading7' }}
        description={<>{methodOption.label} 후 필요한 정보를 입력해 주세요.</>}
        descriptionProps={{ variant: 'body4', tone: 'tertiary' }}
      />
      <Stack gap="4" mt="4">
        <NameField
          variant="boxed"
          id="signup-name"
          error={fieldErrors?.name}
          label="이름"
          required
          inputProps={{
            onChange: (event) => onNameChange(event.target.value),
            placeholder: '이름을 입력해 주세요',
            value: name,
          }}
        />
        <EmailField
          variant="boxed"
          id="signup-email"
          error={fieldErrors?.email}
          label="이메일"
          required
          inputProps={{
            autoComplete: 'email',
            onChange: (event) => onEmailChange(event.target.value),
            placeholder: 'example@email.com',
            type: 'email',
            value: email,
          }}
        />
        {method === 'local' ? (
          <>
            <TextFormField
              variant="boxed"
              id="signup-id"
              error={fieldErrors?.id}
              label="아이디"
              required
              inputProps={{
                autoComplete: 'username',
                onChange: (event) => onIdChange(event.target.value),
                placeholder: '영문, 숫자 조합 4자 이상',
                value: id,
              }}
            />
            <PasswordField
              variant="boxed"
              id="signup-password"
              error={fieldErrors?.password}
              label="비밀번호"
              required
              inputProps={{
                autoComplete: 'new-password',
                onChange: (event) => onPasswordChange(event.target.value),
                placeholder: '영문, 숫자, 특수문자 포함 10~12자',
                type: 'password',
                value: password,
              }}
            />
          </>
        ) : null}
      </Stack>
      {message ? (
        <StatusMessage className={styles.error} tone="error">
          <Typography as="span" variant="body4" tone="error">
            {message}
          </Typography>
        </StatusMessage>
      ) : null}
      <Button className={styles.primary} type="submit" variant="primary">
        가입 완료
      </Button>
    </form>
  );
}
