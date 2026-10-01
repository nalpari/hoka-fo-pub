import { SocialIconLink } from '@/shared/components/atoms/SocialIcon/SocialIcon';
import { socials } from '@/shared/components/organisms/Layout/SiteFooter/footerData';
import { css } from 'styled-system/css';

const styles = {
  links: css({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '4',
    '@media (max-width: 374px)': { justifyContent: 'space-between', gap: 0 },
  }),
};

export function FooterSocialLinks() {
  return (
    <div className={styles.links}>
      {socials.map((social) => (
        <SocialIconLink key={social.label} {...social} />
      ))}
    </div>
  );
}
