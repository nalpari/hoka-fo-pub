import type { ReactNode } from 'react';
import { Flex, HStack } from 'styled-system/jsx';

type Props = { primary: ReactNode; actions: ReactNode };

/** Own the central header frame and the primary/action groups. */
export function SiteHeaderInner({ primary, actions }: Props) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      maxW="var(--layout-web-content-max-width)"
      mx="auto"
      _mobile={{ maxW: 'none' }}
    >
      <HStack gap="6" alignItems="center">
        {primary}
      </HStack>
      <HStack gap="1.5" alignItems="center">
        {actions}
      </HStack>
    </Flex>
  );
}
