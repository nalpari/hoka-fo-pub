import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Field as BaseField } from '@base-ui/react/field';

const boxedField = css({
  border: '1px solid #b3b3b3',
  minH: '61px',
  minW: '0',
  px: '3',
  py: '2',
  '& > label': { display: 'flex', h: '16px', mb: '8px' },
  _focusWithin: {
    borderColor: 'text.primary',
    boxShadow: 'inset 0 0 0 1px var(--color-text-primary)',
  },
  '& input, & select': {
    '--field-border-width': '0px!',
    '--field-height': '21px!',
    '--field-padding-x': '0px',
    '--field-radius': '0px!',
    h: '21px',
    minW: '0',
    py: '0',
    _focusVisible: { outline: 'none' },
  },
  '& select': { pl: '0' },
});

type FormFieldProps = {
  label: ReactNode;
  htmlFor: string;
  required?: boolean;
  variant?: 'default' | 'boxed';
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

function FormFieldRoot({
  label,
  htmlFor,
  required = false,
  children,
  className,
  variant = 'default',
}: FormFieldProps) {
  return (
    <BaseField.Root
      className={[variant === 'boxed' ? boxedField : '', className].filter(Boolean).join(' ')}
    >
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
  return (
    <BaseField.Description {...props} className={withClassName('form-field__hint', className)} />
  );
}

export function FormFieldMessage({ className, ...props }: FormFieldMessageProps) {
  return (
    <BaseField.Error match className={withClassName('form-field__message', className)} {...props} />
  );
}

export const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  Control: FormFieldControl,
  Hint: FormFieldHint,
  Message: FormFieldMessage,
});
