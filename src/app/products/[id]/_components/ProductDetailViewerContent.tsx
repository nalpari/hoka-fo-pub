'use client';

import Image from 'next/image';

import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';

import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';

import { ProductDetailImage } from '@/components/product/ProductDetailImage';

type ProductDetailViewerGalleryProps = { images: string[]; productName: string };

const ProductDetailViewerGalleryStyles = {
  carousel: css({ '& .swiper-slide': { w: '100%' } }),
  pagination: css({
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    mt: '5',
  }),
};

function ProductDetailViewerGallery({ images, productName }: ProductDetailViewerGalleryProps) {
  return (
    <Grid minW="0" w="100%" alignContent="start" gap="0">
      <CarouselViewport
        className={ProductDetailViewerGalleryStyles.carousel}
        freeMode={false}
        showScrollbar={false}
      >
        {images.map((image, index) => (
          <Box w="100%" key={image}>
            <ProductDetailImage
              eager={index === 0}
              alt={`${productName} ${index + 1}`}
              src={image}
            />
          </Box>
        ))}
      </CarouselViewport>
      <CarouselPagination
        className={ProductDetailViewerGalleryStyles.pagination}
        label="상품 이미지 선택"
      />
    </Grid>
  );
}

const thumbnails = css({ display: 'flex', flexDirection: 'column', gap: '2', alignSelf: 'start' });

type Props = { images: string[]; initialIndex: number; productName: string };

/** 확대 이미지 선택과 표시를 담당하는 지연 로딩 갤러리입니다. (Displays the deferred gallery for selecting and viewing enlarged images.) */
export default function ProductDetailViewerContent({ images, initialIndex, productName }: Props) {
  return (
    <Carousel initialIndex={initialIndex} itemCount={images.length} loop>
      <Grid gridTemplateColumns="100px minmax(0, 1fr)" alignItems="start" gap="4" pb="10">
        <CarouselPagination
          className={thumbnails}
          label="상품 이미지 미리보기"
          renderItem={(index, isActive, select) => (
            <button
              aria-label={`${index + 1}번 이미지 선택`}
              aria-pressed={isActive}
              key={images[index]}
              onClick={() => select(index)}
              type="button"
              className={css({
                pos: 'relative',
                w: '100px',
                p: '0',
                overflow: 'hidden',
                border: 'none',
                bg: 'var(--color-black-10)',
                cursor: 'pointer',
                '&[aria-pressed="true"]': {
                  _after: {
                    content: '""',
                    pos: 'absolute',
                    inset: '0',
                    bg: 'rgb(0 0 0 / 15%)',
                    pointerEvents: 'none',
                  },
                },
              })}
            >
              <Image
                width={88}
                height={88}
                sizes="88px"
                alt=""
                src={images[index]}
                className={css({ display: 'block', w: '100%', h: 'auto' })}
              />
            </button>
          )}
        />
        <ProductDetailViewerGallery images={images} productName={productName} />
      </Grid>
    </Carousel>
  );
}
