import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';

type ProductDetailHeaderTitleProps = {
  product: Product;
};

export function ProductDetailHeaderTitle({ product }: ProductDetailHeaderTitleProps) {
  return (
    <ContentHeader
      alignItems="start"
      gap="5"
      titleAs="h1"
      title={product.name}
      titleProps={{ className: css({ m: '0' }), variant: 'productTitle' }}
      description={
        <HStack as="span" gap="0" alignItems="end">
          {product.price.toLocaleString('ko-KR')}
          <Typography variant="priceEmphasis">원</Typography>
        </HStack>
      }
      descriptionProps={{ className: css({ m: '0' }), variant: 'productPrice' }}
    />
  );
}
