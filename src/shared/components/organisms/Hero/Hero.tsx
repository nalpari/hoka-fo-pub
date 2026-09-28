'use client';

import { useRef, useState, type PointerEvent } from 'react';
import { HeroCopy, type HeroCopyAction, type HeroCopyContent } from './HeroCopy';
import { HeroSlide, type HeroSlideProps } from './HeroSlide';
import { css } from 'styled-system/css';
import type { Platform } from '@/shared/lib/device';

export type HeroBreakpointContent = {
  image: string;
};

export type HeroAction = HeroCopyAction;

export type HeroBackgroundSlide = HeroSlideProps;

export type HeroProps = {
  content: HeroCopyContent;
  desktop: HeroBreakpointContent;
  mobile: HeroBreakpointContent;
  actions: readonly HeroAction[];
  ariaLabel?: string;
  backgroundSlides?: readonly HeroBackgroundSlide[];
  platform?: Platform;
};

const hero = css({
  position: 'relative',
  w: '100%',
  maxW: 'none!',
  m: '0!',
  p: '0!',
  minH: '500px',
  h: 'min(42.5vw, 816px)',
  overflow: 'hidden',
  color: '#fff',
  _mobile: { minH: '0', h: 'auto', aspectRatio: '375 / 500' },
});
const media = css({ position: 'absolute', inset: '0', overflow: 'hidden', touchAction: 'pan-y' });
const mediaTrack = css({
  display: 'flex',
  w: '100%',
  h: '100%',
  transition: 'transform 400ms ease',
});
const overlay = css({
  position: 'absolute',
  inset: '0',
  pointerEvents: 'none',
  _mobile: {
    background: 'linear-gradient(180deg, rgb(0 0 0 / 0%) 41.11%, rgb(0 0 0 / 30%) 76.91%)',
  },
});

export function Hero({
  content,
  desktop,
  mobile,
  actions,
  ariaLabel,
  backgroundSlides,
  platform,
}: HeroProps) {
  const slides = backgroundSlides?.length
    ? backgroundSlides
    : [{ desktopImage: desktop.image, mobileImage: mobile.image }];
  const [activeSlide, setActiveSlide] = useState(0);
  const swipeStartX = useRef<number | null>(null);

  const moveSlide = (direction: -1 | 1) => {
    if (slides.length < 2) return;
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) < 40) return;
    moveSlide(distance < 0 ? 1 : -1);
  };

  return (
    <section className={hero} aria-label={ariaLabel ?? content.title}>
      <div className={media} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
        <div className={mediaTrack} style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <HeroSlide {...slide} key={`${slide.desktopImage}-${index}`} platform={platform} />
          ))}
        </div>
      </div>
      <div className={overlay} aria-hidden="true" />
      <HeroCopy content={content} actions={actions} />
    </section>
  );
}
