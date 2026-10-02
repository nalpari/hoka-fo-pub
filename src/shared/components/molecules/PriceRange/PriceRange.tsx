import { Flex } from 'styled-system/jsx';
import { RangeInput } from '@/shared/components/atoms/RangeInput/RangeInput';
import { PriceRangeValue } from '@/shared/components/molecules/PriceRange/PriceRangeValue';

export function PriceRange({
  min = 129000,
  max = 189000,
  value,
  onChange,
}: {
  min?: number;
  max?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  return (
    <Flex direction="column" gap="2">
      <RangeInput
        max={max}
        min={min}
        onValueChange={onChange}
        step={10000}
        thumbAriaLabels={['최소 가격', '최대 가격']}
        thumbCollisionBehavior="none"
        value={value}
      />
      <PriceRangeValue value={value} />
    </Flex>
  );
}
