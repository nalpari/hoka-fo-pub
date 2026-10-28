'use client';

import { Typography } from '@/components/common/atoms/Typography/Typography';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

export type QuickLinkItem = { label: string; value: string; to: string };

type Props = { items: QuickLinkItem[]; label?: string };

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

const arrow = css({
  position: 'absolute',
  right: '5',
  bottom: '5',
  color: 'var(--color-text-tertiary)',
});

export function QuickLinkGrid({ items, label = '바로가기' }: Props) {
  return (
    <Grid
      as="nav"
      gap="normal"
      gridTemplateColumns="repeat(4, 1fr)"
      border="1px solid var(--color-border-subtle)"
      _mobile={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
      aria-label={label}
    >
      {items.map((item) => (
        <Link className={link} key={item.label} href={item.to}>
          <Typography variant="body5" tone="tertiary">
            {item.label}
          </Typography>
          <Typography as="strong" variant="heading8">
            {item.value}
          </Typography>
          <b className={arrow} aria-hidden="true">
            →
          </b>
        </Link>
      ))}
    </Grid>
  );
}
