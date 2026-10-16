'use client';

import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { css } from 'styled-system/css';
import { useCarousel } from './CarouselContext';

const pagination = css({ display: 'flex', justifyContent: 'center', gap: '1', mt: '2' });

const paginationItem = css({
  w: 'var(--carousel-pagination-size)',
  h: 'var(--carousel-pagination-size)',
  flexShrink: 0,
  p: '0',
  border: '0',
  borderRadius: 'full',
  bg: 'var(--color-black-40)',
  cursor: 'pointer',
  '&[aria-pressed="true"]': { w: '21px', bg: 'var(--color-black-100)' },
});

export type CarouselPaginationProps = {
  className?: string;
  label?: string;
  size?: string | number;
  renderItem?: (index: number, isActive: boolean, select: (index: number) => void) => ReactNode;
};

export function CarouselPagination({
  className,
  label = '슬라이드 선택',
  size = '5px',
  renderItem,
}: CarouselPaginationProps) {
  const { activeIndex, goToSlide, itemCount } = useCarousel();

  const reducedMotion = useReducedMotion();

  if (itemCount < 2) return null;

  return (
    <div
      aria-label={label}
      className={className ?? pagination}
      role="group"
      style={
        {
          '--carousel-pagination-size': typeof size === 'number' ? `${size}px` : size,
        } as CSSProperties
      }
    >
      {Array.from({ length: itemCount }, (_, index) =>
        renderItem ? (
          <Fragment key={index}>{renderItem(index, activeIndex === index, goToSlide)}</Fragment>
        ) : (
          <motion.button
            initial={false}
            animate={{ width: activeIndex === index ? '21px' : size }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 200, damping: 20, mass: 1 }
            }
            aria-label={`${index + 1}번 이미지`}
            aria-pressed={activeIndex === index}
            className={paginationItem}
            key={index}
            onClick={() => goToSlide(index)}
            type="button"
          />
        ),
      )}
    </div>
  );
}
