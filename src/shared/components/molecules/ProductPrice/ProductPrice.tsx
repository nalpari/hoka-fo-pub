import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

const won = (value: number) => value.toLocaleString('ko-KR');

export type ProductPriceProps = {
  /** Current selling price, including any discount. */
  price: number;
  /** Original price; discount details appear only when this exceeds price. */
  originalPrice?: number;
  variant?: ProductCardVariant;
};

/** Product selling price with optional original price and calculated discount. */
export function ProductPrice({ price, originalPrice, variant = 'listing' }: ProductPriceProps) {
  const hasDiscount = originalPrice !== undefined && price >= 0 && originalPrice > price;
  const discountRate = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <VStack data-product-card-variant={variant} gap="1" alignItems="flex-start">
      {hasDiscount ? (
        <Typography
          as="del"
          variant="price"
          tone="tertiary"
          aria-label={`정상가 ${won(originalPrice)}원`}
          className={css({ textDecoration: 'line-through' })}
        >
          {won(originalPrice)}원
        </Typography>
      ) : null}
      <HStack gap="2" alignItems="baseline">
        {hasDiscount ? (
          <Typography variant="price" tone="error" aria-label={`${discountRate}% 할인`}>
            {discountRate}%
          </Typography>
        ) : null}
        <Typography variant="price">
          {won(price)}
          <Typography variant="priceEmphasis">원</Typography>
        </Typography>
      </HStack>
    </VStack>
  );
}
