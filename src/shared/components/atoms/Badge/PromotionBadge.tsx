import { Typography, type TypographyProps } from '@/shared/components/atoms/Typography/Typography';

export type Promotion = 'Best' | 'New' | 'Exclusive';

export type PromotionBadgeProps = {
  className?: string;
  promotion: Promotion;
  weight?: TypographyProps['weight'];
};

/** Promotional label that highlights exclusive items in the brand color. */
export function PromotionBadge({ className, promotion, weight }: PromotionBadgeProps) {
  return (
    <Typography
      variant="body4"
      weight={weight}
      tone={promotion === 'Exclusive' ? 'brand' : 'red80'}
      className={className}
    >
      {promotion}
    </Typography>
  );
}
