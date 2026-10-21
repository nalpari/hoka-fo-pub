import type { ReactNode, TableHTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

const table = css.raw({
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

const spaced = css.raw({
  tableLayout: 'fixed',
  textAlign: 'left',
  borderCollapse: 'separate',
  borderSpacing: '0 12px',
  '& th, & td': {
    h: '36px',
    px: '3',
    borderTop: '1px solid var(--color-black-20)',
    borderBottom: '1px solid var(--color-black-20)',
    borderLeft: '1px solid var(--color-black-20)',
  },
  '& th:last-child, & td:last-child': { borderRight: '1px solid var(--color-black-20)' },
  '& thead th': { borderTop: '1px solid var(--color-black-20)' },
  '& tbody th': { bg: 'transparent', fontWeight: 'normal' },
  _mobile: { fontSize: '12px', borderSpacing: '0 8px', '& th, & td': { px: '2' } },
});

const visuallyHidden = css({
  position: 'absolute',
  w: '1px',
  h: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
});

export type DataTableProps = TableHTMLAttributes<HTMLTableElement> & {
  caption?: ReactNode;
  variant?: 'default' | 'spaced';
};

/** Responsive-ready semantic table base for guides, specifications, and data summaries. */

export function DataTable({
  className,
  caption,
  children,
  variant = 'default',
  ...props
}: DataTableProps) {
  return (
    <Box overflowX="auto">
      <table
        {...props}
        className={[css(table, variant === 'spaced' && spaced), className]
          .filter(Boolean)
          .join(' ')}
      >
        {caption ? <caption className={visuallyHidden}>{caption}</caption> : null}
        {children}
      </table>
    </Box>
  );
}
