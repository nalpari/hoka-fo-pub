import { VStack } from 'styled-system/jsx';
import { ProductActivity } from '@/shared/components/molecules/ProductActivity/ProductActivity';
import { ProductVariantSummary } from '@/shared/components/molecules/ProductVariantSummary/ProductVariantSummary';
import type { ProductDetailsProps } from './ProductDetails';

type Props = Pick<
  ProductDetailsProps,
  'activities' | 'colorCount' | 'optionThumbnails' | 'platform' | 'widthCount'
>;

export function ProductDetailsOptions({
  activities,
  colorCount,
  optionThumbnails,
  platform,
  widthCount,
}: Props) {
  return (
    <VStack gap="0" alignItems="flex-start" minW="0" w="100%">
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
