import { Box, Flex } from 'styled-system/jsx';
import type { CSSProperties } from 'react';
import { RangeInput } from '@/shared/components/atoms/RangeInput/RangeInput';

const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;
export function PriceRange({
  min = 129000,
  max = 189000,
  value,
  onChange,
}: {
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Box mt="14px">
      <RangeInput
        style={{ '--range-accent': '#d71920' } as CSSProperties}
        min={min}
        max={max}
        step="10000"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <Flex justifyContent="space-between" fontSize="12px">
        <span>{won(min)}</span>
        <span>{won(value)}</span>
      </Flex>
    </Box>
  );
}
