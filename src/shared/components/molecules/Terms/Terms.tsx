'use client';

import { useId, type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const root = css({ display: 'flex', flexDirection: 'column', gap: '16px', minW: '0' });

const checkbox = css({
  '&&': { alignItems: 'flex-start', gap: '8px', minW: '0' },
  '& > span:first-child': { w: '16px', h: '16px', flexShrink: '0' },
  '& > span:last-child *': { color: 'inherit' },
  '& > span:last-child': {
    minW: '0',
    color: 'inherit',
    '& a': { color: 'inherit', fontWeight: 'medium', textDecoration: 'underline' },
  },
});

const errorColor = css({ color: 'red.100' });

export type TermsProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
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
  error,
  className,
  name,
}: TermsProps) {
  const id = useId();

  return (
    <div className={[root, error ? errorColor : '', className].filter(Boolean).join(' ')}>
      <Checkbox
        name={name}
        checked={checked}
        onCheckedChange={onCheckedChange}
        required={required}
        disabled={disabled}
        labelVariant="bodyKr5"
        interactiveLabel
        label={children}
        className={checkbox}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <Typography
          as="p"
          variant="bodyKr5"
          id={`${id}-error`}
          role="alert"
          className={css({ m: '0', color: 'red.100' })}
        >
          {error}
        </Typography>
      ) : null}
    </div>
  );
}
