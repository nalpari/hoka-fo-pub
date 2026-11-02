import type { ReactNode, TableHTMLAttributes } from 'react';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

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

const striped = css.raw({
  w: '100%',
  tableLayout: 'fixed',
  borderCollapse: 'collapse',
  fontFamily: 'hoka',
  fontSize: '14px',
  textAlign: 'left',
  '& th, & td': {
    h: '48px',
    px: '4',
    border: '1px solid token(colors.black.20)',
    fontWeight: 'normal',
    overflowWrap: 'anywhere',
  },
  '& thead th': { bg: 'black.20', fontFamily: 'korean', fontSize: '14px' },
  '& tbody tr:nth-child(even)': { bg: 'black.10' },
  _mobile: {
    fontSize: '14px',
    '& th, & td': { px: '4' },
    '& thead th': { fontSize: '13px' },
  },
});

const compactStriped = css.raw({
  '& th, & td': { px: '3' },
  _mobile: {
    fontSize: '12px',
    '& th, & td': { px: '3' },
    '& thead th': { fontSize: '12px' },
  },
});

export type DataTableProps = TableHTMLAttributes<HTMLTableElement> & {
  caption?: ReactNode;
} & (
    | { variant?: 'default' | 'spaced'; density?: never }
    | { variant: 'striped'; density?: 'regular' | 'compact' }
  );

/** 안내와 데이터 요약을 반응형 표로 표시합니다. (Displays guides and data summaries in a responsive table.) */
export function DataTable({
  className,
  caption,
  children,
  variant = 'default',
  density = 'regular',
  ...props
}: DataTableProps) {
  return (
    <Box overflowX="auto">
      <table
        {...props}
        className={[
          css(
            variant === 'striped' ? striped : table,
            variant === 'spaced' && spaced,
            variant === 'striped' && density === 'compact' && compactStriped,
          ),
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {caption ? (
          <Typography as="caption" srOnly>
            {caption}
          </Typography>
        ) : null}
        {children}
      </table>
    </Box>
  );
}
