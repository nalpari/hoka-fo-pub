import type { ReactNode } from 'react';

import { Box } from 'styled-system/jsx';

/** 폼 내부 액션 영역을 모바일에서 화면 하단에 고정합니다. (Keeps the form action region fixed to the bottom of the mobile viewport.) */
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
