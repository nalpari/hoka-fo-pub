import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';

export type StatePanelProps = {
  variant: 'empty' | 'error' | 'success' | 'info';
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};
const root = css({ display: 'grid', gap: '20px', maxW: '760px' });

/** Consistent content-state presentation for empty results, request errors, and confirmations. */
export function StatePanel({ variant, title, description, action, className }: StatePanelProps) {
  if (variant === 'empty')
    return (
      <div className={[root, className].filter(Boolean).join(' ')}>
        <EmptyState action={action} description={description} title={title} />
      </div>
    );
  return (
    <div className={[root, className].filter(Boolean).join(' ')}>
      <StatusMessage
        tone={variant === 'error' ? 'error' : variant === 'success' ? 'success' : 'info'}
      >
        {description ?? title}
      </StatusMessage>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
