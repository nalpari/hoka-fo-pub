'use client';

import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import { css } from 'styled-system/css';
import { useFormFieldContext } from '@/shared/components/atoms/FormField/FormField';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faStarRegular, faStarSolid } from '@/shared/icons/fontAwesome';
import type { RatingStarsSelectionProps, RatingValue } from './RatingStars';

const group = css({
  display: 'inline-flex',
  gap: '0',
  '&[aria-invalid="true"]': { outline: '2px solid var(--colors-red-100)', outlineOffset: '2px' },
});

const star = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minW: '34px',
  minH: '34px',
  border: '0',
  p: '0',
  bg: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  _focusVisible: { outline: '2px solid var(--color-black-100)', outlineOffset: '2px' },
  _disabled: { cursor: 'not-allowed' },
});

const values = [1, 2, 3, 4, 5] as const;

/** Internal interactive mode; display-only stars keep their existing rendering. */
export function RatingStarsControl({
  value,
  onValueChange,
  ariaLabel,
  size = '24px',
  color,
  disabled,
  name,
  className,
  style,
  'aria-describedby': describedBy,
  'aria-label': label,
  ...props
}: RatingStarsSelectionProps) {
  const field = useFormFieldContext();

  return (
    <RadioGroup<RatingValue>
      {...props}
      aria-describedby={[describedBy, field?.describedBy].filter(Boolean).join(' ') || undefined}
      aria-invalid={field?.invalid || props['aria-invalid'] || undefined}
      aria-label={label ?? ariaLabel}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled ?? field?.disabled}
      name={name}
      className={[group, className].filter(Boolean).join(' ')}
      style={{ color, ...style }}
    >
      {values.map((rating) => (
        <Radio.Root
          key={rating}
          value={rating}
          nativeButton
          aria-label={`${rating}점`}
          className={star}
          render={<button type="button" />}
        >
          <Icon
            aria-hidden="true"
            fontAwesomeIcon={rating <= value ? faStarSolid : faStarRegular}
            size={size}
          />
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
