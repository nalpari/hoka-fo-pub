import { usePlatform } from '@/shared/context/platform';
import { FooterNavigationWeb } from './FooterNavigationWeb';
import { FooterNavigationMobile } from './FooterNavigationMobile';
import { Grid } from 'styled-system/jsx';

export function FooterNavigation() {
  const platform = usePlatform();

  return (
    <Grid
      as="section"
      gridArea="navigation"
      gridTemplateColumns="subgrid"
      gap={0}
      _mobile={{ display: 'block', gridTemplateColumns: 'none' }}
      aria-label="Footer navigation"
    >
      {platform === 'web' ? <FooterNavigationWeb /> : <FooterNavigationMobile />}
    </Grid>
  );
}
