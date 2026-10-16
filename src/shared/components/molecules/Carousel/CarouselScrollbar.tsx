'use client';

import type { CSSProperties, RefObject } from 'react';
import SimpleBar from 'simplebar-react';
import { css } from 'styled-system/css';

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
export function CarouselScrollbar({
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
