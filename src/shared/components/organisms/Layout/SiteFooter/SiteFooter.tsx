import { FooterContent } from './FooterContent';
import { css } from 'styled-system/css';
import { Wrap } from 'styled-system/jsx';

const styles = {
  footer: css({
    minW: 'var(--layout-web-min-width)',
    py: '96px',
    px: '32px',
    _mobile: { p: '36px 16px', minW: 0 },
  }),
};

export function SiteFooter() {
  return (
    <Wrap as="footer" className={styles.footer} bg="black.100" color="black.10">
      <FooterContent />
    </Wrap>
  );
}
