import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

const formatPrice = (value: number, showUnit: boolean) =>
  `${value.toLocaleString('ko-KR')}${showUnit ? '원' : ''}`;

const label = css({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '130%',
});

export function PriceRangeValue({
  value: [minimumValue, maximumValue],
  showUnit = false,
}: {
  value: [number, number];
  showUnit?: boolean;
}) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <span className={label}>{formatPrice(minimumValue, showUnit)}</span>
      <span className={label}>{formatPrice(maximumValue, showUnit)}</span>
    </Flex>
  );
}
