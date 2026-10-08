'use client';

import { createContext, useContext, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { css, cva } from 'styled-system/css';
import { Field as BaseField } from '@base-ui/react/field';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { faCircleInfo } from '@/shared/icons/fontAwesome';

const root = css({ display: 'flex', flexDirection: 'column', gap: '8px', minW: '0' });

const boxedField = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
    minH: 'formField',
    minW: '0',
    px: '12px',
    py: '8px',
    bg: 'white.0',
    boxShadow: 'inset 0 0 0 1px var(--colors-black-40)',
    _focusWithin: { boxShadow: 'inset 0 0 0 2px var(--colors-black-100)' },
    '& select': {
      '--field-border-width': '0px!',
      '--field-height': '21px!',
      '--field-padding-x': '0px',
      '--field-radius': '0px!',
      h: '21px',
      minW: '0',
      py: '0',
      pl: '0',
      _focusVisible: { outline: 'none' },
    },
  },
  variants: {
    invalid: {
      true: {
        boxShadow: 'inset 0 0 0 2px var(--colors-red-100)',
        _focusWithin: { boxShadow: 'inset 0 0 0 2px var(--colors-red-100)' },
      },
    },
    disabled: { true: { bg: 'black.10', color: 'black.40' } },
  },
});

const labelRow = css({ display: 'flex', alignItems: 'center', gap: '4px', h: '16px' });

const controlRow = css({ display: 'flex', alignItems: 'center', gap: '10px', minW: '0' });

type FormFieldContextValue = {
  htmlFor: string;
  boxed: boolean;
  required: boolean;
  invalid: boolean;
  disabled: boolean;
  describedBy?: string;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/** Shares field layout and accessible descriptions with the composed TextInput. */
export function useFormFieldContext() {
  return useContext(FormFieldContext);
}

export type FormFieldProps = {
  label?: ReactNode;
  htmlFor: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  info?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
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
  disabled = false,
  invalid = false,
  info,
  hint,
  error,
  children,
  className,
  variant = 'default',
}: FormFieldProps) {
  const boxed = variant === 'boxed';
  const hasError = invalid || Boolean(error);
  const describedBy =
    [hint ? `${htmlFor}-hint` : '', error ? `${htmlFor}-error` : ''].filter(Boolean).join(' ') ||
    undefined;
  const labelElement =
    label !== undefined ? (
      <BaseField.Label
        htmlFor={htmlFor}
        render={(props) => (
          <Typography {...props} as="label" variant={boxed ? 'bodyKr5' : 'formLabel'}>
            {props.children}
          </Typography>
        )}
      >
        {boxed && required ? <span aria-hidden="true">* </span> : null}
        {label}
        {!boxed && required ? <em>필수</em> : null}
      </BaseField.Label>
    ) : null;

  return (
    <FormFieldContext.Provider
      value={{ htmlFor, boxed, required, disabled, invalid: hasError, describedBy }}
    >
      <BaseField.Root
        disabled={disabled}
        invalid={hasError}
        className={[boxed ? root : '', className].filter(Boolean).join(' ')}
      >
        {boxed ? (
          <div className={boxedField({ invalid: hasError, disabled })}>
            {labelElement ? (
              <div className={labelRow}>
                {labelElement}
                {info ? (
                  <span title={typeof info === 'string' ? info : undefined}>
                    {typeof info === 'string' ? (
                      <Icon fontAwesomeIcon={faCircleInfo} size="16px" />
                    ) : (
                      info
                    )}
                  </span>
                ) : null}
              </div>
            ) : null}
            <div className={controlRow}>{children}</div>
          </div>
        ) : (
          <>
            {labelElement}
            {children}
          </>
        )}
        {error ? (
          <FormFieldMessage id={`${htmlFor}-error`} role="alert">
            {error}
          </FormFieldMessage>
        ) : null}
        {hint ? <FormFieldHint id={`${htmlFor}-hint`}>{hint}</FormFieldHint> : null}
      </BaseField.Root>
    </FormFieldContext.Provider>
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
    <BaseField.Description
      {...props}
      render={(renderProps) => (
        <Typography {...renderProps} as="p" variant="bodyKr5">
          {renderProps.children}
        </Typography>
      )}
      className={withClassName(css({ m: '0' }), withClassName('form-field__hint', className))}
    />
  );
}

export function FormFieldMessage({ className, ...props }: FormFieldMessageProps) {
  return (
    <BaseField.Error
      match
      {...props}
      render={(renderProps) => (
        <Typography {...renderProps} as="p" variant="bodyKr5">
          {renderProps.children}
        </Typography>
      )}
      className={withClassName(
        css({ m: '0', color: 'red.100' }),
        withClassName('form-field__message', className),
      )}
    />
  );
}

export const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  Control: FormFieldControl,
  Hint: FormFieldHint,
  Message: FormFieldMessage,
});
