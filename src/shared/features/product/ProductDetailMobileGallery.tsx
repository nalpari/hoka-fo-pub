import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';
import { ProductDetailImage } from '@/shared/features/product/ProductDetailImage';

const styles = {
  slide: css({
    w: '100%',
    '& img': { w: '100%', h: 'auto' },
  }),
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
            <div className={styles.slide} key={image}>
              <ProductDetailImage alt={`${productName} ${index + 1}`} src={image} />
            </div>
          ))}
        </CarouselViewport>
        <CarouselPagination className={styles.dots} label="상품 이미지 선택" />
      </Carousel>
    </Box>
  );
}
