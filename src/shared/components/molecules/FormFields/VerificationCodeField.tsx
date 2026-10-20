import { TextFormField, type SingleLineFormFieldProps } from './TextFormField';

export function VerificationCodeField({ inputProps, ...props }: SingleLineFormFieldProps) {
  return (
    <TextFormField
      label="인증번호"
      {...props}
      inputProps={{
        placeholder: '인증번호 6자리를 입력해 주세요',
        inputMode: 'numeric',
        autoComplete: 'one-time-code',
        maxLength: 6,
        ...inputProps,
      }}
    />
  );
}
