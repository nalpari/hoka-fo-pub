'use client';

import { createContext, useContext } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';

type CarouselState = {
  canGoNext: boolean;
  canGoPrevious: boolean;
  goNext: () => void;
  goPrevious: () => void;
  goToSlide: (index: number) => void;
  activeIndex: number;
  initialIndex: number;
  itemCount: number;
  loop: boolean;
  registerSwiper: (swiper: SwiperInstance) => void;
  updateState: (swiper: SwiperInstance) => void;
};

export const CarouselContext = createContext<CarouselState | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error('Carousel controls must be rendered within a Carousel.');
  return context;
}
