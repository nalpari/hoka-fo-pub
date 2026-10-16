import { VStack } from 'styled-system/jsx';
import { PromotionBadge } from '@/shared/components/atoms/Badge/PromotionBadge';
import { ProductGender } from '@/shared/components/atoms/ProductGender/ProductGender';
import { ProductName } from '@/shared/components/molecules/ProductName/ProductName';
import { ProductPrice } from '@/shared/components/molecules/ProductPrice/ProductPrice';
import type { ProductDetailsProps } from './ProductDetails';

type Props = Pick<ProductDetailsProps, 'promotion' | 'gender' | 'name' | 'price' | 'variant'>;

export function ProductDetailsIdentity({ promotion, gender, name, price, variant }: Props) {
  return (
    <VStack gap="1" alignItems="flex-start" minW="0" w="100%">
      {promotion && <PromotionBadge promotion={promotion} />}
      {gender && <ProductGender gender={gender} variant={variant} />}
      <ProductName name={name} variant={variant} />
      <ProductPrice price={price} variant={variant} />
    </VStack>
  );
}
