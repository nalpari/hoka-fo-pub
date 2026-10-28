import { AddressFields } from '@/components/common/organisms/Address/AddressFields';
import type { RegistrationContentProps } from './registration.types';

type Props = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'addressOpen' | 'onAddressOpen'
>;

export function RegistrationAddressFields(props: Props) {
  return (
    <AddressFields
      variant="boxed"
      idPrefix="registration"
      value={props.information}
      errors={props.fieldErrors}
      onValueChange={props.onChange}
      searchOpen={props.addressOpen}
      onSearchOpenChange={props.onAddressOpen}
    />
  );
}
