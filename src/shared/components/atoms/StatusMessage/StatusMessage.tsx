import type { ReactNode } from 'react';

type StatusMessageProps = {
  children: ReactNode;
  tone?: 'error' | 'success' | 'info';
  className?: string;
};

/** Accessible feedback message for form validation and request state. */
export function StatusMessage({ children, tone = 'info', className }: StatusMessageProps) {
  const isError = tone === 'error';

  return (
    <p
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={className}
      data-tone={tone}
      role={isError ? 'alert' : 'status'}
    >
      {children}
    </p>
  );
}
