'use client';

import Link from 'next/link';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { Platform } from '@/lib/device';
import type { FooterGroup } from './footerData';

const styles = {
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
      gap={platform === 'mobile' ? '2' : '10px'}
      m={0}
      p={0}
      listStyle="none"
    >
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.to} className={styles.link}>
            <Typography variant="body4" tone="inverse">
              {link.label}
            </Typography>
          </Link>
        </li>
      ))}
    </VStack>
  );
}
