import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';

type BottomSheetContentProps = {
  children: ReactNode;
};

export function BottomSheetContent({ children }: BottomSheetContentProps) {
  return (
    <Box minH="0" flex="0 1 auto" overflowY="auto" overscrollBehaviorY="contain" px="6" pb="8">
      {children}
    </Box>
  );
}
