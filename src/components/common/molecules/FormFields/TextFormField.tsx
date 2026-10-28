import type { ReactNode } from 'react';

import { FormField, type FormFieldProps } from '@/components/common/atoms/FormField/FormField';
import { TextInput, type TextInputProps } from '@/components/common/atoms/TextInput/TextInput';

export type TextFormFieldProps = Omit<FormFieldProps, 'htmlFor' | 'children'> & {
  id: string;
  inputProps: TextInputProps;
  renderControl?: (control: ReactNode) => ReactNode;
};

export type SingleLineFormFieldProps = Omit<TextFormFieldProps, 'inputProps'> & {
  inputProps: Extract<TextInputProps, { multiline?: false }>;
};

export type MultilineFormFieldProps = Omit<TextFormFieldProps, 'inputProps'> & {
  inputProps: Extract<TextInputProps, { multiline: true }>;
};

export function TextFormField({
  id,
  inputProps,
  renderControl,
  ...fieldProps
}: TextFormFieldProps) {
  const control = <TextInput {...inputProps} id={id} />;

  return (
    <FormField {...fieldProps} htmlFor={id}>
      {renderControl ? renderControl(control) : control}
    </FormField>
  );
}
