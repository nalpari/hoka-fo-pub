'use client';

import type { ReactNode } from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { css } from 'styled-system/css';
import { useFormFieldContext } from '@/components/common/atoms/FormField/FormField';
import { Icon } from '@/components/common/atoms/Icon/Icon';

const root = css({
  '&[data-invalid]': { outline: '2px solid var(--colors-red-100)', outlineOffset: '2px' },
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'space-between',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '0',
  minW: '0',
  w: '122px',
  h: '36px',
  border: '1px solid var(--colors-black-20)',
});

const control = css({
  display: 'grid',
  placeItems: 'center',
  minW: '0',
  minH: '0',
  w: '100%',
  h: '100%',
  border: '0',
  p: '0',
  bg: 'transparent',
  fontSize: '20',
  color: 'black.100',
  cursor: 'pointer',
  '&:disabled, &[data-disabled]': { color: 'black.40', cursor: 'not-allowed' },
});

const valueStyle = css({
  minW: '0',
  w: '100%',
  h: '100%',
  border: '0',
  bg: 'transparent',
  p: '0',
  textAlign: 'center',
  fontSize: '16',
  fontFamily: 'hoka',
  color: 'black.100',
});

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

/** 범위 내 수량을 입력하거나 증감합니다. (Controls quantity entry and increment within bounds.) */
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
  const field = useFormFieldContext();

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
        <Icon name="action/fa-minus" size={24} />
      </BaseNumberField.Decrement>
      <BaseNumberField.Input
        aria-describedby={field?.describedBy}
        aria-label={ariaLabel}
        aria-valuetext={formatValue ? String(formatValue(value)) : undefined}
        className={valueStyle}
      />
      <BaseNumberField.Increment aria-label="증가" className={control}>
        <Icon name="action/fa-plus" size={24} />
      </BaseNumberField.Increment>
    </BaseNumberField.Root>
  );
}
