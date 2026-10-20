import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';

type BottomSheetContentProps = {
  children: ReactNode;
};

export function BottomSheetContent({ children }: BottomSheetContentProps) {
  return (
    <Box minH="0" overflowY="auto">
      {children}
    </Box>
  );
}
