import { type SingleLineFormFieldProps, TextFormField } from './TextFormField';

export function NameField({ inputProps, ...props }: SingleLineFormFieldProps) {
  return (
    <TextFormField
      label="이름"
      {...props}
      inputProps={{ placeholder: '이름을 입력해 주세요', ...inputProps }}
    />
  );
}
