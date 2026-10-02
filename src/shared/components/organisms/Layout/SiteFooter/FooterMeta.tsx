import { FooterLegal } from '@/shared/components/organisms/Layout/SiteFooter/FooterLegal';
import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';
import { Box, Flex } from 'styled-system/jsx';

const styles = {
  container: css({ px: '18', _mobile: { px: 0 } }),
};

export function FooterMeta() {
  const platform = usePlatform();

  return (
    <>
      <Flex
        className={styles.container}
        w="100%"
        maxW="1440px"
        mx="auto"
        direction="column"
        gap="8"
      >
        <Box w="100%" h="1px" bg="#F7F7F9" />
        <FooterLegal mobile={platform === 'mobile'} />
      </Flex>
    </>
  );
}
