'use client';

import { usePlatform } from '@/shared/context/platform';
import { ProductDetailDesktopGallery } from '@/shared/features/product/ProductDetailDesktopGallery';
import { ProductDetailMobileGallery } from '@/shared/features/product/ProductDetailMobileGallery';

type ProductDetailGalleryProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
};

export function ProductDetailGallery({
  images,
  productName,
  onOpenImage,
}: ProductDetailGalleryProps) {
  const platform = usePlatform();

  if (platform === 'mobile')
    return <ProductDetailMobileGallery images={images} productName={productName} />;

  return (
    <ProductDetailDesktopGallery
      onOpenImage={onOpenImage}
      images={images}
      productName={productName}
    />
  );
}
