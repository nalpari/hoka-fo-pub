'use client';

import {
  Children,
  createContext,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

type CarouselState = {
  activeIndex: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrevious: () => void;
  itemCount: number;
  registerSwiper: (swiper: SwiperInstance) => void;
  updateState: (swiper: SwiperInstance) => void;
};

const CarouselContext = createContext<CarouselState | null>(null);

const viewport = css({
  w: '100%',
  overflow: 'hidden',
  cursor: 'grab',
  touchAction: 'pan-x',
  '& .swiper-slide': { h: 'auto' },
  '& .swiper-slide > *': { h: '100%' },
  '&.swiper-free-mode': { cursor: 'grab' },
  '&.swiper-free-mode:active': { cursor: 'grabbing' },
});

const controls = css({ display: 'flex', gap: '10px' });

const control = css({
  '--icon-carousel-circle-color': '#000',
  '--icon-carousel-path-color': '#F7F7F9',
  display: 'flex',
  w: '48px',
  h: '48px',
  p: '0',
  border: '0',
  borderRadius: '50%',
  bg: 'transparent',
  _disabled: {
    '--icon-carousel-circle-color': '#F7F7F9',
    '--icon-carousel-path-color': '#B3B3B3',
    cursor: 'not-allowed',
  },
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
});

const pagination = css({
  display: 'none',
  _mobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0',
    w: '100%',
    mt: '32px',
  },
});

const paginationButton = css({
  display: 'block',
  w: '36px',
  h: '3px',
  p: '0',
  border: '0',
  bg: '#D5D7DC',
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '3px' },
});

const paginationButtonActive = css({ bg: '#333640' });

const desktopOverflowVisible = css({
  overflow: 'visible!',
});

const desktopFirstSlideGutter = css({ pr: 'var(--carousel-item-gutter)' });

const desktopSlideGutter = css({ px: 'var(--carousel-item-gutter)' });

const desktopLastSlideGutter = css({ pl: 'var(--carousel-item-gutter)' });

const mobileSlideGutter = css({ px: 'var(--carousel-item-gutter)' });

export type CarouselProps = {
  children: ReactNode;
  itemCount: number;
};

/** Swiper-backed carousel with desktop free dragging and mobile slide snapping. */
export function Carousel({ children, itemCount }: CarouselProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canGoPrevious, setCanGoPrevious] = useState(false);
  const [canGoNext, setCanGoNext] = useState(itemCount > 1);

  const updateState = useCallback((swiper: SwiperInstance) => {
    setActiveIndex(swiper.realIndex);
    setCanGoPrevious(!swiper.isBeginning);
    setCanGoNext(!swiper.isEnd);
  }, []);

  const goTo = useCallback((index: number) => swiperRef.current?.slideTo(index), []);

  const goPrevious = useCallback(() => swiperRef.current?.slidePrev(), []);

  const goNext = useCallback(() => swiperRef.current?.slideNext(), []);

  const registerSwiper = useCallback(
    (swiper: SwiperInstance) => {
      swiperRef.current = swiper;
      updateState(swiper);
    },
    [updateState],
  );

  const context = useMemo(
    () => ({
      activeIndex,
      canGoNext,
      canGoPrevious,
      goNext,
      goPrevious,
      goTo,
      itemCount,
      registerSwiper,
      updateState,
    }),
    [
      activeIndex,
      canGoNext,
      canGoPrevious,
      goNext,
      goPrevious,
      goTo,
      itemCount,
      registerSwiper,
      updateState,
    ],
  );

  return <CarouselContext.Provider value={context}>{children}</CarouselContext.Provider>;
}

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error('Carousel controls must be rendered within a Carousel.');
  return context;
}

export type CarouselViewportProps = {
  children: ReactNode;
  className?: string;
  /** On web, aligns the first and last slides to a centered N-card content frame. */
  desktopCenteredItemCount?: number;
  /** Horizontal desktop slide gutter, in pixels; the first slide remains flush to the rail start. */
  desktopItemGutter?: number;
  /** Horizontal padding applied to every mobile slide, in pixels. */
  mobileItemGutter?: number;
  mode?: 'web' | 'mobile';
  slideClassName?: string;
};

export function CarouselViewport({
  children,
  className,
  desktopCenteredItemCount,
  desktopItemGutter,
  mobileItemGutter,
  mode = 'web',
  slideClassName,
}: CarouselViewportProps) {
  const { registerSwiper, updateState } = useCarousel();
  const isMobile = mode === 'mobile';
  const itemGutter = isMobile ? mobileItemGutter : desktopItemGutter;

  const handleAfterInit = useCallback(
    (swiper: SwiperInstance) => {
      registerSwiper(swiper);
    },
    [registerSwiper],
  );

  const handleResize = useCallback(
    (swiper: SwiperInstance) => {
      updateState(swiper);
    },
    [updateState],
  );

  const swiper = (
    <Swiper
      className={[
        viewport,
        className,
        !isMobile && desktopCenteredItemCount ? desktopOverflowVisible : '',
      ]
        .filter(Boolean)
        .join(' ')}
      freeMode={isMobile ? false : { enabled: true, sticky: false }}
      modules={[FreeMode]}
      onAfterInit={handleAfterInit}
      onReachBeginning={updateState}
      onReachEnd={updateState}
      onResize={handleResize}
      onSlideChange={updateState}
      onTouchEnd={updateState}
      // When the rail itself has end padding, slide padding supplies the
      // visual gap and Swiper does not add another trailing offset.
      slidesOffsetAfter={isMobile && mobileItemGutter === undefined ? 32 : 0}
      slidesPerView="auto"
      spaceBetween={isMobile && mobileItemGutter === undefined ? 16 : 0}
      speed={350}
    >
      {Children.toArray(children).map((child, index) => (
        <SwiperSlide
          className={[
            slideClassName,
            !isMobile && desktopCenteredItemCount && desktopItemGutter !== undefined
              ? index === 0
                ? desktopFirstSlideGutter
                : index === Children.count(children) - 1
                  ? desktopLastSlideGutter
                : desktopSlideGutter
              : isMobile && mobileItemGutter !== undefined
                ? mobileSlideGutter
                : '',
          ]
            .filter(Boolean)
            .join(' ')}
          key={index}
          style={
            itemGutter === undefined
              ? undefined
              : ({ '--carousel-item-gutter': `${itemGutter}px` } as CSSProperties)
          }
        >
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );

  return swiper;
}

export function CarouselControls() {
  const { canGoNext, canGoPrevious, goNext, goPrevious } = useCarousel();
  return (
    <div className={controls}>
      <button
        aria-label="이전 항목"
        className={control}
        disabled={!canGoPrevious}
        onClick={goPrevious}
        type="button"
      >
        <Icon name="carousel-arrow" size="48px" />
      </button>
      <button
        aria-label="다음 항목"
        className={control}
        disabled={!canGoNext}
        onClick={goNext}
        type="button"
      >
        <Icon direction="next" name="carousel-arrow" size="48px" />
      </button>
    </div>
  );
}

export function CarouselPagination() {
  const { activeIndex, goTo, itemCount } = useCarousel();
  return (
    <div aria-label="슬라이드 페이지네이션" className={pagination}>
      {Array.from({ length: itemCount }, (_, index) => (
        <button
          aria-label={`${index + 1}번 슬라이드로 이동`}
          aria-current={activeIndex === index ? 'true' : undefined}
          className={[paginationButton, activeIndex === index ? paginationButtonActive : '']
            .filter(Boolean)
            .join(' ')}
          key={index}
          onClick={() => goTo(index)}
          type="button"
        />
      ))}
    </div>
  );
}
