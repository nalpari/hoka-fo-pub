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

/** 배송지 주소 입력과 주소 검색을 연결합니다. (Connects shipping address fields and address search.) */
export function CheckoutAddressFields({
  errors,
  postalCode,
  address,
  onPostalCodeChange,
  onAddressChange,
  searchOpen,
  onSearchOpenChange,
}: Props) {
  const addressDetailDisabled = !postalCode.trim() || !address.trim();

  return (
    <>
      <AddressFields
        variant="boxed"
        fieldOptions={{
          postalCode: { disabled: true, inputProps: { name: 'postalCode', readOnly: true } },
          address: { disabled: true, inputProps: { name: 'address', readOnly: true } },
          addressDetail: {
            disabled: addressDetailDisabled,
            inputProps: { name: 'addressDetail' },
          },
        }}
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
      <input type="hidden" name="postalCode" value={postalCode} />
      <input type="hidden" name="address" value={address} />
    </>
  );
}
