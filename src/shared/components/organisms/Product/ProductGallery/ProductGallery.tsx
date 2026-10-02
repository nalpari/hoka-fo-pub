'use client';

import { useState } from 'react';
import { css, cva } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

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
      true: {
        borderColor: '#0082ca !important',
        boxShadow: 'inset 0 -3px #0082ca',
        color: '#111 !important',
      },
      false: {},
    },
  },
});

type ProductGalleryProps = { images: string[]; onOpen: (image: string) => void };

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

const galleryImage = css({
  display: 'block',
  w: '100%',
  h: '100%',
  objectFit: 'contain',
});

const thumbnailImage = css({ display: 'block', w: '100%', h: '100%', objectFit: 'contain' });

export function ProductGallery({ images, onOpen }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = images[activeImage] ?? images[0] ?? '';

  return (
    <Box w="100%" minW="0">
      <button
        aria-label="상품 이미지 확대"
        className={galleryFrame}
        onClick={() => onOpen(currentImage)}
        type="button"
      >
        <img alt="상품 이미지" className={galleryImage} src={currentImage} />
        <small>이미지 확대</small>
      </button>
      <div aria-label="상품 이미지 목록" className={thumbnailRail} role="group">
        {images.map((image, index) => (
          <button
            aria-label={`상품 이미지 ${index + 1}`}
            aria-pressed={activeImage === index}
            className={thumbnail({ active: activeImage === index })}
            key={`${image}-${index}`}
            onClick={() => setActiveImage(index)}
            type="button"
          >
            <img alt="" aria-hidden="true" className={thumbnailImage} src={image} />
          </button>
        ))}
      </div>
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
