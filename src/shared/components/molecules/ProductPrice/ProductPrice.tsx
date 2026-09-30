import { VStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

const won = (value: number) => value.toLocaleString('ko-KR');

export type ProductPriceProps = {
  price: number;
  variant?: ProductCardVariant;
};

/** Product price stack, ready for future discount and original-price details. */
export function ProductPrice({ price, variant = 'listing' }: ProductPriceProps) {
  return (
    <VStack data-product-card-variant={variant}>
      <Typography variant="price">
        {won(price)}
        <Typography variant="priceEmphasis">원</Typography>
      </Typography>
    </VStack>
  );
}
