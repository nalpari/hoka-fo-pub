import type { CSSProperties, InputHTMLAttributes, Ref } from 'react';
import { css } from 'styled-system/css';

const textInput = css({
  minH: 'var(--field-height, 42px)',
  border:
    'var(--field-border-width, 1px) solid var(--field-border-color, var(--color-field-border))',
  borderRadius: 'var(--field-radius, var(--radius-sm))',
  px: 'var(--field-padding-x, 12px)',
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

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
  invalid?: boolean;
  fullWidth?: boolean;
};

export function TextInput({
  className,
  style,
  invalid = false,
  fullWidth = false,
  ...props
}: TextInputProps) {
  return (
    <input
      {...props}
      aria-invalid={invalid || props['aria-invalid'] || undefined}
      data-invalid={invalid ? 'true' : undefined}
      style={
        {
          '--field-height': '42px',
          '--field-border-width': '1px',
          '--field-border-color': invalid
            ? 'var(--color-danger-border, var(--color-error))'
            : 'var(--color-field-border)',
          '--field-radius': 'var(--radius-sm)',
          '--field-bg': 'var(--color-field-bg)',
          '--field-color': 'var(--color-field-text)',
          width: fullWidth ? '100%' : undefined,
          ...((style ?? {}) as CSSProperties),
        } as CSSProperties
      }
      className={[textInput, className].filter(Boolean).join(' ')}
    />
  );
}
