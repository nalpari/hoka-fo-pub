import { Typography, type TypographyProps } from '@/shared/components/atoms/Typography/Typography';
import { cva } from 'styled-system/css';

const badge = cva({
  base: {
    '&&': {
      color: 'var(--color-red-80)',
    },
  },
  variants: {
    exclusive: {
      true: {
        '&&': {
          color: 'var(--color-blue-100)',
        },
      },
      false: {},
    },
  },
});

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
      className={[badge({ exclusive: promotion === 'Exclusive' }), className]
        .filter(Boolean)
        .join(' ')}
    >
      {promotion}
    </Typography>
  );
}
