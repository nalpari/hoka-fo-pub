import { css } from 'styled-system/css';

export type HeroPaginationSlide = {
  id: string;
  title: string;
};

export type HeroPaginationProps = {
  activeSlide: number;
  isProgressPaused: boolean;
  onSlideChange: (index: number) => void;
  progress: number;
  progressDuration: number;
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
  position: 'relative',
  overflow: 'hidden',
  bg: 'rgb(255 255 255 / 70%)',
  cursor: 'pointer',
  transition: 'width 200ms ease',
  '&[aria-pressed="true"]': { w: '42px', bg: 'rgb(255 255 255 / 50%)' },
  _mobile: {
    w: '6px',
    h: '6px',
    '&[aria-pressed="true"]': { w: '32px' },
  },
  _focusVisible: { outline: '2px solid var(--color-text-inverse)', outlineOffset: '3px' },
});

const progressBar = css({
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  borderRadius: 'inherit',
  bg: '#FFFFFF',
  transitionProperty: 'width',
  transitionTimingFunction: 'linear',
});

function getProgressWidth(progress: number) {
  return `calc(${8 * (1 - progress)}px + ${progress * 100}%)`;
}

export function HeroPagination({
  activeSlide,
  isProgressPaused,
  onSlideChange,
  progress,
  progressDuration,
  slides,
}: HeroPaginationProps) {
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
        >
          {activeSlide === index ? (
            <span
              aria-hidden="true"
              className={progressBar}
              style={{
                transitionDuration: `${progressDuration}ms`,
                transitionProperty: isProgressPaused ? 'none' : 'width',
                width: getProgressWidth(progress),
              }}
            />
          ) : null}
        </button>
      ))}
    </div>
  );
}
