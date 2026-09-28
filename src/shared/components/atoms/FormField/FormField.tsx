import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Box } from 'styled-system/jsx';

type FormFieldProps = {
  label: ReactNode;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

type FormFieldLabelProps = ComponentPropsWithoutRef<'label'>;
type FormFieldControlProps = ComponentPropsWithoutRef<'div'>;
type FormFieldHintProps = ComponentPropsWithoutRef<'p'>;
type FormFieldMessageProps = ComponentPropsWithoutRef<'p'>;

function withClassName(baseClassName: string, className?: string) {
  return [baseClassName, className].filter(Boolean).join(' ');
}

function FormFieldRoot({ label, htmlFor, required = false, children, className }: FormFieldProps) {
  return (
    <Box className={className}>
      <label htmlFor={htmlFor}>
        {label}
        {required ? <em>필수</em> : null}
      </label>
      {children}
    </Box>
  );
}

export function FormFieldLabel({ className, ...props }: FormFieldLabelProps) {
  return <label {...props} className={withClassName('form-field__label', className)} />;
}

export function FormFieldControl({ className, ...props }: FormFieldControlProps) {
  return <div {...props} className={withClassName('form-field__control', className)} />;
}

export function FormFieldHint({ className, ...props }: FormFieldHintProps) {
  return <p {...props} className={withClassName('form-field__hint', className)} />;
}

export function FormFieldMessage({ className, ...props }: FormFieldMessageProps) {
  return <p {...props} className={withClassName('form-field__message', className)} />;
}

export const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  Control: FormFieldControl,
  Hint: FormFieldHint,
  Message: FormFieldMessage,
});
