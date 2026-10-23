import { Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { usePlatform } from '@/shared/context/platform';
import { ProductDetailRecommend } from './ProductDetailRecommend';

/** Owns the recommendation regions' leading space, common interval, and platform visibility. */
export function ProductDetailRecommendations({ products }: { products: Product[] }) {
  const platform = usePlatform();

  return (
    <Stack mt="24" gap="24" _mobile={{ mt: '10' }}>
      <ProductDetailRecommend products={products} />
      {platform === 'web' && (
        <ProductDetailRecommend products={products} title="다른 고객이 함께 본 상품" />
      )}
    </Stack>
  );
}
