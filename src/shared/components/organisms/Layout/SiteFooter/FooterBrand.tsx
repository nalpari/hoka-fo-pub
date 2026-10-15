import { Stack } from 'styled-system/jsx';
import { FooterBrandSocial } from './FooterBrandSocial';
import { FooterLocaleSelectors } from './FooterLocaleSelectors';

export function FooterBrand() {
  return (
    <Stack
      gridArea="brand"
      _mobile={{ gap: '9' }}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <FooterBrandSocial />
      <FooterLocaleSelectors />
    </Stack>
  );
}
