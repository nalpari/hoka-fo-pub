'use client';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Icon } from '@/components/common/atoms/Icon';
import { TextInput } from '@/components/common/atoms/TextInput';
import { Typography } from '@/components/common/atoms/Typography';

export type DateRangeSearchProps = {
  dates: { start: string; end: string };
  error?: string;
  onDateChange: (key: 'start' | 'end', value: string) => void;
};

const styles = {
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

/** [ 개발팀 바인딩 ] 날짜 초안과 오류는 호출자가 소유합니다. onDateChange는 편집 값을 전달합니다. 실제 요청·검증·로딩·응답 갱신은 호출자가 연결하며 이 컴포넌트는 조회를 실행하지 않습니다. */
/** 직접 조회 기간 입력과 오류를 표시합니다. (Displays custom date inputs and errors.) */
export function DateRangeSearch({ dates, error, onDateChange }: DateRangeSearchProps) {
  return (
    <Stack gap="8px">
      <HStack alignItems="center" gap="6px">
        <Box pos="relative" flexShrink="0">
          <TextInput
            className={dateInput}
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
            aria-label="조회 종료일 달력 열기"
            className={calendarPicker}
            value={/^\d{4}-\d{2}-\d{2}$/.test(dates.end) ? dates.end : ''}
            onChange={(event) => onDateChange('end', event.target.value)}
          />
          <Icon name="calendar-regular" size={18} className={styles.calendarIcon} />
        </Box>
      </HStack>
      {error ? (
        <Typography role="alert" variant="body5" tone="error">
          {error}
        </Typography>
      ) : null}
    </Stack>
  );
}
