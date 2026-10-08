import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';

export type QuickLinkItem = { label: string; value: string; to: string };

type Props = { items: QuickLinkItem[]; label?: string };

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  border: '1px solid var(--color-border-subtle)',
  _mobile: { gridTemplateColumns: 'repeat(2, 1fr)' },
});

const link = css({
  position: 'relative',
  display: 'grid',
  gap: '3',
  minH: '122px',
  p: '6',
  borderRight: '1px solid var(--color-border-subtle)',
  '&:nth-child(4)': { borderRight: '0' },
  _mobile: {
    '&:nth-child(2)': { borderRight: '0' },
    '&:nth-child(-n + 2)': { borderBottom: '1px solid var(--color-border-subtle)' },
  },
});

const itemLabel = css({ color: 'var(--color-text-muted)', fontSize: '12' });

const value = css({ fontSize: '20' /* 기존 22px */ });

const arrow = css({
  position: 'absolute',
  right: '5',
  bottom: '5',
  color: 'var(--color-black-50)',
});

export function QuickLinkGrid({ items, label = '바로가기' }: Props) {
  return (
    <nav className={grid} aria-label={label}>
      {items.map((item) => (
        <Link className={link} key={item.label} to={item.to}>
          <span className={itemLabel}>{item.label}</span>
          <strong className={value}>{item.value}</strong>
          <b className={arrow} aria-hidden="true">
            →
          </b>
        </Link>
      ))}
    </nav>
  );
}
