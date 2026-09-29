import { css } from 'styled-system/css';
import { Card } from '@/shared/components/atoms/Card/Card';
import { VStack } from 'styled-system/jsx';
import { PromotionBadge, type Promotion } from '@/shared/components/atoms/Badge/PromotionBadge';
import {
  ProductGender,
  type ProductGenderOption,
} from '@/shared/components/atoms/ProductGender/ProductGender';
import { ProductPrice } from '@/shared/components/molecules/ProductPrice/ProductPrice';
import { ProductName } from '@/shared/components/molecules/ProductName/ProductName';
import { ProductActivity } from '@/shared/components/molecules/ProductActivity/ProductActivity';
import { ProductVariantSummary } from '@/shared/components/molecules/ProductVariantSummary/ProductVariantSummary';
import type { ProductOptionThumbnail } from '@/shared/components/molecules/ProductOptionList/ProductOptionList';
import type { Platform } from '@/shared/lib/device';
import type { ProductCardVariant } from '@/shared/components/molecules/ProductCard/productCardTypography';

const root = css({
  fontWeight: '400',
  lineHeight: '130%',
  letterSpacing: '-0.02em',
  color: '#000000',
});

const details = css({
  fontSize: '16px',
});

export type ProductDetailsProps = {
  activities?: readonly string[];
  colorCount: number;
  gender?: ProductGenderOption;
  name: string;
  optionThumbnails: readonly ProductOptionThumbnail[];
  platform: Platform;
  price: number;
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
  promotion,
  showVariantSummary = false,
  variant,
  widthCount,
}: ProductDetailsProps) {
  return (
    <Card.Content className={root}>
      <VStack gap="16px" alignItems="flex-start">
        <VStack gap="12px" alignItems="flex-start" className={details}>
          {promotion && <PromotionBadge promotion={promotion} />}
          {gender && <ProductGender gender={gender} variant={variant} />}
          <ProductName name={name} variant={variant} />
          <ProductPrice price={price} variant={variant} />
        </VStack>

        {showVariantSummary && (
          <VStack gap="12px" alignItems="flex-start">
            {activities && activities.length > 0 && <ProductActivity activities={activities} />}
            <ProductVariantSummary
              colorCount={colorCount}
              options={optionThumbnails}
              platform={platform}
              widthCount={widthCount}
            />
          </VStack>
        )}
      </VStack>
    </Card.Content>
  );
}
