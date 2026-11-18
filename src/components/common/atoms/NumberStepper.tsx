'use client';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';

import { useFormFieldContext } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';

const root = css({
  '&[data-invalid]': { outline: '2px solid var(--colors-red-100)', outlineOffset: '2px' },
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'space-between',
  gridTemplateColumns: '18px minmax(0, 1fr) 18px',
  gap: '0',
  minW: '0',
  w: '108px',
  h: '36px',
  border: '1px solid #E9EAEB',
  bg: 'white',
  px: '15px',
  _mobile: {
    w: '96px',
    h: '32px',
    px: '13.222222px',
    gridTemplateColumns: '16px minmax(0, 1fr) 16px',
  },
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
  fontSize: '14',
  fontWeight: '400',
  lineHeight: '1.5',
  _mobile: { fontSize: '12' },
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
  minimumControl?: ReactNode;
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
  minimumControl,
}: NumberStepperProps) {
  const field = useFormFieldContext();
  const iconSize = usePlatform() === 'mobile' ? 16 : 18;

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
      {value === min && minimumControl ? (
        minimumControl
      ) : (
        <BaseNumberField.Decrement aria-label="감소" className={control}>
          <Icon name="hoka-action-minus-regular" size={iconSize} />
        </BaseNumberField.Decrement>
      )}
      <BaseNumberField.Input
        aria-describedby={field?.describedBy}
        aria-label={ariaLabel}
        aria-valuetext={formatValue ? String(formatValue(value)) : undefined}
        className={valueStyle}
      />
      <BaseNumberField.Increment aria-label="증가" className={control}>
        <Icon name="hoka-action-plus-regular" size={iconSize} />
      </BaseNumberField.Increment>
    </BaseNumberField.Root>
  );
}
