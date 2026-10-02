import type { ReactNode } from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { css } from 'styled-system/css';

const root = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '2.5',
  minW: '130px',
});
const control = css({ minW: '8', minH: '8', border: '0', p: '0', bg: 'transparent', fontSize: '20px', cursor: 'pointer' });
const valueStyle = css({ minW: '1.5em', border: '0', bg: 'transparent', p: '0', textAlign: 'center' });

export type NumberStepperProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  ariaLabel?: string;
  className?: string;
  formatValue?: (value: number) => ReactNode;
};

/** Controlled increment/decrement control with bounds, step size, and value formatter. */
export function NumberStepper({
  value,
  min = 0,
  max,
  step = 1,
  onChange,
  ariaLabel = '수량 선택',
  className,
  formatValue,
}: NumberStepperProps) {

  return (
    <BaseNumberField.Root
      aria-label={ariaLabel}
      className={[root, className].filter(Boolean).join(' ')}
      max={max}
      min={min}
      onValueChange={(nextValue) => onChange(nextValue ?? min)}
      step={step}
      value={value}
    >
      <BaseNumberField.Decrement aria-label="감소" className={control}>
        −
      </BaseNumberField.Decrement>
      <BaseNumberField.Input
        aria-label={ariaLabel}
        aria-valuetext={formatValue ? String(formatValue(value)) : undefined}
        className={valueStyle}
      />
      <BaseNumberField.Increment aria-label="증가" className={control}>
        +
      </BaseNumberField.Increment>
    </BaseNumberField.Root>
  );
}
