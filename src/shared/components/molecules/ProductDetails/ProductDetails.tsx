import { cva } from 'styled-system/css';
import { Card } from '@/shared/components/atoms/Card/Card';
import { VStack } from 'styled-system/jsx';
import type { Promotions } from '@/shared/components/atoms/Badge/PromotionBadge';
import type { ProductGenderOption } from '@/shared/components/atoms/ProductGender/ProductGender';
import { ProductDetailsIdentity } from './ProductDetailsIdentity';
import { ProductDetailsOptions } from './ProductDetailsOptions';
import type { ProductOptionThumbnail } from '@/shared/components/molecules/ProductOptionList/ProductOptionList';
import type { Platform } from '@/shared/lib/device';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

const root = cva({
  base: {
    color: 'var(--color-text-primary)',
    '--type-body-font-size': 'var(--layout-web-product-font-size, 16px)',
    '--type-price-font-size': 'var(--layout-web-product-font-size, 16px)',
    '--type-product-audience-font-size': 'var(--layout-web-product-font-size, 16px)',
  },
  variants: {
    variant: {
      listing: {
        _mobile: {
          px: '10px',
          '--type-price-font-weight': '700',
          '--type-price-emphasis-font-weight': '700',
        },
      },
      showcase: {},
    },
  },
});

export type ProductDetailsProps = {
  activities?: readonly string[];
  colorCount: number;
  gender?: ProductGenderOption;
  name: string;
  optionThumbnails: readonly ProductOptionThumbnail[];
  platform: Platform;
  price: number;
  originalPrice?: number;
  promotion?: Promotions;
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
    <Card.Content className={root({ variant })}>
      <VStack
        gap="4"
        _mobile={variant === 'listing' ? { gap: '2' } : undefined}
        alignItems="flex-start"
        minW="0"
        w="100%"
      >
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
            variant={variant}
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
