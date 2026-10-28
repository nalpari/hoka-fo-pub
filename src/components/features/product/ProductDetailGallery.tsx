'use client';

import { usePlatform } from '@/context/platform';
import { ProductDetailDesktopGallery } from '@/components/features/product/ProductDetailDesktopGallery';
import { ProductDetailMobileGallery } from '@/components/features/product/ProductDetailMobileGallery';

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
