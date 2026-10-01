import { FooterLegalLinks } from '@/shared/components/organisms/Layout/SiteFooter/FooterLegalLinks';
import { FooterLocaleSelectors } from '@/shared/components/organisms/Layout/SiteFooter/FooterLocaleSelectors';
import { FooterAccessibilityBadge } from '@/shared/components/organisms/Layout/SiteFooter/FooterAccessibilityBadge';
import { css } from 'styled-system/css';
import { Flex, VStack } from 'styled-system/jsx';

const styles = {
  legalRow: css({
    w: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8',
    _mobile: { position: 'relative', alignItems: 'flex-start' },
  }),
};

export function FooterLegal({ mobile }: { mobile: boolean }) {
  return (
    <VStack alignItems="flex-start" gap="68px" pos="relative">
      {mobile ? <FooterLocaleSelectors /> : null}
      <Flex className={styles.legalRow}>
        <FooterLegalLinks />
        <FooterAccessibilityBadge />
      </Flex>
    </VStack>
  );
}
