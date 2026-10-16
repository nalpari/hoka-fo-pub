import type { ReactNode } from 'react';
import { Box, VStack } from 'styled-system/jsx';
import type { Platform } from '@/shared/lib/device';

export function HomeLayout({ platform, children }: { platform: Platform; children: ReactNode }) {
  return (
    <Box
      as="main"
      className={`home-page-${platform}`}
      overflow="hidden"
      color="var(--color-text-primary)"
      bg="var(--color-surface-default)"
      fontFamily="var(--font-family-base)"
      pb="24"
      _mobile={{ pb: '18' }}
    >
      <VStack alignItems="flex-start" gap={{ base: '112px', _mobile: '72px' }}>
        {children}
      </VStack>
    </Box>
  );
}
