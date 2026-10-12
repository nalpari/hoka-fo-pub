import { css } from 'styled-system/css';

const styles = {
  logo: css({
    display: 'block',
    w: '145px',
    h: '28px',
    objectFit: 'contain',
    _mobile: { w: '124px', h: '24px' },
  }),
};

export function FooterBrandLogo() {
  return (
    <img
      className={styles.logo}
      src="/images/footer/hoka-footer-brand-fly.svg"
      alt="HOKA — Fly Human Fly"
    />
  );
}
