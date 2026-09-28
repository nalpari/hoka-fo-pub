import type { FormEvent } from 'react';
import { css } from 'styled-system/css';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { Button } from '@/shared/components/atoms/Button/Button';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupMethodOption = {
  label: string;
};
const styles = {
  formSection: css({
    display: 'grid',
    '& > p': { mt: '9px', mb: 0, color: '#666', fontSize: '14px' },
    '& > .field > label': { mt: '20px', fontSize: '14px', fontWeight: 700 },
    "& input:not([type='checkbox'])": {
      w: '100%',
      py: '13px',
      border: 0,
      borderBottom: '1px solid #c8c8c8',
    },
  }),
  field: css({ display: 'grid' }),
  error: css({ mt: '18px', color: '#c62828', fontSize: '13px' }),
  primary: css({
    display: 'grid',
    w: '100%',
    minH: '50px',
    mt: '28px',
    placeItems: 'center',
    bg: '#111',
    color: '#fff',
    fontWeight: 700,
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
  onNameChange,
  onEmailChange,
  onIdChange,
  onPasswordChange,
  onSubmit,
}: SignupDetailsStepProps) {
  return (
    <form className={styles.formSection} onSubmit={onSubmit}>
      <h2>기본 정보 입력</h2>
      <p>{methodOption.label} 후 필요한 정보를 입력해 주세요.</p>
      <FormField className={styles.field} htmlFor="signup-name" label="이름" required>
        <TextInput
          id="signup-name"
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="이름을 입력해 주세요"
          value={name}
        />
      </FormField>
      <FormField className={styles.field} htmlFor="signup-email" label="이메일" required>
        <TextInput
          autoComplete="email"
          id="signup-email"
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="example@email.com"
          type="email"
          value={email}
        />
      </FormField>
      {method === 'local' ? (
        <>
          <FormField className={styles.field} htmlFor="signup-id" label="아이디" required>
            <TextInput
              autoComplete="username"
              id="signup-id"
              onChange={(event) => onIdChange(event.target.value)}
              placeholder="영문, 숫자 조합 4자 이상"
              value={id}
            />
          </FormField>
          <FormField className={styles.field} htmlFor="signup-password" label="비밀번호" required>
            <TextInput
              autoComplete="new-password"
              id="signup-password"
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="8자 이상 입력해 주세요"
              type="password"
              value={password}
            />
          </FormField>
        </>
      ) : null}
      {message ? (
        <StatusMessage className={styles.error} tone="error">
          {message}
        </StatusMessage>
      ) : null}
      <Button className={styles.primary} type="submit" variant="primary">
        가입 완료
      </Button>
    </form>
  );
}
