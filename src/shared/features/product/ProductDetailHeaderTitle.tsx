import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type ProductDetailHeaderTitleProps = {
  product: Product;
};

export function ProductDetailHeaderTitle({ product }: ProductDetailHeaderTitleProps) {
  return (
    <>
      <Typography as="h1" className={css({ mt: '1' })} variant="productTitle">
        {product.name}
      </Typography>
      <Typography as="p" className={css({ mt: '3' })} variant="productPrice">
        {product.price.toLocaleString('ko-KR')}원
      </Typography>
    </>
  );
}
