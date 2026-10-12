import { SocialIconLink } from '@/shared/components/atoms/SocialIcon/SocialIcon';
import { socials } from '@/shared/components/organisms/Layout/SiteFooter/footerData';
import { Flex } from 'styled-system/jsx';

export function FooterSocialLinks() {
  return (
    <Flex justifyContent="flex-start" alignItems="center" gap="4">
      {socials.map((social) => (
        <SocialIconLink key={social.label} {...social} />
      ))}
    </Flex>
  );
}
