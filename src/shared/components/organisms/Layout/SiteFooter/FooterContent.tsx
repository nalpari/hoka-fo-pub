import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { FooterBrand } from './FooterBrand';
import { FooterLegalLinks } from './FooterLegalLinks';
import { FooterNavigation } from './FooterNavigation';

const styles = {
  container: css({
    gridTemplateColumns: 'max-content repeat(5, minmax(0, 1fr) max-content)',
    gridTemplateAreas:
      '"brand . navigation navigation navigation navigation navigation navigation navigation . legal"',
    gap: 0,
    w: '100%',
    maxW: '1532px',
    mx: 'auto',
    _mobile: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateAreas: '"navigation" "legal" "brand"',
      gap: '36px',
    },
  }),
};

export function FooterContent() {
  return (
    <Grid className={styles.container}>
      <FooterBrand />
      <FooterNavigation />
      <FooterLegalLinks />
    </Grid>
  );
}
