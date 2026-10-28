import { Button } from '@/components/common/atoms/Button/Button';
import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { Stack } from 'styled-system/jsx';
import { CheckoutRecipientFields } from './CheckoutRecipientFields';
import { CheckoutAddressFields } from './CheckoutAddressFields';
import type { ShippingErrors } from './CheckoutShipping';

type Props = {
  errors?: ShippingErrors;
  postalCode: string;
  address: string;
  onAddressChange: (address: string) => void;
  onPostalCodeChange: (postalCode: string) => void;
  searchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
  onUseSavedAddress: () => void;
};

export function CheckoutShippingForm({
  errors,
  postalCode,
  address,
  onAddressChange,
  onPostalCodeChange,
  searchOpen,
  onSearchOpenChange,
  onUseSavedAddress,
}: Props) {
  return (
    <Stack gap="4">
      <CheckoutRecipientFields errors={errors} />
      <CheckoutAddressFields
        errors={errors}
        postalCode={postalCode}
        address={address}
        onAddressChange={onAddressChange}
        onPostalCodeChange={onPostalCodeChange}
        searchOpen={searchOpen}
        onSearchOpenChange={onSearchOpenChange}
      />
      <Checkbox label="기본배송지로 등록" />
      <Button variant="link" size="sm" onClick={onUseSavedAddress}>
        기존 배송지 사용
      </Button>
    </Stack>
  );
}
