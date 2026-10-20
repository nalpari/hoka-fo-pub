import { TextFormField, type SingleLineFormFieldProps } from './TextFormField';

export function BirthDateField({ inputProps, ...props }: SingleLineFormFieldProps) {
  return (
    <TextFormField
      label="생년월일"
      {...props}
      inputProps={{ placeholder: '생년월일 8자리를 입력해 주세요', ...inputProps }}
    />
  );
}
