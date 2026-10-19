import type { ReactNode } from 'react';
import { VStack, Stack } from 'styled-system/jsx';
import { RunClubHistoryLink } from './RunClubHistoryLink';

type RunClubLayoutProps = { header: ReactNode; children: ReactNode; empty?: boolean };

export function RunClubLayout({ header, children, empty = false }: RunClubLayoutProps) {
  return (
    <VStack
      as="main"
      gap="4"
      w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
      mx="auto"
      pt="88px"
      pb="24"
      _mobile={{ w: '100%', gap: '0', pt: '12', pb: empty ? '0' : '16', alignItems: 'stretch' }}
    >
      {header}
      <Stack gap="8" _mobile={{ gap: '0' }}>
        <Stack _mobile={{ display: 'none' }}>
          <RunClubHistoryLink />
        </Stack>
        {children}
      </Stack>
    </VStack>
  );
}
