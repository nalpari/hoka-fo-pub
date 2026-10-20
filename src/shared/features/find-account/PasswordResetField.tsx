import { css } from 'styled-system/css';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import type { FieldName } from '@/shared/features/find-account/passwordValidation';

const styles = {
  input: css({ minW: '0' }),
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
  return (
    <FormField
      variant="boxed"
      error={error}
      htmlFor={`password-reset-${name}`}
      label={label}
      required
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
        required
      />
    </FormField>
  );
}
