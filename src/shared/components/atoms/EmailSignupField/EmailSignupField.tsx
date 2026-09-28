import type { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

const field = css({
  display: 'flex',
  alignItems: 'center',
  height: '38px',
  border: '1px solid rgba(255,255,255,0.4)',
  background: 'transparent',
  overflow: 'hidden',
});

const input = css({
  width: '100%',
  height: '100%',
  border: '0',
  bg: 'transparent',
  color: '#fff',
  px: '12px',
  fontSize: '13px',
  outline: 'none',
  _placeholder: {
    color: 'rgba(255,255,255,0.7)',
  },
});

const submitButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '100%',
  border: '0',
  borderLeft: '1px solid rgba(255,255,255,0.45)',
  bg: 'transparent',
  color: '#fff',
  padding: '0',
  cursor: 'pointer',
  _focusVisible: {
    outline: '2px solid currentColor',
    outlineOffset: '-2px',
  },
});

export type EmailSignupFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  buttonLabel?: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export function EmailSignupField({
  label = 'Enter email',
  buttonLabel = 'Submit email',
  className,
  buttonProps,
  ...props
}: EmailSignupFieldProps) {
  return (
    <div className={[field, className].filter(Boolean).join(' ')}>
      <input {...props} aria-label={label} placeholder={label} type="email" className={input} />
      <button
        type="button"
        aria-label={buttonLabel}
        title={buttonLabel}
        className={submitButton}
        {...buttonProps}
      >
        <Icon name="chevron-right" size="12px" color="white" />
      </button>
    </div>
  );
}
