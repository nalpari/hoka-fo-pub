import { css } from 'styled-system/css';
import { VStack, HStack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type ProductDetailHeaderTitleProps = {
  product: Product;
};

export function ProductDetailHeaderTitle({ product }: ProductDetailHeaderTitleProps) {
  return (
    <>
      <VStack alignItems="start" gap="5">
        <Typography as="h1" className={css({ m: '0' })} variant="productTitle">
          {product.name}
        </Typography>
        <Typography as="p" className={css({ m: '0' })} variant="productPrice">
          <HStack as="span" gap="0" alignItems="end">
            {product.price.toLocaleString('ko-KR')}
            <Typography variant="priceEmphasis">원</Typography>
          </HStack>
        </Typography>
      </VStack>
    </>
  );
}
