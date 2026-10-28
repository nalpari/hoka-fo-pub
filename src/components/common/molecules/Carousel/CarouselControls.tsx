'use client';

import type { CSSProperties } from 'react';
import { css } from 'styled-system/css';
import { Icon, type IconProps } from '@/components/common/atoms/Icon/Icon';
import { useCarousel } from './CarouselContext';

const controls = css({ display: 'flex', gap: '2.5' });

const control = css({
  '--icon-carousel-circle-color': 'var(--color-text-primary)',
  '--icon-carousel-path-color': 'var(--color-surface-subtle)',
  display: 'flex',
  w: 'var(--carousel-control-size)',
  h: 'var(--carousel-control-size)',
  p: '0',
  border: '0',
  borderRadius: '50%',
  bg: 'transparent',
  _disabled: {
    '--icon-carousel-circle-color': 'var(--color-surface-subtle)',
    '--icon-carousel-path-color': 'var(--color-text-subtle)',
    cursor: 'not-allowed',
  },
  _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
});

export type CarouselControlsProps = {
  className?: string;
  iconName?: IconProps['name'];
  iconSize?: IconProps['size'];
};

export function CarouselControls({
  className,
  iconName = 'carousel-arrow',
  iconSize = '48px',
}: CarouselControlsProps) {
  const { canGoNext, canGoPrevious, goNext, goPrevious, loop, itemCount } = useCarousel();
  return (
    <div
      className={[controls, className].filter(Boolean).join(' ')}
      style={
        {
          '--carousel-control-size': typeof iconSize === 'number' ? `${iconSize}px` : iconSize,
        } as CSSProperties
      }
    >
      <button
        aria-label="이전 항목"
        className={control}
        disabled={loop ? itemCount < 2 : !canGoPrevious}
        onClick={goPrevious}
        type="button"
      >
        <Icon name={iconName} size={iconSize} />
      </button>
      <button
        aria-label="다음 항목"
        className={control}
        disabled={loop ? itemCount < 2 : !canGoNext}
        onClick={goNext}
        type="button"
      >
        <Icon direction="next" name={iconName} size={iconSize} />
      </button>
    </div>
  );
}
