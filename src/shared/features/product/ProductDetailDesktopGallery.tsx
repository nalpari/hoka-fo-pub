import { Grid } from 'styled-system/jsx';
import { ProductDetailImage } from '@/shared/features/product/ProductDetailImage';

type ProductDetailDesktopGalleryProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
};

export function ProductDetailDesktopGallery({
  images,
  productName,
  onOpenImage,
}: ProductDetailDesktopGalleryProps) {
  return (
    <Grid aria-label="상품 이미지" gap="2" gridTemplateColumns="repeat(2, minmax(0, 1fr))">
      {images.map((image, index) => (
        <ProductDetailImage
          alt={`${productName} ${index + 1}`}
          key={image}
          onClick={() => onOpenImage(index)}
          src={image}
        />
      ))}
    </Grid>
  );
}
