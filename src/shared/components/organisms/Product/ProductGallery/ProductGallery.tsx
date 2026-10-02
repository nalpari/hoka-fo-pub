'use client';

import { css, cva } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';

type ProductGalleryProps = {
  images: string[];
  colorVariants: { id: string; image: string; name: string; selected: boolean }[];
  onOpen: (image: string) => void;
};

const thumbnail = cva({
  base: {
    display: 'flex',
    flex: '0 0 72px',
    alignItems: 'center',
    justifyContent: 'center',
    w: '72px',
    h: '72px',
    p: '0',
    overflow: 'hidden',
    border: '1px solid #ddd',
    bg: '#f2f2f2',
    cursor: 'pointer',
  },
  variants: {
    active: {
      true: { borderColor: '#0082ca', boxShadow: 'inset 0 -3px #0082ca' },
      false: {},
    },
  },
});

const thumbnailRail = css({
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '2',
  mt: '2',
  w: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
});

const galleryFrame = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '100%',
  h: { base: '560px', _mobile: 'auto' },
  aspectRatio: { base: 'auto', _mobile: '1' },
  overflow: 'hidden',
  p: '0',
  border: '0',
  bg: '#eee',
  color: '#777',
  fontSize: '24px',
  fontFamily: 'inherit',
  textAlign: 'center',
  appearance: 'none',
  cursor: 'pointer',
  '& small': { position: 'absolute', right: '5', bottom: '5', fontSize: '12px' },
});

const galleryViewport = css({ '& .swiper-slide': { w: '100%' } });

const galleryImage = css({
  display: 'block',
  w: '100%',
  h: '100%',
  objectFit: 'contain',
});

const thumbnailImage = css({ display: 'block', w: '100%', h: '100%', objectFit: 'contain' });

export function ProductGallery({ images, colorVariants, onOpen }: ProductGalleryProps) {
  return (
    <Box w="100%" minW="0">
      <Carousel itemCount={images.length}>
        <CarouselViewport
          className={galleryViewport}
          mobileItemGutter={0}
          mode="mobile"
          showScrollbar={false}
        >
          {images.map((image, index) => (
            <button
              aria-label={`상품 이미지 ${index + 1} 확대`}
              className={galleryFrame}
              key={`${image}-${index}`}
              onClick={() => onOpen(image)}
              type="button"
            >
              <img alt={`상품 이미지 ${index + 1}`} className={galleryImage} src={image} />
              <small>이미지 확대</small>
            </button>
          ))}
        </CarouselViewport>
        <CarouselPagination />
        <div aria-label="같은 컬렉션의 다른 상품" className={thumbnailRail} role="group">
          {colorVariants.map((variant) => (
            <Link
              aria-current={variant.selected ? 'page' : undefined}
              aria-label={`${variant.name} 상품 보기`}
              className={thumbnail({ active: variant.selected })}
              key={variant.id}
              title={variant.name}
              to={`/products/${variant.id}`}
            >
              <img alt="" aria-hidden="true" className={thumbnailImage} src={variant.image} />
            </Link>
          ))}
        </div>
      </Carousel>
      <Stack mt="16" gap="4" aria-label="상품 상세 이미지">
        <Box
          minH="680px"
          display="grid"
          placeItems="center"
          bg="#f2f2f2"
          color="#999"
          fontSize="14px"
          letterSpacing="0.08em"
        >
          PRODUCT DETAIL IMAGE
        </Box>
        <Box
          minH="680px"
          display="grid"
          placeItems="center"
          bg="#f2f2f2"
          color="#999"
          fontSize="14px"
          letterSpacing="0.08em"
        >
          PRODUCT DETAIL IMAGE
        </Box>
      </Stack>
    </Box>
  );
}
