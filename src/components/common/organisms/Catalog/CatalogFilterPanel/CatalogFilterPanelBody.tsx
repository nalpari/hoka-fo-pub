import type { ReactNode } from 'react';
import { VStack } from 'styled-system/jsx';

type CatalogFilterPanelBodyProps = {
  children: ReactNode;
};

export function CatalogFilterPanelBody({ children }: CatalogFilterPanelBodyProps) {
  return (
    <VStack w="100%" gap="0" css={{ '& > *': { w: '100%' } }}>
      {children}
    </VStack>
  );
}
