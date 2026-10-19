import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ReactNode } from 'react';
import { cva } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

export type MetricGridItem = {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  id?: string;
};

export type MetricGridProps = {
  items: MetricGridItem[];
  tone?: 'neutral' | 'dark';
  columns?: 2 | 3 | 4;
  className?: string;
};

const grid = cva({
  base: {
    display: 'grid',
    bg: 'var(--color-surface-muted)',
    _mobile: {
      gridTemplateColumns: '1fr',
    },
  },
  variants: {
    columns: {
      2: { gridTemplateColumns: 'repeat(2, 1fr)' },
      3: { gridTemplateColumns: 'repeat(3, 1fr)' },
      4: { gridTemplateColumns: 'repeat(4, 1fr)' },
    },
    tone: {
      neutral: {},
      dark: {
        bg: 'var(--color-black-100)',
        '&&': {
          color: 'var(--color-text-inverse)',
        },
      },
    },
  },
  defaultVariants: { columns: 3, tone: 'neutral' },
});

/** Summary metric layout for account, cart, order, and membership dashboards. */
export function MetricGrid({ items, tone, columns, className }: MetricGridProps) {
  return (
    <section className={[grid({ tone, columns }), className].filter(Boolean).join(' ')}>
      {items.map((item, index) => (
        <Grid
          as="article"
          gap="2"
          minH="138px"
          alignContent="center"
          px="7"
          borderRight="1px solid var(--color-border-subtle)"
          _mobile={{
            borderRight: '0',
            borderBottom: '1px solid var(--color-border-subtle)',
            '&:last-child': {
              borderBottom: '0',
            },
          }}
          css={{
            '&:last-child': {
              borderRight: '0',
            },
          }}
          key={item.id ?? index}
        >
          <Typography variant="body5" tone="tertiary">
            {item.label}
          </Typography>
          <Typography as="strong" variant="heading7">
            {item.value}
          </Typography>
          {item.detail ? (
            <Typography as="small" variant="body5">
              {item.detail}
            </Typography>
          ) : null}
        </Grid>
      ))}
    </section>
  );
}
