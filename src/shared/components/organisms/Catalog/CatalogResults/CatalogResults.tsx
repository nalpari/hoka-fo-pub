import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';

export function CatalogResults({ children }: { children: ReactNode }) {
  return (
    <Box className="results" minW="0">
      {children}
    </Box>
  );
}
