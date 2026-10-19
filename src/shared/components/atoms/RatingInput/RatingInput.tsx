'use client';

import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import { css, cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { useFormFieldContext } from '@/shared/components/atoms/FormField/FormField';

const group = css({
  display: 'flex',
  gap: '0',
  '&[aria-invalid="true"]': { outline: '2px solid var(--colors-red-100)', outlineOffset: '2px' },
});

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
  const field = useFormFieldContext();
  return (
    <RadioGroup<RatingValue>
      aria-describedby={field?.describedBy}
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
