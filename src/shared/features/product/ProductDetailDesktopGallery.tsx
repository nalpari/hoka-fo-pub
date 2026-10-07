import { useState } from 'react';
import { Grid } from 'styled-system/jsx';
import { ProductDetailImage } from '@/shared/features/product/ProductDetailImage';
import { ProductDetailImageViewer } from '@/shared/features/product/ProductDetailImageViewer';

type ProductDetailDesktopGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductDetailDesktopGallery({
  images,
  productName,
}: ProductDetailDesktopGalleryProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <>
      <Grid aria-label="상품 이미지" gap="2" gridTemplateColumns="repeat(2, minmax(0, 1fr))">
        {images.map((image, index) => (
          <ProductDetailImage
            alt={`${productName} ${index + 1}`}
            key={image}
            onClick={() => setViewerIndex(index)}
            src={image}
          />
        ))}
      </Grid>
      {viewerIndex !== null && (
        <ProductDetailImageViewer
          images={images}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
          productName={productName}
        />
      )}
    </>
  );
}
