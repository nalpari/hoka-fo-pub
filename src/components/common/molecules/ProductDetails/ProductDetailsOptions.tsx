import { VStack } from 'styled-system/jsx';
import { ProductActivity } from '@/components/common/molecules/ProductActivity/ProductActivity';
import { ProductVariantSummary } from '@/components/common/molecules/ProductVariantSummary/ProductVariantSummary';
import type { ProductDetailsProps } from './ProductDetails';

type Props = Pick<
  ProductDetailsProps,
  'activities' | 'colorCount' | 'optionThumbnails' | 'platform' | 'widthCount' | 'variant'
>;

export function ProductDetailsOptions({
  activities,
  colorCount,
  optionThumbnails,
  platform,
  widthCount,
  variant,
}: Props) {
  return (
    <VStack
      gap="0"
      _mobile={variant === 'listing' ? { gap: '1.5' } : undefined}
      alignItems="flex-start"
      minW="0"
      w="100%"
    >
      {activities && activities.length > 0 && <ProductActivity activities={activities} />}
      <ProductVariantSummary
        colorCount={colorCount}
        options={optionThumbnails}
        platform={platform}
        widthCount={widthCount}
      />
    </VStack>
  );
}
