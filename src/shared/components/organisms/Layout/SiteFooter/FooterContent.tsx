import { Grid } from 'styled-system/jsx';
import { FooterBrand } from './FooterBrand';
import { FooterLegalLinks } from './FooterLegalLinks';
import { FooterNavigation } from './FooterNavigation';

export function FooterContent() {
  return (
    <Grid
      gridTemplateColumns="max-content repeat(5, minmax(0, 1fr) max-content)"
      gridTemplateAreas={
        '"brand . navigation navigation navigation navigation navigation navigation navigation . legal"'
      }
      gap={0}
      w="100%"
      maxW="1532px"
      mx="auto"
      _mobile={{
        gridTemplateColumns: 'minmax(0, 1fr)',
        gridTemplateAreas: '"navigation" "legal" "brand"',
        gap: '9',
      }}
    >
      <FooterBrand />
      <FooterNavigation />
      <FooterLegalLinks />
    </Grid>
  );
}
