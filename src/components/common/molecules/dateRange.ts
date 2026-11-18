export type DateRangePeriod = '1' | '3' | '6' | '12' | 'custom';

export type DateRangeValue = {
  period: DateRangePeriod;
  start: string;
  end: string;
};

function formatLocalDate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

/** 월말과 윤년을 보정한 달력 기준 기간을 반환합니다. (Returns a calendar month range clamped for month ends and leap years.) */
export function getPresetDateRange(
  period: Exclude<DateRangePeriod, 'custom'>,
  referenceDate = new Date(),
): DateRangeValue {
  const start = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth() - Number(period),
    1,
    12,
  );
  const lastDay = new Date(start.getFullYear(), start.getMonth() + 1, 0, 12).getDate();
  start.setDate(Math.min(referenceDate.getDate(), lastDay));
  return { period, start: formatLocalDate(start), end: formatLocalDate(referenceDate) };
}
