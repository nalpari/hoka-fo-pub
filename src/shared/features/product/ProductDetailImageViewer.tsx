import { useEffect, useRef } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
import { Carousel, CarouselPagination } from '@/shared/components/molecules/Carousel/Carousel';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ProductDetailViewerGallery } from './ProductDetailViewerGallery';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faXmark } from '@/shared/icons/fontAwesome';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  close: css({
    position: 'absolute',
    top: '8',
    right: '8',
    zIndex: '2',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  }),
  thumbnails: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
    alignSelf: 'start',
  }),
};

type ProductDetailImageViewerProps = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  productName: string;
};

export function ProductDetailImageViewer({
  images,
  initialIndex,
  onClose,
  productName,
}: ProductDetailImageViewerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <Box
      as="section"
      position="relative"
      w="100%"
      maxW="var(--layout-web-content-max-width)"
      mx="auto"
      bg="var(--color-white-000)"
      aria-label={`${productName} 상품 이미지 상세`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <Typography as="h1" srOnly>
        {productName} 상품 이미지
      </Typography>
      <Button
        ref={closeRef}
        aria-label="이미지 뷰어 닫기"
        className={styles.close}
        onClick={onClose}
        variant="ghost"
        icon={<Icon fontAwesomeIcon={faXmark} size="24px" />}
      />
      <Carousel initialIndex={initialIndex} itemCount={images.length} loop>
        <Grid gridTemplateColumns="100px minmax(0, 1fr)" alignItems="start" gap="4" pb="10">
          <CarouselPagination
            className={styles.thumbnails}
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
                <img
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
    </Box>
  );
}
