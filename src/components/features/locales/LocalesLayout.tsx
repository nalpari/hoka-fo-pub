import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';
import { LocalesHeading } from './LocalesHeading';

export function LocalesLayout({ children }: { children: ReactNode }) {
  return (
    <Box as="main">
      <LocalesHeading />
      <Box
        maxW="1200px"
        mx="auto"
        px="10"
        pt="13"
        pb="18"
        _mobile={{ px: 'var(--layout-mobile-inline-gutter)', pt: '11', pb: '12' }}
      >
        {children}
      </Box>
    </Box>
  );
}
