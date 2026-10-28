import { Stack } from 'styled-system/jsx';
import { FooterBrandLogo } from './FooterBrandLogo';
import { FooterSocialLinks } from './FooterSocialLinks';

export function FooterBrandSocial() {
  return (
    <Stack
      alignItems="flex-start"
      gap="22px"
      _mobile={{
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        w: '100%',
      }}
    >
      <FooterBrandLogo />
      <FooterSocialLinks />
    </Stack>
  );
}
