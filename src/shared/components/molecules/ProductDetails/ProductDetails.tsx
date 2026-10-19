import { css } from 'styled-system/css';
import { Card } from '@/shared/components/atoms/Card/Card';
import { VStack } from 'styled-system/jsx';
import type { Promotion } from '@/shared/components/atoms/Badge/PromotionBadge';
import type { ProductGenderOption } from '@/shared/components/atoms/ProductGender/ProductGender';
import { ProductDetailsIdentity } from './ProductDetailsIdentity';
import { ProductDetailsOptions } from './ProductDetailsOptions';
import type { ProductOptionThumbnail } from '@/shared/components/molecules/ProductOptionList/ProductOptionList';
import type { Platform } from '@/shared/lib/device';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

const root = css({ color: 'var(--color-text-primary)' });

export type ProductDetailsProps = {
  activities?: readonly string[];
  colorCount: number;
  gender?: ProductGenderOption;
  name: string;
  optionThumbnails: readonly ProductOptionThumbnail[];
  platform: Platform;
  price: number;
  originalPrice?: number;
  promotion?: Promotion;
  showVariantSummary?: boolean;
  variant: ProductCardVariant;
  widthCount: number;
};

/** Product identity and price summary for product cards. */
export function ProductDetails({
  activities,
  colorCount,
  gender,
  name,
  optionThumbnails,
  platform,
  price,
  originalPrice,
  promotion,
  showVariantSummary = false,
  variant,
  widthCount,
}: ProductDetailsProps) {
  return (
    <Card.Content className={root}>
      <VStack gap="4" alignItems="flex-start" minW="0" w="100%">
        <ProductDetailsIdentity
          promotion={promotion}
          gender={gender}
          name={name}
          price={price}
          originalPrice={originalPrice}
          variant={variant}
        />

        {showVariantSummary && (
          <ProductDetailsOptions
            activities={activities}
            colorCount={colorCount}
            optionThumbnails={optionThumbnails}
            platform={platform}
            widthCount={widthCount}
          />
        )}
      </VStack>
    </Card.Content>
  );
}
