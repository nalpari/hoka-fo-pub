import { Fragment } from 'react';
import { Divider, HStack } from 'styled-system/jsx';
import { Typography, type TypographyProps } from '@/components/common/atoms/Typography/Typography';

export type Promotion = 'Best' | 'New' | 'Exclusive';

export type Promotions = Promotion | readonly Promotion[];

export type PromotionBadgeProps = {
  className?: string;
  promotion: Promotions;
  weight?: TypographyProps['weight'];
};

/** Brand-colored promotional labels and vertical dividers. */
export function PromotionBadge({ className, promotion, weight }: PromotionBadgeProps) {
  const promotions = typeof promotion === 'string' ? [promotion] : promotion;

  if (promotions.length === 0) return null;

  return (
    <HStack as="span" gap="1" flexWrap="wrap">
      {promotions.map((label, index) => (
        <Fragment key={`${label}-${index}`}>
          {index > 0 && (
            <Divider
              as="span"
              aria-hidden="true"
              orientation="vertical"
              h="3"
              color="var(--color-text-brand)"
            />
          )}
          <Typography variant="body4" weight={weight} tone="brand" className={className}>
            {label}
          </Typography>
        </Fragment>
      ))}
    </HStack>
  );
}
