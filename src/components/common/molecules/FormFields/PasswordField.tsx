import { type SingleLineFormFieldProps, TextFormField } from './TextFormField';

export function PasswordField({ inputProps, ...props }: SingleLineFormFieldProps) {
  return (
    <TextFormField
      label="비밀번호"
      {...props}
      inputProps={{ placeholder: '비밀번호를 입력해 주세요', type: 'password', ...inputProps }}
    />
  );
}
