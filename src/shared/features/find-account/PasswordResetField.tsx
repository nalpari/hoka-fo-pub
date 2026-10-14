import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { FieldName } from '@/shared/features/find-account/passwordValidation';

const styles = {
  fieldGroup: css({ gap: '2' }),
  input: css({ minW: '0' }),
  fieldError: css({ m: '0', '&&': { color: 'var(--color-red-100)' } }),
};

type Props = {
  name: FieldName;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function PasswordResetField({ name, label, placeholder, value, error, onChange }: Props) {
  const errorId = `password-reset-${name}-error`;
  const errorMessage = error && error !== 'required' ? error : undefined;

  return (
    <Stack className={styles.fieldGroup}>
      <FormField
        variant="boxed"
        invalid={Boolean(error)}
        htmlFor={`password-reset-${name}`}
        label={<Typography variant="body5">* {label}</Typography>}
      >
        <TextInput
          className={styles.input}
          id={`password-reset-${name}`}
          name={name}
          type="password"
          autoComplete="new-password"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          invalid={Boolean(error)}
          aria-describedby={errorMessage ? errorId : undefined}
          required
        />
      </FormField>
      {errorMessage ? (
        <Typography as="p" variant="body5" className={styles.fieldError} id={errorId} role="alert">
          {errorMessage}
        </Typography>
      ) : null}
    </Stack>
  );
}
