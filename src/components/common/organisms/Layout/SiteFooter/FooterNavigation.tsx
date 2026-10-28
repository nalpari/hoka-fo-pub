import { usePlatform } from '@/context/platform';
import { FooterNavigationWeb } from '@/components/common/organisms/Layout/SiteFooter/FooterNavigationWeb';
import { css } from 'styled-system/css';
import { Box, HStack, Grid } from 'styled-system/jsx';
import { Accordion, type AccordionEntry } from '@/components/common/atoms/Accordion/Accordion';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { footerGroups } from '@/components/common/organisms/Layout/SiteFooter/footerData';
import { FooterNavigationLinks } from '@/components/common/organisms/Layout/SiteFooter/FooterNavigationLinks';

const footerAccordionStyles = {
  title: css({
    color: 'var(--color-black-10)',
    textBoxTrim: 'none',
    textBoxEdge: 'cap alphabetic',
  }),
  panel: css({ pt: '0', pl: '7', pb: '4' }),
};

function FooterAccordionNavigation() {
  const items: AccordionEntry[] = footerGroups.map((group) => ({
    value: group.title,
    title: (
      <HStack py="5">
        <Typography variant="heading9" tone="inverse" className={footerAccordionStyles.title}>
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
      <Accordion
        items={items}
        indicatorColor="var(--color-black-10)"
        panelClassName={footerAccordionStyles.panel}
        multiple
      />
    </Box>
  );
}

/** 푸터 탐색을 열 배치 또는 아코디언으로 구성합니다. (Composes footer navigation as columns or an accordion.) */
export function FooterNavigation() {
  const platform = usePlatform();

  return (
    <Grid
      as="section"
      gridArea="navigation"
      gridTemplateColumns="subgrid"
      gap={0}
      _mobile={{ display: 'block', gridTemplateColumns: 'none' }}
      aria-label="Footer navigation"
    >
      {platform === 'web' ? <FooterNavigationWeb /> : <FooterAccordionNavigation />}
    </Grid>
  );
}
