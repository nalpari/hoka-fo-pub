import type { ReactNode } from 'react';
import { Flex } from 'styled-system/jsx';
import { SiteHeaderInner } from './SiteHeaderInner';

/** Own the header landmark and platform-specific outer spacing. */
export function SiteHeaderContent({
  primary,
  actions,
}: {
  primary: ReactNode;
  actions: ReactNode;
}) {
  return (
    <Flex
      as="header"
      alignItems="center"
      h="var(--layout-site-header-height)"
      px="var(--layout-web-content-gutter)"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="headerBorder"
      bg="var(--hoka-white)"
      _mobile={{ gap: 0, pt: '0', pr: '9px', pb: '0', pl: 'var(--layout-mobile-inline-gutter)' }}
    >
      <SiteHeaderInner primary={primary} actions={actions} />
    </Flex>
  );
}
