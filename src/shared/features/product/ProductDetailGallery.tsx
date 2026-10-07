'use client';

import { usePlatform } from '@/shared/context/platform';
import { ProductDetailDesktopGallery } from '@/shared/features/product/ProductDetailDesktopGallery';
import { ProductDetailMobileGallery } from '@/shared/features/product/ProductDetailMobileGallery';

type ProductDetailGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductDetailGallery({ images, productName }: ProductDetailGalleryProps) {
  const platform = usePlatform();

  if (platform === 'mobile')
    return <ProductDetailMobileGallery images={images} productName={productName} />;

  return <ProductDetailDesktopGallery images={images} productName={productName} />;
}
