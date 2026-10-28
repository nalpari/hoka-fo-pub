import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { ProductDetailImage } from '@/components/features/product/ProductDetailImage';

const styles = {
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

type ProductDetailMobileGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductDetailMobileGallery({
  images,
  productName,
}: ProductDetailMobileGalleryProps) {
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
        <CarouselPagination className={styles.dots} label="상품 이미지 선택" />
      </Carousel>
    </Box>
  );
}
