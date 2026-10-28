'use client';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';
import {
  Children,
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from 'react';
import SimpleBar from 'simplebar-react';
import { type Swiper as SwiperInstance } from 'swiper';
import { EffectFade, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { css } from 'styled-system/css';

import { useCarousel } from '@/components/common/molecules/Carousel/CarouselContext';

const draggableScrollbar = css({
  w: 'var(--carousel-scrollbar-width)',
  h: 'var(--carousel-scrollbar-height)',
  mt: 'var(--carousel-scrollbar-margin-top)',
  mx: 'auto',
  touchAction: 'none',
  '& .simplebar-track.simplebar-horizontal': {
    bottom: '0',
    h: 'var(--carousel-scrollbar-height)',
  },
  '& .simplebar-track.simplebar-horizontal::before': {
    content: '""',
    position: 'absolute',
    top: '8px',
    right: '0',
    left: '0',
    h: '3px',
    bg: 'var(--color-border-default)',
  },
  '& .simplebar-scrollbar': {
    top: '8px',
    h: '3px',
    cursor: 'grab',
  },
  '&.simplebar-dragging .simplebar-scrollbar': {
    cursor: 'grabbing',
  },
  '& .simplebar-scrollbar::before': {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    bg: 'var(--color-text-primary)',
    opacity: '1',
    borderRadius: '0',
  },
  '& .simplebar-scrollbar.simplebar-visible::before': {
    opacity: '1',
  },
});

/** Mobile scrollbar presentation; the viewport owns Swiper synchronization. */
function CarouselScrollbar({
  h = '20px',
  mt = '24px',
  itemCount,
  contentWidth,
  scrollbarRef,
  onScroll,
  onRelease,
}: {
  h?: CSSProperties['height'];
  mt?: CSSProperties['marginTop'];
  itemCount: number;
  contentWidth: number;
  scrollbarRef: RefObject<HTMLElement | null>;
  onScroll: () => void;
  onRelease: () => void;
}) {
  return (
    <SimpleBar
      autoHide={false}
      className={draggableScrollbar}
      onPointerUp={onRelease}
      scrollableNodeProps={{ ref: scrollbarRef, onScroll }}
      style={
        {
          '--carousel-scrollbar-width': `${itemCount * 36}px`,
          '--carousel-scrollbar-height': typeof h === 'number' ? `${h}px` : h,
          '--carousel-scrollbar-margin-top': typeof mt === 'number' ? `${mt}px` : mt,
        } as CSSProperties
      }
    >
      <div aria-hidden="true" style={{ width: `${contentWidth}px`, height: '1px' }} />
    </SimpleBar>
  );
}

const viewport = css({
  w: '100%',
  overflow: 'hidden',
  cursor: 'grab',
  touchAction: 'pan-y',
  '& .swiper-slide': { h: 'auto' },
  '& .swiper-slide > *': { h: '100%' },
  '&.swiper-free-mode': { cursor: 'grab' },
  '&.swiper-free-mode:active': { cursor: 'grabbing' },
});

const snapViewport = css({
  '--swiper-wrapper-transition-timing-function': 'cubic-bezier(0.22, 1, 0.36, 1)',
});

const desktopOverflowVisible = css({
  overflow: 'visible!',
});

const desktopFirstSlideGutter = css({ pr: 'var(--carousel-item-gutter)' });

const desktopSlideGutter = css({ px: 'var(--carousel-item-gutter)' });

const desktopLastSlideGutter = css({ pl: 'var(--carousel-item-gutter)' });

const mobileSlideGutter = css({ px: 'var(--carousel-item-gutter)' });

export type CarouselViewportProps = {
  children: ReactNode;
  className?: string;
  /** Fade displays one slide at a time and disables free dragging. */
  effect?: 'slide' | 'fade';
  /** On web, aligns the first and last slides to a centered N-card content frame. */
  desktopCenteredItemCount?: number;
  /** Horizontal desktop slide gutter, in pixels; the first slide remains flush to the rail start. */
  desktopItemGutter?: number;
  /** Enables free dragging. Disable for a snap-to-slide viewer. */
  freeMode?: boolean;
  /** Horizontal padding applied to every mobile slide, in pixels. */
  mobileItemGutter?: number;
  mode?: 'web' | 'mobile';
  slideClassName?: string;
  showScrollbar?: boolean;
  scrollbarHeight?: CSSProperties['height'];
  scrollbarMarginTop?: CSSProperties['marginTop'];
};

/** 슬라이드 표시 영역과 Swiper 연동을 제공합니다 (Displays the carousel viewport composition). */
export function CarouselViewport({
  children,
  className,
  desktopCenteredItemCount,
  desktopItemGutter,
  effect = 'slide',
  freeMode = true,
  mobileItemGutter,
  mode = 'web',
  slideClassName,
  showScrollbar = true,
  scrollbarHeight,
  scrollbarMarginTop,
}: CarouselViewportProps) {
  const { initialIndex, itemCount, loop, registerSwiper, updateState } = useCarousel();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const scrollbarRef = useRef<HTMLElement | null>(null);
  const [scrollbarContentWidth, setScrollbarContentWidth] = useState(0);
  const isMobile = mode === 'mobile';
  const isFade = effect === 'fade';
  const isFreeMode = freeMode && !isFade;
  const itemGutter = isMobile ? mobileItemGutter : desktopItemGutter;
  const slides = Children.toArray(children);

  const updateScrollbar = useCallback((swiper: SwiperInstance) => {
    const scrollbar = scrollbarRef.current;
    if (!scrollbar) return;

    const maxScroll = scrollbar.scrollWidth - scrollbar.clientWidth;
    if (maxScroll <= 0) return;

    scrollbar.scrollLeft = swiper.progress * maxScroll;
  }, []);

  const handleScrollbarScroll = useCallback(() => {
    const swiper = swiperRef.current;
    const scrollbar = scrollbarRef.current;
    if (!swiper || !scrollbar) return;

    const maxScroll = scrollbar.scrollWidth - scrollbar.clientWidth;
    if (maxScroll <= 0) return;

    swiper.setProgress(scrollbar.scrollLeft / maxScroll);
    updateState(swiper);
  }, [updateState]);

  const handleScrollbarRelease = useCallback(() => {
    swiperRef.current?.slideToClosest(350);
  }, []);

  const handleAfterInit = useCallback(
    (swiper: SwiperInstance) => {
      swiperRef.current = swiper;
      setScrollbarContentWidth(swiper.virtualSize);
      registerSwiper(swiper);
      updateScrollbar(swiper);
    },
    [registerSwiper, updateScrollbar],
  );

  const handleResize = useCallback(
    (swiper: SwiperInstance) => {
      setScrollbarContentWidth(swiper.virtualSize);
      updateState(swiper);
      updateScrollbar(swiper);
    },
    [updateState, updateScrollbar],
  );

  const swiper = (
    <Swiper
      className={[
        viewport,
        !isFreeMode ? snapViewport : '',
        className,
        !isMobile && desktopCenteredItemCount ? desktopOverflowVisible : '',
      ]
        .filter(Boolean)
        .join(' ')}
      effect={effect}
      fadeEffect={isFade ? { mode: 'cross-fade' } : undefined}
      freeMode={isFreeMode ? { enabled: true, sticky: isMobile } : false}
      loop={loop && itemCount > 1}
      followFinger
      modules={isFade ? [EffectFade] : [FreeMode]}
      initialSlide={initialIndex}
      onAfterInit={handleAfterInit}
      onReachBeginning={updateState}
      onReachEnd={updateState}
      onResize={handleResize}
      onProgress={updateScrollbar}
      onSlideChange={updateState}
      onTouchEnd={updateState}
      // When the rail itself has end padding, slide padding supplies the
      // visual gap and Swiper does not add another trailing offset.
      slidesOffsetAfter={!isFade && isMobile && mobileItemGutter === undefined ? 32 : 0}
      slidesPerView={isFade ? 1 : 'auto'}
      spaceBetween={!isFade && isMobile && mobileItemGutter === undefined ? 16 : 0}
      speed={isFreeMode ? 350 : 280}
      threshold={isFreeMode ? 0 : 5}
      resistanceRatio={isFreeMode ? 0.85 : 0.65}
      longSwipesRatio={isFreeMode ? 0.5 : 0.25}
    >
      {slides.map((child, index) => (
        <SwiperSlide
          className={[
            slideClassName,
            !isMobile && desktopCenteredItemCount && desktopItemGutter !== undefined
              ? index === 0
                ? desktopFirstSlideGutter
                : index === slides.length - 1
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

  return (
    <>
      {swiper}
      {isMobile && showScrollbar && itemCount > 1 && (
        <CarouselScrollbar
          h={scrollbarHeight}
          mt={scrollbarMarginTop}
          itemCount={itemCount}
          contentWidth={scrollbarContentWidth}
          scrollbarRef={scrollbarRef}
          onScroll={handleScrollbarScroll}
          onRelease={handleScrollbarRelease}
        />
      )}
    </>
  );
}
