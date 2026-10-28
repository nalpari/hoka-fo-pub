import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Flex } from 'styled-system/jsx';

const formatPrice = (value: number, showUnit: boolean) =>
  `${value.toLocaleString('ko-KR')}${showUnit ? '원' : ''}`;

export function PriceRangeValue({
  value: [minimumValue, maximumValue],
  showUnit = false,
}: {
  value: [number, number];
  showUnit?: boolean;
}) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Typography variant="body4">{formatPrice(minimumValue, showUnit)}</Typography>
      <Typography variant="body4">{formatPrice(maximumValue, showUnit)}</Typography>
    </Flex>
  );
}
