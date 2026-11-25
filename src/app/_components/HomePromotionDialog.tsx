'use client';

import Image from 'next/image';

import { Dialog } from '@base-ui/react/dialog';
import { type KeyboardEvent, useRef } from 'react';
import { usePlatform } from '@/context/platform';

import { css, cx } from 'styled-system/css';
import { Box, Flex } from 'styled-system/jsx';

import {
  Carousel,
  CarouselControls,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { useCarousel } from '@/components/common/molecules/Carousel/CarouselContext';

type PromotionSlide = {
  id: string;
  image: string;
  alt: string;
};

export type HomePromotionDialogProps = {
  open: boolean;
  slides: readonly PromotionSlide[];
  onDismiss: (reason: 'close' | 'hide-today') => void;
};

const styles = {
  portal: css({ position: 'relative', zIndex: '100' }),
  backdrop: css({ position: 'fixed', inset: '0', bg: 'rgba(0, 0, 0, 0.4)' }),
  viewport: css({
    position: 'fixed',
    inset: '0',
    display: 'grid',
    placeItems: 'center',
    p: '16px',
    overflowY: 'auto',
    _mobile: { pt: '34px' },
  }),
  popup: css({
    w: 'min(100%, 400px, calc((100dvh - 85px) * 400 / 534))',
    borderRadius: '10px',
    overflow: 'hidden',
    bg: 'var(--color-white-000)',
    _mobile: { w: 'min(100%, 343px, calc((100dvh - 102px) * 343 / 457))' },
  }),
  title: css({ srOnly: true }),
  imageFrame: css({
    position: 'relative',
    aspectRatio: '400 / 534',
    bg: '#F7F7F9',
    _mobile: { aspectRatio: '343 / 457' },
  }),
  slideTrack: css({ position: 'absolute!', inset: '0' }),
  image: css({ objectFit: 'cover' }),
  counter: css({
    position: 'absolute',
    zIndex: '2',
    top: '16px',
    right: '16px',
    display: 'flex',
    gap: '4px',
    p: '8px 12px',
    borderRadius: '52px',
    bg: 'rgba(0, 0, 0, 0.5)',
    color: 'var(--color-white-000)',
    fontFamily: 'ko',
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '1.3',
    letterSpacing: '-0.02em',
    pointerEvents: 'none',
  }),
  controls: css({
    position: 'absolute',
    zIndex: '2',
    top: '50%',
    insetInline: '16px',
    justifyContent: 'space-between',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    '& > button': {
      '--icon-carousel-circle-color': 'var(--color-black-100)',
      '--icon-carousel-path-color': 'var(--color-white-000)',
      pointerEvents: 'auto',
    },
    _mobile: { '&:not(:focus-within)': { srOnly: true } },
  }),
  action: css({
    flex: '1',
    minW: '0',
    minH: '53px',
    p: '8px',
    border: '0',
    bg: 'var(--color-white-000)',
    color: 'var(--color-black-100)',
    cursor: 'pointer',
    fontFamily: 'ko',
    fontSize: '15px',
    fontWeight: '500',
    lineHeight: '1.3',
    letterSpacing: '-0.02em',
    _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '-3px' },
    _mobile: { minH: '52px' },
  }),
  hideToday: css({ '&&': { color: '#777777', borderRight: '1px solid #E9EAEB' } }),
};

function PromotionCarousel({ slides }: { slides: readonly PromotionSlide[] }) {
  const platform = usePlatform();
  const { activeIndex, goNext, goPrevious } = useCarousel();
  const sizes =
    platform === 'mobile'
      ? 'min(calc(100vw - 32px), 343px, calc((100dvh - 102px) * 343 / 457))'
      : 'min(400px, calc((100dvh - 85px) * 400 / 534))';

  const handleKeyDown = (event: KeyboardEvent) => {
    if (slides.length < 2 || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') goPrevious();
    else goNext();
  };

  return (
    <Box className={styles.imageFrame} onKeyDown={handleKeyDown}>
      <CarouselViewport
        className={styles.slideTrack}
        freeMode={false}
        mobileItemGutter={0}
        mode={platform}
        showScrollbar={false}
      >
        {slides.map((slide, index) => (
          <Box key={slide.id} pos="relative" inert={index !== activeIndex}>
            <Image
              alt={slide.alt}
              className={styles.image}
              draggable={false}
              fill
              loading={index === activeIndex ? 'eager' : 'lazy'}
              sizes={sizes}
              src={slide.image}
            />
          </Box>
        ))}
      </CarouselViewport>
      {slides.length > 1 && (
        <>
          <output className={styles.counter}>
            <span>{activeIndex + 1}</span>
            <span>/</span>
            <span>{slides.length}</span>
          </output>
          <CarouselControls className={styles.controls} iconSize={28} />
        </>
      )}
    </Box>
  );
}

/** 홈 홍보 배너를 모달 캐러셀로 표시합니다. (Displays home promotions in a modal carousel.) */
export function HomePromotionDialog({ open, slides, onDismiss }: HomePromotionDialogProps) {
  const platform = usePlatform();
  const closeButton = useRef<HTMLButtonElement>(null);

  return (
    <Dialog.Root
      open={open && slides.length > 0}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onDismiss('close');
      }}
    >
      <Dialog.Portal>
        <div className={cx(`platform-${platform}`, styles.portal)}>
          <Dialog.Backdrop className={styles.backdrop} />
          <Dialog.Viewport className={styles.viewport}>
            <Dialog.Popup
              className={styles.popup}
              finalFocus={() => document.getElementById('home-content')}
              initialFocus={closeButton}
            >
              <Dialog.Title className={styles.title}>홍보 팝업</Dialog.Title>
              <Carousel
                key={JSON.stringify(slides.map(({ id }) => id))}
                itemCount={slides.length}
                loop
              >
                <PromotionCarousel slides={slides} />
              </Carousel>
              <Flex as="footer">
                <button
                  className={cx(styles.action, styles.hideToday)}
                  onClick={() => onDismiss('hide-today')}
                  type="button"
                >
                  오늘 하루 보지않기
                </button>
                <Dialog.Close ref={closeButton} className={styles.action}>
                  닫기
                </Dialog.Close>
              </Flex>
            </Dialog.Popup>
          </Dialog.Viewport>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
