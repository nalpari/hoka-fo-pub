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

/** 판매가와 선택적 정상가·할인율을 표시합니다. (Displays the selling price with an optional original price and discount rate.) */
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
          variant="body3"
          mo="body4"
          tone="tertiary"
          aria-label={`정상가 ${won(originalPrice)}원`}
          className={css({ textDecoration: 'line-through' })}
        >
          {won(originalPrice)}원
        </Typography>
      ) : null}
      <HStack gap="2" alignItems="baseline">
        {hasDiscount ? (
          <Typography variant="body3" mo="body4" tone="error" aria-label={`${discountRate}% 할인`}>
            {discountRate}%
          </Typography>
        ) : null}
        <Typography variant="body3" mo="body4">
          {won(price)}
          <Typography variant="body3" weight="bold">원</Typography>
        </Typography>
      </HStack>
    </VStack>
  );
}
