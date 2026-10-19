'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, Grid } from 'styled-system/jsx';

export type OrderStatusItem = { label: string; count: number; to?: string };

type Props = { items: OrderStatusItem[]; to?: string };

const statusLink = css({
  display: 'grid',
  justifyItems: 'center',
  gap: '7px',
  minH: '100px',
  py: '5',
  px: '2',
  color: 'var(--color-text-primary)',
  textAlign: 'center',
  borderRight: '1px solid var(--color-black-20)',
  '&:last-child': {
    borderRight: '0',
  },
});

/** Five-stage order snapshot that remains horizontally scannable on small screens. */
export function OrderStatusTracker({ items, to = '/mypage/orders' }: Props) {
  return (
    <section aria-label="주문 배송 현황">
      <HStack gap="normal" justifyContent="space-between" mb="3">
        <Typography
          as="h2"
          variant="heading9"
          className={css({
            m: '0',
          })}
        >
          주문 / 배송 조회
        </Typography>
        <Link href={to} className={css({ '&&': { color: 'var(--color-text-tertiary)' } })}>
          <Typography variant="body5" tone="tertiary">
            전체 보기 →
          </Typography>
        </Link>
      </HStack>
      <Grid
        gap="normal"
        gridTemplateColumns="repeat(5, 1fr)"
        borderTop="1px solid var(--color-black-100)"
        borderBottom="1px solid var(--color-border-subtle)"
        _mobile={{
          overflowX: 'auto',
          gridTemplateColumns: 'repeat(5, minmax(88px, 1fr))',
        }}
      >
        {items.map((status) => (
          <Link className={statusLink} key={status.label} href={status.to ?? to}>
            <Typography as="strong" variant="heading8">
              {status.count}
            </Typography>
            <Typography variant="body5">{status.label}</Typography>
          </Link>
        ))}
      </Grid>
    </section>
  );
}
