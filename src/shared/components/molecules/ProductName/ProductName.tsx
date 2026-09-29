import { cva } from 'styled-system/css';
import { Card } from '@/shared/components/atoms/Card/Card';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

const productName = cva({
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

export type ProductNameProps = {
  name: string;
  variant?: ProductCardVariant;
};

/** Product name styled for its card presentation context. */
export function ProductName({ name, variant = 'listing' }: ProductNameProps) {
  return (
    <Card.Title as="p" className={productName({ variant })}>
      {name}
    </Card.Title>
  );
}
