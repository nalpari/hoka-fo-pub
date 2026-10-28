'use client';

import Link from 'next/link';
import type { Product } from '@/mocks/products';
import { css } from 'styled-system/css';
import { Card } from '@/components/common/atoms/Card/Card';
import {
  ProductThumbnail,
  type ProductThumbnailVariant,
} from '@/components/common/molecules/ProductThumbnail/ProductThumbnail';

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
      <Link href={`/products/${product.id}`}>
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
