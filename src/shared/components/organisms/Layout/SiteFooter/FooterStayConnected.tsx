import { EmailSignupField } from '@/shared/components/atoms/EmailSignupField/EmailSignupField';
import { FooterBrandLogo } from '@/shared/components/organisms/Layout/SiteFooter/FooterBrandLogo';
import { FooterSocialLinks } from '@/shared/components/organisms/Layout/SiteFooter/FooterSocialLinks';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

const styles = {
  // container: css({ '& h3, & .socials, & .brandLogo': { my: 0 } }),
  title: css({
    m: 0,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.3',
  }),
};

export function FooterStayConnected() {
  return (
    <Flex direction="column" gap="16px">
      <h3 className={styles.title}>Stay Connected</h3>
      <EmailSignupField />
      <FooterSocialLinks />
      <FooterBrandLogo />
    </Flex>
  );
}
