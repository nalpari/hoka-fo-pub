import Link from 'next/link';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import type { OrderFilters, OrdersPeriod } from '@/components/orders/orders.types';

type OrderStatusLinkProps = {
  label: string;
  count: number;
  href: string;
  compact?: boolean;
};

const statusLink = css.raw({
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

/** 주문 단계의 수량과 조회 링크를 표시합니다. (Displays an order stage count and its history link.) */
function OrderStatusLink({ label, count, href, compact = false }: OrderStatusLinkProps) {
  return (
    <Link
      className={css(
        statusLink,
        compact && {
          minH: { base: '159px', _mobile: '86px' },
          py: '0',
          px: '1',
          mt: { _mobile: '4' },
          alignSelf: 'center',
          borderRight: '0',
          gap: '1',
          // alignContent: 'center',
          '& > span:last-child': { whiteSpace: 'pre-line' },
        },
      )}
      href={href}
    >
      <Typography
        as="strong"
        variant="heading6"
        tone={compact && count === 0 ? 'black40' : 'primary'}
      >
        {count}
      </Typography>
      <Typography variant="body5" tone={compact ? 'tertiary' : 'primary'}>
        {label}
      </Typography>
    </Link>
  );
}

export type OrderStatusItem = { label: string; count: number; to?: string };

type Props = { items: OrderStatusItem[]; to?: string; compact?: boolean };

/** 주문 단계별 수량을 기본형 또는 압축형으로 표시합니다. (Displays an order stage snapshot in standard or compact form.) */
export function OrderStatusTracker({ items, to = '/mypage/orders', compact = false }: Props) {
  const content = (
    <Grid
      gap="0"
      minH={compact ? { base: '90px', _mobile: '98px' } : undefined}
      alignItems={compact ? 'start' : undefined}
      style={
        compact ? { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` } : undefined
      }
      gridTemplateColumns="repeat(5, 1fr)"
      bg={compact ? 'black.10' : undefined}
      borderTop={compact ? '0' : '1px solid var(--color-black-100)'}
      borderBottom={compact ? '0' : '1px solid var(--color-border-subtle)'}
      _mobile={
        compact ? {} : { overflowX: 'auto', gridTemplateColumns: 'repeat(5, minmax(88px, 1fr))' }
      }
    >
      {items.map((status) => (
        <OrderStatusLink
          key={status.label}
          label={status.label}
          count={status.count}
          href={status.to ?? to}
          compact={compact}
        />
      ))}
    </Grid>
  );

  if (compact) return <section aria-label="주문 배송 현황">{content}</section>;
  return (
    <ContentSection
      as="section"
      aria-label="주문 배송 현황"
      gap="3"
      title="주문 / 배송 조회"
      headerProps={{
        orientation: 'horizontal',
        gap: 'normal',
        titleProps: { variant: 'heading10', className: css({ m: '0' }) },
        action: (
          <Link href={to} className={css({ '&&': { color: 'var(--color-text-tertiary)' } })}>
            <Typography variant="body5" tone="tertiary">
              전체 보기 →
            </Typography>
          </Link>
        ),
      }}
    >
      {content}
    </ContentSection>
  );
}

const dateInput = css({
  '&&': {
    minH: '36px',
    h: '36px',
    px: '3',
    borderRadius: 'full',
    fontSize: '14px',
    bg: 'white.0',
  },
  _mobile: {
    '&&': {
      minH: '28px',
      h: '28px',
      px: '2',
      borderRadius: 'full',
      fontSize: '12px',
      bg: 'white.0',
    },
  },
});

/** 직접 조회 기간 입력과 오류·조회 액션을 표시합니다. (Displays custom date inputs, errors, and the search action.) */
function OrdersDateRange({
  dates,
  error,
  onDateChange,
  onDateSearch,
}: Pick<OrdersFiltersProps, 'dates' | 'error' | 'onDateChange' | 'onDateSearch'>) {
  return (
    <Stack gap="2">
      <HStack
        gap="2"
        minW="0"
        alignItems="center"
        css={{
          '& > input': { flex: '1', minW: '0' },
        }}
      >
        <TextInput
          className={dateInput}
          type="date"
          aria-label="조회 시작일"
          value={dates.start}
          onChange={(event) => onDateChange('start', event.target.value)}
        />
        <Typography variant="body5">–</Typography>
        <TextInput
          className={dateInput}
          type="date"
          aria-label="조회 종료일"
          value={dates.end}
          onChange={(event) => onDateChange('end', event.target.value)}
        />
        <Button variant="link" size="sm" onClick={onDateSearch}>
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
      gap="6"
      _mobile={{ flexDirection: 'column', alignItems: 'stretch', gap: '6' }}
    >
      <FilterTabs
        ariaLabel="조회 기간"
        variant="fill"
        railClassName={css({ '&&': { px: '0', mb: '0', _mobile: { px: '0', mb: '0' } } })}
        value={filters.period}
        onValueChange={onPeriodChange}
        itemClassName={() =>
          css({
            '&&': {
              px: '2',
              h: returns ? '37px' : { base: '34px', _mobile: '28px' },
            },
          })
        }
        options={platform === 'mobile' ? periodOptions : [...periodOptions].reverse()}
      />
      <OrdersDateRange
        dates={dates}
        error={error}
        onDateChange={onDateChange}
        onDateSearch={onDateSearch}
      />
    </HStack>
  );
}
