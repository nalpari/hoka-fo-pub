import { AddressFields } from '@/shared/components/organisms/Address/AddressFields';
import type { ShippingErrors } from './CheckoutShipping';

type Props = {
  errors?: ShippingErrors;
  postalCode: string;
  address: string;
  onPostalCodeChange: (postalCode: string) => void;
  onAddressChange: (address: string) => void;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
};

export function CheckoutAddressFields({
  errors,
  postalCode,
  address,
  onPostalCodeChange,
  onAddressChange,
  searchOpen,
  onSearchOpenChange,
}: Props) {
  return (
    <AddressFields
      variant="compact"
      idPrefix="shipping"
      value={{ postalCode, address }}
      errors={errors}
      onValueChange={(field, next) => {
        if (field === 'postalCode') onPostalCodeChange(next);
        if (field === 'address') onAddressChange(next);
      }}
      searchOpen={searchOpen}
      onSearchOpenChange={onSearchOpenChange}
    />
  );
}
