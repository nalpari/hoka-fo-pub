import type { ReactNode } from 'react';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';

const panel = css({
  '& > *': { w: '100%' },
});

type CatalogFilterPanelBodyProps = {
  children: ReactNode;
};

export function CatalogFilterPanelBody({ children }: CatalogFilterPanelBodyProps) {
  return (
    <VStack w="100%" gap="0" className={panel}>
      {children}
    </VStack>
  );
}
