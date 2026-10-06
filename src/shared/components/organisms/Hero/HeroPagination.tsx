import { css } from 'styled-system/css';

export type HeroPaginationSlide = {
  id: string;
  title: string;
};

export type HeroPaginationProps = {
  activeSlide: number;
  onSlideChange: (index: number) => void;
  slides: readonly HeroPaginationSlide[];
};

const pagination = css({
  position: 'absolute',
  zIndex: '1',
  right: '0',
  bottom: '32px',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  gap: '2',
  _mobile: { bottom: '12px' },
});

const paginationButton = css({
  w: '8px',
  h: '8px',
  p: '0',
  border: '0',
  borderRadius: '50px',
  bg: '#FFFFFF',
  opacity: '0.7',
  cursor: 'pointer',
  transition: 'width 200ms ease, opacity 200ms ease',
  '&[aria-pressed="true"]': { w: '42px', opacity: '1' },
  _mobile: {
    w: '6px',
    h: '6px',
    '&[aria-pressed="true"]': { w: '32px' },
  },
  _focusVisible: { outline: '2px solid var(--color-text-inverse)', outlineOffset: '3px' },
});

export function HeroPagination({ activeSlide, onSlideChange, slides }: HeroPaginationProps) {
  if (slides.length < 2) return null;

  return (
    <div aria-label="히어로 슬라이드 선택" className={pagination} role="group">
      {slides.map((slide, index) => (
        <button
          aria-label={`${slide.title} 슬라이드`}
          aria-pressed={activeSlide === index}
          className={paginationButton}
          key={slide.id}
          onClick={() => onSlideChange(index)}
          type="button"
        />
      ))}
    </div>
  );
}
