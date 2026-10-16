import { Flex } from 'styled-system/jsx';
import { ProductDetailGallery } from '@/shared/features/product/ProductDetailGallery';
import { ProductDetailSupportRegion } from './ProductDetailSupportRegion';

type ProductDetailMediaProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
};

export function ProductDetailMedia({ images, productName, onOpenImage }: ProductDetailMediaProps) {
  return (
    <Flex minW="0" direction="column" gap="96px">
      <ProductDetailGallery onOpenImage={onOpenImage} images={images} productName={productName} />
      <ProductDetailSupportRegion platform="web" />
    </Flex>
  );
}
