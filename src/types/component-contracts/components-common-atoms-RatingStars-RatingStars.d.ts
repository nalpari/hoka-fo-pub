// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type RatingStarsSelectionProps as ImportedRatingStarsSelectionProps } from '@/components/common/atoms/RatingStars/RatingStars';
import { type CSSProperties, type HTMLAttributes } from 'react';
/** Internal interactive mode; display-only stars keep their existing rendering. */
declare function RatingStarsControl({
  value,
  onValueChange,
  ariaLabel,
  size,
  color,
  disabled,
  name,
  className,
  style,
  'aria-describedby': describedBy,
  'aria-label': label,
  ...props
}: ImportedRatingStarsSelectionProps): import('react').JSX.Element;
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
/** Five-star rating display using Font Awesome stars and the Figma half-star SVG. */
export declare function RatingStars({
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
}: RatingStarsProps): import('react').JSX.Element;
export { RatingStarsControl };
