import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const root = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  minW: '130px',
});
const control = css({ minW: '32px', minH: '32px', border: '0', p: '0', fontSize: '20px' });
const valueStyle = css({ minW: '1.5em', textAlign: 'center' });

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
  const decrease = () => onChange(Math.max(min, value - step));
  const increase = () => onChange(max === undefined ? value + step : Math.min(max, value + step));
  return (
    <div
      aria-label={ariaLabel}
      className={[root, className].filter(Boolean).join(' ')}
      role="group"
    >
      <Button aria-label="감소" className={control} disabled={value <= min} onClick={decrease}>
        −
      </Button>
      <output aria-live="polite" className={valueStyle}>
        {formatValue ? formatValue(value) : value}
      </output>
      <Button
        aria-label="증가"
        className={control}
        disabled={max !== undefined && value >= max}
        onClick={increase}
      >
        +
      </Button>
    </div>
  );
}
