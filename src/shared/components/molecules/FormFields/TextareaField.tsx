import { TextFormField, type MultilineFormFieldProps } from './TextFormField';

export function TextareaField({ inputProps, ...props }: MultilineFormFieldProps) {
  return <TextFormField {...props} inputProps={inputProps} />;
}
