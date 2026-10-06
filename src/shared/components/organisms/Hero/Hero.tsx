'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from 'react';
import { HeroCopy, type HeroCopyAction, type HeroCopyContent } from './HeroCopy';
import { HeroPagination } from './HeroPagination';
import { HeroSlide, type HeroSlideProps } from './HeroSlide';
import { css } from 'styled-system/css';
import type { Platform } from '@/shared/lib/device';

export type HeroAction = HeroCopyAction;

export type HeroContentSlide = HeroSlideProps & {
  actions: readonly HeroAction[];
  content: HeroCopyContent;
};

export type HeroProps = {
  slides: readonly HeroContentSlide[];
  ariaLabel?: string;
  platform?: Platform;
};

const AUTO_PLAY_DELAY = 5_000;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

const hero = css({
  position: 'relative',
  w: '100%',
  maxW: 'none!',
  m: '0!',
  p: '0!',
  minH: '500px',
  h: 'min(42.5vw, 816px)',
  overflow: 'hidden',
  color: 'var(--color-text-inverse)',
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

export function Hero({ ariaLabel, platform, slides }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplayCycle, setAutoplayCycle] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressDuration, setProgressDuration] = useState(AUTO_PLAY_DELAY);
  const swipeStartX = useRef<number | null>(null);
  const cycleStartedAt = useRef<number | null>(null);
  const remainingDuration = useRef(AUTO_PLAY_DELAY);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isPaused = isFocused || isHovering || isPointerActive;
  const currentSlide = slides[activeSlide] ?? slides[0];

  const resetAutoplayCycle = useCallback(() => {
    remainingDuration.current = AUTO_PLAY_DELAY;
    setProgress(0);
    setProgressDuration(AUTO_PLAY_DELAY);
    setAutoplayCycle((current) => current + 1);
  }, []);

  const freezeProgress = useCallback(() => {
    if (cycleStartedAt.current === null) return;

    const elapsed = performance.now() - cycleStartedAt.current;
    const nextRemainingDuration = Math.max(0, remainingDuration.current - elapsed);

    remainingDuration.current = nextRemainingDuration;
    cycleStartedAt.current = null;
    setProgress(1 - nextRemainingDuration / AUTO_PLAY_DELAY);
  }, []);

  const moveSlide = useCallback(
    (direction: -1 | 1) => {
      if (slides.length < 2) return;

      resetAutoplayCycle();
      setActiveSlide((current) => (current + direction + slides.length) % slides.length);
    },
    [resetAutoplayCycle, slides.length],
  );

  const selectSlide = useCallback(
    (index: number) => {
      resetAutoplayCycle();
      setActiveSlide(index);
    },
    [resetAutoplayCycle],
  );

  useEffect(() => {
    if (prefersReducedMotion) freezeProgress();
  }, [freezeProgress, prefersReducedMotion]);

  useEffect(() => {
    if (slides.length < 2 || isPaused || prefersReducedMotion !== false) return;

    const duration = remainingDuration.current;
    const animationFrame = window.requestAnimationFrame(() => setProgress(1));

    cycleStartedAt.current = performance.now();
    setProgressDuration(duration);

    const timeout = window.setTimeout(() => {
      resetAutoplayCycle();
      setActiveSlide((current) => (current + 1) % slides.length);
    }, duration);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeout);
    };
  }, [
    activeSlide,
    autoplayCycle,
    isPaused,
    prefersReducedMotion,
    resetAutoplayCycle,
    slides.length,
  ]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    freezeProgress();
    setIsPointerActive(true);
    swipeStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    setIsPointerActive(false);

    if (swipeStartX.current === null) return;

    const distance = event.clientX - swipeStartX.current;

    swipeStartX.current = null;

    if (Math.abs(distance) < 40) return;

    moveSlide(distance < 0 ? 1 : -1);
  };

  const handlePointerCancel = () => {
    swipeStartX.current = null;
    setIsPointerActive(false);
  };

  const handleMouseEnter = () => {
    freezeProgress();
    setIsHovering(true);
  };

  const handleFocus = () => {
    freezeProgress();
    setIsFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
  };

  return (
    <section
      aria-label={ariaLabel ?? currentSlide.content.title}
      className={hero}
      onBlurCapture={handleBlur}
      onFocusCapture={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={media}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className={mediaTrack} style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <HeroSlide {...slide} key={`${slide.desktopImage}-${index}`} platform={platform} />
          ))}
        </div>
      </div>
      <div className={overlay} aria-hidden="true" />
      <HeroCopy content={currentSlide.content} actions={currentSlide.actions} />
      <HeroPagination
        activeSlide={activeSlide}
        isProgressPaused={isPaused || prefersReducedMotion !== false}
        onSlideChange={selectSlide}
        progress={progress}
        progressDuration={progressDuration}
        slides={slides.map(({ content, desktopImage }) => ({
          id: desktopImage,
          title: content.title,
        }))}
      />
    </section>
  );
}
