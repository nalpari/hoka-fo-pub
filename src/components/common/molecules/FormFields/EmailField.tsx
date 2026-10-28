import { TextFormField, type SingleLineFormFieldProps } from './TextFormField';

export function EmailField({ inputProps, ...props }: SingleLineFormFieldProps) {
  return <TextFormField label="이메일" {...props} inputProps={inputProps} />;
}
