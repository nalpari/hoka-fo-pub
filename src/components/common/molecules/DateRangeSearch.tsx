'use client';

import { useRef, useState } from 'react';

import { css, cva } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { Icon } from '@/components/common/atoms/Icon';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

import { type DateRangeValue, getPresetDateRange } from './dateRange';

export type DateRangeSearchProps = {
  value: DateRangeValue;
  onValueChange: (value: DateRangeValue) => void;
  /** 조회 시 현재 기간·시작일·종료일을 함께 전달합니다. 미연결이면 요청을 실행하지 않습니다. */
  onSearch?: (value: DateRangeValue) => void | Promise<void>;
  /** 기본 inline은 PC 한 줄·모바일 두 줄이며 stacked는 양쪽 모두 두 줄입니다. */
  layout?: 'inline' | 'stacked';
  /** 지정하면 기간 계산의 기준일로 사용하며 생략 시 클릭 시점의 로컬 오늘을 사용합니다. */
  referenceDate?: Date;
  error?: string;
  pending?: boolean;
};

const periodOptions = [
  { value: '12', label: '1년' },
  { value: '6', label: '6개월' },
  { value: '3', label: '3개월' },
  { value: '1', label: '1개월' },
  { value: 'custom', label: '직접설정' },
] as const;

const searchLayout = cva({
  base: { display: 'flex', gap: '24px', minW: '0', _mobile: { flexDirection: 'column' } },
  variants: {
    layout: {
      inline: {
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        _mobile: { alignItems: 'stretch', gap: '24px' },
      },
      stacked: { flexDirection: 'column', alignItems: 'stretch' },
    },
  },
  defaultVariants: { layout: 'inline' },
});

const styles = {
  tabs: css({ gap: '8px!', _mobile: { gap: '4px!' } }),
  tab: css({
    px: '16px!',
    h: '37px!',
    '& span': { fontSize: '14px!', fontWeight: '400', lineHeight: '1.3' },
  }),
  calendarIcon: css({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    right: '12px',
  }),
};

const dateInput = css({
  '&&': {
    w: '130px',
    minW: '0px',
    flexShrink: '0',
    minH: '36px',
    h: '36px',
    pl: '12px',
    pr: '36px',
    borderRadius: 'full',
    fontSize: '14px',
    fontWeight: 'medium',
    color: 'black.100',
    bg: 'white.0',
    '&::selection': { bg: 'blue.100', color: 'black.100' },
  },
});

const calendarPicker = css({
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  w: '18px',
  h: '18px',
  opacity: '0',
  cursor: 'pointer',
  '&::-webkit-calendar-picker-indicator': {
    position: 'absolute',
    inset: '0',
    w: '100%',
    h: '100%',
    margin: '0',
    padding: '0',
    cursor: 'pointer',
  },
});

function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 4), digits.slice(4, 6), digits.slice(6, 8)].filter(Boolean).join('-');
}

