import { TextFormField } from '@/shared/components/molecules/FormFields/TextFormField';
import type { ShippingErrors } from './CheckoutShipping';

const fields = [
  {
    name: 'name',
    label: '받는 분',
    placeholder: '이름을 입력해주세요',
    autoComplete: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
    autoComplete: 'email',
    type: 'email',
    required: false,
  },
  {
    name: 'phone',
    label: '휴대폰 번호',
    placeholder: '휴대폰 번호를 입력해주세요',
    autoComplete: 'tel',
    type: 'tel',
    required: true,
  },
  {
    name: 'otherPhone',
    label: '다른 전화번호',
    placeholder: '다른 전화번호를 입력해주세요',
    autoComplete: 'off',
    type: 'tel',
    required: false,
  },
] as const;

/** 주문 배송 연락처를 공통 필드로 표시합니다. (Displays shipping contact inputs using shared form fields.) */
export function CheckoutRecipientFields({ errors }: { errors?: ShippingErrors }) {
  return fields.map((field) => (
    <TextFormField
      key={field.name}
      id={`shipping-${field.name}`}
      label={field.label}
      variant="boxed"
      required={field.required}
      error={field.name === 'name' || field.name === 'phone' ? errors?.[field.name] : undefined}
      inputProps={{
        name: field.name,
        placeholder: field.placeholder,
        autoComplete: field.autoComplete,
        type: field.type,
      }}
    />
  ));
}
