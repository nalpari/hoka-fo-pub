'use client';

import type { CSSProperties, SelectHTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { useFormFieldContext } from '@/components/common/atoms/FormField/FormField';

const select = css({
  minH: 'var(--field-height, 38px)',
  border:
    'var(--field-border-width, 1px) solid var(--field-border-color, var(--color-field-border))',
  borderRadius: 'var(--field-radius, var(--radius-sm))',
  py: '0',
  pl: '2.5',
  pr: '7',
  bg: 'var(--field-bg, var(--color-field-bg))',
  color: 'var(--field-color, var(--color-field-text))',
  width: '100%',
  _focusVisible: {
    outline: '2px solid var(--color-focus-ring, var(--focus-ring))',
    outlineOffset: '2px',
  },
  _disabled: {
    opacity: '0.6',
    cursor: 'not-allowed',
  },
});

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
  fullWidth?: boolean;
};

export function Select({
  className,
  children,
  style,
  invalid = false,
  fullWidth = false,
  ...props
}: SelectProps) {
  const field = useFormFieldContext();
  const hasError =
    invalid ||
    Boolean(field?.invalid) ||
    props['aria-invalid'] === true ||
    props['aria-invalid'] === 'true';

  return (
    <select
      {...props}
      id={props.id ?? field?.htmlFor}
      required={props.required ?? field?.required}
      disabled={props.disabled || field?.disabled}
      aria-describedby={
        [props['aria-describedby'], field?.describedBy].filter(Boolean).join(' ') || undefined
      }
      aria-invalid={hasError || props['aria-invalid'] || undefined}
      data-invalid={hasError ? 'true' : undefined}
      style={
        {
          '--field-height': '38px',
          '--field-border-width': '1px',
          '--field-border-color': hasError
            ? 'var(--color-danger-border, var(--color-error))'
            : 'var(--color-field-border)',
          '--field-radius': 'var(--radius-sm)',
          '--field-bg': 'var(--color-field-bg)',
          '--field-color': 'var(--color-field-text)',
          width: fullWidth ? '100%' : undefined,
          ...((style ?? {}) as CSSProperties),
        } as CSSProperties
      }
      className={[select, className].filter(Boolean).join(' ')}
    >
      {children}
    </select>
  );
}
