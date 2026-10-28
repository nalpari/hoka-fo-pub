import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';
import { useScrollPin } from '@/lib/useScrollPin';

/** Keep the header and its expanded menu in the same sticky hover region. */
export function SiteHeaderFrame({
  children,
  onLeave,
  fixedOnScroll = false,
}: {
  children: ReactNode;
  onLeave: () => void;
  fixedOnScroll?: boolean;
}) {
  const { markerRef, pinned } = useScrollPin(fixedOnScroll);

  if (!fixedOnScroll) {
    return (
      <Box pos="sticky" top={0} zIndex={20} onMouseLeave={onLeave}>
        {children}
      </Box>
    );
  }

  return (
    <Box pos="relative" top={0} zIndex={20} h="var(--layout-site-header-height)">
      <Box ref={markerRef} h="1px" mb="-1px" />
      <Box
        pos={pinned ? 'fixed' : undefined}
        top={pinned ? '0' : undefined}
        insetInline={pinned ? '0' : undefined}
        onMouseLeave={onLeave}
      >
        {children}
      </Box>
    </Box>
  );
}
