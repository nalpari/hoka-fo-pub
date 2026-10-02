import { FooterNavigation } from '@/shared/components/organisms/Layout/SiteFooter/FooterNavigation';
import { FooterStayConnected } from '@/shared/components/organisms/Layout/SiteFooter/FooterStayConnected';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

const styles = {
  container: css({
    gridTemplateColumns: 'minmax(0, 1fr) 312px',
    gap: '120px',
    '@media (max-width: 1399px)': { gap: '15' },
    _mobile: {
      gridTemplateColumns: '1fr',
      gap: '15',
    },
  }),
};

export function FooterMain() {
  return (
    <Grid className={styles.container}>
      <FooterNavigation />
      <FooterStayConnected />
    </Grid>
  );
}
