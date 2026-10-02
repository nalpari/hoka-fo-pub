import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Field as BaseField } from '@base-ui/react/field';

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
    <BaseField.Root className={className}>
      <BaseField.Label htmlFor={htmlFor}>
        {label}
        {required ? <em>필수</em> : null}
      </BaseField.Label>
      {children}
    </BaseField.Root>
  );
}

export function FormFieldLabel({ className, ...props }: FormFieldLabelProps) {
  return <BaseField.Label {...props} className={withClassName('form-field__label', className)} />;
}

export function FormFieldControl({ className, ...props }: FormFieldControlProps) {
  return <div {...props} className={withClassName('form-field__control', className)} />;
}

export function FormFieldHint({ className, ...props }: FormFieldHintProps) {
  return <BaseField.Description {...props} className={withClassName('form-field__hint', className)} />;
}

export function FormFieldMessage({ className, ...props }: FormFieldMessageProps) {
  return <BaseField.Error match className={withClassName('form-field__message', className)} {...props} />;
}

export const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  Control: FormFieldControl,
  Hint: FormFieldHint,
  Message: FormFieldMessage,
});
