import type { Product } from '@/mocks/products';
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
    <header>
      <ProductDetailHeaderMeta product={product} />
      <ProductDetailHeaderTitle product={product} />
      <ProductDetailHeaderActions onWishChange={onWishChange} product={product} wish={wish} />
    </header>
  );
}
