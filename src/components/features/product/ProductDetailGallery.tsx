'use client';

import { usePlatform } from '@/context/platform';
import { Grid, Box } from 'styled-system/jsx';
import { ProductDetailImage } from '@/components/features/product/ProductDetailImage';
import { css } from 'styled-system/css';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';

type ProductImageGridProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
};

function ProductImageGrid({ images, productName, onOpenImage }: ProductImageGridProps) {
  return (
    <Grid aria-label="상품 이미지" gap="4" gridTemplateColumns="repeat(2, minmax(0, 1fr))">
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

const carouselStyles = {
  dots: css({
    position: 'relative',
    zIndex: '1',
    mt: '-24px',
    pb: '16px',
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
  }),
};

type ProductImageCarouselProps = {
  images: string[];
  productName: string;
};

function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  return (
    <Box as="section" aria-label="상품 이미지" bg="var(--color-black-10)">
      <Carousel itemCount={images.length} loop>
        <CarouselViewport freeMode={false} mobileItemGutter={0} mode="mobile" showScrollbar={false}>
          {images.map((image, index) => (
            <Box w="100%" key={image}>
              <ProductDetailImage alt={`${productName} ${index + 1}`} src={image} />
            </Box>
          ))}
        </CarouselViewport>
        <CarouselPagination className={carouselStyles.dots} label="상품 이미지 선택" />
      </Carousel>
    </Box>
  );
}

type ProductDetailGalleryProps = {
  images: string[];
  productName: string;
  onOpenImage: (index: number) => void;
};

/** 상품 이미지를 그리드 또는 캐러셀로 표시합니다. (Displays product images in a grid or carousel.) */
export function ProductDetailGallery({
  images,
  productName,
  onOpenImage,
}: ProductDetailGalleryProps) {
  const platform = usePlatform();

  if (platform === 'mobile')
    return <ProductImageCarousel images={images} productName={productName} />;

  return <ProductImageGrid onOpenImage={onOpenImage} images={images} productName={productName} />;
}
