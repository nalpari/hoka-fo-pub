import { Dialog } from '@base-ui/react/dialog';
import { css } from 'styled-system/css';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';
import { ProductDetailImage } from '@/shared/features/product/ProductDetailImage';

const styles = {
  backdrop: css({
    position: 'fixed',
    top: 'calc(var(--layout-site-header-height) + 50px)',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '10',
    bg: 'rgb(255 255 255 / 96%)',
  }),
  viewport: css({
    position: 'fixed',
    top: 'calc(var(--layout-site-header-height) + 50px)',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '10',
    p: '6',
  }),
  popup: css({ position: 'relative', w: '100%', h: '100%', overflow: 'auto', bg: '#fff' }),
  close: css({
    position: 'absolute',
    top: '6',
    right: '6',
    zIndex: '2',
    p: '2',
    border: '0',
    bg: 'transparent',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
  }),
  content: css({
    display: 'grid',
    gridTemplateColumns: '76px minmax(0, 1fr)',
    gap: '4',
    minH: '100%',
    p: '14 10 10',
  }),
  thumbnails: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
    alignSelf: 'start',
    '& button': {
      w: '16',
      aspectRatio: '1',
      p: '0',
      overflow: 'hidden',
      border: '2px solid transparent',
      bg: '#f7f7f9',
      cursor: 'pointer',
    },
    '& button[aria-pressed="true"]': { borderColor: '#000' },
    '& img': { w: '100%', h: '100%', objectFit: 'cover' },
  }),
  viewer: css({ display: 'grid', minW: '0', alignContent: 'center' }),
  carousel: css({ '& .swiper-slide': { w: '100%' } }),
  slide: css({
    display: 'grid',
    minH: 'min(72dvh, 900px)',
    placeItems: 'center',
    bg: '#f7f7f9',
    '& img': { maxW: '100%', maxH: 'min(72dvh, 900px)', objectFit: 'contain' },
  }),
  pagination: css({
    display: 'flex',
    justifyContent: 'center',
    gap: '1',
    mt: '5',
    '& button': {
      w: '7px',
      h: '7px',
      p: '0',
      border: '0',
      borderRadius: '50%',
      bg: '#ddd',
      cursor: 'pointer',
    },
    '& button[aria-pressed="true"]': { w: '28px', borderRadius: '999px', bg: '#000' },
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
  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Viewport className={styles.viewport}>
          <Dialog.Popup aria-label={`${productName} 상품 이미지 상세`} className={styles.popup}>
            <Dialog.Title className={css({ srOnly: true })}>{productName} 상품 이미지</Dialog.Title>
            <Dialog.Close
              render={<button aria-label="이미지 뷰어 닫기" className={styles.close} />}
            >
              닫기 ×
            </Dialog.Close>
            <Carousel initialIndex={initialIndex} itemCount={images.length}>
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
                  <CarouselViewport
                    className={styles.carousel}
                    freeMode={false}
                    showScrollbar={false}
                  >
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
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
