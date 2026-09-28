import { css } from 'styled-system/css';

const styles = {
  badge: css({
    _mobile: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      w: '74px',
      h: '28px',
    },
  }),
};

export function FooterAccessibilityBadge() {
  return (
    <img
      className={styles.badge}
      src="/images/footer/icon-web-accessibility.svg"
      alt="웹 접근성 지원"
    />
  );
}
