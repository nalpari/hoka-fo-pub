import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';

type DesktopProductFilterProps = {
  children: ReactNode;
};

/** Desktop-only sticky container for the product listing filter. */
export function DesktopProductFilter({ children }: DesktopProductFilterProps) {
  return (
    <Box
      position="sticky"
      top="calc(var(--layout-site-header-height) + var(--content-layout-header-height))"
      alignSelf="start"
      maxH="calc(100dvh - var(--layout-site-header-height) - var(--content-layout-header-height))"
      overflowX="hidden"
      overflowY="auto"
      scrollbar="hidden"
    >
      {children}
    </Box>
  );
}
