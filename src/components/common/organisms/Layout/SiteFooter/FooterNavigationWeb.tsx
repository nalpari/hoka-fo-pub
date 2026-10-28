import { css } from 'styled-system/css';
import { Box, Flex } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { footerGroups } from './footerData';
import { FooterNavigationLinks } from './FooterNavigationLinks';

const styles = {
  title: css({
    color: 'var(--color-black-10)',
    textBoxTrim: 'trim-both',
    textBoxEdge: 'cap alphabetic',
  }),
};

export function FooterNavigationWeb() {
  return (
    <Box display="contents">
      {footerGroups.map((group) => (
        <Flex
          direction="column"
          gap="20px"
          gridRow={1}
          alignSelf="start"
          css={{
            '&:nth-child(1)': { gridColumn: 1 },
            '&:nth-child(2)': { gridColumn: 3 },
            '&:nth-child(3)': { gridColumn: 5 },
            '&:nth-child(4)': { gridColumn: 7 },
          }}
          key={group.title}
        >
          <Typography as="h3" variant="heading9" tone="inverse" className={styles.title}>
            {group.title}
          </Typography>
          <FooterNavigationLinks links={group.links} platform="web" />
        </Flex>
      ))}
    </Box>
  );
}
