import Link from 'next/link';

import { usePlatform } from '@/context/platform';

import { css, cx } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { Icon } from '@/components/common/atoms/Icon';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import type { OrderFilters, OrdersPeriod } from '@/components/orders/orders.types';

const statusLink = css({
  display: 'grid',
  justifyItems: 'center',
  alignContent: 'start',
  gap: { base: '12px', _mobile: '4px' },
  textAlign: 'center',
  borderRight: '1px solid var(--color-black-20)',
  '&:last-child': {
    borderRight: '0px',
  },
  '.platform-web &': {
    my: '44.5px',
  },
  _mobile: {
    pt: '20px',
    pb: '18px',
    borderRight: '0px',
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

const dateInput = css({
  '&&': {
    w: '130px',
    minW: '0px',
    flexShrink: '0',
    minH: '36px',
    h: '36px',
    px: '12px',
    borderRadius: 'full',
    fontSize: '14px',
    fontWeight: 'medium',
    color: 'transparent',
    '&::-webkit-datetime-edit': { color: 'transparent' },
    bg: 'white.0',

    '&::-webkit-calendar-picker-indicator': { opacity: '0', cursor: 'pointer' },
  },
  _mobile: {
    '&&': {
      minH: '28px',
      h: '28px',
      px: '8px',
      borderRadius: 'full',
      fontSize: '14px',
    },
  },
});

const dateLabel = css({
  pos: 'absolute',
  top: '50%',
  left: '12px',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  _mobile: { left: '8px' },
});

/** 직접 조회 기간 입력과 오류·조회 액션을 표시합니다. (Displays custom date inputs, errors, and the search action.) */
function OrdersDateRange({
  dates,
  error,
  onDateChange,
  onDateSearch,
  returns = false,
}: Pick<OrdersFiltersProps, 'dates' | 'error' | 'onDateChange' | 'onDateSearch' | 'returns'>) {
  return (
    <Stack gap="2">
      <HStack alignItems="center" justify="space-between" gap="24px">
        <HStack alignItems="center" gap={returns ? '6px' : undefined}>
          <Box pos="relative" flexShrink="0">
            <TextInput
              className={cx(
                dateInput,
                returns &&
                  css({
                    '&&': {
                      w: '128px',
                      h: '36px',
                      minH: '36px',
                      px: '16px',

                      borderColor: 'var(--color-border-tertiary)',
                    },
                    _mobile: {
                      '&&': {
                        h: '36px',
                        minH: '36px',
                        px: '16px',
                      },
                    },
                  }),
              )}
              type="date"
              aria-label="조회 시작일"
              value={dates.start}
              onChange={(event) => onDateChange('start', event.target.value)}
            />
            <Icon
              name="calendar-regular"
              size={returns ? 18 : 16}
              className={css({
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                right: '12px',
                _mobile: { right: '8px' },
              })}
              style={{ right: returns ? 16 : undefined }}
            />
            <Typography
              as="span"
              variant="body4"
              weight="medium"
              aria-hidden="true"
              className={cx(dateLabel, returns && css({ left: '16px', _mobile: { left: '16px' } }))}
              language={returns ? 'en' : undefined}
            >
              {dates.start.replaceAll('-', returns ? '.' : '. ')}
            </Typography>
          </Box>
          <Typography variant="body4" tone={returns ? 'subtle' : undefined}>
            –
          </Typography>
          <Box pos="relative" flexShrink="0">
            <TextInput
              className={cx(
                dateInput,
                returns &&
                  css({
                    '&&': {
                      w: '128px',
                      h: '36px',
                      minH: '36px',
                      px: '16px',

                      borderColor: 'var(--color-border-tertiary)',
                    },
                    _mobile: {
                      '&&': {
                        h: '36px',
                        minH: '36px',
                        px: '16px',
                      },
                    },
                  }),
              )}
              type="date"
              aria-label="조회 종료일"
              value={dates.end}
              onChange={(event) => onDateChange('end', event.target.value)}
            />
            <Icon
              name="calendar-regular"
              size={returns ? 18 : 16}
              className={css({
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                right: '12px',
                _mobile: { right: '8px' },
              })}
              style={{ right: returns ? 16 : undefined }}
            />
            <Typography
              as="span"
              variant="body4"
              weight="medium"
              aria-hidden="true"
              className={cx(dateLabel, returns && css({ left: '16px', _mobile: { left: '16px' } }))}
              language={returns ? 'en' : undefined}
            >
              {dates.end.replaceAll('-', returns ? '.' : '. ')}
            </Typography>
          </Box>
        </HStack>
        <Button variant="link" size="md" onClick={onDateSearch}>
          조회
        </Button>
      </HStack>
      {error ? (
        <Typography role="alert" variant="body5" tone="error">
          {error}
        </Typography>
      ) : null}
    </Stack>
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
  returns = false,
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
            : returns
              ? [...periodOptions.slice(0, 4).reverse(), periodOptions[4]]
              : [...periodOptions].reverse()
        }
        className={
          returns ? css({ '& [role=group]': { gap: '8px', _mobile: { gap: '6px' } } }) : undefined
        }
      />
      <OrdersDateRange
        returns={returns}
        dates={dates}
        error={error}
        onDateChange={onDateChange}
        onDateSearch={onDateSearch}
      />
    </HStack>
  );
}
