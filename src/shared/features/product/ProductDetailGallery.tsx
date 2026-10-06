'use client';

import { css } from 'styled-system/css';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';

const styles = {
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '2',
    _mobile: { display: 'none' },
  }),
  image: css({
    display: 'block',
    w: '100%',
    aspectRatio: '1',
    objectFit: 'cover',
    bg: '#f7f7f9',
  }),
  mobile: css({ display: 'none', _mobile: { display: 'block', bg: '#f7f7f9' } }),
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

type ProductDetailGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductDetailGallery({ images, productName }: ProductDetailGalleryProps) {
  return (
    <>
      <section aria-label="상품 이미지" className={styles.grid}>
        {images.map((image, index) => (
          <img
            alt={`${productName} ${index + 1}`}
            className={styles.image}
            key={image}
            src={image}
          />
        ))}
      </section>
      <section aria-label="상품 이미지" className={styles.mobile}>
        <Carousel itemCount={images.length}>
          <CarouselViewport mobileItemGutter={0} mode="mobile" showScrollbar={false}>
            {images.map((image, index) => (
              <div className={styles.slide} key={image}>
                <img alt={`${productName} ${index + 1}`} src={image} />
              </div>
            ))}
          </CarouselViewport>
          <CarouselPagination className={styles.dots} label="상품 이미지 선택" />
        </Carousel>
      </section>
    </>
  );
}
