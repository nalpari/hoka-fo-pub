import type { Product } from '@/mocks/products';
import { VStack } from 'styled-system/jsx';
import { ProductDetailHeaderActions } from '@/shared/features/product/ProductDetailHeaderActions';
import { ProductDetailHeaderMeta } from '@/shared/features/product/ProductDetailHeaderMeta';
import { ProductDetailHeaderTitle } from '@/shared/features/product/ProductDetailHeaderTitle';

type ProductDetailHeaderProps = {
  product: Product;
  wish: boolean;
  onWishChange: () => void;
};

export function ProductDetailHeader({ product, wish, onWishChange }: ProductDetailHeaderProps) {
  return (
    <VStack as="header" alignItems="start" gap="5" _mobile={{ gap: '6' }}>
      <VStack alignItems="start" gap="5" _mobile={{ gap: '4' }}>
        <ProductDetailHeaderMeta product={product} />
        <ProductDetailHeaderTitle product={product} />
      </VStack>
      <ProductDetailHeaderActions onWishChange={onWishChange} product={product} wish={wish} />
    </VStack>
  );
}
