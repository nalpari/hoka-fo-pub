import { FooterMain } from '@/shared/components/organisms/Layout/SiteFooter/FooterMain';
import { FooterMeta } from '@/shared/components/organisms/Layout/SiteFooter/FooterMeta';
import { usePlatform } from '@/shared/context/platform';
import { Flex, Wrap } from 'styled-system/jsx';

export function SiteFooter() {
  const platform = usePlatform();

  return (
    <Wrap as="footer" pt="64px" pb="32px" bg="#000" color="#fff">
      <Flex
        w="100%"
        maxW="1920px"
        mx="auto"
        direction="column"
        px={platform === 'mobile' ? '32px' : '72px'}
        gap={platform === 'mobile' ? '24px' : '48px'}
      >
        <FooterMain />
        <FooterMeta />
      </Flex>
    </Wrap>
  );
}
