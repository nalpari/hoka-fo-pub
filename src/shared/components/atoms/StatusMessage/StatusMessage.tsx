import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

const message = css({
  '&[data-tone="error"]': { color: 'error' },
  '&[data-tone="success"]': { color: '#16794b' },
  '&[data-tone="info"]': { color: 'text.subtle' },
});

type StatusMessageProps = {
  children: ReactNode;
  tone?: 'error' | 'success' | 'info';
  className?: string;
  id?: string;
};

/** Accessible feedback message for form validation and request state. */
export function StatusMessage({ children, tone = 'info', className, id }: StatusMessageProps) {
  const isError = tone === 'error';

  return (
    <p
      id={id}
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={[message, className].filter(Boolean).join(' ')}
      data-tone={tone}
      role={isError ? 'alert' : 'status'}
    >
      {children}
    </p>
  );
}
