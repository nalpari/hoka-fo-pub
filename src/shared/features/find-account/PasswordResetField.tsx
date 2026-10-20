import { css } from 'styled-system/css';

import type { FieldName } from '@/shared/features/find-account/passwordValidation';
import { PasswordField } from '@/shared/components/molecules/FormFields/PasswordField';

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
    <PasswordField
      variant="boxed"
      error={error}
      id={`password-reset-${name}`}
      label={label}
      required
      inputProps={{
        className: styles.input,
        name: name,
        type: 'password',
        autoComplete: 'new-password',
        placeholder: placeholder,
        value: value,
        onChange: (event) => onChange(event.target.value),
        required: true,
      }}
    />
  );
}
