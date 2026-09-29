import { cva, css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

const won = (value: number) => value.toLocaleString('ko-KR');

const priceLabel = cva({
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

const currency = cva({
  base: {
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '130%',
    letterSpacing: '-0.02em',
  },
  variants: {
    variant: {
      listing: {
        _mobile: {
          fontSize: '13px',
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

export type ProductPriceProps = {
  price: number;
  variant?: ProductCardVariant;
};

/** Product price stack, ready for future discount and original-price details. */
export function ProductPrice({ price, variant = 'listing' }: ProductPriceProps) {
  return (
    <VStack className={priceLabel({ variant })}>
      <span>
        {won(price)}
        <span className={currency({ variant })}>원</span>
      </span>
    </VStack>
  );
}
