import { css } from 'styled-system/css';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { ProductCardVariant } from '@/components/common/molecules/ProductCard/productCardTypography';

const productName = css({
  minW: '0',
  maxW: '100%',
  truncate: true,
  '&[data-product-card-variant="listing"]': { _mobile: { fontWeight: 'bold' } },
});

export type ProductNameProps = {
  name: string;
  variant?: ProductCardVariant;
};

/** Product name styled for its card presentation context. */
export function ProductName({ name, variant = 'listing' }: ProductNameProps) {
  return (
    <Typography as="p" className={productName} data-product-card-variant={variant} variant="body">
      {name}
    </Typography>
  );
}
