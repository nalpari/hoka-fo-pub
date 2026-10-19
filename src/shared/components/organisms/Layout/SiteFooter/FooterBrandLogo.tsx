import { css } from 'styled-system/css';

const styles = {
  logo: css({
    display: 'block',
    w: '104px',
    h: 'auto',
    objectFit: 'contain',
    _mobile: { w: '115px' },
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
