'use client';

import { useEffect, useRef, useState } from 'react';

import { css } from 'styled-system/css';

import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

const root = css({
  position: 'fixed',
  right: '24px',
  bottom: '24px',
  zIndex: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  w: '56px',
  h: '56px',
  p: '9px 14px',
  bg: 'white',
  border: '0',
  borderRadius: '52px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.16)',
  color: 'black',
  cursor: 'pointer',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 300ms linear, visibility 300ms linear',
  visibility: 'hidden',
  _focusVisible: { outline: '2px solid var(--color-black-100)', outlineOffset: '2px' },
  _mobile: { right: '16px', bottom: '16px' },
});

const visibleRoot = css({ opacity: 1, pointerEvents: 'auto', visibility: 'visible' });

/** 위로 스크롤할 때 문서 상단 이동 버튼을 표시합니다. (Shows a page-top control while scrolling upward.) */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const previousScrollY = useRef(0);
  const returningToTop = useRef(false);

  useEffect(() => {
    let animationFrame = 0;

    const updateVisibility = () => {
      animationFrame = 0;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const hasLongDocument = document.documentElement.scrollHeight >= viewportHeight * 1.5;

      if (returningToTop.current) {
        if (scrollY <= 1) returningToTop.current = false;
        previousScrollY.current = scrollY;
        return;
      }

      setVisible(
        hasLongDocument && scrollY < previousScrollY.current && scrollY > viewportHeight * 0.5,
      );
      previousScrollY.current = scrollY;
    };

    const onScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateVisibility);
    };

    previousScrollY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollToTop = () => {
    returningToTop.current = true;
    setVisible(false);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      aria-label="페이지 상단으로 이동"
      className={`${root} ${visible ? visibleRoot : ''}`}
      onClick={scrollToTop}
    >
      <Typography as="span" variant="b8" mo="b8">
        Top
      </Typography>
      <Icon aria-hidden name="arrow-up-regular" size="18px" />
    </button>
  );
}
