import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Flex, HStack } from 'styled-system/jsx';

const header = css({
  display: 'flex',
  alignItems: 'center',
  h: 'var(--layout-site-header-height)',
  px: '18',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'headerBorder',
  bg: 'var(--hoka-white)',
  _mobile: { gap: 0, pt: '0', pr: '9px', pb: '0', pl: 'var(--layout-mobile-inline-gutter)' },
});

/** Own the header landmark, platform spacing, and primary/action alignment. */
export function SiteHeaderContent({
  primary,
  actions,
}: {
  primary: ReactNode;
  actions: ReactNode;
}) {
  return (
    <header className={header}>
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        <HStack gap="6" alignItems="center">
          {primary}
        </HStack>
        <HStack gap="1.5" alignItems="center">
          {actions}
        </HStack>
      </Flex>
    </header>
  );
}
