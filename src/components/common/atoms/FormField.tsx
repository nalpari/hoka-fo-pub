'use client';

import { Field as BaseField } from '@base-ui/react/field';
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
} from 'react';

import { css, cva } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { faCircleInfo } from '@/icons/fontAwesome';

const root = css({ display: 'flex', flexDirection: 'column', gap: '8px', minW: '0' });

const boxedField = cva({
  base: {
    minH: 'formField',
    minW: '0',
    px: '12px',
    py: '8px',
    bg: 'white.0',
    boxShadow: 'inset 0 0 0 1px var(--color-border-tertiary)',
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
  hintProps?: Pick<FormFieldHintProps, 'className' | 'variant'>;
  error?: ReactNode;
  variant?: 'default' | 'boxed';
  children: ReactNode;
  className?: string;
};

type FormFieldLabelProps = ComponentPropsWithoutRef<'label'>;

type FormFieldControlProps = ComponentPropsWithoutRef<'div'>;

type FormFieldHintProps = ComponentPropsWithoutRef<'p'> & {
  variant?: ComponentProps<typeof Typography>['variant'];
};

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
  hintProps,
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
          <Typography {...props} as="label" variant={boxed ? 'body5' : 'body4'}>
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
          <Stack gap="7px" className={boxedField({ invalid: hasError, disabled })}>
            {labelElement ? (
              <HStack gap="4px" h="16px">
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
              </HStack>
            ) : null}
            <HStack gap="10px" minW="0">
              {children}
            </HStack>
          </Stack>
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
        {hint ? (
          <FormFieldHint {...hintProps} id={`${htmlFor}-hint`}>
            {hint}
          </FormFieldHint>
        ) : null}
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

/** 입력 필드에 연결된 안내를 지정한 글자 스타일로 표시합니다. (Displays an associated field hint using the specified typography.) */
export function FormFieldHint({ className, variant = 'body5', ...props }: FormFieldHintProps) {
  return (
    <BaseField.Description
      {...props}
      render={(renderProps) => (
        <Typography {...renderProps} as="p" variant={variant}>
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
        <Typography {...renderProps} as="p" variant="body5" tone="error">
          {renderProps.children}
        </Typography>
      )}
      className={withClassName(css({ m: '0' }), withClassName('form-field__message', className))}
    />
  );
}

/** 레이블·입력·안내·오류 메시지를 연결하는 폼 필드입니다. (Connects a form label, control, hint, and validation message.) */
export const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  Control: FormFieldControl,
  Hint: FormFieldHint,
  Message: FormFieldMessage,
});
