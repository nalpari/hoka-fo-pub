import { css } from 'styled-system/css';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { RegistrationInformation, RegistrationContentProps } from './registration.types';

const styles = {
  disabledInput: css({
    bg: 'var(--color-black-10)',
    color: 'var(--color-text-subtle)',
    cursor: 'not-allowed',
    _disabled: { opacity: '1' },
  }),
};

type Props = Pick<RegistrationContentProps, 'information' | 'fieldErrors' | 'onChange'> & {
  fieldKey: keyof RegistrationInformation;
  label: string;
  placeholder: string;
  type?: string;
  fieldId?: string;
  disabled?: boolean;
};

export function RegistrationField({
  fieldKey: key,
  label,
  placeholder,
  type = 'text',
  fieldId = `registration-${key}`,
  disabled = false,
  information,
  fieldErrors,
  onChange,
}: Props) {
  const error = fieldErrors[key] ?? '';

  return (
    <FormField
      variant="boxed"
      htmlFor={fieldId}
      disabled={disabled}
      invalid={Boolean(error)}
      error={error || undefined}
      label={<Typography variant="body5">* {label}</Typography>}
    >
      <TextInput
        id={fieldId}
        type={type}
        disabled={disabled}
        className={disabled ? styles.disabledInput : undefined}
        value={information[key]}
        placeholder={placeholder}
        autoComplete={
          key === 'password' || key === 'confirmation'
            ? 'new-password'
            : key === 'name'
              ? 'name'
              : key === 'phone'
                ? 'tel'
                : 'off'
        }
        onChange={(event) => onChange(key, event.target.value)}
      />
    </FormField>
  );
}
