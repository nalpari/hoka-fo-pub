import { Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { NumberStepper } from '@/components/common/atoms/NumberStepper/NumberStepper';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

/** 최소 수량이 1인 수량 선택을 표시합니다. (Displays cart quantity selection with a minimum of one.) */
export function CartOptionQuantity({ value, onChange }: Props) {
  return (
    <Stack gap="3" alignItems="flex-start">
      <Typography variant="body4" weight="semibold">
        수량
      </Typography>
      <NumberStepper min={1} value={value} onChange={onChange} />
    </Stack>
  );
}
