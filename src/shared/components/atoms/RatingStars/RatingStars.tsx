import type { CSSProperties, HTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faStarRegular, faStarSolid } from '@/shared/icons/fontAwesome';
import { RatingStarsControl } from './RatingStarsControl';

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

/** Five-star rating display using Font Awesome stars and the Figma half-star SVG. */
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
