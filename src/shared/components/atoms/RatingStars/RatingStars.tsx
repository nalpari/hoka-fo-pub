import type { CSSProperties, HTMLAttributes } from 'react';
import { css } from 'styled-system/css';

const ratingStars = css({
  display: 'inline-block',
  flexShrink: '0',
  width: 'calc(var(--rating-stars-height) * 6)',
  height: 'var(--rating-stars-height)',
  backgroundColor: 'currentColor',
  maskImage: 'var(--rating-stars-mask)',
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: 'contain',
  WebkitMaskImage: 'var(--rating-stars-mask)',
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: 'contain',
});

const ratingAssetByValue = {
  0.5: 'rating-stars-0-5.svg',
  1: 'rating-stars-1.svg',
  1.5: 'rating-stars-1-5.svg',
  2: 'rating-stars-2.svg',
  2.5: 'rating-stars-2-5.svg',
  3: 'rating-stars-3.svg',
  3.5: 'rating-stars-3-5.svg',
  4: 'rating-stars-4.svg',
  4.5: 'rating-stars-4-5.svg',
  5: 'rating-stars-5.svg',
} as const;

export type RatingStarsValue = keyof typeof ratingAssetByValue;

export type RatingStarsProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
  /** A score from 0.5 to 5. Values are rendered at the closest half-star asset. */
  value: number;
  size?: CSSProperties['height'];
  color?: CSSProperties['color'];
};

function toRatingAssetValue(value: number): RatingStarsValue {
  const clampedValue = Math.min(Math.max(value, 0.5), 5);

  return (Math.round(clampedValue * 2) / 2) as RatingStarsValue;
}

export function RatingStars({
  value,
  size = '16px',
  color,
  className,
  style,
  'aria-label': ariaLabel,
  ...props
}: RatingStarsProps) {
  const roundedValue = toRatingAssetValue(value);

  return (
    <span
      {...props}
      aria-label={ariaLabel ?? `${roundedValue} out of 5 stars`}
      className={[ratingStars, className].filter(Boolean).join(' ')}
      role="img"
      style={
        {
          '--rating-stars-height': size,
          '--rating-stars-mask': `url(/images/icon/rating/${ratingAssetByValue[roundedValue]})`,
          color,
          ...style,
        } as CSSProperties
      }
    />
  );
}
