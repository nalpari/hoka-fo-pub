'use client';

import Image from 'next/image';
import Link from 'next/link';

import { css, cva } from 'styled-system/css';
import { Box, Flex, Grid, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';

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
    border: '1px solid var(--color-black-20)',
    bg: 'var(--color-black-10)',
    cursor: 'pointer',
  },
  variants: {
    active: {
      true: {
        borderColor: 'var(--color-blue-100)',
        boxShadow: 'inset 0 -3px var(--color-blue-100)',
      },
      false: {},
    },
  },
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
  bg: 'var(--color-black-20)',
  color: 'var(--color-text-tertiary)',
  fontSize: '24',
  fontFamily: 'inherit',
  textAlign: 'center',
  appearance: 'none',
  cursor: 'pointer',
});

const galleryViewport = css({ '& .swiper-slide': { w: '100%' } });

const galleryImage = css({
  display: 'block',
  w: '100%',
  h: '100%',
  objectFit: 'contain',
});

const thumbnailImage = css({ display: 'block', w: '100%', h: '100%', objectFit: 'contain' });

/** 상품 이미지와 컬러 썸네일 갤러리를 표시합니다. (Displays the product image and color thumbnail gallery.) */
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
              <Image
                alt={`상품 이미지 ${index + 1}`}
                className={galleryImage}
                src={image}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <Typography
                as="small"
                variant="body5"
                className={css({ position: 'absolute', right: '5', bottom: '5' })}
              >
                이미지 확대
              </Typography>
            </button>
          ))}
        </CarouselViewport>
        <CarouselPagination />
        <Flex
          aria-label="같은 컬렉션의 다른 상품"
          flexWrap="nowrap"
          gap="2"
          mt="2"
          w="100%"
          overflowX="auto"
          overflowY="hidden"
          scrollbarWidth="none"
          css={{ '&::-webkit-scrollbar': { display: 'none' } }}
          role="group"
        >
          {colorVariants.map((variant) => (
            <Link
              aria-current={variant.selected ? 'page' : undefined}
              aria-label={`${variant.name} 상품 보기`}
              className={thumbnail({ active: variant.selected })}
              key={variant.id}
              title={variant.name}
              href={`/products/${variant.id}`}
            >
              <Image
                alt=""
                aria-hidden="true"
                className={thumbnailImage}
                src={variant.image}
                width={72}
                height={72}
                sizes="72px"
              />
            </Link>
          ))}
        </Flex>
      </Carousel>
      <Stack mt="16" gap="4" aria-label="상품 상세 이미지">
        <Grid
          minH="680px"
          gap="normal"
          placeItems="center"
          bg="var(--color-black-10)"
          color="var(--color-black-40)"
          fontSize="14"
          letterSpacing="0.08em"
        >
          PRODUCT DETAIL IMAGE
        </Grid>
        <Grid
          minH="680px"
          gap="normal"
          placeItems="center"
          bg="var(--color-black-10)"
          color="var(--color-black-40)"
          fontSize="14"
          letterSpacing="0.08em"
        >
          PRODUCT DETAIL IMAGE
        </Grid>
      </Stack>
    </Box>
  );
}
