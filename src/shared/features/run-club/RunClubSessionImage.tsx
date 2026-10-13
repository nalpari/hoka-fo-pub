import { css } from 'styled-system/css';

const styles = {
  placeholder: css({
    w: 'min(calc(100% - 110px), 1776px)',
    mx: 'auto',
    my: '72px',
    aspectRatio: '2.77',
    bg: '#b3b3b3',
    display: 'grid',
    placeItems: 'center',
    fontSize: '28px',
    fontWeight: '900',
    _mobile: {
      w: 'auto',
      mx: 'var(--layout-mobile-inline-gutter)',
      my: '40px',
      aspectRatio: '1.5',
      fontSize: '20px',
    },
  }),
};

export function RunClubSessionImage() {
  return <div className={styles.placeholder}>이미지 영역</div>;
}
