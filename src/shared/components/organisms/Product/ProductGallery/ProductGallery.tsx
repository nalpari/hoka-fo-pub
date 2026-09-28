'use client';

import { useState } from 'react';
import { css, cva } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Box, Flex, Stack } from 'styled-system/jsx';

const thumbnail = cva({
  base: { flex: '1', h: '72px', borderColor: '#ddd', color: '#888' },
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
const galleryImage = css({ w: '100%', h: '100%', objectFit: 'contain' });

export function ProductGallery({ image, onOpen }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <Box w="100%">
      <Button
        aria-label="상품 이미지 확대"
        className={css({
          position: 'relative',
          w: '100%',
          h: '560px',
          border: '0',
          bg: '#eee',
          color: '#777',
          fontSize: '24px',
          '& small': { position: 'absolute', right: '20px', bottom: '20px', fontSize: '12px' },
        })}
        onClick={onOpen}
      >
        <img alt="상품 이미지" className={galleryImage} src={image} />
        <small>이미지 확대</small>
      </Button>
      <Flex gap="8px" mt="8px" aria-label="상품 이미지 목록">
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
      <Stack mt="64px" gap="16px" aria-label="상품 상세 이미지">
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
