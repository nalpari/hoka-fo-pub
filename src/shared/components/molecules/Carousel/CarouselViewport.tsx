'use client';

import { Children, type CSSProperties, type ReactNode, useCallback, useRef, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { css } from 'styled-system/css';
import { useCarousel } from './CarouselContext';
import { CarouselScrollbar } from './CarouselScrollbar';

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

export function CarouselViewport({
  children,
  className,
  desktopCenteredItemCount,
  desktopItemGutter,
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
        !freeMode ? snapViewport : '',
        className,
        !isMobile && desktopCenteredItemCount ? desktopOverflowVisible : '',
      ]
        .filter(Boolean)
        .join(' ')}
      freeMode={freeMode ? { enabled: true, sticky: isMobile } : false}
      loop={loop && itemCount > 1}
      followFinger
      modules={[FreeMode]}
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
      slidesOffsetAfter={isMobile && mobileItemGutter === undefined ? 32 : 0}
      slidesPerView="auto"
      spaceBetween={isMobile && mobileItemGutter === undefined ? 16 : 0}
      speed={freeMode ? 350 : 280}
      threshold={freeMode ? 0 : 5}
      resistanceRatio={freeMode ? 0.85 : 0.65}
      longSwipesRatio={freeMode ? 0.5 : 0.25}
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
