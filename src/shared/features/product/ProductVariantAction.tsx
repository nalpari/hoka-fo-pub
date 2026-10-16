import type { ReactNode } from 'react';
import { Flex } from 'styled-system/jsx';

export function ProductVariantAction({ children }: { children: ReactNode }) {
  return (
    <Flex alignItems="baseline" justifyContent="space-between">
      {children}
    </Flex>
  );
}
