import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';

type ProductDetailHeaderTitleProps = {
  product: Product;
};

/** 상품 상세의 상품명과 가격을 표시합니다. (Displays the product name and price on the product detail page.) */
export function ProductDetailHeaderTitle({ product }: ProductDetailHeaderTitleProps) {
  return (
    <ContentHeader
      alignItems="start"
      gap="5"
      titleAs="h1"
      title={product.name}
      titleProps={{
        className: css({ m: '0' }),
        variant: 'heading7',
        mo: 'heading4',
        weight: 'black',
      }}
      description={
        <HStack as="span" gap="0" alignItems="end">
          {product.price.toLocaleString('ko-KR')}
          <Typography variant="body3" weight="bold">원</Typography>
        </HStack>
      }
      descriptionProps={{ className: css({ m: '0' }), variant: 'body3', weight: 'medium' }}
    />
  );
}
