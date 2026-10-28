import { TextInput } from '@/components/common/atoms/TextInput/TextInput';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import {
  TextFormField,
  type SingleLineFormFieldProps,
} from '@/components/common/molecules/FormFields/TextFormField';

export type AddressFieldName = 'postalCode' | 'address' | 'addressDetail';

export type AddressFieldsVariant = 'boxed' | 'compact' | 'separated';

const fields = {
  postalCode: { label: '우편번호', placeholder: '주소 찾기 버튼을 눌러주세요' },
  address: { label: '주소', placeholder: '주소를 입력해주세요' },
  addressDetail: { label: '상세주소', placeholder: '상세주소를 입력해주세요' },
};

export type AddressFieldOptions = {
  id?: string;
  required?: boolean;
  disabled?: boolean;
  inputProps?: Partial<SingleLineFormFieldProps['inputProps']>;
};

type Props = {
  field: AddressFieldName;
  options?: AddressFieldOptions;
  variant: AddressFieldsVariant;
  idPrefix: string;
  value?: string;
  error?: string;
  onValueChange?: (value: string) => void;
};

export function AddressField({
  field,
  variant,
  idPrefix,
  value,
  error,
  onValueChange,
  options,
}: Props) {
  const { label, placeholder } = fields[field];
  const postalCode = field === 'postalCode';
  const detail = field === 'addressDetail';
  const id = options?.id ?? `${idPrefix}-${variant === 'compact' && detail ? 'detail' : field}`;

  if (variant !== 'compact') {
    const disabled = options?.disabled ?? !detail;
    const required = options?.required ?? !detail;

    return (
      <TextFormField
        variant="boxed"
        id={id}
        error={error || undefined}
        invalid={Boolean(error)}
        label={detail && !required ? <Typography variant="body5">* {label}</Typography> : label}
        required={required}
        disabled={disabled}
        inputProps={{
          type: detail ? 'text' : undefined,
          disabled,
          disabledAppearance: field === 'address' && variant === 'boxed' ? 'muted' : 'default',
          value,
          placeholder,
          autoComplete: detail ? 'off' : undefined,
          onChange: onValueChange ? (event) => onValueChange(event.target.value) : undefined,
          ...options?.inputProps,
        }}
      />
    );
  }

  return (
    <Stack
      gap="1"
      border={postalCode ? undefined : '1px solid var(--colors-black-40)'}
      bg={field === 'address' ? 'black.10' : undefined}
      p={postalCode ? undefined : '3'}
    >
      {postalCode ? (
        <Typography variant="body5">* {label}</Typography>
      ) : (
        <Typography as="label" htmlFor={id} variant="body5">
          * {label}
        </Typography>
      )}
      <TextInput
        id={postalCode ? undefined : id}
        aria-label={postalCode ? label : undefined}
        name={field}
        value={value}
        readOnly={postalCode}
        onChange={onValueChange ? (event) => onValueChange(event.target.value) : undefined}
        placeholder={placeholder}
        appearance="compact"
        aria-invalid={field === 'address' ? Boolean(error) : undefined}
      />
      {error ? (
        <Typography as="p" variant="body5" className={css({ color: 'red.100' })}>
          {error}
        </Typography>
      ) : null}
    </Stack>
  );
}
