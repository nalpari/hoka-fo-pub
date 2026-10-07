import type { CSSProperties, HTMLAttributes } from 'react';
import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faStarRegular, faStarSolid } from '@/shared/icons/fontAwesome';

const ratingStars = css({
  display: 'inline-flex',
  flexShrink: '0',
  alignItems: 'center',
  color: 'currentColor',
  gap: '1px',
});

export type RatingStarsValue = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type RatingStarsProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
  /** A score from 0 to 5. Values are rounded to the closest half star. */
  value: number;
  size?: CSSProperties['height'];
  color?: CSSProperties['color'];
};

function toRatingValue(value: number): RatingStarsValue {
  return (Math.round(Math.min(Math.max(value, 0), 5) * 2) / 2) as RatingStarsValue;
}

function HalfRatingStar({ size }: Pick<RatingStarsProps, 'size'>) {
  return <Icon aria-hidden="true" name="rating/rating-star-half" size={size} />;
}

/** Five-star rating display using Font Awesome stars and the Figma half-star SVG. */
export function RatingStars({
  value,
  size = '16px',
  color,
  className,
  style,
  'aria-label': ariaLabel,
  ...props
}: RatingStarsProps) {
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
          return <HalfRatingStar key={index} size={size} />;
        }

        const icon = index < filledStars ? faStarSolid : faStarRegular;

        return <Icon aria-hidden="true" fontAwesomeIcon={icon} key={index} size={size} />;
      })}
    </span>
  );
}
