import type { ReactNode, TableHTMLAttributes } from 'react';
import { css } from 'styled-system/css';

const table = css({
  w: '100%',
  borderCollapse: 'collapse',
  fontSize: '14',
  textAlign: 'center',
  '& th, & td': { h: '46px', px: '2', borderBottom: '1px solid var(--color-black-20)' },
  '& thead th': {
    borderTop: '1px solid var(--color-black-100)',
    bg: 'var(--color-black-10)',
    fontWeight: 'var(--font-weights-bold)',
  },
  '& tbody th': { bg: 'var(--color-off-white-100)', fontWeight: 'var(--font-weights-bold)' },
  '& tbody td + td': { borderLeft: '1px solid var(--color-black-20)' },
});

const visuallyHidden = css({
  position: 'absolute',
  w: '1px',
  h: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
});

export type DataTableProps = TableHTMLAttributes<HTMLTableElement> & { caption?: ReactNode };

/** Responsive-ready semantic table base for guides, specifications, and data summaries. */

export function DataTable({ className, caption, children, ...props }: DataTableProps) {
  return (
    <div className={css({ overflowX: 'auto' })}>
      <table {...props} className={[table, className].filter(Boolean).join(' ')}>
        {caption ? <caption className={visuallyHidden}>{caption}</caption> : null}
        {children}
      </table>
    </div>
  );
}
