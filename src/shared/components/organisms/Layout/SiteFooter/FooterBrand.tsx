import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { FooterBrandSocial } from './FooterBrandSocial';
import { FooterLocaleSelectors } from './FooterLocaleSelectors';

const styles = {
  brand: css({
    gridArea: 'brand',
    _mobile: { gap: '9' },
  }),
};

export function FooterBrand() {
  return (
    <Stack className={styles.brand} alignItems="flex-start" justifyContent="space-between">
      <FooterBrandSocial />
      <FooterLocaleSelectors />
    </Stack>
  );
}
