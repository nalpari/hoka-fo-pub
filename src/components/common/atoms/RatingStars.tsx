'use client';

import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import { type CSSProperties, type HTMLAttributes } from 'react';

import { css } from 'styled-system/css';

import { useFormFieldContext } from '@/components/common/atoms/FormField';
import { Icon } from '@/components/common/atoms/Icon';

import { faStarRegular, faStarSolid } from '@/icons/fontAwesome';
import type {
  RatingStarsSelectionProps as ImportedRatingStarsSelectionProps,
  RatingValue as ImportedRatingValue,
} from '@/types/component-contracts/components-common-atoms-RatingStars-RatingStars';

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
function RatingStarsControl({
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
}: ImportedRatingStarsSelectionProps) {
  const field = useFormFieldContext();

  return (
    <RadioGroup<ImportedRatingValue>
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

const ratingStars = css({
  display: 'inline-flex',
  flexShrink: '0',
  alignItems: 'center',
  color: 'currentColor',
  gap: '1px',
});

export type RatingStarsValue = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

type RatingStarsBaseProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'defaultValue'> & {
  size?: CSSProperties['height'];
  color?: CSSProperties['color'];
};

export type RatingStarsSelectionProps = RatingStarsBaseProps & {
  /** Zero represents an unanswered question; selection uses whole stars. */
  value: RatingValue;
  ariaLabel: string;
  onValueChange: (value: RatingValue) => void;
  disabled?: boolean;
  name?: string;
};

export type RatingStarsProps =
  | (RatingStarsBaseProps & {
      /** Display values are rounded to the closest half star. */
      value: number;
      onValueChange?: never;
      ariaLabel?: never;
      disabled?: never;
      name?: never;
    })
  | RatingStarsSelectionProps;

function toRatingValue(value: number): RatingStarsValue {
  return (Math.round(Math.min(Math.max(value, 0), 5) * 2) / 2) as RatingStarsValue;
}

function HalfRatingStar({ size }: Pick<RatingStarsProps, 'size'>) {
  return <Icon aria-hidden="true" name="rating/rating-star-half" size={size} />;
}

/** 별점 표시와 선택 모드를 제공합니다 (Five-star rating display using Font Awesome stars and the Figma half-star SVG). */
export function RatingStars({
  value,
  size,
  color,
  className,
  style,
  'aria-label': ariaLabel,
  ariaLabel: selectionLabel,
  onValueChange,
  disabled,
  name,
  ...props
}: RatingStarsProps) {
  if (onValueChange) {
    return (
      <RatingStarsControl
        {...props}
        value={value}
        ariaLabel={selectionLabel}
        aria-label={ariaLabel}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        size={size}
        color={color}
        className={className}
        style={style}
      />
    );
  }

  const resolvedSize = size ?? '16px';
  const roundedValue = toRatingValue(value);
  const filledStars = Math.floor(roundedValue);
  const hasHalfStar = roundedValue % 1 !== 0;

  return (
    <span
      {...props}
      aria-label={ariaLabel ?? `${roundedValue} out of 5 stars`}
      className={[ratingStars, className].filter(Boolean).join(' ')}
      role="img"
      style={{ color, ...style }}
    >
      {Array.from({ length: 5 }, (_, index) => {
        if (index === filledStars && hasHalfStar) {
          return <HalfRatingStar key={index} size={resolvedSize} />;
        }

        const icon = index < filledStars ? faStarSolid : faStarRegular;

        return <Icon aria-hidden="true" fontAwesomeIcon={icon} key={index} size={resolvedSize} />;
      })}
    </span>
  );
}
