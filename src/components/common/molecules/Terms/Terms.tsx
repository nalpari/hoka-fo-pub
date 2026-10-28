'use client';

import { type ReactNode, useId } from 'react';

import { css } from 'styled-system/css';

import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { useFormFieldContext } from '@/components/common/atoms/FormField/FormField';
import { Typography } from '@/components/common/atoms/Typography/Typography';

const root = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  minW: '0',
});

const checkbox = css({
  '&&': { alignItems: 'center', gap: '8px', minW: '0' },
  '& > span:first-child': { w: '16px', h: '16px', flexShrink: '0' },
  '& > span:last-child > span *': { color: 'inherit' },
  '& > span:last-child': {
    minW: '0',
    color: 'inherit',
    '& a': { color: 'inherit', fontWeight: 'medium', textDecoration: 'underline' },
  },
});

export type TermsProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  error?: ReactNode;
  className?: string;
  name?: string;
};

/** Presentation only: consent wording and required/optional policy belong to the caller. */
export function Terms({
  checked,
  onCheckedChange,
  children,
  required,
  disabled,
  invalid = false,
  error,
  className,
  name,
}: TermsProps) {
  const id = useId();

  const field = useFormFieldContext();
  const hasError = invalid || Boolean(error) || Boolean(field?.invalid);

  return (
    <div className={[root, className].filter(Boolean).join(' ')}>
      <Checkbox
        name={name}
        checked={checked}
        onCheckedChange={onCheckedChange}
        required={required}
        disabled={disabled}
        interactiveLabel
        label={
          <Typography variant="body4" tone={hasError ? 'error' : 'inherit'}>
            {children}
          </Typography>
        }
        className={checkbox}
        aria-invalid={hasError || undefined}
        aria-describedby={
          [field?.describedBy, error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined
        }
      />
      {error ? (
        <Typography
          as="p"
          variant="body5"
          tone="error"
          id={`${id}-error`}
          role="alert"
          className={css({ m: '0' })}
        >
          {error}
        </Typography>
      ) : null}
    </div>
  );
}
