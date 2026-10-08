import { cva } from 'styled-system/css';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type ProductGenderOption = "Men's" | "Women's" | 'All Gender';

const genderLabel = cva({
  base: {
    color: 'var(--color-text-primary)',
  },
  variants: {
    variant: {
      listing: {
        _mobile: {
          fontWeight: 'medium',
          fontSize: '14' /* 기존 13px */,
          lineHeight: 'body',
        },
      },
      showcase: {
        _mobile: {
          fontSize: '14',
        },
      },
    },
  },
  defaultVariants: { variant: 'listing' },
});

export type ProductGenderProps = {
  gender: ProductGenderOption;
  variant?: ProductCardVariant;
};

/** Product audience label. */
export function ProductGender({ gender, variant = 'listing' }: ProductGenderProps) {
  return (
    <Typography as="span" className={genderLabel({ variant })} variant="productAudience">
      {gender}
    </Typography>
  );
}
