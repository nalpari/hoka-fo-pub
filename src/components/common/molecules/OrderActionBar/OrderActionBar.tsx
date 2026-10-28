import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';

/** Stays inside the form while its mobile presentation is fixed to the viewport. */
export function OrderActionBar({ children }: { children: ReactNode }) {
  return (
    <Box
      pos={{ base: 'static', _mobile: 'fixed' }}
      bottom="0"
      left="0"
      right="0"
      zIndex="2"
      bg="white"
      borderTop={{ base: '0', _mobile: '1px solid var(--colors-black-20)' }}
      px={{ base: '0', _mobile: '4' }}
      pt={{ base: '0', _mobile: '4' }}
      pb={{ base: '0', _mobile: '8' }}
    >
      {children}
    </Box>
  );
}
