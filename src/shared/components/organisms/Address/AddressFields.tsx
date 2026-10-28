import { Button } from '@/shared/components/atoms/Button/Button';
import { Box, HStack } from 'styled-system/jsx';
import {
  AddressField,
  type AddressFieldName,
  type AddressFieldOptions,
  type AddressFieldsVariant,
} from './AddressField';
import { AddressSearchModal } from './AddressSearchModal';

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
