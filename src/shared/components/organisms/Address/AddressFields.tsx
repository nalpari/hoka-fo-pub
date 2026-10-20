import { Button } from '@/shared/components/atoms/Button/Button';
import { Box, HStack } from 'styled-system/jsx';
import { AddressField, type AddressFieldName, type AddressFieldsVariant } from './AddressField';
import { AddressSearchModal } from './AddressSearchModal';

type AddressValue = {
  postalCode: string;
  address: string;
  addressDetail?: string;
};

type Props = {
  variant: AddressFieldsVariant;
  idPrefix: string;
  value: AddressValue;
  errors?: Partial<Record<AddressFieldName, string>>;
  onValueChange: (field: AddressFieldName, value: string) => void;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
};

export function AddressFields({
  variant,
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
      variant={variant}
      idPrefix={idPrefix}
      value={value.postalCode}
      error={errors?.postalCode}
    />
  );
  const searchButton = (
    <Button
      variant="link"
      size={variant === 'compact' ? 'sm' : 'md'}
      aria-haspopup="dialog"
      onClick={() => onSearchOpenChange(true)}
    >
      주소 찾기
    </Button>
  );

  return (
    <>
      {variant === 'compact' ? (
        <HStack border="1px solid var(--colors-black-40)" p="3" justifyContent="space-between">
          {postalCodeField}
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
