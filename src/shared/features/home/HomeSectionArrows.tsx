import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

const arrows = css({
  display: 'flex',
  gap: '10px',
  '& button': {
    '--icon-carousel-circle-color': '#f7f7f9',
    '--icon-carousel-path-color': '#b3b3b3',
    display: 'flex',
    w: '48px',
    h: '48px',
    border: 0,
    borderRadius: '50%',
    p: 0,
    bg: 'transparent',
    _hover: { '--icon-carousel-circle-color': '#000', '--icon-carousel-path-color': '#f7f7f9' },
  },
  _mobile: { display: 'none' },
});

export function HomeSectionArrows() {
  return (
    <div className={arrows}>
      <button aria-label="이전 항목" type="button">
        <Icon name="carousel-arrow" size="48px" />
      </button>
      <button aria-label="다음 항목" type="button">
        <Icon direction="next" name="carousel-arrow" size="48px" />
      </button>
    </div>
  );
}
