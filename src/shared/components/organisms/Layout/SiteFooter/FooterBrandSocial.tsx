import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { FooterBrandLogo } from './FooterBrandLogo';
import { FooterSocialLinks } from './FooterSocialLinks';

const styles = {
  socialRow: css({
    alignItems: 'flex-start',
    gap: '22px',
    _mobile: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      w: '100%',
    },
  }),
};

export function FooterBrandSocial() {
  return (
    <Stack className={styles.socialRow}>
      <FooterBrandLogo />
      <FooterSocialLinks />
    </Stack>
  );
}
