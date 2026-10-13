import { useEffect, useRef } from 'react';
import { css } from 'styled-system/css';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ProductDetailImage } from '@/shared/features/product/ProductDetailImage';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faXmark } from '@/shared/icons/fontAwesome';

const styles = {
  popup: css({
    position: 'relative',
    w: '100%',
    maxW: '1532px',
    mx: 'auto',
    bg: 'var(--color-white-000)',
  }),
  close: css({
    position: 'absolute',
    top: '8',
    right: '8',
    zIndex: '2',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  }),
  content: css({
    display: 'grid',
    gridTemplateColumns: '100px minmax(0, 1fr)',
    alignItems: 'start',
    gap: '4',
    pb: '10',
  }),
  thumbnails: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
    alignSelf: 'start',
    '& button': {
      position: 'relative',
      w: '100px',
      p: '0',
      overflow: 'hidden',
      border: 'none',
      bg: 'var(--color-black-10)',
      cursor: 'pointer',
    },
    '& button[aria-pressed="true"]': {
      _after: {
        content: '""',
        position: 'absolute',
        inset: '0',
        bg: 'rgb(0 0 0 / 15%)',
        pointerEvents: 'none',
      },
    },
    '& img': { display: 'block', w: '100%', h: 'auto' },
  }),
  viewer: css({ display: 'grid', minW: '0', w: '100%', alignContent: 'start' }),
  carousel: css({ '& .swiper-slide': { w: '100%' } }),
  slide: css({
    w: '100%',
    '& img': { display: 'block', w: '100%', h: 'auto' },
  }),
  pagination: css({
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    mt: '5',
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
    <section
      aria-label={`${productName} 상품 이미지 상세`}
      className={styles.popup}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <h1 className={css({ srOnly: true })}>{productName} 상품 이미지</h1>
      <Button
        ref={closeRef}
        aria-label="이미지 뷰어 닫기"
        className={styles.close}
        onClick={onClose}
        variant="ghost"
        icon={<Icon fontAwesomeIcon={faXmark} size="24px" />}
      />
      <Carousel initialIndex={initialIndex} itemCount={images.length} loop>
        <div className={styles.content}>
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
              >
                <img alt="" src={images[index]} />
              </button>
            )}
          />
          <div className={styles.viewer}>
            <CarouselViewport className={styles.carousel} freeMode={false} showScrollbar={false}>
              {images.map((image, index) => (
                <div className={styles.slide} key={image}>
                  <ProductDetailImage alt={`${productName} ${index + 1}`} src={image} />
                </div>
              ))}
            </CarouselViewport>
            <CarouselPagination className={styles.pagination} label="상품 이미지 선택" />
          </div>
        </div>
      </Carousel>
    </section>
  );
}
