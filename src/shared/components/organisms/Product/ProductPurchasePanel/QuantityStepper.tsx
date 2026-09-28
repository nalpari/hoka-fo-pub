import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';
import { css } from 'styled-system/css';

type QuantityStepperProps = {
  value: number;
  min?: number;
  onChange: (quantity: number) => void;
};

/** 최소 수량을 보장하며 상품 수량을 조절하는 컨트롤입니다. */
export function QuantityStepper({ value, min = 1, onChange }: QuantityStepperProps) {
  return (
    <NumberStepper
      ariaLabel="수량 선택"
      className={css({ my: '18px' })}
      min={min}
      onChange={onChange}
      value={value}
    />
  );
}
