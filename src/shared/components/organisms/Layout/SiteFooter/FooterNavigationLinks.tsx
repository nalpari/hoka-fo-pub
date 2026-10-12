import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { Platform } from '@/shared/lib/device';
import type { FooterGroup } from './footerData';

const styles = {
  list: css({
    m: 0,
    p: 0,
    listStyle: 'none',
    _mobile: { m: '-2px 0 0' },
  }),
  link: css({ color: 'var(--color-black-10)' }),
};

type FooterNavigationLinksProps = {
  links: FooterGroup['links'];
  platform: Platform;
};

export function FooterNavigationLinks({ links, platform }: FooterNavigationLinksProps) {
  return (
    <VStack
      as="ul"
      alignItems="flex-start"
      gap={platform === 'mobile' ? '22px' : '10px'}
      className={styles.list}
    >
      {links.map((link) => (
        <li key={link.label}>
          <Link to={link.to} className={styles.link}>
            <Typography variant="body4" tone="inverse">
              {link.label}
            </Typography>
          </Link>
        </li>
      ))}
    </VStack>
  );
}
