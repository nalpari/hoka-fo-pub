import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { RegistrationInformation, RegistrationContentProps } from './registration.types';
import { TextFormField } from '@/shared/components/molecules/FormFields/TextFormField';
import { NameField } from '@/shared/components/molecules/FormFields/NameField';
import { PhoneNumberField } from '@/shared/components/molecules/FormFields/PhoneNumberField';
import { PasswordField } from '@/shared/components/molecules/FormFields/PasswordField';
import { BirthDateField } from '@/shared/components/molecules/FormFields/BirthDateField';

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
  const Field =
    key === 'name'
      ? NameField
      : key === 'phone'
        ? PhoneNumberField
        : key === 'birthDate'
          ? BirthDateField
          : key === 'password' || key === 'confirmation'
            ? PasswordField
            : TextFormField;

  return (
    <Field
      variant="boxed"
      id={fieldId}
      disabled={disabled}
      invalid={Boolean(error)}
      error={error || undefined}
      label={<Typography variant="body5">* {label}</Typography>}
      inputProps={{
        type: type,
        disabled: disabled,
        disabledAppearance: disabled ? 'muted' : 'default',
        value: information[key],
        placeholder: placeholder,
        autoComplete:
          key === 'password' || key === 'confirmation'
            ? 'new-password'
            : key === 'name'
              ? 'name'
              : key === 'phone'
                ? 'tel'
                : 'off',
        onChange: (event) => onChange(key, event.target.value),
      }}
    />
  );
}
