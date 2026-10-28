import { VStack } from 'styled-system/jsx';
import { PromotionBadge } from '@/components/common/atoms/Badge/PromotionBadge';
import { ProductGender } from '@/components/common/atoms/ProductGender/ProductGender';
import { ProductName } from '@/components/common/molecules/ProductName/ProductName';
import { ProductPrice } from '@/components/common/molecules/ProductPrice/ProductPrice';
import type { ProductDetailsProps } from './ProductDetails';

type Props = Pick<
  ProductDetailsProps,
  'promotion' | 'gender' | 'name' | 'price' | 'originalPrice' | 'variant'
>;

export function ProductDetailsIdentity({
  promotion,
  gender,
  name,
  price,
  originalPrice,
  variant,
}: Props) {
  return (
    <VStack
      gap="1"
      _mobile={variant === 'listing' ? { gap: '0' } : undefined}
      alignItems="flex-start"
      minW="0"
      w="100%"
    >
      {promotion && <PromotionBadge promotion={promotion} />}
      {gender && <ProductGender gender={gender} variant={variant} />}
      <ProductName name={name} variant={variant} />
      <ProductPrice price={price} originalPrice={originalPrice} variant={variant} />
    </VStack>
  );
}
