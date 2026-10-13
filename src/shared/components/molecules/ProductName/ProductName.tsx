import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

const productName = css({ minW: '0', maxW: '100%', truncate: true });

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
