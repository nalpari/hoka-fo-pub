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
    aspectRatio: '1',
    '& img': { w: '100%', h: '100%', objectFit: 'cover' },
  }),
  dots: css({
    position: 'relative',
    zIndex: '1',
    mt: '-24px',
    pb: '16px',
    '& button': { w: '7px', h: '7px', borderRadius: '50%', bg: '#bbb' },
    '& button[aria-pressed="true"]': { w: '28px', bg: '#000' },
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
    <Box as="section" aria-label="상품 이미지" bg="#f7f7f9">
      <Carousel itemCount={images.length}>
        <CarouselViewport mobileItemGutter={0} mode="mobile" showScrollbar={false}>
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
