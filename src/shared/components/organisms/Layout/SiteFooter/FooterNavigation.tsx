import { Link } from 'react-router-dom';
import { Accordion, type AccordionEntry } from '@/shared/components/atoms/Accordion/Accordion';
import {
  footerGroups,
  type FooterGroup,
} from '@/shared/components/organisms/Layout/SiteFooter/footerData';
import { usePlatform } from '@/shared/context/platform';
import type { Platform } from '@/shared/lib/device';
import { css } from 'styled-system/css';
import { Box, Flex, VStack } from 'styled-system/jsx';

const styles = {
  title: css({
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '1.3',
    color: '#F7F7F9',
    _mobile: {
      fontSize: '16px',
      height: '56px',
    },
  }),

  list: css({ m: 0, p: 0, listStyle: 'none', _mobile: { m: '-2px 0 22px' } }),

  link: css({
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.285',
    color: '#F7F7F9',
    _hover: { textDecoration: 'underline', textUnderlineOffset: '2px' },
    _mobile: {
      fontSize: '12px',
    },
  }),
};

const renderLinks = (links: FooterGroup['links'], platform: Platform) => (
  <VStack
    as="ul"
    alignItems="flex-start"
    gap={platform === 'mobile' ? '8px' : '16px'}
    className={styles.list}
  >
    {links.map((link) => (
      <li key={link.label}>
        <Link to={link.to} className={styles.link}>
          {link.label}
        </Link>
      </li>
    ))}
  </VStack>
);

export function FooterNavigation() {
  const platform = usePlatform();

  const mobileItems: AccordionEntry[] = footerGroups.map((group) => ({
    value: group.title,
    title: (
      <Flex as="span" alignItems="center" py="18px" className={styles.title}>
        {group.title}
      </Flex>
    ),
    content: renderLinks(group.links, platform),
  }));

  return (
    <section aria-label="Footer navigation">
      {platform === 'web' ? (
        <Flex justifyContent="space-between" alignItems="flex-start">
          {footerGroups.map((group) => (
            <Flex direction="column" gap="4" key={group.title}>
              <h3 className={styles.title}>{group.title}</h3>
              {renderLinks(group.links, platform)}
            </Flex>
          ))}
        </Flex>
      ) : (
        <Box borderTop="1px solid #B3B3B3" borderBottom="1px solid #B3B3B3">
          <Accordion items={mobileItems} indicatorColor="#F7F7F9" multiple={false} />
        </Box>
      )}
    </section>
  );
}
