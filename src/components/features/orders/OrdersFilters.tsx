import { OrdersDateRange } from './OrdersDateRange';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { FilterTabs } from '@/components/common/atoms/FilterTabs/FilterTabs';
import { SearchField } from '@/components/common/molecules/SearchField/SearchField';
import type { OrderFilters, OrdersPeriod } from './orders.types';

export type OrdersFiltersProps = {
  filters: OrderFilters;
  dates: { start: string; end: string };
  error?: string;
  onPeriodChange: (period: OrdersPeriod) => void;
  onDateChange: (key: 'start' | 'end', value: string) => void;
  onDateSearch: () => void;
  onQueryChange: (query: string) => void;
};

/** 주문 조회 기간·직접 날짜·상품 검색을 표시합니다. (Displays order period, date range, and product search controls.) */
export function OrdersFilters({
  filters,
  dates,
  error,
  onPeriodChange,
  onDateChange,
  onDateSearch,
  onQueryChange,
}: OrdersFiltersProps) {
  return (
    <Stack gap="4">
      <FilterTabs
        ariaLabel="조회 기간"
        variant="fill"
        railClassName={css({ '&&': { px: '0', mb: '0', _mobile: { px: '0', mb: '0' } } })}
        value={filters.period}
        onValueChange={onPeriodChange}
        itemClassName={() => css({ '&&': { px: '2', h: { base: '34px', _mobile: '28px' } } })}
        options={[
          { value: '1', label: '1개월' },
          { value: '3', label: '3개월' },
          { value: '6', label: '6개월' },
          { value: '12', label: '1년' },
          { value: 'custom', label: '직접설정' },
        ]}
      />
      <OrdersDateRange
        dates={dates}
        error={error}
        onDateChange={onDateChange}
        onDateSearch={onDateSearch}
      />
      <SearchField
        label="주문 상품 검색"
        placeholder="주문한 상품을 검색할 수 있습니다."
        value={filters.query}
        onValueChange={onQueryChange}
      />
    </Stack>
  );
}
