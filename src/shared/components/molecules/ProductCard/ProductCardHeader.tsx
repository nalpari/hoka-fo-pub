import { Link } from 'react-router-dom';
import type { Product } from '@/mocks/products';
import { css } from 'styled-system/css';
import { Card } from '@/shared/components/atoms/Card/Card';
import {
  ProductThumbnail,
  type ProductThumbnailVariant,
} from '@/shared/components/molecules/ProductThumbnail/ProductThumbnail';

const root = css({
  '& > a': { display: 'block' },
});

export type ProductCardHeaderProps = {
  product: Product;
  variant: ProductThumbnailVariant;
};

export function ProductCardHeader({ product, variant }: ProductCardHeaderProps) {
  return (
    <Card.Header className={root}>
      <Link to={`/products/${product.id}`}>
        <ProductThumbnail
          alt={product.name}
          hover
          hoverImage={product.hoverImage}
          lazy
          src={product.primaryImage}
          variant={variant}
        />
      </Link>
    </Card.Header>
  );
}
