'use client';

import { type FormEvent, type InputHTMLAttributes, useId, useState } from 'react';

import { css } from 'styled-system/css';

import { Icon } from '@/components/common/atoms/Icon/Icon';
import { StatusMessage } from '@/components/common/atoms/StatusMessage/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography/Typography';

const field = css({
  '&[data-invalid]': { outline: '2px solid var(--colors-red-100)' },
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
  color: 'var(--color-text-inverse)',
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
  color: 'var(--color-text-inverse)',
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
  const errorId = useId();
  const [invalid, setInvalid] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(String(defaultValue ?? ''));
  const value = controlledValue === undefined ? uncontrolledValue : String(controlledValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setInvalid(false);
    onSubmit?.(value);
  };

  return (
    <>
      <form
        noValidate
        data-invalid={invalid ? '' : undefined}
        className={[field, className].filter(Boolean).join(' ')}
        onSubmit={handleSubmit}
      >
        <input
          {...props}
          aria-invalid={invalid || props['aria-invalid'] || undefined}
          aria-describedby={
            [props['aria-describedby'], invalid ? errorId : ''].filter(Boolean).join(' ') ||
            undefined
          }
          onInvalid={(event) => {
            setInvalid(true);
            props.onInvalid?.(event);
          }}
          aria-label={label}
          className={input}
          onChange={(event) => {
            if (event.target.validity.valid) setInvalid(false);
            if (controlledValue === undefined) setUncontrolledValue(event.target.value);
            onChange?.(event);
          }}
          placeholder={label}
          type="email"
          value={value}
        />
        <button type="submit" aria-label={buttonLabel} title={buttonLabel} className={submitButton}>
          <Icon name="chevron-right" size="12px" color="white.0" />
        </button>
      </form>
      {invalid ? (
        <StatusMessage tone="error">
          <Typography as="span" id={errorId}>
            올바른 이메일 주소를 입력해 주세요.
          </Typography>
        </StatusMessage>
      ) : null}
    </>
  );
}
