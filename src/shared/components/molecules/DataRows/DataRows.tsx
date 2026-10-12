import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { EmptyState } from '@/shared/components/atoms/EmptyState/EmptyState';

export type DataRow = { label: ReactNode; value: ReactNode; meta?: ReactNode; id?: string };

export type DataRowsProps = {
  rows: DataRow[];
  emptyMessage?: ReactNode;
  className?: string;
  ariaLabel?: string;
};

const list = css({ borderTop: '2px solid var(--color-black-100)' });

const row = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(120px, .7fr) 2fr auto',
  gap: '4',
  alignItems: 'center',
  minH: '16',
  px: '4',
  borderBottom: '1px solid var(--color-border-subtle)',
  _mobile: {
    gridTemplateColumns: '1fr auto',
    '& span:first-child': {
      gridColumn: '1 / -1',
    },
  },
  '&&': {
    _mobile: {
      '& span:first-child': {
        color: 'var(--color-text-tertiary)',
      },
    },
  },
});

/** Label/value row list with a shared empty state for account and order histories. */
export function DataRows({
  rows,
  emptyMessage = '표시할 내역이 없습니다.',
  className,
  ariaLabel,
}: DataRowsProps) {
  return (
    <section aria-label={ariaLabel} className={[list, className].filter(Boolean).join(' ')}>
      {rows.length ? (
        rows.map((item, index) => (
          <article className={row} key={item.id ?? index}>
            <Typography variant="body4">{item.label}</Typography>
            <Typography as="strong" variant="body4" weight="bold">
              {item.value}
            </Typography>
            {item.meta ? (
              <Typography as="small" variant="body5">
                {item.meta}
              </Typography>
            ) : null}
          </article>
        ))
      ) : (
        <EmptyState description={emptyMessage} title="내역이 없습니다." />
      )}
    </section>
  );
}
