import { css } from 'styled-system/css';
import { Box, Flex } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { footerGroups } from './footerData';
import { FooterNavigationLinks } from './FooterNavigationLinks';

const styles = {
  content: css({ display: 'contents' }),
  group: css({
    gridRow: 1,
    alignSelf: 'start',
    '&:nth-child(1)': { gridColumn: 1 },
    '&:nth-child(2)': { gridColumn: 3 },
    '&:nth-child(3)': { gridColumn: 5 },
    '&:nth-child(4)': { gridColumn: 7 },
  }),
  title: css({
    color: 'var(--color-black-10)',
    textBoxTrim: 'trim-both',
    textBoxEdge: 'cap alphabetic',
  }),
};

export function FooterNavigationWeb() {
  return (
    <Box className={styles.content}>
      {footerGroups.map((group) => (
        <Flex direction="column" gap="20px" className={styles.group} key={group.title}>
          <Typography
            as="h3"
            variant={/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(group.title) ? 'headingKr9' : 'heading9'}
            tone="inverse"
            className={styles.title}
          >
            {group.title}
          </Typography>
          <FooterNavigationLinks links={group.links} platform="web" />
        </Flex>
      ))}
    </Box>
  );
}
