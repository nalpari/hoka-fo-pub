import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { PasswordResetCompleteModal } from './PasswordResetCompleteModal';

const styles = {
  page: css({
    pt: '24',
    px: '4',
    pb: '8',
    minH: 'calc(100svh - var(--layout-site-header-height))',
    _mobile: {
      pt: '10',
    },
  }),
  content: css({ maxW: '500px', mx: 'auto', gap: '0' }),
  title: css({
    mb: '2.5',
    _mobile: { '&&': { fontSize: '20px', fontWeight: '900' } },
  }),
  description: css({ m: '0', mb: '10', color: 'var(--color-black-50)' }),
  form: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  fieldGroup: css({ gap: '2' }),
  invalidField: css({
    '&&': { boxShadow: 'inset 0 0 0 2px var(--color-red-100)' },
    '&&:focus-within': { boxShadow: 'inset 0 0 0 2px var(--color-red-100)' },
  }),
  input: css({ minW: '0' }),
  fieldError: css({ m: '0', '&&': { color: 'var(--color-red-100)' } }),
  button: css({
    mt: '2',
    '--button-radius': '999px',
    '--button-height': '48px!',
    '--button-border-width': '0px!',
  }),
};

type FieldName = 'password' | 'confirmation';
type Errors = Partial<Record<FieldName, string>>;

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])\S{12,}$/;

export function PasswordResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);

  const validate = (nextPassword: string, nextConfirmation: string): Errors => {
    const nextErrors: Errors = {};
    if (!nextPassword) {
      nextErrors.password = 'required';
    } else if (!passwordPattern.test(nextPassword)) {
      nextErrors.password = '비밀번호는 영문, 숫자, 특수문자 포함 12자 이상 입력되어야 합니다.';
    }
    if (!nextConfirmation) {
      nextErrors.confirmation = 'required';
    } else if (nextPassword !== nextConfirmation) {
      nextErrors.confirmation = '동일한 비밀번호가 입력되었는지 확인해주세요.';
    }
    return nextErrors;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(password, confirmation);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setCompleteOpen(true);
  };

  const updateField = (field: FieldName, value: string) => {
    const nextPassword = field === 'password' ? value : password;
    const nextConfirmation = field === 'confirmation' ? value : confirmation;
    if (field === 'password') {
      setPassword(value);
    } else {
      setConfirmation(value);
    }
    setTouched((previous) => ({ ...previous, [field]: true }));
    const nextErrors = validate(nextPassword, nextConfirmation);
    if (field === 'password' && !touched.confirmation && !submitted) {
      delete nextErrors.confirmation;
    }
    setErrors(nextErrors);
  };

  const field = (name: FieldName, label: string, placeholder: string, value: string) => {
    const errorId = `password-reset-${name}-error`;
    const error = errors[name];
    const errorMessage = error && error !== 'required' ? error : undefined;

    return (
      <Stack className={styles.fieldGroup}>
        <FormField
          variant="boxed"
          className={error ? styles.invalidField : undefined}
          htmlFor={`password-reset-${name}`}
          label={<Typography variant="authCaption">* {label}</Typography>}
        >
          <TextInput
            className={styles.input}
            id={`password-reset-${name}`}
            name={name}
            type="password"
            autoComplete="new-password"
            placeholder={placeholder}
            value={value}
            onChange={(event) => updateField(name, event.target.value)}
            invalid={Boolean(error)}
            aria-describedby={errorMessage ? errorId : undefined}
            required
          />
        </FormField>
        {errorMessage ? (
          <Typography
            as="p"
            variant="authCaption"
            className={styles.fieldError}
            id={errorId}
            role="alert"
          >
            {errorMessage}
          </Typography>
        ) : null}
      </Stack>
    );
  };

  return (
    <Box as="main" className={styles.page}>
      <Stack as="section" className={styles.content} aria-labelledby="password-reset-title">
        <Typography as="h1" variant="headingKr7" className={styles.title} id="password-reset-title">
          비밀번호 재설정
        </Typography>
        <Typography as="p" variant="authBody" tone="subtle" className={styles.description}>
          새로운 비밀번호를 사용하여 로그인을 진행합니다. 새로운 비밀번호를 설정해주세요.
        </Typography>
        <form noValidate className={styles.form} onSubmit={submit}>
          {field('password', '새로운 비밀번호', '새로운 비밀번호를 입력해주세요', password)}
          {field('confirmation', '비밀번호 재입력', '비밀번호를 다시 입력해주세요', confirmation)}
          <Button type="submit" variant="primary" size="lg" fullWidth className={styles.button}>
            비밀번호 변경
          </Button>
        </form>
      </Stack>
      {completeOpen ? (
        <PasswordResetCompleteModal
          onOpenChange={(open) => {
            setCompleteOpen(open);
            if (!open) navigate('/login');
          }}
          onConfirm={() => navigate('/login')}
        />
      ) : null}
    </Box>
  );
}
