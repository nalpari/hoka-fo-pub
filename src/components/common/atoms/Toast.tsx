'use client';

import { useEffect, useRef } from 'react';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

export type ToastNotice = { id: number; text: string };

const toastStyle = css({
  position: 'fixed',
  bottom: '40px',
  left: '50%',
  zIndex: 1000,
  transform: 'translateX(-50%)',
  maxW: 'calc(100vw - 32px)',
  w: '238px',
  minH: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: '24px',
  py: '10px',
  borderRadius: '52px',
  bg: 'black.100',
  color: 'white.0',
  pointerEvents: 'none',
  textAlign: 'center',
});

/** 안내 메시지를 화면 하단에 3초 표시한 뒤 슬라이드·페이드로 닫습니다. (Shows a notification at the bottom for three seconds before sliding and fading out.) */
export function Toast({
  notice,
  onDismiss,
}: {
  notice: ToastNotice | null;
  onDismiss: (id: number) => void;
}) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = toastRef.current;
    if (!notice || !element) return;

    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200;
    const enter = element.animate(
      [
        { opacity: 0, translate: '0 12px' },
        { opacity: 1, translate: '0 0' },
      ],
      { duration, easing: 'ease-out', fill: 'both' },
    );
    let exit: Animation | undefined;

    const timeoutId = window.setTimeout(() => {
      exit = element.animate(
        [
          { opacity: 1, translate: '0 0' },
          { opacity: 0, translate: '0 12px' },
        ],
        { duration, easing: 'ease-in', fill: 'both' },
      );
      exit.onfinish = () => onDismiss(notice.id);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
      enter.cancel();
      if (exit) {
        exit.onfinish = null;
        exit.cancel();
      }
    };
  }, [notice, onDismiss]);

  if (!notice) return null;

  return (
    <Box ref={toastRef} className={toastStyle} role="status" aria-live="polite" aria-atomic="true">
<Typography variant="body4Medium" tone="inverse">
        {notice.text}
      </Typography>
    </Box>
  );
}
