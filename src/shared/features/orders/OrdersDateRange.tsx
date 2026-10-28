import { HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { OrdersFiltersProps } from './OrdersFilters';

const dateInput = css({
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
export function OrdersDateRange({
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
