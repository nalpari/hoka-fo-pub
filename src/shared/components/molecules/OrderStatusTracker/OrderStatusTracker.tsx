'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { OrderStatusLink } from './OrderStatusLink';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';

export type OrderStatusItem = { label: string; count: number; to?: string };

type Props = { items: OrderStatusItem[]; to?: string };

/** Five-stage order snapshot that remains horizontally scannable on small screens. */
export function OrderStatusTracker({ items, to = '/mypage/orders' }: Props) {
  return (
    <ContentSection
      as="section"
      aria-label="주문 배송 현황"
      gap="3"
      title="주문 / 배송 조회"
      headerProps={{
        orientation: 'horizontal',
        gap: 'normal',
        titleProps: { variant: 'heading9', className: css({ m: '0' }) },
        action: (
          <Link href={to} className={css({ '&&': { color: 'var(--color-text-tertiary)' } })}>
            <Typography variant="body5" tone="tertiary">
              전체 보기 →
            </Typography>
          </Link>
        ),
      }}
    >
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
          <OrderStatusLink
            key={status.label}
            label={status.label}
            count={status.count}
            href={status.to ?? to}
          />
        ))}
      </Grid>
    </ContentSection>
  );
}
