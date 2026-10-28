import { type SingleLineFormFieldProps, TextFormField } from './TextFormField';

export function PhoneNumberField({ inputProps, ...props }: SingleLineFormFieldProps) {
  return (
    <TextFormField
      label="휴대폰 번호"
      {...props}
      inputProps={{ placeholder: '휴대폰 번호를 입력해 주세요', ...inputProps }}
    />
  );
}
