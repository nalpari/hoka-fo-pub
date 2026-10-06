import type { Product } from '@/mocks/products';
import { css } from 'styled-system/css';
import { Card } from '@/shared/components/atoms/Card/Card';
import { ProductSpec } from '@/shared/components/molecules/ProductSpec/ProductSpec';

const root = css({ display: 'flex', flexDirection: 'column', gap: '2' });

export type ProductCardFooterProps = {
  product: Product;
  showSpecifications: boolean;
};

export function ProductCardFooter({ product, showSpecifications }: ProductCardFooterProps) {
  if (!showSpecifications) return null;

  return (
    <Card.Footer className={root}>
      {showSpecifications && (
        <ProductSpec
          cushioning={product.cushioning}
          stability={product.stability}
          width={product.width}
        />
      )}
    </Card.Footer>
  );
}
