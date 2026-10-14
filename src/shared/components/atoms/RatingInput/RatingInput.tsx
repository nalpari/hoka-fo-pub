'use client';

import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import { css, cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const group = css({ display: 'flex', gap: '0' });

// The star is an icon glyph. Retain the review control's existing Button presentation.
const star = cva({
  base: {
    minW: '34px',
    border: '0',
    bg: 'transparent',
    px: '0',
    color: 'var(--color-black-40)',
    fontSize: '24',
  },
  variants: { selected: { true: { color: 'var(--color-text-primary)' }, false: {} } },
});

const values = [1, 2, 3, 4, 5] as const;

export type RatingValue = 0 | (typeof values)[number];

export type RatingInputProps = {
  ariaLabel: string;
  value: RatingValue;
  onValueChange: (value: RatingValue) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
};

/** Controlled five-point rating; zero represents an unanswered question. */
export function RatingInput({
  ariaLabel,
  value,
  onValueChange,
  disabled,
  name,
  className,
}: RatingInputProps) {
  return (
    <RadioGroup<RatingValue>
      aria-label={ariaLabel}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
      className={[group, className].filter(Boolean).join(' ')}
    >
      {values.map((rating) => (
        <Radio.Root
          key={rating}
          value={rating}
          nativeButton
          aria-label={`${rating}점`}
          render={<Button type="button" className={star({ selected: rating <= value })} />}
        >
          ★
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
