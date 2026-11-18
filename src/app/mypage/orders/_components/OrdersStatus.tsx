import Link from 'next/link';

import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

const statusLink = css({
  display: 'grid',
  justifyItems: 'center',
  alignContent: 'start',
  gap: { base: '12px', _mobile: '4px' },
  textAlign: 'center',
  px: '16px',
  borderRight: '1px solid var(--color-black-20)',
  '&:last-child': {
    borderRight: '0',
  },
  '.platform-web &': {
    my: '44.5px',
  },
  _mobile: {
    px: '0',
    pt: '20px',
    pb: '18px',
    borderRight: '0',
    '& > span:last-child': { whiteSpace: 'pre-line' },
  },
});

export type OrderStatusItem = { label: string; count: number; to?: string };

type Props = { items: OrderStatusItem[]; to?: string };

/** 주문 단계별 수량을 PC·모바일 반응형 현황 바로 표시합니다. (Displays order stage counts in a responsive status bar.) */
export function OrderStatusTracker({ items, to = '/mypage/orders' }: Props) {
  return (
    <section aria-label="주문 배송 현황">
      <Grid
        gap="0"
        gridTemplateColumns="repeat(5, minmax(0, 1fr))"
        minH={{ base: '159px', _mobile: '94px' }}
        px={{ base: '16px', _mobile: '0' }}
        border={{ base: '1px solid var(--color-black-100)', _mobile: '0' }}
        bg={{ base: 'white.0', _mobile: 'black.10' }}
      >
        {items.map((status) => (
          <Link key={status.label} className={statusLink} href={status.to ?? to}>
            <Typography
              as="strong"
              variant="heading6"
              tone={status.count === 0 ? 'black40' : 'primary'}
            >
              {status.count}
            </Typography>
            <Typography web="body3" mo="body5" tone={status.count === 0 ? 'black40' : 'primary'}>
              {status.label}
            </Typography>
          </Link>
        ))}
      </Grid>
    </section>
  );
}
