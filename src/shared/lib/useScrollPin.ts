'use client';

import { useLayoutEffect, useRef, useState } from 'react';

/** Pin after the flow marker passes its CSS scroll-margin-top offset. */
export function useScrollPin(enabled = true) {
  const markerRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useLayoutEffect(() => {
    const marker = markerRef.current;
    if (!enabled || !marker) return;

    const offset = parseFloat(getComputedStyle(marker).scrollMarginTop) || 0;
    let frame = 0;
    let lastPinned: boolean | undefined;
    const update = () => {
      frame = 0;
      const nextPinned = marker.getBoundingClientRect().top < offset;
      if (nextPinned !== lastPinned) {
        lastPinned = nextPinned;
        setPinned(nextPinned);
      }
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(scheduleUpdate, {
      rootMargin: `-${offset}px 0px 0px 0px`,
      threshold: [0, 1],
    });
    update();
    observer.observe(marker);
    // Embedded previews can remain clipped without another intersection change.
    window.addEventListener('scroll', scheduleUpdate, { passive: true, capture: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate, true);
      window.removeEventListener('resize', scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return { markerRef, pinned: enabled && pinned };
}
