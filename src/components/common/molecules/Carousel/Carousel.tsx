'use client';

import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';

import { CarouselContext } from './CarouselContext';

export type CarouselProps = {
  children: ReactNode;
  initialIndex?: number;
  itemCount: number;
  loop?: boolean;
};

/** Swiper-backed carousel with free dragging and an optional draggable scrollbar. */
export function Carousel({ children, initialIndex = 0, itemCount, loop = false }: CarouselProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [canGoPrevious, setCanGoPrevious] = useState(initialIndex > 0);
  const [canGoNext, setCanGoNext] = useState(initialIndex < itemCount - 1);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const updateState = useCallback((swiper: SwiperInstance) => {
    setCanGoPrevious(!swiper.isBeginning);
    setCanGoNext(!swiper.isEnd);
    setActiveIndex(swiper.realIndex);
  }, []);

  const goPrevious = useCallback(() => swiperRef.current?.slidePrev(), []);

  const goNext = useCallback(() => swiperRef.current?.slideNext(), []);

  const goToSlide = useCallback(
    (index: number) =>
      loop ? swiperRef.current?.slideToLoop(index) : swiperRef.current?.slideTo(index),
    [loop],
  );

  const registerSwiper = useCallback(
    (swiper: SwiperInstance) => {
      swiperRef.current = swiper;
      updateState(swiper);
    },
    [updateState],
  );

  const context = useMemo(
    () => ({
      canGoNext,
      canGoPrevious,
      goNext,
      goPrevious,
      goToSlide,
      activeIndex,
      initialIndex,
      itemCount,
      loop,
      registerSwiper,
      updateState,
    }),
    [
      activeIndex,
      canGoNext,
      canGoPrevious,
      goNext,
      goPrevious,
      goToSlide,
      initialIndex,
      itemCount,
      loop,
      registerSwiper,
      updateState,
    ],
  );

  return <CarouselContext.Provider value={context}>{children}</CarouselContext.Provider>;
}

export { CarouselViewport, type CarouselViewportProps } from './CarouselViewport';

export { CarouselPagination, type CarouselPaginationProps } from './CarouselPagination';

export { CarouselControls, type CarouselControlsProps } from './CarouselControls';
