import { Flex } from 'styled-system/jsx';
import { ProductDetailGallery } from '@/shared/features/product/ProductDetailGallery';
import type { Product } from '@/mocks/products';
import { usePlatform } from '@/shared/context/platform';
import { ProductDetailSections } from './ProductDetailSections';

type ProductDetailMediaProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
  product: Product;
};

export function ProductDetailMedia({
  images,
  productName,
  onOpenImage,
  product,
}: ProductDetailMediaProps) {
  const platform = usePlatform();

  return (
    <Flex minW="0" direction="column" gap="96px">
      <ProductDetailGallery onOpenImage={onOpenImage} images={images} productName={productName} />
      {platform === 'web' && <ProductDetailSections product={product} />}
    </Flex>
  );
}
