'use client';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import {
  type SingleLineFormFieldProps,
  TextFormField,
} from '@/components/common/molecules/FormFields/TextFormField';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

type AddressFieldName = 'postalCode' | 'address' | 'addressDetail';

type AddressFieldsVariant = 'boxed' | 'compact' | 'separated';

const fields = {
  postalCode: { label: '우편번호', placeholder: '주소 찾기 버튼을 눌러주세요' },
  address: { label: '주소', placeholder: '주소를 입력해주세요' },
  addressDetail: { label: '상세주소', placeholder: '상세주소를 입력해주세요' },
};

type AddressFieldOptions = {
  id?: string;
  required?: boolean;
  disabled?: boolean;
  inputProps?: Partial<SingleLineFormFieldProps['inputProps']>;
};

type AddressFieldProps = {
  field: AddressFieldName;
  options?: AddressFieldOptions;
  variant: AddressFieldsVariant;
  idPrefix: string;
  value?: string;
  error?: string;
  onValueChange?: (value: string) => void;
};

function AddressField({
  field,
  variant,
  idPrefix,
  value,
  error,
  onValueChange,
  options,
}: AddressFieldProps) {
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

type AddressSearchModalProps = {
  open: boolean;
  postalCode: string;
  address: string;
  idPrefix?: string;
  onOpenChange: (open: boolean) => void;
  onPostalCodeChange: (value: string) => void;
  onAddressChange: (value: string) => void;
};

/** 주소 검색 입력과 주소 선택 동작을 제공합니다 (Displays the address search modal composition). */
function AddressSearchModal({
  open,
  postalCode,
  address,
  idPrefix = 'address-search',
  onOpenChange,
  onPostalCodeChange,
  onAddressChange,
}: AddressSearchModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const postalCodeId = `${idPrefix}-postalCode-dialog`;

  const addressId = `${idPrefix}-address-dialog`;

  return (
    <ModalDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setSubmitted(false);
        onOpenChange(nextOpen);
      }}
      title="우편번호 찾기"
      closeLabel="우편번호 찾기 닫기"
      actions={{
        kind: 'single',
        onConfirm: () => {
          setSubmitted(true);
          if (!postalCode.trim() || !address.trim()) return;
          setSubmitted(false);
          onOpenChange(false);
        },
      }}
    >
      <Stack>
        <Typography as="p" variant="body4">
          주소 검색 서비스 연결 전입니다. 미리보기 우편번호와 주소를 직접 입력해주세요.
        </Typography>
        <TextFormField
          variant="boxed"
          id={postalCodeId}
          label="우편번호"
          required
          error={submitted && !postalCode.trim() ? '우편번호를 입력해 주세요.' : undefined}
          inputProps={{
            type: 'text',
            value: postalCode,
            placeholder: '우편번호를 입력해주세요',
            autoComplete: 'off',
            onChange: (event) => onPostalCodeChange(event.target.value),
          }}
        />
        <TextFormField
          variant="boxed"
          id={addressId}
          label="주소"
          required
          error={submitted && !address.trim() ? '주소를 입력해 주세요.' : undefined}
          inputProps={{
            type: 'text',
            value: address,
            placeholder: '주소를 입력해주세요',
            autoComplete: 'off',
            onChange: (event) => onAddressChange(event.target.value),
          }}
        />
      </Stack>
    </ModalDialog>
  );
}

type AddressValue = {
  postalCode: string;
  address: string;
  addressDetail?: string;
};

type Props = {
  variant: AddressFieldsVariant;
  fieldOptions?: Partial<Record<AddressFieldName, AddressFieldOptions>>;
  searchLabel?: string;
  idPrefix: string;
  value: AddressValue;
  errors?: Partial<Record<AddressFieldName, string>>;
  onValueChange: (field: AddressFieldName, value: string) => void;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
};

/** 주소 입력과 주소 검색을 조합합니다. (Combines address fields with address lookup.) */
export function AddressFields({
  variant,
  fieldOptions,
  searchLabel = '주소 찾기',
  idPrefix,
  value,
  errors,
  onValueChange,
  searchOpen,
  onSearchOpenChange,
}: Props) {
  const postalCodeField = (
    <AddressField
      field="postalCode"
      options={fieldOptions?.postalCode}
      variant={variant}
      idPrefix={idPrefix}
      value={value.postalCode}
      error={errors?.postalCode}
    />
  );
  const searchButton = (
    <Button
      variant="link"
      size={variant === 'boxed' ? 'md' : 'sm'}
      aria-haspopup="dialog"
      onClick={() => onSearchOpenChange(true)}
    >
      {searchLabel}
    </Button>
  );

  return (
    <>
      {variant === 'compact' ? (
        <HStack border="1px solid var(--colors-black-40)" p="3" justifyContent="space-between">
          {postalCodeField}
          {searchButton}
        </HStack>
      ) : variant === 'separated' ? (
        <HStack alignItems="end" gap="2">
          <Box flex="1">{postalCodeField}</Box>
          {searchButton}
        </HStack>
      ) : (
        <HStack gap="6" alignItems="center">
          <Box flex="1" minW="0">
            {postalCodeField}
          </Box>
          <Box flexShrink="0">{searchButton}</Box>
        </HStack>
      )}
      {(['address', 'addressDetail'] as const).map((field) => (
        <AddressField
          key={field}
          field={field}
          options={fieldOptions?.[field]}
          variant={variant}
          idPrefix={idPrefix}
          value={value[field]}
          error={errors?.[field]}
          onValueChange={
            value[field] === undefined ? undefined : (next) => onValueChange(field, next)
          }
        />
      ))}
      <AddressSearchModal
        open={searchOpen}
        onOpenChange={onSearchOpenChange}
        idPrefix={idPrefix}
        postalCode={value.postalCode}
        address={value.address}
        onPostalCodeChange={(next) => onValueChange('postalCode', next)}
        onAddressChange={(next) => onValueChange('address', next)}
      />
    </>
  );
}

export { AddressSearchModal };
