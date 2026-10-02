'use client';

import { useState } from 'react';
import { css, cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Box, Flex, Stack } from 'styled-system/jsx';

const thumbnail = cva({
  base: { flex: '1', h: '18', borderColor: '#ddd', color: '#888' },
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

type ProductGalleryProps = { image: string; onOpen: () => void };
const thumbnailIndexes = [1, 2, 3, 4];
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

export function ProductGallery({ image, onOpen }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <Box w="100%" minW="0">
      <button aria-label="상품 이미지 확대" className={galleryFrame} onClick={onOpen} type="button">
        <img alt="상품 이미지" className={galleryImage} src={image} />
        <small>이미지 확대</small>
      </button>
      <Flex gap="2" mt="2" aria-label="상품 이미지 목록">
        {thumbnailIndexes.map((index, position) => (
          <Button
            aria-label={`상품 이미지 ${index}`}
            aria-pressed={activeImage === position}
            className={thumbnail({ active: activeImage === position })}
            key={index}
            onClick={() => setActiveImage(position)}
          >
            IMAGE {index}
          </Button>
        ))}
      </Flex>
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
