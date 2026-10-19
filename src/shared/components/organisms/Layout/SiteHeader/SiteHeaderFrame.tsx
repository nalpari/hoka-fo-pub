import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';

/** Keep the header and its expanded menu in the same sticky hover region. */
export function SiteHeaderFrame({
  children,
  onLeave,
}: {
  children: ReactNode;
  onLeave: () => void;
}) {
  return (
    <Box pos="sticky" top={0} zIndex={20} onMouseLeave={onLeave}>
      {children}
    </Box>
  );
}
