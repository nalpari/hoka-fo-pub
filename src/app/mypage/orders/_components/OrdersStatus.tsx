import Link from 'next/link';

import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Grid, HStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { Typography } from '@/components/common/atoms/Typography';

import { DateRangeSearch } from '@/components/common/molecules/DateRangeSearch';

import type { OrderFilters, OrdersPeriod } from '@/components/orders/orders.types';

const statusLink = css({
  display: 'grid',
  justifyItems: 'center',
  alignContent: 'start',
  gap: { base: '12px', _mobile: '4px' },
  textAlign: 'center',
  borderRight: '1px solid var(--color-black-20)',
  '&:last-child': {
    borderRight: '0',
  },
  '.platform-web &': {
    my: '44.5px',
  },
  _mobile: {
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
        px={{ base: '57px', _mobile: '0' }}
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

export type OrdersFiltersProps = {
  filters: OrderFilters;
  dates: { start: string; end: string };
  error?: string;
  onPeriodChange: (period: OrdersPeriod) => void;
  onDateChange: (key: 'start' | 'end', value: string) => void;
  onDateSearch: () => void;
  returns?: boolean;
};

/** 주문 조회 기간과 직접 날짜를 표시합니다. (Displays order period and custom date controls.) */
export function OrdersFilters({
  filters,
  dates,
  error,
  onPeriodChange,
  onDateChange,
  onDateSearch,
}: OrdersFiltersProps) {
  const platform = usePlatform();
  const periodOptions = [
    { value: '1', label: '1개월' },
    { value: '3', label: '3개월' },
    { value: '6', label: '6개월' },
    { value: '12', label: '1년' },
    { value: 'custom', label: '직접설정' },
  ] as const;

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      gap="16px"
      _mobile={{ flexDirection: 'column', alignItems: 'stretch' }}
    >
      <FilterTabs
        ariaLabel="조회 기간"
        variant="fill"
        value={filters.period}
        onValueChange={onPeriodChange}
        options={
          platform === 'mobile'
            ? periodOptions
            : [
                periodOptions[3],
                periodOptions[2],
                periodOptions[1],
                periodOptions[0],
                periodOptions[4],
              ]
        }
      />
      <Box display={{ base: 'block', _mobile: filters.period === 'custom' ? 'block' : 'none' }}>
        <HStack gap="24px" alignItems="start">
          <DateRangeSearch dates={dates} error={error} onDateChange={onDateChange} />
          <Button variant="link" size="md" onClick={onDateSearch}>
            조회
          </Button>
        </HStack>
      </Box>
    </HStack>
  );
}
