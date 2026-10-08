import { css } from 'styled-system/css';
import { VStack, Box, HStack } from 'styled-system/jsx';
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
          <HStack gap="0" alignItems="end">
            {product.price.toLocaleString('ko-KR')}
            <Box className={css({ fontWeight: 'bold' })}>원</Box>
          </HStack>
        </Typography>
      </VStack>
    </>
  );
}
