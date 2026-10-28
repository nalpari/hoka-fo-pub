import type { Product } from '@/mocks/products';
import { usePlatform } from '@/context/platform';
import { ProductDetailRecommendations } from './ProductDetailRecommendations';
import { ProductPurchaseActions } from './ProductPurchaseActions';

type Props = {
  recommendations: Product[];
  onAddToCart: () => void;
  onOrder: () => void;
};

/** Composes recommendations and the mobile fixed purchase controls without extra DOM. */
export function ProductDetailFooter({ recommendations, onAddToCart, onOrder }: Props) {
  const platform = usePlatform();

  return (
    <>
      <ProductDetailRecommendations products={recommendations} />
      {platform === 'mobile' && (
        <ProductPurchaseActions onAddToCart={onAddToCart} onOrder={onOrder} placement="fixed" />
      )}
    </>
  );
}
