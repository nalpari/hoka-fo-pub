import { type MultilineFormFieldProps, TextFormField } from './TextFormField';

export function TextareaField({ inputProps, ...props }: MultilineFormFieldProps) {
  return <TextFormField {...props} inputProps={inputProps} />;
}
