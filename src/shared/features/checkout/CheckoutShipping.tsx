import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { useState } from 'react';

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
    <ContentSection
      as="section"
      gap="4"
      title="주문자 및 배송지 정보"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading9', mo: 'heading7' } }}
    >
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
    </ContentSection>
  );
}
