import type { ReactNode } from 'react';
import { css, cva } from 'styled-system/css';

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
  base: { display: 'grid', bg: '#f5f5f5', _mobile: { gridTemplateColumns: '1fr' } },
  variants: {
    columns: {
      2: { gridTemplateColumns: 'repeat(2, 1fr)' },
      3: { gridTemplateColumns: 'repeat(3, 1fr)' },
      4: { gridTemplateColumns: 'repeat(4, 1fr)' },
    },
    tone: { neutral: {}, dark: { bg: '#111', color: '#fff' } },
  },
  defaultVariants: { columns: 3, tone: 'neutral' },
});
const metricItem = css({
  display: 'grid',
  gap: '8px',
  minH: '138px',
  alignContent: 'center',
  px: '28px',
  borderRight: '1px solid #ddd',
  '&:last-child': { borderRight: '0' },
  _mobile: {
    borderRight: '0',
    borderBottom: '1px solid #ddd',
    '&:last-child': { borderBottom: '0' },
  },
});
const label = css({ color: '#666', fontSize: '12px' });
const value = css({ fontSize: '27px' });
const detail = css({ fontSize: '12px' });

/** Summary metric layout for account, cart, order, and membership dashboards. */
export function MetricGrid({ items, tone, columns, className }: MetricGridProps) {
  return (
    <section className={[grid({ tone, columns }), className].filter(Boolean).join(' ')}>
      {items.map((item, index) => (
        <article className={metricItem} key={item.id ?? index}>
          <span className={label}>{item.label}</span>
          <strong className={value}>{item.value}</strong>
          {item.detail ? <small className={detail}>{item.detail}</small> : null}
        </article>
      ))}
    </section>
  );
}
