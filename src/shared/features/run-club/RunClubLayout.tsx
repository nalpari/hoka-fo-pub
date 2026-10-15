import type { ReactNode } from 'react';
import { VStack, Stack } from 'styled-system/jsx';
import { RunClubHistoryLink } from './RunClubHistoryLink';

type RunClubLayoutProps = { header: ReactNode; children: ReactNode };

export function RunClubLayout({ header, children }: RunClubLayoutProps) {
  return (
    <VStack
      as="main"
      gap="4"
      w="min(calc(100% - 110px), 1532px)"
      mx="auto"
      pt="88px"
      pb="24"
      _mobile={{ w: '100%', px: 'var(--layout-mobile-inline-gutter)', pt: '10', pb: '14' }}
    >
      {header}
      <Stack gap="8">
        <RunClubHistoryLink />
        {children}
      </Stack>
    </VStack>
  );
}
