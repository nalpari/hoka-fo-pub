'use client';

import { Slider as BaseSlider } from '@base-ui/react/slider';
import { css } from 'styled-system/css';

const root = css({ w: '100%' });

const control = css({ position: 'relative', display: 'flex', alignItems: 'center', h: '34px' });

const track = css({ position: 'relative', w: '100%', h: '4px', bg: '#e5e5e5' });

const indicator = css({ h: '100%', bg: '#111' });

const thumb = css({
  w: '16px',
  h: '16px',
  border: '3px solid #111',
  borderRadius: 'full',
  bg: '#fff',
});

export type RangeValue = number | readonly number[];

export type RangeInputProps<Value extends RangeValue = RangeValue> = {
  'aria-label'?: string;
  className?: string;
  disabled?: boolean;
  form?: string;
  max?: number;
  min?: number;
  name?: string;
  onValueChange: (value: Value) => void;
  step?: number;
  thumbAriaLabels?: readonly string[];
  thumbCollisionBehavior?: 'none' | 'push' | 'swap';
  value: Value;
};

/** Controlled Base UI slider supporting one or more labeled thumbs. */
export function RangeInput<Value extends RangeValue>({
  'aria-label': ariaLabel,
  className,
  disabled,
  form,
  max,
  min,
  name,
  onValueChange,
  step,
  thumbAriaLabels,
  thumbCollisionBehavior,
  value,
}: RangeInputProps<Value>) {
  const values = Array.isArray(value) ? value : [value];

  return (
    <BaseSlider.Root
      className={[root, className].filter(Boolean).join(' ')}
      disabled={disabled}
      form={form}
      max={max}
      min={min}
      name={name}
      onValueChange={(nextValue) => onValueChange(nextValue as Value)}
      step={step}
      thumbCollisionBehavior={thumbCollisionBehavior}
      value={value}
    >
      <BaseSlider.Control className={control}>
        <BaseSlider.Track className={track}>
          <BaseSlider.Indicator className={indicator} />
          {values.map((_, index) => (
            <BaseSlider.Thumb
              aria-label={thumbAriaLabels?.[index] ?? ariaLabel}
              className={thumb}
              index={index}
              key={index}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