function DateRangeFields({
  dates,
  onDateChange,
  disabled,
}: {
  dates: Pick<DateRangeValue, 'start' | 'end'>;
  onDateChange: (key: 'start' | 'end', value: string) => void;
  disabled: boolean;
}) {
  return (
    <HStack alignItems="center" gap="6px">
      <Box pos="relative" flexShrink="0">
        <TextInput
          className={dateInput}
          disabled={disabled}
          type="text"
          inputMode="numeric"
          maxLength={10}
          aria-label="조회 시작일"
          placeholder="YYYY.MM.DD"
          value={dates.start.replaceAll('-', '.')}
          onChange={(event) => onDateChange('start', formatDateInput(event.target.value))}
        />
        <input
          type="date"
          disabled={disabled}
          aria-label="조회 시작일 달력 열기"
          className={calendarPicker}
          value={/^\d{4}-\d{2}-\d{2}$/.test(dates.start) ? dates.start : ''}
          onChange={(event) => onDateChange('start', event.target.value)}
        />
        <Icon name="calendar-regular" size={18} className={styles.calendarIcon} />
      </Box>
      <Typography variant="body4">–</Typography>
      <Box pos="relative" flexShrink="0">
        <TextInput
          className={dateInput}
          disabled={disabled}
          type="text"
          inputMode="numeric"
          maxLength={10}
          aria-label="조회 종료일"
          placeholder="YYYY.MM.DD"
          value={dates.end.replaceAll('-', '.')}
          onChange={(event) => onDateChange('end', formatDateInput(event.target.value))}
        />
        <input
          type="date"
          disabled={disabled}
          aria-label="조회 종료일 달력 열기"
          className={calendarPicker}
          value={/^\d{4}-\d{2}-\d{2}$/.test(dates.end) ? dates.end : ''}
          onChange={(event) => onDateChange('end', event.target.value)}
        />
        <Icon name="calendar-regular" size={18} className={styles.calendarIcon} />
      </Box>
    </HStack>
  );
}

/** [ 개발팀 바인딩 ] value는 화면 소유자의 현재 편집 초안입니다. 기간 선택은 기준일에서 달력 월을 빼고 월말을 보정하며 조회를 자동 실행하지 않습니다. 직접 날짜 편집은 custom과 날짜를 onValueChange로 한 번에 전달합니다. onSearch는 클릭 시 period/start/end 전체를 전달하고 Promise 완료까지 입력·중복 조회를 막습니다. 실패하면 초안을 유지하고 오류와 재시도를 제공합니다. 실제 요청·날짜 검증·목록/count 갱신과 오래된 응답 배제는 연결 화면 소유자 책임이며 onSearch 미연결 상태는 표시/편집만 제공합니다. */
/** 기간 선택·상시 날짜 입력·조회를 하나의 제어형 UI로 제공합니다. (Provides controlled period presets, always visible dates, and search.) */
export function DateRangeSearch({
  value,
  onValueChange,
  onSearch,
  layout = 'inline',
  referenceDate,
  error,
  pending = false,
}: DateRangeSearchProps) {
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string>();
  const searchLock = useRef(false);
  const busy = pending || searching;
  const changeValue = (next: DateRangeValue) => {
    setSearchError(undefined);
    onValueChange(next);
  };
  const search = async () => {
    if (!onSearch || busy || searchLock.current) return;
    searchLock.current = true;
    setSearching(true);
    setSearchError(undefined);
    try {
      await onSearch({ ...value });
    } catch {
      setSearchError('조회하지 못했습니다. 다시 시도해 주세요.');
    } finally {
      searchLock.current = false;
      setSearching(false);
    }
  };
  const message = searchError ?? error;
  return (
    <Stack gap="8px" aria-busy={busy}>
      <Box className={searchLayout({ layout })}>
        <FilterTabs
          ariaLabel="조회 기간"
          variant="fill"
          value={value.period}
          options={periodOptions.map((option) => ({ ...option, disabled: busy }))}
          onValueChange={(period) =>
            changeValue(
              period === 'custom'
                ? { ...value, period }
                : getPresetDateRange(period, referenceDate),
            )
          }
          railClassName={styles.tabs}
          itemClassName={() => styles.tab}
        />
        <HStack alignItems="center" justifyContent="space-between" gap="24px" flexShrink="0">
          <DateRangeFields
            dates={value}
            disabled={busy}
            onDateChange={(key, date) => changeValue({ ...value, [key]: date, period: 'custom' })}
          />
          <Button
            type="button"
            variant="link"
            size="md"
            disabled={busy}
            onClick={onSearch ? search : undefined}
          >
            {busy ? '조회 중' : '조회'}
          </Button>
        </HStack>
      </Box>
      {message ? (
        <Typography role="alert" variant="body5" tone="error">
          {message}
        </Typography>
      ) : null}
    </Stack>
  );
}
