import type { ReactNode } from 'react';
import { Box } from 'styled-system/jsx';
import { ProductDetailGrid } from './ProductDetailGrid';

type Props = { isViewing: boolean; children: ReactNode; footer: ReactNode };

/** Keep the purchasing grid contained and its footer outside the grid. */
export function ProductDetailBody({ isViewing, children, footer }: Props) {
  return (
    <Box hidden={isViewing}>
      <ProductDetailGrid>{children}</ProductDetailGrid>
      {footer}
    </Box>
  );
}
