import { cva } from 'styled-system/css';
import type { ProductCardVariant } from '@/components/common/molecules/ProductCard/productCardTypography';
import { Typography } from '@/components/common/atoms/Typography/Typography';

export type ProductGenderOption = "Men's" | "Women's" | 'All Gender';

const genderLabel = cva({
  base: {
    color: 'var(--color-text-primary)',
    '&&': { fontSize: 'var(--layout-web-product-font-size, 16px)' },
  },
  variants: {
    variant: {
      listing: {
        _mobile: {
          fontWeight: 'bold',
          '&&': { fontSize: '14' /* 기존 13px */ },
          lineHeight: 'body',
        },
      },
      showcase: {
        _mobile: {
          '&&': { fontSize: 'var(--home-body-14, var(--font-sizes-14))' },
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

/** 상품 성별 정보를 표시합니다. (Displays a product's gender label.) */
export function ProductGender({ gender, variant = 'listing' }: ProductGenderProps) {
  return (
    <Typography className={genderLabel({ variant })} variant="body3">
      {gender}
    </Typography>
  );
}
