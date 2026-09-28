import { css } from 'styled-system/css';

const styles = {
  logo: css({
    display: 'block',
    w: '160px',
    h: 'auto',
    objectFit: 'contain',
    filter: 'brightness(0) invert(1)',
  }),
};

export function FooterBrandLogo() {
  return <img className={styles.logo} src="/images/footer/hoka-footer-brand.png" alt="HOKA" />;
}
