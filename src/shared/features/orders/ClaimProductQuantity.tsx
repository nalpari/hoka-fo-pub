import { Stack } from 'styled-system/jsx';
import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';

/** 취소 신청 수량의 입력 범위와 들여쓰기를 구성합니다. (Composes the bounded cancellation quantity input and its indentation.) */
export function ClaimProductQuantity({
  productKey,
  max,
  value,
  onQuantity,
}: {
  productKey: string;
  max: number;
  value: number;
  onQuantity: (key: string, quantity: number) => void;
}) {
  return (
    <Stack pl="8" gap="0" alignItems="flex-start">
      <NumberStepper
        ariaLabel={`${productKey} 신청 수량`}
        min={1}
        max={max}
        value={value}
        onChange={(value) => onQuantity(productKey, value)}
      />
    </Stack>
  );
}
