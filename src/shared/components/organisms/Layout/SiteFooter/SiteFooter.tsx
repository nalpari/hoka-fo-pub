import { FooterContent } from './FooterContent';
import { Wrap } from 'styled-system/jsx';

export function SiteFooter() {
  return (
    <Wrap
      as="footer"
      minW="var(--layout-web-min-width)"
      py="96px"
      px="32px"
      _mobile={{ p: '36px 16px', minW: 0 }}
      bg="black.100"
      color="black.10"
    >
      <FooterContent />
    </Wrap>
  );
}
