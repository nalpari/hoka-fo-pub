import { cva } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

export type ProductGenderOption = "Men's" | "Women's" | 'All Gender';

const genderLabel = cva({
  base: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '130%',
    color: '#000000',
  },
  variants: {
    variant: {
      listing: {
        _mobile: {
          fontWeight: '500',
          fontSize: '13px',
          lineHeight: '140%',
        },
      },
      showcase: {
        _mobile: {
          fontSize: '14px',
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
    <Flex as="span" className={genderLabel({ variant })}>
      {gender}
    </Flex>
  );
}
