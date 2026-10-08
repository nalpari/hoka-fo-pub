'use client';

import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

const field = css({
  display: 'flex',
  alignItems: 'center',
  height: '38px',
  border: '1px solid color-mix(in srgb, var(--color-white-000) 40%, transparent)',
  background: 'transparent',
  overflow: 'hidden',
});

const input = css({
  width: '100%',
  height: '100%',
  border: '0',
  bg: 'transparent',
  color: 'var(--color-white-000)',
  px: '3',
  fontSize: '14' /* 기존 13px */,
  outline: 'none',
  _placeholder: {
    color: 'color-mix(in srgb, var(--color-white-000) 70%, transparent)',
  },
});

const submitButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '100%',
  border: '0',
  borderLeft: '1px solid color-mix(in srgb, var(--color-white-000) 45%, transparent)',
  bg: 'transparent',
  color: 'var(--color-white-000)',
  padding: '0',
  cursor: 'pointer',
  _focusVisible: {
    outline: '2px solid currentColor',
    outlineOffset: '-2px',
  },
});

export type EmailSignupFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> & {
  label?: string;
  buttonLabel?: string;
  onSubmit?: (email: string) => void;
};

export function EmailSignupField({
  label = 'Enter email',
  buttonLabel = 'Submit email',
  className,
  onSubmit,
  defaultValue,
  value: controlledValue,
  onChange,
  ...props
}: EmailSignupFieldProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(String(defaultValue ?? ''));
  const value = controlledValue === undefined ? uncontrolledValue : String(controlledValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form className={[field, className].filter(Boolean).join(' ')} onSubmit={handleSubmit}>
      <input
        {...props}
        aria-label={label}
        className={input}
        onChange={(event) => {
          if (controlledValue === undefined) setUncontrolledValue(event.target.value);
          onChange?.(event);
        }}
        placeholder={label}
        type="email"
        value={value}
      />
      <button type="submit" aria-label={buttonLabel} title={buttonLabel} className={submitButton}>
        <Icon name="chevron-right" size="12px" color="white" />
      </button>
    </form>
  );
}
