import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';
import { Accordion, type AccordionEntry } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { footerGroups } from './footerData';
import { FooterNavigationLinks } from './FooterNavigationLinks';

const styles = {
  title: css({
    color: 'var(--color-black-10)',
    textBoxTrim: 'none',
    textBoxEdge: 'cap alphabetic',
  }),
};

export function FooterNavigationMobile() {
  const items: AccordionEntry[] = footerGroups.map((group) => ({
    value: group.title,
    title: (
      <HStack py="22px">
        <Typography as="span" variant="heading9" tone="inverse" className={styles.title}>
          {group.title}
        </Typography>
      </HStack>
    ),
    content: <FooterNavigationLinks links={group.links} platform="mobile" />,
  }));

  return (
    <Box
      borderTop="1px solid var(--color-border-tertiary)"
      borderBottom="1px solid var(--color-border-tertiary)"
    >
      <Accordion items={items} indicatorColor="var(--color-black-10)" multiple={false} />
    </Box>
  );
}
