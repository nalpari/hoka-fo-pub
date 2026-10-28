import { EmailAddressFields } from '@/components/common/organisms/EmailAddressFields/EmailAddressFields';
import type { RegistrationContentProps } from './registration.types';

type Props = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'domainChoice' | 'onDomainChoice'
>;

const options = [
  { value: 'direct', label: '직접입력' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'daum.net', label: 'daum.net' },
];

export function RegistrationEmailFields(props: Props) {
  return (
    <EmailAddressFields
      idPrefix="registration"
      local={props.information.email}
      domain={props.information.domain}
      domainChoice={props.domainChoice}
      errors={{ local: props.fieldErrors.email, domain: props.fieldErrors.domain }}
      options={options}
      onLocalChange={(value) => props.onChange('email', value)}
      onDomainChange={(value) => props.onChange('domain', value)}
      onDomainChoice={props.onDomainChoice}
    />
  );
}
