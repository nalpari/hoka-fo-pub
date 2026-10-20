import { useState } from 'react';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Stack } from 'styled-system/jsx';
import { CheckoutShippingForm } from './CheckoutShippingForm';
import { CheckoutSavedAddress } from './CheckoutSavedAddress';
import { CheckoutDeliveryRequest } from './CheckoutDeliveryRequest';

export type ShippingErrors = Partial<Record<'name' | 'phone' | 'address', string>>;

export function CheckoutShipping({ errors }: { errors?: ShippingErrors }) {
  const [editing, setEditing] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <Stack as="section" gap="4">
      <Typography as="h2" web="heading9" mo="heading7">
        주문자 및 배송지 정보
      </Typography>
      {editing ? (
        <CheckoutShippingForm
          errors={errors}
          postalCode={postalCode}
          address={address}
          onAddressChange={setAddress}
          onPostalCodeChange={setPostalCode}
          searchOpen={searchOpen}
          onSearchOpenChange={setSearchOpen}
          onUseSavedAddress={() => setEditing(false)}
        />
      ) : (
        <CheckoutSavedAddress errors={errors} onEdit={() => setEditing(true)} />
      )}
      <CheckoutDeliveryRequest />
    </Stack>
  );
}
